# Animation Redesign: Engraved Plates

Status as of 2026-09-29. Everything below lives on the unlisted `/lab` page and is **not committed** (untracked: `app/lab/`, `app/_components/lab/`, `.agents/`, `skills-lock.json`; modified: `app/globals.css`, `package.json`, `pnpm-lock.yaml` for three.js).

## Decisions made

- **Every old animation is being replaced**, built from scratch. The ten current components in `app/_components/*Animation.tsx` are to be retired, not restyled.
- **Locked style: engraved monochrome.** John chose it from six treatments (two-color, blueprint, drafting pencil, Victorian sepia, phosphor were the others; still viewable at the bottom of `/lab`). He said "perfect as is."
  - Paper `#fbfaf5`, one ink `#1d2126`, soft ink at 55% for notes.
  - No fills: hatching and stipple only. Three stroke weights: 1.25 objects, 0.75 paths, 0.5 leaders and dimensions.
  - Bitter throughout: spaced caps for part names, italic for symbols (D₀, x₀), soft italic for notes.
  - Plate furniture: double-rule frame, ruler ticks, registration mark, "PLATE III" heading, leader lines with dot ends, dimension lines.
- **Faster draw-in**: about 2 seconds, not 5.
- **3D is the favorite.** John called the three.js line render "amazing" and "absolutely great." It is the reference for the redesign.
- **Stepped storytelling**: each chapter plays in stages. At the end of each stage a narration card waits, shows a countdown ring around a round chevron button, then auto-continues. Click, space, right arrow, or Enter skip ahead. Pause freezes the countdown; scrolling away pauses everything. After the last stage it loops from stage 2 (the apparatus stays built).
- **Board detail**: the optical table's tapped holes are drawn as small dots, not rings (rings were distracting).

## Direction change (2026-09-29, later)

John decided **the written text is the experience**. The 3D graphics are "amazing and great" but serve only to illustrate the concepts and draw the reader further in. The guided tour and the two-mode front door are dropped. Plates become figures inside the text. The storyboard's metaphors and faithfulness flags still apply; its narration lines are raw material for captions, not a script.

**Scope (John, 2026-09-29, latest): keep the original layout.** Pages, layout, and text stay as they are. Inside that layout, every animation and illustration is replaced, and new figures are welcome: "more the better." Figures sit in the text flow where they help, on any page. The site-wide visual restyle is on hold.

**Figure behavior (John, 2026-09-29): auto play with controls.** A figure plays by itself when it scrolls into view, stepping through its stages with short captions, and gives the reader controls: pause/play, step forward and back, replay. Scrolling away pauses it; reduced motion shows the finished drawing.

## Proposed direction (agreed in principle, details open)

**Guided tour + library.** The Overview's 8 sections become 8 tour chapters, each an engraved plate that plays in stages with narration cards, linking into the full text. Logic and Predictions (about 22,000 words of reference reading) stay text-first, restyled to match, with static plates. Every plate also exists as a static drawing, which serves the PDF export, reduced motion, and no-JavaScript readers.

Plan:

1. **Storyboard first, no code.** Per chapter: what the plate shows, its stops, one narration line per stop. Run at high effort.
2. **Prove an abstract chapter** (proposed: Consciousness) inside a rough tour shell. The eraser worked partly because it is real lab equipment; Consciousness, Infinity, Omega, and "Why are we here?" need honest visual metaphors, not decoration. Spacetime has a ready one: lit and unlit regions as light cones.
3. **Design the site frame around the plates**: paper, type, margins, tour navigation, the handoff from a tour stop into the text.
4. **Roll out chapters one at a time**, each replacing its old animation when it ships.

Answers from John (2026-09-29):

- **Front door: two modes.** Tour mode and text mode, both first-class (interpretation to confirm).
- **Scope: the whole site**, including Logic and Predictions restyled with static plates.
- **Phones: 3D everywhere.** One design per chapter, tuned for performance rather than swapped for a flat version.

Step 1 draft: [storyboard.md](storyboard.md).

## What is built

All in `app/_components/lab/` and shown on `app/lab/page.tsx` (`robots: noindex`).

| File | What it is |
|---|---|
| `QuantumEraserPlate.tsx` | Static SVG plate of the Kim et al. (2000) delayed-choice eraser, 1200×980 viewBox, with four data plots. Props: `variant` (six style studies), `animated`, `camera`. Exports plot helpers (`CURVES`, `curvePath`, `dataPoints`, `PLOT_W`, `PLOT_H`). |
| `quantumEraserMotion.ts` | GSAP timeline for the flat plate: engrave (DrawSVG, sorted left to right), photon pairs (MotionPath), sorting, the claim. Optional viewBox **camera** that zooms and follows the photon, clamped to the paper. |
| `EraserScene3D.tsx` | three.js scene of the optical table plus the six-stage story, narration cards, countdown, plots panel, projected labels. |

