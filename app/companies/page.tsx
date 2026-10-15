import { Suspense } from "react";
import {
  ApprovedCompanyDirectory,
  ApprovedReviewsProvider,
} from "@/components/contrair/approved-review-content";
import { CompanyDirectorySkeleton } from "@/components/contrair/loading-skeletons";
import { SitePageFrame } from "@/components/contrair/site-shell";
import { TypographyH1, TypographyP } from "@/components/contrair/typography";

async function CompanyResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = Array.isArray(params.q)
    ? (params.q[0] ?? "")
    : (params.q ?? "");

  return (
    <ApprovedReviewsProvider>
      <ApprovedCompanyDirectory initialQuery={query} />
    </ApprovedReviewsProvider>
  );
}

export default function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <TypographyH1 className="text-[clamp(2rem,4vw,3rem)]">
          Explore companies
        </TypographyH1>
        <TypographyP className="section-intro">
          Search companies with workplace reviews approved by Contrair.
        </TypographyP>
        <Suspense fallback={<CompanyDirectorySkeleton />}>
          <CompanyResults searchParams={searchParams} />
        </Suspense>
      </main>
    </SitePageFrame>
  );
}
