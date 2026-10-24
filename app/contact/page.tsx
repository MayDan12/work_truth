import { InformationPage } from "@/components/contrair/info-page";
import { TypographyH2, TypographyP } from "@/components/contrair/typography";

export default function ContactPage() {
  return (
    <InformationPage
      description="Contact GistHQ about the service or submit a documented review grievance."
      title="Contact GistHQ"
    >
      <section>
        <TypographyH2 className="text-xl">
          Review notices and takedown requests
        </TypographyH2>
        <TypographyP className="mt-2">
          Email{" "}
          <a className="text-link" href="mailto:gisthq.team@gmail.com?subject=Review%20notice%20and%20takedown">
            gisthq.team@gmail.com
          </a>{" "}
          with the subject “Review notice and takedown.” Include the review URL,
          the specific statements you dispute, the basis and supporting
          documents for your request, your name and role, and a way to contact
          you. If you represent an organization, include evidence of your
          authority and the action you are requesting. Please do not send
          unnecessary personal or confidential information.
        </TypographyP>
        <TypographyP className="mt-4">
          For other enquiries, use the same address and describe your request.
        </TypographyP>
      </section>
    </InformationPage>
  );
}
