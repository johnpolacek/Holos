# Four Redesigns (2026-09-29)

John asked for four redesigns of the site, "top notch high end modern designs," built with the GSAP and animaxxing skills (`.agents/skills/`). Each is a live prototype in the real app showing the Overview (home) and the Logic page, desktop and phone, reachable from an index at `/lab/redesign`.

| # | Name | Scope | Style family |
|---|---|---|---|
| 1 | Monograph | Layout + look (text and page order kept) | Engraved |
| 2 | Nocturne | Layout + look (text and page order kept) | Bold departure: dark |
| 3 | Atlas | Everything (organization, front door, reading paths) | Engraved |
| 4 | Ledger | Everything (organization, front door, reading paths) | Bold departure: Swiss, one signal color |

The old `*Animation.tsx` components are left out of every prototype (they are all being replaced). The two engraved figures (Aperture in Consciousness, the Eraser in Spacetime) appear via `_shared/figures.tsx`.

## Shared contract (all four)

**Files.** Everything for design N lives in `app/lab/redesign/N/`: `layout.tsx`, `page.tsx` (Overview), `logic/page.tsx`, a CSS file, and any components (keep them in that folder, e.g. `N/_components/`). Do not edit shared files, other designs, or live-site components. If a shared change seems needed, copy what you need locally and mention it in the report.

**Shared helpers** in `app/lab/redesign/_shared/`:

- `content.tsx`: `sections` (Overview text, verbatim), `sectionInfo` (id, title, word count, minutes, verbatim first sentence as `lede`), `overviewMinutes`, `getSection`, `isBlock` (whether a paragraph must render in a `div`, not a `p`), `introBoxes` (paragraph indexes of the claims box and key terms inside the Introduction), `nodeText`, nav subsections.
- `figures.tsx`: `<SectionFigure id>` server component. Render it from a server file (it reads the PDF still from disk) and pass it into client components as children or props.
- `motion.ts`: registers ScrollTrigger, SplitText, DrawSVG, CustomEase, Flip, ScrambleText, ScrollTo; `prefersReducedMotion()`, `skipIntro()`, `markRunning()`.
- `MotionBoot.tsx`: render it first inside the layout. It supports `?motion=reduced|full` and gates `[data-intro]` targets before paint (see below).
- `LinkRewriter.tsx`: `<LinkRewriter base="/lab/redesign/N" />` points the text's `/logic...` and `/#...` links at the prototype's own routes.
- `base.css`: import it in the layout. The live site scrolls an inner panel and sets `body { overflow: hidden }`; the base unlocks document scrolling for any page with an `.rd` root, and undoes live-site link and nav globals under `.rd`. `.figure-invert` on a wrapper inverts the engraved figure frames for dark paper.

