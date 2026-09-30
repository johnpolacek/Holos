// The engraved figures that belong to Overview sections. Server component: ApertureFigure
// reads its PDF still from disk, so render this from a server file and pass it down as children.
// The old animations are left out on purpose: every one of them is being replaced.

import ApertureFigure from "@/app/_components/ApertureFigure";
import EraserFigure from "@/app/_components/EraserFigure";

export const FIGURE_SECTIONS = ["consciousness", "spacetime"] as const;

export default function SectionFigure({ id }: { id: string }) {
  if (id === "consciousness") return <ApertureFigure />;
  if (id === "spacetime") return <EraserFigure />;
  return null;
}
