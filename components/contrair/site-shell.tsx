import Link from "next/link";
import { SiteNavigation } from "@/components/contrair/site-navigation";
import { Brand } from "@/components/contrair/brand";

export { Brand };

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40">
      {/* <Link className="skip-link" href="#main-content">
        Skip to content
      </Link> */}
      <div className="page-container site-header-inner">
        <Brand />
        <SiteNavigation />
      </div>
    </header>
  );
}

const footerLinks = [
  { href: "/companies", label: "Explore Companies" },
  { href: "/write-review", label: "Write a Review" },
  { href: "/community-guidelines", label: "Community Guidelines" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-top">
          <Brand />
          <nav aria-label="Footer navigation" className="footer-links">
            {footerLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>Contrair helps people compare workplace experiences with care.</p>
          <p>Reviews are public only after Contrair approval.</p>
        </div>
      </div>
    </footer>
  );
}

export function SitePageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
