export type EmployeeStatus = "Current employee" | "Former employee"

export type WorkplaceReview = {
  id: string
  companyName: string
  companySlug: string
  role: string
  employmentStatus: EmployeeStatus
  rating: number
  pros: string
  cons: string
  createdAt: Date
}

export type Company = {
  slug: string
  name: string
  reviews: WorkplaceReview[]
}

export function getAverageRating(company: Company): number | null {
  if (company.reviews.length === 0) return null

  const total = company.reviews.reduce((sum, review) => sum + review.rating, 0)
  return total / company.reviews.length
}

export function getCompanySlug(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-NG")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function groupReviewsByCompany(reviews: WorkplaceReview[]): Company[] {
  const companiesBySlug = new Map<string, Company>()

  for (const review of reviews) {
    const company = companiesBySlug.get(review.companySlug)
    if (company) {
      company.reviews.push(review)
    } else {
      companiesBySlug.set(review.companySlug, {
        slug: review.companySlug,
        name: review.companyName,
        reviews: [review],
      })
    }
  }

  return [...companiesBySlug.values()]
}
