// The ⊛ mark drawn as an engraving: a ring, a finer inner ring, and a six-armed asterisk.

export default function Emblem({ className, size = 20 }: { className?: string; size?: number }) {
  const arms = [90, 30, 150].map((deg) => {
    const r = (deg * Math.PI) / 180;
    const dx = Math.round(Math.cos(r) * 6.2 * 100) / 100;
    const dy = Math.round(Math.sin(r) * 6.2 * 100) / 100;
    return { deg, d: `M${12 - dx} ${12 - dy} L${12 + dx} ${12 + dy}` };
  });
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="10.6" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="8.9" strokeWidth="0.5" opacity="0.6" />
      {arms.map((a) => (
        <path key={a.deg} d={a.d} strokeWidth="1.6" strokeLinecap="round" />
      ))}
    </svg>
  );
}
