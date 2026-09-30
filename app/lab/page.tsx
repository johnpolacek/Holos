import type { Metadata } from "next";
import { Architects_Daughter, IBM_Plex_Mono, IM_Fell_English } from "next/font/google";
import EraserScene3D from "../_components/lab/EraserScene3D";
import QuantumEraserPlate, { type PlateVariant } from "../_components/lab/QuantumEraserPlate";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});
const architect = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-architect",
});
const fell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-fell",
});

export const metadata: Metadata = {
  title: "Holos (⊛) – Animation Lab",
  robots: { index: false, follow: false },
};

const VARIANTS: { id: PlateVariant; name: string; note: string }[] = [
  {
    id: "engraved",
    name: "1. Engraved monochrome",
    note: "One ink on warm paper. Hatching and stipple instead of fills. Closest to a journal figure.",
  },
  {
    id: "twocolor",
    name: "2. Two-color textbook",
    note: "Same drawing, photon paths and data curves in vermilion. The accent becomes the thing that moves.",
  },
  {
    id: "blueprint",
    name: "3. Blueprint",
    note: "Reversed out of Prussian blue on a drafting grid, monospace lettering. Engineering, not publication.",
  },
  {
    id: "pencil",
    name: "4. Drafting pencil",
    note: "Graphite on graph paper with a slight hand-drawn wobble, blue pencil for data. A notebook in progress.",
  },
  {
    id: "sepia",
    name: "5. Victorian plate",
    note: "Sepia on cream with period type (IM Fell). A nineteenth-century natural philosophy engraving.",
  },
  {
    id: "phosphor",
    name: "6. Phosphor",
    note: "Glowing hairlines on black, like an oscilloscope or lab monitor. Amber for measured data.",
  },
];

export default function LabPage() {
  return (
    <div
      className={`lab h-screen overflow-auto ${plexMono.variable} ${architect.variable} ${fell.variable}`}
    >
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Animation lab</p>
        <h1 className="text-2xl mb-2">Style study: scientific line art</h1>
        <p className="text-sm text-neutral-600 mb-8 max-w-[640px]">
          Chosen style: engraved monochrome. The plate engraves itself, then loops through the
          experiment.
        </p>
        <p className="text-sm mb-8">
          <a href="/lab/tour" className="underline underline-offset-4 decoration-neutral-300">
            Tour animatic: all eight chapters in words and rough sketches →
          </a>
        </p>
        <section className="mb-20">
          <h2 className="text-lg">A. Flat plate, faster engraving</h2>
          <p className="text-sm text-neutral-600 mb-4 max-w-[640px]">
            The full view holds still; the drawing engraves in about two seconds.
          </p>
          <QuantumEraserPlate variant="engraved" animated />
        </section>
        <section className="mb-20">
          <h2 className="text-lg">B. Flat plate, camera zoom</h2>
          <p className="text-sm text-neutral-600 mb-4 max-w-[640px]">
            Same drawing with a camera: it starts on the laser, follows the first photon pair along
            its path, then pans across the plots as they sort.
          </p>
          <QuantumEraserPlate variant="engraved" animated camera />
        </section>
        <section className="mb-24">
          <h2 className="text-lg">C. Rendered in 3D, drawn as line art</h2>
          <p className="text-sm text-neutral-600 mb-4 max-w-[640px]">
            A three.js model of the optical table. Edges become ink lines and shadowed faces become
            hatching, so it still reads as an engraving while the camera flies through it.
          </p>
          <EraserScene3D />
        </section>
        <h2 className="text-lg mb-1">Style explorations</h2>
        <p className="text-sm text-neutral-600 mb-6 max-w-[640px]">
          The six treatments considered, kept for reference.
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm mb-12">
          {VARIANTS.map((v) => (
            <a
              key={v.id}
              href={`#${v.id}`}
              className="underline underline-offset-4 decoration-neutral-300"
            >
              {v.name}
            </a>
          ))}
        </nav>
        {VARIANTS.map((v) => (
          <section key={v.id} id={v.id} className="mb-20">
            <h2 className="text-lg">{v.name}</h2>
            <p className="text-sm text-neutral-600 mb-4 max-w-[640px]">{v.note}</p>
            <QuantumEraserPlate variant={v.id} />
          </section>
        ))}
      </main>
    </div>
  );
}
