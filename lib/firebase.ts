"use client";

import "client-only";
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const requiredConfig = [
  ["FIREBASE_API_KEY", firebaseConfig.apiKey],
  ["FIREBASE_PROJECT_ID", firebaseConfig.projectId],
  ["FIREBASE_APP_ID", firebaseConfig.appId],
  ["FIREBASE_AUTH_DOMAIN", firebaseConfig.authDomain],
] as const;

function getFirebaseApp(): FirebaseApp {
  const missingValues = requiredConfig
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingValues.length > 0) {
    throw new Error(
      `Missing Firebase configuration: ${missingValues.join(", ")}. Copy .env.example to .env.local and add your Firebase web app values.`,
    );
  }

  return getApps().some((app) => app.name === "[DEFAULT]")
    ? getApp()
    : initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

export function getFirebaseFirestore() {
  return getFirestore(getFirebaseApp());
}
