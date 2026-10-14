import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CompanyCard, Rating, ReviewCard } from "@/components/worktruth/data-views"
import { SitePageFrame } from "@/components/worktruth/site-shell"
import { TypographyH1, TypographyH2, TypographyP } from "@/components/worktruth/typography"
import { companies, demoContentNotice, getAverageRating, getCompanyBySlug } from "@/lib/worktruth-data"

export function generateStaticParams() {
  return companies.map(({ slug }) => ({ slug }))
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)

  if (!company) notFound()

  const relatedCompanies = companies.filter((item) => item.slug !== company.slug).slice(0, 3)

  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <Link className="text-link" href="/companies">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to companies
        </Link>
        <section aria-labelledby="company-title" className="mt-8">
          <p className="sample-label">Fictional sample company · Demo listing</p>
          <TypographyH1 className="mt-3 text-[clamp(2rem,4vw,3rem)]" id="company-title">
            {company.name}
          </TypographyH1>
          <TypographyP className="company-record-meta">
            {company.industry} · {company.location}, Nigeria
          </TypographyP>
          <div className="mt-5">
            <Rating count={company.reviews.length} value={getAverageRating(company)} />
          </div>
          <p className="demo-disclaimer">{demoContentNotice}</p>
        </section>

        <section aria-labelledby="company-reviews-title" className="mt-12">
          <TypographyH2 id="company-reviews-title">Workplace experiences</TypographyH2>
          {company.reviews.length ? (
            <div className="review-grid">
              {company.reviews.map((review) => (
                <ReviewCard company={company} key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <TypographyH2 className="text-[1.25rem]">No published reviews</TypographyH2>
              <TypographyP>
                This company has no reviews in the fictional sample dataset. No
                rating is shown until a review exists.
              </TypographyP>
            </div>
          )}
        </section>

        <section aria-labelledby="other-companies-title" className="mt-14">
          <TypographyH2 id="other-companies-title">More fictional companies</TypographyH2>
          <div className="company-grid">
            {relatedCompanies.map((relatedCompany) => (
              <CompanyCard company={relatedCompany} key={relatedCompany.slug} />
            ))}
          </div>
        </section>
      </main>
    </SitePageFrame>
  )
}
