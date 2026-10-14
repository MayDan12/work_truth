"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { TypographyH2, TypographyH3, TypographyP } from "@/components/worktruth/typography"

type ReviewDraft = {
  company: string
  role: string
  status: string
  rating: string
  pros: string
  cons: string
}

export function ReviewPreviewForm() {
  const [draft, setDraft] = useState<ReviewDraft | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError("")
    setDraft(null)

    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      await new Promise<void>((resolve) => window.setTimeout(resolve, 180))

      setDraft({
        company: String(formData.get("company") ?? ""),
        role: String(formData.get("role") ?? ""),
        status: String(formData.get("status") ?? ""),
        rating: String(formData.get("rating") ?? ""),
        pros: String(formData.get("pros") ?? ""),
        cons: String(formData.get("cons") ?? ""),
      })
    } catch {
      setError("The preview could not be prepared. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <div>
      <div className="notice-panel" id="review-form-privacy-note">
        <TypographyP>
          You can preview an example here, but this prototype has no review
          service connected. Nothing you enter is sent to Worktruth, saved, or
          published. Avoid details that could identify you; public identity display
          is not a promise of absolute anonymity.
        </TypographyP>
      </div>

      <form
        aria-describedby="review-form-privacy-note"
        className="review-form"
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <Label htmlFor="review-company">Company name</Label>
          <Input
            autoComplete="organization"
            id="review-company"
            maxLength={100}
            name="company"
            placeholder="Company name"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="review-role">Broad job title</Label>
          <Input
            aria-describedby="review-role-help"
            id="review-role"
            maxLength={80}
            name="role"
            placeholder="For example, product designer"
            required
          />
          <p className="form-help" id="review-role-help">
            Keep the description broad; avoid team names or details that could
            identify you.
          </p>
        </div>

        <div className="form-field">
          <Label htmlFor="review-status">Employment status</Label>
          <NativeSelect id="review-status" name="status" required className="w-full">
            <NativeSelectOption value="">Choose a status</NativeSelectOption>
            <NativeSelectOption value="Current employee">Current employee</NativeSelectOption>
            <NativeSelectOption value="Former employee">Former employee</NativeSelectOption>
          </NativeSelect>
        </div>

        <div className="form-field">
          <Label htmlFor="review-rating">Overall rating</Label>
          <NativeSelect id="review-rating" name="rating" required className="w-full">
            <NativeSelectOption value="">Choose a rating</NativeSelectOption>
            {[1, 2, 3, 4, 5].map((rating) => (
              <NativeSelectOption key={rating} value={String(rating)}>
                {rating} out of 5
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        <div className="form-field">
          <Label htmlFor="review-pros">What worked well?</Label>
          <Textarea
            id="review-pros"
            maxLength={800}
            minLength={10}
            name="pros"
            placeholder="Share a specific, constructive example."
            required
            rows={4}
          />
        </div>

        <div className="form-field">
          <Label htmlFor="review-cons">What could have been better?</Label>
          <Textarea
            id="review-cons"
            maxLength={800}
            minLength={10}
            name="cons"
            placeholder="Describe a challenge without naming individuals."
            required
            rows={4}
          />
        </div>

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        {pending ? (
          <p aria-live="polite" className="form-help" role="status">
            Preparing a local preview…
          </p>
        ) : null}
        <Button className="form-submit" disabled={pending} size="lg" type="submit">
          {pending ? "Preparing preview…" : "Preview this review"}
        </Button>
      </form>

      {draft ? (
        <section
          aria-labelledby="preview-title"
          aria-live="polite"
          className="preview-confirmation"
          role="status"
        >
          <TypographyH2 className="text-base font-semibold tracking-normal" id="preview-title">
            Your local review preview
          </TypographyH2>
          <TypographyH3 className="mt-4">{draft.company}</TypographyH3>
          <p>
            {draft.role} · {draft.status} · Overall rating: {draft.rating} out of 5
          </p>
          <p><strong>Pros:</strong> {draft.pros}</p>
          <p><strong>Cons:</strong> {draft.cons}</p>
          <p>
            This is a private preview held only in this page&apos;s memory. Nothing
            has been sent, saved, moderated, or published.
          </p>
        </section>
      ) : null}
    </div>
  )
}
