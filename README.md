This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Firebase setup

The Firebase Web SDK and Firestore configuration are ready to connect to a
Firebase project. The app still uses fictional sample data, and the review form
only creates a local preview; no app data is currently read from or written to
Firestore.

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/),
   add a Web app, and create a Cloud Firestore database.
2. Copy `.env.example` to `.env.local` and replace the values with the Web app's
   `apiKey`, `projectId`, and `appId`.
3. Import `getFirebaseFirestore` from `lib/firebase.ts` in a Client Component
   when Firestore access is needed. It initializes the default Firebase app
   once and reports which configuration values are missing.
4. The starter [Firestore rules](./firestore.rules) deny all client reads and
   writes until the app's data schema and moderation flow are defined. To deploy
   them, authenticate with the Firebase CLI, select your project, then run
   `firebase deploy --only firestore:rules,firestore:indexes`.

The `NEXT_PUBLIC_` values are Firebase Web app identifiers, not service-account
secrets. Firestore security must be enforced with rules; do not put service
account credentials in client code or `NEXT_PUBLIC_` environment variables.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
