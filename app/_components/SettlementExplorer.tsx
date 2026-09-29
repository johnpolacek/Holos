"use client";

import gsap from "gsap";
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  formatChance,
  formatCount,
  formatOneIn,
  formatPercent,
  formatSpeed,
  formatYears,
  GALAXY,
  type History,
  HOLOS_BET,
  LIMITS,
  MAP,
  type ModelResult,
  mapVariation,
  mulberry32,
  ONLY_TAKES_ONE,
  PRESETS,
  runModel,
  type SettlementParams,
  sampleHistory,
  type Verdict,
  variationFraction,
  verdictGrid,
} from "./settlement-model";

interface SettlementExplorerProps {
  isPDF?: boolean;
  /** The bet, in the Aliens section's own words. */
  bet?: ReactNode;
}

// Playback runs on a log time axis so early spreading and late quiet both get room.
const T_START = 1e5;
const PLAY_SECONDS = 16;
const timeAt = (p: number) => T_START * (GALAXY.age / T_START) ** p;

const VERDICT_STYLE: Record<
  Verdict,
  { label: string; icon: string; box: string; cell: string; darkCell: string; dot: string }
> = {
  fits: {
    label: "Fits the silence",
    icon: "✓",
    box: "bg-[#10261a] text-[#a6e0bb] border-[#2e6044]",
    cell: "#a9cfb4",
    darkCell: "#2d6a47",
    dot: "bg-[#6cc28b] text-[#07090d]",
  },
  tension: {
    label: "In tension",
    icon: "!",
    box: "bg-[#2a2110] text-[#f0cf85] border-[#6d5521]",
    cell: "#ebcd89",
    darkCell: "#8a6b22",
    dot: "bg-[#e0a93a] text-[#07090d]",
  },
  "ruled-out": {
    label: "Ruled out",
    icon: "✗",
    box: "bg-[#2d1412] text-[#f5a69e] border-[#72322c]",
    cell: "#e2a49e",
    darkCell: "#853a33",
    dot: "bg-[#e0675c] text-[#07090d]",
  },
};

const RANK: Record<Verdict, number> = { fits: 0, tension: 1, "ruled-out": 2 };
const worst = (a: Verdict, b: Verdict): Verdict => (RANK[a] >= RANK[b] ? a : b);

function levelOf(value: number, tension: number, ruledOut: number): Verdict {
  if (value > ruledOut) return "ruled-out";
  if (value > tension) return "tension";
  return "fits";
}

type Key = keyof SettlementParams;
const STEPS = 1000;

function sameParams(a: SettlementParams, b: SettlementParams): boolean {
  return (Object.keys(a) as Key[]).every((k) => a[k] === b[k]);
}

// ---------------------------------------------------------------------------
// The three questions. Each maps one plain question onto the model's numbers.

interface Question {
  id: string;
  label: string;
  left: string;
  right: string;
  raw: (p: SettlementParams) => number;
  apply: (p: SettlementParams, raw: number) => SettlementParams;
  words: (p: SettlementParams) => string;
}

const WORTH_MIN = -6;
const WORTH_MAX = 4;
const worthOf = (p: SettlementParams) => p.starWorth - p.distanceCost;

const Q_WORTH: Question = {
  id: "worth",
  label: "Is settling a neighbor worth it?",
  left: "Not worth it",
  right: "Worth it",
  raw: (p) => Math.round(((worthOf(p) - WORTH_MIN) / (WORTH_MAX - WORTH_MIN)) * STEPS),
  apply: (p, raw) => {
    const worth = Math.round((WORTH_MIN + (raw / STEPS) * (WORTH_MAX - WORTH_MIN)) * 4) / 4;
    return { ...p, distanceCost: Math.min(10, Math.max(0, p.starWorth - worth)) };
  },
  words: (p) => {
    const w = worthOf(p);
    if (w <= -4) return "Clearly not worth it";
    if (w <= -1.5) return "Not worth it";
    if (w < 0) return "Almost worth it";
    if (w < 1.5) return "Barely worth it";
    return "Worth it";
  },
};

const Q_DIFFER: Question = {
  id: "differ",
  label: "Do circumstances differ?",
  left: "Hardly",
  right: "A lot",
  raw: (p) => Math.round(variationFraction(p.variation) * STEPS),
  apply: (p, raw) => ({ ...p, variation: Number(mapVariation(raw / STEPS).toPrecision(2)) }),
  words: (p) => {
    if (p.variation < 0.3) return "Hardly at all";
    if (p.variation < 1) return "A little";
    if (p.variation < 3) return "A lot";
    return "Wildly";
  },
};

const LOUD_MAX = 10;
const LOUD_MIN = -5;
const Q_LOUD: Question = {
  id: "loud",
  label: "When they settle, loud or quiet?",
  left: "Quiet",
  right: "Loud",
  raw: (p) => Math.round(((LOUD_MAX - p.loudCost) / (LOUD_MAX - LOUD_MIN)) * STEPS),
  apply: (p, raw) => ({
    ...p,
    loudCost: Math.round((LOUD_MAX - (raw / STEPS) * (LOUD_MAX - LOUD_MIN)) * 2) / 2,
  }),
  words: (p) => {
    if (p.loudCost >= 6) return "Almost always quiet";
    if (p.loudCost >= 2) return "Mostly quiet";
    if (p.loudCost >= -1) return "Mixed";
    return "Mostly loud";
  },
};

// Galaxy settings, tucked under "More settings".
interface SliderSpec {
  key: Key;
  label: string;
  help: string;
  min: number;
  max: number;
  reverse?: boolean;
  format: (v: number) => string;
}

