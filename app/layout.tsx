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
  title: "GistHQ — Know what it’s really like to work there",
  description:
    "Explore workplace reviews and learn how GistHQ helps people research Nigerian companies before a career move.",
  icons: {
    icon: "/gisthq_logo.png",
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
