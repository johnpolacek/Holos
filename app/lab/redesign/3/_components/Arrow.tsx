// A fine engraved arrow, drawn at the hairline weight. Each direction is its own drawing,
// so hover transforms never fight a rotation.
const PATHS = {
  right: { box: "0 0 24 12", d: "M0 6h22M17 1l5 5-5 5" },
  down: { box: "0 0 12 24", d: "M6 0v22M1 17l5 5 5-5" },
  up: { box: "0 0 12 24", d: "M6 24V2M1 7l5-5 5 5" },
};

export default function Arrow({
  dir = "right",
  className,
}: {
  dir?: keyof typeof PATHS;
  className?: string;
}) {
  const p = PATHS[dir];
  return (
    <svg viewBox={p.box} className={className} data-dir={dir} aria-hidden="true">
      <path
        d={p.d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
