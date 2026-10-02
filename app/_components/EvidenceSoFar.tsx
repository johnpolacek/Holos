import type { Bearing, EvidenceBlock } from "./evidence-data";

const BEARING_LABEL: Record<Bearing, string> = {
  fits: "fits",
  against: "against",
  open: "open",
  coming: "coming",
};

// Dated findings at the end of a section, with a tiny "checked" date to show freshness.
export default function EvidenceSoFar({ block }: { block: EvidenceBlock }) {
  return (
    <aside className="rounded border border-black/15 bg-black/[0.03] px-6 py-5 mt-4">
      <div className="flex items-baseline justify-between gap-4 pb-3">
        <h3
          className="text-base text-black/80"
          style={{ fontVariant: "small-caps", letterSpacing: "0.06em", fontWeight: 600 }}
        >
          Evidence so far
        </h3>
        <span className="text-[0.65rem] text-black/40 tabular-nums">checked {block.checked}</span>
      </div>
      <ul className="flex flex-col gap-2 text-sm leading-relaxed text-black/75">
        {block.items.map((item) => (
          <li key={item.href} className="flex gap-3">
            <span className="shrink-0 w-14 text-black/45 tabular-nums">{item.date}</span>
            <span>
              {item.text}{" "}
              <a href={item.href} className="whitespace-nowrap">
                (source)
              </a>{" "}
              <span className="text-[0.65rem] uppercase tracking-wider text-black/45">
                {BEARING_LABEL[item.bearing]}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
