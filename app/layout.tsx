import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScreenFitText } from "@/components/fittocontain";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gisthq.vercel.app"),
  title: {
    default: "GistHQ — Discover What It's Really Like to Work There",
    template: "%s | GistHQ",
  },
  description:
    "Research Nigerian companies before your next career move. Read employee reviews, explore workplace culture, compare employers, and make informed career decisions with GistHQ.",
  applicationName: "GistHQ",
  keywords: [
    "GistHQ",
    "Nigerian companies",
    "company reviews Nigeria",
    "employee reviews",
    "workplace culture",
    "company ratings",
    "employer reviews Nigeria",
    "workplace experiences",
    "jobs in Nigeria",
  ],
  icons: {
    icon: "/gisthq_logo.png",
  },
  openGraph: {
    title: "GistHQ — Discover What It's Really Like to Work There",
    description:
      "Get insights into Nigerian companies through employee reviews, workplace experiences, and company ratings. Research before you make your next career move.",
    siteName: "GistHQ",
    type: "website",
    locale: "en_NG",
    url: "https://gisthq.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GistHQ — Discover what it's really like to work there",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GistHQ — Discover What It's Really Like to Work There",
    description:
      "Explore employee reviews, workplace culture, and Nigerian company insights before your next career move.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        {children}
        <ScreenFitText />
      </body>
    </html>
  );
}
