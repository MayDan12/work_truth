import { InformationPage } from "@/components/worktruth/info-page"
import { TypographyH2, TypographyP } from "@/components/worktruth/typography"

export default function PrivacyPage() {
  return (
    <InformationPage
      description="A clear explanation of what public review pages show and what this prototype does not do."
      title="Privacy Policy"
    >
      <TypographyP>
        This is draft privacy information for a local prototype, not a complete
        policy for a launched review service. Have the live product&apos;s data
        collection, retention, security, and contact practices reviewed and
        published before accepting real reviews.
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
        <TypographyH2 className="text-xl">Prototype behavior</TypographyH2>
        <TypographyP className="mt-2">
          The review form on this site creates a temporary preview in the current
          page only. It does not send your entries to a server, save them, or
          publish them. Refreshing or leaving the page clears the preview.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Manual moderation</TypographyH2>
        <TypographyP className="mt-2">
          The intended product flow includes human moderation before publication.
          Moderation is a review against community guidelines, not independent
          verification of every statement.
        </TypographyP>
      </section>
    </InformationPage>
  )
}
