import type { Metadata } from "next";
import Definition from "../_components/Definition";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Holos (⊛) – Definition: The Ontological Parameter (Φ)",
  description:
    "A formal definition of Φ (Phi), the ontological parameter that quantifies the degree to which a system integrates information such that it possesses the causal power to register a distinct ontological state.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/definition`,
  },
  openGraph: {
    title: "Definition: The Ontological Parameter (Φ)",
    description:
      "A formal definition of Φ (Phi), the ontological parameter that quantifies the degree to which a system integrates information such that it possesses the causal power to register a distinct ontological state.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/definition`,
    siteName: "Holos: A Scientific Interpretive Framework for Explaining Reality",
    type: "website",
  },
};

export default function DefinitionPage() {
  return (
    <PageLayout>
      <Definition />
    </PageLayout>
  );
}
