import { IM_Fell_English } from "next/font/google";

const fell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const PARTS: { glyph: string; label: string; italic: boolean }[] = [
  { glyph: "R", label: "Reality", italic: true },
  { glyph: "=", label: "", italic: false },
  { glyph: "C", label: "Creation", italic: true },
  { glyph: "⊛", label: "", italic: false },
  { glyph: "O", label: "Observation", italic: true },
];

// R = C ⊛ O set large, each term labeled beneath its letter.
export default function FormulaAnatomy() {
  return (
    <figure
      className={`${fell.className} flex justify-center my-2`}
      aria-label="R = C ⊛ O: Reality equals Creation, then Observation"
    >
      <div className="grid grid-cols-5 gap-x-4 sm:gap-x-6 text-center items-end">
        {PARTS.map((p, i) => (
          <div key={i}>
            <div className={`text-4xl sm:text-5xl text-black/90 ${p.italic ? "italic" : ""}`}>
              {p.glyph}
            </div>
            <div className="text-[0.65rem] sm:text-xs uppercase tracking-widest text-black/55 mt-2 h-4">
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
