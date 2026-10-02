// Logic figures for the Claims and Axioms sections.
// claimsMap: the framework as a stepped dais. The two additions stand on the raised
// center; sides taken, method, hypothesis, open problems, and companions ring it, each
// tier lower than the last. When the outer tiers fall, the center stands.
// axiomMap: five axioms as pillars. Two are additions, three are sides taken; four share
// a plinth as the core, and Axiom 2 forks into the two versions. Propositions rest on
// links up from the pillars they follow from, and tests sit at the top.

import * as THREE from "three";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  makeIris,
  V,
} from "../../tourScenes3d";
import { annulus, block, EASE, frame, grow, rod, setup, tone } from "./util";

export function claimsMap(narrow = false): Built3D {
  const { kit, scene } = setup();

  // Tiers from the center out: radius in, radius out, height, tone.
  const tiers = [
    { id: "sides", r0: 1.25, r1: 2.0, h: 0.5, t: 0 },
    { id: "method", r0: 2.15, r1: 2.7, h: 0.36, t: 0.1 },
    { id: "hyp", r0: 2.85, r1: 3.3, h: 0.24, t: 0.3 },
    { id: "open", r0: 3.45, r1: 3.85, h: 0.15, t: 0.3 },
    { id: "comp", r0: 4.15, r1: 4.6, h: 0.08, t: 0.45 },
  ];
  const core = annulus(kit, 0, 1.1, 0.75, -0.3);
  core.visible = false;
  scene.add(core);
  const rings = tiers.map((tier) => {
    const g = new THREE.Group();
    if (tier.id === "open") {
      // Open problems: a ring with gaps, unfinished.
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        g.add(annulus(kit, tier.r0, tier.r1, tier.h, tier.t, a, ((Math.PI * 2) / 7) * 0.72));
      }
    } else {
      g.add(annulus(kit, tier.r0, tier.r1, tier.h, tier.t));
    }
    g.visible = false;
    scene.add(g);
    return g;
  });
  // A faint ground circle so the dais has somewhere to stand.
  scene.add(
    line(
      circlePts(5.2, 128).map((p) => V(p.x, 0, p.y)),
      kit.soft,
      true
    )
  );

  // On the center: the threshold, an aperture opening, and Omega, the whole.
  const iris = makeIris(kit, 0.17);
  iris.group.position.set(-0.42, 1.18, 0.15);
  iris.setOpen(0);
  iris.group.visible = false;
  scene.add(iris.group);
  const globe = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI;
    globe.add(
      line(
        circlePts(0.36, 48).map((p) => V(p.x * Math.cos(a), p.y, p.x * Math.sin(a))),
        kit.ink,
        true
      )
    );
  }
  globe.add(
    line(
      circlePts(0.36, 48).map((p) => V(p.x, 0, p.y)),
      kit.ink,
      true
    )
  );
  globe.position.set(0.48, 1.15, 0.1);
  globe.visible = false;
  scene.add(globe);

  const st = { open: 0, spin: 0 };
  const at = (r: number, h: number, deg: number) => {
    const a = THREE.MathUtils.degToRad(deg);
    return V(Math.cos(a) * r, h, Math.sin(a) * r);
  };
  const mid = (i: number) => (tiers[i].r0 + tiers[i].r1) / 2;
  const s = narrow ? 0.7 : 1;
  const labels: Label3D[] = [
    { id: "thr", text: "THRESHOLD", at: iris.group.position, dx: -90 * s, dy: -70 },
    { id: "omega", text: "OMEGA", at: V(0.48, 1.5, 0.1), dx: 70 * s, dy: -60 },
    { id: "sides", text: "SIDES TAKEN", at: at(mid(0), 0.5, 150), dx: -120 * s, dy: -40 },
    { id: "method", text: "METHOD", at: at(mid(1), 0.36, 25), dx: 110 * s, dy: -30 },
    { id: "hyp", text: "HYPOTHESIS", at: at(mid(2), 0.24, 130), dx: -110 * s, dy: 30 },
    { id: "open", text: "OPEN PROBLEMS", at: at(mid(3), 0.15, 50), dx: 110 * s, dy: 40 },
    { id: "comp", text: "COMPANIONS", at: at(mid(4), 0.08, 105), dx: -60 * s, dy: 40 },
    { id: "stands", text: "THE CORE STANDS", at: V(0, 0.75, 0.9), dx: 0, dy: 70 },
  ];

  const view = { t: V(0, 0.4, 0), o: V(0, 7, 10.5).multiplyScalar(narrow ? 1.02 : 1) };
  const wide = { t: V(0, 0, 0.3), o: V(0, 8.4, 12.6) };
  const close = { t: V(0, 0.9, 0), o: V(0, 3.2, 6.5) };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      iris.setOpen(st.open);
      globe.rotation.y = time * 0.25;
    },
    stops: [
      // 1 · The two additions on the raised center.
      (tl, t, c) => {
        tl.addLabel("additions", t);
        frame(tl, c, { t: V(0, 0.6, 0), o: V(2, 5, 9) }, close, t, 2.6);
        grow(tl, core, t + 0.3, 1.2);
        tl.set(iris.group, { visible: true }, t + 1.2);
        tl.fromTo(st, { open: 0 }, { open: 0.9, duration: 1, ease: "back.out(2)" }, t + 1.4);
        grow(tl, globe, t + 1.6, 0.9, "all", "back.out(1.4)");
        lab(tl, c, { thr: 1, omega: 1 }, t + 2.4);
      },
      // 2 · Sides taken ring the center.
      (tl, t, c) => {
        tl.addLabel("sides", t);
        lab(tl, c, { thr: 0, omega: 0 }, t);
        cam(tl, c, view.t, view.o, t, 2.4, EASE);
        grow(tl, rings[0], t + 0.8, 1.2);
        lab(tl, c, { sides: 1 }, t + 2);
      },
      // 3 · Then the method.
      (tl, t, c) => {
        tl.addLabel("method", t);
        grow(tl, rings[1], t + 0.2, 1.2);
        lab(tl, c, { method: 1 }, t + 1.2);
      },
      // 4 · A hypothesis, and open problems.
      (tl, t, c) => {
        tl.addLabel("open", t);
        cam(tl, c, wide.t, wide.o, t, 2.4, EASE);
        grow(tl, rings[2], t + 0.2, 1.1);
        lab(tl, c, { hyp: 1 }, t + 1.1);
        grow(tl, rings[3], t + 1.4, 1.1);
        lab(tl, c, { open: 1 }, t + 2.3);
      },
      // 5 · Companions at the edge.
      (tl, t, c) => {
        tl.addLabel("companions", t);
        grow(tl, rings[4], t + 0.2, 1.1);
        lab(tl, c, { comp: 1 }, t + 1.1);
      },
      // 6 · The hypothesis and the companions fall away. The core stands.
      (tl, t, c) => {
        tl.addLabel("stands", t);
        lab(tl, c, { sides: 0, method: 0, open: 0 }, t);
        for (const i of [2, 4]) {
          tl.to(rings[i].position, { y: -0.9, duration: 1.4, ease: "power2.in" }, t + 0.4);
          tone(tl, (rings[i].children[0] as THREE.Mesh).material as THREE.Material, 0.9, t + 0.4);
        }
        lab(tl, c, { hyp: 0, comp: 0 }, t + 1.4);
        cam(tl, c, V(0, 0.1, 0.2), V(0, 7.2, 11.4), t + 0.4, 2.4, EASE);
        lab(tl, c, { stands: 1 }, t + 2.4);
      },
    ],
  };
}

