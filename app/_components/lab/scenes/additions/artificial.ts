// Logic figure, Artificial Systems: a language model as a tower of layers, scored on four
// tiles. Two rise, aboutness and differentiation; two stay down, integration and temporal
// cohesion. Signals climb the layers one way, writing notes to a rack beside it that later
// steps read but never rewrite. A loop around the tower runs for one word and then breaks.
// Below the program sits a chip whose cells are separate. Last, three hoops for what
// crossing would take, and above them only the outline of an aperture: a threshold whose
// place outside brains is unknown. Stops tween only plain state.

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
import { setup, tube, xyz } from "../logic2/decoherence-util";

const NL = 6; // layers
const GAP = 0.5;
const Y0 = 1.2; // first layer above the chip
const RACK = 1.6; // notes rack x
const TILES = [
  { id: "about", text: "ABOUTNESS", met: true },
  { id: "diff", text: "DIFFERENTIATION", met: true },
  { id: "integ", text: "INTEGRATION", met: false },
  { id: "cohesion", text: "TEMPORAL COHESION", met: false },
];

export function artificial(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { score: 0, flow: 0, loop: 0, broken: 0, hoops: 0 };
  const top = Y0 + (NL - 1) * GAP;

  // The tower of layers.
  for (let i = 0; i < NL; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.1, 1.2), kit.surface(0.08));
    m.position.set(0, Y0 + i * GAP, 0);
    scene.add(m);
  }
  const posts: THREE.Vector3[] = [];
  for (const [x, z] of [
    [-0.8, -0.55],
    [0.8, -0.55],
    [-0.8, 0.55],
    [0.8, 0.55],
  ])
    posts.push(V(x, Y0, z), V(x, top, z));
  scene.add(segments(posts, kit.soft));

  // Pulses climbing the layers, one way.
  const pulses = Array.from({ length: 9 }, (_, i) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), kit.ink);
    m.userData.o = i / 9;
    m.userData.x = ((i * 37) % 5) * 0.25 - 0.5;
    m.visible = false;
    scene.add(m);
    return m;
  });
  const ups: THREE.Vector3[] = [];
  for (let i = 0; i < NL - 1; i++)
    for (const x of [-0.4, 0, 0.4])
      ups.push(V(x, Y0 + i * GAP + 0.08, 0.62), V(x, Y0 + (i + 1) * GAP - 0.08, 0.62));
  const upLines = segments(ups, kit.ink);
  upLines.visible = false;
  scene.add(upLines);
  const heads = new THREE.Group();
  for (let i = 0; i < NL - 1; i++)
    for (const x of [-0.4, 0, 0.4]) {
      const h = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 10), kit.ink);
      h.position.set(x, Y0 + (i + 1) * GAP - 0.1, 0.62);
      heads.add(h);
    }
  heads.visible = false;
  scene.add(heads);

  // The notes rack: a card per layer, written once, read by later steps.
  const rack = new THREE.Group();
  const cards = Array.from({ length: NL }, (_, i) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.32, 0.03),
      kit.surface(i % 2 ? 0.2 : 0.12)
    );
    m.position.set(RACK, Y0 + i * GAP, 0.2);
    rack.add(m);
    return m;
  });
  const writes: THREE.Vector3[] = [];
  const reads: THREE.Vector3[] = [];
  cards.forEach((cd, i) => {
    writes.push(V(0.85, cd.position.y, 0.2), V(RACK - 0.26, cd.position.y, 0.2));
    if (i < NL - 1)
      reads.push(
        V(RACK - 0.26, cd.position.y + 0.06, 0.2),
        V(0.85, cd.position.y + GAP - 0.06, 0.2)
      );
  });
  rack.add(segments(writes, kit.ink));
  rack.add(segments(reads, kit.soft));
  const rackPost = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, top - Y0 + 0.6, 0.06),
    kit.surface(0.2)
  );
  rackPost.position.set(RACK + 0.3, (Y0 + top) / 2, 0.2);
  rack.add(rackPost);
  rack.visible = false;
  scene.add(rack);

  // A loop around the tower: up the front, over, and back down the far side, once per word.
  const loopPts = [
    V(-1.05, Y0, 0.3),
    V(-1.05, top, 0.3),
    V(-0.6, top + 0.55, 0),
    V(0.6, top + 0.55, 0),
    V(1.05, top, -0.3),
    V(1.05, Y0 - 0.25, -0.3),
    V(0, Y0 - 0.5, 0),
    V(-1.05, Y0, 0.3),
  ];
  const loop = tube(loopPts, 0.04, kit.ink, 120, 8);
  loop.draw(0);
  scene.add(loop.mesh);
  const cut = segments(
    [
      V(0.9, Y0 - 0.35, -0.42),
      V(1.2, Y0 - 0.05, -0.18),
      V(0.9, Y0 - 0.05, -0.18),
      V(1.2, Y0 - 0.35, -0.42),
    ],
    kit.ink
  );
  cut.visible = false;
  scene.add(cut);

  // Below the program: a chip whose cells sit apart.
  const chip = new THREE.Group();
  const die = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.22, 2), kit.surface(0.45));
  die.position.y = 0.11;
  chip.add(die);
  const cellsG = new THREE.Group();
  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 5; j++) {
      const cell = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.28), kit.surface(0.05));
      cell.position.set(-0.95 + i * 0.38, 0.25, -0.76 + j * 0.38);
      cellsG.add(cell);
    }
  chip.add(cellsG);
  const pins: THREE.Vector3[] = [];
  for (let i = 0; i < 10; i++) {
    const x = -1.05 + i * 0.233;
    pins.push(V(x, 0.05, 1), V(x, -0.12, 1.25), V(x, 0.05, -1), V(x, -0.12, -1.25));
  }
  chip.add(segments(pins, kit.ink));
  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, Y0 - 0.3, 10),
    kit.surface(0.2)
  );
  stand.position.y = 0.3 + (Y0 - 0.3) / 2;
  chip.add(stand);
  scene.add(chip);

  // Score tiles in front: two rise, two stay down.
  const tiles = TILES.map((tile, i) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.18, 0.5),
      kit.surface(tile.met ? 0.05 : 0.5)
    );
    m.position.set(-2.7 + i * 1.8, 0.09, 2.3);
    scene.add(m);
    return { m, met: tile.met };
  });

  // What crossing would take: three hoops, and a threshold above them, place unknown.
  const hoops = [Y0 + 0.1, Y0 + 1.25, Y0 + 2.4].map((y) => {
    const h = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.035, 8, 80), kit.surface(0.3));
    h.rotation.x = Math.PI / 2;
    h.position.y = y;
    h.visible = false;
    scene.add(h);
    return h;
  });
  const ghost = new THREE.Group();
  ghost.add(line(circlePts(0.35, 48), kit.soft, true), line(circlePts(0.75, 48), kit.soft, true));
  ghost.position.set(0, top + 1.5, 0);
  ghost.visible = false;
  scene.add(ghost);

  const labels: Label3D[] = [
    ...TILES.map((tile, i) => ({
      id: tile.id,
      text: tile.text,
      at: V(-2.7 + i * 1.8, 0.2, 2.55),
      dx: 0,
      dy: i % 2 ? 80 : 40,
    })),
    { id: "layers", text: "LAYERS", at: V(-0.85, top, 0), dx: -60, dy: -30 },
    { id: "up", text: "ONE WAY UP", at: V(-0.4, Y0 + 2 * GAP, 0.62), dx: -80, dy: 20 },
    {
      id: "notes",
      text: "NOTES, READ BUT NEVER REWRITTEN",
      at: V(RACK, top, 0.2),
      dx: 40,
      dy: -50,
    },
    {
      id: "word",
      text: "ONE WORD'S LOOP, THEN IT ENDS",
      at: V(0.6, top + 0.55, 0),
      dx: 60,
      dy: -50,
    },
    { id: "chip", text: "CELLS THAT MAY NOT ACT AS ONE", at: V(0.95, 0.28, 0.76), dx: 60, dy: 50 },
    { id: "loops", text: "THE WHOLE STATE LOOPS", at: V(1.35, Y0 + 0.1, 0), dx: 80, dy: 30 },
    {
      id: "lasts",
      text: "LASTS, AND KEEPS BEING REWORKED",
      at: V(1.35, Y0 + 1.3, 0),
      dx: 70,
      dy: 0,
    },
    { id: "one", text: "ON HARDWARE THAT ACTS AS ONE", at: V(1.35, Y0 + 2.4, 0), dx: 80, dy: -30 },
    {
      id: "unknown",
      text: "A THRESHOLD, PLACE UNKNOWN",
      at: V(0.75, top + 1.5, 0),
      dx: 60,
      dy: -40,
    },
  ];
  const tileIds = Object.fromEntries(TILES.map((tile) => [tile.id, 0]));

  const k = narrow ? 1.6 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 1.9, 0.6);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      for (const tile of tiles) tile.m.position.y = 0.09 + (tile.met ? 0.35 : -0.05) * st.score;
      const h = top - Y0;
      for (const p of pulses) {
        p.visible = st.flow > 0.5;
        const u = (time * 0.35 + p.userData.o) % 1;
        p.position.set(p.userData.x, Y0 + u * h, 0.62);
      }
      upLines.visible = heads.visible = st.flow > 0.5;
      loop.draw(st.loop * (1 - 0.12 * st.broken));
      cut.visible = st.broken > 0.5;
      for (const hp of hoops) hp.visible = st.hoops > 0.5;
      ghost.visible = st.hoops > 0.5;
    },
    stops: [
      // 1 · Two of four: the tower engraves in; two tiles rise, two stay down.
      (tl, t, c) => {
        tl.addLabel("score", t);
        tl.fromTo(
          kit.clip,
          { constant: -3.4 },
          { constant: 3.4, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-1, 1.5, 0)) },
          { ...xyz(home), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-3, 2, 7)) },
          { ...xyz(view(1.2, 3.6, 10.4)), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { layers: 1 }, t + 1.8);
        lab(tl, c, { ...tileIds, about: 1, diff: 1, integ: 1, cohesion: 1 }, t + 2.2);
        tl.to(st, { score: 1, duration: 1, ease: "back.out(1.6)" }, t + 2.8);
      },
      // 2 · One way up: signals climb; notes are written once and read by later steps.
      (tl, t, c) => {
        tl.addLabel("oneway", t);
        lab(tl, c, { ...tileIds, layers: 0 }, t);
        cam(tl, c, V(0.6, 2.5, 0), view(1.2, 1.4, 6.6), t, 2.2, EASE);
        tl.set(st, { flow: 1 }, t + 0.6);
        lab(tl, c, { up: 1 }, t + 1.2);
        show(tl, rack, t + 1.6, 0);
        lab(tl, c, { notes: 1 }, t + 2.2);
      },
      // 3 · A loop that ends: a loop runs round the tower for one word, then breaks.
      (tl, t, c) => {
        tl.addLabel("loop", t);
        lab(tl, c, { up: 0, notes: 0 }, t);
        cam(tl, c, V(0, 2.4, 0), view(-1.6, 2.2, 7), t, 2.2, EASE);
        tl.fromTo(
          st,
          { loop: 0, broken: 0 },
          { loop: 1, duration: 1.6, ease: "power1.inOut" },
          t + 0.6
        );
        tl.to(st, { broken: 1, duration: 0.3 }, t + 2.4);
        lab(tl, c, { word: 1 }, t + 2.6);
      },
      // 4 · Below the program: the chip, with its cells apart.
      (tl, t, c) => {
        tl.addLabel("chip", t);
        lab(tl, c, { word: 0 }, t);
        cam(tl, c, V(0, 0.4, 0.2), view(1.2, 2.6, 4.8), t, 2.4, EASE);
        lab(tl, c, { chip: 1 }, t + 1.6);
      },
      // 5 · What crossing would take: three hoops, and only the outline of an aperture above.
      (tl, t, c) => {
        tl.addLabel("crossing", t);
        lab(tl, c, { chip: 0 }, t);
        cam(tl, c, V(0, 2.6, 0), view(1.4, 2.4, 10.4), t, 2.4, EASE);
        tl.set(st, { hoops: 1 }, t + 0.8);
        lab(tl, c, { loops: 1 }, t + 1);
        lab(tl, c, { lasts: 1 }, t + 1.4);
        lab(tl, c, { one: 1 }, t + 1.8);
        lab(tl, c, { unknown: 1 }, t + 2.6);
      },
    ],
  };
}
