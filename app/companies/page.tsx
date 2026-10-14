import { Suspense } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { CompanySearchForm } from "@/components/worktruth/company-search-form"
import { CompanyCard } from "@/components/worktruth/data-views"
import { SitePageFrame } from "@/components/worktruth/site-shell"
import { TypographyH1, TypographyH2, TypographyP } from "@/components/worktruth/typography"
import { demoContentNotice, searchCompanies } from "@/lib/worktruth-data"

async function CompanyResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const params = await searchParams
  const query = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? ""
  const results = searchCompanies(query)

  return (
    <>
      <div className="company-list-toolbar">
        <CompanySearchForm initialQuery={query} />
      </div>
      <p aria-live="polite" className="results-summary">
        {query.trim()
          ? `${results.length} fictional ${results.length === 1 ? "match" : "matches"} for “${query.trim()}”.`
          : `${results.length} fictional sample companies.`}
      </p>
      <p className="demo-disclaimer">{demoContentNotice}</p>

      {results.length ? (
        <section aria-labelledby="company-results-title">
          <h2 className="sr-only" id="company-results-title">Fictional company results</h2>
          <div className="company-grid">
            {results.map((company) => (
              <CompanyCard company={company} key={company.slug} />
            ))}
          </div>
        </section>
      ) : (
        <section aria-labelledby="empty-title" className="empty-state">
          <TypographyH2 className="text-[1.35rem]" id="empty-title">
            No sample companies matched that search.
          </TypographyH2>
          <TypographyP>
            Try a different company, industry, or location. Search only checks the
            fictional demo directory; it does not query a live database.
          </TypographyP>
          <Link className="text-link mt-4" href="/companies">
            Browse all sample companies
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
      )}
    </>
  )
}

export default function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <TypographyH1 className="text-[clamp(2rem,4vw,3rem)]">
          Explore companies
        </TypographyH1>
        <TypographyP className="section-intro">
          Search the fictional Worktruth directory for sample technology workplaces.
        </TypographyP>
        <Suspense
          fallback={
            <p aria-live="polite" className="results-summary" role="status">
              Loading fictional sample companies…
            </p>
          }
        >
          <CompanyResults searchParams={searchParams} />
        </Suspense>
      </main>
    </SitePageFrame>
  )
}
