"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { TypographyP } from "@/components/contrair/typography";
import { getFirebaseFirestore } from "@/lib/firebase";
import { getCompanySlug } from "@/lib/worktruth-data";

export function ReviewSubmissionForm() {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setSubmitted(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const companyName = String(formData.get("company") ?? "").trim();
    const companySlug = getCompanySlug(companyName);
    const role = String(formData.get("role") ?? "").trim();
    const employmentStatus = String(formData.get("employmentStatus") ?? "");
    const rating = Number(formData.get("rating"));
    const pros = String(formData.get("pros") ?? "").trim();
    const cons = String(formData.get("cons") ?? "").trim();

    if (!companySlug) {
      setError("Enter a company name containing letters or numbers.");
      setPending(false);
      return;
    }

    if (
      !role ||
      !["Current employee", "Former employee"].includes(employmentStatus) ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      pros.length < 10 ||
      cons.length < 10
    ) {
      setError(
        "Complete each field and make both written responses at least 10 characters.",
      );
      setPending(false);
      return;
    }

    try {
      await addDoc(collection(getFirebaseFirestore(), "reviews"), {
        companyName,
        role,
        employmentStatus,
        rating,
        pros,
        cons,
        createdAt: serverTimestamp(),
        moderationStatus: "pending",
      });
      form.reset();
      setSubmitted(true);
    } catch (submissionError) {
      console.error("Could not submit workplace review.", submissionError);
      setError(
        "Your review could not be submitted. Please check your connection and Firebase setup, then try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <div className="notice-panel" id="review-form-privacy-note">
        <TypographyP>
          Your review is sent to Contrair for moderation. It is not visible on
          the site unless it is approved. We do not ask for your name or account
          details; avoid details in your review that could identify you or
          another person.
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
          <NativeSelect
            id="review-status"
            name="employmentStatus"
            required
            className="w-full"
          >
            <NativeSelectOption value="">Choose a status</NativeSelectOption>
            <NativeSelectOption value="Current employee">
              Current employee
            </NativeSelectOption>
            <NativeSelectOption value="Former employee">
              Former employee
            </NativeSelectOption>
          </NativeSelect>
        </div>

        <div className="form-field">
          <Label htmlFor="review-rating">Overall rating</Label>
          <NativeSelect
            id="review-rating"
            name="rating"
            required
            className="w-full"
          >
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
        {submitted ? (
          <p aria-live="polite" className="form-help" role="status">
            Your review was submitted for moderation. It will appear on the site
            only if Contrair approves it.
          </p>
        ) : null}
        <Button
          className="form-submit"
          disabled={pending}
          size="lg"
          type="submit"
        >
          {pending ? "Submitting review…" : "Submit review for moderation"}
        </Button>
      </form>
    </div>
  );
}
