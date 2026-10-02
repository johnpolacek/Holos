// Teeming Dark, figure 5: the tell.
// A quiet star, and an engraved chart of the glow it should give, bright in visible light
// and fading through the infrared. The reading comes in with heat it should not have: a
// warm rise in the infrared, a cold rise in the far infrared, the excess hatched. Last,
// the view widens: thin cold structures and a dark node around the star, silent, not
// absent. Stops tween only plain state.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, line, segments, V } from "../../tourScenes3d";
import { makeEye, makeField, makeGlow, makePanel, makeStar, seeded } from "./common";

const STAR = V(-4.6, 0.4, 0);
const X0 = -1.2;
const X1 = 5.4;
const Y0 = -1.3;
const H = 2.7;
const N = 120;

const expected = (u: number) =>
  Math.exp(-((Math.log(u + 0.03) - Math.log(0.2)) ** 2) / (2 * 0.5 ** 2));
const extra = (u: number) =>
  0.3 * Math.exp(-((u - 0.55) ** 2) / (2 * 0.06 ** 2)) +
  0.2 * Math.exp(-((u - 0.86) ** 2) / (2 * 0.05 ** 2));
const P = (u: number, y: number, z = 0.07) => V(X0 + 0.15 + u * (X1 - X0 - 0.4), Y0 + y * H, z);

