import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

export type PlateMotion = {
  isAnimated: boolean;
  setPaused: (paused: boolean) => void;
  replay: () => void;
  revert: () => void;
};

type Pt = [number, number];

const PHOTON_POOL = 6;

// Photon routes in plate coordinates. Slit A feeds BS1 (which-slit detector D3),
// slit B feeds BS2 (D4); both reach BS3, which erases the slit record (D1, D2).
const PUMP: Record<"a" | "b", Pt[]> = {
  a: [
    [160, 300],
    [200, 300],
    [214, 292],
    [272, 292],
  ],
  b: [
    [160, 300],
    [200, 300],
    [214, 308],
    [274, 308],
  ],
};
const SIGNAL: Record<"a" | "b", Pt[]> = {
  a: [
    [272, 292],
    [420, 160],
    [499, 170],
  ],
  b: [
    [274, 308],
    [420, 180],
    [499, 170],
  ],
};
const IDLER_START: Record<"a" | "b", Pt[]> = {
  a: [
    [272, 292],
    [392, 462],
    [412, 466],
    [600, 400],
  ],
  b: [
    [274, 308],
    [392, 478],
    [412, 474],
    [600, 520],
  ],
};
const IDLER_END: Record<string, Pt[]> = {
  "a-d3": [[600, 341]],
  "b-d4": [[600, 579]],
  "a-d1": [
    [800, 400],
    [860, 460],
    [910.2, 409.8],
  ],
  "a-d2": [
    [800, 400],
    [860, 460],
    [910.2, 510.2],
  ],
  "b-d1": [
    [800, 520],
    [860, 460],
    [910.2, 409.8],
  ],
  "b-d2": [
    [800, 520],
    [860, 460],
    [910.2, 510.2],
  ],
};

type Pair = ["a" | "b", "d1" | "d2" | "d3" | "d4"];

// One pair per data point in plot (a). The first runs slowly and is annotated.
const PAIRS: Pair[] = [
  ["a", "d1"],
  ["b", "d2"],
  ["a", "d3"],
  ["b", "d4"],
  ["b", "d1"],
  ["a", "d2"],
  ["a", "d1"],
  ["b", "d4"],
  ["a", "d3"],
  ["b", "d2"],
  ["a", "d2"],
  ["b", "d1"],
  ["a", "d3"],
  ["b", "d4"],
  ["a", "d1"],
  ["b", "d2"],
  ["b", "d1"],
  ["a", "d2"],
  ["a", "d3"],
];

const CELL: Record<string, number> = { d1: 1, d2: 2, d3: 3, d4: 4 };

const CAPTIONS = {
  build: "I · THE APPARATUS",
  pairs: "II · PHOTON PAIRS. D₀ RECORDS EVERY HIT",
  sort: "III · SORTED AFTERWARD BY THE IDLER RECORD",
  claim: "IV · (b) + (c) = (a). THE TOTAL NEVER CHANGED",
};

const SLOW = 300; // px per second, annotated first pair
const FAST = 1000;

function pathData(points: Pt[]) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
}

function length(points: Pt[]) {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  return total;
}

const STATIC: PlateMotion = {
  isAnimated: false,
  setPaused: () => {},
  replay: () => {},
  revert: () => {},
};

// Camera framing: a viewBox centered on (cx, cy), w wide, at the plate's aspect.
const PLATE_W = 1200;
const PLATE_H = 980;
const FULL = `0 0 ${PLATE_W} ${PLATE_H}`;
function frame(cx: number, cy: number, w: number) {
  const h = (w * PLATE_H) / PLATE_W;
  // Keep the camera on the paper.
  const x = Math.min(Math.max(cx - w / 2, 0), PLATE_W - w);
  const y = Math.min(Math.max(cy - h / 2, 0), PLATE_H - h);
  return `${x} ${y} ${w} ${h}`;
}

export type MotionOptions = {
  /** Move a viewBox camera through the plate instead of holding the full view. */
  camera?: boolean;
  /** HTML element that mirrors the stage caption (needed when the camera crops the SVG one). */
  hud?: HTMLElement | null;
};

