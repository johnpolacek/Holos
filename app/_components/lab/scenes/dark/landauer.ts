// Teeming Dark, figure 2: the heat cost of erasing, and the Slysh halo.
// A row of bits on a thin panel. An eraser runs along it and each bit it clears gives off
// a wisp of heat. A thermometer falls and the wisps shrink: the cost falls with the cold.
// The camera pulls far out. The panel is one of many thin structures spread wide around a
// distant star, each giving off only a faint glow. Stops tween only plain state.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, line, segments, V } from "../../tourScenes3d";
import { makeEye, makeField, makeGlow, makePanel, makeStar, makeThermo, seeded } from "./common";

const HALO = 30;
const BITS = 8;
const GAP = 0.3;
const SPAN = ((BITS - 1) / 2) * GAP;

export function landauer(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { temp: 1, halo: 0, glow: 0 };
  const eye = makeEye();

  const star = makeStar(kit, 2.6);
  scene.add(star.group);
  scene.add(makeField(kit, 260, V(420, 260, 420), 5));

  // The near panel, turned to face away from the star. Everything local hangs off it.
  const out = V(0.55, 0.22, 0.8).normalize();
  const local = new THREE.Group();
  local.position.copy(out).multiplyScalar(HALO);
  local.lookAt(out.clone().multiplyScalar(HALO * 2));
  scene.add(local);
  local.updateMatrixWorld();
  const W = (x: number, y: number, z: number) => local.localToWorld(V(x, y, z));
  const D = (x: number, y: number, z: number) => W(x, y, z).sub(local.position);

  local.add(makePanel(kit, 3.6, 2.4, -0.5));

  // The register: raised keys are ones, flush keys are blank.
  const keyGeo = new THREE.BoxGeometry(0.2, 0.2, 0.18);
  const keyMat = kit.surface(-0.3);
  const keys = Array.from({ length: BITS }, (_, i) => {
    const k = new THREE.Mesh(keyGeo, keyMat);
    k.position.set(-SPAN + i * GAP, 0.05, 0.08);
    local.add(k);
    return { mesh: k, on: i % 3 !== 1, cleared: -10 };
  });
  const sockets: THREE.Vector3[] = [];
  for (let i = 0; i < BITS; i++) {
    const x = -SPAN + i * GAP;
    const p = [
      V(x - 0.13, -0.08, 0.04),
      V(x + 0.13, -0.08, 0.04),
      V(x + 0.13, 0.18, 0.04),
      V(x - 0.13, 0.18, 0.04),
    ];
    sockets.push(p[0], p[1], p[1], p[2], p[2], p[3], p[3], p[0]);
  }
  local.add(segments(sockets, kit.ink));

  // The eraser rides a rail below the keys.
  local.add(line([V(-SPAN - 0.3, -0.42, 0.06), V(SPAN + 0.3, -0.42, 0.06)], kit.ink));
  const eraser = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.3, 0.24), kit.surface(0.35));
  eraser.position.set(-SPAN, -0.3, 0.14);
  local.add(eraser);

  // A wisp of heat above each key, rising after it is cleared.
  const wispPts = Array.from({ length: 24 }, (_, i) => V(Math.sin(i * 0.8) * 0.05, i * 0.022, 0));
  const wisps = keys.map((k) => {
    const w = line(wispPts, kit.ink);
    w.position.set(k.mesh.position.x, 0.25, 0.12);
    w.visible = false;
    local.add(w);
    return w;
  });

  // The thermometer beside the register.
  const thermo = makeThermo(kit, 1.5);
  thermo.group.position.set(1.45, -0.95, 0.08);
  thermo.group.scale.setScalar(0.8);
  local.add(thermo.group);

  // The halo: many thin panels on a wide shell, each facing the star, each faintly glowing.
  const rnd = seeded(23);
  const halo = Array.from({ length: 36 }, () => {
    const p = V(rnd() - 0.5, (rnd() - 0.5) * 0.8, rnd() - 0.5)
      .normalize()
      .multiplyScalar(HALO * (0.92 + rnd() * 0.16));
    const g = new THREE.Group();
    g.position.copy(p);
    g.lookAt(0, 0, 0);
    g.add(makePanel(kit, 3.6, 2.4, -0.5));
    g.visible = false;
    scene.add(g);
    const glow = makeGlow(kit, { r0: 2, r1: 3.2, n: 1, speed: 0.15 });
    glow.group.position.copy(p);
    scene.add(glow.group);
    return { g, glow, d: p.length() * (1 + rnd()) };
  });
  halo.sort((a, b) => a.d - b.d);
  const nearGlow = makeGlow(kit, { r0: 2, r1: 3.2, n: 1, speed: 0.15 });
  nearGlow.group.position.copy(local.position);
  scene.add(nearGlow.group);
  // The whole halo's glow, spreading slowly outward.
  const wideGlow = makeGlow(kit, { r0: HALO * 1.1, r1: HALO * 1.6, n: 3, speed: 0.06 });
  scene.add(wideGlow.group);

  const labels: Label3D[] = [
    { id: "erase", text: "ERASING A BIT", at: W(-SPAN, -0.42, 0.14), dx: -40, dy: 70 },
    { id: "heat", text: "HEAT", at: W(-SPAN + GAP * 2, 0.6, 0.12), dx: -60, dy: -70 },
    { id: "cold", text: "COLDER, CHEAPER", at: W(1.45, -0.95, 0.1), dx: -130, dy: 60 },
    { id: "star", text: "ITS STAR", at: V(0, 2.6, 0), dx: -40, dy: -50 },
    { id: "far", text: "THIN STRUCTURES, FAR OUT", at: W(0, 1.2, 0), dx: 80, dy: -60 },
    { id: "halo", text: "A SLYSH HALO", at: V(-HALO * 0.7, HALO * 0.45, 0), dx: -60, dy: -40 },
    { id: "glow", text: "A FAINT FAR-INFRARED GLOW", at: W(0, -2.2, 0), dx: 40, dy: 70 },
  ];

  const near = narrow ? 1.25 : 1;
  const wide = narrow ? 1.05 : 1;
  let last = 0;

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      const e = eye.get();
      star.update(time, e);
      // The eraser sweeps the row back and forth; keys behind it are written again.
      const ph = (time * 0.22) % 2;
      const x = -SPAN - 0.1 + (ph < 1 ? ph : 2 - ph) * (2 * SPAN + 0.2);
      eraser.position.x = x;
      const dt = Math.min(time - last, 0.1);
      last = time;
      keys.forEach((k, i) => {
        if (k.on && Math.abs(k.mesh.position.x - x) < 0.06) {
          k.on = false;
          k.cleared = time;
        }
        if (!k.on && time - k.cleared > 2.2 && Math.sin(time * 3.1 + i * 2.3) > 0.97 - dt)
          k.on = true;
        k.mesh.position.z = THREE.MathUtils.lerp(k.mesh.position.z, k.on ? 0.12 : -0.03, 0.25);
        const age = time - k.cleared;
        const w = wisps[i];
        w.visible = age >= 0 && age < 1.6;
        if (w.visible) {
          const size = 0.25 + 0.75 * st.temp;
          w.position.y = 0.22 + age * 0.35 * size;
          w.scale.set(size * (1 + age * 0.4), size * (1 - age * 0.25), 1);
        }
      });
      thermo.set(st.temp);
      const n = Math.round(st.halo * halo.length);
      halo.forEach((h, i) => {
        h.g.visible = i < n;
        h.glow.update(time + i * 0.37, i < n ? st.glow : 0, e);
      });
      nearGlow.update(time, st.glow, e);
      wideGlow.update(time, st.glow, e);
    },
    stops: [
      // 1 · Erasing a bit gives off heat.
      (tl, t, c) => {
        tl.addLabel("erase", t);
        eye.set(c.rig);
        tl.set(st, { temp: 1, halo: 0, glow: 0 }, t);
        tl.fromTo(
          kit.clip,
          { constant: -60 },
          { constant: 400, duration: 3, ease: "power1.in" },
          t
        );
        const tg = W(0, 0, 0);
        tl.fromTo(c.rig.target, { ...W(-0.6, 0.2, 0) }, { ...tg, duration: 3, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...D(-2, 0.8, 6.6).multiplyScalar(near) },
          { ...D(1.4, 1.8, 6.2).multiplyScalar(near), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { erase: 1 }, t + 2.2);
        lab(tl, c, { heat: 1 }, t + 3);
      },
      // 2 · Colder, cheaper: the thermometer falls and each wisp shrinks.
      (tl, t, c) => {
        tl.addLabel("colder", t);
        eye.set(c.rig);
        lab(tl, c, { erase: 0 }, t);
        cam(tl, c, W(0.3, -0.1, 0), D(2, 1.6, 5.8).multiplyScalar(near), t, 2, EASE);
        tl.fromTo(st, { temp: 1 }, { temp: 0.12, duration: 3.5, ease: "power1.inOut" }, t + 0.8);
        lab(tl, c, { cold: 1 }, t + 2.4);
      },
      // 3 · Far from the star: the panel is one of many thin structures, spread wide.
      (tl, t, c) => {
        tl.addLabel("far", t);
        eye.set(c.rig);
        tl.set(st, { temp: 0.12 }, t);
        lab(tl, c, { heat: 0, cold: 0 }, t);
        cam(tl, c, V(0, 0, 0), V(30, 26, 92).multiplyScalar(wide), t, 4.2, EASE);
        tl.fromTo(st, { halo: 0 }, { halo: 1, duration: 2.6, ease: "power1.in" }, t + 1.2);
        lab(tl, c, { star: 1 }, t + 3.4);
        lab(tl, c, { far: 1 }, t + 4);
      },
      // 4 · Its heat leaves barely warmer than space: a faint far-infrared glow.
      (tl, t, c) => {
        tl.addLabel("halo", t);
        eye.set(c.rig);
        tl.set(st, { halo: 1, temp: 0.12 }, t);
        lab(tl, c, { far: 0, star: 0 }, t);
        cam(tl, c, V(2, -1, 0), V(20, 38, 118).multiplyScalar(wide), t, 3, EASE);
        tl.fromTo(st, { glow: 0 }, { glow: 1, duration: 2.4, ease: "power1.inOut" }, t + 0.6);
        lab(tl, c, { halo: 1 }, t + 2);
        lab(tl, c, { glow: 1 }, t + 2.8);
      },
    ],
  };
}
