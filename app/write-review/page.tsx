import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReviewSubmissionForm } from "@/components/contrair/review-submission-form";
import { SitePageFrame } from "@/components/contrair/site-shell";
import { TypographyH1, TypographyP } from "@/components/contrair/typography";

export default function WriteReviewPage() {
  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <Link className="text-link" href="/">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to GistHQ
        </Link>
        <div className="mt-8 max-w-[48rem]">
          <TypographyH1 className="text-[clamp(2rem,4vw,3rem)]">
            Share your workplace experience.
          </TypographyH1>
          <TypographyP className="section-intro">
            No account is needed to submit a review. Every submission appears
            publicly.
          </TypographyP>
          <ReviewSubmissionForm />
        </div>
      </main>
    </SitePageFrame>
  );
}
