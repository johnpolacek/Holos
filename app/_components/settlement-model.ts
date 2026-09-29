// Toy settlement model behind SettlementExplorer. Pure functions only, so the
// same numbers drive the live readout, the colored map, and the PDF fallback.
// Adapted loosely from Carroll-Nellenback et al. 2019 (doi 10.3847/1538-3881/ab31a3):
// probes hop about 10 light-years, settlements have finite lifetimes, and
// whether the galaxy fills turns on rates. The ledger (costs and benefits)
// is this page's own addition.

export interface SettlementParams {
  /** Years between new civilizations arising somewhere in the galaxy. */
  ariseEvery: number;
  /** Ledger: what a new star is worth. */
  starWorth: number;
  /** Ledger: what distance costs (delay, loss of control, a future rival). */
  distanceCost: number;
  /** Ledger: net cost of loud sprawl compared with staying compact. */
  loudCost: number;
  /** Ledger: how much circumstances vary between settlements. */
  variation: number;
  /** Probe speed as a fraction of light speed. */
  probeSpeed: number;
  /** Years a settlement keeps weighing new stars before it turns inward. */
  inwardTime: number;
  /** Years a loud settlement lasts before it collapses. */
  loudLife: number;
  /** Years a quiet node lasts. */
  quietLife: number;
}

export type Verdict = "fits" | "tension" | "ruled-out";

export interface Reason {
  level: Verdict;
  text: string;
}

export interface ModelResult {
  pStay: number;
  pQuiet: number;
  pLoud: number;
  /** Stars a loud-born settlement weighs before it turns inward or ends. */
  starsWeighed: number;
  /** Mean new settlements founded per settlement. Below 1 fizzles, above 1 spreads. */
  r: number;
  /** Share of new settlements that are loud. */
  loudShare: number;
  /** Chance a lineage starting from one civilization never dies out. */
  survival: number;
  /** Speed of a settlement wave, as a fraction of light speed. */
  frontSpeed: number;
  /** Share of the galaxy inside a settlement wave today. */
  covered: number;
  /** Inside a wave: share of stars settled, loud, and quiet. */
  occupied: number;
  loudInWave: number;
  quietInWave: number;
  /** Chance that a settlement wave is spreading somewhere today. */
  pWave: number;
  /** Share of stars hosting a loud settlement today. */
  loudFraction: number;
  /** Share of stars hosting a quiet node today. */
  quietFraction: number;
  /** Share of the galaxy's starlight turned into waste heat. */
  heatFraction: number;
  /** Chance of a visible (loud) settlement near Earth today. */
  pLoudNear: number;
  /** Expected quiet nodes among the stars a Hephaistos-sized search checks. */
  warmInSample: number;
  /** Chance that watchers have passed through our system. */
  pVisited: number;
  /** Settlements alive in the galaxy today. */
  aliveNow: number;
  loudNow: number;
  verdict: Verdict;
  reasons: Reason[];
}

export const GALAXY = {
  age: 1e10,
  stars: 1e11,
  radius: 50_000,
  earthRadius: 26_000,
  scaleLength: 9_000,
  /** Probe range per hop, light-years (Carroll-Nellenback fiducial). */
  hop: 10,
  /** A settlement weighs at most one star per this many years. */
  cadence: 1_000,
  /** Star systems within one hop. */
  nearStars: 12,
  /** Years between new stars drifting within one hop. */
  driftEvery: 10_000,
  /** Stars checked by Project Hephaistos (within about 300 parsecs). */
  sampleStars: 5e6,
} as const;

export const LIMITS = {
  heatRuledOut: 0.85,
  heatTension: 0.5,
  /** Hephaistos: 7 candidates, 2 traced to background galaxies. */
  warmTension: 5,
  /** Tightest published limit: about 1 in 100,000 stars. */
  warmRuledOut: 50,
  nearTension: 0.05,
  nearRuledOut: 0.5,
  waveTension: 0.5,
} as const;

