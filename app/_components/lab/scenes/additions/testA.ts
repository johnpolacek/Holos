// Predictions figure, Test A: experience tracks integration, not behavior. States stand as
// pegs on a board. Across the board runs responsiveness; a peg's height is integration.
// At the bedside only responsiveness is read, a line between those who respond and those
// presumed not to be conscious. Then the heights rise: ketamine and REM sleep stand tall at
// the unresponsive end, sleepwalking and automatisms stay short at the responsive end. A
// plane marks the PCI cutoff. Held-out states, named in advance, stand as outlines whose
// height is not yet known. Last, the bet: reported experience follows height, not side.
// Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  segments,
  show,
  V,
} from "../../tourScenes3d";
import { setup, xyz } from "../logic2/decoherence-util";

const BX = 3.4; // half width of the board
const BZ = 2.2;
const CUT = 1.2; // the cutoff plane's height

type Peg = { id: string; text: string; x: number; z: number; h: number };
const KNOWN: Peg[] = [
  { id: "waking", text: "WAKING", x: 2.5, z: -1.1, h: 2.2 },
  { id: "rem", text: "REM SLEEP", x: -2.5, z: -1.2, h: 1.9 },
  { id: "ketamine", text: "KETAMINE", x: -1.4, z: 0.7, h: 1.75 },
  { id: "walk", text: "SLEEPWALKING", x: 1.3, z: 1.2, h: 0.55 },
  { id: "auto", text: "AUTOMATISMS", x: 2.6, z: 0.5, h: 0.6 },
];
const HELD: { id: string; text: string; x: number; z: number }[] = [
  { id: "nrem", text: "NON-REM DREAMS", x: -0.5, z: -1.6 },
  { id: "sedation", text: "DEEP SEDATION", x: -2.7, z: 1.5 },
  { id: "covert", text: "COVERT AWARENESS", x: -0.4, z: 1.6 },
  { id: "psy", text: "PSYCHEDELICS", x: 0.6, z: -0.3 },
];

