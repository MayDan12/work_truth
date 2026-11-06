"use client";

import "client-only";
import { Timestamp, type DocumentData } from "firebase/firestore";
import {
  getCompanySlug,
  type EmployeeStatus,
  type WorkplaceReview,
} from "@/lib/worktruth-data";

export function parseWorkplaceReview(
  id: string,
  data: DocumentData,
): WorkplaceReview {
  const review =
    typeof data.review === "string"
      ? data.review
      : typeof data.pros === "string" && typeof data.cons === "string"
        ? `What worked well?\n${data.pros}\n\nWhat could have been better?\n${data.cons}`
        : null;

  if (
    typeof data.companyName !== "string" ||
    typeof data.role !== "string" ||
    (data.employmentStatus !== "Current employee" &&
      data.employmentStatus !== "Former employee") ||
    typeof data.rating !== "number" ||
    !Number.isInteger(data.rating) ||
    data.rating < 1 ||
    data.rating > 5 ||
    review === null ||
    !(data.createdAt instanceof Timestamp)
  ) {
    throw new Error(`Review ${id} has an invalid Firestore document shape.`);
  }

  return {
    id,
    companyName: data.companyName,
    companySlug:
      typeof data.companySlug === "string"
        ? data.companySlug
        : getCompanySlug(data.companyName),
    role: data.role,
    employmentStatus: data.employmentStatus as EmployeeStatus,
    rating: data.rating,
    review,
    createdAt: data.createdAt.toDate(),
  };
}
