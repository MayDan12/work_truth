import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  ApprovedCompanyReviewList,
  ApprovedReviewsProvider,
} from "@/components/contrair/approved-review-content";
import { SitePageFrame } from "@/components/contrair/site-shell";
import { TypographyH1 } from "@/components/contrair/typography";

async function CompanyDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ApprovedReviewsProvider companySlug={slug}>
      <ApprovedCompanyReviewList slug={slug} />
    </ApprovedReviewsProvider>
  );
}

export default function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <Link className="text-link" href="/companies">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to companies
        </Link>
        <Suspense
          fallback={
            <TypographyH1 className="mt-8 text-[clamp(2rem,4vw,3rem)]">
              Loading company reviews…
            </TypographyH1>
          }
        >
          <CompanyDetails params={params} />
        </Suspense>
      </main>
    </SitePageFrame>
  );
}