export function testA(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { rise: 0, cut: 0, held: 0, reports: 0 };

  // The board, with responsiveness along it and the bedside line across the middle.
  const board = new THREE.Mesh(new THREE.BoxGeometry(2 * BX, 0.14, 2 * BZ), kit.surface(0.04));
  board.position.y = -0.07;
  scene.add(board);
  scene.add(line([V(-BX, 0.004, BZ + 0.35), V(BX, 0.004, BZ + 0.35)], kit.ink));
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 12), kit.ink);
  head.rotation.z = -Math.PI / 2;
  head.position.set(BX + 0.05, 0.004, BZ + 0.35);
  scene.add(head);
  const bedside = segments(
    Array.from({ length: 16 }, (_, i) => {
      const z0 = -BZ + (i / 16) * 2 * BZ;
      return [V(0, 0.006, z0), V(0, 0.006, z0 + (BZ * 2) / 32)];
    }).flat(),
    kit.ink
  );
  scene.add(bedside);

  // Known states: pegs whose height is integration.
  const pegMat = kit.surface(0.12);
  const pegs = KNOWN.map((p) => {
    const g = new THREE.Group();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1, 28), pegMat);
    m.position.y = 0.5;
    g.add(m);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.06, 28), kit.surface(0.3));
    g.add(cap);
    g.position.set(p.x, 0, p.z);
    scene.add(g);
    return { g, m, cap, h: p.h };
  });

  // The PCI cutoff: a thin plane across the board.
  const plane = new THREE.Group();
  // Drawn as an outline rather than a sheet, so the pegs below stay in view.
  plane.add(
    line([V(-BX, 0.01, -BZ), V(BX, 0.01, -BZ), V(BX, 0.01, BZ), V(-BX, 0.01, BZ)], kit.ink, true)
  );
  plane.position.y = CUT;
  plane.visible = false;
  scene.add(plane);

  // Held-out states: outlined pegs with flags, height unknown.
  const held = HELD.map((p) => {
    const g = new THREE.Group();
    for (const y of [0.02, 0.9, 1.8])
      g.add(
        line(
          circlePts(0.2, 32).map((q) => V(q.x, y, q.y)),
          kit.soft,
          true
        )
      );
    g.add(segments([V(0.2, 0, 0), V(0.2, 1.8, 0), V(-0.2, 0, 0), V(-0.2, 1.8, 0)], kit.soft));
    const flagpole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.6, 6),
      kit.surface(0.2)
    );
    flagpole.position.set(0, 2.1, 0);
    g.add(flagpole);
    const flag = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.015), kit.surface(0.5));
    flag.position.set(0.16, 2.3, 0);
    g.add(flag);
    g.position.set(p.x, 0, p.z);
    g.visible = false;
    scene.add(g);
    return g;
  });

  // Reported experience: a halo over each peg that clears the cutoff.
  const halos = KNOWN.map((p) => {
    const g = new THREE.Group();
    g.add(line(circlePts(0.22, 40), kit.ink, true));
    const rays: THREE.Vector3[] = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      rays.push(
        V(Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0),
        V(Math.cos(a) * 0.42, Math.sin(a) * 0.42, 0)
      );
    }
    g.add(segments(rays, kit.ink));
    g.position.set(p.x, p.h + 0.55, p.z);
    g.visible = false;
    scene.add(g);
    return { g, lit: p.h > CUT };
  });

  const labels: Label3D[] = [
    { id: "resp", text: "RESPONSIVENESS", at: V(BX - 0.4, 0, BZ + 0.35), dx: -30, dy: 40 },
    { id: "responds", text: "RESPONDS", at: V(1.6, 0, -BZ), dx: 30, dy: -40 },
    { id: "presumed", text: "PRESUMED NOT CONSCIOUS", at: V(-1.6, 0, -BZ), dx: -40, dy: -40 },
    {
      id: "integ",
      text: "HEIGHT IS INTEGRATION",
      at: V(KNOWN[0].x, KNOWN[0].h, KNOWN[0].z),
      dx: 70,
      dy: -40,
    },
    ...KNOWN.slice(1).map((p, i) => ({
      id: p.id,
      text: p.text,
      at: V(p.x, p.h, p.z),
      dx: [-50, -60, 60, 60][i],
      dy: [-40, -50, -30, 30][i],
    })),
    { id: "cutoff", text: "PCI CUTOFF, 0.31", at: V(-BX, CUT, BZ), dx: -40, dy: 40 },
    {
      id: "held",
      text: "HELD OUT, NAMED IN ADVANCE",
      at: V(HELD[2].x, 2.4, HELD[2].z),
      dx: 40,
      dy: -50,
    },
    {
      id: "reports",
      text: "REPORTS FOLLOW HEIGHT",
      at: V(KNOWN[2].x, KNOWN[2].h + 0.8, KNOWN[2].z),
      dx: -60,
      dy: -50,
    },
  ];
  const ids = labels.map((l) => l.id);
  const none = Object.fromEntries(ids.map((id) => [id, 0]));

  const k = narrow ? 1.6 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 0.9, 0);

  return {
    scene,
    kit,
    labels,
    update: () => {
      pegs.forEach((p) => {
        const h = 0.05 + (p.h - 0.05) * st.rise;
        p.m.scale.y = h;
        p.m.position.y = h / 2;
        p.cap.position.y = h;
      });
      plane.visible = st.cut > 0.5;
      for (const g of held) g.visible = st.held > 0.5;
      for (const h of halos) h.g.visible = st.reports > 0.5 && h.lit;
    },
    stops: [
      // 1 · The bedside proxy: the board engraves in; only responsiveness is read.
      (tl, t, c) => {
        tl.addLabel("proxy", t);
        tl.fromTo(
          kit.clip,
          { constant: -BX - 0.5 },
          { constant: BX + 0.5, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-1, 0.4, 0)) },
          { ...xyz(V(0, 0.4, 0)), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-2, 7, 5)) },
          { ...xyz(view(0, 8, 8)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { resp: 1 }, t + 1.8);
        lab(tl, c, { responds: 1, presumed: 1 }, t + 2.4);
      },
      // 2 · They come apart: heights rise, and integration parts from responsiveness.
      (tl, t, c) => {
        tl.addLabel("apart", t);
        lab(tl, c, { responds: 0, presumed: 0 }, t);
        cam(tl, c, home, view(1.4, 4.2, 9.4), t, 2.4, EASE);
        tl.fromTo(st, { rise: 0 }, { rise: 1, duration: 1.6, ease: "power2.out" }, t + 0.6);
        lab(tl, c, { integ: 1 }, t + 1.6);
        lab(tl, c, { rem: 1, ketamine: 1, walk: 1, auto: 1 }, t + 2.2);
      },
      // 3 · The gauge: a plane at the PCI cutoff.
      (tl, t, c) => {
        tl.addLabel("gauge", t);
        lab(tl, c, { rem: 0, walk: 0, auto: 0, integ: 0 }, t);
        cam(tl, c, home, view(-1.6, 3.4, 9.6), t, 2.4, EASE);
        tl.set(st, { cut: 1 }, t + 0.8);
        lab(tl, c, { cutoff: 1 }, t + 1.2);
      },
      // 4 · Held out: states named in advance, height not yet known.
      (tl, t, c) => {
        tl.addLabel("held", t);
        lab(tl, c, { ketamine: 0 }, t);
        cam(tl, c, home, view(0.6, 5, 9.4), t, 2.4, EASE);
        tl.set(st, { held: 1 }, t + 0.8);
        held.forEach((g, i) => {
          show(tl, g, t + 0.8 + i * 0.15, 0.5);
        });
        lab(tl, c, { held: 1 }, t + 1.8);
      },
      // 5 · The bet: reports appear over the tall pegs, on either side of the bedside line.
      (tl, t, c) => {
        tl.addLabel("bet", t);
        lab(tl, c, { ...none, cutoff: 1 }, t);
        cam(tl, c, home, view(1.2, 4.2, 9.6), t, 2.4, EASE);
        tl.set(st, { reports: 1 }, t + 1);
        lab(tl, c, { reports: 1, walk: 1 }, t + 1.6);
      },
    ],
  };
}
