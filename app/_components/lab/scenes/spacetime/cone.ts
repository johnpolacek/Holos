// Spacetime figure 1: the light cone. A flash on a flat sheet of space sends out a ring of
// light. Stack the moments of that sheet up a time axis and the spreading ring becomes a
// cone. It runs both ways, future and past. A moving observer's history tilts, but the
// cone is the same for every observer. Stops tween only plain state, so they fast-forward.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  V,
} from "../../tourScenes3d";
import { growTube, makeFlash, makeRing, ringAt, tube } from "./util";

const HX = 4.2; // the sheet of space
const HZ = 3.4;
const H = 3; // cone height each way; light runs one unit of space per unit of time
const TILT = 0.45; // the moving observer's speed, as a slope

function coneLines(kit: ReturnType<typeof makeKit>, dir: 1 | -1) {
  const g = new THREE.Group();
  const rulings: THREE.Vector3[] = [];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    rulings.push(V(0, 0, 0), V(Math.cos(a) * H, dir * H, Math.sin(a) * H));
  }
  g.add(segments(rulings, kit.soft));
  for (let d = 0.6; d <= H + 0.01; d += 0.6) {
    g.add(line(ringAt(d, dir * d, 72), kit.ink, true));
  }
  return g;
}

export function lightCone(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { loop: 0, walk: 0, people: 1, up: 0, down: 0, lines: 0, open: 0 };
  let loopFrom = -1;

  // The sheet of space: an inked frame, a soft grid.
  const sheet = new THREE.Group();
  const frame = (y: number) => [V(-HX, y, -HZ), V(HX, y, -HZ), V(HX, y, HZ), V(-HX, y, HZ)];
  sheet.add(line(frame(0), kit.ink, true));
  const grid: THREE.Vector3[] = [];
  for (let x = -HX + 0.7; x < HX - 0.01; x += 0.7) grid.push(V(x, 0, -HZ), V(x, 0, HZ));
  for (let z = -HZ + 0.68; z < HZ - 0.01; z += 0.68) grid.push(V(-HX, 0, z), V(HX, 0, z));
  sheet.add(segments(grid, kit.soft));
  scene.add(sheet);

  // The flash and its spreading ring of light.
  const flash = makeFlash(kit, 0.32);
  flash.rotation.x = -Math.PI / 2;
  flash.position.y = 0.01;
  scene.add(flash);
  const rings = [0, 1, 2].map(() => {
    const r = makeRing(kit.ink, 120, 0.05);
    r.mesh.position.y = 0.012;
    scene.add(r.mesh);
    return r;
  });

  // Two observers on the sheet: one at rest, one walking.
  const still = makePerson(kit, 0.1);
  still.group.scale.setScalar(0.55);
  still.group.position.set(2.4, 0, -1.3);
  still.group.rotation.y = -0.9;
  scene.add(still.group);
  const walker = makePerson(kit, 0.1);
  walker.group.scale.setScalar(0.55);
  walker.group.rotation.y = Math.PI / 2;
  scene.add(walker.group);
  const walkFrom = V(-3.4, 0, 1.5);
  const walkTo = V(-1.5, 0, 1.5);

  // Moments of space stacked up the time axis, soft, above and below.
  const moments = new THREE.Group();
  for (const y of [-H, -2, -1, 1, 2, H]) moments.add(line(frame(y), kit.soft, true));
  moments.visible = false;
  scene.add(moments);
  const axisX = -HX;
  const axis = new THREE.Group();
  axis.add(line([V(axisX, -H, HZ), V(axisX, H + 0.1, HZ)], kit.ink));
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 12), kit.ink);
  head.position.set(axisX, H + 0.2, HZ);
  axis.add(head);
  axis.visible = false;
  scene.add(axis);

  // The cone, future and past, grown out of the flash.
  const up = coneLines(kit, 1);
  const down = coneLines(kit, -1);
  for (const c of [up, down]) {
    c.visible = false;
    scene.add(c);
  }

  // Histories through the flash: one upright, one tilted.
  const rest = tube([V(0, -H, 0), V(0, 0, 0), V(0, H, 0)], 0.05, kit.ink, 10);
  const moving = tube(
    [V(-TILT * H, -H, 0.02), V(0, 0, 0.02), V(TILT * H, H, 0.02)],
    0.05,
    kit.ink,
    10
  );
  for (const m of [rest, moving]) {
    growTube(m, 0);
    scene.add(m);
  }
  const irisRest = makeIris(kit, 0.13);
  irisRest.group.position.set(0, H + 0.35, 0);
  const irisMove = makeIris(kit, 0.13);
  irisMove.group.position.set(TILT * (H + 0.35), H + 0.35, 0);
  for (const i of [irisRest, irisMove]) {
    i.setOpen(0);
    i.group.visible = false;
    scene.add(i.group);
  }

  const labels: Label3D[] = [
    { id: "flash", text: "A FLASH", at: V(0, 0.05, 0), dx: 40, dy: -70 },
    { id: "light", text: "LIGHT", at: V(1.75, 0, 1.75), dx: 70, dy: 40 },
    { id: "rest", text: "AT REST", at: V(2.4, 0.95, -1.3), dx: 50, dy: -40 },
    { id: "walk", text: "MOVING", at: V(-1.5, 0.95, 1.5), dx: -60, dy: -50 },
    { id: "time", text: "TIME", at: V(axisX, H - 0.4, HZ), dx: -40, dy: 0 },
    { id: "cone", text: "THE LIGHT CONE", at: V(H * 0.72, H * 0.72, 0.3), dx: 90, dy: -40 },
    { id: "future", text: "FUTURE", at: V(0, 2.1, 0), dx: -100, dy: -30 },
    { id: "past", text: "PAST", at: V(0, -2.1, 0), dx: -100, dy: 30 },
    { id: "else", text: "ELSEWHERE", at: V(HX - 0.4, 0, 0.5), dx: 60, dy: -30 },
    { id: "hrest", text: "AT REST", at: V(0, 1.2, 0), dx: -110, dy: -10 },
    { id: "hmove", text: "MOVING", at: V(TILT * 1.6, 1.6, 0), dx: 110, dy: -10 },
  ];
  if (narrow) {
    for (const l of labels) {
      if (l.id === "future" || l.id === "past") l.dx = -60;
      if (l.id === "cone") l.dx = 40;
    }
  }

  const k = narrow ? 1.12 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const flat = V(0, -0.2, 0);
  const home = V(0, 0, 0);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      // While the first stage rests, the flash keeps sending out rings, at one pace.
      if (st.loop > 0) {
        if (loopFrom < 0) loopFrom = time;
        const s = (time - loopFrom) * 1.1;
        rings.forEach((r, i) => {
          const rad = (s - i * 1.6) % 4.8;
          r.mesh.visible = s - i * 1.6 > 0 && rad > 0.05 && rad < HZ + 0.6;
          if (r.mesh.visible) r.setRadius(rad);
        });
        flash.scale.setScalar(1 + 0.15 * Math.sin(time * 6));
      } else {
        loopFrom = -1;
        for (const r of rings) r.mesh.visible = false;
        flash.scale.setScalar(1);
      }
      walker.group.position.copy(walkFrom).lerp(walkTo, st.walk);
      const stride = Math.sin(time * 5) * 0.35 * (st.walk > 0 && st.walk < 1 ? 1 : 0);
      walker.setPose({ armL: 0.15 + stride, armR: 0.15 - stride });
      still.group.visible = walker.group.visible = st.people > 0.5;
      up.visible = st.up > 0.001;
      up.scale.setScalar(Math.max(st.up, 0.001));
      down.visible = st.down > 0.001;
      down.scale.setScalar(Math.max(st.down, 0.001));
      growTube(rest, st.lines);
      growTube(moving, st.lines);
      irisRest.setOpen(st.open);
      irisMove.setOpen(st.open);
      irisRest.group.visible = irisMove.group.visible = st.open > 0.01;
    },
    stops: [
      // 1 · A flash on a sheet of space. Its light spreads at one speed, for both observers.
      (tl: gsap.core.Timeline, t, c) => {
        tl.addLabel("flash", t);
        tl.fromTo(
          kit.clip,
          { constant: -HX - 1 },
          { constant: 40, duration: 2.6, ease: "power1.inOut" },
          t
        );
        tl.fromTo(c.rig.target, { x: -1.5, y: 0, z: 0 }, { ...flat, duration: 3.2, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...view(-5, 2, 9) },
          { ...view(1.5, 6.5, 10), duration: 3.2, ease: EASE },
          t
        );
        tl.set(st, { loop: 1 }, t + 1.4);
        lab(tl, c, { flash: 1 }, t + 1.6);
        tl.fromTo(st, { walk: 0 }, { walk: 1, duration: 4.4, ease: "none" }, t + 1.2);
        lab(tl, c, { light: 1 }, t + 3);
        lab(tl, c, { rest: 1, walk: 1 }, t + 4);
      },
      // 2 · Stack the moments up a time axis: the spreading ring becomes a cone.
      (tl, t, c) => {
        tl.addLabel("stack", t);
        lab(tl, c, { flash: 0, light: 0, rest: 0, walk: 0 }, t);
        tl.set(st, { loop: 0, people: 0, walk: 1 }, t + 0.4);
        cam(tl, c, V(0, 1.2, 0), view(7, 4.2, 13), t, 2.4, EASE);
        tl.set(axis, { visible: true }, t + 0.8);
        lab(tl, c, { time: 1 }, t + 1.2);
        tl.fromTo(st, { up: 0 }, { up: 1, duration: 2.6, ease: "none" }, t + 1.4);
        lab(tl, c, { cone: 1 }, t + 3.6);
      },
      // 3 · The cone runs both ways: what the flash can reach, and what could reach it.
      (tl, t, c) => {
        tl.addLabel("both", t);
        lab(tl, c, { cone: 0, time: 0 }, t);
        tl.set(moments, { visible: true }, t + 0.3);
        cam(tl, c, home, view(9, 2.2, 15.5), t, 2.4, EASE);
        tl.fromTo(st, { down: 0 }, { down: 1, duration: 2.6, ease: "none" }, t + 1);
        lab(tl, c, { future: 1 }, t + 2.4);
        lab(tl, c, { past: 1 }, t + 3.4);
        lab(tl, c, { else: 1 }, t + 4.2);
      },
      // 4 · Histories through the flash: one upright, one tilted. The cone is the same.
      (tl, t, c) => {
        tl.addLabel("geometry", t);
        lab(tl, c, { future: 0, past: 0, else: 0 }, t);
        cam(tl, c, V(0, 0.4, 0), view(1.5, 2.4, 18), t, 2.4, EASE);
        tl.fromTo(st, { lines: 0 }, { lines: 1, duration: 2, ease: "none" }, t + 1);
        tl.to(st, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 2.9);
        lab(tl, c, { hrest: 1, hmove: 1 }, t + 3.2);
        cam(tl, c, null, view(-10, 4, 15), t + 5, 4, "sine.inOut");
      },
    ],
  };
}
