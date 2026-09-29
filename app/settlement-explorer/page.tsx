import type { Metadata } from "next";
import SettlementExplorer from "../_components/SettlementExplorer";

// Preview page: unlisted (no nav link, not in the sitemap) and kept out of search.
// A full-window experience, so it skips the site layout.
export const metadata: Metadata = {
  title: "Holos (⊛): Settlement Explorer (preview)",
  description:
    "A guided toy model of the Integration Hypothesis: is settling the next star worth it, and does the galaxy that results look like ours?",
  robots: { index: false, follow: false },
};

export default function SettlementExplorerPage() {
  return (
    <SettlementExplorer
      bet={
        <>
          Stated plainly, this is a bet about motives: that nearly every civilization, and nearly
          every independent colony, turns inward before it founds more than one new settlement.
          Physics does not guarantee it. Independence can even speed spreading, since colonies no
          one controls are free to keep settling, and{" "}
          <a href="https://doi.org/10.3847/1538-3881/ab31a3">settlement models</a> with finite
          travel speeds and colony lifetimes show that whether a galaxy fills up, or stays patchy
          with long unvisited stretches, turns on exactly these rates. Holos makes the bet because
          the same pressures, light-speed delay and waste heat, act on every civilization alike, so
          their answers should converge. It could be wrong, and a settlement wave still spreading
          anywhere in view would show it.
        </>
      }
    />
  );
}
