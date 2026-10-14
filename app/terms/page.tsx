import { InformationPage } from "@/components/worktruth/info-page"
import { TypographyH2, TypographyP } from "@/components/worktruth/typography"

export default function TermsPage() {
  return (
    <InformationPage
      description="Draft terms information for the Worktruth demonstration."
      title="Terms of Service"
    >
      <TypographyP>
        This prototype is provided to demonstrate a possible workplace-review
        experience. It is not a live service and this page is not a substitute
        for reviewed legal terms.
      </TypographyP>
      <section>
        <TypographyH2 className="text-xl">Fictional examples</TypographyH2>
        <TypographyP className="mt-2">
          Company names, locations, ratings, review counts, review excerpts, and
          dates on this site are fictional sample content. They do not describe
          actual employers or represent published user feedback.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">No review service connected</TypographyH2>
        <TypographyP className="mt-2">
          Searches only filter the local sample directory. Review entries produce
          a temporary preview and are not sent, saved, moderated, or published.
        </TypographyP>
      </section>
    </InformationPage>
  )
}
