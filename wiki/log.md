# Holos Wiki Log

`log.md` is the append-only record of meaningful project wiki activity.

Preferred heading format:

`## [YYYY-MM-DD] type | title`

Keep entries concise and grounded in inspected repo evidence.

## [2026-04-05] bootstrap | initialize Holos project wiki

- Confirmed that `wiki/` did not previously exist in `/Users/johnpolacek/Projects/whatisholos/`.
- Inspected `README.md`, `package.json`, route files under `app/`, `app/_components/content-data.tsx`, `lib/navigation.ts`, and the PDF and image generation scripts before writing any project wiki pages.
- Created the initial control files plus one durable architecture note covering site structure and the publishing/export path.

## [2026-04-05] update | move private research workflow out of public Holos repo

- Updated `wiki/AGENTS.md` to clarify that private research intake, discussion digestion, and pre-publication theory development should not live in the public `whatisholos` repo.
- Pointed that private workflow to `/Users/johnpolacek/Projects/holos-research/wiki/` so the public Holos repo stays publication-focused.

## [2026-07-16] update | stratify fact ontology to resolve Φ/RQM critique

- Addressed an external critique that Commitment 3 (no absolute observer-independent facts) contradicted Commitment 2 (observerhood as an absolute Φ ≥ Φ_c fact) and the block-universe framing.
- Resolution chosen (confirmed with John): structural realism. Structural facts (laws, block geometry, integration threshold) are absolute; only registered facts (which outcomes are experienced) are observer-relative. At the Omega limit the two layers coincide.
- Edited `app/_components/Predictions.tsx` (rewrote Commitment 3, added structural-fact note to Commitment 2), `app/_components/Logic.tsx` (explicit IIT decoupling in the Φ section, two-layer division in Block-universe compatibility, layer-coincidence note in the Omega Limit section), and `app/_components/content-data.tsx` (IIT decoupling sentence in Consciousness).
- Also removed leaked editing-scaffolding text that was rendering as literal page content before the Extrapolative Proposition section in `Logic.tsx`.
- Verified via `tsc --noEmit` (clean), biome diagnostic count unchanged, and rendering of `/predictions` and `/logic` in a local dev server.

## [2026-07-16] update | replace retrospective-realization animation with tenseless global closure

- Addressed a second external critique: the BlockUniverseAnimation depicted a "solidification wave" traveling backward through the block, turning "ghostly" past events "solid" — a change in the block, which requires meta-time that eternalism does not have. The depiction contradicted the framework's own Proposition III (observation as a global constraint, not a time-local force).
- Reworked `app/_components/BlockUniverseAnimation.tsx`: removed the backward-traveling wave and the right-to-left staggered transformation; the ghost→solid crossfade is now simultaneous across the whole block, framed as a comparison of two descriptions of the same tenseless block (structure alone vs. structure closed by observation). Moved the Φ observer inside the block. Rewrote title ("Global Closure in the Block Universe"), captions, screen-reader text, aria-label, and the static PDF fallback; removed "retrospective realization", "solidification wave", and "future observation validates past reality" language.
- Tightened the Meaning of Life paragraph in `app/_components/content-data.tsx`: "becomes real" → "is real ... tenselessly"; the creation–observation loop described as a relation of dependence, not a process.
- Verified with `tsc --noEmit` (clean) and in a local dev server: new copy renders, animation mounts and runs (crossfade simultaneity is enforced structurally — single GSAP label, uniform durations, no stagger).
- Noted pre-existing hydration-mismatch warnings from Math.random() in the component render body; spawned a separate task chip rather than fixing in this pass.

## [2026-07-17] update | adopt monist edition (Omega as fundamental totality, observers as apertures)

