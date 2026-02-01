import type { Metadata } from "next";
import Citations from "../_components/Citations";
import PageLayout from "../_components/PageLayout";
import Section from "../_components/Section";

export const metadata: Metadata = {
  title: "Citations — Holos (⊛) | Sources and References",
  description: "Citations and references for the Holos interpretive framework.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/citations`,
  },
  openGraph: {
    title: "Citations — Holos (⊛)",
    description: "Citations and references for the Holos interpretive framework.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/citations`,
    siteName: "Interpretive Framework for Reality, Consciousness, and Spacetime",
    type: "website",
  },
};

export default function CitationsPage() {
  return (
    <PageLayout>
      <Section id="citations" title="Citations">
        <Citations />
      </Section>
    </PageLayout>
  );
}
