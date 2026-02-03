import type { Metadata } from "next";
import Core from "../_components/Core";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Holos (⊛) – Minimal Core and Operational Definition",
  description:
    "A formal mathematical and philosophical structure defining Holos (⊛) through the minimal core and operational definition.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/core`,
  },
  openGraph: {
    title: "Holos (⊛) – Minimal Core and Operational Definition",
    description:
      "A formal mathematical and philosophical structure defining Holos (⊛) through primitive definitions, axioms, foundational propositions, and extrapolative propositions.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/core`,
    siteName: "Holos: A Scientific Interpretive Framework for Explaining Reality",
    type: "website",
  },
};

export default function CorePage() {
  return (
    <PageLayout>
      <Core />
    </PageLayout>
  );
}