**Root.** The layout renders `<div className="rd rN">` around everything (the design's fonts as CSS variables on it). Scope every selector under `.rN`: design CSS persists across client navigation between prototypes. The root layout's `body` still carries the Bitter class; set the design's own font on `.rN`.

**Text.** The site's text is used verbatim. Overview: render `sections` (paragraph rendering: `isBlock(p) ? <div> : <p>`). Logic: render `<Logic />` from `app/_components/Logic.tsx` and restyle it with scoped CSS (it carries Tailwind classes such as `text-black/80`, `font-light`, `text-2xl`; override them with more specific selectors like `.rN section > h2`). New microcopy (part names, route names, UI labels) only where a design's IA needs it, as little as possible, no em dashes, canonical terms from `wiki/glossary.md`. Keep Predictions, Citations, and Revisions as links to the live pages.

**Motion.** Read `.agents/skills/animaxxing/SKILL.md`, `references/motion-vocabulary.md`, and the recipes you use; `gsap-scrolltrigger`, `gsap-core`, `gsap-timeline`, `gsap-plugins`, `gsap-performance` as needed; `gsap-vanilla/references/initialization.md` for the boot contract. This is React (Next 14 app router): do the work in client components with `useLayoutEffect` + `gsap.context(..., root)` and `ctx.revert()` on cleanup.

- Intro targets carry `data-intro`. In the page's layout effect: if `skipIntro()`, leave everything settled; else set start values, build the timeline, call `markRunning()`, play, all in the same turn.
- Reading text never moves with scroll. At most one scrubbed treatment per viewport and one pinned scene per page. Headings, rules, figures, boxes, and display type may reveal on scroll; body paragraphs should be readable immediately (a very light reveal at most).
- Reduced motion (`prefers-reduced-motion` or `?motion=reduced`) shows the settled page with no travel; ambient loops pause offscreen and have a pause control if longer than 5 seconds.
- SplitText: `SplitText.create` with `mask`, `aria: "auto"`, revert when done; wait for `document.fonts.ready` (bounded) before splitting display type.
- Clean up every tween, trigger, split, listener, and observer on unmount.

**Responsive.** Works from 360px to 1920px wide, no horizontal page scroll, 16px minimum side gutter on phones, real mobile navigation.

**Verification.** Dev server is running at `http://localhost:3000`. Screenshot helper: `node <scratchpad>/shot.cjs <url> <outPrefix> [--w 1440 --h 900] [--scroll 0,1800] [--full] [--wait 2500] [--motion reduced]` (one fresh page per shot, prints console errors). Check at least: home top, a mid-page section with a figure, Logic top and a mid-page section, at 1440 and 390 wide, plus a reduced-motion full-page pass. Look at every screenshot and iterate until it reads as high-end work. Then `pnpm exec tsc --noEmit -p .` (filter output to your folder) and `pnpm exec biome check app/lab/redesign/N`, fixing what you introduced. Do not commit.

## 1. Monograph (layout + look, engraved)

*The site as a finely printed scientific monograph, the page itself engraved to match the plates.*

- **Palette:** plate paper `#fbfaf5`, ink `#1d2126`, soft ink at 55%, hairlines at 15%. No color at all.
- **Type:** Newsreader (variable, use `opsz` so display sizes get the display cut) for text and headings; Bitter in spaced small caps for labels, numerals, captions, nav (continuity with the plates). Body about 19 to 20px, generous leading, measure about 64ch.
- **Layout (same order as today):** a left rail on desktop that is a *ruler*: tick marks for every section, labels beside the ticks, an ink needle that travels down as you read (the table of contents and the progress bar in one); page links in small caps and Download below. The title is set as a title plate inside a double-rule plate frame with ruler ticks and registration marks. Each section opens with a numeral in spaced caps (§ I, § II ...), a large light Newsreader title, and a double rule. The claims box and key terms become engraved ruled tables (hanging bold labels in a left column on desktop). Figures break out wider than the text column with a "FIG." label. The Logic page uses the same shell with its own sections on the ruler; definitions as a lexicon with hanging labels, axioms as numbered plates, display math between hairlines.
- **Motion:** plate frame rules and registration marks draw in (DrawSVG), title characters rise behind a mask, ruler ticks stagger in; section rules wipe across and titles line-reveal on scroll; the needle is scrubbed to scroll; underline sweeps on links.
- **Phone:** the rail becomes a slim top bar with the wordmark, a hairline progress line, and a Contents button that opens a full-screen engraved contents sheet (clip-path wipe).

## 2. Nocturne (layout + look, bold, dark)

*Reading Holos at night in an observatory: warm black, starlight text, one sodium-amber accent. Cinematic but calm.*

- **Palette:** background `#0a0b0d`, raised surface about `#111317`, text `#e9e6df`, muted about `#8d8a83`, hairlines at 12% of the text color, one accent amber about `#ffb454` used sparingly (active nav, links, key symbols).
- **Type:** Instrument Serif for display (huge, italic for emphasis), Inter for body (about 18px, 1.7), JetBrains Mono for tiny uppercase labels and numbers.
- **Layout (same order as today):** a fixed translucent header (backdrop blur) with wordmark, page links, and a live "03 / 08 Spacetime" section indicator. A full-viewport hero: the title in Instrument Serif at display scale, revealed through an opening aperture (a clip-path circle), over a very faint slowly drifting starfield canvas and a soft cursor-following "lit region" glow on the hero only. Sections on an asymmetric grid: a sticky mono section number on the left, the title very large, body in a column offset right. Claims box and key terms as hairline-bordered panels, terms in amber. Figures inverted (`.figure-invert`) so they read as glowing etchings, with thin corner marks. Logic: same shell, sticky left index with active tracking, axioms as large panels, math in warm white.
- **Motion:** aperture reveal and blur-focus on the hero title; section titles line or ellipse reveals; one scrubbed statement per page at most (a verbatim sentence used as display copy); header progress; magnetic Download button; starfield paused offscreen and static under reduced motion.
- **Phone:** header collapses to wordmark + menu; full-screen menu overlay with staggered links.

## 3. Atlas (everything, engraved)

*Holos as an atlas of plates: a cover, a table of plates, routes through the atlas, and a legend. A contemporary museum catalog in engraved ink.*

- **Palette:** plate paper and ink as in the locked style, plus a very light warm panel tone for inset blocks. No color.
- **Type:** Inter Tight for display and UI (light weights, tight tracking, very large), Source Serif 4 (use `opsz`) for body, Bitter italic for symbols and plate captions.
- **New organization:**
  - **Cover:** full viewport, a live 3D engraved cover plate (drive `Plate3D` from `app/_components/lab/Plate3D.tsx` with the `introduction` scene: the branching tree, then the observer's iris, then R = C ⊛ O), in plate furniture ("PLATE I", ruler ticks, registration mark), with the title, subtitle, and a scroll cue. Loops quietly; pauses offscreen; static under reduced motion; a pause control.
  - **Routes:** three or four reading paths with computed reading times, e.g. the idea in brief (Introduction), the full Overview, the formal argument (Logic), how it could be wrong (Predictions).
  - **Table of plates:** the eight sections grouped into parts that follow the Introduction's own order (opening; the core: Consciousness, Spacetime, Infinity, Omega; the companion ideas: Aliens, The Teeming Dark; Why Are We Here?), each row with plate numeral, title, verbatim lede, minutes.
  - **Legend and glossary:** the claims box becomes the atlas legend (each firmness tier with an engraved legend swatch: solid, hatched, cross-hatched, dotted); the key terms move into a glossary drawer reachable from a persistent button anywhere on the page (dialog enter/exit motion).
  - **Reading:** part dividers with large numerals; each section as a plate with a sticky plate label; figures full-bleed.
  - **Logic as "the apparatus":** an index grouping its sections (foundations: Claims, Primitives, Axioms, Foundations; the two additions: Threshold, Totality; relations: Physics, Notation, the two comparisons; Open Problems), a top row linking to the five axioms by their existing titles, sticky index with active tracking.
- **Motion:** cover plate engraves in, title rises; table rows stagger in with rules wiping across; row hover slides an engraved arrow; part numerals drift slightly with scroll (one scrub per viewport); drawer enter/exit.
- **Phone:** cover stacks (plate above title), routes and plates as a single column, glossary drawer becomes a bottom sheet.

## 4. Ledger (everything, bold, Swiss)

*An honest ledger of claims. Swiss International style: stark, confident, one signal color. Organized by how firmly each thing is claimed, which is the site's distinctive virtue.*

- **Palette:** off-white `#f3f2ee`, ink `#0d0d0d`, one signal color cobalt about `#1e3cff`, hairlines in ink at 15%.
- **Type:** Archivo (variable width 62 to 125 and weight): display in wide or condensed heavy cuts at enormous sizes, body in Archivo regular (about 18px); IBM Plex Mono for numbers, labels, and metadata.
- **New organization:**
  - **Front door:** HOLOS at poster scale, the subtitle, `R = C ⊛ O`, and one verbatim thesis sentence from the Introduction ("Observation does not cause the universe, its laws, or its history. It is what makes a lawful universe a lived one.") as a scrubbed statement.
  - **The ledger:** the claims box's tiers laid out as a firmness scale from "Physics, as it stands" to "Speculation": a pinned horizontal run on desktop (numbered columns, verbatim tier text and links, a rule that goes from solid to dotted as firmness drops), a vertical stack on phones.
  - **Chapters:** a numbered index 01 to 08 with lede and minutes, then the full Overview on a strict grid: sticky giant numbers, titles, body column, key terms as a side column on desktop.
  - **Logic as a specification:** sticky numbered index (with a per-section progress bar), definitions as spec entries, axioms as large A1 to A5 blocks, tables with heavy rules.
  - A marquee of chapter titles is allowed (with a pause control).
- **Motion:** poster letters enter from the sides; width or weight axis settles as the headline lands; the scrubbed statement; the pinned ledger run; numbers roll on section change; count-up minutes; underline sweeps.
- **Phone:** poster type scales down, ledger stacks, index becomes a sticky compact chapter bar.

## Status (2026-09-29)

All four are built and verified (tsc and biome clean for `app/lab/redesign`, no console errors, 1440 and 390 wide, reduced motion). Thumbnails for the index are in `public/lab-redesign/` (regenerate after visual changes). Known limits:

- The Eraser figure's existing keyboard handler takes the space bar while it is on screen, so space does not scroll the page there.
- In dev, a cold compile slower than the 3.5 s boot deadline skips the intro and shows the page settled.
- Monograph: wide comparison tables scroll sideways with no edge hint.
- Atlas: on phones the cover hides the 3D scene's labels; the Consciousness figure's labels clip slightly at 390px. The Introduction's two boxes moved out of the text (Legend on the front door, key terms in the Glossary drawer).
- Ledger: the 8-column Fermi table is cramped in the reading column; the phone top bar can truncate long chapter titles; the sideways ledger needs at least 1000 by 620 px, otherwise it stacks.
