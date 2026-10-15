"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  type QueryConstraint,
  type Unsubscribe,
} from "firebase/firestore";
import {
  CompanyCard,
  Rating,
  ReviewCard,
} from "@/components/contrair/data-views";
import { CompanySearchForm } from "@/components/contrair/company-search-form";
import {
  CompanyDetailSkeleton,
  CompanyGridSkeleton,
  LoadingSpinner,
  OverviewSkeleton,
  ReviewGridSkeleton,
} from "@/components/contrair/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/contrair/typography";
import { getFirebaseFirestore } from "@/lib/firebase";
import { parseWorkplaceReview } from "@/lib/firebase-reviews";
import {
  getAverageRating,
  groupReviewsByCompany,
  type WorkplaceReview,
} from "@/lib/worktruth-data";

type ApprovedReviewsResult = {
  reviews: WorkplaceReview[];
  loading: boolean;
  error: string;
};

const ApprovedReviewsContext = createContext<ApprovedReviewsResult | null>(
  null,
);

function useReviewQuery(companySlug?: string): ApprovedReviewsResult {
  const [result, setResult] = useState<{
    companySlug: string | undefined;
    reviews: WorkplaceReview[];
    loading: boolean;
    error: string;
  }>({
    companySlug,
    reviews: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    let active = true;
    let unsubscribe: Unsubscribe | undefined;

    Promise.resolve().then(() => {
      if (!active) return;

      try {
        const constraints: QueryConstraint[] = [
          where("moderationStatus", "==", "approved"),
        ];
        if (companySlug)
          constraints.push(where("companySlug", "==", companySlug));
        constraints.push(orderBy("createdAt", "desc"));

        unsubscribe = onSnapshot(
          query(collection(getFirebaseFirestore(), "reviews"), ...constraints),
          (snapshot) => {
            if (!active) return;
            try {
              setResult({
                companySlug,
                reviews: snapshot.docs.map((review) =>
                  parseWorkplaceReview(review.id, review.data()),
                ),
                loading: false,
                error: "",
              });
            } catch (reviewError) {
              console.error("Could not read approved reviews.", reviewError);
              setResult({
                companySlug,
                reviews: [],
                loading: false,
                error: "Reviews could not be loaded. Please try again later.",
              });
              unsubscribe?.();
            }
          },
          (firebaseError) => {
            if (!active) return;
            console.error(
              "Could not load approved reviews from Firestore.",
              firebaseError,
            );
            setResult({
              companySlug,
              reviews: [],
              loading: false,
              error: "Reviews could not be loaded. Please try again later.",
            });
          },
        );
      } catch (firebaseError) {
        console.error("Could not connect to Firebase.", firebaseError);
        setResult({
          companySlug,
          reviews: [],
          loading: false,
          error:
            firebaseError instanceof Error
              ? firebaseError.message
              : "Firebase could not be initialized.",
        });
      }
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [companySlug]);

  return result.companySlug === companySlug
    ? result
    : { reviews: [], loading: true, error: "" };
}

export function ApprovedReviewsProvider({
  children,
  companySlug,
}: {
  children: ReactNode;
  companySlug?: string;
}) {
  const result = useReviewQuery(companySlug);

  return (
    <ApprovedReviewsContext.Provider value={result}>
      {children}
    </ApprovedReviewsContext.Provider>
  );
}

function useApprovedReviews() {
  const result = useContext(ApprovedReviewsContext);
  if (!result) {
    throw new Error(
      "Approved review views must be inside ApprovedReviewsProvider.",
    );
  }
  return result;
}

function ReviewLoadState({
  loading,
  error,
}: {
  loading: boolean;
  error: string;
}) {
  if (loading) {
    return (
      <div className="py-2">
        <LoadingSpinner label="Loading approved reviews…" />
      </div>
    );
  }
  if (error) {
    return (
      <p className="form-error" role="alert">
        {error}
      </p>
    );
  }
  return null;
}

export function ApprovedOverview() {
  const { reviews, loading, error } = useApprovedReviews();
  const companies = groupReviewsByCompany(reviews);

  if (loading) {
    return <OverviewSkeleton />;
  }

  return (
    <article
      aria-labelledby="approved-overview-title"
      className="sample-preview"
    >
      <header className="sample-preview-head">
        <div>
          <TypographyH2 className="text-[1.3rem]" id="approved-overview-title">
            Recently approved workplace reviews
          </TypographyH2>
          <p className="sample-company-meta">
            Only reviews approved by Contrair appear here.
          </p>
        </div>
      </header>
      <ReviewLoadState error={error} loading={false} />
      {!error && reviews.length === 0 ? (
        <div className="empty-state">
          <TypographyH2 className="text-[1.2rem]">
            No approved reviews yet
          </TypographyH2>
          <TypographyP>
            Be the first to share a workplace experience.
          </TypographyP>
          <Link className="text-link mt-4" href="/write-review">
            Write a review
          </Link>
        </div>
      ) : null}
      <div className="approved-overview-reviews">
        {reviews.slice(0, 3).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {companies.length > 0 ? (
        <p className="sample-company-meta">
          {companies.length} {companies.length === 1 ? "company" : "companies"}{" "}
          with approved reviews
        </p>
      ) : null}
    </article>
  );
}

export function ApprovedCompanyCards({
  limit,
  emptyMessage = "Companies appear here after their first review is approved.",
}: {
  limit?: number;
  emptyMessage?: string;
}) {
  const { reviews, loading, error } = useApprovedReviews();
  const companies = groupReviewsByCompany(reviews);

  if (loading) {
    return <CompanyGridSkeleton count={limit ?? 6} />;
  }

  return (
    <>
      <ReviewLoadState error={error} loading={false} />
      {!error && companies.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : null}
      <div className="company-grid">
        {companies.slice(0, limit).map((company) => (
          <CompanyCard company={company} key={company.slug} />
        ))}
      </div>
    </>
  );
}

export function ApprovedReviewCards({ limit }: { limit?: number }) {
  const { reviews, loading, error } = useApprovedReviews();

  if (loading) {
    return <ReviewGridSkeleton count={limit ?? 2} />;
  }

  return (
    <>
      <ReviewLoadState error={error} loading={false} />
      {reviews.slice(0, limit).map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      {!error && reviews.length === 0 ? (
        <p className="empty-state">
          No approved reviews yet. Approved reviews will appear here.
        </p>
      ) : null}
    </>
  );
}

export function ApprovedCompanyDirectory({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const { reviews, loading, error } = useApprovedReviews();
  const companies = groupReviewsByCompany(reviews);
  const normalizedQuery = initialQuery.trim().toLocaleLowerCase("en-NG");
  const results = normalizedQuery
    ? companies.filter((company) =>
        company.name.toLocaleLowerCase("en-NG").includes(normalizedQuery),
      )
    : companies;

  if (loading) {
    return (
      <>
        <div className="company-list-toolbar">
          <CompanySearchForm initialQuery={initialQuery} />
        </div>
        <div className="my-4">
          <Skeleton className="h-4 w-48" />
        </div>
        <CompanyGridSkeleton count={6} />
      </>
    );
  }

  return (
    <>
      <div className="company-list-toolbar">
        <CompanySearchForm initialQuery={initialQuery} />
      </div>
      <p aria-live="polite" className="results-summary">
        {error
          ? "Approved reviews are unavailable."
          : normalizedQuery
            ? `${results.length} ${results.length === 1 ? "company" : "companies"} with approved reviews match “${initialQuery.trim()}”.`
            : `${companies.length} ${companies.length === 1 ? "company" : "companies"} with approved reviews.`}
      </p>
      {error ? <ReviewLoadState error={error} loading={false} /> : null}
      {!error && results.length > 0 ? (
        <section aria-labelledby="company-results-title">
          <h2 className="sr-only" id="company-results-title">
            Companies with approved reviews
          </h2>
          <div className="company-grid">
            {results.map((company) => (
              <CompanyCard company={company} key={company.slug} />
            ))}
          </div>
        </section>
      ) : null}
      {!error && results.length === 0 ? (
        <section aria-labelledby="empty-title" className="empty-state">
          <TypographyH2 className="text-[1.35rem]" id="empty-title">
            {normalizedQuery
              ? "No approved reviews match that company."
              : "No approved reviews yet."}
          </TypographyH2>
          <TypographyP>
            {normalizedQuery
              ? "Try another company name or browse the directory again."
              : "Companies will be listed after Contrair approves their first review."}
          </TypographyP>
          {normalizedQuery ? (
            <Link className="text-link mt-4" href="/companies">
              Browse all companies
            </Link>
          ) : (
            <Link className="text-link mt-4" href="/write-review">
              Write the first review
            </Link>
          )}
        </section>
      ) : null}
    </>
  );
}

export function ApprovedCompanyReviewList({ slug }: { slug: string }) {
  const { reviews, loading, error } = useApprovedReviews();
  const companies = groupReviewsByCompany(reviews);
  const company = companies[0];

  if (loading) {
    return <CompanyDetailSkeleton />;
  }

  return (
    <>
      <section aria-labelledby="company-title" className="mt-8">
        <p className="sample-label">Employee reviews</p>
        <TypographyH1
          className="mt-3 text-[clamp(2rem,4vw,3rem)]"
          id="company-title"
        >
          {company?.name ??
            slug
              .split("-")
              .map((word) => word[0]?.toUpperCase() + word.slice(1))
              .join(" ")}
        </TypographyH1>
        <div className="mt-5">
          <Rating
            count={reviews.length}
            value={company ? getAverageRating(company) : null}
          />
        </div>
      </section>
      <section aria-labelledby="company-reviews-title" className="mt-12">
        <TypographyH2 id="company-reviews-title">
          Approved workplace reviews
        </TypographyH2>
        <ReviewLoadState error={error} loading={false} />
        {!error && reviews.length > 0 ? (
          <div className="review-grid">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : null}
        {!error && reviews.length === 0 ? (
          <div className="empty-state">
            <TypographyH2 className="text-[1.25rem]">
              No approved reviews for this company
            </TypographyH2>
            <TypographyP>
              Reviews appear here only after Contrair has approved them.
            </TypographyP>
            <Link className="text-link mt-4" href="/write-review">
              Share a workplace review
            </Link>
          </div>
        ) : null}
      </section>
    </>
  );
}
