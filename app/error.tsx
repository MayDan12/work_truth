"use client"

import { Button } from "@/components/ui/button"
import { TypographyH1, TypographyP } from "@/components/worktruth/typography"

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="page-container info-page">
      <TypographyH1 className="text-[clamp(2rem,4vw,3rem)]">
        This page could not be loaded.
      </TypographyH1>
      <TypographyP className="section-intro">
        Try loading the page again.
      </TypographyP>
      <Button className="form-submit mt-6" onClick={reset} size="lg" type="button">
        Try again
      </Button>
    </main>
  )
}
