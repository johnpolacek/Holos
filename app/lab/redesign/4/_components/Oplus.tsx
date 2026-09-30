// The ⊛ glyph drawn as strokes (a ring and three bars), so it can draw itself in and so it
// matches the type's weight instead of falling back to a system font.

export default function Oplus({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      className={`r4-oplus ${className}`}
      viewBox="0 0 100 100"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx="50" cy="50" r="44" pathLength={1} />
      <line x1="50" y1="22" x2="50" y2="78" pathLength={1} />
      <line x1="25.75" y1="36" x2="74.25" y2="64" pathLength={1} />
      <line x1="25.75" y1="64" x2="74.25" y2="36" pathLength={1} />
    </svg>
  );
}
