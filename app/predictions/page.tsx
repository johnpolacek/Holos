import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";
import Predictions from "../_components/Predictions";

export const metadata: Metadata = {
  title: "Holos (⊛) – Predictions",
  description:
    "What Holos predicts and how it could fail: its core commitments, the patterns it expects in neuroscience and quantum experiments, a standing falsifiable bet, and long-range speculation.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.com"}/predictions`,
  },
  openGraph: {
    title: "Predictions",
    description:
      "What Holos predicts and how it could fail: its core commitments, the patterns it expects in neuroscience and quantum experiments, a standing falsifiable bet, and long-range speculation.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.com"}/predictions`,
    siteName: "Holos: A Framework for Understanding Reality",
    type: "website",
  },
};

export default function PredictionsPage() {
  return (
    <PageLayout>
      <Predictions />
    </PageLayout>
  );
}
