import EraserScene3D from "./lab/EraserScene3D";
import QuantumEraserPlate from "./lab/QuantumEraserPlate";

// The delayed-choice quantum eraser as an engraved figure: the 3D scene on the site,
// the static engraved plate in the PDF.
export default function EraserFigure({ isPDF = false }: { isPDF?: boolean }) {
  return (
    <div className="mt-8">
      {isPDF ? <QuantumEraserPlate variant="engraved" /> : <EraserScene3D />}
    </div>
  );
}
