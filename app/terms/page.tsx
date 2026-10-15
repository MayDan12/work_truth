import { InformationPage } from "@/components/contrair/info-page";
import { TypographyH2, TypographyP } from "@/components/contrair/typography";

export default function TermsPage() {
  return (
    <InformationPage
      description="Terms for submitting and viewing workplace reviews on Contrair."
      title="Terms of Service"
    >
      <TypographyP>
        These terms are a product summary and should receive legal review before
        launch. By submitting a review, you agree to share first-hand workplace
        feedback that follows the community guidelines.
      </TypographyP>
      <section>
        <TypographyH2 className="text-xl">
          Moderation and publication
        </TypographyH2>
        <TypographyP className="mt-2">
          Submissions are reviewed by Contrair. Only approved reviews are
          published; a submission is not guaranteed to be approved. Moderation
          checks compliance with the community guidelines and is not independent
          fact verification.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Responsible submissions</TypographyH2>
        <TypographyP className="mt-2">
          Do not submit personal information, confidential company information,
          threats, harassment, or claims you cannot responsibly support. The
          review form does not request your name or an account, but this does
          not guarantee anonymity.
        </TypographyP>
      </section>
    </InformationPage>
  );
}
