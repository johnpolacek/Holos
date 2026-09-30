"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { PLATE_CSS } from "./plateStyles";
import { buildQuantumEraserMotion, type PlateMotion } from "./quantumEraserMotion";

// Static line-art plate: the delayed-choice quantum eraser (after Kim et al., 2000).
// Style test for the site's new animation language. No motion yet; every part is
// a named group so a timeline can address it later.

const INK = "var(--plate-ink)";
const INK_SOFT = "var(--plate-ink-soft)";
const PAPER = "var(--plate-paper)";
const BEAM = "var(--plate-beam)";
const CURVE = "var(--plate-curve)";

export type PlateVariant = "engraved" | "twocolor" | "blueprint" | "pencil" | "sepia" | "phosphor";

// Pattern and filter ids must be unique per plate so several variants can share a page.
const PrefixContext = createContext("qe-");
const usePrefix = () => useContext(PrefixContext);

const W_MAIN = 1.25;
const W_FINE = 0.75;
const W_HAIR = 0.5;

// Plot curves: counts at D0 vs detector position x0.
export const PLOT_W = 220;
export const PLOT_H = 96;
const SAMPLES = 140;

function envelope(u: number) {
  return Math.exp(-(u * u) / (2 * 0.32 * 0.32));
}

type Curve = (u: number) => number;

export const CURVES: Record<string, Curve> = {
  total: (u) => envelope(u) * 0.92,
  d1: (u) => envelope(u) * 0.92 * 0.5 * (1 + Math.cos(u * 26)),
  d2: (u) => envelope(u) * 0.92 * 0.5 * (1 - Math.cos(u * 26)),
  d3: (u) => envelope(u) * 0.92 * 0.5,
};

