import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Bitter, IM_Fell_English } from "next/font/google";
import Script from "next/script";
import "katex/dist/katex.min.css";
import "./globals.css";

const bitter = Bitter({ subsets: ["latin"] });
// Engraver's face for the formula figure; exposed as a CSS variable so components
// rendered outside Next (the PDF script) can fall back to a plain serif.
const fell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-fell",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.com";

export const metadata: Metadata = {
  title: "Holos: A Framework for Understanding Reality",
  description:
    "Holos is an interpretive framework proposing that the universe physics describes is lived wherever a sufficiently integrated system, an observer, takes it in. It examines consciousness, spacetime, cosmology, and meaning within known physics.",
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Holos: A Framework for Understanding Reality",
    description:
      "Holos is an interpretive framework proposing that the universe physics describes is lived wherever a sufficiently integrated system, an observer, takes it in. It examines consciousness, spacetime, cosmology, and meaning within known physics.",
    url: siteUrl,
    siteName: "Holos: A Framework for Understanding Reality",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Holos: A Framework for Understanding Reality",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Holos: A Framework for Understanding Reality",
    description:
      "Holos is an interpretive framework proposing that the universe physics describes is lived wherever a sufficiently integrated system, an observer, takes it in. It examines consciousness, spacetime, cosmology, and meaning within known physics.",
    images: ["/twitter-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Holos: A Framework for Understanding Reality",
  description:
    "Holos is an interpretive framework proposing that the universe physics describes is lived wherever a sufficiently integrated system, an observer, takes it in. It examines consciousness, spacetime, cosmology, and meaning within known physics.",
  author: {
    "@type": "Person",
    name: "John Polacek",
    url: "https://johnpolacek.com",
  },
  datePublished: "2024-06-19",
  dateModified: "2026-09-29",
  publisher: {
    "@type": "Person",
    name: "John Polacek",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bitter.className} ${fell.variable}`}>
        <Script
          id="structured-data"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
