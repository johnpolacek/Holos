import type { Metadata } from "next";
import TourAnimatic from "../../_components/lab/TourAnimatic";

export const metadata: Metadata = {
  title: "Holos (⊛) – Tour Animatic",
  robots: { index: false, follow: false },
};

export default function TourAnimaticPage() {
  return (
    <div className="lab h-screen overflow-auto">
      <main className="max-w-[1100px] mx-auto px-4 py-10">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          <a href="/lab" className="underline underline-offset-4 decoration-neutral-300">
            Animation lab
          </a>{" "}
          · Tour animatic
        </p>
        <h1 className="text-2xl mb-2">The tour, in words and rough sketches</h1>
        <p className="text-sm text-neutral-600 mb-8 max-w-[680px]">
          All eight chapters from the storyboard, paced like the eraser scene. The drawings are
          placeholders; judge the narration, the order of stops, and the pacing. Space or → skips
          ahead, ← goes back.
        </p>
        <TourAnimatic />
      </main>
    </div>
  );
}
