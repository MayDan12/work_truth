import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SitePageFrame } from "@/components/worktruth/site-shell"
import { TypographyH1, TypographyH2, TypographyP } from "@/components/worktruth/typography"

export function InformationPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <Link className="text-link" href="/">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Worktruth
        </Link>
        <div className="mt-8">
          <TypographyH1 className="text-[clamp(2rem,4vw,3rem)]">{title}</TypographyH1>
          <TypographyP className="section-intro">{description}</TypographyP>
        </div>
        <div className="info-page-content">{children}</div>
        <aside className="notice-panel" aria-label="Prototype information">
          <TypographyH2 className="text-base font-semibold tracking-normal">
            Prototype information
          </TypographyH2>
          <TypographyP className="mt-2">
            Worktruth is shown here as a local prototype. All company and review
            content is fictional sample data. Linked flows do not connect to a
            review service.
          </TypographyP>
        </aside>
      </main>
    </SitePageFrame>
  )
}