const GALAXY_SLIDERS: SliderSpec[] = [
  {
    key: "ariseEvery",
    label: "How often civilizations arise",
    help: "Somewhere in the galaxy, a new civilization appears about this often.",
    min: 1e3,
    max: 1e10,
    reverse: true,
    format: (v) => `Once every ${formatYears(v)}`,
  },
  {
    key: "inwardTime",
    label: "Time before turning inward",
    help: "How long a settlement keeps weighing new stars: about one per 1,000 years, first the dozen within 10 light-years, then one drifting into range every 10,000 years or so.",
    min: 1e3,
    max: 1e7,
    format: formatYears,
  },
  {
    key: "probeSpeed",
    label: "Probe speed",
    help: "How fast settlers travel. It sets how fast settling spreads, not whether it does.",
    min: 0.001,
    max: 0.5,
    format: formatSpeed,
  },
  {
    key: "loudLife",
    label: "How long loud settlements last",
    help: "If a loud settlement lasts until it turns inward, it goes quiet; if not, it collapses first.",
    min: 1e2,
    max: 1e9,
    format: formatYears,
  },
  {
    key: "quietLife",
    label: "How long quiet civilizations last",
    help: "How long a compact, quiet civilization lasts after turning inward.",
    min: 1e3,
    max: 1e10,
    format: formatYears,
  },
];

function toSlider(spec: SliderSpec, value: number): number {
  let f = Math.log(value / spec.min) / Math.log(spec.max / spec.min);
  if (spec.reverse) f = 1 - f;
  return Math.round(Math.min(1, Math.max(0, f)) * STEPS);
}

function fromSlider(spec: SliderSpec, raw: number): number {
  let f = raw / STEPS;
  if (spec.reverse) f = 1 - f;
  return Number((spec.min * (spec.max / spec.min) ** f).toPrecision(2));
}

// ---------------------------------------------------------------------------
// Canvas drawing

interface Layers {
  bg: HTMLCanvasElement;
  wave: HTMLCanvasElement;
  glints: HTMLCanvasElement;
}

interface StageSize {
  w: number;
  h: number;
  dpr: number;
}

const SPACE = "#07090d";
const EARTH_ANGLE = (200 * Math.PI) / 180;
const WARM = "rgb(255, 165, 95)";
const EARTH = "rgb(120, 225, 255)";

/** CSS-pixel geometry: the galaxy sits centered in the stage, as large as fits. */
function cssGeometry(w: number, h: number) {
  const rim = (Math.min(w, h) / 2) * 0.94;
  return { cx: w / 2, cy: h / 2, rim, scale: rim / GALAXY.radius };
}

function makeCanvas(pw: number, ph: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = pw;
  c.height = ph;
  return c;
}