export const HOLOS_BET: SettlementParams = {
  ariseEvery: 1e5,
  starWorth: 4,
  distanceCost: 7,
  loudCost: 5,
  variation: 0.5,
  probeSpeed: 0.1,
  inwardTime: 1e4,
  loudLife: 1e4,
  quietLife: 1e8,
};

export const ONLY_TAKES_ONE: SettlementParams = {
  ...HOLOS_BET,
  variation: 2,
};

export const PRESETS = [
  {
    id: "holos-bet",
    label: "The Integration Hypothesis bet",
    note: "Settling a neighbor is not worth it, and circumstances differ little, so nearly every settlement stays home.",
    params: HOLOS_BET,
  },
  {
    id: "only-takes-one",
    label: "It only takes a few",
    note: "The same costs and benefits, but circumstances differ far more. Most still stay home; the few that settle are enough to spread.",
    params: ONLY_TAKES_ONE,
  },
] as const;

/** Stars a settlement can weigh in an outward phase of `years`. */
export function starsWithin(years: number): number {
  return Math.min(years / GALAXY.cadence, GALAXY.nearStars + years / GALAXY.driftEvery);
}

/** Years until a settlement has weighed `count` stars. Inverse of starsWithin. */
function yearsToWeigh(count: number): number {
  const fast = count * GALAXY.cadence;
  if (starsWithin(fast) >= count - 1e-9) return fast;
  return (count - GALAXY.nearStars) * GALAXY.driftEvery;
}

function choice(p: SettlementParams) {
  const quiet = p.starWorth - p.distanceCost;
  const loud = quiet - p.loudCost;
  const top = Math.max(0, quiet, loud);
  const eStay = Math.exp((0 - top) / p.variation);
  const eQuiet = Math.exp((quiet - top) / p.variation);
  const eLoud = Math.exp((loud - top) / p.variation);
  const z = eStay + eQuiet + eLoud;
  return { pStay: eStay / z, pQuiet: eQuiet / z, pLoud: eLoud / z };
}

/** Chance a two-type Poisson branching lineage started by a loud settlement never dies out. */
function survivalFromLoud(nL: number, nQ: number, pL: number, pQ: number): number {
  let u = pL + pQ;
  for (let i = 0; i < 400; i++) {
    const next = pL * (1 - Math.exp(-nL * u)) + pQ * (1 - Math.exp(-nQ * u));
    if (Math.abs(next - u) < 1e-12) break;
    u = next;
  }
  return 1 - Math.exp(-nL * u);
}

function chanceOfAny(expected: number): number {
  return 1 - Math.exp(-Math.max(0, expected));
}

/** Expected sweeps of a point by disks growing at `speed` from events at `rate`, over `time`. */
function sweeps(rate: number, speed: number, time: number): number {
  if (rate <= 0 || speed <= 0) return 0;
  const fill = GALAXY.radius / speed;
  if (time <= fill) return (rate * speed * speed * time ** 3) / (3 * GALAXY.radius ** 2);
  return rate * (fill / 3 + (time - fill));
}

