import { InformationPage } from "@/components/worktruth/info-page"
import { TypographyH2, TypographyP } from "@/components/worktruth/typography"

export default function PrivacyPage() {
  return (
    <InformationPage
      description="What information is submitted for moderation and what appears on public review pages."
      title="Privacy Policy"
    >
      <TypographyP>
        Worktruth does not ask reviewers to create an account or provide their
        name in the review form. This page is a summary and must be completed
        with the service&apos;s final retention, deletion, contact, and legal
        information before launch.
      </TypographyP>
      <section>
        <TypographyH2 className="text-xl">Public review identity</TypographyH2>
        <TypographyP className="mt-2">
          The intended public review format does not display the author&apos;s name.
          Submitting without an account and omitting a public name are not a
          guarantee of absolute anonymity. Avoid details that could identify you
          or someone else in a review.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Review submissions</TypographyH2>
        <TypographyP className="mt-2">
          When you submit a review, its company name, broad job title, employment
          status, rating, and written feedback are stored in the Worktruth
          Firestore database for moderation. Pending and rejected reviews are not
          shown publicly. Admins with moderation access can see pending
          submissions.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Manual moderation</TypographyH2>
        <TypographyP className="mt-2">
          Human moderation takes place before publication.
          Moderation is a review against community guidelines, not independent
          verification of every statement.
        </TypographyP>
      </section>
    </InformationPage>
  )
}