function buildLayers({ w, h, dpr }: StageSize): Layers {
  const pw = Math.round(w * dpr);
  const ph = Math.round(h * dpr);
  const g = cssGeometry(w, h);
  const cx = g.cx * dpr;
  const cy = g.cy * dpr;
  const rim = g.rim * dpr;
  const scale = g.scale * dpr;
  const bg = makeCanvas(pw, ph);
  const ctx = bg.getContext("2d");
  const rand = mulberry32(7);
  if (ctx) {
    ctx.fillStyle = SPACE;
    ctx.fillRect(0, 0, pw, ph);
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, rim);
    glow.addColorStop(0, "rgba(190, 200, 230, 0.22)");
    glow.addColorStop(0.35, "rgba(150, 165, 210, 0.08)");
    glow.addColorStop(1, "rgba(120, 140, 200, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, rim, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 3200; i++) {
      let r = GALAXY.radius;
      while (r >= GALAXY.radius)
        r = -GALAXY.scaleLength * Math.log(Math.max(rand() * rand(), 1e-12));
      const a = rand() * Math.PI * 2;
      ctx.fillStyle = `rgba(200, 210, 235, ${0.2 + rand() * 0.4})`;
      const s = (rand() < 0.08 ? 1.2 : 0.7) * dpr;
      ctx.fillRect(cx + r * scale * Math.cos(a), cy + r * scale * Math.sin(a), s, s);
    }
  }
  const glints = makeCanvas(pw, ph);
  const gl = glints.getContext("2d");
  if (gl) {
    gl.fillStyle = "rgba(255, 255, 255, 1)";
    const n = Math.round(pw * ph * 0.02);
    for (let i = 0; i < n; i++) {
      gl.fillRect(Math.floor(rand() * pw), Math.floor(rand() * ph), dpr, dpr);
    }
  }
  return { bg, wave: makeCanvas(pw, ph), glints };
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  layers: Layers,
  stage: StageSize,
  history: History,
  p: number
) {
  const { dpr } = stage;
  const pw = Math.round(stage.w * dpr);
  const ph = Math.round(stage.h * dpr);
  const g = cssGeometry(stage.w, stage.h);
  const cx = g.cx * dpr;
  const cy = g.cy * dpr;
  const rim = g.rim * dpr;
  const scale = g.scale * dpr;
  const t = timeAt(p);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(layers.bg, 0, 0);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, rim, 0, Math.PI * 2);
  ctx.clip();

  // Settling spreading: orange, with white specks where loud settlements fill a pixel.
  const wave = layers.wave.getContext("2d");
  if (wave && history.fronts.length > 0) {
    wave.globalCompositeOperation = "source-over";
    wave.clearRect(0, 0, pw, ph);
    wave.fillStyle = "rgb(255, 150, 80)";
    wave.beginPath();
    let any = false;
    for (const f of history.fronts) {
      if (f.t0 > t) continue;
      const r = Math.min(history.frontSpeed * (t - f.t0), 2 * GALAXY.radius) * scale;
      wave.moveTo(cx + f.x * scale + r, cy + f.y * scale);
      wave.arc(cx + f.x * scale, cy + f.y * scale, Math.max(r, 0.8), 0, Math.PI * 2);
      any = true;
    }
    if (any) {
      wave.fill();
      const starsPerPixel = GALAXY.stars / (Math.PI * rim * rim);
      const loudPerPixel = history.loudInWave * starsPerPixel;
      if (loudPerPixel > 0.01) {
        wave.globalCompositeOperation = "source-atop";
        wave.globalAlpha = Math.min(1, loudPerPixel);
        wave.drawImage(layers.glints, 0, 0);
        wave.globalAlpha = 1;
        wave.globalCompositeOperation = "source-over";
      }
      ctx.globalAlpha = 0.2 + 0.4 * Math.min(1, history.occupied * 2);
      ctx.drawImage(layers.wave, 0, 0);
      ctx.globalAlpha = 1;
    }
  }

  // Loud settlements that still exist at this moment (rare: loud phases are short).
  ctx.fillStyle = "rgb(245, 248, 255)";
  for (const l of history.lineages) {
    if (l.t0 > t || t >= l.loudEnd) continue;
    ctx.beginPath();
    ctx.arc(cx + l.x * scale, cy + l.y * scale, 1.8 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Quiet civilizations: faint warm dots.
  const dot = 1.8 * dpr;
  ctx.fillStyle = WARM;
  ctx.globalAlpha = 0.8;
  for (const l of history.lineages) {
    if (t < l.warmStart || t >= l.warmEnd) continue;
    const s = l.quiet > 20 ? dot * 1.6 : dot;
    ctx.fillRect(cx + l.x * scale - s / 2, cy + l.y * scale - s / 2, s, s);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // Earth.
  const ex = cx + GALAXY.earthRadius * scale * Math.cos(EARTH_ANGLE);
  const ey = cy + GALAXY.earthRadius * scale * Math.sin(EARTH_ANGLE);
  ctx.strokeStyle = EARTH;
  ctx.lineWidth = 1.2 * dpr;
  ctx.beginPath();
  ctx.arc(ex, ey, 7 * dpr, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = EARTH;
  ctx.beginPath();
  ctx.arc(ex, ey, 1.6 * dpr, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `${11 * dpr}px ui-sans-serif, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("Earth", ex, ey + 20 * dpr);
}

// ---------------------------------------------------------------------------
// Pieces

/** Step 1: one civilization, loud at first, then quiet and faintly warm. */
function Spotlight({ w, h, reduced }: { w: number; h: number; reduced: boolean }) {
  const dotRef = useRef<HTMLSpanElement>(null);
  const loudRef = useRef<HTMLSpanElement>(null);
  const quietRef = useRef<HTMLSpanElement>(null);
  const g = cssGeometry(w, h);
  const angle = (-30 * Math.PI) / 180;
  const x = g.cx + g.rim * 0.5 * Math.cos(angle);
  const y = g.cy + g.rim * 0.5 * Math.sin(angle);
  const labelLeft = x > w - 230;
  const ready = w > 0;

  useEffect(() => {
    if (reduced || !ready) return;
    const dotEl = dotRef.current;
    const loudEl = loudRef.current;
    const quietEl = quietRef.current;
    if (!dotEl || !loudEl || !quietEl) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
    tl.set(dotEl, {
      scale: 0,
      opacity: 1,
      backgroundColor: "#ffffff",
      boxShadow: "0 0 18px 6px rgba(255,255,255,0.7)",
    })
      .set([loudEl, quietEl], { opacity: 0 })
      .to(dotEl, { scale: 1.4, duration: 0.5, ease: "back.out(2)" })
      .to(loudEl, { opacity: 1, duration: 0.4 }, "<")
      .to({}, { duration: 2.2 })
      .to(loudEl, { opacity: 0, duration: 0.4 })
      .to(
        dotEl,
        {
          scale: 0.7,
          backgroundColor: WARM,
          boxShadow: "0 0 6px 1px rgba(255,165,95,0.35)",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(quietEl, { opacity: 1, duration: 0.5 }, "-=0.4")
      .to({}, { duration: 2.8 })
      .to([dotEl, quietEl], { opacity: 0, duration: 0.5 });
    return () => {
      tl.kill();
    };
  }, [reduced, ready]);

  if (w === 0) return null;
  const label = `pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/60 px-2 py-1 text-xs text-white ${labelLeft ? "right-5" : "left-5"}`;
  return (
    <div className="pointer-events-none absolute" style={{ left: x, top: y }} aria-hidden="true">
      <span
        ref={dotRef}
        className="absolute -left-1.5 -top-1.5 block h-3 w-3 rounded-full"
        style={reduced ? { background: WARM } : { opacity: 0 }}
      />
      {reduced ? (
        <span className={label}>Loud at first, like us. Then quiet and faintly warm.</span>
      ) : (
        <>
          <span ref={loudRef} className={label} style={{ opacity: 0 }}>
            A new civilization: loud, like us
          </span>
          <span ref={quietRef} className={label} style={{ opacity: 0 }}>
            Turned inward: quiet, faintly warm
          </span>
        </>
      )}
    </div>
  );
}

function QuestionSlider({
  q,
  params,
  onChange,
  result,
}: {
  q: Question;
  params: SettlementParams;
  onChange: (next: SettlementParams) => void;
  result?: ReactNode;
}) {
  const id = `question-${q.id}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base font-semibold text-white">
        {q.label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={STEPS}
        value={q.raw(params)}
        aria-valuetext={q.words(params)}
        onChange={(e) => onChange(q.apply(params, Number(e.target.value)))}
        className="h-9 w-full cursor-pointer accent-[#cfd6e6]"
      />
      <div className="flex justify-between text-xs text-white/50">
        <span>{q.left}</span>
        <span>{q.right}</span>
      </div>
      {result && <p className="text-sm text-white/75">{result}</p>}
    </div>
  );
}

function Slider({
  spec,
  value,
  onChange,
}: {
  spec: SliderSpec;
  value: number;
  onChange: (key: Key, value: number) => void;
}) {
  const id = `slider-${spec.key}`;
  const text = spec.format(value);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <label htmlFor={id} className="text-sm font-semibold text-white/85">
          {spec.label}
        </label>
        <span className="text-sm tabular-nums text-white/65">{text}</span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={STEPS}
        value={toSlider(spec, value)}
        aria-valuetext={text}
        onChange={(e) => onChange(spec.key, fromSlider(spec, Number(e.target.value)))}
        className="h-8 w-full cursor-pointer accent-[#cfd6e6]"
      />
      <p className="text-xs leading-relaxed text-white/50">{spec.help}</p>
    </div>
  );
}

function Headline({ model }: { model: ModelResult }) {
  const spreads = model.r > 1;
  return (
    <p className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base text-white">
      Each settlement founds <strong>{model.r.toFixed(model.r < 0.1 ? 3 : 2)}</strong> new ones on
      average, so settling{" "}
      <strong>{spreads ? "spreads across the galaxy" : "dies out after a few hops"}</strong>.
    </p>
  );
}

function Check({
  level,
  title,
  result,
  observed,
}: {
  level: Verdict;
  title: string;
  result: string;
  observed: string;
}) {
  const style = VERDICT_STYLE[level];
  return (
    <li className="flex gap-3 border-b border-white/10 py-3 last:border-b-0">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${style.dot}`}
        role="img"
        aria-label={style.label}
      >
        {style.icon}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm text-white/55">{title}</span>
        <span className="text-base text-white">{result}</span>
        <span className="text-xs text-white/45">{observed}</span>
      </div>
    </li>
  );
}

function Checks({ model }: { model: ModelResult }) {
  const near = levelOf(model.pLoudNear, LIMITS.nearTension, LIMITS.nearRuledOut);
  const wave: Verdict = model.pWave > LIMITS.waveTension ? "tension" : "fits";
  const seeResult =
    near === "ruled-out"
      ? "Yes: settlements near Earth"
      : near === "tension"
        ? "Maybe: a fair chance of settlements near Earth"
        : wave === "tension"
          ? "A settlement wave spreading somewhere in our galaxy"
          : "None near us";
  return (
    <ul>
      <Check
        level={worst(near, wave)}
        title="Would we see settlements?"
        result={seeResult}
        observed="The sky: we see none."
      />
      <Check
        level={levelOf(model.heatFraction, LIMITS.heatTension, LIMITS.heatRuledOut)}
        title="Would galaxies glow with waste heat?"
        result={`${formatPercent(model.heatFraction)} of our galaxy's starlight turned to heat`}
        observed="The sky: of about 100,000 galaxies surveyed, none turns over 85% of its starlight into heat."
      />
      <Check
        level={levelOf(model.warmInSample, LIMITS.warmTension, LIMITS.warmRuledOut)}
        title="Would nearby stars look strangely warm?"
        result={`About ${formatCount(model.warmInSample)} among the 5 million stars near us`}
        observed="The sky: a search of those stars found 7 candidates; 2 turned out to be distant galaxies."
      />
    </ul>
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/65">
      <li className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-sm bg-[rgb(255,165,95)]" aria-hidden="true" />
        Quiet civilization
      </li>
      <li className="flex items-center gap-1.5">
        <span
          className="inline-block h-2 w-3 rounded-sm bg-[rgba(255,150,80,0.55)]"
          aria-hidden="true"
        />
        Settling spreads (white specks are loud)
      </li>
      <li className="flex items-center gap-1.5">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full border border-[rgb(120,225,255)]"
          aria-hidden="true"
        />
        Earth
      </li>
    </ul>
  );
}

function MapCells({
  grid,
  params,
  dark = false,
}: {
  grid: Verdict[][];
  params: SettlementParams;
  dark?: boolean;
}) {
  const w = MAP.cols * 10;
  const h = MAP.rows * 10;
  const at = (q: SettlementParams) => ({
    x: variationFraction(q.variation) * w,
    y: (1 - q.distanceCost / MAP.distance[1]) * h,
  });
  const here = at(params);
  return (
    <>
      {grid.flatMap((line, row) =>
        line.map((v, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 10}
            y={row * 10}
            width={10.5}
            height={10.5}
            fill={dark ? VERDICT_STYLE[v].darkCell : VERDICT_STYLE[v].cell}
          />
        ))
      )}
      {PRESETS.map((preset) => {
        const { x, y } = at(preset.params);
        return (
          <circle
            key={preset.id}
            cx={x}
            cy={y}
            r={3}
            fill="none"
            stroke={dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.45)"}
            strokeWidth={1}
            strokeDasharray="2 1.5"
          />
        );
      })}
      <circle cx={here.x} cy={here.y} r={5} fill="white" stroke="black" strokeWidth={1.5} />
    </>
  );
}

function VerdictMap({
  grid,
  params,
  onPick,
}: {
  grid: Verdict[][];
  params: SettlementParams;
  onPick: (variation: number, distanceCost: number) => void;
}) {
  const w = MAP.cols * 10;
  const h = MAP.rows * 10;
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pick = (clientX: number, clientY: number) => {
    const box = boxRef.current?.getBoundingClientRect();
    if (!box) return;
    const fx = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
    const fy = Math.min(1, Math.max(0, (clientY - box.top) / box.height));
    onPick(Number(mapVariation(fx).toPrecision(2)), Math.round((1 - fy) * MAP.distance[1] * 4) / 4);
  };

  const onKey = (e: KeyboardEvent) => {
    const fx = variationFraction(params.variation);
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-0.05, 0],
      ArrowRight: [0.05, 0],
      ArrowUp: [0, 0.25],
      ArrowDown: [0, -0.25],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    const nx = Math.min(1, Math.max(0, fx + move[0]));
    const ny = Math.min(MAP.distance[1], Math.max(0, params.distanceCost + move[1]));
    onPick(Number(mapVariation(nx).toPrecision(2)), ny);
  };

  return (
    <div className="flex items-stretch gap-2">
      <div className="flex w-4 shrink-0 flex-col items-center justify-between py-1 text-[11px] text-white/50">
        <span>No</span>
        <span className="rotate-180 whitespace-nowrap [writing-mode:vertical-rl]">
          Worth settling?
        </span>
        <span>Yes</span>
      </div>
      <div className="min-w-0 flex-1">
        <div
          ref={boxRef}
          className="cursor-crosshair touch-none overflow-hidden rounded border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          role="slider"
          tabIndex={0}
          aria-label="Map of outcomes: whether circumstances differ, left to right, against whether settling is worth it, yes at the bottom. Arrow keys move the marker."
          aria-valuemin={MAP.distance[0]}
          aria-valuemax={MAP.distance[1]}
          aria-valuenow={params.distanceCost}
          aria-valuetext={`${Q_DIFFER.words(params)}; ${Q_WORTH.words(params)}`}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture?.(e.pointerId);
            pick(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (dragging.current) pick(e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
        >
          <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full" aria-hidden="true">
            <MapCells grid={grid} params={params} dark />
          </svg>
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-white/50">
          <span>Hardly</span>
          <span>Do circumstances differ?</span>
          <span>A lot</span>
        </div>
      </div>
    </div>
  );
}

function MapLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/65">
      {(Object.keys(VERDICT_STYLE) as Verdict[]).map((v) => (
        <span key={v} className="flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ background: VERDICT_STYLE[v].darkCell }}
            aria-hidden="true"
          />
          {VERDICT_STYLE[v].label}
        </span>
      ))}
      <span className="flex items-center gap-1.5">
        <span
          className="inline-block h-3 w-3 rounded-full border border-dashed border-white/70"
          aria-hidden="true"
        />
        Presets
      </span>
    </div>
  );
}

const WHY_PLAUSIBLE = (
  <>
    <strong>Why it is plausible:</strong> models of galactic settlement with finite probe speeds and
    lifetimes (<a href="https://doi.org/10.3847/1538-3881/ab31a3">Carroll-Nellenback et al. 2019</a>
    ) find galaxies that stay patchy for billions of years, and the main costs here, light-speed
    delay and waste heat, are physics every civilization faces.
  </>
);

const TOY = "A toy model, not a proof: it shows which assumptions fit the silence.";

const H3 = "text-xs font-semibold uppercase tracking-[0.14em] text-white/45";

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "SUMMARY", "A"].includes(target.tagName) ||
    target.getAttribute("role") === "slider"
  );
}

