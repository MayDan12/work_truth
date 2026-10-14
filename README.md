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

Worktruth stores user submissions in Cloud Firestore. Reviewers do not need an
account. New submissions are marked `pending`, visible only to admins, and
appear in public company listings only after an admin approves them.

### Connect the Firebase project

1. In the [Firebase Console](https://console.firebase.google.com/), create or
   select a project, register a Web app, create a Cloud Firestore database, and
   enable **Email/Password** under Authentication → Sign-in method.
2. Copy `.env.example` to `.env.local` and enter the Web app's `apiKey`,
   `authDomain`, `projectId`, and `appId`. Restart the Next.js development
   server after changing environment values.
3. In Firebase Console, open **Firestore Database → Rules**, replace the
   editor contents with [`firestore.rules`](./firestore.rules), then click
   **Publish**. The rules let unauthenticated visitors submit schema-validated
   pending reviews and read approved reviews. All other public reads and writes
   are denied. Admins can read the moderation queue and change a pending
   review's moderation status.
4. Open **Firestore Database → Indexes → Composite → Add index**. Create these
   two indexes for the `reviews` collection, both with **Query scope: Collection**:

   | Collection ID | Field | Order |
   | --- | --- | --- |
   | `reviews` | `moderationStatus` | Ascending |
   |  | `createdAt` | Descending |

   | Collection ID | Field | Order |
   | --- | --- | --- |
   | `reviews` | `moderationStatus` | Ascending |
   |  | `companySlug` | Ascending |
   |  | `createdAt` | Descending |

   Leave **Array contains** unused. Wait for each index to show **Enabled**
   before testing the review pages. The same index definitions are recorded in
   [`firestore.indexes.json`](./firestore.indexes.json).

### Set up an admin

1. Create the admin's user in Firebase Console → Authentication → Users and
   copy the user's UID.
2. In Firestore Database → **Data**, create a top-level collection named
   `admins` and add a document whose document ID is exactly the user's
   Authentication UID. Add the string field `role` with value `admin`.
3. The admin signs into `/admin` with that Firebase Authentication account.
   Approving a review changes its moderation status to `approved`, and Firestore
   publishes it to the public directory. Rejected submissions stay private.
   To revoke access, delete that user's document from `admins`.

### Review data and launch notes

The `reviews` collection stores `companyName`, `role`, `employmentStatus`,
`rating`, `pros`, `cons`, `createdAt`, and `moderationStatus`. The admin flow
adds `companySlug` as part of approval, so submitters cannot choose which
company page their review appears on. Firestore rules validate public
submissions and prevent users from setting their own moderation status to
approved. Only a project owner using the Firebase Console can add admin
documents; client writes to `admins` are denied. Client Firebase configuration
values are public identifiers, not secrets.

Public submissions are intentionally account-free, so they can attract spam.
Before a public launch, configure Firebase App Check and consider additional
abuse controls. Complete the privacy/retention/contact terms for the actual
service, set Firestore's data location deliberately, and review the moderation
workflow. Only admin-approved reviews are shown; the old fictional sample
content has been removed from public views.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
