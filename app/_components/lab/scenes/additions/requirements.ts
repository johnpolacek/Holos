// Logic figure, Observer Requirements: four structural requirements as four emblems on
// plinths. Integration: a ring of parts that act on each other both ways, beside a chain
// that only passes signals on. Differentiation: a field of toggles with many possible
// states. Temporal cohesion: the same loop stacked across moments, joined through time.
// Aboutness: a small model that mirrors a terrain, beside a bank of switches that mirrors
// nothing. Then all four hold an aperture open, and removing one closes it. Last, a large
// regular array of gates, high on integration, models nothing, and its aperture stays shut
// even with a sensor at every gate. Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  show,
  V,
} from "../../tourScenes3d";
import { arrow, rng, rod, setup, xyz } from "../logic2/decoherence-util";

const XS = [-4.8, -1.6, 1.6, 4.8]; // the four plinths
const IY = 4.1; // the aperture above the row
const AZ = -8; // the gate array, far behind

export function requirements(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { flip: 0, stack: 0, mirror: 0, open: 0, drop: 0, sensors: 0 };

  const plinth = (x: number) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.3, 64), kit.surface(0.05));
    p.position.set(x, 0.15, 0);
    scene.add(p);
    const g = new THREE.Group();
    g.position.set(x, 0.3, 0);
    scene.add(g);
    return g;
  };

  // 1 · Integration: a ring of parts with arrows both ways round, and a one-way chain beside.
  const ring = plinth(XS[0]);
  const RN = 6;
  const ringPts = Array.from({ length: RN }, (_, i) => {
    const a = (i / RN) * Math.PI * 2;
    return V(Math.cos(a) * 0.6, 0.9 + Math.sin(a) * 0.6, 0);
  });
  for (const p of ringPts) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), kit.surface(0.3));
    m.position.copy(p);
    ring.add(m);
  }
  ringPts.forEach((p, i) => {
    const q = ringPts[(i + 1) % RN];
    const n = V(-(q.y - p.y), q.x - p.x, 0)
      .normalize()
      .multiplyScalar(0.07);
    ring.add(
      arrow(p.clone().lerp(q, 0.22).add(n), p.clone().lerp(q, 0.78).add(n), kit.ink, 0.012, 0.1)
    );
    ring.add(
      arrow(q.clone().lerp(p, 0.22).sub(n), q.clone().lerp(p, 0.78).sub(n), kit.ink, 0.012, 0.1)
    );
  });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8), kit.surface(0.2));
  stem.position.y = 0.15;
  ring.add(stem);
  const chain = new THREE.Group();
  const cpts = [0, 1, 2, 3].map((i) => V(-0.45 + i * 0.3, 0.12, 0.85));
  for (const p of cpts) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), kit.surface(0.3));
    m.position.copy(p);
    chain.add(m);
  }
  for (let i = 0; i < 3; i++)
    chain.add(
      arrow(
        cpts[i].clone().add(V(0.07, 0, 0)),
        cpts[i + 1].clone().add(V(-0.07, 0, 0)),
        kit.soft,
        0.01,
        0.07
      )
    );
  ring.add(chain);

  // 2 · Differentiation: a field of toggles, many possible states.
  const field = plinth(XS[1]);
  const toggles: THREE.Mesh[] = [];
  const r = rng(13);
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++) {
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 0.22), kit.surface(0.1));
      base.position.set(-0.6 + i * 0.3, 0.03, -0.6 + j * 0.3);
      field.add(base);
      const lever = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.05), kit.surface(0.35));
      lever.geometry.translate(0, 0.15, 0);
      lever.position.set(-0.6 + i * 0.3, 0.06, -0.6 + j * 0.3);
      lever.userData.s = r();
      field.add(lever);
      toggles.push(lever);
    }

  // 3 · Temporal cohesion: the same loop on stacked moments, joined through time.
  const time = plinth(XS[2]);
  const plates = [0, 1, 2].map((k) => {
    const g = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 1.2), kit.surface(-0.3));
    g.add(plate);
    const lp = circlePts(0.35, 40).map((p) => V(p.x, 0.03, p.y));
    g.add(line(lp, kit.ink, true));
    g.position.y = 0.2 + k * 0.05;
    g.userData.k = k;
    time.add(g);
    return g;
  });
  const threads = [0, 1, 2, 3].map((i) => {
    const a = (i / 4) * Math.PI * 2 + 0.4;
    const rd = rod(0.015, kit.ink, 6);
    time.add(rd.mesh);
    return { rd, x: Math.cos(a) * 0.35, z: Math.sin(a) * 0.35 };
  });

  // 4 · Aboutness: a terrain and the model that mirrors it, beside switches that mirror nothing.
  const about = plinth(XS[3]);
  const terrain = (scale: number) => {
    const geo = new THREE.PlaneGeometry(1, 1, 18, 18);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const runway = Math.abs(z) < 0.08 ? 0 : 1;
      pos.setY(i, runway * 0.12 * (Math.sin(x * 9) * 0.5 + Math.cos(z * 7) * 0.5 + 0.6));
    }
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, kit.surface(0.15));
    m.scale.setScalar(scale);
    return m;
  };
  const world = terrain(1.1);
  world.position.set(-0.35, 0.02, 0.2);
  about.add(world);
  const model = new THREE.Group();
  const modelBase = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.04, 0.62), kit.surface(0.1));
  model.add(modelBase);
  const mini = terrain(0.55);
  mini.position.y = 0.02;
  model.add(mini);
  model.position.set(0.55, 0.9, -0.3);
  about.add(model);
  const mirrorLines = segments(
    [
      V(-0.35, 0.15, 0.2),
      V(0.55, 0.92, -0.3),
      V(-0.9, 0.1, 0.75),
      V(0.27, 0.9, -0.02),
      V(0.2, 0.1, -0.35),
      V(0.82, 0.9, -0.58),
    ],
    kit.soft
  );
  about.add(mirrorLines);
  const modelStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.86, 8),
    kit.surface(0.2)
  );
  modelStem.position.set(0.55, 0.45, -0.3);
  about.add(modelStem);
  const switches = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.03), kit.surface(0.1));
    plate.position.set(-0.3 + i * 0.13, 0.12, 0.85);
    switches.add(plate);
    const nub = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.07, 0.05), kit.surface(0.4));
    nub.position.set(-0.3 + i * 0.13, i % 2 ? 0.16 : 0.08, 0.88);
    switches.add(nub);
  }
  switches.position.x = 0.35;
  about.add(switches);

  // 5 · All four hold an aperture open.
  const iris = makeIris(kit, 0.4);
  iris.group.position.set(0, IY, 0);
  iris.group.visible = false;
  scene.add(iris.group);
  const ties = XS.map((x) => {
    const t = segments([V(x, 1.9, 0), V(0, IY - 0.6, 0)], kit.soft);
    t.visible = false;
    scene.add(t);
    return t;
  });

  // 6 · The gate array: regular, high on integration, a model of nothing.
  const array = new THREE.Group();
  const gateGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
  const gateMat = kit.surface(0.25);
  const wires: THREE.Vector3[] = [];
  const AN = 10;
  const sensors: THREE.Mesh[] = [];
  for (let i = 0; i < AN; i++)
    for (let j = 0; j < AN; j++) {
      const p = V((i - (AN - 1) / 2) * 0.5, 0.11, (j - (AN - 1) / 2) * 0.5);
      const g = new THREE.Mesh(gateGeo, gateMat);
      g.position.copy(p);
      array.add(g);
      if (i < AN - 1) wires.push(p.clone().add(V(0.11, 0, 0)), p.clone().add(V(0.39, 0, 0)));
      if (j < AN - 1) wires.push(p.clone().add(V(0, 0, 0.11)), p.clone().add(V(0, 0, 0.39)));
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.14, 8), kit.surface(0.45));
      s.position.copy(p).add(V(0, 0.18, 0));
      s.visible = false;
      array.add(s);
      sensors.push(s);
    }
  array.add(segments(wires, kit.ink));
  const arrayBase = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.1, 5.4), kit.surface(0.04));
  arrayBase.position.y = -0.05;
  array.add(arrayBase);
  const shut = makeIris(kit, 0.4);
  shut.setOpen(0);
  shut.group.position.set(0, 2.3, 0);
  array.add(shut.group);
  array.position.z = AZ;
  array.visible = false;
  scene.add(array);

  const labels: Label3D[] = [
    { id: "loops", text: "LOOPS BACK", at: V(XS[0] + 0.6, 1.5, 0), dx: 40, dy: -60 },
    { id: "relay", text: "ONE WAY, A RELAY", at: V(XS[0] + 0.3, 0.45, 0.85), dx: 50, dy: 50 },
    { id: "states", text: "MANY POSSIBLE STATES", at: V(XS[1] + 0.6, 0.6, -0.6), dx: 40, dy: -70 },
    { id: "persists", text: "PERSISTS ACROSS TIME", at: V(XS[2] + 0.8, 1.6, 0), dx: 40, dy: -60 },
    { id: "model", text: "A MODEL OF A WORLD", at: V(XS[3] + 0.55, 1.25, -0.3), dx: 40, dy: -60 },
    { id: "nothing", text: "MIRRORS NOTHING", at: V(XS[3] + 0.35, 0.5, 0.85), dx: 40, dy: 50 },
    { id: "integration", text: "INTEGRATION", at: V(XS[0], 0.3, 1.2), dx: 0, dy: 40 },
    { id: "differentiation", text: "DIFFERENTIATION", at: V(XS[1], 0.3, 1.2), dx: 0, dy: 40 },
    { id: "cohesion", text: "TEMPORAL COHESION", at: V(XS[2], 0.3, 1.2), dx: 0, dy: 40 },
    { id: "aboutness", text: "ABOUTNESS", at: V(XS[3], 0.3, 1.2), dx: 0, dy: 40 },
    { id: "view", text: "A POINT OF VIEW", at: V(0.45, IY + 0.4, 0), dx: 60, dy: -40 },
    {
      id: "array",
      text: "HIGH ON INTEGRATION, A MODEL OF NOTHING",
      at: V(2.2, 0.25, AZ + 2.2),
      dx: 30,
      dy: 60,
    },
    { id: "shut", text: "STAYS SHUT", at: V(0.45, 2.7, AZ), dx: 50, dy: -40 },
  ];
  const names = { integration: 0, differentiation: 0, cohesion: 0, aboutness: 0 };

  const k = narrow ? 1.7 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const at = (i: number) => V(XS[i], 1, 0);
  const close = view(0.6, 1.7, 4.6);

  return {
    scene,
    kit,
    labels,
    update: (tm) => {
      // Before the stage each toggle holds one setting; once it starts they flip through states.
      for (const tg of toggles) {
        const seed = tg.userData.s as number;
        const live = Math.sin(tm * 1.7 + seed * 20) > 0;
        tg.rotation.z = (st.flip > 0.5 ? live : seed > 0.5) ? 0.5 : -0.5;
      }
      for (const p of plates) p.position.y = 0.2 + p.userData.k * (0.05 + 0.55 * st.stack);
      for (const th of threads)
        th.rd.place(V(th.x, 0.22, th.z), V(th.x, 0.22 + 2 * (0.05 + 0.55 * st.stack), th.z));
      mirrorLines.visible = st.mirror > 0.5;
      iris.setOpen(st.open * (1 - st.drop));
      field.position.y = 0.3 - 1.4 * st.drop;
      field.scale.setScalar(Math.max(1 - st.drop, 0.01));
      for (const s of sensors) s.visible = st.sensors > 0.5;
    },
    stops: [
      // 1 · Integration: the row engraves in; the first plinth's loop, and the relay beside it.
      (tl, t, c) => {
        tl.addLabel("integration", t);
        tl.fromTo(
          kit.clip,
          { constant: XS[0] - 1.5 },
          { constant: XS[3] + 1.5, duration: 2.2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.3);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(0, 1, 0)) },
          { ...xyz(at(0)), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(0, 5, 13)) },
          { ...xyz(close), duration: 3, ease: EASE },
          t
        );
        lab(tl, c, { integration: 1 }, t + 2.6);
        lab(tl, c, { loops: 1 }, t + 3);
        lab(tl, c, { relay: 1 }, t + 3.6);
      },
      // 2 · Differentiation: toggles flip through many states.
      (tl, t, c) => {
        tl.addLabel("differentiation", t);
        lab(tl, c, { loops: 0, relay: 0, integration: 0 }, t);
        cam(tl, c, at(1), view(0.6, 2.4, 4.4), t, 2, EASE);
        tl.to(st, { flip: 1, duration: 0.6 }, t + 1);
        lab(tl, c, { differentiation: 1, states: 1 }, t + 1.6);
      },
      // 3 · Temporal cohesion: the moments rise into a stack, joined through time.
      (tl, t, c) => {
        tl.addLabel("cohesion", t);
        lab(tl, c, { differentiation: 0, states: 0 }, t);
        cam(tl, c, V(XS[2], 1.1, 0), close, t, 2, EASE);
        tl.fromTo(st, { stack: 0 }, { stack: 1, duration: 1.6, ease: "power2.inOut" }, t + 0.8);
        lab(tl, c, { cohesion: 1, persists: 1 }, t + 2.2);
      },
      // 4 · Aboutness: the model mirrors the terrain; the switches mirror nothing.
      (tl, t, c) => {
        tl.addLabel("aboutness", t);
        lab(tl, c, { cohesion: 0, persists: 0 }, t);
        cam(tl, c, at(3), view(0.2, 1.9, 4.6), t, 2, EASE);
        tl.set(st, { mirror: 1 }, t + 1);
        lab(tl, c, { aboutness: 1, model: 1 }, t + 1.3);
        lab(tl, c, { nothing: 1 }, t + 2);
      },
      // 5 · All four hold an aperture open. Remove one, and it closes.
      (tl, t, c) => {
        tl.addLabel("together", t);
        lab(tl, c, { model: 0, nothing: 0 }, t);
        cam(tl, c, V(0, 1.8, 0), view(0, 4.2, 13.4), t, 2.4, EASE);
        if (!narrow)
          lab(
            tl,
            c,
            { ...names, integration: 1, differentiation: 1, cohesion: 1, aboutness: 1 },
            t + 0.8
          );
        show(tl, iris.group, t + 1.2, 0.6);
        for (const tie of ties) tl.set(tie, { visible: true }, t + 1.2);
        tl.fromTo(st, { open: 0 }, { open: 1, duration: 0.8, ease: "power2.out" }, t + 1.6);
        lab(tl, c, { view: 1 }, t + 2.2);
        tl.set(ties[1], { visible: false }, t + 3.2);
        tl.fromTo(st, { drop: 0 }, { drop: 1, duration: 1.2, ease: "power2.in" }, t + 3.2);
        lab(tl, c, { differentiation: 0, view: 0 }, t + 3.2);
      },
      // 6 · Why aboutness: a regular array of gates, high on integration, models nothing.
      (tl, t, c) => {
        tl.addLabel("array", t);
        lab(tl, c, names, t);
        show(tl, array, t, 0);
        cam(tl, c, V(0, 0.6, AZ), view(1.2, 5.4, 7.6), t, 2.6, EASE);
        lab(tl, c, { array: 1 }, t + 2);
        lab(tl, c, { shut: 1 }, t + 2.6);
        tl.set(st, { sensors: 1 }, t + 3.2);
      },
    ],
  };
}
