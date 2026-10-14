import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  EyeOff,
  MessagesSquare,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CompanySearchForm } from "@/components/worktruth/company-search-form";
import {
  CompanyCard,
  Rating,
  ReviewCard,
} from "@/components/worktruth/data-views";
import { SiteFooter, SiteHeader } from "@/components/worktruth/site-shell";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/worktruth/typography";
import {
  companies,
  demoContentNotice,
  getAverageRating,
  getCompanyBySlug,
  reviews,
} from "@/lib/worktruth-data";

const benefits = [
  {
    icon: MessagesSquare,
    title: "Real Workplace Experiences",
    description: "Learn from current and former employees who have been there.",
  },
  {
    icon: EyeOff,
    title: "Anonymous by Design",
    description:
      "Share without creating an account or displaying your identity publicly.",
  },
  {
    icon: ClipboardCheck,
    title: "Human-Reviewed Feedback",
    description: "Every review is moderated by a person before publication.",
  },
];

const processSteps = [
  {
    title: "Find a company.",
    description:
      "Search Nigerian technology companies you are considering, or browse the directory.",
  },
  {
    title: "Read employee experiences.",
    description:
      "Explore perspectives on culture, management, compensation and benefits, work-life balance, and career growth.",
  },
  {
    title: "Share your own experience anonymously.",
    description:
      "Write without an account. Every review is moderated by a person before publication.",
  },
];

export default function Home() {
  const featuredCompany = getCompanyBySlug("korastack-studio");
  const featuredReview = reviews.find(
    (review) => review.companySlug === "korastack-studio",
  );
  const exampleReviews = [reviews[0], reviews[1]];

  if (!featuredCompany || !featuredReview) {
    throw new Error("Worktruth sample content is unavailable.");
  }

  return (
    <div className="site-page">
      <SiteHeader />
      <main id="main-content">
        <section
          aria-labelledby="hero-title"
          className="page-container hero-section"
        >
          <div className="hero-copy text-center">
            <TypographyH1 id="hero-title">
              Know what it&apos;s really like to work there.
            </TypographyH1>
            <TypographyP className="hero-description">
              Honest workplace experiences from people who have been there.
              Research Nigerian tech companies before you make your next career
              move.
            </TypographyP>
          </div>

          <CompanySearchForm />

          <div className="hero-actions">
            <Link className="text-link" href="/write-review">
              Share Your Experience
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <p className="trust-note">
              <EyeOff aria-hidden="true" className="size-4 text-primary" />
              Read anonymously. Share without an account.
            </p>
          </div>

          <article
            aria-labelledby="sample-company-name"
            className="sample-preview"
          >
            <header className="sample-preview-head">
              <div>
                <div className="sample-company-heading">
                  <TypographyH2
                    className="text-[1.3rem]"
                    id="sample-company-name"
                  >
                    {featuredCompany.name}
                  </TypographyH2>
                  <span className="sample-label">
                    Fictional example · Sample preview — not published feedback
                  </span>
                </div>
                <p className="sample-company-meta">
                  {featuredCompany.industry} · {featuredCompany.location},
                  Nigeria
                </p>
              </div>
              <Rating
                count={featuredCompany.reviews.length}
                value={getAverageRating(featuredCompany)}
              />
            </header>
            <div className="sample-review-body">
              <p className="sample-label">A sample experience</p>
              <div>
                <TypographyH3>
                  Room to learn, with a few trade-offs
                </TypographyH3>
                <TypographyP className="sample-review-quote">
                  “Teammates made time to share context, and I had room to take
                  ownership of meaningful product work. Priorities could change
                  quickly, so planning a week ahead sometimes needed
                  flexibility.”
                </TypographyP>
                <p className="sample-review-summary">
                  <strong>Pros</strong> Supportive peers · Broad
                  ownership&nbsp;&nbsp;
                  <strong>Cons</strong> Changing priorities
                </p>
              </div>
            </div>
          </article>
          <p className="demo-disclaimer">{demoContentNotice}</p>
        </section>

        <section
          aria-labelledby="values-title"
          className="page-container section"
        >
          <TypographyH2 id="values-title">
            Make career decisions with more context.
          </TypographyH2>
          <div className="value-grid">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article className="value-item" key={title}>
                <Icon aria-hidden="true" className="value-icon" />
                <TypographyH3 className="value-title">{title}</TypographyH3>
                <TypographyP className="value-description">
                  {description}
                </TypographyP>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="how-title"
          className="how-section section"
          id="how-it-works"
        >
          <div className="page-container">
            <TypographyH2 id="how-title">How it works</TypographyH2>
            <ol className="steps-list">
              {processSteps.map((step, index) => (
                <li className="step-item" key={step.title}>
                  <span className="step-number">0{index + 1}</span>
                  <TypographyH3>{step.title}</TypographyH3>
                  <TypographyP>{step.description}</TypographyP>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="discovery-title"
          className="page-container section"
        >
          <div className="discovery-header">
            <div>
              <TypographyH2 id="discovery-title">
                Get to know the companies behind the job titles.
              </TypographyH2>
              <p className="discovery-note">
                Fictional sample companies and illustrative review data — not
                real employer feedback.
              </p>
            </div>
            <Link className="text-link" href="/companies">
              Explore Companies{" "}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="company-grid">
            {companies.map((company) => (
              <CompanyCard company={company} key={company.slug} />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="reviews-title"
          className="review-section section"
        >
          <div className="page-container">
            <TypographyH2 id="reviews-title">
              More than a rating. Real workplace context.
            </TypographyH2>
            <TypographyP className="section-intro">
              A score is a starting point. The details help explain what work
              can feel like day to day. These examples are fictional and
              unpublished.
            </TypographyP>
            <div className="review-grid">
              {exampleReviews.map((review) => {
                const company = getCompanyBySlug(review.companySlug);
                return company ? (
                  <ReviewCard
                    company={company}
                    key={review.id}
                    review={review}
                  />
                ) : null;
              })}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="privacy-title"
          className="privacy-section section"
        >
          <div className="page-container privacy-layout">
            <TypographyH2 id="privacy-title">
              Your experience. Shared on your terms.
            </TypographyH2>
            <div className="privacy-copy">
              <TypographyP>
                You don&apos;t need an account to submit a review. Public
                reviews do not display the author&apos;s identity. Every
                submission is manually moderated before publication.
              </TypographyP>
              <TypographyP>
                Moderation helps us apply our community guidelines; it does not
                mean every statement has been independently verified. We
                can&apos;t promise absolute anonymity, so avoid details that
                could identify you in a review.
              </TypographyP>
              <div className="privacy-links">
                <Link className="text-link" href="/community-guidelines">
                  Community Guidelines{" "}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
                <Link className="text-link" href="/privacy">
                  Privacy <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="final-title" className="cta-band">
          <div className="page-container cta-inner">
            <div className="cta-copy">
              <TypographyH2 className="cta-title" id="final-title">
                Help someone make a better career decision.
              </TypographyH2>
              <TypographyP>
                Your workplace experience could give someone the context they
                need before accepting their next offer.
              </TypographyP>
            </div>
            <div className="cta-actions">
              <Link
                className={cn(buttonVariants({ size: "lg" }), "cta-primary")}
                href="/write-review"
              >
                Write an Anonymous Review
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link className="cta-secondary" href="/companies">
                Find a Company
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