export function runModel(p: SettlementParams): ModelResult {
  const { age, stars, sampleStars, hop } = GALAXY;
  const rate = 1 / p.ariseEvery;
  const { pStay, pQuiet, pLoud } = choice(p);
  const pSettle = pQuiet + pLoud;
  const loudShare = pSettle > 0 ? pLoud / pSettle : 0;
  const quietShare = 1 - loudShare;

  const loudSpan = Math.min(p.inwardTime, p.loudLife);
  const quietSpan = Math.min(p.inwardTime, p.quietLife);
  const nL = starsWithin(loudSpan);
  const nQ = starsWithin(quietSpan);
  const r = pLoud * nL + pQuiet * nQ;
  const matures = p.loudLife >= p.inwardTime;
  const warmAfterLoud = matures ? p.quietLife : 0;

  const survival = r > 1 ? survivalFromLoud(nL, nQ, pLoud, pQuiet) : 0;

  // Lineages that die out: a native loud civilization plus its descendants.
  const rFinite = r > 1 ? Math.min(0.98, r * (1 - survival)) : r;
  const descendants = (nL * pSettle) / (1 - rFinite);
  const finiteRate = rate * (1 - survival);
  const cap = (years: number) => Math.min(years, age);
  const loudNow = finiteRate * (1 + descendants * loudShare) * cap(loudSpan);
  const quietNow =
    finiteRate *
    (cap(warmAfterLoud) +
      descendants * (loudShare * cap(warmAfterLoud) + quietShare * cap(p.quietLife)));

  // Settlement waves from lineages that never die out.
  const wait = pSettle > 0 ? yearsToWeigh(1 / pSettle) : Number.POSITIVE_INFINITY;
  const frontSpeed = r > 1 ? hop / (hop / p.probeSpeed + wait) : 0;
  const covered = chanceOfAny(sweeps(rate * survival, frontSpeed, age));
  const pWave = chanceOfAny(rate * survival * age);

  // Inside a wave, settlements come and go; a steady 1 - 1/r of stars stays settled.
  const occupied = r > 1 ? 1 - 1 / r : 0;
  const weight =
    loudShare * (loudSpan + warmAfterLoud) + quietShare * p.quietLife || Number.POSITIVE_INFINITY;
  const loudInWave = (occupied * loudShare * loudSpan) / weight;
  const quietInWave = (occupied * (loudShare * warmAfterLoud + quietShare * p.quietLife)) / weight;

  const loudFraction = covered * loudInWave + (1 - covered) * (loudNow / stars);
  const quietFraction = Math.min(
    1,
    covered * quietInWave + (1 - covered) * Math.min(1, quietNow / stars)
  );
  const heatFraction = Math.min(1, loudFraction + quietFraction);

  const pLoudNear =
    covered * chanceOfAny(loudInWave * sampleStars) +
    (1 - covered) * chanceOfAny((loudNow / stars) * sampleStars);
  const warmInSample = quietFraction * sampleStars;

  const pVisited = chanceOfAny(sweeps(rate, p.probeSpeed, age));
  const aliveNow =
    covered * (loudInWave + quietInWave) * stars + (1 - covered) * (loudNow + quietNow);

  const reasons: Reason[] = [];
  if (pLoudNear > LIMITS.nearRuledOut) {
    reasons.push({
      level: "ruled-out",
      text: "Visible settlement near Earth, which we do not see.",
    });
  } else if (pLoudNear > LIMITS.nearTension) {
    reasons.push({
      level: "tension",
      text: "A fair chance of visible settlement near Earth, which we do not see.",
    });
  }
  if (heatFraction > LIMITS.heatRuledOut) {
    reasons.push({
      level: "ruled-out",
      text: "Over 85% of the galaxy's starlight turned to heat. A survey of 100,000 galaxies found none like that.",
    });
  } else if (heatFraction > LIMITS.heatTension) {
    reasons.push({
      level: "tension",
      text: "Over half the galaxy's starlight turned to heat. Only about 50 of 100,000 surveyed galaxies come close, and those look natural.",
    });
  }
  if (warmInSample > LIMITS.warmRuledOut) {
    reasons.push({
      level: "ruled-out",
      text: "More warm single stars near us than searches allow (about 1 in 100,000 at most).",
    });
  } else if (warmInSample > LIMITS.warmTension) {
    reasons.push({
      level: "tension",
      text: "More warm single stars near us than Project Hephaistos found unexplained (at most 5).",
    });
  }
  if (pWave > LIMITS.waveTension) {
    reasons.push({
      level: "tension",
      text: "A settlement wave is likely spreading somewhere in the galaxy. Infrared maps of the Milky Way show none.",
    });
  }
  const verdict: Verdict = reasons.some((x) => x.level === "ruled-out")
    ? "ruled-out"
    : reasons.length > 0
      ? "tension"
      : "fits";

  return {
    pStay,
    pQuiet,
    pLoud,
    starsWeighed: nL,
    r,
    loudShare,
    survival,
    frontSpeed,
    covered,
    occupied,
    loudInWave,
    quietInWave,
    pWave,
    loudFraction,
    quietFraction,
    heatFraction,
    pLoudNear,
    warmInSample,
    pVisited,
    aliveNow,
    loudNow: loudFraction * stars,
    verdict,
    reasons,
  };
}

