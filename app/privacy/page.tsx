import Link from "next/link";
import { InformationPage } from "@/components/contrair/info-page";
import { TypographyH2, TypographyP } from "@/components/contrair/typography";

export default function PrivacyPage() {
  return (
    <InformationPage
      description="What GistHQ collects, how reviews are handled, and the choices available to you."
      title="Privacy Policy"
    >
      <TypographyP>
        Last updated: October 24, 2026. GistHQ is the service name; the full
        legal name and address of the service operator have not yet been
        provided and must be added before production. This policy describes the
        current app and distinguishes it from moderation features that are
        planned but not yet active.
      </TypographyP>

      <section>
        <TypographyH2 className="text-xl">Information we collect</TypographyH2>
        <TypographyP className="mt-2">
          The review form does not ask for your name, email address, or an
          account. It collects the company name, broad job title, current or
          former employee status, rating, written feedback, and submission
          time. Please do not include names, contact details, or other
          identifying or confidential information in your review. If you choose
          to include personal information, it may be stored and may appear
          publicly if included in an approved review.
        </TypographyP>
        <TypographyP className="mt-2">
          If you sign in to the <code>/admin</code> moderation area, Firebase
          Authentication processes your sign-in credentials and account
          identifier. If you email us, we receive the email address, name,
          organization or role, message, documents, and other information you
          choose to send.
        </TypographyP>
        <TypographyP className="mt-2">
          The hosting and Firebase services supporting the site may process
          technical information needed to deliver, secure, and troubleshoot the
          service, such as network, browser, or request information. The exact
          data and retention depend on the providers and deployment settings.
        </TypographyP>
      </section>

      <section>
        <TypographyH2 className="text-xl">How reviews are handled</TypographyH2>
        <TypographyP className="mt-2">
          In the current app, every review is stored as pending and must be
          approved by a human moderator before it appears publicly. Pending and
          rejected reviews are not shown in public company listings. Approved
          reviews display the submitted workplace details and feedback, without
          a public author profile.
        </TypographyP>
        <TypographyP className="mt-2">
          GistHQ plans a hybrid process using automated checks for profanity or
          hate speech, personal names, criminal allegations, spam, and
          duplicates. Under that planned process, reviews that pass checks may
          be published immediately, while flagged reviews are held for human
          review. A community “Report this review” feature is also planned.
          These automated checks, instant publication, and reporting feature
          are not implemented in the current app. This policy and the service
          will be updated before those features are enabled.
        </TypographyP>
        <TypographyP className="mt-2">
          Moderation helps apply our{" "}
          <Link className="text-link" href="/community-guidelines">
            Community Guidelines
          </Link>
          ; it is not independent verification of every statement. A review
          appearing on the site is not an endorsement or factual finding by
          GistHQ.
        </TypographyP>
      </section>

      <section>
        <TypographyH2 className="text-xl">How we use information</TypographyH2>
        <TypographyP className="mt-2">
          We use information to receive and moderate reviews, publish approved
          content, operate the company directory, administer authorized
          moderator accounts, prevent abuse, respond to privacy requests and
          grievances, maintain service security, and meet legal obligations.
          We do not currently configure advertising or analytics tracking in
          the app.
        </TypographyP>
      </section>

      <section>
        <TypographyH2 className="text-xl">
          Service providers and disclosure
        </TypographyH2>
        <TypographyP className="mt-2">
          Review data is stored using Google Firebase/Cloud Firestore, and
          Firebase Authentication is used for moderator sign-in. Hosting and
          delivery providers may process technical information to provide the
          site. These providers process information to support the service under
          their own terms and settings. We do not sell personal information. We
          may disclose information when necessary to address a documented
          grievance, protect people or the service, or comply with a valid legal
          requirement.
        </TypographyP>
        <TypographyP className="mt-2">
          Firebase data-region settings and any cross-border transfer
          arrangements have not been confirmed for this deployment. The
          operator should confirm them and update this policy before
          production.
        </TypographyP>
      </section>

      <section>
        <TypographyH2 className="text-xl">Retention and deletion</TypographyH2>
        <TypographyP className="mt-2">
          GistHQ has not yet set a fixed retention period for pending, rejected,
          approved, or grievance records. Reviews may remain in Firestore until
          they are removed or a retention schedule is implemented. This period
          should be decided and published before production. You may request
          access, correction, or deletion by emailing us; we may need to verify
          your request and may retain information where required or permitted
          by law.
        </TypographyP>
      </section>

      <section>
        <TypographyH2 className="text-xl">Your choices and requests</TypographyH2>
        <TypographyP className="mt-2">
          Depending on applicable law, you may have rights to request access
          to, correction of, or deletion of personal information, or to object
          to or restrict certain processing. Email{" "}
          <a
            className="text-link"
            href="mailto:gisthq.team@gmail.com?subject=Privacy%20request"
          >
            gisthq.team@gmail.com
          </a>{" "}
          with the subject “Privacy request.” Include enough detail for us to
          understand your request, but do not send passwords or unnecessary
          sensitive information. You may also contact the relevant data
          protection authority where applicable.
        </TypographyP>
        <TypographyP className="mt-2">
          To report a review or request its removal, see our{" "}
          <Link className="text-link" href="/terms">
            Terms of Service
          </Link>{" "}
          for the documented grievance process.
        </TypographyP>
      </section>

      <section>
        <TypographyH2 className="text-xl">
          Security, children, and policy updates
        </TypographyH2>
        <TypographyP className="mt-2">
          We use Firebase services for review data and moderator
          authentication. Review data access is governed by Firebase security
          rules and project settings managed in Firebase Console by the service
          operator. No online service can guarantee absolute security or
          anonymity. The service is intended for adults sharing workplace
          experiences and is not directed to children.
        </TypographyP>
        <TypographyP className="mt-2">
          We may update this policy as the service changes. Material changes
          will be reflected here with a revised update date. For privacy
          questions or requests, contact{" "}
          <a className="text-link" href="mailto:gisthq.team@gmail.com">
            gisthq.team@gmail.com
          </a>
          .
        </TypographyP>
        <TypographyP className="mt-2">
          Before production, the service operator, retention schedule, Firebase
          data region, hosting providers, and applicable privacy-law
          requirements and legal bases for processing should be confirmed with
          a qualified Nigerian privacy lawyer.
        </TypographyP>
      </section>
    </InformationPage>
  );
}
