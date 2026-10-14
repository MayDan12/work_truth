import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SitePageFrame } from "@/components/worktruth/site-shell"
import { TypographyH1, TypographyP } from "@/components/worktruth/typography"

export default function NotFound() {
  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <p className="sample-label">404 · Not found</p>
        <TypographyH1 className="mt-4 text-[clamp(2rem,4vw,3rem)]">
          That page could not be found.
        </TypographyH1>
        <TypographyP className="section-intro">
          Try the company directory or head back to the Worktruth home page.
        </TypographyP>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link className="text-link" href="/companies">
            Explore Companies
          </Link>
          <Link className="text-link" href="/">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Home
          </Link>
        </div>
      </main>
    </SitePageFrame>
  )
}