export function buildQuantumEraserMotion(
  svg: SVGSVGElement,
  { camera = false, hud = null }: MotionOptions = {}
): PlateMotion {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return STATIC;

  const q = <T extends Element = SVGElement>(sel: string) => svg.querySelector(sel) as T;
  const qa = <T extends Element = SVGElement>(sel: string) =>
    Array.from(svg.querySelectorAll(sel)) as T[];

  const body = q(".plate-body");
  const fx = q("#fx");
  const beamsGroup = q("#beams");
  const caption = q<SVGTextElement>("#stage-caption");

  let master: gsap.core.Timeline | null = null;
  let observer: IntersectionObserver | null = null;
  let userPaused = false;
  let visible = true;

  const ctx = gsap.context(() => {
    // ---------- Sort every leaf of the drawing into how it appears ----------
    const draws: SVGElement[] = [];
    const fills: SVGElement[] = [];
    const fades: SVGElement[] = [];
    const leaves = Array.from(
      body.querySelectorAll("path, line, polyline, polygon, rect, circle, text")
    ) as SVGElement[];

    for (const el of leaves) {
      if (fx.contains(el) || beamsGroup.contains(el)) continue;
      if (el.closest(".pt") || el.classList.contains("fit") || el.classList.contains("ghost"))
        continue;
      if (el.tagName === "text") {
        fades.push(el);
        continue;
      }
      const stroke = el.getAttribute("stroke");
      const fill = el.getAttribute("fill") ?? "";
      const stroked = stroke && stroke !== "none" && !el.getAttribute("stroke-dasharray");
      if (stroked) draws.push(el);
      if (fill.startsWith("url(")) fills.push(el);
      if (!stroked && !fill.startsWith("url(")) fades.push(el);
    }

    // The engraver works left to right across the apparatus, then the plots.
    const key = (el: Element) =>
      (el.closest("#plots") ? 10000 : 0) + el.getBoundingClientRect().left;
    const byKey = (a: Element, b: Element) => key(a) - key(b);
    draws.sort(byKey);
    fills.sort(byKey);
    fades.sort(byKey);

    const beams = (id: string) => q(`#${id}`);
    const allBeams = qa("#beams path");
    const points = qa("#plots .pt");
    const fits = qa("#plots .fit");
    const ghosts = qa("#plots .ghost");
    const highlight = q("#highlight-a");
    const notes = [q("#note-t0"), q("#note-t8")];

    gsap.set(draws, { drawSVG: "0%" });
    gsap.set(fills, { fillOpacity: 0 });
    gsap.set(fades, { opacity: 0 });
    gsap.set(allBeams, { drawSVG: "0%" });
    gsap.set(points, { opacity: 0 });
    gsap.set(fits, { drawSVG: "0%" });
    gsap.set(ghosts, { opacity: 0 });
    gsap.set(highlight, { opacity: 0 });

    // With a camera the SVG caption can leave the frame, so the HUD carries it instead.
    const captionEl: Element = camera && hud ? hud : caption;
    const setCaption = (tl: gsap.core.Timeline, text: string, at: number) => {
      tl.to(captionEl, { opacity: 0, duration: 0.2 }, at);
      tl.call(
        () => {
          captionEl.textContent = text;
        },
        undefined,
        at + 0.2
      );
      tl.to(captionEl, { opacity: 1, duration: 0.45 }, at + 0.22);
    };
    const shoot = (
      tl: gsap.core.Timeline,
      viewBox: string,
      at: number,
      duration: number,
      ease = "power2.inOut"
    ) => {
      if (camera) tl.to(svg, { attr: { viewBox }, duration, ease }, at);
    };
    if (camera) gsap.set(svg, { attr: { viewBox: frame(150, 300, 300) } });

    // ---------- I. Engrave the apparatus, then switch on the light ----------
    const build = gsap.timeline({ defaults: { ease: "power1.inOut" } });
    setCaption(build, CAPTIONS.build, 0);
    build.to(draws, { drawSVG: "100%", duration: 0.4, stagger: { amount: 1.4 } }, 0.05);
    build.to(fills, { fillOpacity: 1, duration: 0.35, stagger: { amount: 1.4 } }, 0.3);
    build.to(fades, { opacity: 1, duration: 0.35, stagger: { amount: 1.4 } }, 0.2);
    // The camera starts on the laser and pulls back as the engraving spreads.
    shoot(build, FULL, 0, 2.2, "power2.inOut");

    const lightOn = 1.7;
    build.to(beams("beam-pump"), { drawSVG: "100%", duration: 0.15, ease: "none" }, lightOn);
    build.to(
      [beams("beam-slit-a"), beams("beam-slit-b")],
      { drawSVG: "100%", duration: 0.1, ease: "none" },
      ">"
    );
    build.to(
      [beams("signal-a"), beams("signal-b"), beams("idler-a"), beams("idler-b")],
      { drawSVG: "100%", duration: 0.3, ease: "none" },
      ">"
    );
    build.to(
      [beams("idler-a-out"), beams("idler-b-out")],
      { drawSVG: "100%", duration: 0.5, ease: "none" },
      ">"
    );
    build.to(
      [beams("idler-a-d3"), beams("idler-b-d4")],
      { drawSVG: "100%", duration: 0.2, ease: "none" },
      "<0.15"
    );

    // ---------- Loop: pairs, sorting, the claim ----------
    const loop = gsap.timeline({ repeat: -1 });
    setCaption(loop, CAPTIONS.pairs, 0);

    const pumpDots = qa("#photons .ph-pump");
    const signalDots = qa("#photons .ph-signal");
    const idlerDots = qa("#photons .ph-idler");
    const totalPoints = qa("#plot-total .pt");

    const flash = (tl: gsap.core.Timeline, id: string, at: number) => {
      tl.fromTo(
        `#flash-${id}`,
        { attr: { r: 2 }, opacity: 1 },
        { attr: { r: 16 }, opacity: 0, duration: 0.55, ease: "power2.out" },
        at
      );
    };

    const travel = (
      tl: gsap.core.Timeline,
      dot: SVGElement,
      route: Pt[],
      speed: number,
      at: number
    ) => {
      const duration = length(route) / speed;
      tl.set(dot, { x: route[0][0], y: route[0][1], opacity: 1 }, at);
      tl.to(dot, { motionPath: { path: pathData(route) }, duration, ease: "none" }, at);
      tl.set(dot, { opacity: 0 }, at + duration);
      return at + duration;
    };

    let t = 0.8;
    let lastArrival = 0;
    PAIRS.forEach(([slit, det], k) => {
      const slow = k === 0;
      const speed = slow ? SLOW : FAST;
      const slot = k % PHOTON_POOL;

      const born = travel(loop, pumpDots[slot], PUMP[slit], speed, t);
      const signalAt = travel(loop, signalDots[slot], SIGNAL[slit], speed, born);
      const idlerRoute = [...IDLER_START[slit], ...IDLER_END[`${slit}-${det}`]];
      const idlerAt = travel(loop, idlerDots[slot], idlerRoute, speed, born);

      flash(loop, "d0", signalAt);
      // Points fill in out of order, the way hits land on a screen.
      const point = totalPoints[(k * 7 + 9) % totalPoints.length];
      loop.fromTo(point, { opacity: 0 }, { opacity: 1, duration: 0.25 }, signalAt);

      flash(loop, det, idlerAt);
      const cell = `#cc-flash-${CELL[det]}`;
      loop.fromTo(cell, { opacity: 0 }, { opacity: 0.9, duration: 0.08 }, idlerAt);
      loop.to(cell, { opacity: 0, duration: 0.4 }, idlerAt + 0.25);

      if (slow && camera) {
        // Push in on the source, ride with the signal to D0, then follow the idler's long way round.
        shoot(loop, frame(300, 260, 420), t - 0.6, 0.9);
        shoot(loop, frame(400, 230, 420), born, signalAt - born, "sine.inOut");
        const legs: Pt[] = [
          [430, 380],
          [600, 420],
          [800, 430],
          [880, 440],
        ];
        const legTime = (idlerAt - signalAt) / legs.length;
        legs.forEach(([x, y], i) => {
          shoot(loop, frame(x, y, 460), signalAt + i * legTime, legTime, "sine.inOut");
        });
        shoot(loop, FULL, idlerAt + 1.2, 1.2);
      }
      if (slow) {
        loop.fromTo(notes[0], { opacity: 0 }, { opacity: 1, duration: 0.3 }, signalAt);
        loop.fromTo(notes[1], { opacity: 0 }, { opacity: 1, duration: 0.3 }, idlerAt);
        loop.to(notes, { opacity: 0, duration: 0.4 }, idlerAt + 1.4);
        t = idlerAt + 1.6;
      } else {
        t += 0.32;
      }
      lastArrival = Math.max(lastArrival, idlerAt);
    });

    // A fit through the accumulated hits.
    const fitAt = lastArrival + 0.3;
    loop.fromTo(
      fits[0],
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 1.1, ease: "power1.inOut" },
      fitAt
    );

    // III. Sorting by the idler record, one coincidence channel at a time.
    const sortAt = fitAt + 1.8;
    setCaption(loop, CAPTIONS.sort, sortAt);
    // Glance at the counter, then pan along the plots as each channel sorts.
    shoot(loop, frame(1000, 260, 520), sortAt, 1);
    (["d1", "d2", "d3"] as const).forEach((det, j) => {
      const at = sortAt + 0.7 + j * 1.9;
      shoot(loop, frame(456 + j * 270, 850, 600), at - 0.2, 1.1);
      const cell = `#cc-flash-${CELL[det]}`;
      loop.fromTo(cell, { opacity: 0 }, { opacity: 0.9, duration: 0.15 }, at);
      loop.to(cell, { opacity: 0, duration: 0.5 }, at + 1.1);
      loop.fromTo(
        qa(`#plot-${det} .pt`),
        { opacity: 0 },
        { opacity: 1, duration: 0.2, stagger: { amount: 0.7, from: "random" } },
        at + 0.2
      );
      loop.fromTo(
        q(`#plot-${det} .fit`),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.9, ease: "power1.inOut" },
        at + 0.7
      );
    });

    // IV. The claim: the sorted subsets add back to the unchanged total.
    const claimAt = sortAt + 0.7 + 3 * 1.9 + 0.3;
    setCaption(loop, CAPTIONS.claim, claimAt);
    shoot(loop, frame(330, 850, 620), claimAt, 1.2);
    shoot(loop, FULL, claimAt + 3.6, 1.4);
    loop.fromTo(ghosts, { opacity: 0 }, { opacity: 1, duration: 0.8 }, claimAt + 0.4);
    loop.set(highlight, { opacity: 1 }, claimAt + 0.6);
    loop.fromTo(
      highlight,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 1.1, ease: "power2.inOut" },
      claimAt + 0.6
    );

    // Clear the data for the next run; the apparatus stays.
    const resetAt = claimAt + 5;
    loop.to([...points, ...ghosts, highlight, captionEl], { opacity: 0, duration: 0.6 }, resetAt);
    loop.to(fits, { opacity: 0, duration: 0.6 }, resetAt);
    loop.set(fits, { drawSVG: "0%", opacity: 1 }, resetAt + 0.7);

    master = gsap.timeline();
    master.add(build);
    master.add(loop, "+=0.4");
  }, svg);

  const sync = () => {
    if (!master) return;
    master.paused(userPaused || !visible);
  };

  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(svg);

  return {
    isAnimated: true,
    setPaused(paused) {
      userPaused = paused;
      sync();
    },
    replay() {
      userPaused = false;
      master?.restart();
      sync();
    },
    revert() {
      observer?.disconnect();
      ctx.revert();
      caption.textContent = "";
      if (hud) hud.textContent = "";
    },
  };
}
