import { PDFStill } from "./figures/SpecFigure";
import EraserScene3D from "./lab/EraserScene3D";

// The delayed-choice quantum eraser as an engraved figure: the 3D scene on the site, and in
// the PDF a still of the engraved plate (public/figures/eraser-plate.png).
export default function EraserFigure({ isPDF = false }: { isPDF?: boolean }) {
  if (isPDF)
    return (
      <PDFStill
        still="eraser-plate.png"
        label="Engraved plate of the delayed-choice quantum eraser: a laser, a double slit, and a crystal that splits each photon into a signal and an idler. The signal reaches detector D0 first; the idler travels a longer path to D1 through D4. Plots show the D0 pattern has no fringes, while hits sorted by D1 or D2 show fringes and anti-fringes that add back to the same total."
      />
    );
  return (
    <div className="mt-8">
      <EraserScene3D />
    </div>
  );
}