- Outcome of a multi-session "panel of scientists" grilling with John. After working through physicist, and philosopher-of-mind critiques, John chose the trickle-down fork: Omega is not merely an asymptotic limit but the fundamental totality and the one experiencer; finite observers are local apertures of it. Confirmed decisions folded in: (1) Holos adds exactly two ingredients (Φ_c threshold + fundamental totality), superseding the previous "exactly one" framing; (2) open commitment to a branching, no-erasure quantum picture (Many-Worlds on the physics, ontology as the divergence); (3) operational consistency (observers who compare records agree), now grounded in monism (apertures of one totality cannot disagree where they meet); (4) no dark duplicates (physical copy of an observer is necessarily an observer); (5) sharp existence threshold with graded richness and permanent measurement imprecision; (6) sealing vs. witnessing distinction (one observer seals a universe; many witness it); (7) explicit AI stance (current pipe-shaped architectures host no one; differently-shaped future systems could); (8) lineage owned (Advaita Vedanta, Spinoza, Berkeley, panentheism, Brahman) and interpretive neutrality between theological/secular readings dropped; (9) closing syllogism replaced by an explicit posit. Rejected during grilling: "first observer sets the truth" (no relativistic "first"), "retroactive recursive observability" (reintroduces meta-time), and "entities in the dimension above" (contradicts the site's own higher-dimensions stance).
- Edited `app/_components/content-data.tsx` (Introduction, Meaning of Life, Consciousness incl. three new passages, Omega Point full monist rewrite, Why Are We Here), `Logic.tsx` (Minimal Core + new totality bullet, D4, Prop III, Φ section, Conservation/selection, "What Holos does not claim", Omega Limit section, Lineage and Interpretation replacing Interpretive Equivalence, closing posit, formalism note), `Predictions.tsx` (intro, C1 sealing/witnessing, C2 aperture + no-dark-duplicates, C3 monist grounding, cosmology expectation), `InterpretiveComparisonTable.tsx` (three Holos-column cells), `OmegaLimitAnimation.tsx` (captions/aria to "one totality, experienced through every aperture"), `citation-sections.tsx` (choice-function description made per-observer, no-erasure).
- Verified via `tsc --noEmit` (clean) and rendering of `/`, `/logic`, `/predictions` in a session-local dev server; only console errors are the known pre-existing BlockUniverseAnimation hydration warnings.

## [2026-07-16] update | own the threshold, commit to branching, operationalize consistency

- A panel-of-scientists grilling session surfaced three gaps; John confirmed resolutions for each:
  1. **Own the one new ingredient.** The site claimed "no new physics" while positing Φ_c as an absolute structural fact. Resolution: Holos adds no new equations or forces but adds exactly one ingredient — the integration threshold. Edited `content-data.tsx` (Introduction), `Logic.tsx` (Minimal Core intro, new paragraph in Φ section, "What Holos does add" after the does-not-claim list), `Predictions.tsx` (intro).
  2. **Commit to branching.** Dropped interpretation-neutrality ("does not require choosing one specific interpretation") and the informal "first observer sets the truth" idea (no relativistic "first" exists). Holos now openly sides with a Many-Worlds-style no-collapse, no-erasure picture; incompatible registrations belong to different branches. Its divergence from MWI is ontological (which structures are present as experience). Edited `Logic.tsx` (Conservation and selection, comparison-table intro), `Predictions.tsx` (Commitment 3).
  3. **Operationalize global consistency.** "Globally consistent" was undefined and deferred to the unreachable Omega limit. New rule: whenever two observers (within a branch) compare records, records agree; communication forces agreement. Omega is the idealized limit of that agreement, not its enforcer. Edited `Logic.tsx` (Proposition III, Omega Limit section), `Predictions.tsx` (Commitment 3, quantum-foundations expectation — added explicit falsifier: a confirmed irreconcilable record mismatch), `content-data.tsx` (Omega Point section).
- Also fixed pre-existing copy bug in Predictions intro: "three kinds of claims" → "four" (list has four).
- Verified via `tsc --noEmit` (clean) and rendering of `/`, `/logic`, `/predictions` in a session-local dev server. Console shows only the known pre-existing BlockUniverseAnimation Math.random() hydration warnings.
- Open panel questions not yet addressed on-site: Born-rule slot (where do the odds live), Φ_c substrate-universality, epiphenomenalism (#4), sorites at the threshold (#5), global vs local presence (#6), AI observerhood (#7), Experiments 1/3 discriminating power, Teeming Dark vs SIDM bounds, waste-heat tension, ⊛ type signature, Omega-limit convergence argument.

## [2026-07-16] update | correct the quantum eraser animation to match established physics

- Addressed a third external critique: the QuantumEraserAnimation on the overview Spacetime section depicted the debunked pop-science reading of the delayed-choice quantum eraser ("Φ observes → one path becomes real (collapse)", a retro-wave pulsing backward from observer to source, caption "Observation in the present manifests the path of the past"). This contradicted both the physics (the total screen pattern never changes; interference appears only in coincidence-sorted subsets keyed to the subluminal idler record) and the site's own texts (Predictions: "This is not about erasing the past"; Logic: no physical collapse, no retrocausal communication).
- Rebuilt `app/_components/QuantumEraserAnimation.tsx` around the correct account: hits accumulate on the screen as an unchanging structureless smear; the idler record is registered at Φ; coincidence sorting of the same hits reveals which-path clumps or erasure fringes in subset panels. New title "The Quantum Eraser Without Retroactivity"; captions "The total pattern on the screen never changes", "Interference appears only in subsets sorted by the idler record", "Nothing travels backward — registration determines how facts sort". Rewrote sr text, aria-label, and PDF fallback. Removed the collapse path, retro-wave, and Past/Present time arrow.
- Screen-hit and band positions are hardcoded constants (no Math.random in render), so this component no longer produces hydration mismatches.
- The surrounding overview prose in content-data.tsx was already correct ("consistency in physics is enforced globally rather than by simple temporal sequence of events") and needed no change; Predictions.tsx was already correct.
- Verified with `tsc --noEmit` (clean) and in the local dev server by force-showing all SVG elements: layout is correct with no overlaps; animation mounts and runs.
