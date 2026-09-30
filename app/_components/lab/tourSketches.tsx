// Rough engraved placeholders for the tour animatic. Each primitive draws around (0, 0)
// in roughly ±100 by ±60 local units; the renderer places and scales it.
// Strokes use non-scaling widths so every sketch keeps the plate's three weights.

import type React from "react";
import type { SketchItem } from "./tourStoryboard";

const r2 = (n: number) => Math.round(n * 100) / 100;
const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [r2(cx + r * Math.cos(a)), r2(cy - r * Math.sin(a))] as const;
};
const poly = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y]) => `${x},${y}`).join(" ");
// Samples y = f(t) for t in [0, 1] across a box.
const curve = (f: (t: number) => number, x0: number, w: number, y0: number, h: number, n = 40) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return `${i ? "L" : "M"}${r2(x0 + t * w)} ${r2(y0 - f(t) * h)}`;
  }).join(" ");

type Opts = Record<string, string | number | boolean>;
type Prim = (o: Opts, s: number) => React.ReactNode;

// Text inside a scaled primitive keeps a fixed on-screen size.
const Cap = ({
  x,
  y,
  s,
  t,
  a = "middle",
}: {
  x: number;
  y: number;
  s: number;
  t: string;
  a?: "start" | "middle" | "end";
}) => (
  <text x={x} y={y} className="an-cap" fontSize={11 / s} textAnchor={a}>
    {t}
  </text>
);
const Sym = ({
  x,
  y,
  s,
  t,
  a = "middle",
  size = 16,
}: {
  x: number;
  y: number;
  s: number;
  t: string;
  a?: "start" | "middle" | "end";
  size?: number;
}) => (
  <text x={x} y={y} className="an-sym" fontSize={size / s} textAnchor={a}>
    {t}
  </text>
);

function Iris({
  state = "open",
  x = 0,
  y = 0,
  k = 1,
}: {
  state?: string;
  x?: number;
  y?: number;
  k?: number;
}) {
  const R = 30 * k;
  if (state === "ghost") {
    return (
      <g className="an-soft">
        <circle cx={x} cy={y} r={R} className="k" strokeDasharray="3 3" />
        <polygon
          points={poly([0, 1, 2, 3, 4, 5].map((i) => pt(x, y, 12 * k, i * 60 + 15)))}
          className="m"
          strokeDasharray="2 3"
        />
      </g>
    );
  }
  const r = ({ narrow: 6, open: 12, wide: 20 } as Record<string, number>)[state] ?? 12;
  const hex = [0, 1, 2, 3, 4, 5].map((i) => pt(x, y, r * k, i * 60 + 15));
  return (
    <g>
      <circle cx={x} cy={y} r={R} className="k" />
      <circle cx={x} cy={y} r={R + 4 * k} className="l" />
      <polygon points={poly(hex)} className="k" />
      {hex.map(([hx, hy], i) => {
        const [ox, oy] = pt(x, y, R, i * 60 + 15 + 75);
        return <line key={i} x1={hx} y1={hy} x2={ox} y2={oy} className="m" />;
      })}
    </g>
  );
}

function Hatch({
  x,
  y,
  w,
  h,
  gap = 5,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  gap?: number;
}) {
  // Narrow rectangles only: each stroke runs corner to corner of a w-by-w square.
  const lines = [];
  for (let k = w; k <= h; k += gap) {
    lines.push(<line key={k} x1={x} y1={r2(y + k)} x2={x + w} y2={r2(y + k - w)} className="l" />);
  }
  return <g>{lines}</g>;
}

const DOMES = [-56, -28, 0, 28, 56];

