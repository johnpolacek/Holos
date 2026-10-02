// Figure on the Logic page: decoherence is not presence, and a click is a record.
// Left: a small system's wave passes two slits and ripples an engraved sheet; the screen
// shows fringes. Particles of the surroundings drift in and are tied to it by ink threads,
// the ripple passes into them, and the fringes flatten. What is left is a consistent,
// classical-looking structure, hatched as unlit, with no aperture anywhere.
// Right: a field spread through space with one small ripple. The ripple spreads out to a
// row of detectors and the row splits into branches, each holding one click.
// Stops tween only `st`, the rig, labels, visibility, and tone uniforms.

import type gsap from "gsap";
import * as THREE from "three";
import { EASE } from "../../figures3d";
import { type Built3D, cam, circlePts, type Label3D, lab, line, V } from "../../tourScenes3d";
import { rng, rod, setup, xyz } from "./decoherence-util";

// The two-slit sheet.
const SX0 = -3; // barrier
const SX1 = 3; // screen
const SZ = 2; // half depth
const SLIT = 0.8; // slits at z = ±SLIT
const K = 14; // wave number
const W = 3; // angular speed
const A = 0.14; // ripple height

// The field, off to the right.
const FX = 17;
const F0 = -4.6; // field extent in x, relative to FX
const F1 = 2.8;
const FZ = 2.6;
const ORIGIN = V(FX - 1.6, 0, 0); // where the quantum sits
const DX = FX + 3.5; // the detector row
const DET_Z = [-2, -1, 0, 1, 2];
const CLICKS = [2, 0, 4, 1, 3]; // which detector clicks in each branch
const RING_MAX = DX - 0.35 - ORIGIN.x;

