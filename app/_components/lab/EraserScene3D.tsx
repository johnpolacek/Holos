"use client";

// 3D exploration: the eraser apparatus as a three.js scene rendered to look like
// an engraving. One pass writes normals, depth, and light into a render target;
// a full-screen pass turns creases and silhouettes into ink and shadow into hatching.

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ChevronRight, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CURVES, curvePath, dataPoints, PLOT_H, PLOT_W } from "./QuantumEraserPlate";

gsap.registerPlugin(DrawSVGPlugin);

// Raw sRGB values: the post shader writes straight to the canvas, so no color management.
const PAPER = new THREE.Vector3(251 / 255, 250 / 255, 245 / 255);
const INK = new THREE.Vector3(29 / 255, 33 / 255, 38 / 255);
const H = 0.45; // beam height above the table

// Plate coordinates (px) to world: x right, z toward the viewer, y up.
const P = (px: number, py: number, y = H) => new THREE.Vector3(px / 100 - 6, y, py / 100 - 4);

type Route = THREE.Vector3[];
const route = (pts: [number, number][]) => pts.map(([x, y]) => P(x, y));

const PUMP = {
  a: route([
    [160, 300],
    [200, 300],
    [214, 292],
    [272, 292],
  ]),
  b: route([
    [160, 300],
    [200, 300],
    [214, 308],
    [274, 308],
  ]),
};
const SIGNAL = {
  a: route([
    [272, 292],
    [420, 160],
    [499, 170],
  ]),
  b: route([
    [274, 308],
    [420, 180],
    [499, 170],
  ]),
};
const IDLER: Record<string, Route> = {
  "a-d1": route([
    [272, 292],
    [392, 462],
    [412, 466],
    [600, 400],
    [800, 400],
    [860, 460],
    [910, 410],
  ]),
  "a-d2": route([
    [272, 292],
    [392, 462],
    [412, 466],
    [600, 400],
    [800, 400],
    [860, 460],
    [910, 510],
  ]),
  "a-d3": route([
    [272, 292],
    [392, 462],
    [412, 466],
    [600, 400],
    [600, 341],
  ]),
  "b-d1": route([
    [274, 308],
    [392, 478],
    [412, 474],
    [600, 520],
    [800, 520],
    [860, 460],
    [910, 410],
  ]),
  "b-d2": route([
    [274, 308],
    [392, 478],
    [412, 474],
    [600, 520],
    [800, 520],
    [860, 460],
    [910, 510],
  ]),
  "b-d4": route([
    [274, 308],
    [392, 478],
    [412, 474],
    [600, 520],
    [600, 579],
  ]),
};
const PAIRS: ["a" | "b", string][] = [
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

function routeLength(r: Route) {
  let l = 0;
  for (let i = 1; i < r.length; i++) l += r[i].distanceTo(r[i - 1]);
  return l;
}
function routeAt(r: Route, u: number, out: THREE.Vector3) {
  const total = routeLength(r) * Math.min(Math.max(u, 0), 1);
  let acc = 0;
  for (let i = 1; i < r.length; i++) {
    const seg = r[i].distanceTo(r[i - 1]);
    if (acc + seg >= total) return out.lerpVectors(r[i - 1], r[i], seg ? (total - acc) / seg : 0);
    acc += seg;
  }
  return out.copy(r[r.length - 1]);
}

// ---------- Materials ----------

const clip = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 7);
const lightView = { value: new THREE.Vector3() };

function surface(tone = 0) {
  return new THREE.ShaderMaterial({
    clipping: true,
    clippingPlanes: [clip],
    uniforms: { lightDir: lightView, tone: { value: tone } },
    vertexShader: /* glsl */ `
      #include <clipping_planes_pars_vertex>
      varying vec3 vN;
      void main() {
        vN = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        #include <clipping_planes_vertex>
        gl_Position = projectionMatrix * mvPosition;
      }`,
    fragmentShader: /* glsl */ `
      #include <clipping_planes_pars_fragment>
      uniform vec3 lightDir;
      uniform float tone;
      varying vec3 vN;
      void main() {
        #include <clipping_planes_fragment>
        vec3 n = normalize(vN);
        float l = clamp(dot(n, lightDir) * 0.75 + 0.35, 0.0, 1.0) * (1.0 - tone);
        gl_FragColor = vec4(n * 0.5 + 0.5, 0.2 + 0.8 * l);
      }`,
  });
}

// Lines and solid ink objects write a marker the post pass paints as ink.
const inkMat = new THREE.ShaderMaterial({
  clipping: true,
  clippingPlanes: [clip],
  vertexShader: /* glsl */ `
    #include <clipping_planes_pars_vertex>
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      #include <clipping_planes_vertex>
      gl_Position = projectionMatrix * mvPosition;
    }`,
  fragmentShader: /* glsl */ `
    #include <clipping_planes_pars_fragment>
    void main() {
      #include <clipping_planes_fragment>
      gl_FragColor = vec4(0.5, 0.5, 1.0, 0.1);
    }`,
});

