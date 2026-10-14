export type EmployeeStatus = "Current employee" | "Former employee"

export type WorkplaceReview = {
  id: string
  companySlug: string
  role: string
  status: EmployeeStatus
  rating: number
  pros: string
  cons: string
  sampleDate: string
}

export type Company = {
  slug: string
  name: string
  industry: string
  location: string
  ratingSummary: string
  reviews: WorkplaceReview[]
}

export const reviews: WorkplaceReview[] = [
  {
    id: "korastack-product-designer",
    companySlug: "korastack-studio",
    role: "Product designer",
    status: "Former employee",
    rating: 4.2,
    pros: "Teammates made time to share context, and I had room to take ownership of meaningful product work.",
    cons: "Priorities could change quickly, so planning a week ahead sometimes needed flexibility.",
    sampleDate: "March 2025",
  },
  {
    id: "northstar-engineer-current",
    companySlug: "northstar-stack-works",
    role: "Backend engineer",
    status: "Current employee",
    rating: 3.6,
    pros: "I have been able to learn unfamiliar systems and contribute to technical decisions.",
    cons: "Workload can be uneven, and expectations are not always clear across teams.",
    sampleDate: "January 2025",
  },
  {
    id: "northstar-engineer-former",
    companySlug: "northstar-stack-works",
    role: "Software engineer",
    status: "Former employee",
    rating: 3.4,
    pros: "People were willing to explain the product and make time for peer reviews.",
    cons: "During busy periods, handoffs and delivery expectations could have been clearer.",
    sampleDate: "November 2024",
  },
  {
    id: "blueokra-content-designer",
    companySlug: "blue-okra-digital",
    role: "Content designer",
    status: "Former employee",
    rating: 4.5,
    pros: "Craft was valued, and critique sessions helped the team make thoughtful decisions.",
    cons: "Some projects had tight timelines, leaving less time for early exploration.",
    sampleDate: "February 2025",
  },
  {
    id: "lantern-pay-analyst",
    companySlug: "lantern-pay-lab",
    role: "Product analyst",
    status: "Current employee",
    rating: 3.6,
    pros: "I can see how customer feedback shapes the work, and the team shares useful context.",
    cons: "Plans can move quickly, and priorities are not always documented in one place.",
    sampleDate: "December 2024",
  },
  {
    id: "echopalm-qa-engineer",
    companySlug: "echopalm-product-co",
    role: "QA engineer",
    status: "Former employee",
    rating: 4,
    pros: "The team collaborated closely and made room to learn new parts of the product.",
    cons: "Release periods could be busy, especially when several projects overlapped.",
    sampleDate: "October 2024",
  },
]

export const companies: Company[] = [
  {
    slug: "korastack-studio",
    name: "KoraStack Studio",
    industry: "Software development",
    location: "Lagos",
    ratingSummary: "Supportive peers, with priorities that can shift.",
    reviews: reviews.filter((review) => review.companySlug === "korastack-studio"),
  },
  {
    slug: "northstar-stack-works",
    name: "Northstar Stack Works",
    industry: "Cloud tools",
    location: "Abuja",
    ratingSummary: "Strong learning opportunities; workload can vary.",
    reviews: reviews.filter((review) => review.companySlug === "northstar-stack-works"),
  },
  {
    slug: "blue-okra-digital",
    name: "Blue Okra Digital",
    industry: "Product design",
    location: "Lagos",
    ratingSummary: "Thoughtful craft and useful team feedback.",
    reviews: reviews.filter((review) => review.companySlug === "blue-okra-digital"),
  },
  {
    slug: "lantern-pay-lab",
    name: "Lantern Pay Lab",
    industry: "Financial technology",
    location: "Lagos",
    ratingSummary: "Purposeful work in a fast-moving environment.",
    reviews: reviews.filter((review) => review.companySlug === "lantern-pay-lab"),
  },
  {
    slug: "echopalm-product-co",
    name: "EchoPalm Product Co.",
    industry: "Mobile products",
    location: "Port Harcourt",
    ratingSummary: "Close collaboration and room to learn.",
    reviews: reviews.filter((review) => review.companySlug === "echopalm-product-co"),
  },
  {
    slug: "mossline-prototype-studio",
    name: "Mossline Prototype Studio",
    industry: "Software tools",
    location: "Ibadan",
    ratingSummary: "No sample reviews yet.",
    reviews: [],
  },
]

export function getAverageRating(company: Company): number | null {
  if (company.reviews.length === 0) return null

  const total = company.reviews.reduce((sum, review) => sum + review.rating, 0)
  return total / company.reviews.length
}

export function searchCompanies(query: string): Company[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("en-NG")
  if (!normalizedQuery) return companies

  return companies.filter((company) =>
    [company.name, company.industry, company.location]
      .join(" ")
      .toLocaleLowerCase("en-NG")
      .includes(normalizedQuery),
  )
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug)
}

export const demoContentNotice =
  "All company names, ratings and review examples on this website are fictional sample content. They do not describe real employers and have not been published."
