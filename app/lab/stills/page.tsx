import type { Metadata } from "next";
import EngravedFigure from "../../_components/EngravedFigure";
import { ALL_SPECS } from "../../_components/figures/all";

export const metadata: Metadata = {
  title: "Holos (⊛) – Figure stills",
  robots: { index: false, follow: false },
};

// Renders one figure by index, for scripts/capture-figure-stills.cjs. With reduced motion
// emulated, the figure draws its last stage once, which is the still the PDF shows.
// Without ?i, it lists the specs as JSON for the script.
export default function StillsPage({ searchParams }: { searchParams: { i?: string } }) {
  if (searchParams.i === undefined) {
    const list = ALL_SPECS.map((s, i) => ({ i, scene: s.scene, still: s.still }));
    return <pre id="specs">{JSON.stringify(list)}</pre>;
  }
  const spec = ALL_SPECS[Number(searchParams.i)];
  if (!spec) return <p>No figure {searchParams.i}</p>;
  return (
    <div className="h-screen overflow-auto" style={{ background: "#fbfaf5" }}>
      <div id="still" style={{ width: 1040, margin: "0 auto", paddingTop: 20 }}>
        <EngravedFigure scene={spec.scene} stages={spec.stages} label={spec.label} />
      </div>
    </div>
  );
}