// Map axes: how much circumstances vary (x, log scale) against what distance costs (y).
export const MAP = {
  cols: 36,
  rows: 24,
  variation: [0.1, 10] as const,
  distance: [0, 10] as const,
};

export function mapVariation(fraction: number): number {
  const [lo, hi] = MAP.variation;
  return lo * (hi / lo) ** fraction;
}

export function variationFraction(value: number): number {
  const [lo, hi] = MAP.variation;
  return Math.log(value / lo) / Math.log(hi / lo);
}

export function verdictGrid(p: SettlementParams): Verdict[][] {
  const grid: Verdict[][] = [];
  for (let row = 0; row < MAP.rows; row++) {
    const distanceCost =
      MAP.distance[1] - ((row + 0.5) / MAP.rows) * (MAP.distance[1] - MAP.distance[0]);
    const line: Verdict[] = [];
    for (let col = 0; col < MAP.cols; col++) {
      const variation = mapVariation((col + 0.5) / MAP.cols);
      line.push(runModel({ ...p, distanceCost, variation }).verdict);
    }
    grid.push(line);
  }
  return grid;
}

// ---------------------------------------------------------------------------
// One random history, for the animation. The readout never depends on it.

export interface Lineage {
  t0: number;
  x: number;
  y: number;
  loud: number;
  quiet: number;
  loudEnd: number;
  warmStart: number;
  warmEnd: number;
}

export interface Front {
  t0: number;
  x: number;
  y: number;
}

