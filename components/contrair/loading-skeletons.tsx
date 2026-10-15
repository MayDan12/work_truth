import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function LoadingSpinner({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-live="polite"
      className={cn("flex items-center gap-3 text-muted-foreground", className)}
      role="status"
    >
      <svg
        aria-hidden="true"
        className="size-4 animate-spin text-primary"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          className="opacity-80"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
      <span className="text-sm">{label}</span>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function CompanyCardSkeleton() {
  return (
    <div aria-hidden="true" className="company-record pointer-events-none select-none">
      <Skeleton className="h-5 w-36 mb-2.5" />
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="size-3.5 rounded-full" />
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-3.5 w-24" />
      </div>
      <Skeleton className="h-3.5 w-48 mt-1" />
    </div>
  );
}

export function CompanyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading companies"
      className="company-grid"
      role="status"
    >
      {Array.from({ length: count }).map((_, index) => (
        <CompanyCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading companies…</span>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="review-card pointer-events-none select-none"
    >
      <header className="review-card-header">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3.5 w-24" />
        </div>
        <div className="flex items-center gap-1.5">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-5 w-12" />
        </div>
      </header>

      <div className="pros-cons">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-3/4" />
        </div>
      </div>

      <Skeleton className="h-3 w-28 mt-4" />
    </div>
  );
}

export function ReviewGridSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading reviews"
      className="review-grid"
      role="status"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ReviewCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading reviews…</span>
    </div>
  );
}

export function OverviewSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading recent workplace reviews"
      className="sample-preview"
      role="status"
    >
      <header className="sample-preview-head">
        <div className="space-y-2">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-3.5 w-44" />
        </div>
      </header>
      <div className="approved-overview-reviews">
        <ReviewCardSkeleton />
      </div>
      <Skeleton className="h-3.5 w-36 mt-4" />
      <span className="sr-only">Loading recent reviews…</span>
    </article>
  );
}

export function CompanyDirectorySkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading company directory" role="status">
      <div className="company-list-toolbar">
        <div className="company-search opacity-60 pointer-events-none">
          <div className="company-search-field">
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
      </div>
      <div className="my-4">
        <Skeleton className="h-4 w-40" />
      </div>
      <CompanyGridSkeleton count={6} />
      <span className="sr-only">Loading directory…</span>
    </div>
  );
}

export function CompanyDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading company details" role="status">
      <section className="mt-8 space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-64 sm:w-80" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-4 w-32" />
        </div>
      </section>
      <section className="mt-12 space-y-6">
        <Skeleton className="h-7 w-52" />
        <ReviewGridSkeleton count={2} />
      </section>
      <span className="sr-only">Loading company details…</span>
    </div>
  );
}

