import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  ApprovedCompanyReviewList,
  ApprovedReviewsProvider,
} from "@/components/contrair/approved-review-content";
import { CompanyDetailSkeleton } from "@/components/contrair/loading-skeletons";
import { SitePageFrame } from "@/components/contrair/site-shell";

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
        <Suspense fallback={<CompanyDetailSkeleton />}>
          <CompanyDetails params={params} />
        </Suspense>
      </main>
    </SitePageFrame>
  );
}
