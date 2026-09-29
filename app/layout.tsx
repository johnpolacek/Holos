import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const bitter = Bitter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app";

export const metadata: Metadata = {
  title: "Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics",
  description:
    "Holos is an interpretive framework proposing that the universe physics describes is lived wherever a sufficiently integrated system, an observer, takes it in. It examines consciousness, spacetime, cosmology, and meaning within known physics.",
  icons: {
    icon: "icon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics",
    description:
      "Holos is an interpretive framework proposing that the universe physics describes is lived wherever a sufficiently integrated system, an observer, takes it in. It examines consciousness, spacetime, cosmology, and meaning within known physics.",
    url: siteUrl,
    siteName: "Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics",
    description:
      "Holos is an interpretive framework proposing that the universe physics describes is lived wherever a sufficiently integrated system, an observer, takes it in. It examines consciousness, spacetime, cosmology, and meaning within known physics.",
    images: ["/twitter-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics",
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
    <html lang="en">
      <body className={bitter.className}>
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