const dotMat = new THREE.ShaderMaterial({
  clipping: true,
  clippingPlanes: [clip],
  vertexShader: /* glsl */ `
    #include <clipping_planes_pars_vertex>
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      #include <clipping_planes_vertex>
      gl_PointSize = 1.5;
      gl_Position = projectionMatrix * mvPosition;
    }`,
  fragmentShader: inkMat.fragmentShader,
});

const postMat = new THREE.ShaderMaterial({
  uniforms: {
    tNormal: { value: null },
    tDepth: { value: null },
    texel: { value: new THREE.Vector2() },
    near: { value: 0.1 },
    far: { value: 100 },
    dpr: { value: 1 },
    paper: { value: PAPER },
    ink: { value: INK },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
  fragmentShader: /* glsl */ `
    #include <packing>
    uniform sampler2D tNormal;
    uniform sampler2D tDepth;
    uniform vec2 texel;
    uniform float near;
    uniform float far;
    uniform float dpr;
    uniform vec3 paper;
    uniform vec3 ink;
    varying vec2 vUv;

    float viewZ(vec2 uv) {
      return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, near, far);
    }
    bool isInk(float a) { return a > 0.05 && a < 0.15; }
    bool isSurface(float a) { return a >= 0.15; }

    void main() {
      vec4 c = texture2D(tNormal, vUv);
      if (isInk(c.a)) { gl_FragColor = vec4(ink, 1.0); return; }

      vec3 n0 = c.rgb * 2.0 - 1.0;
      float z0 = viewZ(vUv);
      float edge = 0.0;
      vec2 offs[4];
      offs[0] = vec2(texel.x, 0.0); offs[1] = vec2(-texel.x, 0.0);
      offs[2] = vec2(0.0, texel.y); offs[3] = vec2(0.0, -texel.y);
      for (int i = 0; i < 4; i++) {
        vec4 s = texture2D(tNormal, vUv + offs[i]);
        if (isSurface(c.a) != isSurface(s.a)) { edge = 1.0; continue; }
        if (!isSurface(c.a)) continue;
        if (length(n0 - (s.rgb * 2.0 - 1.0)) > 0.35) edge = 1.0;
        if (abs(z0 - viewZ(vUv + offs[i])) / z0 > 0.025) edge = 1.0;
      }

      vec3 col = paper;
      if (isSurface(c.a)) {
        float shade = (c.a - 0.2) / 0.8;
        vec2 p = gl_FragCoord.xy / dpr;
        float h1 = abs(fract((p.x + p.y) / 4.5) - 0.5);
        float h2 = abs(fract((p.x - p.y) / 4.5) - 0.5);
        float lineW = 0.16;
        if (shade < 0.55 && h1 < lineW) col = mix(paper, ink, 0.85);
        if (shade < 0.3 && h2 < lineW) col = mix(paper, ink, 0.85);
      }
      if (edge > 0.0) col = ink;
      gl_FragColor = vec4(col, 1.0);
    }`,
});

// ---------- Apparatus ----------

type Built = {
  scene: THREE.Scene;
  detectors: Record<string, THREE.Group>;
  flashes: Record<string, THREE.LineLoop>;
  channels: THREE.Mesh[];
  photons: { pump: THREE.Mesh; signal: THREE.Mesh; idler: THREE.Mesh }[];
  labels: { text: string; at: THREE.Vector3; dx: number; dy: number; italic?: boolean }[];
};

function buildScene(): Built {
  const scene = new THREE.Scene();
  const add = (
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    pos: THREE.Vector3,
    rotY = 0,
    parent: THREE.Object3D = scene
  ) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(pos);
    m.rotation.y = rotY;
    parent.add(m);
    return m;
  };
  const lines = (points: THREE.Vector3[], loop = false) => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    const l = loop ? new THREE.LineLoop(g, inkMat) : new THREE.Line(g, inkMat);
    scene.add(l);
    return l;
  };

  const plain = surface(0);
  const dark = surface(0.35);
  const mid = surface(0.15);

  // Optical table with its tapped-hole grid.
  add(new THREE.BoxGeometry(11.6, 0.25, 6.4), plain, new THREE.Vector3(0, -0.125, -0.5));
  // Tapped holes as a quiet field of ink dots.
  const holes: THREE.Vector3[] = [];
  for (let x = -5.5; x <= 5.51; x += 0.5) {
    for (let z = -3.5; z <= 2.51; z += 0.5) holes.push(new THREE.Vector3(x, 0.002, z));
  }
  scene.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(holes), dotMat));

  // Posts: every optic stands on a rod and puck.
  const rod = new THREE.CylinderGeometry(0.035, 0.035, 1, 12);
  const puck = new THREE.CylinderGeometry(0.11, 0.11, 0.05, 20);
  const post = (px: number, py: number, top = H - 0.12) => {
    const r = add(rod, mid, P(px, py, top / 2));
    r.scale.y = top;
    add(puck, plain, P(px, py, 0.025));
  };

  // Laser
  add(new THREE.BoxGeometry(1.2, 0.36, 0.36), dark, P(100, 300, H));
  add(new THREE.BoxGeometry(0.12, 0.3, 0.3), plain, P(166, 300, H));
  add(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 16).rotateZ(Math.PI / 2), plain, P(178, 300, H));
  add(new THREE.BoxGeometry(0.16, H - 0.18, 0.3), plain, P(52, 300, (H - 0.18) / 2));
  add(new THREE.BoxGeometry(0.16, H - 0.18, 0.3), plain, P(148, 300, (H - 0.18) / 2));

  // Double slit: a plate with two vertical openings.
  for (const [z0, z1] of [
    [-1.6, -1.11],
    [-1.05, -0.95],
    [-0.89, -0.4],
  ]) {
    add(
      new THREE.BoxGeometry(0.05, 0.7, z1 - z0),
      plain,
      new THREE.Vector3(211 / 100 - 6, H + 0.05, (z0 + z1) / 2)
    );
  }
  add(new THREE.BoxGeometry(0.2, 0.05, 1.3), mid, new THREE.Vector3(211 / 100 - 6, 0.025, -1.0));

  // Crystal
  add(new THREE.BoxGeometry(0.36, 0.36, 0.46), mid, P(273, 300, H), 0.25);
  post(273, 300, H - 0.18);

  // Lens in a ring holder
  const lens = add(new THREE.SphereGeometry(0.28, 32, 16), plain, P(420, 170, H));
  lens.scale.set(0.2, 1, 1);
  add(new THREE.TorusGeometry(0.29, 0.03, 8, 32).rotateY(Math.PI / 2), mid, P(420, 170, H));
  post(420, 170, H - 0.3);

  // Prism
  add(new THREE.CylinderGeometry(0.22, 0.22, 0.4, 3), plain, P(405, 470, H), Math.PI / 2);
  post(405, 470, H - 0.2);

  // Splitters and mirrors; angles match the plate (plate degrees, y down).
  const plateAngle = (deg: number) => (-deg * Math.PI) / 180;
  const splitter = (px: number, py: number, deg: number) => {
    add(new THREE.BoxGeometry(0.42, 0.42, 0.05), plain, P(px, py, H), plateAngle(deg));
    post(px, py, H - 0.21);
  };
  const mirror = (px: number, py: number, deg: number) => {
    add(
      new THREE.CylinderGeometry(0.22, 0.22, 0.05, 32).rotateX(Math.PI / 2),
      plain,
      P(px, py, H),
      plateAngle(deg)
    );
    post(px, py, H - 0.22);
  };
  splitter(600, 400, -45);
  splitter(600, 520, 45);
  splitter(860, 460, 0);
  mirror(800, 400, 22.5);
  mirror(800, 520, -22.5);

  // Detectors: a domed face toward the light, a hatched body behind.
  const detectors: Record<string, THREE.Group> = {};
  const flashes: Record<string, THREE.LineLoop> = {};
  const detector = (id: string, px: number, py: number, deg: number) => {
    const g = new THREE.Group();
    g.position.copy(P(px, py, H));
    g.rotation.y = plateAngle(deg);
    scene.add(g);
    add(
      new THREE.CylinderGeometry(0.16, 0.16, 0.5, 24).rotateZ(Math.PI / 2),
      dark,
      new THREE.Vector3(0.36, 0, 0),
      0,
      g
    );
    add(new THREE.SphereGeometry(0.15, 24, 12), plain, new THREE.Vector3(0.12, 0, 0), 0, g);
    add(
      new THREE.CylinderGeometry(0.19, 0.19, 0.04, 24).rotateZ(Math.PI / 2),
      plain,
      new THREE.Vector3(0.62, 0, 0),
      0,
      g
    );
    const ring: THREE.Vector3[] = [];
    for (let k = 0; k < 32; k++) {
      const a = (k / 32) * Math.PI * 2;
      ring.push(new THREE.Vector3(0, Math.sin(a) * 0.2, Math.cos(a) * 0.2));
    }
    const flash = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(ring), inkMat);
    flash.position.x = -0.06;
    flash.visible = false;
    g.add(flash);
    detectors[id] = g;
    flashes[id] = flash;
    const base = g.localToWorld(new THREE.Vector3(0.36, 0, 0));
    const r = add(rod, mid, new THREE.Vector3(base.x, (H - 0.16) / 2, base.z));
    r.scale.y = H - 0.16;
    add(puck, plain, new THREE.Vector3(base.x, 0.025, base.z));
  };
  detector("d0", 499, 170, 0);
  detector("d1", 910, 410, -45);
  detector("d2", 910, 510, 45);
  detector("d3", 600, 341, -90);
  detector("d4", 600, 579, 90);
  // D0 rides a translation stage.
  add(new THREE.BoxGeometry(0.3, 0.08, 1.4), mid, P(535, 170, 0.04));
  add(new THREE.BoxGeometry(0.2, 0.06, 0.3), plain, P(535, 170, 0.11));

  // Coincidence counter with four channel windows.
  add(new THREE.BoxGeometry(1.7, 0.5, 0.84), plain, P(1065, 220, 0.25));
  const channels: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const w = add(
      new THREE.BoxGeometry(0.3, 0.16, 0.02),
      mid,
      new THREE.Vector3(1065 / 100 - 6 - 0.57 + i * 0.38, 0.28, 220 / 100 - 4 + 0.43)
    );
    channels.push(w);
  }

  // Cables from each detector's back to the counter, slack on the table.
  for (const id of ["d0", "d1", "d2", "d3", "d4"]) {
    const back = detectors[id].localToWorld(new THREE.Vector3(0.64, 0, 0));
    const end = new THREE.Vector3(
      1065 / 100 - 6 - 0.6 + ["d0", "d1", "d2", "d3", "d4"].indexOf(id) * 0.3,
      0.1,
      220 / 100 - 4 + 0.42
    );
    const mid1 = back.clone().add(new THREE.Vector3(0.3, -H + 0.02, 0));
    const mid2 = end.clone().add(new THREE.Vector3(0, -0.08, 0.5));
    const curve = new THREE.CatmullRomCurve3([back, mid1, mid2, end]);
    lines(curve.getPoints(40));
  }

  // Beams
  for (const r of [...Object.values(PUMP), ...Object.values(SIGNAL), ...Object.values(IDLER)])
    lines(r);

  // Photon pool
  const pumpGeo = new THREE.SphereGeometry(0.028, 12, 8);
  const dotGeo = new THREE.SphereGeometry(0.04, 16, 10);
  const photons = Array.from({ length: 6 }, () => {
    const pump = new THREE.Mesh(pumpGeo, inkMat);
    const signal = new THREE.Mesh(dotGeo, inkMat);
    const idler = new THREE.Mesh(dotGeo, plain);
    for (const m of [pump, signal, idler]) {
      m.visible = false;
      scene.add(m);
    }
    return { pump, signal, idler };
  });

  const labels = [
    { text: "LASER", at: P(100, 300, H + 0.2), dx: -10, dy: -44 },
    { text: "DOUBLE SLIT", at: P(211, 250, H + 0.4), dx: -20, dy: -40 },
    { text: "BBO CRYSTAL", at: P(273, 300, H + 0.2), dx: 30, dy: 50 },
    { text: "LENS", at: P(420, 170, H + 0.3), dx: 0, dy: -38 },
    { text: "D₀", at: P(530, 170, H + 0.18), dx: 12, dy: -34, italic: true },
    { text: "PRISM", at: P(405, 470, H + 0.2), dx: -24, dy: 44 },
    { text: "BS₁", at: P(600, 400, H + 0.22), dx: 18, dy: -32 },
    { text: "BS₂", at: P(600, 520, H + 0.22), dx: 18, dy: 36 },
    { text: "BS₃", at: P(860, 460, H + 0.22), dx: 0, dy: -34 },
    { text: "M₁", at: P(800, 400, H + 0.22), dx: 0, dy: -32 },
    { text: "M₂", at: P(800, 520, H + 0.22), dx: 0, dy: 36 },
    { text: "D₁", at: P(935, 390, H + 0.18), dx: 16, dy: -30, italic: true },
    { text: "D₂", at: P(935, 530, H + 0.18), dx: 16, dy: 32, italic: true },
    { text: "D₃", at: P(600, 318, H + 0.18), dx: -16, dy: -30, italic: true },
    { text: "D₄", at: P(600, 602, H + 0.18), dx: -16, dy: 32, italic: true },
    { text: "COINCIDENCE COUNTER", at: P(1065, 220, 0.52), dx: 0, dy: -36 },
  ];

  return { scene, detectors, flashes, channels, photons, labels };
}

