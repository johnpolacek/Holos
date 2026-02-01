import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";
import Trajectory from "../_components/Trajectory";

export const metadata: Metadata = {
  title: "Trajectory | Interpretive Framework for Reality, Consciousness, and Spacetime",
  description:
    "A forecast of how civilization will continue: from the Silent Time and the brief Flash of radio leakage, through the Integration Ascent and Jupiter Brain era to the Scaling Wall and the dimensional pivot into The Teeming Dark.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/trajectory`,
  },
  openGraph: {
    title: "Trajectory",
    description:
      "A forecast of how civilization will continue: from the Silent Time and the brief Flash of radio leakage, through the Integration Ascent and Jupiter Brain era to the Scaling Wall and the dimensional pivot into The Teeming Dark.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://whatisholos.vercel.app"}/trajectory`,
    siteName: "Interpretive Framework for Reality, Consciousness, and Spacetime",
    type: "website",
  },
};

export default function TrajectoryPage() {
  return (
    <PageLayout>
      <Trajectory />
    </PageLayout>
  );
}
