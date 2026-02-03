import type { Metadata } from "next";
import Defense from "../_components/Defense";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Holos (⊛) – Stress-Testing the Axioms",
  description:
    "An adversarial review of the Holos axioms from the perspective of a theoretical physicist, examining objections and responses to each axiom.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/defense`,
  },
  openGraph: {
    title: "Defense — Stress-Testing the Holos Axioms",
    description:
      "An adversarial review of the Holos axioms from the perspective of a theoretical physicist, examining objections and responses to each axiom.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/defense`,
    siteName: "Holos: A Scientific Interpretive Framework for Explaining Reality",
    type: "website",
  },
};

export default function DefensePage() {
  return (
    <PageLayout>
      <Defense />
    </PageLayout>
  );
}
