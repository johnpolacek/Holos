import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";
import Revisions from "../_components/Revisions";
import Section from "../_components/Section";

export const metadata: Metadata = {
  title: "Holos (⊛) – Revisions",
  description:
    "Claims that earlier versions of Holos made and later retired or replaced, each with the reason.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/revisions`,
  },
  openGraph: {
    title: "Revisions – Holos (⊛)",
    description:
      "Claims that earlier versions of Holos made and later retired or replaced, each with the reason.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/revisions`,
    siteName: "Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics",
    type: "website",
  },
};

export default function RevisionsPage() {
  return (
    <PageLayout>
      <Section id="revisions" title="Revisions">
        <Revisions />
      </Section>
    </PageLayout>
  );
}
