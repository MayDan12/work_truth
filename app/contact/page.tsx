import Link from "next/link"
import { InformationPage } from "@/components/worktruth/info-page"
import { TypographyH2, TypographyP } from "@/components/worktruth/typography"

export default function ContactPage() {
  return (
    <InformationPage
      description="A contact route is present so navigation works throughout the prototype."
      title="Contact Worktruth"
    >
      <section>
        <TypographyH2 className="text-xl">Contact channel not connected</TypographyH2>
        <TypographyP className="mt-2">
          This local prototype does not have a contact inbox or message service.
          No message form is provided, and we do not collect contact details here.
        </TypographyP>
        <TypographyP className="mt-4">
          To explore sample listings, visit <Link className="text-link" href="/companies">Explore Companies</Link>.
        </TypographyP>
      </section>
    </InformationPage>
  )
}
