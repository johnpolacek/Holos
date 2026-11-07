import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";
import Research from "../_components/Research";
import Section from "../_components/Section";

const description =
  "Research underway that could support, test, or change Holos, grouped by the claim at stake.";
const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.com"}/research`;

export const metadata: Metadata = {
  title: "Holos (⊛) – Research",
  description,
  alternates: { canonical: url },
  openGraph: {
    title: "Research – Holos (⊛)",
    description,
    url,
    siteName: "Holos: A Framework for Understanding Reality",
    type: "website",
  },
};

export default function ResearchPage() {
  return (
    <PageLayout>
      <Section id="research" title="Research">
        <Research />
      </Section>
    </PageLayout>
  );
}