// ---------- Story ----------

const STAGES = [
  {
    title: "I · The apparatus",
    text: "A laser fires photons at a double slit. Behind it, a crystal splits each photon into a pair: a signal photon and an idler photon.",
  },
  {
    title: "II · The signal lands",
    text: "The signal photon takes the short path and hits detector D₀, which records where it landed. Its partner is still in flight.",
  },
  {
    title: "III · The idler arrives",
    text: "About 8 nanoseconds later the idler reaches one of four detectors. D₃ and D₄ would reveal which slit the pair came through. D₁ and D₂ sit past a final beam splitter that erases that information.",
  },
  {
    title: "IV · The record at D₀",
    text: "Many pairs later, the hits at D₀ form one smooth hump. No interference fringes, whatever happens to the idlers.",
  },
  {
    title: "V · Sorted afterward",
    text: "Now sort the D₀ hits by which detector caught each partner. Hits paired with D₁ show fringes, hits paired with D₂ show the mirror-image anti-fringes, and hits paired with D₃ show none.",
  },
  {
    title: "VI · Nothing was changed",
    text: "Add the D₁ and D₂ subsets back together and you get the original smooth hump. The later detection never altered what D₀ recorded; it only decides how the record can be sorted.",
  },
];

// Seconds a stop waits before continuing on its own: time to read the card.
function readingTime(text: string) {
  const words = text.split(/\s+/).length;
  return Math.min(Math.max(3 + words * 0.17, 6), 12);
}
const RING = 2 * Math.PI * 15;

