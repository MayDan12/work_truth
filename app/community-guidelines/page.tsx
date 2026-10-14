import { InformationPage } from "@/components/worktruth/info-page"
import { TypographyH2, TypographyP } from "@/components/worktruth/typography"

export default function CommunityGuidelinesPage() {
  return (
    <InformationPage
      description="Guidance for sharing useful workplace context while respecting the people and communities involved."
      title="Community Guidelines"
    >
      <TypographyP>
        These draft guidelines describe the approach Worktruth intends to take.
        Every review would be manually moderated before it could be published.
        Moderation checks whether a contribution follows guidelines; it does not
        independently verify every statement.
      </TypographyP>
      <section>
        <TypographyH2 className="text-xl">Share first-hand workplace context</TypographyH2>
        <TypographyP className="mt-2">
          Describe your own experience with culture, management, compensation,
          work-life balance, or career growth. Specific, measured examples help
          readers understand the context behind a rating.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Protect yourself and others</TypographyH2>
        <TypographyP className="mt-2">
          Do not include names, contact details, private personnel information,
          confidential company material, or details that could identify you or
          another person. Public reviews are not intended to display an author&apos;s
          identity, but Worktruth cannot promise absolute anonymity.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Keep criticism constructive</TypographyH2>
        <TypographyP className="mt-2">
          Focus on workplace practices and your own perspective. Avoid threats,
          harassment, discriminatory language, personal attacks, and claims you
          cannot responsibly support.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">A note about this prototype</TypographyH2>
        <TypographyP className="mt-2">
          This page is draft guidance in a local prototype. No reviews are sent
          for moderation or publication here.
        </TypographyP>
      </section>
    </InformationPage>
  )
}
