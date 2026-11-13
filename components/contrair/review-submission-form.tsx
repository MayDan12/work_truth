"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Star } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { getFirebaseFirestore } from "@/lib/firebase";
import { getCompanySlug } from "@/lib/worktruth-data";

export function ReviewSubmissionForm() {
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [notificationError, setNotificationError] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [formToSubmit, setFormToSubmit] = useState<HTMLFormElement | null>(
    null,
  );
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFormToSubmit(event.currentTarget);
    setConfirmationOpen(true);
  }

  async function handleConfirmedSubmit() {
    if (!formToSubmit) {
      setError("Please review your details and try submitting again.");
      setConfirmationOpen(false);
      return;
    }

    setPending(true);
    setSubmitted(false);
    setConfettiVisible(false);
    setError("");
    setNotificationError("");

    const form = formToSubmit;
    const formData = new FormData(form);
    const companyName = String(formData.get("company") ?? "").trim();
    const companySlug = getCompanySlug(companyName);
    const role = String(formData.get("role") ?? "").trim();
    const employmentStatus = String(formData.get("employmentStatus") ?? "");
    const rating = Number(formData.get("rating"));
    const review = String(formData.get("review") ?? "").trim();
    const acceptedTerms = formData.get("acceptedTerms") === "on";

    if (!companySlug) {
      setError("Enter a company name containing letters or numbers.");
      setPending(false);
      setConfirmationOpen(false);
      return;
    }

    if (
      !role ||
      !["Current employee", "Former employee"].includes(employmentStatus) ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      review.length < 10 ||
      review.length > 1600 ||
      !acceptedTerms
    ) {
      setError(
        "Complete each field, make your review between 10 and 1,600 characters, and accept the Terms of Service and Community Guidelines.",
      );
      setPending(false);
      setConfirmationOpen(false);
      return;
    }

    try {
      await addDoc(collection(getFirebaseFirestore(), "reviews"), {
        companyName,
        role,
        employmentStatus,
        rating,
        review,
        createdAt: serverTimestamp(),
        moderationStatus: "pending",
      });
      form.reset();
      setSelectedRating(0);
      setHoverRating(null);
      setTermsAccepted(false);
      setFormToSubmit(null);
      setSubmitted(true);
      setConfirmationOpen(false);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setConfettiSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        setConfettiVisible(true);
      }

      try {
        const notificationResponse = await fetch("/api/review-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName,
            role,
            employmentStatus,
            rating,
            review,
          }),
        });

        if (!notificationResponse.ok) {
          console.error(
            "Could not send workplace review notification.",
            notificationResponse.status,
          );
          setNotificationError(
            "Your review was submitted, but GistHQ could not be notified by email.",
          );
        }
      } catch (notificationSubmissionError) {
        console.error(
          "Could not send workplace review notification.",
          notificationSubmissionError,
        );
        setNotificationError(
          "Your review was submitted, but GistHQ could not be notified by email.",
        );
      }
    } catch (submissionError) {
      console.error("Could not submit workplace review.", submissionError);
      setError(
        "Your review could not be submitted. Please check your connection and Firebase setup, then try again.",
      );
      setConfirmationOpen(false);
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
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
            className="h-11"
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
            className="h-11"
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
            className="w-full [&>select]:h-11"
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

        <fieldset
          aria-describedby="review-rating-help"
          className="form-field review-rating-fieldset"
        >
          <legend className="review-rating-legend">Overall rating</legend>
          <div
            className="review-rating"
            onMouseLeave={() => setHoverRating(null)}
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <label
                className={`review-rating-option ${
                  rating <= (hoverRating ?? selectedRating) ? "is-active" : ""
                }`}
                key={rating}
                onMouseEnter={() => setHoverRating(rating)}
              >
                <input
                  aria-label={`${rating} out of 5 stars`}
                  checked={selectedRating === rating}
                  className="sr-only"
                  name="rating"
                  onChange={() => setSelectedRating(rating)}
                  required
                  type="radio"
                  value={String(rating)}
                />
                <Star aria-hidden="true" />
              </label>
            ))}
          </div>
          <p className="form-help" id="review-rating-help">
            Select 1 to 5 stars.
          </p>
        </fieldset>

        <div className="form-field">
          <Label htmlFor="review-text">
            Your review (Feel free to explain what was good and what could be
            better)
          </Label>
          <Textarea
            aria-describedby="review-text-help"
            id="review-text"
            maxLength={1600}
            minLength={10}
            name="review"
            placeholder="Share your honest, constructive workplace experience."
            required
            rows={7}
            className="min-h-36"
          />
          <p className="form-help" id="review-text-help">
            Feel free to explain what was good and what could be better.
          </p>
        </div>

        <div className="form-field">
          <div className="flex items-start gap-3">
            <input
              className="mt-1 size-4 shrink-0 accent-primary"
              checked={termsAccepted}
              id="review-terms"
              name="acceptedTerms"
              onChange={(event) =>
                setTermsAccepted(event.currentTarget.checked)
              }
              required
              type="checkbox"
            />
            <Label
              className="cursor-pointer text-sm leading-relaxed font-normal"
              htmlFor="review-terms"
            >
              I confirm this review reflects my genuine, first-hand workplace
              experience, agree to the Terms of Service and Community
              Guidelines, and have read the Privacy Policy.
            </Label>
          </div>
          <p className="form-help" id="review-form-privacy-note">
            Read the{" "}
            <Link className="text-link" href="/terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="text-link" href="/community-guidelines">
              Community Guidelines
            </Link>
            , and{" "}
            <Link className="text-link" href="/privacy">
              Privacy Policy
            </Link>
            . Do not include names, identifying details, or confidential
            information.
          </p>
        </div>

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        {submitted ? (
          <p aria-live="polite" className="form-help" role="status">
            Your review was submitted for moderation. It will appear on the site
            only if GistHQ approves it.
          </p>
        ) : null}
        {confettiVisible ? (
          <div aria-hidden="true" className="review-confetti">
            <Confetti
              colors={["#315e46", "#b48b3a", "#d57c52", "#87a892"]}
              gravity={0.25}
              height={confettiSize.height}
              numberOfPieces={140}
              onConfettiComplete={() => setConfettiVisible(false)}
              recycle={false}
              tweenDuration={700}
              width={confettiSize.width}
            />
          </div>
        ) : null}
        {notificationError ? (
          <p className="form-error" role="alert">
            {notificationError}
          </p>
        ) : null}
        <Button
          className="form-submit"
          disabled={pending}
          size="lg"
          type="submit"
          variant={termsAccepted ? "default" : "secondary"}
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="size-4 animate-spin"
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
                  className="opacity-90"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
              <span>Submitting review…</span>
            </span>
          ) : (
            "Submit review "
          )}
        </Button>
      </form>
      <AlertDialog onOpenChange={setConfirmationOpen} open={confirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ready to submit your review?</AlertDialogTitle>
            <AlertDialogDescription>
              You can go back to make changes now. Once submitted, your review
              will be sent for moderation and you will not be able to edit it
              here.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>
              Go back and edit
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={pending}
              onClick={handleConfirmedSubmit}
              type="button"
            >
              {pending ? "Submitting…" : "Yes, submit review"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