const PRIMS: Record<string, Prim> = {
  table: (o, s) => (
    <g>
      <rect x={-72} y={0} width={144} height={6} className="k" />
      <line x1={-66} y1={6} x2={-66} y2={42} className="k" />
      <line x1={66} y1={6} x2={66} y2={42} className="k" />
      {DOMES.map((x) => (
        <g key={x}>
          <path d={`M${x - 11} 0 A 11 11 0 0 1 ${x + 11} 0`} className="k" />
          <circle cx={x} cy={-13} r={1.8} className="m" />
          <rect x={x - 5} y={-26} width={10} height={6} className="l" />
        </g>
      ))}
      {o.diner && (
        <g>
          <path d="M108 42 L108 14 L128 14 M108 26 L126 26 L126 42" className="m" />
          <Iris x={116} y={-14} k={0.45} />
          {DOMES.map((x) => (
            <line key={x} x1={x} y1={-11} x2={103} y2={-14} className="l" strokeDasharray="2 2" />
          ))}
        </g>
      )}
      {!o.diner && <Cap x={0} y={-36} s={s} t="RECIPES: THE LAWS" />}
    </g>
  ),
  hall: (o) => (
    <g className={o.soft ? "an-soft" : undefined}>
      <polygon points="-58,-20 0,-55 58,-20" className="k" />
      <rect x={-50} y={-20} width={100} height={60} className="k" />
      <line x1={-32} y1={22} x2={32} y2={22} className="m" />
      {[-20, 0, 20].map((x) => (
        <path key={x} d={`M${x - 6} 22 A 6 6 0 0 1 ${x + 6} 22`} className="m" />
      ))}
      {[-26, 26].map((x) => (
        <line key={x} x1={x} y1={22} x2={x} y2={40} className="l" />
      ))}
      {o.diner && <Iris x={0} y={0} k={0.32} />}
    </g>
  ),
  building: (_o, s) => (
    <g>
      <polygon points="-80,-24 0,-62 80,-24" className="k" />
      <rect x={-76} y={-24} width={152} height={70} className="k" />
      {[-56, -28, 0, 28, 56].map((x) => (
        <line key={x} x1={x} y1={-18} x2={x} y2={46} className="m" />
      ))}
      <line x1={-90} y1={46} x2={90} y2={46} className="k" />
      <Cap x={0} y={-34} s={s} t="EVERY HALL" />
    </g>
  ),
  formula: (o, s) => (
    <g>
      <rect x={-120} y={-38} width={240} height={76} className="k" />
      <rect x={-114} y={-32} width={228} height={64} className="l" />
      <Sym x={0} y={10} s={s} t={String(o.text)} size={44} />
      <Cap x={0} y={62} s={s} t="POSSIBILITY, THEN REGISTRATION" />
    </g>
  ),
  tag: (o) => {
    const t = String(o.text);
    const w = t.length * 9 + 24;
    return (
      <g>
        {!o.bare && <rect x={-w / 2} y={-16} width={w} height={28} className="m" />}
        <text x={0} y={3} className="an-cap" fontSize={13} textAnchor="middle">
          {t}
        </text>
      </g>
    );
  },
  gauge: (o, s) => {
    const cx = 0;
    const cy = 20;
    const R = 50;
    const v = Number(o.v ?? 0.5);
    const ang = (t: number) => 180 - t * 180;
    const [ax, ay] = pt(cx, cy, R, 180);
    const [bx, by] = pt(cx, cy, R, 0);
    const band = [];
    for (let t = 0.54; t <= 0.661; t += 0.015) {
      const [x1, y1] = pt(cx, cy, R - 12, ang(t));
      const [x2, y2] = pt(cx, cy, R, ang(t));
      band.push(<line key={t} x1={x1} y1={y1} x2={x2} y2={y2} className="l" />);
    }
    const ticks = Array.from({ length: 11 }, (_, i) => {
      const [x1, y1] = pt(cx, cy, R, ang(i / 10));
      const [x2, y2] = pt(cx, cy, R + 6, ang(i / 10));
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="l" />;
    });
    const [nx, ny] = pt(cx, cy, R - 6, ang(v));
    const [lx, ly] = pt(cx, cy, R + 16, ang(0.6));
    return (
      <g>
        <path d={`M${ax} ${ay} A ${R} ${R} 0 0 1 ${bx} ${by}`} className="k" />
        <line x1={ax - 8} y1={cy} x2={bx + 8} y2={cy} className="m" />
        {ticks}
        {band}
        <line x1={cx} y1={cy} x2={nx} y2={ny} className="k" />
        <circle cx={cx} cy={cy} r={3} className="m" />
        <text x={lx} y={ly} className="an-sym" fontSize={13 / s} textAnchor="middle">
          Φ
          <tspan fontSize={9 / s} dy={3 / s}>
            c
          </tspan>
        </text>
        <Sym x={0} y={cy + 20} s={s} t="Φ" size={15} />
      </g>
    );
  },
  iris: (o) => <Iris state={String(o.state ?? "open")} />,
  objects: (_o, s) => (
    <g>
      <polygon points="-92,20 -84,2 -70,-4 -56,4 -50,20" className="k" />
      <line x1={-88} y1={12} x2={-60} y2={8} className="l" />
      {[0, 10, 20].map((dy) => (
        <path key={dy} d={`M-30 ${dy} q 10 -8 20 0 t 20 0 t 20 0`} className="m" />
      ))}
      <rect x={42} y={-8} width={36} height={30} className="k" />
      <circle cx={60} cy={7} r={9} className="m" />
      <line x1={60} y1={7} x2={65} y2={2} className="l" />
      <Cap x={-71} y={40} s={s} t="ROCK" />
      <Cap x={0} y={40} s={s} t="RIVER" />
      <Cap x={60} y={40} s={s} t="THERMOSTAT" />
    </g>
  ),
  network: (o, s) => {
    const nodes = [0, 1, 2, 3, 4, 5, 6].map((i) => pt(0, 0, 44, i * (360 / 7) + 90));
    const links: [number, number][] = o.joined
      ? [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 5],
          [5, 6],
          [6, 0],
          [0, 3],
          [1, 5],
          [2, 6],
          [4, 0],
        ]
      : [
          [0, 1],
          [2, 3],
          [4, 5],
        ];
    return (
      <g>
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            className="m"
          />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={5} className="k" />
        ))}
        {o.locked &&
          nodes.map(([x, y], i) => <circle key={`r${i}`} cx={x} cy={y} r={9} className="l" />)}
        {o.reqs && (
          <g>
            <rect x={-9} y={-7} width={18} height={14} className="m" />
            <polygon points="104,20 116,0 128,20" className="k" />
            <line x1={9} y1={0} x2={102} y2={12} className="l" strokeDasharray="2 2" />
            <Cap x={-90} y={-50} s={s} t="INTEGRATION" a="end" />
            <Cap x={90} y={-50} s={s} t="DIFFERENTIATION" a="start" />
            <Cap x={-90} y={60} s={s} t="TEMPORAL COHESION" a="end" />
            <Cap x={116} y={38} s={s} t="ABOUTNESS" />
            <line x1={-88} y1={-48} x2={-40} y2={-22} className="l" />
            <line x1={88} y1={-48} x2={40} y2={-22} className="l" />
            <line x1={-88} y1={56} x2={-40} y2={28} className="l" />
          </g>
        )}
      </g>
    );
  },
  magnet: (_o, s) => {
    const arrow = (x: number, y: number, deg: number, key: string) => {
      const [x1, y1] = pt(x, y, 7, deg + 180);
      const [x2, y2] = pt(x, y, 7, deg);
      const [h1x, h1y] = pt(x2, y2, 4, deg + 150);
      const [h2x, h2y] = pt(x2, y2, 4, deg - 150);
      return (
        <path
          key={key}
          d={`M${x1} ${y1} L${x2} ${y2} M${h1x} ${h1y} L${x2} ${y2} L${h2x} ${h2y}`}
          className="l"
        />
      );
    };
    const random = [30, 200, 110, 290, 160, 340, 70, 250];
    return (
      <g>
        <rect x={-92} y={-22} width={76} height={44} className="k" />
        <rect x={16} y={-22} width={76} height={44} className="k" />
        {random.map((d, i) => arrow(-80 + (i % 4) * 17, i < 4 ? -9 : 9, d, `a${i}`))}
        {random.map((_, i) => arrow(28 + (i % 4) * 17, i < 4 ? -9 : 9, 0, `b${i}`))}
        <Cap x={-54} y={40} s={s} t="ABOVE THE CURIE POINT" />
        <Cap x={54} y={40} s={s} t="BELOW" />
      </g>
    );
  },
  plot: (o) => {
    const k = String(o.kind);
    const box = (
      <g>
        <line x1={-60} y1={-40} x2={-60} y2={34} className="m" />
        <line x1={-60} y1={34} x2={64} y2={34} className="m" />
      </g>
    );
    const sig = (t: number, c: number) => 1 / (1 + Math.exp(-c * (t - 0.5)));
    if (k === "curie")
      return (
        <g>
          {box}
          <path d={curve((t) => sig(t, 30), -60, 124, 34, 66)} className="k" />
          <path d={curve((t) => sig(t, 7), -60, 124, 34, 66)} className="m" strokeDasharray="3 2" />
        </g>
      );
    if (k === "uv")
      return (
        <g>
          {box}
          <path
            d={curve((t) => Math.min(t * t * 3.2, 1.12), -60, 124, 34, 66)}
            className="m"
            strokeDasharray="3 2"
          />
          <path
            d={curve((t) => 2.6 * t * t * Math.exp(-5 * t) * 12 * 0.35, -60, 124, 34, 66)}
            className="k"
          />
        </g>
      );
    if (k === "lightcurve")
      return (
        <g>
          {box}
          <path
            d={curve((t) => 0.2 + 0.6 * Math.exp(-((t - 0.5) ** 2) / 0.004), -60, 124, 34, 66, 80)}
            className="k"
          />
        </g>
      );
    const peak = k === "ir" ? 0.72 : 0.3;
    const amp = k === "ir" ? 0.85 : 0.25;
    return (
      <g>
        {box}
        <path
          d={curve((t) => 0.05 + amp * Math.exp(-((t - peak) ** 2) / 0.02), -60, 124, 34, 66)}
          className="k"
        />
      </g>
    );
  },
  curve: (_o, s) => (
    <g>
      <path d="M-90 40 Q 0 -70 90 40" className="k" />
      <Cap x={0} y={-40} s={s} t="OUTSIDE: PHYSICAL ACTIVITY" />
      <Cap x={0} y={20} s={s} t="INSIDE: EXPERIENCE" />
      <Sym x={-78} y={-6} s={s} t="convex" size={12} />
      <Sym x={0} y={36} s={s} t="concave" size={12} />
    </g>
  ),
  frames: (_o, s) => {
    const tilt = 22;
    const [tx, ty] = pt(0, 0, 60, 90 - tilt);
    const [xx, xy] = pt(0, 0, 60, tilt);
    return (
      <g>
        <line x1={0} y1={55} x2={0} y2={-60} className="k" />
        <line x1={-80} y1={0} x2={80} y2={0} className="k" />
        <line x1={-r2(tx)} y1={-r2(ty)} x2={tx} y2={ty} className="m" />
        <line x1={-r2(xx)} y1={-r2(xy)} x2={xx} y2={xy} className="m" />
        <line x1={-55} y1={55} x2={62} y2={-62} className="k" strokeDasharray="5 3" />
        <Sym x={-8} y={-62} s={s} t="t" />
        <Sym x={86} y={4} s={s} t="x" />
        <Sym x={tx + 8} y={ty - 4} s={s} t="t′" />
        <Sym x={xx + 8} y={xy + 2} s={s} t="x′" />
        <Cap x={74} y={-58} s={s} t="LIGHT" a="start" />
      </g>
    );
  },
  block: (o, s) => {
    const dx = 26;
    const dy = -18;
    const boxCls = o.soft || o.softOutside ? "an-soft" : undefined;
    const hatch = [];
    if (o.witness) {
      for (const y of [-10, -6, -2, 3, 9, 17, 28]) {
        const w = ((y + 15) / 60) * 45;
        hatch.push(<line key={y} x1={-r2(w)} y1={y} x2={r2(w)} y2={y} className="l" />);
      }
    }
    return (
      <g>
        <g className={boxCls}>
          <rect x={-50} y={-50} width={100} height={100} className="k" />
          <polyline
            points={`-50,-50 ${-50 + dx},${-50 + dy} ${50 + dx},${-50 + dy} ${50 + dx},${50 + dy} 50,50`}
            className="m"
          />
          <line x1={50} y1={-50} x2={50 + dx} y2={-50 + dy} className="m" />
          {o.slices && (
            <g>
              <line x1={-50} y1={-4} x2={50} y2={-4} className="m" />
              <line x1={-50} y1={14} x2={50} y2={-22} className="m" strokeDasharray="3 2" />
              <Sym x={56} y={0} s={s} t="now" a="start" size={12} />
              <Sym x={56} y={-22} s={s} t="now′" a="start" size={12} />
            </g>
          )}
        </g>
        {o.cone && (
          <g>
            <line x1={0} y1={-50} x2={0} y2={50} className="m" />
            <line x1={0} y1={-15} x2={-45} y2={45} className="k" />
            <line x1={0} y1={-15} x2={45} y2={45} className="k" />
            <ellipse cx={0} cy={45} rx={45} ry={6} className="m" />
            {o.arrows &&
              [-1, 1].map((d) => (
                <path key={d} d={`M${d * 26} ${9} L${d * 22} ${1} L${d * 16} ${7}`} className="m" />
              ))}
            {o.arrows && <Cap x={-72} y={30} s={s} t="STARLIGHT" a="end" />}
            {o.arrows && <line x1={-70} y1={27} x2={-30} y2={22} className="l" />}
            {o.lived && (
              <g>
                <line x1={0} y1={-46} x2={0} y2={-15} className="k" />
                {[-42, -30, -18].map((y) => (
                  <circle key={y} cx={0} cy={y} r={3} className="m" />
                ))}
              </g>
            )}
            {hatch}
          </g>
        )}
      </g>
    );
  },
  eraser: (_o, s) => (
    <g>
      <rect x={-80} y={-36} width={160} height={72} className="k" />
      {[-60, -30, 0, 30, 55].map((x, i) => (
        <rect key={x} x={x} y={i % 2 ? -20 : 4} width={10} height={10} className="m" />
      ))}
      <polyline points="-70,0 -55,9 -25,-15 5,9 35,-15 60,9" className="l" strokeDasharray="2 2" />
      <rect x={-34} y={48} width={68} height={20} className="m" />
      <Cap x={0} y={62} s={s} t="OPEN PLATE" />
    </g>
  ),
  oven: () => (
    <g>
      <rect x={-40} y={-30} width={80} height={64} className="k" />
      <rect x={-28} y={-18} width={56} height={34} className="m" />
      {[-16, 0, 16].map((x) => (
        <path key={x} d={`M${x} -38 q 5 -8 0 -16 q -5 -8 0 -16`} className="l" />
      ))}
    </g>
  ),
  rails: () => {
    const sleepers = [48, 30, 16, 5, -4, -12, -18].map((y) => {
      const f = (y + 40) / 90;
      return <line key={y} x1={r2(-64 * f)} y1={y} x2={r2(64 * f)} y2={y} className="m" />;
    });
    return (
      <g>
        <line x1={-100} y1={-40} x2={100} y2={-40} className="l" />
        <line x1={-56} y1={50} x2={0} y2={-40} className="k" />
        <line x1={56} y1={50} x2={0} y2={-40} className="k" />
        {sleepers}
        <circle cx={0} cy={-40} r={2.5} className="k" />
      </g>
    );
  },
  sphere: (o, s) => (
    <g>
      {o.plane && <polygon points="-100,8 50,8 100,-12 -50,-12" className="m an-soft" />}
      <circle cx={0} cy={0} r={45} className="k" />
      <ellipse cx={0} cy={0} rx={45} ry={11} className="m" />
      <ellipse cx={0} cy={0} rx={16} ry={45} className="l" />
      {o.grid && (
        <g>
          <ellipse cx={0} cy={-24} rx={38} ry={8} className="l" />
          <ellipse cx={0} cy={24} rx={38} ry={8} className="l" />
          <circle cx={0} cy={-45} r={2.5} className="k" />
          <Sym x={10} y={-50} s={s} t="∞" a="start" />
        </g>
      )}
    </g>
  ),
  flatland: (_o, s) => (
    <g>
      <polygon points="-120,24 70,24 120,-12 -70,-12" className="m" />
      {[
        [-72, 1],
        [-36, 10],
        [0, 20],
        [36, 10],
        [72, 1],
      ].map(([x, r]) => (
        <ellipse key={x} cx={x} cy={6} rx={r} ry={r2(r * 0.3)} className="k" />
      ))}
      <line x1={-80} y1={44} x2={80} y2={44} className="l" />
      <path d="M74 40 L80 44 L74 48" className="l" />
      <Cap x={0} y={60} s={s} t="WHAT FLAT BEINGS SEE, OVER TIME" />
    </g>
  ),
  tube: () => (
    <g>
      <rect x={-110} y={-62} width={220} height={124} className="l an-soft" strokeDasharray="4 4" />
      <path d="M-30 46 C -50 20, -10 0, -30 -30 C -40 -46, -20 -50, -24 -50" className="k" />
      <path d="M30 46 C 10 20, 50 0, 30 -30 C 20 -46, 34 -50, 28 -50" className="k" />
      <ellipse cx={0} cy={46} rx={30} ry={6} className="m" />
      <ellipse cx={2} cy={-50} rx={26} ry={5} className="m" />
    </g>
  ),
  ribbons: (_o, s) => {
    const figs = [];
    for (let i = 0; i < 18; i++) {
      const t = 0.3 + (i / 18) * 0.65;
      figs.push(
        <circle key={`u${i}`} cx={r2(-90 + t * 180)} cy={r2(-t * 38)} r={1.2} className="l" />
      );
      if (i % 2 === 0)
        figs.push(
          <circle key={`d${i}`} cx={r2(-90 + t * 180)} cy={r2(t * 32)} r={1.2} className="l" />
        );
    }
    return (
      <g>
        <path d="M-90 0 C -30 0, 20 -28, 90 -48" className="k" />
        <path d="M-90 0 C -30 4, 20 -8, 90 -27" className="k" />
        <path d="M-90 0 C -30 4, 20 22, 90 28" className="k" />
        <path d="M-90 0 C -30 6, 20 30, 90 37" className="k" />
        <g className="an-soft">{figs}</g>
        <Sym x={100} y={-34} s={s} t="0.7" a="start" />
        <Sym x={100} y={36} s={s} t="0.3" a="start" />
        <Cap x={0} y={62} s={s} t="WIDTH IS WEIGHT; THE FIGURES CANNOT BE COUNTED" />
      </g>
    );
  },
  whole: (o) => {
    const DEPTH = 4;
    const IRIS_TIPS = [2, 9, 13];
    const lit = new Set<string>();
    if (o.mostlySoft)
      for (const tip of IRIS_TIPS)
        for (let d = 0; d <= DEPTH; d++) lit.add(`${d}:${tip >> (DEPTH - d)}`);
    const pos = (d: number, i: number) => {
      const n = 2 ** d;
      return [r2(-95 + ((i + 0.5) / n) * 190), 55 - d * 26] as const;
    };
    const lines = [];
    for (let d = 0; d < DEPTH; d++)
      for (let i = 0; i < 2 ** d; i++)
        for (const c of [2 * i, 2 * i + 1]) {
          const [x1, y1] = pos(d, i);
          const [x2, y2] = pos(d + 1, c);
          const on = !o.mostlySoft || lit.has(`${d + 1}:${c}`);
          lines.push(
            <line
              key={`${d}-${i}-${c}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={on ? "m" : "m an-soft"}
            />
          );
        }
    return (
      <g>
        {lines}
        {o.irises &&
          IRIS_TIPS.map((tip) => {
            const [x, y] = pos(DEPTH, tip);
            return <Iris key={tip} x={x} y={y - 12} k={0.3} />;
          })}
        {o.walls &&
          [5.5, 11].map((w) => {
            const [x] = pos(DEPTH, w);
            return (
              <g key={w}>
                <rect x={x - 3} y={-68} width={6} height={30} className="m" />
                <Hatch x={x - 3} y={-68} w={6} h={30} gap={4} />
              </g>
            );
          })}
      </g>
    );
  },
  wall: () => (
    <g>
      <rect x={-7} y={-42} width={14} height={84} className="k" />
      <Hatch x={-7} y={-42} w={14} h={84} gap={5} />
    </g>
  ),
  copier: (_o, s) => {
    const fig = (x: number, y: number) => (
      <g>
        <Iris x={x} y={y - 16} k={0.35} />
        <path d={`M${x - 14} ${y + 16} Q ${x} ${y - 6} ${x + 14} ${y + 16}`} className="m" />
      </g>
    );
    return (
      <g>
        {fig(-90, 0)}
        <rect x={-30} y={-18} width={60} height={36} className="k" />
        <line x1={-60} y1={0} x2={-34} y2={0} className="l" />
        <path d="M34 -4 L56 -24 M34 4 L56 24" className="l" />
        {fig(84, -30)}
        {fig(84, 32)}
        <Cap x={0} y={34} s={s} t="COPIER" />
        <Cap x={130} y={4} s={s} t="BOTH ARE THEM" a="start" />
      </g>
    );
  },
  galaxy: (o, s) => (
    <g>
      {o.halo && <ellipse cx={0} cy={0} rx={98} ry={56} className="m" strokeDasharray="4 4" />}
      <ellipse cx={0} cy={0} rx={72} ry={22} className="m" />
      <ellipse cx={0} cy={0} rx={46} ry={14} className="l" />
      <ellipse cx={0} cy={0} rx={20} ry={6} className="m" />
      <path d="M-60 -8 C -30 -26, 30 -18, 50 6" className="l" />
      <path d="M60 8 C 30 26, -30 18, -50 -6" className="l" />
      <circle cx={0} cy={0} r={2} className="k" />
      {o.shell && (
        <g>
          <circle cx={36} cy={-4} r={2} className="k" />
          <circle cx={36} cy={-4} r={14} className="m" />
          <circle cx={36} cy={-4} r={26} className="l" strokeDasharray="2 3" />
        </g>
      )}
      {o.struck && <line x1={-104} y1={52} x2={104} y2={-52} className="k" />}
      {o.struck && <Cap x={0} y={78} s={s} t="RULED OUT" />}
    </g>
  ),
  dish: (o) => (
    <g>
      <path d="M-40 -30 Q 0 20 40 -30" className="k" />
      <line x1={-40} y1={-30} x2={40} y2={-30} className="l" />
      <line x1={0} y1={-5} x2={0} y2={-44} className="m" />
      <line x1={0} y1={-5} x2={0} y2={30} className="k" />
      <line x1={-22} y1={30} x2={22} y2={30} className="k" />
      {o.static &&
        [-70, -56].map((y) => (
          <polyline
            key={y}
            points={`-50,${y} -38,${y - 6} -26,${y + 4} -14,${y - 5} -2,${y + 3} 10,${y - 6} 22,${y + 4} 34,${y - 3} 50,${y}`}
            className="l"
          />
        ))}
    </g>
  ),
  node: (o, s) => {
    const dots = [];
    if (o.warm) {
      for (let i = 0; i < 70; i++) {
        const a = i * 137.5;
        const r = 26 + ((i * 7) % 17);
        const [x, y] = pt(0, 0, r, a);
        dots.push(<circle key={i} cx={x} cy={y} r={0.7} className="an-dot" />);
      }
    }
    return (
      <g>
        {dots}
        <circle cx={0} cy={0} r={18} className="k" />
        <circle cx={0} cy={0} r={12} className="l" />
        <circle cx={0} cy={0} r={6} className="l" />
        {o.warm && <Cap x={0} y={-50} s={s} t="FAINT INFRARED" />}
      </g>
    );
  },
  layers: () => (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon
          key={i}
          points={`-60,${30 - i * 12} 20,${30 - i * 12} 60,${10 - i * 12} -20,${10 - i * 12}`}
          className={i === 4 ? "k" : "m"}
        />
      ))}
    </g>
  ),
  colony: (_o, s) => (
    <g>
      <circle cx={-90} cy={0} r={12} className="k" />
      <circle cx={90} cy={0} r={9} className="k" />
      <line x1={-76} y1={0} x2={-8} y2={0} className="m" strokeDasharray="4 3" />
      <line x1={8} y1={0} x2={80} y2={0} className="m" strokeDasharray="4 3" />
      <path d="M-8 8 L-2 -8 M2 8 L8 -8" className="k" />
      <circle cx={-40} cy={0} r={2.5} className="k" />
      <Cap x={-90} y={30} s={s} t="HOME" />
      <Cap x={90} y={30} s={s} t="ITS OWN CIVILIZATION" />
    </g>
  ),
  tree: (o) => {
    const lines: React.ReactNode[] = [];
    const dots: React.ReactNode[] = [];
    const walk = (x: number, y: number, d: number, spread: number, key: string) => {
      dots.push(<circle key={key} cx={r2(x)} cy={y} r={2.5} className="k" />);
      const kids = o.explode ? (d < 4 ? 2 : 0) : d === 0 ? 2 : d === 1 && key.endsWith("0") ? 1 : 0;
      for (let c = 0; c < kids; c++) {
        const nx = kids === 1 ? x + 6 : x + (c ? spread : -spread);
        lines.push(
          <line key={`${key}${c}`} x1={r2(x)} y1={y} x2={r2(nx)} y2={y - 24} className="m" />
        );
        walk(nx, y - 24, d + 1, spread / 2, `${key}${c}`);
      }
    };
    walk(0, 50, 0, 48, "n");
    return (
      <g>
        {lines}
        {dots}
      </g>
    );
  },
  probe: () => (
    <g>
      <circle cx={-50} cy={0} r={14} className="k" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
        const [x1, y1] = pt(-50, 0, 18, d);
        const [x2, y2] = pt(-50, 0, 24, d);
        return <line key={d} x1={x1} y1={y1} x2={x2} y2={y2} className="l" />;
      })}
      <ellipse cx={-50} cy={0} rx={100} ry={30} className="l" strokeDasharray="2 3" />
      <rect x={38} y={-34} width={12} height={10} className="k" />
      <circle cx={44} cy={-29} r={2.5} className="m" />
      <rect x={24} y={-31} width={12} height={4} className="l" />
      <rect x={52} y={-31} width={12} height={4} className="l" />
    </g>
  ),
  timeline: (_o, s) => (
    <g>
      <line x1={-100} y1={0} x2={100} y2={0} className="k" />
      {[
        [-100, "BIG BANG"],
        [-72, "CMB · 380,000 YR"],
        [10, "FIRST STARS"],
        [74, "PLANETS, LIFE"],
      ].map(([x, t], i) => (
        <g key={String(t)}>
          <line x1={Number(x)} y1={-6} x2={Number(x)} y2={6} className="m" />
          <Cap x={Number(x)} y={i % 2 ? -14 : 22} s={s} t={String(t)} />
        </g>
      ))}
      <line x1={-72} y1={-22} x2={-72} y2={-40} className="l" />
      <Cap x={-72} y={-46} s={s} t="DARK MATTER ALREADY HERE" />
    </g>
  ),
  scale: (_o, s) => (
    <g>
      <line x1={0} y1={-40} x2={0} y2={46} className="k" />
      <line x1={-30} y1={46} x2={30} y2={46} className="k" />
      <line x1={-80} y1={-36} x2={80} y2={-44} className="k" />
      <circle cx={0} cy={-40} r={3} className="m" />
      <path d="M-80 -36 L-96 0 M-80 -36 L-64 0 M-100 0 L-60 0" className="m" />
      <path d="M80 -44 L64 -8 M80 -44 L96 -8 M60 -8 L100 -8" className="m" />
      <Cap x={-80} y={18} s={s} t="WHAT THE EARLY UNIVERSE RECORDS" />
      <Cap x={80} y={10} s={s} t="WHAT SURVEYS HAVE FOUND" />
      <Cap x={80} y={26} s={s} t="A SMALL GAP" />
    </g>
  ),
  stars: () => {
    const field = [
      [-60, -30],
      [-20, -44],
      [30, -34],
      [60, -10],
      [-50, 20],
      [0, 30],
      [50, 36],
      [-80, 0],
      [20, -4],
    ];
    return (
      <g>
        {field.map(([x, y]) => (
          <path
            key={`${x}${y}`}
            d={`M${x - 3} ${y} L${x + 3} ${y} M${x} ${y - 3} L${x} ${y + 3}`}
            className="m"
          />
        ))}
        <circle cx={20} cy={-4} r={8} className="l" />
        <circle cx={20} cy={-4} r={13} className="l" strokeDasharray="2 2" />
        <circle cx={-10} cy={10} r={4} className="k" />
        <line x1={-40} y1={30} x2={-14} y2={13} className="l" strokeDasharray="3 2" />
        <path d="M-20 13 L-14 13 L-15 19" className="l" />
      </g>
    );
  },
  radiator: (_o, s) => (
    <g>
      <rect x={-110} y={-10} width={20} height={20} className="k" />
      <line x1={-90} y1={0} x2={-10} y2={0} className="m" />
      <rect x={-10} y={-50} width={120} height={100} className="k" />
      {[10, 30, 50, 70, 90].map((x) => (
        <line key={x} x1={x} y1={-50} x2={x} y2={50} className="l" />
      ))}
      {[-25, 0, 25].map((y) => (
        <line key={y} x1={-10} y1={y} x2={110} y2={y} className="l" />
      ))}
      <Cap x={-100} y={-18} s={s} t="COMPUTER" />
      <line x1={-10} y1={64} x2={110} y2={64} className="l" />
      <path d="M-10 60 L-10 68 M110 60 L110 68" className="l" />
      <Cap x={50} y={80} s={s} t="COLD RADIATOR: ABOUT 100,000,000× THE AREA" />
    </g>
  ),
  entangled: (_o, s) => (
    <g>
      <rect x={-100} y={-18} width={200} height={36} rx={18} className="k" />
      <circle cx={-78} cy={0} r={4} className="k" />
      <circle cx={78} cy={0} r={4} className="k" />
      <Cap x={0} y={4} s={s} t="NOTHING TRAVELS BETWEEN" />
    </g>
  ),
  ray: (_o, s) => (
    <g>
      <path d="M-104 0 L-88 0 M-96 -8 L-96 8 M-102 -6 L-90 6 M-102 6 L-90 -6" className="m" />
      <path d="M84 0 Q 96 -9 108 0 Q 96 9 84 0" className="k" />
      <circle cx={96} cy={0} r={3} className="m" />
      <line x1={-84} y1={0} x2={80} y2={0} className="m" />
      <line x1={-84} y1={20} x2={80} y2={20} className="l" />
      <path d="M-84 16 L-84 24 M80 16 L80 24" className="l" />
      <Cap x={0} y={36} s={s} t="INTERVAL = 0" />
    </g>
  ),
  dim: (o, s) => (
    <g>
      <line x1={-130} y1={0} x2={130} y2={0} className="l" />
      <path d="M-130 -5 L-130 5 M130 -5 L130 5" className="l" />
      <Cap x={0} y={-6} s={s} t={String(o.text)} />
    </g>
  ),
};

// How far each primitive reaches below its origin, in local units, so labels clear it.
const BOTTOM: Record<string, number> = {
  table: 42,
  hall: 40,
  building: 46,
  formula: 64,
  gauge: 44,
  iris: 34,
  objects: 44,
  network: 50,
  magnet: 44,
  plot: 34,
  curve: 42,
  frames: 55,
  block: 50,
  eraser: 70,
  oven: 34,
  rails: 50,
  sphere: 45,
  flatland: 62,
  tube: 62,
  ribbons: 64,
  whole: 55,
  wall: 42,
  copier: 36,
  galaxy: 56,
  dish: 30,
  node: 40,
  layers: 30,
  colony: 34,
  tree: 50,
  probe: 30,
  timeline: 26,
  scale: 50,
  stars: 36,
  radiator: 84,
  entangled: 18,
  ray: 40,
};
const bottom = (it: SketchItem) => (it.p === "galaxy" && it.o?.struck ? 82 : (BOTTOM[it.p] ?? 50));

export function Sketch({ items }: { items: SketchItem[] }) {
  return (
    <g className="an-sketch">
      {items.map((it, i) => {
        const s = it.s ?? 1;
        const draw = PRIMS[it.p];
        return (
          <g key={`${it.p}-${i}`}>
            <g transform={`translate(${it.x} ${it.y}) scale(${s})`}>
              {draw ? draw(it.o ?? {}, s) : <Cap x={0} y={0} s={s} t={it.p.toUpperCase()} />}
            </g>
            {it.label && (
              <text
                x={it.x}
                y={r2(it.y + bottom(it) * s + 24)}
                className="an-cap"
                fontSize={12}
                textAnchor="middle"
              >
                {it.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
