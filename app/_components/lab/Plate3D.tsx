"use client";

// Hosts a 3D previs scene inside the animatic plate. The animatic owns the timeline:
// `play` rebuilds the chapter scene, fast-forwards earlier stops, and adds this stop's
// tweens to the timeline it is handed.

import gsap from "gsap";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { disposeScene, Engraver, type Rig } from "./engrave3d";
import { SCENES3D } from "./scenes3d";
import type { Built3D, Label3D, StopCtx } from "./tourScenes3d";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
// Below this stage width, scenes build their portrait version and leaders shorten.
const NARROW = 560;
const EDGE = 8;

export type Plate3DHandle = {
  play: (chapterId: string, stop: number, tl: gsap.core.Timeline, reduce: boolean) => void;
};

// `active` holds a renderer only while the figure is near the screen. Browsers cap live
// WebGL contexts (Chrome at 16), and a long page can carry dozens of figures. The scene and
// its timeline outlive the renderer, so a figure picks up where it was.
const Plate3D = forwardRef<Plate3DHandle, { active?: boolean }>(function Plate3D(
  { active = true },
  ref
) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<SVGSVGElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const engraver = useRef<Engraver | null>(null);
  const rig = useRef<Rig>({ target: new THREE.Vector3(), offset: new THREE.Vector3(0, 2, 10) });
  const built = useRef<Built3D | null>(null);
  const ctx = useRef<StopCtx>({ rig: rig.current, labels: {}, caption: { text: "", o: 0 } });
  const [labels, setLabels] = useState<Label3D[]>([]);
  const [failed, setFailed] = useState(false);
  const dotId = `dot${useId().replace(/:/g, "")}`;

  useImperativeHandle(ref, () => ({
    play(chapterId, stop, tl, reduce) {
      const make = SCENES3D[chapterId];
      if (!make) return;
      if (built.current) disposeScene(built.current.scene);
      const b = make((wrapRef.current?.clientWidth ?? 1000) < NARROW);
      built.current = b;
      const c = ctx.current;
      c.labels = Object.fromEntries(b.labels.map((l) => [l.id, 0]));
      c.caption.text = "";
      c.caption.o = 0;
      setLabels(b.labels);
      for (let k = 0; k < stop; k++) {
        const past = gsap.timeline({ paused: true });
        b.stops[k](past, 0, c);
        past.progress(1).kill();
      }
      if (reduce) {
        const now = gsap.timeline({ paused: true });
        b.stops[stop](now, 0, c);
        now.progress(1).kill();
        tl.set({}, {}, tl.duration() + 0.01);
      } else {
        b.stops[stop](tl, tl.duration(), c);
      }
    },
  }));

  useIsoLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !active) return;
    // A lost context cannot be revived on the same canvas, so each activation gets a new one.
    const canvas = document.createElement("canvas");
    wrap.prepend(canvas);
    let eng: Engraver;
    try {
      eng = new Engraver(canvas);
    } catch {
      canvas.remove();
      setFailed(true);
      return;
    }
    eng.rig = rig.current;
    engraver.current = eng;
    const resize = () => {
      eng.setSize(wrap.clientWidth, wrap.clientHeight);
      labelsRef.current?.setAttribute("viewBox", `0 0 ${eng.width} ${eng.height}`);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const tmp = new THREE.Vector3();
    const widths = new Map<string, number>();
    const tick = (time: number) => {
      const b = built.current;
      if (!b) return;
      b.update(time);
      eng.render(b.scene, b.kit);
      const svg = labelsRef.current;
      if (svg) {
        const groups = svg.querySelectorAll<SVGGElement>("g.lbl");
        b.labels.forEach((l, i) => {
          const g = groups[i];
          if (!g) return;
          const p = eng.project(l.at, tmp);
          const shown =
            (ctx.current.labels[l.id] ?? 0) * (b.kit.clip.distanceToPoint(l.at) > 0 ? 1 : 0);
          g.style.opacity = p.z < 1 && shown > 0 ? "1" : "0";
          if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) return;
          const [ln, text] = g.children as unknown as [SVGLineElement, SVGTextElement];
          // The leader draws out from its anchor, then the words arrive; leaving runs it back.
          const draw = Math.min(shown / 0.6, 1);
          const k = Math.min(Math.max(eng.width / 720, 0.5), 1);
          // Keep the words inside the stage: slide the text, and its leader end, inward.
          const half = (widths.get(l.id) ?? 0) / 2;
          const tx = Math.min(Math.max(p.x + l.dx * k, EDGE + half), eng.width - EDGE - half);
          const ty = Math.min(Math.max(p.y + l.dy * k, 16), eng.height - EDGE);
          const ex = tx;
          const ey = ty + (l.dy < 0 ? 4 : -10);
          ln.setAttribute("x1", `${p.x}`);
          ln.setAttribute("y1", `${p.y}`);
          ln.setAttribute("x2", `${p.x + (ex - p.x) * draw}`);
          ln.setAttribute("y2", `${p.y + (ey - p.y) * draw}`);
          text.style.opacity = String(Math.max((shown - 0.5) / 0.5, 0));
          text.setAttribute("x", `${tx}`);
          text.setAttribute("y", `${ty}`);
          if (!widths.has(l.id) && text.textContent) {
            const w = text.getComputedTextLength();
            if (w > 0) widths.set(l.id, w);
          }
        });
      }
      const cap = captionRef.current;
      if (cap) {
        cap.textContent = ctx.current.caption.text;
        cap.style.opacity = String(ctx.current.caption.o);
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      eng.dispose();
      canvas.remove();
      engraver.current = null;
    };
  }, [active]);

  // The scene itself goes only when the figure unmounts.
  useEffect(
    () => () => {
      if (built.current) disposeScene(built.current.scene);
      built.current = null;
    },
    []
  );

  return (
    <div ref={wrapRef} className="plate3d-scene">
      <svg ref={labelsRef} className="scene3d-labels" aria-hidden="true">
        {/* The anchor dot rides on the leader line: Chrome can leave a separately moved dot painted stale. */}
        <defs>
          <marker
            id={dotId}
            viewBox="-2 -2 4 4"
            markerWidth={4}
            markerHeight={4}
            markerUnits="userSpaceOnUse"
          >
            <circle r={1.6} fill="#1d2126" />
          </marker>
        </defs>
        {labels.map((l) => (
          <g key={l.id} className="lbl" style={{ opacity: 0 }}>
            <line stroke="#1d2126" strokeWidth={0.5} markerStart={`url(#${dotId})`} />
            <text className={l.italic ? "sym" : "cap"} textAnchor="middle">
              {l.text}
            </text>
          </g>
        ))}
      </svg>
      <div ref={captionRef} className="plate3d-caption" aria-hidden="true" />
      {failed && <p className="plate3d-fail">This preview needs WebGL.</p>}
    </div>
  );
});

export default Plate3D;
