// Logic figure, Proposition I: relations before objects. A web of rods holds a set of
// joints in place. Take the objects at the joints away and the rods still fix where each
// one sits. Theories then change what they say the objects are, spheres, then cubes, then
// bare points, while the web stays the same. Last, one object is picked out with the
// relations that define it: objects are real, but not prior to their relations.
// Stops tween only plain state.

import * as THREE from "three";
import { EASE } from "../../figures3d";
import { type Built3D, cam, circlePts, type Label3D, lab, line, V } from "../../tourScenes3d";
import { rng, rod, setup, tube, xyz } from "../logic2/decoherence-util";

export function foundations(narrow = false): Built3D {
  const { kit, scene } = setup(V(-1, 0, 0));
  const st = { objects: 1, form: 0, pick: 0 };

  // Joints: a loose lattice, each joined to its neighbours and a few across.
  const r = rng(31);
  const nodes: THREE.Vector3[] = [];
  const idx = (a: number, b: number, c: number) => a * 4 + b * 2 + c;
  for (let a = 0; a < 4; a++)
    for (let b = 0; b < 2; b++)
      for (let c = 0; c < 2; c++)
        nodes.push(
          V(
            -2.4 + a * 1.6 + (r() - 0.5) * 0.5,
            0.9 + b * 1.5 + (r() - 0.5) * 0.4,
            -0.85 + c * 1.7 + (r() - 0.5) * 0.4
          )
        );
  const edges: [number, number][] = [];
  for (let a = 0; a < 4; a++)
    for (let b = 0; b < 2; b++)
      for (let c = 0; c < 2; c++) {
        const i = idx(a, b, c);
        if (a < 3) edges.push([i, idx(a + 1, b, c)]);
        if (b < 1) edges.push([i, idx(a, b + 1, c)]);
        if (c < 1) edges.push([i, idx(a, b, c + 1)]);
        if (a < 3 && b < 1 && r() < 0.5) edges.push([i, idx(a + 1, b + 1, c)]);
      }
  const rodMat = kit.surface(0.15);
  for (const [i, j] of edges) {
    const rd = rod(0.03, rodMat, 8);
    rd.place(nodes[i], nodes[j]);
    scene.add(rd.mesh);
  }

  // A base with three stays, so the web stands on something.
  const base = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.16, 72), kit.surface(0.05));
  base.position.y = -0.08;
  scene.add(base);
  const lowest = [idx(0, 0, 0), idx(0, 0, 1), idx(3, 0, 0), idx(3, 0, 1)];
  for (const i of lowest) {
    const s = rod(0.02, kit.surface(0.25), 6);
    s.place(V(nodes[i].x, 0, nodes[i].z), nodes[i]);
    scene.add(s.mesh);
  }

  // Each joint holds an object in one of three forms a theory might give it.
  const forms = nodes.map((p) => {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), kit.surface(0.35));
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), kit.surface(0.35));
    cube.rotation.set(0.5, 0.6, 0);
    const point = new THREE.Group();
    point.add(line(circlePts(0.14, 32), kit.ink, true));
    point.add(new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), kit.ink));
    for (const m of [sphere, cube, point]) {
      m.position.copy(p);
      m.visible = false;
      scene.add(m);
    }
    return [sphere, cube, point];
  });

  // The picked object's relations, drawn over in ink.
  const PICK = nodes.reduce((best, p, i) => (p.length() < nodes[best].length() ? i : best), 0);
  const picked = edges
    .filter(([i, j]) => i === PICK || j === PICK)
    .map(([i, j]) => {
      const other = i === PICK ? j : i;
      const t = tube(
        [nodes[PICK], nodes[PICK].clone().lerp(nodes[other], 0.5), nodes[other]],
        0.055,
        kit.ink,
        24,
        8
      );
      t.draw(0);
      scene.add(t.mesh);
      return t;
    });
  const ring = line(circlePts(0.42, 48), kit.ink, true);
  ring.position.copy(nodes[PICK]);
  ring.visible = false;
  scene.add(ring);

  const top = nodes.reduce((best, p, i) => (p.y > nodes[best].y ? i : best), 0);
  const side = nodes.reduce((best, p, i) => (p.x > nodes[best].x ? i : best), 0);
  const labels: Label3D[] = [
    {
      id: "relations",
      text: "RELATIONS",
      at: nodes[top].clone().lerp(nodes[edges.find(([i]) => i === top)?.[1] ?? 0], 0.5),
      dx: -40,
      dy: -60,
    },
    { id: "objects", text: "OBJECTS", at: nodes[side], dx: 50, dy: -40 },
    { id: "still", text: "THE PLACES STAY FIXED", at: nodes[side], dx: 60, dy: -40 },
    { id: "forms", text: "WHAT A THEORY SAYS IS THERE", at: nodes[side], dx: 60, dy: -40 },
    { id: "pattern", text: "THE PATTERN STAYS", at: nodes[top], dx: -60, dy: -50 },
    { id: "defined", text: "DEFINED BY ITS RELATIONS", at: nodes[PICK], dx: 90, dy: 80 },
  ];

  const k = narrow ? 1.55 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const center = V(0, 2.1, 0);

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      forms.forEach((f, i) => {
        f.forEach((m, j) => {
          const w = Math.max(0, 1 - Math.abs(st.form - j));
          m.visible = st.objects > 0.02 && w > 0.5;
          m.scale.setScalar(Math.max(st.objects, 0.02));
        });
        f[1].rotation.y = time * 0.2 + i;
      });
      for (const p of picked) p.draw(st.pick);
      ring.visible = st.pick > 0.5;
    },
    stops: [
      // 1 · Relations: the web engraves in, with an object at every joint.
      (tl, t, c) => {
        tl.addLabel("relations", t);
        tl.fromTo(
          kit.clip,
          { constant: -3.6 },
          { constant: 3.6, duration: 2, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.1);
        tl.fromTo(
          c.rig.target,
          { ...xyz(V(-1, 1.8, 0)) },
          { ...xyz(center), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...xyz(view(-4, 2, 7)) },
          { ...xyz(view(1.5, 2.6, 9.6)), duration: 3, ease: EASE },
          t
        );
        tl.set(st, { objects: 1, form: 0 }, t);
        lab(tl, c, { relations: 1 }, t + 2.2);
        lab(tl, c, { objects: 1 }, t + 2.8);
      },
      // 2 · No object first: the objects shrink away, and the web still fixes every place.
      (tl, t, c) => {
        tl.addLabel("first", t);
        lab(tl, c, { objects: 0 }, t);
        cam(tl, c, center, view(-1.5, 2.2, 9.4), t, 2.6, EASE);
        tl.to(st, { objects: 0, duration: 1.2, ease: "power2.in" }, t + 0.6);
        lab(tl, c, { still: 1 }, t + 2);
      },
      // 3 · Theories change: the objects return as cubes, then as bare points. The web stays.
      (tl, t, c) => {
        tl.addLabel("theories", t);
        lab(tl, c, { still: 0, relations: 0 }, t);
        cam(tl, c, center, view(1, 3.2, 9.2), t, 3, EASE);
        tl.set(st, { form: 1 }, t + 0.4);
        tl.to(st, { objects: 1, duration: 0.8, ease: "back.out(1.4)" }, t + 0.4);
        lab(tl, c, { forms: 1 }, t + 1.2);
        tl.to(st, { form: 2, duration: 0.01 }, t + 2.4);
        lab(tl, c, { pattern: 1 }, t + 2.6);
      },
      // 4 · Objects remain: one is picked out with the relations that define it.
      (tl, t, c) => {
        tl.addLabel("defined", t);
        lab(tl, c, { forms: 0, pattern: 0 }, t);
        tl.set(st, { objects: 1 }, t);
        tl.set(st, { form: 0 }, t + 0.3);
        cam(tl, c, nodes[PICK], view(1.4, 2.2, 8.2), t, 2.6, EASE);
        tl.fromTo(st, { pick: 0 }, { pick: 1, duration: 1.4, ease: "power1.inOut" }, t + 1);
        lab(tl, c, { defined: 1 }, t + 2.2);
      },
    ],
  };
}