const STORY_TITLES = [
  "A quiet galaxy",
  "Is settling a neighbor worth it?",
  "It only takes a few",
  "Loud or quiet?",
  "Check against the sky",
];

// ---------------------------------------------------------------------------

export default function SettlementExplorer({ isPDF = false, bet }: SettlementExplorerProps) {
  const [params, setParams] = useState<SettlementParams>(HOLOS_BET);
  const [mode, setMode] = useState<"story" | "explore">("story");
  const [step, setStep] = useState(0);
  const [seed, setSeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [stageCss, setStageCss] = useState({ w: 0, h: 0 });
  const [reduced, setReduced] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const model = useMemo(() => runModel(params), [params]);
  const grid = useMemo(() => verdictGrid(params), [params]);
  const deferred = useDeferredValue(params);
  const history = useMemo(
    () => (isPDF ? null : sampleHistory(deferred, seed)),
    [deferred, seed, isPDF]
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrubRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const layersRef = useRef<Layers | null>(null);
  const stageRef = useRef<StageSize>({ w: 0, h: 0, dpr: 1 });
  const proxy = useRef({ p: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const historyRef = useRef<History | null>(null);
  const playingRef = useRef(playing);
  const reducedRef = useRef(false);
  historyRef.current = history;
  playingRef.current = playing;

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const layers = layersRef.current;
    const h = historyRef.current;
    const stage = stageRef.current;
    const p = proxy.current.p;
    if (scrubRef.current) scrubRef.current.value = String(Math.round(p * STEPS));
    if (timeRef.current) {
      const t = timeAt(p);
      timeRef.current.textContent = p >= 0.999 ? `${formatYears(t)}: today` : formatYears(t);
    }
    if (!canvas || !layers || !h || stage.w === 0 || stage.h === 0) return;
    const ctx = canvas.getContext("2d");
    if (ctx) drawFrame(ctx, layers, stage, h, p);
  }, []);

  const stop = useCallback(() => {
    tweenRef.current?.kill();
    tweenRef.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    tweenRef.current?.kill();
    if (proxy.current.p >= 0.999) proxy.current.p = 0;
    tweenRef.current = gsap.to(proxy.current, {
      p: 1,
      duration: PLAY_SECONDS * (1 - proxy.current.p),
      ease: "none",
      onUpdate: render,
      onComplete: () => {
        tweenRef.current = null;
        setPlaying(false);
      },
    });
    setPlaying(true);
  }, [render]);

  /** Replay the galaxy from the start, or jump to today if the reader prefers less motion. */
  const replay = useCallback(() => {
    if (reducedRef.current) {
      stop();
      proxy.current.p = 1;
      render();
      return;
    }
    proxy.current.p = 0;
    play();
  }, [play, render, stop]);

  // Size the canvas to the stage; rebuild the static layers on resize.
  useEffect(() => {
    if (isPDF) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const resize = () => {
      const w = Math.round(wrap.clientWidth);
      const h = Math.round(wrap.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const prev = stageRef.current;
      if (w === prev.w && h === prev.h && dpr === prev.dpr) return;
      stageRef.current = { w, h, dpr };
      setStageCss({ w, h });
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      layersRef.current = buildLayers(stageRef.current);
      render();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [isPDF, render]);

  // Start playing once, unless the reader prefers reduced motion.
  useEffect(() => {
    if (isPDF) return;
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reducedRef.current);
    replay();
    return () => {
      tweenRef.current?.kill();
    };
  }, [isPDF, replay]);

  // Redraw the current moment whenever the history changes.
  useEffect(() => {
    if (history) render();
  }, [history, render]);

  // Space plays or pauses, unless the reader is using a control.
  useEffect(() => {
    if (isPDF) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.code !== "Space" || isTyping(e.target)) return;
      e.preventDefault();
      if (playingRef.current) stop();
      else play();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPDF, play, stop]);

  // Full screen, where the browser allows it.
  useEffect(() => {
    if (isPDF) return;
    setCanFullscreen(Boolean(document.fullscreenEnabled));
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [isPDF]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen();
  };

  const scrollPanelTop = () => {
    panelRef.current?.scrollTo({ top: 0 });
    rootRef.current?.scrollTo({ top: 0 });
  };

  const goStep = (next: number) => {
    setStep(next);
    scrollPanelTop();
    replay();
  };

  const startStory = () => {
    setParams(HOLOS_BET);
    setMode("story");
    goStep(0);
  };

  const explore = () => {
    setMode("explore");
    scrollPanelTop();
  };

  const setParam = useCallback((key: Key, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  if (isPDF) {
    return <StaticExplorer />;
  }

  const style = VERDICT_STYLE[model.verdict];
  const spreads = model.r > 1;
  const activePreset = PRESETS.find((preset) => sameParams(preset.params, params));
  const button =
    "min-h-11 whitespace-nowrap rounded-full border px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
  const quiet = `${button} border-white/25 text-white/85 hover:border-white/60`;
  const solid = `${button} border-white bg-white font-semibold text-[#07090d]`;
  const inStory = mode === "story";
  const last = STORY_TITLES.length - 1;

  const worthResult = (
    <>
      Stay home: <strong>{formatPercent(model.pStay)}</strong> of the time.
    </>
  );
  const loudResult = model.pLoud + model.pQuiet > 0 && (
    <>
      Loud: <strong>{formatOneIn(model.loudShare)}</strong> new settlements.
    </>
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 overflow-y-auto bg-[#07090d] text-white/85 lg:overflow-hidden"
    >
      <div className="lg:grid lg:h-full lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)]">
        <section
          aria-label="Galaxy"
          className="sticky top-0 z-10 flex h-[46svh] flex-col bg-[#07090d] lg:static lg:h-full"
        >
          <div ref={wrapRef} className="relative min-h-0 flex-1">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={`Galaxy map. ${spreads ? "Settling spreads across the galaxy." : "Settling dies out; quiet civilizations appear as faint warm dots."} ${style.label}.`}
            />
            {inStory && step === 0 && <Spotlight w={stageCss.w} h={stageCss.h} reduced={reduced} />}
            <div className="pointer-events-none absolute left-4 top-3 flex flex-col">
              <a
                href="/#aliens"
                className="pointer-events-auto text-xs text-white/55 hover:text-white"
              >
                ← Holos
              </a>
              <h1 className="text-xl font-light text-white sm:text-3xl">Settlement Explorer</h1>
            </div>
            <div
              className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-sm font-semibold ${style.box}`}
              aria-live="polite"
            >
              {style.label}
            </div>
            <span
              ref={timeRef}
              className="pointer-events-none absolute bottom-3 left-4 text-sm tabular-nums text-white/75"
            />
            {canFullscreen && (
              <button
                type="button"
                onClick={toggleFullscreen}
                className="absolute bottom-2 right-3 min-h-9 rounded-full border border-white/20 bg-black/30 px-3 text-xs text-white/75 hover:border-white/50"
              >
                {isFullscreen ? "Exit full screen" : "Full screen"}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
            <button
              type="button"
              onClick={playing ? stop : play}
              className={`${quiet} min-w-20 font-semibold`}
              aria-keyshortcuts="Space"
            >
              {playing ? "Pause" : "Play"}
            </button>
            <input
              ref={scrubRef}
              type="range"
              min={0}
              max={STEPS}
              defaultValue={0}
              aria-label="Time since the galaxy formed"
              onChange={(e) => {
                stop();
                proxy.current.p = Number(e.target.value) / STEPS;
                render();
              }}
              className="h-8 flex-1 cursor-pointer accent-[#cfd6e6]"
            />
            <button
              type="button"
              onClick={() => setSeed((s) => s + 1)}
              className={`${quiet} px-3`}
              title="Replay with new random chances"
            >
              Reroll
            </button>
          </div>
        </section>

        <aside
          ref={panelRef}
          className={`flex flex-col gap-7 px-5 pt-6 text-base leading-relaxed ${inStory ? "pb-0" : "pb-20"} lg:h-full lg:overflow-y-auto lg:border-l lg:border-white/10 [&_a]:text-[#a9c7ff] [&_a]:underline [&_a]:decoration-white/30 [&_a]:underline-offset-2`}
        >
          {inStory ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2" aria-hidden="true">
                  {STORY_TITLES.map((title, i) => (
                    <span
                      key={title}
                      className={`h-1.5 rounded-full ${i === step ? "w-6 bg-white" : "w-1.5 bg-white/30"}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={explore}
                  className="min-h-11 text-sm text-white/60 underline decoration-white/30 underline-offset-2 hover:text-white"
                >
                  Skip to explore
                </button>
              </div>
              <div className="flex flex-col gap-4" aria-live="polite">
                <p className={H3}>
                  Step {step + 1} of {STORY_TITLES.length}
                </p>
                <h2 className="-mt-2 text-2xl font-light text-white">{STORY_TITLES[step]}</h2>

                {step === 0 && (
                  <>
                    <p>
                      Our galaxy is 10 billion years old and holds about 100 billion stars. Yet we
                      see no one else. Here is one possible answer.
                    </p>
                    <p>
                      A civilization appears. At first it is loud, like us: radio, lights, rockets.
                      Then it turns inward, growing compact and efficient, and goes quiet. What is
                      left is faint warmth.
                    </p>
                    <p>
                      Each warm dot on the galaxy is one of these quiet civilizations. Plenty of
                      them, and still a silent sky.
                    </p>
                    <Legend />
                  </>
                )}

                {step === 1 && (
                  <>
                    <p>
                      Picture a civilization weighing the star next door. Settling it brings more
                      energy. But a colony 10 light-years away takes 20 years to answer a single
                      message, and it soon goes its own way, a future rival.
                    </p>
                    <p>
                      The Integration Hypothesis bets the cost usually wins. Try the other answer.
                    </p>
                    <QuestionSlider
                      q={Q_WORTH}
                      params={params}
                      onChange={setParams}
                      result={worthResult}
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <p>
                      Even if most stay home, a few might settle. What matters is how many new
                      settlements each one founds. Think of an epidemic: fewer than one each, and it
                      dies out after a few hops. More than one, and it fills the galaxy.
                    </p>
                    <p>
                      Circumstances differ: a rich neighbor, a crowded home, a disaster. The more
                      they differ, the more outliers settle anyway.
                    </p>
                    <QuestionSlider q={Q_DIFFER} params={params} onChange={setParams} />
                    <Headline model={model} />
                    {!spreads && (
                      <button
                        type="button"
                        onClick={() => {
                          setParams((prev) => ({ ...prev, variation: ONLY_TAKES_ONE.variation }));
                          replay();
                        }}
                        className={`${quiet} self-start`}
                      >
                        Show me: circumstances differ a lot
                      </button>
                    )}
                  </>
                )}

                {step === 3 && (
                  <>
                    <p>
                      When they do settle, some sprawl across a star system, and the sprawl glows.
                      Others stay compact and faintly warm. Loud settlement can be seen from far
                      away; quiet settlement is much harder to spot.
                    </p>
                    <QuestionSlider
                      q={Q_LOUD}
                      params={params}
                      onChange={setParams}
                      result={loudResult}
                    />
                    <p className="text-sm text-white/60">
                      This matters only if they settle at all.
                    </p>
                  </>
                )}

                {step === 4 && (
                  <>
                    <p>
                      Now compare the galaxy you built with the one we actually see. Three questions
                      settle it.
                    </p>
                    <Checks model={model} />
                    <p className="text-sm text-white/65">{WHY_PLAUSIBLE}</p>
                    <p className="text-sm italic text-white/55">{TOY}</p>
                  </>
                )}
              </div>

              <div className="sticky bottom-0 -mx-5 flex items-center justify-between gap-3 border-t border-white/10 bg-[#07090d] px-5 py-3">
                <button
                  type="button"
                  onClick={() => goStep(step - 1)}
                  disabled={step === 0}
                  className={`${quiet} disabled:opacity-30`}
                >
                  Back
                </button>
                {step < last ? (
                  <button type="button" onClick={() => goStep(step + 1)} className={solid}>
                    Next
                  </button>
                ) : (
                  <button type="button" onClick={explore} className={solid}>
                    Explore on your own
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-light text-white">Explore</h2>
                <button
                  type="button"
                  onClick={startStory}
                  className="min-h-11 text-sm text-white/60 underline decoration-white/30 underline-offset-2 hover:text-white"
                >
                  Replay the story
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={activePreset?.id === preset.id}
                    onClick={() => {
                      setParams(preset.params);
                      replay();
                    }}
                    className={activePreset?.id === preset.id ? solid : `${quiet} font-semibold`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              {activePreset && <p className="-mt-3 text-sm text-white/65">{activePreset.note}</p>}

              <QuestionSlider
                q={Q_WORTH}
                params={params}
                onChange={setParams}
                result={worthResult}
              />
              <QuestionSlider q={Q_DIFFER} params={params} onChange={setParams} />
              <QuestionSlider q={Q_LOUD} params={params} onChange={setParams} result={loudResult} />

              <Headline model={model} />

              <div>
                <h3 className={H3}>Against the sky</h3>
                <Checks model={model} />
              </div>

              <Legend />
              <p className="text-sm text-white/65">{WHY_PLAUSIBLE}</p>
              <p className="-mt-3 text-sm italic text-white/55">{TOY}</p>

              <details className="rounded-lg border border-white/10 px-4">
                <summary className="flex min-h-12 cursor-pointer items-center font-semibold text-white/85">
                  More settings
                </summary>
                <div className="flex flex-col gap-8 pb-5 pt-2">
                  <div className="flex flex-col gap-5">
                    <h3 className={H3}>The galaxy</h3>
                    {GALAXY_SLIDERS.map((spec) => (
                      <Slider
                        key={spec.key}
                        spec={spec}
                        value={params[spec.key]}
                        onChange={setParam}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className={H3}>Where the silence fits</h3>
                    <p className="text-sm text-white/65">
                      Each square runs the model with those two answers; everything else stays as
                      set. Tap or drag to move there.
                    </p>
                    <VerdictMap
                      grid={grid}
                      params={params}
                      onPick={(variation, distanceCost) =>
                        setParams((prev) => ({ ...prev, variation, distanceCost }))
                      }
                    />
                    <MapLegend />
                  </div>
                  <p className="text-sm text-white/65">
                    Watchers, small probes that observe and never settle, have passed through our
                    solar system: <strong>{formatChance(model.pVisited).toLowerCase()}</strong> in
                    this model. We have barely looked.
                  </p>
                  <p className="text-sm text-white/65">
                    The animation is one random history; the checks average over many. The clock
                    speeds up as it runs, and dots are enlarged
                    {history && history.perMark > 1.5
                      ? `, each standing for about ${formatCount(history.perMark)} civilizations`
                      : ""}
                    . Press Space to play or pause.
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-white/70">
                    <h3 className={H3}>What the toy assumes</h3>
                    <Assumptions />
                  </div>
                  <Observations />
                  {bet && (
                    <div className="flex flex-col gap-2 text-sm text-white/65">
                      <h3 className={H3}>The bet, in the Aliens section&apos;s words</h3>
                      <blockquote className="border-l-2 border-white/20 pl-4">{bet}</blockquote>
                    </div>
                  )}
                </div>
              </details>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

function Observations() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className={H3}>Sources</h3>
      <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-white/70">
        <li>
          No galaxy among about 100,000 surveyed turns more than 85% of its starlight into heat (
          <a href="https://doi.org/10.1088/0067-0049/217/2/25">Griffith et al. 2015</a>).
        </li>
        <li>
          <a href="https://www.astro.uu.se/~ez/hephaistos/hephaistos.html">Project Hephaistos</a>{" "}
          flagged seven single stars with unexplained warmth among about five million within 1,000
          light-years (<a href="https://doi.org/10.1093/mnras/stae1186">2024</a>). Webb observations
          traced two to background galaxies; the rest have no clear explanation yet, with background
          galaxies the leading suspect (<a href="https://arxiv.org/abs/2607.09460">2026</a>,{" "}
          <a href="https://arxiv.org/abs/2607.25701">preprints</a>).
        </li>
        <li>No visible settlement nearby: no reshaped star systems in our neighborhood.</li>
      </ul>
    </div>
  );
}

function Assumptions() {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-5">
      <li>
        A flat disk 100,000 light-years across with 100 billion stars. Earth sits 26,000 light-years
        from the center.
      </li>
      <li>
        Civilizations arise at a steady rate for 10 billion years, and each starts loud, the way
        ours is now.
      </li>
      <li>
        A settlement weighs its neighbors one at a time: stay home, settle quietly, or settle
        loudly. The option that pays best usually wins; how much circumstances differ sets how often
        it does not.
      </li>
      <li>
        Each new settlement weighs the same costs and benefits afresh, since distance soon makes it
        independent.
      </li>
      <li>
        Settlers hop about 10 light-years at a time, the probe range used by Carroll-Nellenback et
        al.
      </li>
      <li>
        Loud settlements sprawl and can be seen; quiet ones stay compact. Both harvest their star,
        so its light ends up as heat, and both show as warm stars to a search like Hephaistos.
      </li>
      <li>
        Once settling spreads, settlements come and go. If each founds two new ones, about half the
        stars stay settled, as in epidemic models.
      </li>
      <li>Every civilization sends watchers: cheap probes that observe and never settle.</li>
      <li>Costs and benefits are in made-up units; only how they compare matters.</li>
    </ul>
  );
}

function StaticExplorer() {
  const grid = verdictGrid(HOLOS_BET);
  const outcomes = PRESETS.map((preset) => ({ preset, m: runModel(preset.params) }));
  return (
    <div
      style={{
        width: "100%",
        marginTop: "2em",
        marginBottom: "1em",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "1.5em",
        background: "#fafafa",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "0.75em" }}>
        <em style={{ fontSize: "1.1em" }}>Settlement Explorer (a toy model)</em>
      </div>
      <p style={{ fontSize: "0.9em", color: "rgba(0,0,0,0.75)", margin: "0 0 1em" }}>
        Every settlement weighs each nearby star: stay home, settle quietly, or settle loudly. The
        map shows which answers fit the silence we observe. Lower means settling a neighbor is more
        worth it; further right means circumstances differ more.
      </p>
      <div style={{ maxWidth: "440px", margin: "0 auto" }}>
        <svg
          viewBox={`-26 0 ${MAP.cols * 10 + 26} ${MAP.rows * 10 + 22}`}
          width="100%"
          role="img"
          aria-label="Map of outcomes for the Integration Hypothesis bet settings"
          style={{ display: "block" }}
        >
          <MapCells grid={grid} params={HOLOS_BET} />
          <text
            x={-8}
            y={(MAP.rows * 10) / 2}
            fontSize={9}
            fill="rgba(0,0,0,0.6)"
            textAnchor="middle"
            transform={`rotate(-90 -8 ${(MAP.rows * 10) / 2})`}
          >
            Is settling worth it? (no at top, yes at bottom)
          </text>
          <text
            x={(MAP.cols * 10) / 2}
            y={MAP.rows * 10 + 15}
            fontSize={9}
            fill="rgba(0,0,0,0.6)"
            textAnchor="middle"
          >
            Do circumstances differ? (hardly to a lot)
          </text>
        </svg>
        <div style={{ fontSize: "0.8em", color: "rgba(0,0,0,0.7)", marginTop: "0.5em" }}>
          {(Object.keys(VERDICT_STYLE) as Verdict[]).map((v) => (
            <span key={v} style={{ marginRight: "1.25em", whiteSpace: "nowrap" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "0.8em",
                  height: "0.8em",
                  marginRight: "0.35em",
                  background: VERDICT_STYLE[v].cell,
                  verticalAlign: "-0.05em",
                }}
              />
              {VERDICT_STYLE[v].label}
            </span>
          ))}
          <span style={{ whiteSpace: "nowrap" }}>Dashed circles: the two presets</span>
        </div>
      </div>
      <table style={{ width: "100%", marginTop: "1.25em", fontSize: "0.85em" }}>
        <tbody>
          {outcomes.map(({ preset, m }) => (
            <tr key={preset.id} style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              <td
                style={{ padding: "0.5em 0.75em 0.5em 0", fontWeight: 600, verticalAlign: "top" }}
              >
                {preset.label}
              </td>
              <td style={{ padding: "0.5em 0", color: "rgba(0,0,0,0.75)" }}>
                {VERDICT_STYLE[m.verdict].label}. Each settlement founds {m.r.toFixed(2)} new ones,
                so settling {m.r > 1 ? "spreads" : "dies out"}; about {formatCount(m.warmInSample)}{" "}
                warm stars expected among the 5 million stars near us.
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: "0.85em", color: "rgba(0,0,0,0.7)", margin: "1em 0 0" }}>
        {WHY_PLAUSIBLE}
      </p>
      <p style={{ fontSize: "0.85em", color: "rgba(0,0,0,0.6)", margin: "0.5em 0 0" }}>{TOY}</p>
    </div>
  );
}
