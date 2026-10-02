// Figure on the Logic page, A path to the threshold: transitions leave fingerprints.
// First, triangulation. Four different instruments sight one mark on an engraved scale,
// and the proposals that disagreed fall away. Then a row of raised plates. A dial turns
// a cut freely until a step in the curve fixes it. A sudden transition shows a lag, its
// way down and way back at different doses, and a marker runs the loop. A continuous one
// shows swings that grow larger and slower near the boundary. In a finite system either
// appears as a rounded step, the rounding hatched as the twilight, narrower as systems grow.
// Stops tween only `st`, the rig, labels, visibility, scale, and tones.

import * as THREE from "three";
import { type Built3D, cam, type Label3D, lab, segments, V } from "../../tourScenes3d";
import {
  arrowHead,
  block,
  EASE,
  frame,
  grow,
  hidden,
  makePlate,
  rod,
  sample,
  setup,
  sig,
  tone,
  tube,
} from "./fingerprints-util";

const X0 = -11; // the triangulation station
const W = 6; // plot width on each plate
const H = 3.2; // plot height
const GAP = 9; // between plate centres
const LIFT = 0.9; // plot origin above the ground

export function fingerprints(narrow = false): Built3D {
  const { kit, scene } = setup();
  const st = {
    sight: [0, 0, 0, 0],
    free: 0,
    dial: 0,
    loop: 0,
    run: 0,
    trace: 0,
    stepA: 0,
    stepB: 0,
  };

  // ---------- Triangulation ----------
  const station = new THREE.Group();
  station.position.x = X0;
  scene.add(station);
  station.add(block(kit, 7.6, 0.2, 1.1, -0.3));
  const ticks: THREE.Vector3[] = [];
  for (let i = 0; i <= 32; i++) {
    const x = -3.6 + (7.2 * i) / 32;
    const len = i % 4 === 0 ? 0.42 : 0.2;
    ticks.push(V(x, 0.202, 0.55), V(x, 0.202, 0.55 - len));
  }
  station.add(segments(ticks, kit.ink));
  const TX = 0.7;
  const T = V(TX, 0.22, 0.05);
  const Tw = T.clone().add(V(X0, 0, 0));

  // The value they converge on: a clean bead in an inked ring.
  const value = hidden(new THREE.Group());
  value.position.copy(T);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.025, 8, 48), kit.ink);
  ring.rotation.x = Math.PI / 2;
  value.add(ring);
  const bead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 14), kit.surface(-0.7));
  bead.position.y = 0.08;
  value.add(bead);
  station.add(value);

  // Proposals that disagreed: hatched pegs standing at other marks.
  const pegMat = kit.surface(0.45);
  const pegs = [-2.7, -1.5, 2.0, 3.0].map((x) => {
    const g = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.7, 10), pegMat);
    stem.position.y = 0.35;
    g.add(stem);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), pegMat);
    head.position.y = 0.76;
    g.add(head);
    g.position.set(x, 0.2, 0.05);
    station.add(g);
    return g;
  });

  // Four different instruments, each aimed at the same mark from its own side.
  const instMat = kit.surface(0.1);
  const barrelMat = kit.surface(0.25);
  const inst = [
    { at: V(-3.4, 0, -2.4), h: 1.2, kind: "tripod" },
    { at: V(3.9, 0, -2.2), h: 1.5, kind: "drum" },
    { at: V(-2.6, 0, 2.4), h: 0.75, kind: "box" },
    { at: V(3.6, 0, 2.2), h: 1.0, kind: "lens" },
  ].map((d) => {
    const g = new THREE.Group();
    g.position.copy(d.at);
    if (d.kind === "tripod") {
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * Math.PI * 2 + 0.4;
        const leg = rod(0.03, instMat);
        leg.place(V(Math.cos(a) * 0.4, 0, Math.sin(a) * 0.4), V(0, d.h - 0.1, 0));
        g.add(leg.mesh);
      }
    } else if (d.kind === "drum") {
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, d.h - 0.15, 28), instMat);
      drum.position.y = (d.h - 0.15) / 2;
      g.add(drum);
    } else if (d.kind === "box") {
      g.add(block(kit, 0.9, d.h - 0.12, 0.6, instMat));
    } else {
      g.add(block(kit, 0.5, d.h - 0.3, 0.5, instMat));
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 12), instMat);
      lens.position.y = d.h - 0.15;
      g.add(lens);
    }
    // The barrel points at the mark; its mouth is where the sight line leaves.
    const base = d.at.clone().add(V(0, d.h, 0));
    const dir = T.clone().sub(base).normalize();
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.8, 14), barrelMat);
    barrel.position.set(0, d.h, 0).addScaledVector(dir, 0.15);
    barrel.quaternion.setFromUnitVectors(V(0, 1, 0), dir);
    g.add(barrel);
    const mouth = base.clone().addScaledVector(dir, 0.55);
    station.add(g);
    const sight = rod(0.016, kit.ink, 6);
    sight.mesh.visible = false;
    station.add(sight.mesh);
    return { g, mouth, sight };
  });

  // ---------- Plates ----------
  const plateAt = (i: number) => i * GAP;
  const plates = [0, 1, 2, 3].map((i) => {
    const p = makePlate(kit, W, H);
    p.group.position.set(plateAt(i) - W / 2, LIFT, 0);
    scene.add(p.group);
    const foot = block(kit, W + 1.8, LIFT - 0.55, 1.6, 0.15);
    foot.position.set(plateAt(i), 0, 0);
    scene.add(foot);
    return p;
  });
  const world = (i: number, x: number, y: number, z = 0.05) =>
    V(plateAt(i) - W / 2 + x, LIFT + y, z);

  // Plate 1: a dial against a step.
  const STEP = 3.6;
  const stepCurve = tube(
    sample((x) => 0.35 + 2.5 * sig(x, STEP, 0.07), 0.1, W - 0.1, 160),
    0.04,
    kit.ink,
    240
  );
  stepCurve.draw(0);
  plates[0].group.add(stepCurve.mesh);
  const cut = rod(0.018, kit.soft, 6);
  cut.mesh.visible = false;
  plates[0].group.add(cut.mesh);
  const cutFoot = arrowHead(kit, V(0, -0.2, 0.05), V(0, 1, 0), 0.22);
  cutFoot.visible = false;
  plates[0].group.add(cutFoot);
  const knobMat = kit.surface(0.05);
  const knob = new THREE.Group();
  const knobBody = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.22, 36), knobMat);
  knobBody.position.y = 0.11;
  knob.add(knobBody);
  const knobGrip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.16, 0.66), knobMat);
  knobGrip.position.y = 0.3;
  knob.add(knobGrip);
  const knobTick = rod(0.02, kit.ink, 6);
  knobTick.place(V(0, 0.385, 0.05), V(0, 0.385, 0.34));
  knob.add(knobTick.mesh);
  knob.position.set(plateAt(0) - W / 2 - 0.55, LIFT - 0.55, 0.48);
  knob.visible = false;
  scene.add(knob);

  // Plate 2: the lag. Going under drops late; coming back rises early.
  const UNDER = 3.9;
  const BACK = 2.1;
  const lagY = (x: number, c: number) => 0.35 + 2.5 * (1 - sig(x, c, 0.1));
  const under = tube(
    sample((x) => lagY(x, UNDER), 0.15, W - 0.15, 160),
    0.04,
    kit.ink,
    240
  );
  const backPts = sample((x) => lagY(x, BACK), 0.15, W - 0.15, 160).reverse();
  for (const p of backPts) p.z = 0.07;
  const back = tube(backPts, 0.04, kit.ink, 240);
  under.draw(0);
  back.draw(0);
  plates[1].group.add(under.mesh, back.mesh);
  const lagArrows = hidden(new THREE.Group());
  lagArrows.add(arrowHead(kit, V(UNDER, 1.45, 0.08), V(0, -1, 0), 0.26));
  lagArrows.add(arrowHead(kit, V(BACK, 1.45, 0.08), V(0, 1, 0), 0.26));
  // The width of the lag, as a dimension line between the two drops.
  const dim = hidden(new THREE.Group());
  const dimY = 1.75;
  dim.add(segments([V(BACK + 0.12, dimY, 0.06), V(UNDER - 0.12, dimY, 0.06)], kit.ink));
  dim.add(arrowHead(kit, V(BACK + 0.1, dimY, 0.06), V(-1, 0, 0), 0.16));
  dim.add(arrowHead(kit, V(UNDER - 0.1, dimY, 0.06), V(1, 0, 0), 0.16));
  plates[1].group.add(lagArrows, dim);
  const runner = hidden(new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 14), kit.surface(-0.7)));
  plates[1].group.add(runner);

  // Plate 3: slowing. Swings grow larger and slower toward the boundary.
  const BX = W - 0.35;
  const wall = hidden(block(kit, 0.16, H + 0.1, 0.22, 0.75));
  wall.position.set(BX, 0, 0.11);
  plates[2].group.add(wall);
  const tracePts: THREE.Vector3[] = [];
  {
    let phi = 0;
    const x0 = 0.15;
    const x1 = BX - 0.25;
    const n = 420;
    for (let i = 0; i <= n; i++) {
      const x = x0 + ((x1 - x0) * i) / n;
      const u = (x - x0) / (x1 - x0);
      const amp = 0.06 + 1.05 * u ** 2.4;
      tracePts.push(V(x, 1.6 + amp * Math.sin(phi), 0.05));
      phi += ((x1 - x0) / n) * 13 * (1 - 0.84 * u ** 1.2);
    }
  }
  const trace = tube(tracePts, 0.032, kit.ink, 700);
  trace.draw(0);
  plates[2].group.add(trace.mesh);
  const baseline = segments(
    Array.from({ length: 24 }, (_, i) => {
      const x = 0.15 + i * 0.22;
      return [V(x, 1.6, 0.03), V(x + 0.1, 1.6, 0.03)];
    }).flat(),
    kit.soft
  );
  plates[2].group.add(hidden(baseline));

  // Plate 4: a steep, rounded step. The rounding, hatched, is the twilight.
  const TW = 3.0;
  const roundY = (x: number, s: number) => 0.35 + 2.5 * sig(x, TW, s);
  const S_A = 0.26;
  const S_B = 0.1;
  const roundA = tube(
    sample((x) => roundY(x, S_A), 0.1, W - 0.1, 160),
    0.04,
    kit.ink,
    240
  );
  const roundAsoft = hidden(
    tube(
      sample((x) => roundY(x, S_A), 0.1, W - 0.1, 160),
      0.022,
      kit.soft,
      240
    ).mesh
  );
  const roundB = tube(
    sample((x) => roundY(x, S_B), 0.1, W - 0.1, 160),
    0.04,
    kit.ink,
    240
  );
  roundA.draw(0);
  roundB.draw(0);
  plates[3].group.add(roundA.mesh, roundAsoft, roundB.mesh);
  // The band spans where the curve is between its tenth and ninetieth part.
  const bandMat = kit.surface(0.7);
  const band = hidden(new THREE.Mesh(new THREE.BoxGeometry(1, H, 0.03), bandMat));
  band.position.set(TW, H / 2, 0.015);
  plates[3].group.add(band);
  const bandW = (s: number) => 2 * s * Math.log(9);

  const s = narrow ? 0.65 : 1;
  const labels: Label3D[] = [
    {
      id: "methods",
      text: "INDEPENDENT METHODS",
      at: V(X0 - 3.4, 1.25, -2.4),
      dx: -10 * s,
      dy: -46,
    },
    { id: "value", text: "ONE VALUE", at: Tw.clone().add(V(0, 0.15, 0)), dx: 70 * s, dy: 70 },
    {
      id: "discarded",
      text: "DISAGREED, DISCARDED",
      at: V(X0 + 2.0, 0.9, 0.05),
      dx: 40 * s,
      dy: -90,
    },
    {
      id: "dial",
      text: "A DIAL?",
      at: knob.position.clone().add(V(0, 0.4, 0)),
      dx: -40 * s,
      dy: 60,
    },
    {
      id: "step",
      text: "A TRANSITION",
      at: world(0, STEP + 0.05, 1.6),
      dx: 110 * s,
      dy: -10,
    },
    { id: "dose", text: "ANESTHETIC DOSE", at: world(1, W * 0.75, -0.05), dx: 0, dy: 56 },
    { id: "under", text: "GOING UNDER", at: world(1, UNDER + 0.15, 1.0), dx: 90 * s, dy: 40 },
    { id: "back", text: "COMING BACK", at: world(1, BACK - 0.12, 1.2), dx: -60 * s, dy: 50 },
    { id: "lag", text: "THE LAG", at: world(1, (BACK + UNDER) / 2, dimY - 0.05), dx: 0, dy: 40 },
    { id: "conscious", text: "CONSCIOUS", at: world(1, 0, H + 0.1), dx: 70 * s, dy: -14 },
    { id: "wall", text: "THE BOUNDARY", at: world(2, BX, H + 0.05, 0.2), dx: -30 * s, dy: -56 },
    {
      id: "swing",
      text: "LARGER, SLOWER",
      at: world(2, BX - 1.55, 2.7),
      dx: -110 * s,
      dy: -26,
    },
    { id: "twilight", text: "THE TWILIGHT", at: world(3, TW + 0.25, 1.0), dx: 100 * s, dy: 30 },
    {
      id: "narrow",
      text: "NARROWER AS SYSTEMS GROW",
      at: world(3, TW - 0.3, 2.9),
      dx: -90 * s,
      dy: -30,
    },
  ];

  const k = narrow ? 0.98 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const plateView = (i: number) => V(plateAt(i), LIFT + H / 2 - 0.1, 0);
  const ruler = V(X0 + 0.2, 0.3, 0);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      inst.forEach((it, i) => {
        it.sight.place(it.mouth, it.mouth.clone().lerp(T, st.sight[i]));
        it.sight.mesh.visible = st.sight[i] > 0.01;
      });
      // The dial wanders the cut freely; a transition holds it at the step.
      const wander = W * 0.5 + W * 0.36 * Math.sin(time * 0.8);
      const cx = THREE.MathUtils.lerp(STEP, wander, st.free);
      cut.place(V(cx, -0.05, 0.06), V(cx, H + 0.05, 0.06));
      cut.mesh.visible = st.dial > 0.01;
      cutFoot.position.x = cx;
      cutFoot.visible = st.dial > 0.01;
      knob.rotation.y = -Math.sin(time * 0.8) * 2.3 * st.free;
      stepCurve.draw(st.stepA);
      // The lag: the marker runs down one way and back the other.
      under.draw(st.loop);
      back.draw(st.loop);
      runner.visible = st.run > 0;
      if (runner.visible) {
        const u = (time * 0.16) % 2;
        const fwd = u < 1;
        const x = fwd ? 0.15 + (W - 0.3) * u : W - 0.15 - (W - 0.3) * (u - 1);
        runner.position.set(x, lagY(x, fwd ? UNDER : BACK), fwd ? 0.1 : 0.12);
        runner.scale.setScalar(st.run);
      }
      trace.draw(st.trace);
      roundA.draw(st.stepB);
      roundB.draw(Math.max(0, st.stepB - 1));
    },
    stops: [
      // 1 · Triangulation: four methods sight one mark, and the disagreeing fall away.
      (tl, t, c) => {
        tl.addLabel("triangulate", t);
        frame(
          tl,
          c,
          { t: V(X0 - 1, 0.6, 0), o: view(-4, 3.5, 10) },
          { t: ruler, o: view(0.5, 7.2, 10.4) },
          t,
          3
        );
        lab(tl, c, { methods: 1 }, t + 1.4);
        inst.forEach((_, i) => {
          tl.fromTo(
            st.sight,
            { [i]: 0 },
            { [i]: 1, duration: 1.1, ease: "power1.inOut" },
            t + 1.6 + i * 0.35
          );
        });
        grow(tl, value, t + 3.3, 0.6, "all", "back.out(1.6)");
        lab(tl, c, { value: 1 }, t + 3.6);
        pegs.forEach((p, i) => {
          const side = p.position.x < TX ? 1 : -1;
          tl.fromTo(
            p.rotation,
            { z: 0 },
            { z: side * 1.45, duration: 0.8, ease: "power2.in" },
            t + 4.2 + i * 0.18
          );
          tl.fromTo(
            p.position,
            { y: 0.2 },
            { y: -0.4, duration: 1.0, ease: "power2.in" },
            t + 4.7 + i * 0.18
          );
          tl.fromTo(
            p.scale,
            { x: 1, y: 1, z: 1 },
            { x: 0.001, y: 0.001, z: 0.001, duration: 0.6, ease: "power1.in" },
            t + 5.1 + i * 0.18
          );
        });
        tone(tl, pegMat, 0.9, t + 4.2, 0.8);
        lab(tl, c, { discarded: 1 }, t + 4.4);
        lab(tl, c, { discarded: 0 }, t + 6.4);
      },
      // 2 · A dial turns a cut anywhere. A transition fixes it at a step.
      (tl, t, c) => {
        tl.addLabel("dial", t);
        lab(tl, c, { methods: 0, value: 0, discarded: 0 }, t);
        cam(tl, c, plateView(0).add(V(-0.7, 0, 0)), view(-1.4, 1.6, 11.4), t, 2.8, EASE);
        tl.set(knob, { visible: true }, t + 1.6);
        tl.fromTo(st, { free: 1, dial: 0 }, { dial: 1, duration: 0.4 }, t + 1.6);
        lab(tl, c, { dial: 1 }, t + 2.2);
        tl.fromTo(st, { stepA: 0 }, { stepA: 1, duration: 2.2, ease: "power1.inOut" }, t + 3.8);
        tl.to(st, { free: 0, duration: 1.4, ease: "power2.inOut" }, t + 5.6);
        tone(tl, knobMat, 0.85, t + 5.8);
        lab(tl, c, { step: 1 }, t + 6.4);
      },
      // 3 · A sudden transition shows a lag: down at one dose, back at a lower one.
      (tl, t, c) => {
        tl.addLabel("lag", t);
        lab(tl, c, { dial: 0, step: 0 }, t);
        tl.set(st, { free: 0, stepA: 1 }, t);
        cam(tl, c, plateView(1), view(1.2, 1.5, 11), t, 2.8, EASE);
        lab(tl, c, { dose: 1, conscious: 1 }, t + 2);
        tl.fromTo(st, { loop: 0 }, { loop: 1, duration: 2.4, ease: "power1.inOut" }, t + 2.2);
        tl.set(lagArrows, { visible: true }, t + 3.6);
        lab(tl, c, { under: 1, back: 1 }, t + 3.8);
        grow(tl, dim, t + 4.8, 0.7, "x");
        lab(tl, c, { lag: 1 }, t + 5.2);
        tl.set(runner, { visible: true }, t + 5.2);
        tl.fromTo(st, { run: 0 }, { run: 1, duration: 0.5, ease: "back.out(2)" }, t + 5.2);
      },
      // 4 · A continuous transition shows swings growing larger and slower near the boundary.
      (tl, t, c) => {
        tl.addLabel("slowing", t);
        lab(tl, c, { dose: 0, conscious: 0, under: 0, back: 0, lag: 0 }, t);
        tl.set(st, { loop: 1 }, t);
        cam(tl, c, plateView(2), view(-1, 1.7, 11), t, 2.8, EASE);
        grow(tl, wall, t + 1.6, 0.9);
        lab(tl, c, { wall: 1 }, t + 2.2);
        tl.set(baseline, { visible: true }, t + 2.4);
        tl.fromTo(st, { trace: 0 }, { trace: 1, duration: 4.2, ease: "none" }, t + 2.6);
        lab(tl, c, { swing: 1 }, t + 6.2);
      },
      // 5 · In a finite system, a steep but rounded step. The rounding is the twilight,
      // and it narrows as systems grow.
      (tl, t, c) => {
        tl.addLabel("twilight", t);
        lab(tl, c, { wall: 0, swing: 0 }, t);
        tl.set(st, { trace: 1 }, t);
        cam(tl, c, plateView(3), view(1.4, 1.6, 11), t, 2.8, EASE);
        tl.fromTo(st, { stepB: 0 }, { stepB: 1, duration: 2, ease: "power1.inOut" }, t + 2);
        tl.set(band, { visible: true }, t + 3.6);
        tl.fromTo(
          band.scale,
          { x: 0.001 },
          { x: bandW(S_A), duration: 1, ease: "power2.out" },
          t + 3.6
        );
        lab(tl, c, { twilight: 1 }, t + 4.2);
        // A larger system: a steeper step, and the band closes in.
        tl.set(roundAsoft, { visible: true }, t + 6);
        tl.to(st, { stepB: 2, duration: 1.8, ease: "power1.inOut" }, t + 6);
        tl.set(roundA.mesh, { visible: false }, t + 6.2);
        tl.to(band.scale, { x: bandW(S_B), duration: 1.6, ease: EASE }, t + 6.4);
        lab(tl, c, { narrow: 1 }, t + 7.4);
      },
    ],
  };
}