export function decoherence(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { c: 1, env: 0, thread: 0, quantum: 0, spread: 0, split: 0, click: 0 };
  const rand = rng(11);

  // ---------- The small system and its two slits ----------
  const sysMat = kit.surface(0.1);
  const source = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 16), sysMat);
  source.position.set(SX0 - 1.4, 0.3, 0);
  scene.add(source);
  const barrierMat = kit.surface(0.25);
  const gap = 0.14;
  const pieces: [number, number][] = [
    [-SZ, -SLIT - gap],
    [-SLIT + gap, SLIT - gap],
    [SLIT + gap, SZ],
  ];
  for (const [z0, z1] of pieces) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.8, z1 - z0), barrierMat);
    b.position.set(SX0 - 0.08, 0.4, (z0 + z1) / 2);
    scene.add(b);
  }

  // The rippled sheet: heights recomputed each frame, so its shading and creases move.
  const sheetMat = kit.surface(0);
  const sheetGeo = new THREE.PlaneGeometry(SX1 - SX0, SZ * 2, 120, 80);
  sheetGeo.rotateX(-Math.PI / 2);
  sheetGeo.translate((SX0 + SX1) / 2, 0, 0);
  const sheetPos = sheetGeo.attributes.position as THREE.BufferAttribute;
  const sheet = new THREE.Mesh(sheetGeo, sheetMat);
  scene.add(sheet);
  scene.add(
    line(
      [V(SX0, 0, -SZ), V(SX1, 0, -SZ), V(SX1, 0, SZ), V(SX0, 0, SZ)].map((p) =>
        p.add(V(0, -0.02, 0))
      ),
      kit.soft,
      true
    )
  );
  const wave = (x: number, z: number, t: number, phase = 0) => {
    const r1 = Math.hypot(x - SX0, z + SLIT);
    const r2 = Math.hypot(x - SX0, z - SLIT);
    const w1 = Math.cos(K * r1 - W * t) / Math.sqrt(1 + 0.9 * r1);
    const w2 = Math.cos(K * r2 - W * t + phase) / Math.sqrt(1 + 0.9 * r2);
    return w1 + w2;
  };

  // The screen and its fringes: bars whose heights follow the intensity at the screen.
  const screenMat = kit.surface(0.15);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.5, SZ * 2), screenMat);
  screen.position.set(SX1 + 0.12, 0.75, 0);
  scene.add(screen);
  const bars = Array.from({ length: 57 }, (_, i) => {
    const z = -SZ + 0.08 + (i / 56) * (SZ * 2 - 0.16);
    const g = new THREE.BoxGeometry(0.03, 1, 0.035);
    g.translate(0, 0.5, 0);
    const m = new THREE.Mesh(g, kit.ink);
    m.position.set(SX1 + 0.02, 0.08, z);
    scene.add(m);
    const r1 = Math.hypot(SX1 - SX0, z + SLIT);
    const r2 = Math.hypot(SX1 - SX0, z - SLIT);
    return { m, z, delta: K * (r1 - r2), env: Math.exp(-(z * z) / (2 * 1.5 * 1.5)) };
  });

  // ---------- The surroundings: particles that drift in and get tied to the system ----------
  const envMat = kit.surface(0.2);
  const particles = Array.from({ length: 13 }, (_, i) => {
    const home = V(SX0 + 0.6 + rand() * 5.2, 0.55 + rand() * 0.9, -SZ + 0.3 + rand() * 3.4);
    const out = home
      .clone()
      .setY(0)
      .normalize()
      .multiplyScalar(4)
      .add(V(0, 1.2 + rand(), 0));
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.09 + rand() * 0.05, 16, 12), envMat);
    m.visible = false;
    scene.add(m);
    return { m, home, from: home.clone().add(out), phase: i * 1.3 };
  });
  const threadGeo = new THREE.BufferGeometry().setFromPoints(
    particles.flatMap(() => [V(0, 0, 0), V(0, 0, 0)])
  );
  const threads = new THREE.LineSegments(threadGeo, kit.ink);
  threads.frustumCulled = false;
  scene.add(threads);

  // No aperture: a soft outline where one would be, neither open nor there.
  const ghost = new THREE.Group();
  ghost.add(line(circlePts(0.32), kit.soft, true));
  ghost.add(line(circlePts(0.42), kit.soft, true));
  ghost.add(
    line(
      Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.26;
        return V(Math.cos(a) * 0.15, Math.sin(a) * 0.15, 0);
      }),
      kit.soft,
      true
    )
  );
  ghost.position.set(0.4, 2.3, 0.6);
  ghost.rotation.y = -0.3;
  ghost.visible = false;
  scene.add(ghost);

  // ---------- The field ----------
  const fieldMat = kit.surface(-0.5);
  const fieldGeo = new THREE.PlaneGeometry(F1 - F0, FZ * 2, 110, 70);
  fieldGeo.rotateX(-Math.PI / 2);
  fieldGeo.translate(FX + (F0 + F1) / 2, 0, 0);
  const fieldPos = fieldGeo.attributes.position as THREE.BufferAttribute;
  scene.add(new THREE.Mesh(fieldGeo, fieldMat));
  // Soft grid lines riding the field.
  const gridLines: { geo: THREE.BufferGeometry; pts: THREE.Vector3[] }[] = [];
  const addGrid = (pts: THREE.Vector3[]) => {
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const l = new THREE.Line(geo, kit.soft);
    l.frustumCulled = false;
    scene.add(l);
    gridLines.push({ geo, pts });
  };
  for (let i = 0; i <= 12; i++) {
    const z = -FZ + (i / 12) * FZ * 2;
    addGrid(Array.from({ length: 90 }, (_, j) => V(FX + F0 + ((F1 - F0) * j) / 89, 0, z)));
  }
  for (let i = 0; i <= 17; i++) {
    const x = FX + F0 + (i / 17) * (F1 - F0);
    addGrid(Array.from({ length: 60 }, (_, j) => V(x, 0, -FZ + (FZ * 2 * j) / 59)));
  }
  const fieldH = (x: number, z: number, t: number) => {
    let h = 0.05 * Math.sin(1.3 * (x - FX) + 0.9 * t) * Math.cos(1.1 * z - 0.6 * t);
    const r = Math.hypot(x - ORIGIN.x, z - ORIGIN.z);
    // The quantum: one small ripple, breathing in place.
    const q = st.quantum * (1 - st.spread);
    if (q > 0) h += q * 0.32 * Math.exp(-(r * r) / 0.25) * Math.cos(7 * r - 4 * t);
    // Spread out: the same excitation as a ring running out to the detectors.
    if (st.spread > 0) {
      const rho = st.spread * RING_MAX;
      const d = r - rho;
      h += Math.min(st.spread * 6, 1) * 0.2 * Math.exp(-(d * d) / 0.1) * Math.cos(9 * d - 4 * t);
    }
    return h;
  };

  // ---------- Detectors and branches ----------
  // Each branch is a whole detector row; in each, one detector holds a click.
  const detMat = kit.surface(0.2);
  const branches = CLICKS.map((hit, k) => {
    const g = new THREE.Group();
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 5), detMat);
    rail.position.set(0, 0.06, 0);
    g.add(rail);
    for (const z of DET_Z) {
      const d = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.5, 20), detMat);
      d.position.set(0, 0.37, z);
      g.add(d);
    }
    const mark = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.04, 20), kit.ink);
    mark.position.set(0, 0.63, DET_Z[hit]);
    mark.scale.setScalar(0.001);
    g.add(mark);
    g.position.set(DX, 0, 0);
    g.visible = k === 0;
    scene.add(g);
    const thread = rod(0.022, kit.ink);
    thread.mesh.visible = false;
    scene.add(thread.mesh);
    return { g, mark, hit, thread, lift: V(0.5 * k, 0.95 * k, 0) };
  });

  const labels: Label3D[] = [
    { id: "sys", text: "A SMALL SYSTEM", at: source.position, dx: -30, dy: -60 },
    { id: "fringes", text: "INTERFERENCE", at: V(SX1, 1.4, 0), dx: 60, dy: -50 },
    { id: "env", text: "SURROUNDINGS", at: particles[0].home, dx: -70, dy: -60 },
    { id: "tied", text: "ENTANGLED", at: particles[4].home, dx: 50, dy: 70 },
    { id: "flat", text: "FRINGES GONE", at: V(SX1, 0.8, 0.5), dx: 70, dy: -60 },
    { id: "classical", text: "CLASSICAL-LOOKING", at: V(-0.8, 0, 1.6), dx: -60, dy: 60 },
    { id: "nobody", text: "NO APERTURE", at: ghost.position, dx: 70, dy: -40 },
    { id: "field", text: "A FIELD, ALL OF SPACE", at: V(FX + F0, 0, FZ), dx: -20, dy: 50 },
    { id: "quantum", text: "ONE QUANTUM", at: ORIGIN.clone().add(V(0, 0.3, 0)), dx: -40, dy: -70 },
    { id: "spread", text: "SPREAD OUT", at: V(FX + 1.2, 0.1, 1.6), dx: -40, dy: 70 },
    { id: "det", text: "DETECTORS", at: V(DX, 0.6, 2), dx: 50, dy: 60 },
    {
      id: "click",
      text: "ONE CLICK PER BRANCH",
      at: V(DX + 0.5 * 4, 0.95 * 4 + 0.63, DET_Z[CLICKS[4]]),
      dx: -50,
      dy: -40,
    },
  ];

  const k = narrow ? 0.92 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const slitHome = V(-0.3, 0.2, 0);
  const slitView = view(-3.6, 5.6, 9.2);
  const fieldHome = narrow ? V(FX + 0.6, 0.6, 0) : V(FX + 0.3, 0.4, 0);
  const fieldView = view(-1.5, 6.5, 10.5);
  const tmp = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      // The sheet: two slit waves, their sum fading as the interference leaks away.
      const amp = A * (0.2 + 0.8 * st.c);
      for (let i = 0; i < sheetPos.count; i++) {
        const x = sheetPos.getX(i);
        const z = sheetPos.getZ(i);
        sheetPos.setY(i, amp * wave(x, z, time));
      }
      sheetPos.needsUpdate = true;
      sheetGeo.computeVertexNormals();
      for (const b of bars) {
        const I = b.env * (1 + st.c * Math.cos(b.delta));
        b.m.scale.y = 0.04 + 0.55 * I;
      }
      // The surroundings drift in and take up the ripple.
      const tpos = threadGeo.attributes.position as THREE.BufferAttribute;
      particles.forEach((p, i) => {
        p.m.visible = st.env > 0;
        p.m.position.copy(p.from).lerp(p.home, st.env);
        const shake = (1 - st.c) * 0.14 * Math.sin(time * W * 1.3 + p.phase);
        p.m.position.y += shake;
        p.m.position.x += (1 - st.c) * 0.05 * Math.cos(time * 4.1 + p.phase);
        const below = V(p.home.x, amp * wave(p.home.x, p.home.z, time), p.home.z);
        tmp.copy(p.m.position).lerp(below, st.thread);
        tpos.setXYZ(i * 2, p.m.position.x, p.m.position.y, p.m.position.z);
        tpos.setXYZ(i * 2 + 1, tmp.x, tmp.y, tmp.z);
      });
      tpos.needsUpdate = true;
      threads.visible = st.thread > 0;

      // The field.
      for (let i = 0; i < fieldPos.count; i++) {
        fieldPos.setY(i, fieldH(fieldPos.getX(i), fieldPos.getZ(i), time));
      }
      fieldPos.needsUpdate = true;
      fieldGeo.computeVertexNormals();
      for (const g of gridLines) {
        const pos = g.geo.attributes.position as THREE.BufferAttribute;
        g.pts.forEach((p, j) => {
          pos.setY(j, fieldH(p.x, p.z, time) + 0.02);
        });
        pos.needsUpdate = true;
      }

      // Branches rise out of the one row; threads run from the quantum to each click.
      branches.forEach((b, i) => {
        if (i > 0) {
          b.g.visible = st.split > 0;
          b.g.position.set(DX, 0, 0).addScaledVector(b.lift, st.split);
        }
        b.mark.scale.setScalar(Math.max(st.click, 0.001));
        const end = V(0, 0.63, DET_Z[b.hit]).add(b.g.position);
        tmp.copy(ORIGIN).lerp(end, st.click);
        b.thread.place(ORIGIN, tmp);
        if (st.click <= 0) b.thread.mesh.visible = false;
      });
    },
    stops: [
      // 1 · Interference: a small system passes both slits, and the sheet and screen ripple.
      (tl, t, c) => {
        tl.addLabel("interference", t);
        tl.set(st, { c: 1, env: 0, thread: 0 }, t);
        tl.fromTo(kit.clip, { constant: SX0 - 2 }, { constant: SX1 + 1, duration: 2.4 }, t);
        tl.set(kit.clip, { constant: 100 }, t + 2.5);
        tl.fromTo(
          c.rig.target,
          { x: -2, y: 0, z: 0 },
          { ...xyz(slitHome), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-6, 2.5, 7)) },
          { ...xyz(slitView), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { sys: 1 }, t + 1.2);
        lab(tl, c, { fringes: 1 }, t + 2.6);
      },
      // 2 · Leaking out: the surroundings drift in, get tied to the system, and the
      // interference passes into them. The fringes flatten.
      (tl, t, c) => {
        tl.addLabel("leaking", t);
        lab(tl, c, { sys: 0, fringes: 0 }, t);
        cam(tl, c, V(0, 0.4, 0), view(-2.6, 6.2, 9.6), t, 2.4, EASE);
        tl.to(st, { env: 1, duration: 1.8, ease: "power2.out" }, t + 0.4);
        lab(tl, c, { env: 1 }, t + 1.6);
        tl.to(st, { thread: 1, duration: 1.2, ease: "power1.inOut" }, t + 2);
        lab(tl, c, { env: 0, tied: 1 }, t + 3);
        tl.to(st, { c: 0, duration: 2.6, ease: "power1.inOut" }, t + 2.8);
        lab(tl, c, { flat: 1 }, t + 4.8);
      },
      // 3 · Not presence: a consistent classical-looking structure, unlit, no aperture.
      (tl, t, c) => {
        tl.addLabel("structure", t);
        lab(tl, c, { tied: 0, flat: 0 }, t);
        tl.set(st, { c: 0, env: 1, thread: 1 }, t);
        cam(tl, c, V(0, 0.8, 0), view(-4, 6.4, 9.4), t, 2.6, EASE);
        for (const m of [sheetMat, screenMat, barrierMat, envMat, sysMat]) {
          tl.to(m.uniforms.tone, { value: 0.6, duration: 1.4, ease: "power1.inOut" }, t + 0.8);
        }
        lab(tl, c, { classical: 1 }, t + 2.2);
        tl.set(ghost, { visible: true }, t + 2.8);
        lab(tl, c, { nobody: 1 }, t + 3.2);
      },
      // 4 · A field spread through all of space, and one quantum, its smallest ripple.
      (tl, t, c) => {
        tl.addLabel("field", t);
        lab(tl, c, { classical: 0, nobody: 0 }, t);
        cam(tl, c, fieldHome, fieldView, t, 3, EASE);
        lab(tl, c, { field: 1 }, t + 2.4);
        tl.to(st, { quantum: 1, duration: 1.4, ease: "power2.out" }, t + 2.6);
        lab(tl, c, { quantum: 1 }, t + 3.4);
      },
      // 5 · Detectors: the excitation spreads out, the row splits into branches, and each
      // branch holds one click at its own place.
      (tl, t, c) => {
        tl.addLabel("clicks", t);
        lab(tl, c, { field: 0, quantum: 0 }, t);
        tl.set(st, { quantum: 1 }, t);
        cam(
          tl,
          c,
          narrow ? V(FX + 2.2, 1.8, 0) : V(FX + 1.6, 1.4, 0),
          view(-4.5, 6, 12.5),
          t,
          2.6,
          EASE
        );
        lab(tl, c, { det: 1 }, t + 1);
        tl.to(st, { spread: 1, duration: 2.4, ease: "none" }, t + 1.2);
        lab(tl, c, { spread: 1 }, t + 2.2);
        lab(tl, c, { det: 0, spread: 0 }, t + 3.6);
        tl.to(st, { split: 1, duration: 1.8, ease: EASE }, t + 3.6);
        tl.to(st, { click: 1, duration: 1.2, ease: "power2.out" }, t + 4.8);
        lab(tl, c, { click: 1 }, t + 5.6);
      },
    ],
  };
}
