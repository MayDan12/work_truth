"use client"

import "client-only"
import { Timestamp, type DocumentData } from "firebase/firestore"
import {
  getCompanySlug,
  type EmployeeStatus,
  type WorkplaceReview,
} from "@/lib/worktruth-data"

export function parseWorkplaceReview(
  id: string,
  data: DocumentData,
): WorkplaceReview {
  if (
    typeof data.companyName !== "string" ||
    typeof data.role !== "string" ||
    (data.employmentStatus !== "Current employee" &&
      data.employmentStatus !== "Former employee") ||
    typeof data.rating !== "number" ||
    !Number.isInteger(data.rating) ||
    data.rating < 1 ||
    data.rating > 5 ||
    typeof data.pros !== "string" ||
    typeof data.cons !== "string" ||
    !(data.createdAt instanceof Timestamp)
  ) {
    throw new Error(`Review ${id} has an invalid Firestore document shape.`)
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
    pros: data.pros,
    cons: data.cons,
    createdAt: data.createdAt.toDate(),
  }
}