// ---------- Axioms ----------

const NAMES = ["RELATIONALITY", "CONSERVATION", "THRESHOLD", "TWO SIDES", "TOTALITY"];
const ADD = -0.5; // clean paper: an addition to physics
const SIDE = 0.55; // hatched: a side taken

export function axiomMap(narrow = false): Built3D {
  const { kit, scene } = setup();
  const X = [-4, -2, 0, 2, 4];
  const H = 2.2;
  const PLINTH = 0.4;

  const ground = block(kit, 12, 0.12, 6, 0.1);
  ground.position.set(0, -0.12, 1);
  scene.add(ground);
  const plinth = block(kit, 10.4, PLINTH, 2, -0.2);
  plinth.visible = false;
  scene.add(plinth);

  // Pillars 1, 3, 4, 5 are single blocks. Pillar 2 is two halves that read as one until it forks.
  const pillarMats = X.map(() => kit.surface(0));
  const halfMats = [kit.surface(0), kit.surface(0)];
  const pillars = X.map((x, i) => {
    const g = new THREE.Group();
    g.position.set(x, 0, 0);
    if (i === 1) {
      for (const k of [0, 1]) {
        const half = block(kit, 0.5, H, 1, halfMats[k]);
        half.position.x = k === 0 ? -0.25 : 0.25;
        g.add(half);
      }
    } else {
      g.add(block(kit, 1, H, 1, pillarMats[i]));
    }
    g.visible = false;
    scene.add(g);
    return g;
  });
  const halves = pillars[1].children as THREE.Mesh[];
  // The fork: two struts down to one footing in front.
  const footing = block(kit, 1.3, 0.5, 1.1, 0.2);
  footing.position.set(-2, 0, 2.6);
  footing.visible = false;
  scene.add(footing);

  // Propositions hang above, linked to the axioms they follow from.
  const PY = 4;
  const PZ = -1.6;
  const props = [
    { id: "p1", text: "I", x: -4.4, from: [V(-4, H + PLINTH, 0)] },
    { id: "p3", text: "III", x: -2.2, from: [V(-4, H + PLINTH, 0), V(-2.55, H, 2.6)] },
    { id: "p2", text: "II", x: 2.3, from: [V(0.2, H + PLINTH, 0), V(2, H + PLINTH, 0)] },
    { id: "p4", text: "IV", x: 4.6, from: [] },
  ];
  const propObjs = props.map((p) => {
    const g = new THREE.Group();
    const b = block(kit, 1.3, 0.7, 0.9, p.id === "p4" ? 0.5 : -0.2);
    b.position.set(p.x, PY, PZ);
    g.add(b);
    for (const f of p.from) {
      const r = rod(0.03, kit.ink);
      r.place(f, V(p.x, PY, PZ));
      g.add(r.mesh);
    }
    g.visible = false;
    scene.add(g);
    return g;
  });
  // Tests at the top: Check C from Proposition III, Tests A and B from the threshold.
  const TY = 6.2;
  const tests = [
    { id: "tc", text: "CHECK C", x: -2.2, z: PZ, from: V(-2.2, PY + 0.7, PZ) },
    { id: "ta", text: "TEST A", x: -0.5, z: 0, from: V(-0.2, H + PLINTH, 0) },
    { id: "tb", text: "TEST B", x: 0.6, z: 0, from: V(0.2, H + PLINTH, 0) },
  ];
  const testObjs = tests.map((tt) => {
    const g = new THREE.Group();
    const dial = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.42, 0.18, 32),
      kit.surface(-0.4)
    );
    dial.position.set(tt.x, TY, tt.z);
    g.add(dial);
    const needle = rod(0.025, kit.ink);
    needle.place(V(tt.x, TY + 0.1, tt.z), V(tt.x + 0.25, TY + 0.1, tt.z - 0.2));
    g.add(needle.mesh);
    const r = rod(0.025, kit.ink);
    r.place(tt.from, V(tt.x, TY - 0.09, tt.z));
    g.add(r.mesh);
    g.visible = false;
    scene.add(g);
    return g;
  });

  const top = (i: number, lift = 0) => V(X[i], H + 0.05 + lift, 0);
  const sh = narrow ? 0.6 : 1;
  const labels: Label3D[] = [
    ...NAMES.map((n, i) => ({
      id: `n${i}`,
      text: `${i + 1} ${n}`,
      at: top(i),
      dx: 0,
      dy: i % 2 === 0 ? -34 : -66,
    })),
    ...X.map((_, i) => ({
      id: `k${i}`,
      text: `${i + 1}`,
      at: V(X[i], H * 0.62 + (i === 1 ? 0 : PLINTH), 0.5),
      dx: 0,
      dy: 0,
      italic: true,
    })),
    { id: "add", text: "ADDITIONS", at: V(4, 1.2, 0.5), dx: 70 * sh, dy: 70 },
    { id: "sides", text: "SIDES TAKEN", at: V(-4, 1.2, 0.5), dx: -60 * sh, dy: 70 },
    { id: "core", text: "THE CORE", at: V(3.2, PLINTH, 1), dx: 60 * sh, dy: 60 },
    { id: "without", text: "WITHOUT COLLAPSE", at: V(-2.9, 2.2, 2.6), dx: -90 * sh, dy: -30 },
    { id: "with", text: "WITH COLLAPSE", at: V(-1.1, 2.2, 2.6), dx: 30 * sh, dy: 80 },
    ...props.map((p) => ({
      id: p.id,
      text: p.text,
      at: V(p.x, PY + 0.7, PZ),
      dx: 0,
      dy: -22,
      italic: true,
    })),
    { id: "method", text: "METHOD", at: V(4.6, PY, PZ), dx: 0, dy: 44 },
    ...tests.map((tt) => ({
      id: tt.id,
      text: tt.text,
      at: V(tt.x, TY + 0.1, tt.z),
      dx: tt.id === "tb" ? 20 : tt.id === "ta" ? -20 : 0,
      dy: tt.id === "tc" ? -28 : -44,
    })),
  ];
  const nameOff = Object.fromEntries(NAMES.map((_, i) => [`n${i}`, 0]));
  const numsOn = (v: number) => Object.fromEntries(X.map((_, i) => [`k${i}`, v]));

  const k = narrow ? 1.12 : 1;
  const row = { t: V(0, 1.4, 0.6), o: V(0, 3.2 * k, 13.5 * k) };
  const front = { t: V(0, 1.2, 1.2), o: V(0, 6.5 * k, 13.5 * k) };
  const tall = { t: V(0, 3.2, 0.8), o: V(0, 4.2 * k, 16.5 * k) };

  return {
    scene,
    kit,
    labels,
    update: () => {},
    stops: [
      // 1 · Five pillars rise.
      (tl, t, c) => {
        tl.addLabel("axioms", t);
        frame(tl, c, { t: V(0, 1, 0), o: V(-4, 6, 13) }, row, t, 2.8);
        pillars.forEach((p, i) => {
          grow(tl, p, t + 0.4 + i * 0.25, 1);
        });
        lab(
          tl,
          c,
          narrow ? numsOn(1) : Object.fromEntries(NAMES.map((_, i) => [`n${i}`, 1])),
          t + 2
        );
      },
      // 2 · Two additions in clean paper, three sides taken hatched.
      (tl, t, c) => {
        tl.addLabel("additions", t);
        lab(tl, c, { ...nameOff, ...numsOn(1) }, t);
        for (const i of [2, 4]) tone(tl, pillarMats[i], ADD, t + 0.6);
        for (const i of [0, 3]) tone(tl, pillarMats[i], SIDE, t + 0.6);
        for (const m of halfMats) tone(tl, m, SIDE, t + 0.6);
        lab(tl, c, { add: 1, sides: 1 }, t + 1.6);
      },
      // 3 · Axiom 2 steps out; the other four share the core.
      (tl, t, c) => {
        tl.addLabel("core", t);
        lab(tl, c, { add: 0, sides: 0, k1: 0 }, t);
        cam(tl, c, front.t, front.o, t, 2.4, EASE);
        tl.to(pillars[1].position, { z: 2.6, duration: 1.4, ease: "power2.inOut" }, t + 0.3);
        lab(tl, c, { k1: 1 }, t + 1.8);
        grow(tl, plinth, t + 1.4, 0.9);
        for (const i of [0, 2, 3, 4])
          tl.fromTo(
            pillars[i].position,
            { y: 0 },
            { y: PLINTH, duration: 0.9, ease: "power2.out" },
            t + 1.4
          );
        lab(tl, c, { core: 1 }, t + 2.3);
      },
      // 4 · Axiom 2 forks into the two versions.
      (tl, t, c) => {
        tl.addLabel("fork", t);
        lab(tl, c, { core: 0 }, t);
        grow(tl, footing, t + 0.2, 0.6);
        tl.to(pillars[1].position, { y: 0.5, duration: 0.6, ease: "power2.out" }, t + 0.2);
        tl.to(halves[0].position, { x: -0.42, duration: 1.4, ease: "power2.inOut" }, t + 0.6);
        tl.to(halves[1].position, { x: 0.42, duration: 1.4, ease: "power2.inOut" }, t + 0.6);
        tl.to(halves[0].rotation, { z: 0.2, duration: 1.4, ease: "power2.inOut" }, t + 0.6);
        tl.to(halves[1].rotation, { z: -0.2, duration: 1.4, ease: "power2.inOut" }, t + 0.6);
        tone(tl, halfMats[0], ADD, t + 1.2);
        tone(tl, halfMats[1], 0.85, t + 1.2);
        lab(tl, c, { without: 1, with: 1 }, t + 2);
      },
      // 5 · Propositions follow from the axioms.
      (tl, t, c) => {
        tl.addLabel("propositions", t);
        lab(tl, c, { without: 0, with: 0 }, t);
        cam(tl, c, tall.t, tall.o, t, 2.4, EASE);
        propObjs.forEach((p, i) => {
          grow(tl, p, t + 0.8 + i * 0.3, 0.8, "all", "back.out(1.4)");
        });
        lab(tl, c, { p1: 1, p2: 1, p3: 1, p4: 1 }, t + 2.2);
        lab(tl, c, { method: 1 }, t + 2.6);
      },
      // 6 · Tests at the top, where claims can lose.
      (tl, t, c) => {
        tl.addLabel("tests", t);
        lab(tl, c, { method: 0 }, t);
        cam(tl, c, V(0, 3.8, 0.8), V(0, 4.2 * k, 18.5 * k), t, 2, EASE);
        testObjs.forEach((g, i) => {
          grow(tl, g, t + 0.5 + i * 0.3, 0.8, "all", "back.out(1.4)");
        });
        lab(tl, c, { ta: 1, tb: 1, tc: 1 }, t + 1.8);
      },
    ],
  };
}
