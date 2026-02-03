import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const bitter = Bitter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app";

export const metadata: Metadata = {
  title: "Holos: A Scientific Interpretive Framework for Explaining Reality",
  description:
    "Holos is an interpretive framework exploring how reality emerges through the recursive relationship between creation and observation. It examines consciousness, spacetime, cosmology, and meaning under known physical limits.",
  icons: {
    icon: "icon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Holos: A Scientific Interpretive Framework for Explaining Reality",
    description:
      "Holos is an interpretive framework exploring how reality emerges through the recursive relationship between creation and observation. It examines consciousness, spacetime, cosmology, and meaning under known physical limits.",
    url: siteUrl,
    siteName: "Holos: A Scientific Interpretive Framework for Explaining Reality",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Holos: A Scientific Interpretive Framework for Explaining Reality",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Holos: A Scientific Interpretive Framework for Explaining Reality",
    description:
      "Holos is an interpretive framework exploring how reality emerges through the recursive relationship between creation and observation. It examines consciousness, spacetime, cosmology, and meaning under known physical limits.",
    images: ["/twitter-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Holos: A Scientific Interpretive Framework for Explaining Reality",
  description:
    "Holos is an interpretive framework exploring how reality emerges through the recursive relationship between creation and observation. It examines consciousness, spacetime, cosmology, and meaning under known physical limits.",
  author: {
    "@type": "Person",
    name: "John Polacek",
    url: "https://johnpolacek.com",
  },
  datePublished: "2024-06-19",
  dateModified: "2026-01-21",
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
