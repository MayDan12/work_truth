"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SitePageFrame } from "@/components/contrair/site-shell";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/contrair/typography";
import { ReviewCard } from "@/components/contrair/data-views";
import { getFirebaseAuth, getFirebaseFirestore } from "@/lib/firebase";
import { parseWorkplaceReview } from "@/lib/firebase-reviews";
import { getCompanySlug, type WorkplaceReview } from "@/lib/worktruth-data";

type AccessState = "loading" | "signed-out" | "not-admin" | "admin" | "error";

export default function AdminPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [access, setAccess] = useState<AccessState>("loading");
  const [adminUid, setAdminUid] = useState<string | null>(null);
  const [reviews, setReviews] = useState<WorkplaceReview[]>([]);
  const [queueLoading, setQueueLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workingReview, setWorkingReview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let unsubscribe: Unsubscribe | undefined;

    Promise.resolve().then(() => {
      if (!active) return;
      try {
        unsubscribe = onAuthStateChanged(
          getFirebaseAuth(),
          (currentUser) => {
            setUser(currentUser);
            setAdminUid(null);
            setAccess("loading");
            setReviews([]);
          },
          (authError) => {
            console.error(
              "Could not read Firebase admin sign-in state.",
              authError,
            );
            setError(
              "Admin sign-in could not be checked. Please reload the page.",
            );
            setUser(null);
          },
        );
      } catch (authError) {
        console.error(
          "Could not initialize Firebase Authentication.",
          authError,
        );
        setError(
          authError instanceof Error
            ? authError.message
            : "Firebase Authentication could not be initialized.",
        );
        setUser(null);
      }
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    let active = true;
    let unsubscribeReviews: Unsubscribe | undefined;

    if (!user) return;

    getDoc(doc(getFirebaseFirestore(), "admins", user.uid)).then(
      (adminDocument) => {
        if (!active) return;
        if (!adminDocument.exists() || adminDocument.data().role !== "admin") {
          setAccess("not-admin");
          return;
        }
        setAdminUid(user.uid);
        setAccess("admin");
        setQueueLoading(true);

        try {
          unsubscribeReviews = onSnapshot(
            query(
              collection(getFirebaseFirestore(), "reviews"),
              where("moderationStatus", "==", "pending"),
              orderBy("createdAt", "desc"),
            ),
            (snapshot) => {
              if (!active) return;
              try {
                setReviews(
                  snapshot.docs.map((review) =>
                    parseWorkplaceReview(review.id, review.data()),
                  ),
                );
                setAccess("admin");
                setQueueLoading(false);
              } catch (reviewError) {
                console.error(
                  "Could not read a review in the moderation queue.",
                  reviewError,
                );
                setError(
                  "A review has invalid data and could not be displayed.",
                );
                setQueueLoading(false);
              }
            },
            (queueError) => {
              if (!active) return;
              console.error(
                "Could not load the review moderation queue.",
                queueError,
              );
              setError(
                "The moderation queue could not be loaded. Check Firestore rules and indexes.",
              );
              setQueueLoading(false);
            },
          );
        } catch (queueError) {
          console.error(
            "Could not connect to the review moderation queue.",
            queueError,
          );
          setError(
            queueError instanceof Error
              ? queueError.message
              : "The moderation queue could not be loaded.",
          );
          setQueueLoading(false);
        }
      },
      (adminError) => {
        if (!active) return;
        console.error("Could not verify the admin role document.", adminError);
        setError(
          "Your admin role could not be checked. Check Firestore rules and try again.",
        );
        setAccess("error");
        setAdminUid(user.uid);
      },
    );

    return () => {
      active = false;
      unsubscribeReviews?.();
    };
  }, [user]);

  const visibleAccess: AccessState =
    user === undefined
      ? "loading"
      : user === null
        ? "signed-out"
        : adminUid === user.uid
          ? access
          : access === "not-admin"
            ? "not-admin"
            : "loading";

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(
        getFirebaseAuth(),
        email.trim(),
        password,
      );
      setPassword("");
    } catch (authError) {
      console.error("Admin sign-in failed.", authError);
      setError(
        "Could not sign in. Check your email and password and try again.",
      );
    }
  }

  async function handleSignOut() {
    setError("");
    try {
      await signOut(getFirebaseAuth());
    } catch (authError) {
      console.error("Admin sign-out failed.", authError);
      setError("Could not sign out. Please try again.");
    }
  }

  async function moderateReview(
    review: WorkplaceReview,
    status: "approved" | "rejected",
  ) {
    setWorkingReview(review.id);
    setError("");
    try {
      await updateDoc(doc(getFirebaseFirestore(), "reviews", review.id), {
        ...(status === "approved" && {
          companySlug: getCompanySlug(review.companyName),
        }),
        moderationStatus: status,
        moderatedAt: serverTimestamp(),
      });
    } catch (moderationError) {
      console.error(
        `Could not mark review ${review.id} as ${status}.`,
        moderationError,
      );
      setError(
        "The review could not be updated. Check your admin role and Firestore rules.",
      );
    } finally {
      setWorkingReview("");
    }
  }

  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <Link className="text-link" href="/">
          Back to Contrair
        </Link>
        <TypographyH1 className="mt-8 text-[clamp(2rem,4vw,3rem)]">
          Review moderation
        </TypographyH1>
        <TypographyP className="section-intro">
          Only signed-in users with the Firebase admin role can access
          submissions.
        </TypographyP>

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        {visibleAccess === "loading" ? (
          <p aria-live="polite" className="form-help" role="status">
            Checking admin access…
          </p>
        ) : null}

        {visibleAccess === "signed-out" ? (
          <form className="review-form max-w-[32rem]" onSubmit={handleSignIn}>
            <div className="form-field">
              <Label htmlFor="admin-email">Admin email</Label>
              <Input
                autoComplete="username"
                id="admin-email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </div>
            <div className="form-field">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                autoComplete="current-password"
                id="admin-password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </div>
            <Button className="form-submit" size="lg" type="submit">
              Sign in
            </Button>
          </form>
        ) : null}

        {visibleAccess === "not-admin" ? (
          <section className="notice-panel">
            <TypographyH2 className="text-base font-semibold tracking-normal">
              This account is not an admin
            </TypographyH2>
            <TypographyP className="mt-2">
              Ask a project owner to add this user&apos;s UID to the Firestore
              admins collection.
            </TypographyP>
            <Button className="mt-4" onClick={handleSignOut} type="button">
              Sign out
            </Button>
          </section>
        ) : null}

        {visibleAccess === "error" ? (
          <section className="notice-panel">
            <TypographyH2 className="text-base font-semibold tracking-normal">
              Admin access could not be verified
            </TypographyH2>
            <TypographyP className="mt-2">
              Check that your UID has an `admins` document with `role` set to
              `admin`, and that the Firestore rules have been published.
            </TypographyP>
            <Button className="mt-4" onClick={handleSignOut} type="button">
              Sign out
            </Button>
          </section>
        ) : null}

        {visibleAccess === "admin" ? (
          <section aria-labelledby="pending-reviews-title" className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <TypographyH2 id="pending-reviews-title">
                Pending reviews ({reviews.length})
              </TypographyH2>
              <Button onClick={handleSignOut} type="button" variant="outline">
                Sign out
              </Button>
            </div>
            {queueLoading ? (
              <p aria-live="polite" className="form-help mt-6" role="status">
                Loading pending reviews…
              </p>
            ) : reviews.length === 0 ? (
              <p className="empty-state mt-6">
                There are no reviews waiting for moderation.
              </p>
            ) : (
              <div className="review-grid mt-6">
                {reviews.map((review) => (
                  <div key={review.id}>
                    <ReviewCard review={review} />
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        disabled={workingReview !== ""}
                        onClick={() => moderateReview(review, "approved")}
                        type="button"
                      >
                        Approve and publish
                      </Button>
                      <Button
                        disabled={workingReview !== ""}
                        onClick={() => moderateReview(review, "rejected")}
                        type="button"
                        variant="outline"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : null}
      </main>
    </SitePageFrame>
  );
}
// jkbikbkbj
