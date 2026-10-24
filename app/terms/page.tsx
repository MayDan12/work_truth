import { InformationPage } from "@/components/contrair/info-page";
import Link from "next/link";
import { TypographyH2, TypographyP } from "@/components/contrair/typography";

export default function TermsPage() {
  return (
    <InformationPage
      description="Rules for using GistHQ and submitting workplace reviews."
      title="Terms of Service"
    >
      <TypographyP>
        Last updated: October 24, 2026. These Terms apply when you access GistHQ
        or submit content. By submitting a review, you confirm that you have
        read and agree to these Terms and our{" "}
        <Link className="text-link" href="/community-guidelines">
          Community Guidelines
        </Link>
        . GistHQ is the service name; its operating entity&apos;s full legal
        name and registered address have not yet been provided and should be
        added before launch.
      </TypographyP>
      <section>
        <TypographyH2 className="text-xl">
          Your reviews and responsibilities
        </TypographyH2>
        <TypographyP className="mt-2">
          You represent that each review reflects your genuine, first-hand
          experience as a current or former employee or contractor of the
          organization you review. You must not impersonate an employer or
          another person, claim experience you do not have, or submit a review
          about an organization where you have never worked or contracted. You
          are responsible for the content you submit and may be legally
          responsible for it, subject to rights and protections that cannot be
          waived under applicable law.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Prohibited content</TypographyH2>
        <TypographyP className="mt-2">
          Do not submit content that:
        </TypographyP>
        <ul className="mt-2 list-disc space-y-2 pl-6">
          <li>
            names or identifies a non-executive individual, or discloses
            someone&apos;s personal, contact, or private employment information;
          </li>
          <li>
            contains hate speech, harassment, threats, vulgarity, or targeted
            abuse;
          </li>
          <li>
            discloses trade secrets, confidential company material, or
            information you are prohibited from sharing under an NDA or other
            duty of confidence;
          </li>
          <li>
            makes an unverified allegation that a person or organization
            committed a crime, including fraud or assault; or
          </li>
          <li>
            is knowingly false, unlawful, misleading about your identity or
            experience, or submitted on behalf of an employer without
            authorization.
          </li>
        </ul>
        <TypographyP className="mt-3">
          Do not include information that could identify you or another person.
          Reviews are not linked to a public author profile, but that does not
          guarantee anonymity.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">
          Moderation, publication, and removal
        </TypographyH2>
        <TypographyP className="mt-2">
          GistHQ may, at its discretion and subject to applicable law, screen,
          flag, withhold, reject, edit for formatting or privacy redaction, or
          remove content at any time, with or without prior notice. We may
          decline to explain an individual moderation decision where doing so
          could compromise privacy, safety, or the integrity of a review.
        </TypographyP>
        <TypographyP className="mt-2">
          Reviews are user-generated opinions. GistHQ hosts them and is not
          their author or, to the extent applicable law permits, their
          publisher. Displaying a review does not mean that GistHQ endorses,
          verifies, or makes a factual finding about it. Moderation is not a
          guarantee that every statement is true or complete.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">
          Employer notices and takedown requests
        </TypographyH2>
        <TypographyP className="mt-2">
          Employers and other affected parties may send a documented grievance
          to{" "}
          <a className="text-link" href="mailto:gisthq.team@gmail.com?subject=Review%20notice%20and%20takedown">
            gisthq.team@gmail.com
          </a>{" "}
          with the subject “Review notice and takedown.” Include the review URL,
          the specific statements at issue, the reason and supporting documents
          for the request, your name and role, and a way to contact you. If you
          act for an organization, include evidence of your authority. Explain
          what action you are requesting and confirm that the information is
          accurate to the best of your knowledge.
        </TypographyP>
        <TypographyP className="mt-2">
          Please use this process instead of threats or public disclosure of
          additional personal or confidential information. GistHQ may
          acknowledge, investigate, temporarily restrict, retain, or remove
          content as appropriate and as required by law. We may request more
          information and, where lawful and appropriate, notify the reviewer.
          A notice does not guarantee removal, and review times may vary.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">License to submitted content</TypographyH2>
        <TypographyP className="mt-2">
          You retain ownership of content you submit. To operate and promote
          GistHQ, you grant GistHQ a worldwide, perpetual, royalty-free,
          non-exclusive, sublicensable license to host, use, reproduce,
          display, distribute, format, and syndicate that content through the
          service and its distribution channels. This license is subject to
          applicable law and does not transfer ownership to GistHQ.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Service and liability</TypographyH2>
        <TypographyP className="mt-2">
          GistHQ is provided for general informational purposes and is not
          career, legal, or other professional advice. To the maximum extent
          permitted by applicable law, GistHQ is not responsible for
          user-submitted opinions or for indirect or consequential loss arising
          from use of the service. Nothing in these Terms excludes or limits
          liability, rights, or remedies that cannot lawfully be excluded or
          limited, or determines GistHQ&apos;s status or duties under applicable
          law.
        </TypographyP>
      </section>
      <section>
        <TypographyH2 className="text-xl">Governing law</TypographyH2>
        <TypographyP className="mt-2">
          These Terms are governed by the laws of the Federal Republic of
          Nigeria. Subject to any mandatory jurisdiction or consumer
          protections, disputes are to be brought before a court of competent
          jurisdiction in Lagos State, Nigeria.
        </TypographyP>
        <TypographyP className="mt-2">
          Contact:{" "}
          <a className="text-link" href="mailto:gisthq.team@gmail.com">
            gisthq.team@gmail.com
          </a>
          . These Terms should be reviewed by a Nigerian lawyer before
          production use, including the operator identity, liability provisions,
          and notice process.
        </TypographyP>
      </section>
    </InformationPage>
  );
}
