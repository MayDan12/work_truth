import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SitePageFrame } from "@/components/contrair/site-shell";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/contrair/typography";

export function InformationPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <SitePageFrame>
      <main className="page-container info-page" id="main-content">
        <Link className="text-link" href="/">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to GistHQ
        </Link>
        <div className="mt-8">
          <TypographyH1 className="text-[clamp(2rem,4vw,3rem)]">
            {title}
          </TypographyH1>
          <TypographyP className="section-intro">{description}</TypographyP>
        </div>
        <div className="info-page-content">{children}</div>
        <aside
          className="notice-panel"
          aria-label="Review moderation information"
        >
          <TypographyH2 className="text-base font-semibold tracking-normal">
            How reviews are handled
          </TypographyH2>
          <TypographyP className="mt-2">
            Reviews are submitted without an account and held for human review
            before publication. Moderation checks our community guidelines; it
            does not independently verify every statement.
          </TypographyP>
        </aside>
      </main>
    </SitePageFrame>
  );
}