export interface History {
  lineages: Lineage[];
  fronts: Front[];
  /** Real civilizations each drawn lineage stands for. */
  perMark: number;
  frontSpeed: number;
  loudInWave: number;
  quietInWave: number;
  occupied: number;
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function poisson(mean: number, rand: () => number): number {
  if (mean <= 0) return 0;
  if (mean > 40) {
    const u = Math.max(rand(), 1e-12);
    const v = rand();
    const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return Math.max(0, Math.round(mean + Math.sqrt(mean) * normal));
  }
  const limit = Math.exp(-mean);
  let k = 0;
  let prod = rand();
  while (prod > limit) {
    k++;
    prod *= rand();
  }
  return k;
}

/** Position drawn from an exponential disk, in light-years from the center. */
function diskPoint(rand: () => number): { x: number; y: number } {
  const { radius, scaleLength } = GALAXY;
  let r = radius;
  while (r >= radius) {
    r = -scaleLength * Math.log(Math.max(rand() * rand(), 1e-12));
  }
  const angle = rand() * 2 * Math.PI;
  return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

const MAX_LINEAGES = 20_000;
const MAX_FRONTS = 300;

export function sampleHistory(p: SettlementParams, seed: number): History {
  const rand = mulberry32(seed);
  const m = runModel(p);
  const rate = 1 / p.ariseEvery;
  const { age } = GALAXY;

  const loudSpan = Math.min(p.inwardTime, p.loudLife);
  const quietSpan = Math.min(p.inwardTime, p.quietLife);
  const nL = starsWithin(loudSpan);
  const nQ = starsWithin(quietSpan);
  const matures = p.loudLife >= p.inwardTime;

  const expected = rate * age * (1 - m.survival);
  const count = Math.min(MAX_LINEAGES, poisson(expected, rand));
  const perMark = expected > MAX_LINEAGES ? expected / MAX_LINEAGES : 1;

  const lineages: Lineage[] = [];
  for (let i = 0; i < count; i++) {
    const t0 = rand() * age;
    const { x, y } = diskPoint(rand);
    let loud = 1;
    let quiet = 0;
    let genL = 1;
    let genQ = 0;
    while ((genL > 0 || genQ > 0) && loud + quiet < 5_000) {
      const nextL = poisson(genL * nL * m.pLoud + genQ * nQ * m.pLoud, rand);
      const nextQ = poisson(genL * nL * m.pQuiet + genQ * nQ * m.pQuiet, rand);
      loud += nextL;
      quiet += nextQ;
      genL = nextL;
      genQ = nextQ;
    }
    const hasWarm = matures || quiet > 0;
    lineages.push({
      t0,
      x,
      y,
      loud,
      quiet,
      loudEnd: t0 + loudSpan,
      warmStart: quiet > 0 ? t0 : t0 + loudSpan,
      warmEnd: hasWarm ? t0 + loudSpan + p.quietLife : t0,
    });
  }

  const fronts: Front[] = [];
  const waveRate = rate * m.survival;
  if (waveRate > 0 && m.frontSpeed > 0) {
    let t = 0;
    let tries = 0;
    while (fronts.length < MAX_FRONTS && tries < 20_000) {
      tries++;
      t += -Math.log(Math.max(rand(), 1e-12)) / waveRate;
      if (t > age) break;
      const { x, y } = diskPoint(rand);
      const inside = fronts.some((f) => Math.hypot(f.x - x, f.y - y) < m.frontSpeed * (t - f.t0));
      if (!inside) fronts.push({ t0: t, x, y });
      const everywhere = fronts.some((f) => m.frontSpeed * (t - f.t0) > 2 * GALAXY.radius);
      if (everywhere) break;
    }
  }

  return {
    lineages,
    fronts,
    perMark,
    frontSpeed: m.frontSpeed,
    loudInWave: m.loudInWave,
    quietInWave: m.quietInWave,
    occupied: m.occupied,
  };
}

// ---------------------------------------------------------------------------
// Plain-language formatting.

export function formatYears(years: number): string {
  if (years >= 1e9) return `${trim(years / 1e9)} billion years`;
  if (years >= 1e6) return `${trim(years / 1e6)} million years`;
  if (years >= 1e3) return `${Math.round(years).toLocaleString("en-US")} years`;
  return `${Math.round(years)} years`;
}

export function formatCount(n: number): string {
  if (n >= 1e9) return `${trim(n / 1e9)} billion`;
  if (n >= 1e6) return `${trim(n / 1e6)} million`;
  if (n >= 100) return Math.round(n).toLocaleString("en-US");
  if (n >= 10) return n.toFixed(0);
  if (n >= 1) return n.toFixed(1).replace(/\.0$/, "");
  if (n >= 0.01) return n.toFixed(2);
  if (n <= 0) return "0";
  return "under 0.01";
}

export function formatOneIn(share: number): string {
  if (share <= 0) return "none";
  if (share >= 0.5) return `${Math.round(share * 100)}%`;
  const n = 1 / share;
  if (n > 1e12) return "fewer than 1 in a trillion";
  return `1 in ${formatCount(n)}`;
}

export function formatPercent(x: number): string {
  if (x <= 0) return "0%";
  if (x < 1e-6) return "under 0.0001%";
  if (x < 0.001) return `${(x * 100).toPrecision(1)}%`;
  if (x < 0.1) return `${(x * 100).toFixed(1).replace(/\.0$/, "")}%`;
  if (x < 0.995 || x >= 1) return `${Math.round(x * 100)}%`;
  return x < 0.9995 ? `${(x * 100).toFixed(1)}%` : "over 99.9%";
}

export function formatChance(p: number): string {
  if (p < 0.01) return "Very unlikely";
  if (p < 0.05) return "Unlikely";
  if (p < 0.5) return "Possible";
  if (p < 0.95) return "Likely";
  return "Almost certain";
}

export function formatSpeed(fractionOfLight: number): string {
  const pct = fractionOfLight * 100;
  if (pct >= 1) return `${trim(pct)}% of light speed`;
  return `${pct.toPrecision(1)}% of light speed`;
}

function trim(x: number): string {
  if (x >= 100) return Math.round(x).toLocaleString("en-US");
  if (x >= 10) return x.toFixed(0);
  return x.toFixed(1).replace(/\.0$/, "");
}