| `tourStoryboard.ts` | The [storyboard](storyboard.md) as data: 8 chapters, stops, narration, stage directions, per-stop status, sketch layout. Keep in sync with the storyboard. |
| `tourSketches.tsx` | About 35 rough engraved primitives (iris, gauge, block and cone, walls, galaxy, and so on) composed per stop. Placeholders, not final plates. |
| `../EngravedFigure.tsx` | The reusable in-text figure: hosts a `Plate3D` scene, starts on first sight, steps through stages with a caption card and countdown, loops; Back, Pause/Play, Replay; pauses offscreen; reduced motion shows the last stage. Each figure is a small wrapper (e.g. `ApertureFigure.tsx`) with its stages and a PDF still in `public/figures/`, inlined as a data URI because the PDF has no base URL. |
| `engrave3d.ts` | The eraser's line renderer as a shared engine: `makeKit()` (surface, ink, and soft-ink materials plus the sweep plane), `Engraver` (render target, post pass, camera rig, `project`), `disposeScene`. Soft ink (marker alpha 0.13) draws unlit structure; negative `tone` lifts a surface so only its dark side hatches. The eraser scene still has its own copy. |
| `tourScenes3d.ts` | 3D previs scenes per chapter (Introduction tree, Consciousness bench so far). Stops tween only plain state (rig, label opacities, a `st` object), so any stop is reached by rebuilding and fast-forwarding earlier stops. Includes a reusable iris diaphragm, ghost iris, and Φ gauge. |
| `Plate3D.tsx` | Hosts a 3D scene inside the animatic plate; projected SVG labels and a caption line; the animatic hands it the timeline. |
| `TourAnimatic.tsx` | The animatic at `/lab/tour`: chapter title cards, DrawSVG draw-in, narration card with the eraser's countdown ring, chapter and stop navigation, stage-direction toggle, per-chapter run times. |

Lab sections: A flat plate with faster engraving, B flat plate with camera zoom, C the 3D render (the favorite), then the six style studies.

### How the 3D line render works

- One pass renders the scene into a half-float render target: each surface writes its view-space normal (rgb) and a light value (alpha, 0.2 to 1.0) with a depth texture. Lines, points, and solid ink objects write a marker alpha of 0.1.
- A full-screen pass draws ink where neighboring pixels differ in normal (crease), depth (silhouette), or coverage (outline), paints markers solid ink, and adds screen-space hatching: single hatch below 0.55 light, cross-hatch below 0.3. A per-material `tone` darkens bodies such as detectors and the laser.
- Colors are raw sRGB `Vector3` uniforms, not `THREE.Color`, which would convert to linear and muddy the paper.
- The draw-in is a clipping plane swept along x on every material (`clipping: true` with three's clipping chunks).
- Camera is a rig: `target` plus `offset`, tweened by GSAP; following a photon means tweening the target along its route.
- Labels are an SVG overlay: each anchor is projected per frame and hidden until the sweep passes it.
- Plots panel, card, and timer are HTML and SVG over the canvas; plots use the exported plate helpers.
- Stage stops use `timeline.addPause(time, callback)`; the countdown is a separate GSAP tween on the ring's `stroke-dashoffset` whose `onComplete` continues.
- Rendering runs on `gsap.ticker`; an IntersectionObserver pauses offscreen; reduced motion renders one finished frame.

## Gotchas learned

- **Moving SVG dots paint stale in Chrome.** A small `<circle>` (or zero-length path) moved every frame can stay painted at an old position. Draw label anchor dots as a `marker-start` on the leader line (done in `Plate3D`; `EraserScene3D` still uses circles).
- **PDF stills:** capture with `page.screenshot({ clip })` at 2x after a single render; element screenshots and repeat screenshots hit the headless freeze.

- **Headless screenshots freeze animation.** After the first Puppeteer screenshot, requestAnimationFrame stops advancing in headless Chrome. To verify visuals, expose the timeline on `window` temporarily, `pause()` + `seek(t)` + call render, then screenshot. For flow checks, poll DOM state without screenshotting. Remove the debug hooks afterward.
- **Puppeteer needs a browser path**: `executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'`, run with `NODE_PATH=$PWD/node_modules`. Add `--use-angle=metal` for WebGL.
- The Claude in Chrome extension was not connected during this work.
- **Hydration**: server and client `Math` can differ in the last digit; round generated SVG coordinates (`round2`).
- **Unique ids**: several plates on one page need prefixed pattern and filter ids (the plate uses a React context prefix).
- **Pre-paint hiding**: animated plates render with `data-pending` so the body is hidden until the timeline sets its start state; a `<noscript>` style un-hides it.
- `next/dynamic` with `ssr: false` is not allowed from a server page in Next 14; the 3D component imports three at module level and creates the renderer inside `useEffect`.
- SVG `viewBox` tweens need a paper background behind the SVG when the camera letterboxes.
- Engraved plot curves use the 1.25 stroke weight.

## Skills available in this repo

`.agents/skills/`: `animaxxing` (effect recipes, including SVG draws and morphs), `animaxxing-webgl` (image planes only, not 3D scenes, so three.js is used directly), `gsap-core`, `gsap-timeline`, `gsap-plugins`, `gsap-scrolltrigger`, `gsap-performance`, `gsap-utils`, `gsap-vanilla`.

## Related

- [site-architecture.md](site-architecture.md) for routes, content files, and the PDF pipeline (plates must keep working in PDF mode).
- [glossary.md](glossary.md) for canonical terms; narration and labels must use them.
