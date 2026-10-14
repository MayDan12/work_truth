import Link from "next/link"
import { ArrowUpRight, Star } from "lucide-react"
import type { Company, WorkplaceReview } from "@/lib/worktruth-data"
import { getAverageRating } from "@/lib/worktruth-data"
import { TypographyH3, TypographyP } from "@/components/worktruth/typography"

export function Rating({
  value,
  count,
  className,
}: {
  value: number | null
  count: number
  className?: string
}) {
  if (value === null || count === 0) {
    return <span className={className}>No approved reviews</span>
  }

  return (
    <span
      aria-label={`${value.toFixed(1)} out of 5 from ${count} approved ${count === 1 ? "review" : "reviews"}`}
      className={`rating ${className ?? ""}`}
    >
      <Star aria-hidden="true" className="rating-star" fill="currentColor" />
      <strong>{value.toFixed(1)}</strong>
      <span>{count} approved {count === 1 ? "review" : "reviews"}</span>
    </span>
  )
}

export function CompanyCard({ company }: { company: Company }) {
  const rating = getAverageRating(company)

  return (
    <Link className="company-record" href={`/companies/${company.slug}`}>
      <TypographyH3 className="company-record-name">{company.name}</TypographyH3>
      <Rating count={company.reviews.length} value={rating} />
      <TypographyP className="company-record-summary">
        {company.reviews.length} admin-approved workplace {company.reviews.length === 1 ? "review" : "reviews"}.
      </TypographyP>
      <ArrowUpRight aria-hidden="true" className="company-record-arrow" />
    </Link>
  )
}

export function ReviewCard({
  review,
}: {
  review: WorkplaceReview
}) {
  return (
    <article className="review-card">
      <header className="review-card-header">
        <div>
          <p className="sample-label">Approved employee review</p>
          <TypographyH3 className="review-company-name">{review.companyName}</TypographyH3>
          <p className="review-byline">
            {review.role} <span aria-hidden="true">·</span> {review.employmentStatus}
          </p>
        </div>
        <div aria-label={`Overall rating ${review.rating.toFixed(1)} out of 5`} className="review-score">
          <Star aria-hidden="true" className="rating-star" fill="currentColor" />
          <strong>{review.rating.toFixed(1)}</strong>
          <span>/ 5</span>
        </div>
      </header>
      <div className="pros-cons">
        <div>
          <h4>Pros</h4>
          <TypographyP>{review.pros}</TypographyP>
        </div>
        <div>
          <h4>Cons</h4>
          <TypographyP>{review.cons}</TypographyP>
        </div>
      </div>
      <p className="review-card-date">
        Submitted {new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(review.createdAt)}
      </p>
    </article>
  )
}