export function tell(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { expect: 0, measure: 0, excess: 0, ring: 0, glow: 0 };
  const eye = makeEye();

  scene.add(makeField(kit, 220, V(40, 22, 18), 13));
  const star = makeStar(kit, 1);
  star.group.position.copy(STAR);
  scene.add(star.group);

  // The chart: a plate, two axes, a few soft rules.
  const plate = new THREE.Mesh(new THREE.BoxGeometry(X1 - X0 + 0.6, H + 1, 0.1), kit.surface(-0.6));
  plate.position.set((X0 + X1) / 2, Y0 + H / 2 - 0.05, 0);
  scene.add(plate);
  scene.add(line([V(X0, Y0 + H + 0.1, 0.07), V(X0, Y0, 0.07), V(X1, Y0, 0.07)], kit.ink));
  const rules: THREE.Vector3[] = [];
  for (let i = 1; i <= 3; i++)
    rules.push(V(X0, Y0 + (i / 3) * H * 0.9, 0.06), V(X1, Y0 + (i / 3) * H * 0.9, 0.06));
  for (const u of [0.38, 0.72]) rules.push(P(u, 0, 0.06), P(u, 1.05, 0.06));
  scene.add(segments(rules, kit.soft));

  // The expected glow, drawn in ink, later softened to make room for the reading.
  const curve = (f: (u: number) => number) =>
    Array.from({ length: N + 1 }, (_, i) => P(i / N, f(i / N)));
  const expInk = line(curve(expected), kit.ink);
  const expSoft = line(curve(expected), kit.soft);
  expSoft.visible = false;
  scene.add(expInk, expSoft);
  const measured = line(
    curve((u) => expected(u) + extra(u)),
    kit.ink
  );
  scene.add(measured);

  // The excess, hatched between the two curves.
  const pos: number[] = [];
  for (let i = 0; i < N; i++) {
    const u0 = i / N;
    const u1 = (i + 1) / N;
    if (extra(u0) < 0.01 && extra(u1) < 0.01) continue;
    const a = P(u0, expected(u0), 0.065);
    const b = P(u1, expected(u1), 0.065);
    const c = P(u1, expected(u1) + extra(u1), 0.065);
    const d = P(u0, expected(u0) + extra(u0), 0.065);
    pos.push(
      a.x,
      a.y,
      a.z,
      b.x,
      b.y,
      b.z,
      c.x,
      c.y,
      c.z,
      a.x,
      a.y,
      a.z,
      c.x,
      c.y,
      c.z,
      d.x,
      d.y,
      d.z
    );
  }
  const excessGeo = new THREE.BufferGeometry();
  excessGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  excessGeo.computeVertexNormals();
  const excess = new THREE.Mesh(excessGeo, kit.surface(0.75));
  excess.visible = false;
  scene.add(excess);

  // What may be there: thin cold structures around the star, and a dark node near it.
  const rnd = seeded(31);
  const tilt = new THREE.Group();
  tilt.position.copy(STAR);
  tilt.rotation.set(1.15, 0, 0.25);
  scene.add(tilt);
  const ring = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2 + rnd() * 0.2;
    const p = V(Math.cos(a) * 2.3, Math.sin(a) * 2.3, (rnd() - 0.5) * 0.3);
    const g = makePanel(kit, 0.42, 0.3, -0.5);
    g.position.copy(p);
    g.lookAt(0, 0, 0);
    g.visible = false;
    tilt.add(g);
    return g;
  });
  const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 1), kit.surface(0.6));
  node.position.set(STAR.x + 1.5, STAR.y - 0.55, 0.6);
  node.visible = false;
  scene.add(node);
  const nodeGlow = makeGlow(kit, { r0: 0.3, r1: 0.75, n: 2, speed: 0.35 });
  nodeGlow.group.position.copy(node.position);
  scene.add(nodeGlow.group);
  const haloGlow = makeGlow(kit, { r0: 2.6, r1: 3.4, n: 2, speed: 0.12 });
  haloGlow.group.position.copy(STAR);
  scene.add(haloGlow.group);

  const labels: Label3D[] = [
    { id: "quiet", text: "NO MESSAGE", at: V(STAR.x, STAR.y - 1, 0), dx: 0, dy: 80 },
    { id: "vis", text: "VISIBLE", at: P(0.18, 0), dx: 0, dy: 34 },
    { id: "ir", text: "INFRARED", at: P(0.55, 0), dx: 0, dy: 34 },
    { id: "fir", text: "FAR INFRARED", at: P(0.88, 0), dx: 0, dy: 34 },
    {
      id: "should",
      text: "THE GLOW IT SHOULD GIVE",
      at: P(0.24, expected(0.24)),
      dx: 120,
      dy: -40,
    },
    {
      id: "warm",
      text: "WARM, IN THE INFRARED",
      at: P(0.55, expected(0.55) + extra(0.55)),
      dx: -40,
      dy: -80,
    },
    {
      id: "cold",
      text: "COLD, IN THE FAR INFRARED",
      at: P(0.86, expected(0.86) + extra(0.86)),
      dx: 20,
      dy: -130,
    },
    { id: "endure", text: "NOT ABSENCE", at: V(STAR.x - 2, STAR.y + 0.9, 0), dx: -10, dy: -80 },
  ];
  if (narrow) {
    labels[4].dx = 90;
    labels[5].dx = -60;
    labels[6].dx = -10;
  }
  const k = narrow ? 1.1 : 1;
  const off = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const draw = (l: THREE.Line, p: number) =>
    l.geometry.setDrawRange(0, Math.max(Math.round(p * (N + 1)), 0));

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const e = eye.get();
      star.update(time, e);
      draw(expInk, st.expect);
      draw(measured, st.measure);
      expInk.visible = st.measure <= 0;
      expSoft.visible = st.measure > 0;
      measured.visible = st.measure > 0;
      excess.visible = st.excess > 0.5;
      const n = Math.round(st.ring * ring.length);
      ring.forEach((g, i) => {
        g.visible = i < n;
      });
      node.visible = st.ring > 0.5;
      nodeGlow.update(time, st.glow, e);
      haloGlow.update(time, st.glow * 0.8, e);
    },
    stops: [
      // 1 · A quiet star. No message.
      (tl, t, c) => {
        tl.addLabel("quiet", t);
        eye.set(c.rig);
        tl.set(st, { expect: 0, measure: 0, excess: 0, ring: 0, glow: 0 }, t);
        tl.fromTo(
          kit.clip,
          { constant: -8 },
          { constant: 30, duration: 3, ease: "power1.inOut" },
          t
        );
        tl.fromTo(
          c.rig.target,
          { x: STAR.x, y: 0.4, z: 0 },
          { x: STAR.x + 1.2, y: 0.2, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...off(-1, 1, 7) },
          { ...off(0.5, 0.8, 9), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { quiet: 1 }, t + 2.2);
      },
      // 2 · The glow it should give.
      (tl, t, c) => {
        tl.addLabel("expected", t);
        eye.set(c.rig);
        lab(tl, c, { quiet: 0 }, t);
        cam(tl, c, V(0.3, 0.1, 0), off(0.6, 1, 15.5), t, 2.4, EASE);
        lab(tl, c, { vis: 1, ir: 1, fir: 1 }, t + 1.6);
        tl.fromTo(st, { expect: 0 }, { expect: 1, duration: 2.2, ease: "none" }, t + 1.8);
        lab(tl, c, { should: 1 }, t + 3.4);
      },
      // 3 · Heat it should not have.
      (tl, t, c) => {
        tl.addLabel("excess", t);
        eye.set(c.rig);
        tl.set(st, { expect: 1 }, t);
        lab(tl, c, { should: 0 }, t);
        cam(tl, c, V(2.3, 0.1, 0), off(0.4, 0.9, 11.5), t, 2.2, EASE);
        tl.fromTo(st, { measure: 0 }, { measure: 1, duration: 2.6, ease: "none" }, t + 1);
        tl.fromTo(st, { excess: 0 }, { excess: 1, duration: 0.1 }, t + 3.6);
        lab(tl, c, { warm: 1 }, t + 3.2);
        lab(tl, c, { cold: 1 }, t + 3.8);
      },
      // 4 · Silence, not absence: what may be there.
      (tl, t, c) => {
        tl.addLabel("endure", t);
        eye.set(c.rig);
        tl.set(st, { expect: 1, measure: 1, excess: 1 }, t);
        lab(tl, c, { warm: 0, cold: 0, vis: 0, ir: 0, fir: 0 }, t);
        cam(tl, c, V(-1.6, 0.2, 0), off(1, 2.6, narrow ? 15 : 13), t, 2.6, EASE);
        tl.fromTo(st, { ring: 0 }, { ring: 1, duration: 1.6, ease: "none" }, t + 1);
        tl.fromTo(st, { glow: 0 }, { glow: 1, duration: 1.6, ease: "power1.inOut" }, t + 2);
        lab(tl, c, { endure: 1 }, t + 3);
      },
    ],
  };
}