const PANEL_PLOTS = [
  { key: "total", fig: "(a)", title: "D₀, every hit" },
  { key: "d1", fig: "(b)", title: "sorted by D₁" },
  { key: "d2", fig: "(c)", title: "sorted by D₂" },
  { key: "d3", fig: "(d)", title: "sorted by D₃" },
] as const;
const PANEL_STEP = PLOT_W + 60;
const PANEL_POINTS = Object.fromEntries(
  PANEL_PLOTS.map((pl) => [pl.key, dataPoints(CURVES[pl.key])])
) as Record<string, ReturnType<typeof dataPoints>>;

// ---------- Component ----------

export default function EraserScene3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<SVGSVGElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<SVGSVGElement>(null);
  const [playing, setPlaying] = useState(true);
  const [stage, setStage] = useState(-1);
  const [waiting, setWaiting] = useState(false);
  const control = useRef<{
    setPaused: (p: boolean) => void;
    replay: () => void;
    next: () => void;
  } | null>(null);
  const [labelData] = useState(() => buildScene().labels);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const labelSvg = labelsRef.current;
    const panel = panelRef.current;
    if (!wrap || !canvas || !labelSvg || !panel) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    } catch {
      return; // No WebGL: the static plate elsewhere on the page stands in.
    }
    renderer.localClippingEnabled = true;
    renderer.setClearColor(0x000000, 0);

    const built = buildScene();
    const { scene, flashes, channels, photons } = built;
    const camera = new THREE.PerspectiveCamera(32, 16 / 10, 0.1, 100);
    const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
    rt.depthTexture = new THREE.DepthTexture(1, 1);
    const post = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat);
    const postScene = new THREE.Scene();
    postScene.add(post);
    const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    postMat.uniforms.tNormal.value = rt.texture;
    postMat.uniforms.tDepth.value = rt.depthTexture;

    const dpr = 2;
    let width = 1;
    let height = 1;
    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      rt.setSize(width * dpr, height * dpr);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      postMat.uniforms.texel.value.set(1 / (width * dpr), 1 / (height * dpr));
      postMat.uniforms.dpr.value = dpr;
      labelSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Camera rig: look at `target` from `target + offset`.
    const rig = { target: new THREE.Vector3(), offset: new THREE.Vector3() };
    const lightWorld = new THREE.Vector3(-0.5, 1, 0.7).normalize();

    const labelEls = Array.from(labelSvg.querySelectorAll<SVGGElement>("g.lbl"));
    const projected = new THREE.Vector3();
    const updateLabels = () => {
      built.labels.forEach((l, i) => {
        const g = labelEls[i];
        if (!g) return;
        projected.copy(l.at).project(camera);
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;
        const shown = l.at.x < clip.constant - 0.2 && projected.z < 1;
        g.style.opacity = shown ? "1" : "0";
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        const line = g.firstElementChild as SVGLineElement;
        const dot = line.nextElementSibling as SVGCircleElement;
        const text = dot.nextElementSibling as SVGTextElement;
        line.setAttribute("x1", `${x}`);
        line.setAttribute("y1", `${y}`);
        line.setAttribute("x2", `${x + l.dx}`);
        line.setAttribute("y2", `${y + l.dy + (l.dy < 0 ? 4 : -10)}`);
        dot.setAttribute("cx", `${x}`);
        dot.setAttribute("cy", `${y}`);
        text.setAttribute("x", `${x + l.dx}`);
        text.setAttribute("y", `${y + l.dy}`);
      });
    };

    const render = () => {
      camera.position.copy(rig.target).add(rig.offset);
      camera.lookAt(rig.target);
      camera.updateMatrixWorld();
      lightView.value.copy(lightWorld).transformDirection(camera.matrixWorldInverse);
      renderer.setRenderTarget(rt);
      renderer.clear();
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCam);
      updateLabels();
    };

    // The plots panel covers the bottom of the frame, so the overview looks a little nearer.
    const OVERVIEW_T = new THREE.Vector3(0.1, 0, 0.1);
    const OVERVIEW_O = new THREE.Vector3(0.9, 8.6, 9.6);
    const COUNTER_T = P(1000, 330, 0.2);
    const COUNTER_O = new THREE.Vector3(-1.4, 3.2, 4.6);

    const q = (sel: string) => Array.from(panel.querySelectorAll<SVGElement>(sel));
    const plotGroup = (key: string) => panel.querySelector<SVGGElement>(`#pp-${key}`);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clip.constant = 7;
      rig.target.copy(OVERVIEW_T);
      rig.offset.copy(OVERVIEW_O);
      render();
      setStage(STAGES.length - 1);
      return () => {
        ro.disconnect();
        renderer.dispose();
        rt.dispose();
      };
    }

    const tmp = new THREE.Vector3();
    let onNext = () => {};
    const ctx = gsap.context(() => {
      const moveRig = (
        tl: gsap.core.Timeline,
        t: THREE.Vector3 | null,
        o: THREE.Vector3 | null,
        at: number,
        duration: number,
        ease = "power2.inOut"
      ) => {
        if (t) tl.to(rig.target, { x: t.x, y: t.y, z: t.z, duration, ease }, at);
        if (o) tl.to(rig.offset, { x: o.x, y: o.y, z: o.z, duration, ease }, at);
      };
      const fly = (
        tl: gsap.core.Timeline,
        mesh: THREE.Mesh,
        r: Route,
        speed: number,
        at: number,
        follow = false
      ) => {
        const duration = routeLength(r) / speed;
        const proxy = { u: 0 };
        tl.set(mesh, { visible: true }, at);
        tl.fromTo(
          proxy,
          { u: 0 },
          {
            u: 1,
            duration,
            ease: "none",
            onUpdate: () => {
              routeAt(r, proxy.u, mesh.position);
              if (follow) rig.target.copy(mesh.position);
            },
          },
          at
        );
        tl.set(mesh, { visible: false }, at + duration);
        return at + duration;
      };
      const flash = (tl: gsap.core.Timeline, id: string, at: number) => {
        const f = flashes[id];
        tl.set(f, { visible: true }, at);
        tl.fromTo(
          f.scale,
          { x: 0.3, y: 0.3, z: 0.3 },
          { x: 1.8, y: 1.8, z: 1.8, duration: 0.5, ease: "power2.out" },
          at
        );
        tl.set(f, { visible: false }, at + 0.5);
      };
      const blink = (tl: gsap.core.Timeline, det: string, at: number, hold = 0.3) => {
        const w = channels[Number(det.slice(1)) - 1];
        const original = w.material;
        tl.call(
          () => {
            w.material = inkMat;
          },
          undefined,
          at
        );
        tl.call(
          () => {
            w.material = original;
          },
          undefined,
          at + hold
        );
      };
      const timer = (tl: gsap.core.Timeline, text: string, at: number) => {
        tl.call(
          () => {
            if (timerRef.current) timerRef.current.textContent = text;
          },
          undefined,
          at
        );
      };

      const story = gsap.timeline();
      // Each stage announces itself as it starts and waits for the reader at its end.
      const begin = (i: number, at: number | string) => {
        story.call(
          () => {
            setStage(i);
            setWaiting(false);
          },
          undefined,
          at
        );
      };
      const wait = (at: number | string, i: number) => {
        story.addPause(at, () => {
          setWaiting(true);
          startCountdown(i);
        });
      };

      gsap.set(panel, { opacity: 0 });
      gsap.set(q(".pt"), { opacity: 0 });
      gsap.set(q(".fit"), { drawSVG: "0%" });
      gsap.set(q(".ghost"), { opacity: 0 });
      gsap.set(q(".hl"), { drawSVG: "0%" });

      // I. Engrave: a cutting plane sweeps the table while the camera pulls back.
      rig.target.set(-4.7, 0.45, -1);
      rig.offset.set(1.3, 0.35, 1.2);
      begin(0, 0);
      story.fromTo(
        clip,
        { constant: -6.2 },
        { constant: 7, duration: 2.6, ease: "power1.inOut" },
        0
      );
      moveRig(story, OVERVIEW_T, OVERVIEW_O, 0.1, 3.4);
      wait(3.9, 0);

      // II. One pair; the camera rides with the signal to D0.
      story.addLabel("pairs", 4);
      begin(1, "pairs");
      const SLOW = 0.9;
      const crystal = P(273, 300);
      moveRig(story, crystal, new THREE.Vector3(0.9, 1.0, 2.0), 4, 2);
      const first = photons[0];
      const born = fly(story, first.pump, PUMP.a, SLOW, 6.2);
      story.to(rig.offset, { x: 0.4, y: 1.1, z: 2.3, duration: 1.4, ease: "sine.inOut" }, born);
      const signalAt = fly(story, first.signal, SIGNAL.a, SLOW, born, true);
      const idlerRoute = IDLER["a-d1"];
      const idlerAt = fly(story, first.idler, idlerRoute, SLOW, born);
      flash(story, "d0", signalAt);
      timer(story, "D₀ fires · t = 0", signalAt);
      story.to(timerRef.current, { opacity: 1, duration: 0.3 }, signalAt);
      wait(signalAt + 0.7, 1);

      // III. Swing over to the idler, still in flight, and ride along to D1.
      begin(2, signalAt + 0.71);
      const catchUp = 1.2;
      const proxy = { u: 0 };
      story.to(
        rig.offset,
        { x: -0.6, y: 1.5, z: 2.2, duration: catchUp + 1, ease: "sine.inOut" },
        signalAt
      );
      story.fromTo(
        proxy,
        { u: 0 },
        {
          u: 1,
          duration: idlerAt - signalAt,
          ease: "none",
          onUpdate: () => {
            const u = (proxy.u * (idlerAt - signalAt) + (signalAt - born)) / (idlerAt - born);
            routeAt(idlerRoute, u, tmp);
            const now = proxy.u * (idlerAt - signalAt);
            rig.target.lerp(tmp, Math.min(now / catchUp, 1));
            if (timerRef.current && now > 0.8) {
              timerRef.current.textContent = `idler in flight · t = ${(proxy.u * 8).toFixed(1)} ns`;
            }
          },
        },
        signalAt
      );
      flash(story, "d1", idlerAt);
      blink(story, "d1", idlerAt, 0.6);
      timer(story, "D₁ fires · t ≈ 8 ns", idlerAt);
      wait(idlerAt + 1, 2);

      // IV. Pull out; the rest of the pairs run at speed and fill the D0 record.
      const outAt = idlerAt + 1.01;
      begin(3, outAt);
      story.to(timerRef.current, { opacity: 0, duration: 0.4 }, outAt);
      moveRig(story, OVERVIEW_T, OVERVIEW_O, outAt, 2.4);
      story.to(panel, { opacity: 1, duration: 0.6 }, outAt + 1.2);
      const totalPts = q("#pp-total .pt");
      let t = outAt + 2.4;
      const FAST = 4;
      PAIRS.forEach(([slit, det], k) => {
        const ph = photons[k % photons.length];
        const b = fly(story, ph.pump, PUMP[slit], FAST, t);
        const sAt = fly(story, ph.signal, SIGNAL[slit], FAST, b);
        const iAt = fly(story, ph.idler, IDLER[`${slit}-${det}`], FAST, b);
        flash(story, "d0", sAt);
        flash(story, det, iAt);
        blink(story, det, iAt);
        story.fromTo(
          totalPts[(k * 7 + 9) % totalPts.length],
          { opacity: 0 },
          { opacity: 1, duration: 0.25 },
          sAt
        );
        t += 0.4;
      });
      const fitAt = t + 1;
      story.fromTo(
        q("#pp-total .fit"),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1.3, ease: "power1.inOut" },
        fitAt
      );
      wait(fitAt + 1.6, 3);

      // V. Sort by the idler record, one coincidence channel at a time.
      const sortAt = fitAt + 1.61;
      begin(4, sortAt);
      moveRig(story, COUNTER_T, COUNTER_O, sortAt, 2.2);
      (["d1", "d2", "d3"] as const).forEach((det, j) => {
        const at = sortAt + 2.2 + j * 2.4;
        blink(story, det, at, 1.6);
        story.to(plotGroup(det), { opacity: 1, duration: 0.4 }, at);
        story.fromTo(
          q(`#pp-${det} .pt`),
          { opacity: 0 },
          { opacity: 1, duration: 0.25, stagger: { amount: 0.9, from: "random" } },
          at + 0.3
        );
        story.fromTo(
          q(`#pp-${det} .fit`),
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.1, ease: "power1.inOut" },
          at + 1
        );
      });
      const sortEnd = sortAt + 2.2 + 3 * 2.4;
      wait(sortEnd, 4);

      // VI. The sorted subsets add back to the unchanged total.
      const claimAt = sortEnd + 0.01;
      begin(5, claimAt);
      moveRig(story, OVERVIEW_T, OVERVIEW_O, claimAt, 2.2);
      story.fromTo(
        q("#pp-total .ghost"),
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        claimAt + 0.6
      );
      story.fromTo(
        q(".hl"),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1.3, ease: "power2.inOut" },
        claimAt + 1
      );
      wait(claimAt + 2.6, 5);
      story.set({}, {}, claimAt + 2.7);

      const finalWait = claimAt + 2.6;
      let userPaused = false;
      let visible = true;
      // Each stop counts down on the ring around the next button, then continues by itself.
      let countdown: gsap.core.Tween | null = null;
      function startCountdown(i: number) {
        countdown?.kill();
        countdown = gsap.fromTo(
          wrapRef.current?.querySelector(".cd-ring") ?? null,
          { strokeDashoffset: 0 },
          {
            strokeDashoffset: RING,
            duration: readingTime(STAGES[i].text),
            ease: "none",
            onComplete: () => onNext(),
          }
        );
        countdown.paused(userPaused || !visible);
      }
      const sync = () => {
        countdown?.paused(userPaused || !visible);
        // Stage waits are paused timelines too; only resume those through next().
        if (userPaused || !visible) story.pause();
        else if (!waitingNow()) story.resume();
      };
      const waitingNow = () => {
        const time = story.time();
        return (
          story.paused() &&
          [3.9, signalAt + 0.7, idlerAt + 1, fitAt + 1.6, sortEnd, finalWait].some(
            (w) => Math.abs(w - time) < 0.02
          )
        );
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        sync();
      });
      io.observe(wrap);

      onNext = () => {
        if (!waitingNow()) return;
        countdown?.kill();
        countdown = null;
        setWaiting(false);
        if (Math.abs(story.time() - finalWait) < 0.02) {
          // Run it again from the first photon pair; the apparatus stays built.
          story.seek("pairs").play();
          return;
        }
        story.play();
      };
      control.current = {
        setPaused: (p) => {
          userPaused = p;
          sync();
        },
        replay: () => {
          userPaused = false;
          countdown?.kill();
          countdown = null;
          setWaiting(false);
          story.restart();
        },
        next: () => onNext(),
      };
      gsap.ticker.add(render);
      return () => {
        countdown?.kill();
        io.disconnect();
        gsap.ticker.remove(render);
      };
    }, wrap);

    // Space, Enter, or the right arrow continue when the scene is on screen.
    const onKey = (e: KeyboardEvent) => {
      if (!["Space", "ArrowRight", "Enter"].includes(e.code)) return;
      const target = e.target as HTMLElement | null;
      if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;
      if (e.code === "Enter" && target?.tagName === "BUTTON") return;
      const r = wrap.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      e.preventDefault();
      onNext();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      control.current = null;
      ctx.revert();
      ro.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Line || o instanceof THREE.Points)
          o.geometry.dispose();
      });
      rt.dispose();
      renderer.dispose();
    };
  }, []);

  const current = stage >= 0 ? STAGES[stage] : null;
  const last = stage === STAGES.length - 1;

  return (
    <figure className="plate-figure">
      <div ref={wrapRef} className="scene3d">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Three-dimensional line drawing of the delayed-choice quantum eraser on an optical table."
        />
        <svg ref={labelsRef} className="scene3d-labels" aria-hidden="true">
          {labelData.map((l) => (
            <g key={l.text} className="lbl">
              <line stroke="#1d2126" strokeWidth={0.5} />
              <circle r={1.6} fill="#1d2126" />
              <text className={l.italic ? "sym" : "cap"} textAnchor="middle">
                {l.text}
              </text>
            </g>
          ))}
        </svg>
        <div ref={timerRef} className="scene3d-timer" aria-hidden="true" />
        {current && (
          <div className="scene3d-card" aria-live="polite">
            <div className="scene3d-card-head">
              <p className="scene3d-card-title">
                <span className="scene3d-card-step">
                  {stage + 1}/{STAGES.length}
                </span>
                {current.title}
              </p>
              <div className="scene3d-card-next" data-shown={waiting ? "" : undefined}>
                <button
                  type="button"
                  onClick={() => control.current?.next()}
                  disabled={!waiting}
                  aria-label={last ? "Run it again" : "Continue"}
                  title={last ? "Run it again (space)" : "Continue (space)"}
                >
                  <svg viewBox="0 0 36 36" aria-hidden="true">
                    <circle cx={18} cy={18} r={15} className="cd-track" />
                    <circle
                      cx={18}
                      cy={18}
                      r={15}
                      className="cd-ring"
                      strokeDasharray={RING}
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  {last ? (
                    <RotateCcw size={14} strokeWidth={1.5} />
                  ) : (
                    <ChevronRight size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
            <p className="scene3d-card-text">{current.text}</p>
          </div>
        )}
        <svg
          ref={panelRef}
          className="scene3d-panel"
          viewBox={`-40 -48 ${PANEL_STEP * 4 + 20} ${PLOT_H + 92}`}
          aria-hidden="true"
        >
          <rect x={-40} y={-48} width={PANEL_STEP * 4 + 20} height={PLOT_H + 92} fill="#fbfaf5" />
          <line
            x1={-40}
            y1={-47.5}
            x2={PANEL_STEP * 4 - 20}
            y2={-47.5}
            stroke="#1d2126"
            strokeWidth={0.75}
          />
          {PANEL_PLOTS.map((pl, i) => (
            <g
              key={pl.key}
              id={`pp-${pl.key}`}
              transform={`translate(${i * PANEL_STEP} 0)`}
              opacity={pl.key === "total" ? 1 : 0.35}
            >
              <text x={0} y={-26} className="cap">
                {pl.fig}
              </text>
              <text x={26} y={-26} className="sym">
                {pl.title}
              </text>
              {[1, 2, 3, 4].map((k) => (
                <line
                  key={k}
                  x1={0}
                  y1={PLOT_H - (k / 4) * PLOT_H}
                  x2={PLOT_W}
                  y2={PLOT_H - (k / 4) * PLOT_H}
                  stroke="rgba(29,33,38,0.4)"
                  strokeWidth={0.5}
                  strokeDasharray="1 4"
                />
              ))}
              <line x1={0} y1={0} x2={0} y2={PLOT_H} stroke="#1d2126" strokeWidth={0.75} />
              <line
                x1={0}
                y1={PLOT_H}
                x2={PLOT_W}
                y2={PLOT_H}
                stroke="#1d2126"
                strokeWidth={0.75}
              />
              {pl.key === "total" &&
                (["d1", "d2"] as const).map((g) => (
                  <path
                    key={g}
                    className="ghost"
                    d={curvePath(CURVES[g])}
                    fill="none"
                    stroke="rgba(29,33,38,0.55)"
                    strokeWidth={0.5}
                    strokeDasharray="3 2"
                  />
                ))}
              <path
                className="fit"
                d={curvePath(CURVES[pl.key])}
                fill="none"
                stroke="#1d2126"
                strokeWidth={1.25}
              />
              {PANEL_POINTS[pl.key].map((p) => (
                <g key={p.x} className="pt">
                  <line
                    x1={p.x}
                    y1={p.y - p.e}
                    x2={p.x}
                    y2={p.y + p.e}
                    stroke="#1d2126"
                    strokeWidth={0.5}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={1.8}
                    fill="#fbfaf5"
                    stroke="#1d2126"
                    strokeWidth={0.75}
                  />
                </g>
              ))}
              <text x={PLOT_W} y={PLOT_H + 18} className="sym" textAnchor="end">
                x₀
              </text>
              {pl.key === "total" && (
                <rect
                  className="hl"
                  x={-22}
                  y={-44}
                  width={PLOT_W + 36}
                  height={PLOT_H + 70}
                  rx={10}
                  fill="none"
                  stroke="#1d2126"
                  strokeWidth={0.75}
                />
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="plate-controls">
        <button
          type="button"
          aria-pressed={!playing}
          onClick={() => {
            const next = !playing;
            setPlaying(next);
            control.current?.setPaused(!next);
          }}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            control.current?.replay();
          }}
        >
          Replay from the start
        </button>
      </div>
    </figure>
  );
}
