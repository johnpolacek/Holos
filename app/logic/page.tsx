import type { Metadata } from "next";
import Logic from "../_components/Logic";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Holos (⊛) – Logic – Primitive Definitions, Axioms and Foundations",
  description:
    "A formal mathematical and philosophical structure defining Holos (⊛) through primitive definitions, axioms, and foundational propositions.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/logic`,
  },
  openGraph: {
    title: "Holos (⊛) – Logic – Primitive Definitions, Axioms and Foundations",
    description:
      "A formal mathematical and philosophical structure defining Holos (⊛) through primitive definitions, axioms, and foundational propositions.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/logic`,
    siteName: "Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics",
    type: "website",
  },
};

export default function LogicPage() {
  return (
    <PageLayout>
      <Logic />
    </PageLayout>
  );
}
