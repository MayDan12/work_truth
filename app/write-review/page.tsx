import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ReviewSubmissionForm } from "@/components/worktruth/review-submission-form"
import { SitePageFrame } from "@/components/worktruth/site-shell"
import { TypographyH1, TypographyP } from "@/components/worktruth/typography"

export default function WriteReviewPage() {
  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <Link className="text-link" href="/">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Worktruth
        </Link>
        <div className="mt-8 max-w-[48rem]">
          <TypographyH1 className="text-[clamp(2rem,4vw,3rem)]">
            Share your workplace experience.
          </TypographyH1>
          <TypographyP className="section-intro">
            No account is needed to submit a review. Every submission is held
            for admin moderation and appears publicly only if approved.
          </TypographyP>
          <ReviewSubmissionForm />
        </div>
      </main>
    </SitePageFrame>
  )
}
