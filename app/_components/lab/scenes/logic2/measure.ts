// Logic figure, Open Problems: the measure of integration.
// Two engraved networks stand on a plinth. Two proposed measures, Φ₁ and Φ₂, raise a
// column for each. The columns differ in height for the same system, and their tie lines
// cross: the two measures rank the systems in opposite orders, so a threshold cannot yet
// be placed. Then the question of level: ions jitter around a membrane, the neuron they
// belong to fires as one, and neurons join a network. Last, a card of code with a loop
// floats over a chip. The loop counts only through the chip, whose cells must act as one.
// Stops tween only `st`, the rig, labels, visibility, and scale.

import * as THREE from "three";
import { type Built3D, cam, dashed, type Label3D, lab, line, V } from "../../tourScenes3d";
import { arrowHead, block, EASE, frame, grow, hidden, rng, rod, setup, tube } from "./measure-util";

const NX = 3.4; // network centres at ±NX
const LX = 17; // the neuron station
const CX = 33; // the chip station

export function measure(narrow = false): Built3D {
  const { kit, scene } = setup();
  const st = { ions: 0, fire: 0, run: 0, tieA: 0, tieB: 0 };

  // ---------- Two systems on a plinth ----------
  scene.add(block(kit, 15, 0.35, 6.2, -0.2));
  const nodeMat = kit.surface(-0.4);
  const linkMat = kit.surface(0.2);
  const network = (pts: THREE.Vector3[], links: [number, number][], at: THREE.Vector3) => {
    const g = hidden(new THREE.Group());
    g.position.copy(at);
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.6, 0.22, 48), kit.surface(0));
    ped.position.y = 0.11;
    g.add(ped);
    for (const p of pts) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), nodeMat);
      s.position.copy(p);
      g.add(s);
    }
    for (const [a, b] of links) {
      const r = rod(0.04, linkMat, 6);
      r.place(pts[a], pts[b]);
      g.add(r.mesh);
    }
    scene.add(g);
    return g;
  };
  // A: a tight knot, every node bound to most others.
  const aPts = [
    V(0, 1.0, 0),
    V(0.75, 1.5, 0.3),
    V(-0.7, 1.6, 0.35),
    V(0.1, 2.3, -0.2),
    V(0.55, 0.85, -0.6),
    V(-0.5, 0.95, -0.55),
    V(0, 1.75, 0.8),
  ];
  const aLinks: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 4],
    [0, 5],
    [1, 3],
    [2, 3],
    [1, 2],
    [4, 5],
    [1, 4],
    [2, 5],
    [3, 4],
    [3, 5],
    [6, 1],
    [6, 2],
    [6, 0],
    [6, 3],
  ];
  // B: a wide ring with a few chords.
  const bPts = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2;
    return V(Math.cos(a) * 1.05, 1.15 + 0.35 * Math.sin(a * 2), Math.sin(a) * 1.05);
  });
  const bLinks: [number, number][] = [
    ...Array.from({ length: 9 }, (_, i) => [i, (i + 1) % 9] as [number, number]),
    [0, 4],
    [2, 7],
    [5, 8],
  ];
  const netA = network(aPts, aLinks, V(-NX, 0.35, 1.3));
  const netB = network(bPts, bLinks, V(NX, 0.35, 1.3));

  // Columns: Φ₁ hatched dark, Φ₂ pale. Each network gets one of each, behind it.
  const m1 = kit.surface(0.4);
  const m2 = kit.surface(-0.5);
  const HA = [3.4, 1.5];
  const HB = [1.7, 3.2];
  const colX = (n: number, k: number) => n + (k === 0 ? -0.65 : 0.65);
  const CZ = -1.4;
  const column = (x: number, h: number, m: THREE.Material) => {
    const c = hidden(block(kit, 0.85, h, 0.85, m));
    c.position.set(x, 0.35, CZ);
    scene.add(c);
    return c;
  };
  const colsA = [column(colX(-NX, 0), HA[0], m1), column(colX(-NX, 1), HA[1], m2)];
  const colsB = [column(colX(NX, 0), HB[0], m1), column(colX(NX, 1), HB[1], m2)];
  const top = (x: number, h: number) => V(x, 0.35 + h + 0.06, CZ);
  const tie1 = tube([top(colX(-NX, 0), HA[0]), top(colX(NX, 0), HB[0])], 0.045, kit.ink, 40);
  const tie2 = tube([top(colX(-NX, 1), HA[1]), top(colX(NX, 1), HB[1])], 0.045, kit.ink, 40);
  tie1.draw(0);
  tie2.draw(0);
  scene.add(tie1.mesh, tie2.mesh);
  // Where the two orders cross.
  const crossT = (HA[0] - HA[1]) / (HA[0] - HA[1] + HB[1] - HB[0]);
  const crossAt = top(colX(-NX, 0), HA[0]).lerp(top(colX(NX, 0), HB[0]), crossT);
  // A threshold that cannot be set: a dashed plane outline at a guessed height.
  const thr = hidden(new THREE.Group());
  {
    const y = 0.35 + 2.45;
    const c = [V(-7, y, -2.6), V(7, y, -2.6), V(7, y, 2.9), V(-7, y, 2.9)];
    for (let i = 0; i < 4; i++) thr.add(dashed(c[i], c[(i + 1) % 4], kit.ink, 0.16));
  }
  scene.add(thr);

  // ---------- Level: ions, a neuron, a network ----------
  const neuron = new THREE.Group();
  neuron.position.set(LX, 2.4, 0);
  scene.add(neuron);
  const cellMat = kit.surface(0.05);
  const soma = new THREE.Mesh(new THREE.SphereGeometry(0.9, 40, 28), cellMat);
  const somaG = hidden(new THREE.Group());
  somaG.add(soma);
  const R = rng(7);
  for (let i = 0; i < 6; i++) {
    const a = Math.PI * 0.55 + (i / 5) * Math.PI * 0.9;
    const tilt = (R() - 0.5) * 0.9;
    const d = V(Math.cos(a), Math.sin(a), tilt).normalize();
    const p0 = d.clone().multiplyScalar(0.8);
    const p1 = d
      .clone()
      .multiplyScalar(1.8)
      .add(V(0, (R() - 0.5) * 0.4, 0));
    const p2 = d
      .clone()
      .multiplyScalar(2.6)
      .add(V((R() - 0.5) * 0.6, (R() - 0.5) * 0.6, 0));
    somaG.add(tube([p0, p1, p2], 0.09, cellMat, 20, 8).mesh);
    const fork = p1.clone().add(V((R() - 0.5) * 0.9, (R() - 0.3) * 0.9, 0.2));
    somaG.add(tube([p1, p1.clone().lerp(fork, 0.5), fork], 0.055, cellMat, 12, 6).mesh);
  }
  const axonPts = [V(0.8, -0.15, 0), V(2.2, -0.45, 0.1), V(3.8, -0.2, 0), V(5.2, -0.5, 0)];
  const axonCurve = new THREE.CatmullRomCurve3(axonPts);
  somaG.add(tube(axonPts, 0.12, cellMat, 40, 10).mesh);
  for (const s of [-1, 0, 1]) {
    const e = V(5.2, -0.5, 0);
    somaG.add(tube([e, e.clone().add(V(0.5, s * 0.45, 0.05))], 0.06, cellMat, 4, 6).mesh);
  }
  neuron.add(somaG);
  // The spike: a bead running down the axon.
  const spike = hidden(new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), kit.ink));
  neuron.add(spike);
  // Ions: small ink beads in a shell around the membrane and the axon.
  const ionGeo = new THREE.SphereGeometry(0.045, 8, 6);
  const ions: { m: THREE.Mesh; base: THREE.Vector3; ph: number; f: number }[] = [];
  const ionG = hidden(new THREE.Group());
  for (let i = 0; i < 170; i++) {
    let base: THREE.Vector3;
    if (i < 110) {
      const u = R() * 2 - 1;
      const a = R() * Math.PI * 2;
      const r = 1.08 + R() * 0.35;
      const s = Math.sqrt(1 - u * u);
      base = V(Math.cos(a) * s * r, u * r, Math.sin(a) * s * r);
    } else {
      const p = axonCurve.getPoint(R());
      const a = R() * Math.PI * 2;
      const r = 0.24 + R() * 0.2;
      base = p.add(V(0, Math.cos(a) * r, Math.sin(a) * r));
    }
    const m = new THREE.Mesh(ionGeo, kit.ink);
    m.position.copy(base);
    ionG.add(m);
    ions.push({ m, base, ph: R() * 6.28, f: 1.5 + R() * 2.5 });
  }
  neuron.add(ionG);
  // Other neurons, smaller, wired to this one into a network.
  const others = [V(LX + 8.2, 3.9, -1.2), V(LX + 8.4, 0.9, -0.6), V(LX - 4.2, 0.6, -1.4)].map(
    (p) => {
      const g = hidden(new THREE.Group());
      g.position.copy(p);
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.55, 28, 20), cellMat));
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + 0.4;
        const d = V(Math.cos(a), Math.sin(a), 0.2).normalize();
        g.add(
          tube([d.clone().multiplyScalar(0.5), d.clone().multiplyScalar(1.3)], 0.06, cellMat, 6, 6)
            .mesh
        );
      }
      scene.add(g);
      return g;
    }
  );
  const end = neuron.position.clone().add(V(5.7, -0.5, 0));
  const wires = hidden(new THREE.Group());
  wires.add(
    tube(
      [
        end,
        end
          .clone()
          .lerp(others[0].position, 0.5)
          .add(V(0, 0.3, 0)),
        others[0].position.clone().add(V(-0.55, 0, 0)),
      ],
      0.035,
      kit.ink,
      30
    ).mesh
  );
  wires.add(tube([end, others[1].position.clone().add(V(-0.55, 0, 0))], 0.035, kit.ink, 20).mesh);
  wires.add(
    tube(
      [
        others[2].position.clone().add(V(0.5, 0.1, 0)),
        neuron.position.clone().add(V(-2.3, -0.9, -0.4)),
        neuron.position.clone().add(V(-0.85, -0.3, 0)),
      ],
      0.035,
      kit.ink,
      30
    ).mesh
  );
  scene.add(wires);

  // ---------- Program and chip ----------
  const chip = hidden(new THREE.Group());
  chip.position.set(CX, 0, 0);
  scene.add(chip);
  const pkg = block(kit, 4.6, 0.4, 4.6, 0.55);
  pkg.position.y = 0.25;
  chip.add(pkg);
  const pinMat = kit.surface(-0.2);
  for (let i = 0; i < 9; i++) {
    const o = -1.9 + (i * 3.8) / 8;
    for (const [x, z, w, d] of [
      [o, 2.55, 0.16, 0.5],
      [o, -2.55, 0.16, 0.5],
      [2.55, o, 0.5, 0.16],
      [-2.55, o, 0.5, 0.16],
    ]) {
      const pin = block(kit, w, 0.08, d, pinMat);
      pin.position.set(x, 0.3, z);
      chip.add(pin);
    }
  }
  const die = block(kit, 3, 0.12, 3, -0.3);
  die.position.y = 0.65;
  chip.add(die);
  const cells: THREE.Vector3[] = [];
  const cellBlockMat = kit.surface(0.15);
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const c = block(kit, 0.5, 0.16, 0.5, cellBlockMat);
      c.position.set(-1.05 + i * 0.7, 0.77, -1.05 + j * 0.7);
      chip.add(c);
      cells.push(c.position.clone().add(V(CX, 0.16, 0)));
    }
  // Links that would make the cells act as one: arcs both ways across the die, dashed.
  const bonds = hidden(new THREE.Group());
  const arc = (a: THREE.Vector3, b: THREE.Vector3, h: number) => {
    const pts = Array.from({ length: 17 }, (_, i) => {
      const u = i / 16;
      return a
        .clone()
        .lerp(b, u)
        .add(V(0, Math.sin(u * Math.PI) * h, 0));
    });
    for (let i = 0; i + 1 < pts.length; i += 2) bonds.add(line([pts[i], pts[i + 1]], kit.ink));
  };
  for (const [a, b, h] of [
    [0, 15, 0.9],
    [3, 12, 0.9],
    [1, 6, 0.35],
    [6, 11, 0.35],
    [11, 14, 0.35],
    [4, 9, 0.35],
    [9, 2, 0.35],
    [7, 13, 0.45],
    [8, 5, 0.3],
    [10, 15, 0.3],
  ] as [number, number, number][])
    arc(cells[a], cells[b], h);
  scene.add(bonds);
  // A card of code above, with a loop arrow from its last line back to its first.
  const card = hidden(new THREE.Group());
  card.position.set(CX - 0.4, 4.4, 0.2);
  card.rotation.x = -0.18;
  scene.add(card);
  card.add(block(kit, 3.2, 2.2, 0.08, -0.6).translateY(-1.1));
  const codeLines: THREE.Vector3[] = [];
  [2.2, 1.6, 1.9, 1.3, 1.7, 2.0].forEach((w, i) => {
    const y = 0.8 - i * 0.3;
    const x0 = -1.25 + (i > 0 && i < 5 ? 0.3 : 0);
    codeLines.push(V(x0, y, 0.05), V(x0 + w * 0.85, y, 0.05));
  });
  card.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(codeLines), kit.ink));
  // Runs from the last line (bottom) round the left edge to the first (top).
  const loopPts = Array.from({ length: 33 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 32) * Math.PI;
    return V(-1.4 - Math.cos(a) * 0.5, 0.05 + Math.sin(a) * 0.75, 0.06);
  });
  const loopCurve = new THREE.CatmullRomCurve3(loopPts);
  card.add(tube(loopPts, 0.03, kit.ink, 40).mesh);
  card.add(
    arrowHead(kit, loopPts[loopPts.length - 1].clone().add(V(0.08, 0, 0)), V(1, 0, 0), 0.18)
  );
  const loopBead = hidden(new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 10), kit.ink));
  card.add(loopBead);
  // Only through the chip: dashed drops from the card's corners to the die.
  const drops = hidden(new THREE.Group());
  for (const [x, z] of [
    [-1.5, -1.5],
    [1.5, -1.5],
    [-1.5, 1.5],
    [1.5, 1.5],
  ])
    drops.add(
      dashed(V(CX + x * 0.9 - 0.4, 3.0, z * 0.25 + 0.4), V(CX + x, 0.72, z), kit.soft, 0.1)
    );
  scene.add(drops);

  const s = narrow ? 0.6 : 1;
  const labels: Label3D[] = [
    { id: "a", text: "ONE SYSTEM", at: V(-NX + 1.4, 0.5, 2.1), dx: -40 * s, dy: 60 },
    { id: "b", text: "ANOTHER", at: V(NX - 1.4, 0.5, 2.1), dx: 40 * s, dy: 60 },
    {
      id: "p1",
      text: "Φ₁",
      italic: true,
      at: top(colX(-NX, 0), HA[0]).add(V(-0.3, -0.3, 0.4)),
      dx: -50 * s,
      dy: -30,
    },
    {
      id: "p2",
      text: "Φ₂",
      italic: true,
      at: top(colX(-NX, 1), HA[1]).add(V(0.3, -0.3, 0.4)),
      dx: 40 * s,
      dy: -40,
    },
    { id: "cross", text: "OPPOSITE ORDERS", at: crossAt, dx: 0, dy: -80 },
    { id: "thr", text: "THRESHOLD?", at: V(7, 2.8, 0.3), dx: 40 * s, dy: 40 },
    {
      id: "ions",
      text: "IONS",
      at: neuron.position.clone().add(V(-0.95, 0.75, 0.6)),
      dx: -70 * s,
      dy: -50,
    },
    {
      id: "fires",
      text: "A NEURON FIRES",
      at: neuron.position.clone().add(axonCurve.getPoint(0.6)),
      dx: 40 * s,
      dy: 60,
    },
    {
      id: "net",
      text: "NEURONS, A NETWORK",
      at: others[0].position.clone().add(V(0, 0.55, 0)),
      dx: -40 * s,
      dy: -50,
    },
    { id: "loop", text: "A LOOP IN THE CODE", at: V(CX - 2.35, 4.3, 0.3), dx: -60 * s, dy: -50 },
    {
      id: "through",
      text: "ONLY THROUGH THE CHIP",
      at: V(CX + 1.25, 1.85, 0.95),
      dx: 80 * s,
      dy: -30,
    },
    { id: "one", text: "ITS PARTS AS ONE", at: V(CX - 1.5, 0.85, 1.6), dx: -50 * s, dy: 60 },
  ];

  const k = narrow ? 1.05 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 2.1, 0);
  const tmp = V(0, 0, 0);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      tie1.draw(st.tieA);
      tie2.draw(st.tieB);
      if (ionG.visible) {
        for (const io of ions) {
          io.m.position.set(
            io.base.x + Math.sin(time * io.f + io.ph) * 0.07,
            io.base.y + Math.cos(time * io.f * 1.3 + io.ph) * 0.07,
            io.base.z + Math.sin(time * io.f * 0.8 + io.ph * 2) * 0.07
          );
        }
        ionG.scale.setScalar(st.ions);
      }
      spike.visible = st.fire > 0.01;
      if (spike.visible) {
        spike.position.copy(axonCurve.getPoint(0.15 + 0.85 * ((time * 0.45) % 1)));
        spike.scale.setScalar(st.fire);
      }
      loopBead.visible = st.run > 0.01;
      if (loopBead.visible) loopBead.position.copy(loopCurve.getPoint((time * 0.4) % 1, tmp));
    },
    stops: [
      // 1 · Two systems, and two measures that give the same system different values.
      (tl, t, c) => {
        tl.addLabel("systems", t);
        tl.fromTo(
          kit.clip,
          { constant: -0.2 },
          { constant: 4.5, duration: 1.8, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 1.9);
        frame(
          tl,
          c,
          { t: V(0, 1, 1), o: view(-5, 4, 14) },
          { t: home, o: view(0, 5.2, 17.5) },
          t,
          3
        );
        grow(tl, netA, t + 0.8, 0.8, "all", "back.out(1.4)");
        grow(tl, netB, t + 1.1, 0.8, "all", "back.out(1.4)");
        lab(tl, c, { a: 1, b: 1 }, t + 2);
        grow(tl, colsA[0], t + 3, 1.1);
        grow(tl, colsA[1], t + 3.3, 1.1);
        lab(tl, c, { p1: 1, p2: 1 }, t + 4);
      },
      // 2 · The same two measures rank the systems in opposite orders. No threshold holds.
      (tl, t, c) => {
        tl.addLabel("rankings", t);
        lab(tl, c, { a: 0, b: 0 }, t);
        cam(tl, c, V(0, 2.4, 0), view(1.5, 3.6, 17.5), t, 2.4, EASE);
        grow(tl, colsB[0], t + 0.6, 1.1);
        grow(tl, colsB[1], t + 0.9, 1.1);
        tl.fromTo(st, { tieA: 0 }, { tieA: 1, duration: 1.2, ease: "power1.inOut" }, t + 2.2);
        tl.fromTo(st, { tieB: 0 }, { tieB: 1, duration: 1.2, ease: "power1.inOut" }, t + 2.6);
        lab(tl, c, { cross: 1 }, t + 3.6);
        grow(tl, thr, t + 4.6, 0.8, "x");
        lab(tl, c, { thr: 1 }, t + 5.2);
      },
      // 3 · Level: ions move, the neuron fires as one, neurons join a network.
      (tl, t, c) => {
        tl.addLabel("level", t);
        lab(tl, c, { p1: 0, p2: 0, cross: 0, thr: 0 }, t);
        tl.set(st, { tieA: 1, tieB: 1 }, t);
        cam(tl, c, neuron.position.clone().add(V(0, 0.2, 0)), view(-1.5, 1.2, 7), t, 2.6, EASE);
        tl.set(ionG, { visible: true }, t + 1.6);
        tl.fromTo(st, { ions: 0.001 }, { ions: 1, duration: 0.6, ease: "power2.out" }, t + 1.6);
        lab(tl, c, { ions: 1 }, t + 2);
        grow(tl, somaG, t + 2.8, 1, "all", "power2.out");
        tl.fromTo(st, { fire: 0 }, { fire: 1, duration: 0.5, ease: "back.out(2)" }, t + 3.8);
        lab(tl, c, { fires: 1 }, t + 4);
        cam(tl, c, V(LX + 2.4, 2.3, -0.5), view(-1, 2.2, 17.5), t + 5, 2.4, EASE);
        others.forEach((o, i) => grow(tl, o, t + 5.6 + i * 0.2, 0.7, "all", "back.out(1.4)"));
        grow(tl, wires, t + 6.4, 0.6, "all");
        lab(tl, c, { net: 1 }, t + 7);
      },
      // 4 · A program counts only through the chip that runs it.
      (tl, t, c) => {
        tl.addLabel("chip", t);
        lab(tl, c, { ions: 0, fires: 0, net: 0 }, t);
        tl.set(st, { ions: 1, fire: 1 }, t);
        cam(tl, c, V(CX, 2.2, 0), view(3, 6.5, 13), t, 2.8, EASE);
        grow(tl, card, t + 1.4, 0.8, "all", "back.out(1.4)");
        tl.fromTo(st, { run: 0 }, { run: 1, duration: 0.4 }, t + 2.2);
        lab(tl, c, { loop: 1 }, t + 2.4);
        grow(tl, chip, t + 3.2, 0.8, "all", "power2.out");
        tl.set(drops, { visible: true }, t + 4.1);
        lab(tl, c, { through: 1 }, t + 4.3);
        tl.set(bonds, { visible: true }, t + 5.4);
        lab(tl, c, { one: 1 }, t + 5.8);
      },
    ],
  };
}