export function curvePath(fn: Curve, scale = 1) {
  const pts: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const u = -1 + (2 * i) / SAMPLES;
    const x = (i / SAMPLES) * PLOT_W;
    const y = PLOT_H - fn(u) * PLOT_H * scale;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

// Server and client Math can differ in the last digit; round to keep hydration stable.
const round2 = (n: number) => Math.round(n * 100) / 100;

export function dataPoints(fn: Curve, scale = 1) {
  const pts: { x: number; y: number; e: number }[] = [];
  for (let i = 4; i <= SAMPLES - 4; i += 7) {
    const u = -1 + (2 * i) / SAMPLES;
    const v = fn(u) * scale;
    // Deterministic jitter so server and client match.
    const jitter = Math.sin(i * 12.9898) * 0.035;
    pts.push({
      x: round2((i / SAMPLES) * PLOT_W),
      y: round2(PLOT_H - (v + jitter * v) * PLOT_H),
      e: round2(3 + Math.sqrt(v) * 5),
    });
  }
  return pts;
}

// ---------- Symbols ----------

function Detector({
  id,
  x,
  y,
  angle,
  label,
  labelDx = 0,
  labelDy = -22,
}: {
  id: string;
  x: number;
  y: number;
  angle: number;
  label: string;
  labelDx?: number;
  labelDy?: number;
}) {
  const p = usePrefix();
  return (
    <g id={id}>
      <g transform={`translate(${x} ${y}) rotate(${angle})`}>
        <rect
          x={0}
          y={-11}
          width={26}
          height={22}
          fill={`url(#${p}hatch)`}
          stroke={INK}
          strokeWidth={W_MAIN}
        />
        <path d="M0,-11 A11,11 0 0 0 0,11 Z" fill={PAPER} stroke={INK} strokeWidth={W_MAIN} />
        <line x1={-5} y1={-5} x2={-5} y2={5} stroke={INK} strokeWidth={W_HAIR} />
        <line x1={26} y1={0} x2={32} y2={0} stroke={INK} strokeWidth={W_FINE} />
      </g>
      <text x={x + labelDx} y={y + labelDy} className="plate-sym" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Splitter({ id, x, y, angle }: { id: string; x: number; y: number; angle: number }) {
  const p = usePrefix();
  return (
    <g id={id} transform={`translate(${x} ${y}) rotate(${angle})`}>
      <rect x={-16} y={-3} width={32} height={6} fill={PAPER} stroke={INK} strokeWidth={W_MAIN} />
      <rect x={-16} y={0} width={32} height={3} fill={`url(#${p}hatch-dense)`} stroke="none" />
      <line x1={-16} y1={0} x2={16} y2={0} stroke={INK} strokeWidth={W_HAIR} />
    </g>
  );
}

function Mirror({
  id,
  x,
  y,
  angle,
  backSide,
}: {
  id: string;
  x: number;
  y: number;
  angle: number;
  backSide: 1 | -1;
}) {
  const ticks = [];
  for (let t = -15; t <= 15; t += 4) {
    ticks.push(
      <line key={t} x1={t} y1={0} x2={t + 4} y2={6 * backSide} stroke={INK} strokeWidth={W_HAIR} />
    );
  }
  return (
    <g id={id} transform={`translate(${x} ${y}) rotate(${angle})`}>
      {ticks}
      <line x1={-17} y1={0} x2={17} y2={0} stroke={INK} strokeWidth={W_MAIN * 1.4} />
    </g>
  );
}

function Leader({
  from,
  to,
  label,
  sub,
  anchor = "start",
}: {
  from: [number, number];
  to: [number, number];
  label: string;
  sub?: string;
  anchor?: "start" | "end" | "middle";
}) {
  const dx = anchor === "start" ? 4 : anchor === "end" ? -4 : 0;
  const textAbove = from[1] > to[1];
  const endY = textAbove ? to[1] + (sub ? 19 : 7) : to[1] - 8;
  return (
    <g className="leader">
      <circle cx={from[0]} cy={from[1]} r={1.6} fill={INK} />
      <polyline
        points={`${from[0]},${from[1]} ${to[0]},${endY}`}
        fill="none"
        stroke={INK}
        strokeWidth={W_HAIR}
      />
      <text x={to[0] + dx} y={to[1] + 3.5} className="plate-label" textAnchor={anchor}>
        {label}
      </text>
      {sub && (
        <text x={to[0] + dx} y={to[1] + 15} className="plate-note" textAnchor={anchor}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Beam({ d, id, faint = false }: { d: string; id?: string; faint?: boolean }) {
  return (
    <path
      id={id}
      d={d}
      fill="none"
      stroke={BEAM}
      strokeWidth={faint ? W_FINE : W_MAIN}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Wire({ points }: { points: string }) {
  return (
    <polyline
      points={points}
      fill="none"
      stroke={INK_SOFT}
      strokeWidth={W_FINE}
      strokeDasharray="1 3"
      strokeLinecap="round"
    />
  );
}

function Arrowhead({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <path
      d="M0,0 L-7,-2.5 L-7,2.5 Z"
      transform={`translate(${x} ${y}) rotate(${angle})`}
      fill={INK}
    />
  );
}

function Dimension({
  x1,
  x2,
  y,
  ext1,
  ext2,
  label,
}: {
  x1: number;
  x2: number;
  y: number;
  ext1: number;
  ext2: number;
  label: string;
}) {
  const mid = (x1 + x2) / 2;
  return (
    <g className="dimension">
      <line
        x1={x1}
        y1={ext1}
        x2={x1}
        y2={y + (y > ext1 ? 5 : -5)}
        stroke={INK_SOFT}
        strokeWidth={W_HAIR}
      />
      <line
        x1={x2}
        y1={ext2}
        x2={x2}
        y2={y + (y > ext2 ? 5 : -5)}
        stroke={INK_SOFT}
        strokeWidth={W_HAIR}
      />
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={INK} strokeWidth={W_HAIR} />
      <Arrowhead x={x1} y={y} angle={180} />
      <Arrowhead x={x2} y={y} angle={0} />
      <rect
        x={mid - label.length * 3.1 - 6}
        y={y - 7}
        width={label.length * 6.2 + 12}
        height={14}
        fill={PAPER}
      />
      <text x={mid} y={y + 3.5} className="plate-note" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Plot({
  x,
  y,
  fig,
  title,
  note,
  curve,
  ghost,
}: {
  x: number;
  y: number;
  fig: string;
  title: string;
  note: string;
  curve: keyof typeof CURVES;
  ghost?: (keyof typeof CURVES)[];
}) {
  const pts = dataPoints(CURVES[curve]);
  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const tx = (i / 10) * PLOT_W;
    ticks.push(
      <line
        key={`t${i}`}
        x1={tx}
        y1={PLOT_H}
        x2={tx}
        y2={PLOT_H + (i % 5 === 0 ? 6 : 3)}
        stroke={INK}
        strokeWidth={W_HAIR}
      />
    );
  }
  for (let i = 0; i <= 4; i++) {
    const ty = PLOT_H - (i / 4) * PLOT_H;
    ticks.push(
      <line key={`y${i}`} x1={-3} y1={ty} x2={0} y2={ty} stroke={INK} strokeWidth={W_HAIR} />
    );
    if (i > 0) {
      ticks.push(
        <line
          key={`g${i}`}
          x1={0}
          y1={ty}
          x2={PLOT_W}
          y2={ty}
          stroke={INK_SOFT}
          strokeWidth={W_HAIR}
          strokeDasharray="1 4"
        />
      );
    }
  }
  return (
    <g id={`plot-${curve}`} transform={`translate(${x} ${y})`}>
      <text x={0} y={-30} className="plate-fig">
        {fig}
      </text>
      <text x={0} y={-14} className="plate-sym">
        {title}
      </text>
      {ticks}
      {ghost?.map((g) => (
        <path
          key={g}
          d={curvePath(CURVES[g])}
          fill="none"
          className="ghost"
          stroke={INK_SOFT}
          strokeWidth={W_HAIR}
          strokeDasharray="3 2"
        />
      ))}
      <path
        className="fit"
        d={curvePath(CURVES[curve])}
        fill="none"
        stroke={CURVE}
        strokeWidth={W_MAIN}
      />
      {pts.map((p) => (
        <g key={p.x} className="pt">
          <line x1={p.x} y1={p.y - p.e} x2={p.x} y2={p.y + p.e} stroke={INK} strokeWidth={W_HAIR} />
          <line
            x1={p.x - 2}
            y1={p.y - p.e}
            x2={p.x + 2}
            y2={p.y - p.e}
            stroke={INK}
            strokeWidth={W_HAIR}
          />
          <line
            x1={p.x - 2}
            y1={p.y + p.e}
            x2={p.x + 2}
            y2={p.y + p.e}
            stroke={INK}
            strokeWidth={W_HAIR}
          />
          <circle cx={p.x} cy={p.y} r={1.8} fill={PAPER} stroke={INK} strokeWidth={W_FINE} />
        </g>
      ))}
      <line x1={0} y1={0} x2={0} y2={PLOT_H} stroke={INK} strokeWidth={W_FINE} />
      <line x1={0} y1={PLOT_H} x2={PLOT_W} y2={PLOT_H} stroke={INK} strokeWidth={W_FINE} />
      <text x={PLOT_W} y={PLOT_H + 18} className="plate-note" textAnchor="end">
        x₀
      </text>
      <text x={-8} y={4} className="plate-note" textAnchor="end">
        n
      </text>
      <text x={0} y={PLOT_H + 34} className="plate-note">
        {note}
      </text>
    </g>
  );
}

function RegistrationMark({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={6} fill="none" stroke={INK} strokeWidth={W_HAIR} />
      <line x1={-10} y1={0} x2={10} y2={0} stroke={INK} strokeWidth={W_HAIR} />
      <line x1={0} y1={-10} x2={0} y2={10} stroke={INK} strokeWidth={W_HAIR} />
    </g>
  );
}

// ---------- Plate ----------

export const PHOTON_POOL = 6;

// Where light meets each detector face (the flash origin).
const DETECTOR_TIPS: [string, number, number][] = [
  ["d0", 499, 170],
  ["d1", 910.2, 409.8],
  ["d2", 910.2, 510.2],
  ["d3", 600, 341],
  ["d4", 600, 579],
];

const FILTERS: Partial<Record<PlateVariant, string>> = {
  pencil: "wobble",
  phosphor: "glow",
};

export default function QuantumEraserPlate({
  variant = "engraved",
  animated = false,
  camera = false,
}: {
  variant?: PlateVariant;
  animated?: boolean;
  camera?: boolean;
}) {
  const p = `qe-${variant}-`;
  const filter = FILTERS[variant];
  const svgRef = useRef<SVGSVGElement>(null);
  const [playing, setPlaying] = useState(true);
  const controls = useRef<PlateMotion | null>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !svgRef.current) return;
    const svg = svgRef.current;
    const motion = buildQuantumEraserMotion(svg, { camera, hud: hudRef.current });
    controls.current = motion;
    svg.removeAttribute("data-pending");
    setPlaying(motion.isAnimated);
    return () => {
      controls.current = null;
      motion.revert();
    };
  }, [animated, camera]);

  const plate = (
    <PrefixContext.Provider value={p}>
      <svg
        ref={svgRef}
        data-pending={animated ? "" : undefined}
        viewBox="0 0 1200 980"
        role="img"
        aria-labelledby={`${p}title ${p}desc`}
        className={`plate plate--${variant}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static stylesheet constant */}
        <style dangerouslySetInnerHTML={{ __html: PLATE_CSS }} />
        <title id={`${p}title`}>Delayed-choice quantum eraser, schematic plate</title>
        <desc id={`${p}desc`}>
          A laser sends photons through a double slit into a crystal that splits each photon into a
          signal photon, which reaches detector D0 first, and an idler photon, which travels a
          longer path to one of four detectors. D3 and D4 keep which-slit information; D1 and D2
          erase it. Plots below show that the D0 pattern alone never has fringes, while hits sorted
          by D1 or D2 show fringes and anti-fringes that add back up to the same featureless total.
        </desc>
        <defs>
          <pattern
            id={`${p}hatch`}
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="4" stroke={INK} strokeWidth="0.6" />
          </pattern>
          <pattern
            id={`${p}hatch-dense`}
            width="2.5"
            height="2.5"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="2.5" stroke={INK} strokeWidth="0.5" />
          </pattern>
          <pattern
            id={`${p}crosshatch`}
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-30)"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeWidth="0.35" />
            <line x1="0" y1="0" x2="6" y2="0" stroke={INK} strokeWidth="0.35" />
          </pattern>
          <pattern id={`${p}grid`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10,0 L0,0 L0,10" fill="none" stroke="var(--plate-grid)" strokeWidth="0.4" />
          </pattern>
          <pattern id={`${p}grid-major`} width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50,0 L0,0 L0,50" fill="none" stroke="var(--plate-grid)" strokeWidth="0.9" />
          </pattern>
          <filter id={`${p}wobble`} x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="2.4" />
          </filter>
          <filter id={`${p}glow`} x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id={`${p}stipple`} width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.45" fill={INK} />
            <circle cx="3.5" cy="3.5" r="0.45" fill={INK} />
          </pattern>
        </defs>

        <g filter={filter ? `url(#${p}${filter})` : undefined}>
          {/* Frame */}
          <g id="frame">
            <rect x={0} y={0} width={1200} height={980} fill={PAPER} />
            <g className="plate-grid">
              <rect x={26} y={26} width={1148} height={928} fill={`url(#${p}grid)`} />
              <rect x={26} y={26} width={1148} height={928} fill={`url(#${p}grid-major)`} />
            </g>
            <rect
              x={20}
              y={20}
              width={1160}
              height={940}
              fill="none"
              stroke={INK}
              strokeWidth={W_MAIN}
            />
            <rect
              x={26}
              y={26}
              width={1148}
              height={928}
              fill="none"
              stroke={INK}
              strokeWidth={W_HAIR}
            />
            {Array.from({ length: 58 }, (_, i) => {
              const x = 26 + i * 20;
              return (
                <line
                  key={`fx${i}`}
                  x1={x}
                  y1={26}
                  x2={x}
                  y2={i % 5 === 0 ? 34 : 30}
                  stroke={INK}
                  strokeWidth={W_HAIR}
                />
              );
            })}
            {Array.from({ length: 47 }, (_, i) => {
              const y = 26 + i * 20;
              return (
                <line
                  key={`fy${i}`}
                  x1={26}
                  y1={y}
                  x2={i % 5 === 0 ? 34 : 30}
                  y2={y}
                  stroke={INK}
                  strokeWidth={W_HAIR}
                />
              );
            })}
            <RegistrationMark x={1150} y={52} />
            <text x={56} y={62} className="plate-fig">
              PLATE III
            </text>
            <text x={56} y={82} className="plate-title">
              The delayed-choice quantum eraser
            </text>
            <text x={56} y={100} className="plate-note">
              Schematic, not to scale. After Kim, Yu, Kulik, Shih &amp; Scully, Phys. Rev. Lett. 84,
              1 (2000).
            </text>
          </g>

          <g className="plate-body">
            {/* Optical table grid (construction layer) */}
            <g id="table" opacity={0.5}>
              {Array.from({ length: 22 }, (_, i) => (
                <circle
                  key={`h${i}`}
                  cx={80 + i * 40}
                  cy={650}
                  r={1.4}
                  fill="none"
                  stroke={INK_SOFT}
                  strokeWidth={W_HAIR}
                />
              ))}
              <line x1={56} y1={640} x2={1144} y2={640} stroke={INK_SOFT} strokeWidth={W_HAIR} />
              <line x1={56} y1={660} x2={1144} y2={660} stroke={INK_SOFT} strokeWidth={W_HAIR} />
            </g>

            {/* Beams: drawn beneath components */}
            <g id="beams">
              <Beam id="beam-pump" d="M160,300 L208,300" />
              <Beam id="beam-slit-a" d="M214,292 L251,292" />
              <Beam id="beam-slit-b" d="M214,308 L253,308" />
              <Beam id="signal-a" d="M272,292 L420,160 L499,170" />
              <Beam id="signal-b" d="M274,308 L420,180 L499,170" />
              <Beam id="idler-a" d="M272,292 L392,462" faint />
              <Beam id="idler-b" d="M274,308 L392,478" faint />
              <Beam id="idler-a-out" d="M412,466 L600,400 L800,400 L860,460 L910.2,409.8" faint />
              <Beam id="idler-a-d3" d="M600,400 L600,341" faint />
              <Beam id="idler-b-out" d="M412,474 L600,520 L800,520 L860,460 L910.2,510.2" faint />
              <Beam id="idler-b-d4" d="M600,520 L600,579" faint />
            </g>
            <g id="beam-arrows">
              <Arrowhead x={190} y={300} angle={0} />
              <Arrowhead x={350} y={220} angle={-41.7} />
              <Arrowhead x={335} y={381} angle={54.6} />
              <Arrowhead x={700} y={400} angle={0} />
              <Arrowhead x={700} y={520} angle={0} />
            </g>

            {/* Laser */}
            <g id="laser">
              <rect
                x={40}
                y={282}
                width={120}
                height={36}
                fill={`url(#${p}hatch)`}
                stroke={INK}
                strokeWidth={W_MAIN}
              />
              <rect
                x={52}
                y={288}
                width={90}
                height={24}
                fill={PAPER}
                stroke={INK}
                strokeWidth={W_FINE}
              />
              {[64, 76, 88, 100, 112, 124].map((x) => (
                <line key={x} x1={x} y1={288} x2={x} y2={312} stroke={INK} strokeWidth={W_HAIR} />
              ))}
              <rect
                x={156}
                y={294}
                width={8}
                height={12}
                fill={PAPER}
                stroke={INK}
                strokeWidth={W_FINE}
              />
              <rect
                x={46}
                y={318}
                width={14}
                height={8}
                fill={PAPER}
                stroke={INK}
                strokeWidth={W_FINE}
              />
              <rect
                x={140}
                y={318}
                width={14}
                height={8}
                fill={PAPER}
                stroke={INK}
                strokeWidth={W_FINE}
              />
            </g>

            {/* Double slit */}
            <g id="double-slit">
              <rect
                x={208}
                y={236}
                width={6}
                height={53}
                fill={`url(#${p}hatch-dense)`}
                stroke={INK}
                strokeWidth={W_FINE}
              />
              <rect
                x={208}
                y={295}
                width={6}
                height={10}
                fill={`url(#${p}hatch-dense)`}
                stroke={INK}
                strokeWidth={W_FINE}
              />
              <rect
                x={208}
                y={311}
                width={6}
                height={53}
                fill={`url(#${p}hatch-dense)`}
                stroke={INK}
                strokeWidth={W_FINE}
              />
              <text x={222} y={289} className="plate-sym-sm">
                A
              </text>
              <text x={222} y={320} className="plate-sym-sm">
                B
              </text>
            </g>

            {/* Nonlinear crystal */}
            <g id="crystal">
              <polygon
                points="246,265 286,265 296,335 256,335"
                fill={`url(#${p}crosshatch)`}
                stroke={INK}
                strokeWidth={W_MAIN}
              />
              <polygon
                points="246,265 286,265 296,335 256,335"
                fill="none"
                stroke={INK}
                strokeWidth={W_MAIN}
              />
              <line
                x1={262}
                y1={272}
                x2={278}
                y2={328}
                stroke={INK}
                strokeWidth={W_HAIR}
                strokeDasharray="2 2"
              />
              <circle cx={272} cy={292} r={2.2} fill={PAPER} stroke={INK} strokeWidth={W_FINE} />
              <circle cx={274} cy={308} r={2.2} fill={PAPER} stroke={INK} strokeWidth={W_FINE} />
            </g>

            {/* Signal arm */}
            <g id="lens">
              <path
                d="M420,138 Q434,170 420,202 Q406,170 420,138 Z"
                fill={`url(#${p}stipple)`}
                stroke={INK}
                strokeWidth={W_MAIN}
              />
              <line
                x1={420}
                y1={128}
                x2={420}
                y2={212}
                stroke={INK_SOFT}
                strokeWidth={W_HAIR}
                strokeDasharray="6 2 1 2"
              />
            </g>
            <Detector id="d0" x={510} y={170} angle={0} label="D₀" labelDy={-20} />
            <g id="d0-stage">
              <rect
                x={546}
                y={122}
                width={8}
                height={96}
                fill={`url(#${p}hatch)`}
                stroke={INK}
                strokeWidth={W_FINE}
              />
              <line x1={574} y1={132} x2={574} y2={208} stroke={INK} strokeWidth={W_FINE} />
              <Arrowhead x={574} y={128} angle={-90} />
              <Arrowhead x={574} y={212} angle={90} />
              <text x={584} y={148} className="plate-note">
                scan x₀
              </text>
            </g>

            {/* Idler arm */}
            <g id="prism">
              <polygon
                points="392,452 392,488 420,470"
                fill={`url(#${p}stipple)`}
                stroke={INK}
                strokeWidth={W_MAIN}
              />
            </g>
            <Splitter id="bs-a" x={600} y={400} angle={-45} />
            <Splitter id="bs-b" x={600} y={520} angle={45} />
            <Mirror id="m-a" x={800} y={400} angle={22.5} backSide={-1} />
            <Mirror id="m-b" x={800} y={520} angle={-22.5} backSide={1} />
            <Splitter id="bs-c" x={860} y={460} angle={0} />
            <Detector id="d3" x={600} y={330} angle={-90} label="D₃" labelDx={-24} labelDy={-8} />
            <Detector id="d4" x={600} y={590} angle={90} label="D₄" labelDx={-24} labelDy={20} />
            <Detector id="d1" x={918} y={402} angle={-45} label="D₁" labelDx={-22} labelDy={-14} />
            <Detector id="d2" x={918} y={518} angle={45} label="D₂" labelDx={-22} labelDy={26} />

            {/* Coincidence counter and wiring */}
            <g id="wiring">
              <Wire points="542,170 960,170 960,220 980,220" />
              <Wire points="600,298 600,284 1000,284 1000,262" />
              <Wire points="603,622 603,612 1130,612 1130,262" />
              <Wire points="941,379 1045,379 1045,262" />
              <Wire points="941,541 1088,541 1088,262" />
            </g>
            <g id="counter">
              <rect
                x={980}
                y={178}
                width={170}
                height={84}
                fill={PAPER}
                stroke={INK}
                strokeWidth={W_MAIN}
              />
              <rect
                x={986}
                y={184}
                width={158}
                height={72}
                fill="none"
                stroke={INK}
                strokeWidth={W_HAIR}
              />
              <text x={1065} y={204} className="plate-label" textAnchor="middle">
                COINCIDENCE
              </text>
              <text x={1065} y={218} className="plate-label" textAnchor="middle">
                COUNTER
              </text>
              {["D₀·D₁", "D₀·D₂", "D₀·D₃", "D₀·D₄"].map((c, i) => (
                <g key={c}>
                  <rect
                    x={992 + i * 38}
                    y={228}
                    width={34}
                    height={20}
                    fill="none"
                    stroke={INK}
                    strokeWidth={W_HAIR}
                  />
                  <rect
                    id={`cc-flash-${i + 1}`}
                    x={994 + i * 38}
                    y={230}
                    width={30}
                    height={16}
                    fill={`url(#${p}hatch)`}
                    opacity={0}
                  />
                  <text x={1009 + i * 38} y={241.5} className="plate-tiny" textAnchor="middle">
                    {c}
                  </text>
                </g>
              ))}
            </g>

            {/* Groupings */}
            <g id="note-which-path">
              <text x={624} y={322} className="plate-note">
                which-slit
              </text>
              <text x={624} y={335} className="plate-note">
                record kept
              </text>
              <text x={624} y={590} className="plate-note">
                which-slit
              </text>
              <text x={624} y={603} className="plate-note">
                record kept
              </text>
            </g>
            <g id="bracket-erased">
              <path
                d="M962,370 L970,370 L970,550 L962,550"
                fill="none"
                stroke={INK}
                strokeWidth={W_FINE}
              />
              <text x={978} y={447} className="plate-note">
                which-slit
              </text>
              <text x={978} y={460} className="plate-note">
                record erased
              </text>
              <text x={978} y={473} className="plate-note">
                (D₁, D₂)
              </text>
            </g>

            {/* Labels */}
            <g id="labels">
              <Leader from={[100, 282]} to={[80, 222]} label="LASER" sub="351.1 nm, argon ion" />
              <Leader from={[211, 236]} to={[180, 180]} label="DOUBLE SLIT" anchor="middle" />
              <Leader
                from={[291, 335]}
                to={[250, 392]}
                label="BBO CRYSTAL"
                sub="splits each photon in two"
                anchor="end"
              />
              <Leader from={[414, 152]} to={[392, 136]} label="LENS" anchor="end" />
              <Leader from={[418, 470]} to={[440, 560]} label="PRISM" sub="separates A and B" />
              <Leader from={[611, 389]} to={[660, 350]} label="BS₁" />
              <Leader from={[611, 531]} to={[660, 570]} label="BS₂" />
              <Leader from={[807, 397]} to={[800, 352]} label="M₁" anchor="middle" />
              <Leader from={[807, 523]} to={[800, 574]} label="M₂" anchor="middle" />
              <Leader from={[850, 460]} to={[826, 460]} label="BS₃" anchor="end" />
              <text x={340} y={196} className="plate-sym-sm" transform="rotate(-41.7 340 196)">
                signal
              </text>
              <text x={330} y={364} className="plate-sym-sm" transform="rotate(54.6 330 364)">
                idler
              </text>
            </g>

            {/* Dimensions */}
            <Dimension x1={272} x2={499} y={112} ext1={262} ext2={156} label="signal path, short" />
            <Dimension
              x1={272}
              x2={918}
              y={690}
              ext1={338}
              ext2={532}
              label="idler path, about 2.5 m longer: D₀ fires ~8 ns before any D₁ to D₄"
            />

            {/* Plots */}
            <g id="plots">
              <line x1={56} y1={730} x2={1144} y2={730} stroke={INK} strokeWidth={W_HAIR} />
              <text x={56} y={752} className="plate-fig">
                COUNTS AT D₀ VS. DETECTOR POSITION x₀
              </text>
              <Plot
                x={76}
                y={806}
                fig="(a)"
                title="D₀, every hit"
                note="no fringes; the total never changes"
                curve="total"
                ghost={["d1", "d2"]}
              />
              <Plot x={346} y={806} fig="(b)" title="D₀ sorted by D₁" note="fringes" curve="d1" />
              <Plot
                x={616}
                y={806}
                fig="(c)"
                title="D₀ sorted by D₂"
                note="anti-fringes; (b) + (c) = (a)"
                curve="d2"
              />
              <Plot
                x={886}
                y={806}
                fig="(d)"
                title="D₀ sorted by D₃"
                note="no fringes; D₄ the same"
                curve="d3"
              />
            </g>

            {/* Animation-only layer: hidden in the static plate */}
            <g id="fx">
              <text
                id="stage-caption"
                x={1120}
                y={62}
                className="plate-label"
                textAnchor="end"
                opacity={0}
              />
              <text
                id="note-t0"
                x={510}
                y={204}
                className="plate-note"
                textAnchor="middle"
                opacity={0}
              >
                fires first, t = 0
              </text>
              <text
                id="note-t8"
                x={925}
                y={458}
                className="plate-note"
                textAnchor="middle"
                opacity={0}
              >
                t ≈ 8 ns
              </text>
              {DETECTOR_TIPS.map(([id, x, y]) => (
                <circle
                  key={id}
                  id={`flash-${id}`}
                  cx={x}
                  cy={y}
                  r={2}
                  fill="none"
                  stroke={INK}
                  strokeWidth={W_FINE}
                  opacity={0}
                />
              ))}
              <rect
                id="highlight-a"
                x={62}
                y={768}
                width={252}
                height={184}
                rx={10}
                fill="none"
                stroke={INK}
                strokeWidth={W_FINE}
                opacity={0}
              />
              <g id="photons">
                {Array.from({ length: PHOTON_POOL }, (_, i) => (
                  <g key={i}>
                    <circle className="ph-pump" r={2.4} fill={INK} opacity={0} />
                    <circle className="ph-signal" r={3.4} fill={INK} opacity={0} />
                    <circle
                      className="ph-idler"
                      r={3.4}
                      fill={PAPER}
                      stroke={INK}
                      strokeWidth={W_FINE}
                      opacity={0}
                    />
                  </g>
                ))}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </PrefixContext.Provider>
  );

  if (!animated) return plate;

  return (
    <figure className="plate-figure">
      <div className="plate-stage">
        {plate}
        {camera && <div ref={hudRef} className="plate-hud" aria-hidden="true" />}
      </div>
      <noscript>
        <style>{".plate[data-pending] .plate-body{visibility:visible!important}"}</style>
      </noscript>
      <div className="plate-controls">
        <button
          type="button"
          onClick={() => {
            const next = !playing;
            setPlaying(next);
            controls.current?.setPaused(!next);
          }}
          aria-pressed={!playing}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            controls.current?.replay();
          }}
        >
          Replay from the start
        </button>
      </div>
    </figure>
  );
}
