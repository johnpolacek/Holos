// Styles for the engraved SVG plates. They ship inside each plate's <svg>, so the
// plate renders the same on the site and in the PDF, which loads no site stylesheet.
export const PLATE_CSS = `
.plate {
  --plate-paper: #fbfaf5;
  --plate-ink: #1d2126;
  --plate-ink-soft: rgba(29, 33, 38, 0.55);
  --plate-beam: var(--plate-ink);
  --plate-curve: var(--plate-ink);
  --plate-grid: transparent;
  --plate-font: inherit;
  --plate-label-font: inherit;
  font-family: var(--plate-font);
}
.plate .plate-grid {
  display: none;
}
.plate--twocolor {
  --plate-paper: #f7f5ef;
  --plate-ink: #22252a;
  --plate-ink-soft: rgba(34, 37, 42, 0.55);
  --plate-beam: #c8412b;
  --plate-curve: #c8412b;
}
.plate--blueprint {
  --plate-paper: #173a66;
  --plate-ink: #e9f1fb;
  --plate-ink-soft: rgba(233, 241, 251, 0.62);
  --plate-grid: rgba(233, 241, 251, 0.1);
  --plate-font: var(--font-plex-mono), ui-monospace, monospace;
  --plate-label-font: var(--font-plex-mono), ui-monospace, monospace;
}
.plate--pencil {
  --plate-paper: #fdfdf8;
  --plate-ink: #3b3d40;
  --plate-ink-soft: rgba(59, 61, 64, 0.6);
  --plate-beam: #3b3d40;
  --plate-curve: #2f5f9e;
  --plate-grid: rgba(80, 140, 200, 0.16);
  --plate-font: var(--font-architect), cursive;
  --plate-label-font: var(--font-architect), cursive;
}
.plate--sepia {
  --plate-paper: #f2e9d6;
  --plate-ink: #3a2717;
  --plate-ink-soft: rgba(58, 39, 23, 0.6);
  --plate-font: var(--font-fell), Georgia, serif;
  --plate-label-font: var(--font-fell), Georgia, serif;
}
.plate--phosphor {
  --plate-paper: #0a0f0e;
  --plate-ink: #8fe3c0;
  --plate-ink-soft: rgba(143, 227, 192, 0.55);
  --plate-beam: #d8fff0;
  --plate-curve: #f2c14e;
  --plate-grid: rgba(143, 227, 192, 0.07);
  --plate-font: var(--font-plex-mono), ui-monospace, monospace;
  --plate-label-font: var(--font-plex-mono), ui-monospace, monospace;
}
.plate--blueprint .plate-grid,
.plate--pencil .plate-grid,
.plate--phosphor .plate-grid {
  display: inline;
}
.plate text {
  fill: var(--plate-ink);
}
.plate .plate-label,
.plate .plate-fig {
  font-family: var(--plate-label-font);
}
.plate--blueprint .plate-title,
.plate--phosphor .plate-title,
.plate--blueprint .plate-sym,
.plate--phosphor .plate-sym,
.plate--blueprint .plate-note,
.plate--phosphor .plate-note {
  font-style: normal;
}
.plate--pencil text {
  font-style: normal !important;
}
.plate .plate-title {
  font-size: 20px;
  font-style: italic;
}
.plate--sepia .plate-title {
  font-size: 24px;
}
.plate .plate-fig {
  font-size: 11px;
  letter-spacing: 0.18em;
}
.plate .plate-label {
  font-size: 10.5px;
  letter-spacing: 0.14em;
}
.plate--pencil .plate-label,
.plate--pencil .plate-fig {
  font-size: 12.5px;
  letter-spacing: 0.06em;
}
.plate .plate-note {
  font-size: 11px;
  font-style: italic;
  fill: var(--plate-ink-soft);
}
.plate .plate-sym {
  font-size: 15px;
  font-style: italic;
}
.plate .plate-sym-sm {
  font-size: 11px;
  font-style: italic;
}
.plate .plate-tiny {
  font-size: 7.5px;
}
.plate[data-pending] .plate-body {
  visibility: hidden;
}
`;
