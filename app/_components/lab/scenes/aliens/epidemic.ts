// Figure A4: settlement as an epidemic. Two lineages of settlements grow upward, one
// generation per row. On the left each settlement founds two: it sweeps. On the right
// they found fewer than one on average: it fizzles. Then the links on the right go soft
// and every settlement opens its own aperture: distance breaks control.
// Stops tween only plain state.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, line, makeIris, V } from "../../tourScenes3d";

const ROW = 1.15;
const GENS = 4;

type Node = { p: THREE.Vector3; gen: number; parent: number };

export function aliensEpidemic(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  const scene = new THREE.Scene();
  const st = { left: 0, right: 0, cut: 0, open: 0 };

  // Sweeps: every settlement founds two.
  const sweep: Node[] = [];
  const growL = (x: number, gen: number, w: number, parent: number) => {
    const me = sweep.length;
    sweep.push({ p: V(x, gen * ROW, Math.sin(me * 2.1) * 0.25), gen, parent });
    if (gen === GENS) return;
    growL(x - w / 4, gen + 1, w / 2, me);
    growL(x + w / 4, gen + 1, w / 2, me);
  };
  growL(-3.8, 0, 5.4, -1);
  // Fizzles: two, then one, then none. Fewer than one each on average.
  const fizzle: Node[] = [
    { p: V(3.8, 0, 0), gen: 0, parent: -1 },
    { p: V(3.0, ROW, 0.15), gen: 1, parent: 0 },
    { p: V(4.7, ROW, -0.1), gen: 1, parent: 0 },
    { p: V(2.7, ROW * 2, 0.1), gen: 2, parent: 1 },
  ];

  const nodeGeo = new THREE.SphereGeometry(0.13, 18, 12);
  const build = (nodes: Node[]) => {
    const mat = kit.surface(0.1);
    return nodes.map((n) => {
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(n.p);
      scene.add(mesh);
      const parent = n.parent >= 0 ? nodes[n.parent].p : null;
      const link = parent ? line([parent, parent.clone()], kit.ink) : null;
      if (link) scene.add(link);
      return { n, mesh, link, parent };
    });
  };
  const left = build(sweep);
  const right = build(fizzle);
  const irises = fizzle.map((n) => {
    const iris = makeIris(kit, 0.09);
    iris.setOpen(0);
    iris.group.position.copy(n.p).add(V(0.32, 0.22, 0.1));
    iris.group.visible = false;
    scene.add(iris.group);
    return iris;
  });
  // A ground line under each lineage: the home system's row.
  scene.add(line([V(-6.8, -0.35, 0), V(-0.8, -0.35, 0)], kit.soft));
  scene.add(line([V(0.8, -0.35, 0), V(6.8, -0.35, 0)], kit.soft));

  const labels: Label3D[] = [
    { id: "seedL", text: "A SETTLEMENT", at: sweep[0].p, dx: 0, dy: 44 },
    { id: "seedR", text: "A SETTLEMENT", at: fizzle[0].p, dx: 0, dy: 44 },
    { id: "more", text: "MORE THAN ONE EACH", at: V(-3.8, -0.4, 0), dx: 0, dy: 44 },
    { id: "sweeps", text: "SWEEPS", at: V(-3.8, GENS * ROW + 0.2, 0), dx: 0, dy: -36 },
    { id: "fewer", text: "FEWER THAN ONE EACH", at: V(3.8, -0.4, 0), dx: 0, dy: 44 },
    { id: "fizzles", text: "FIZZLES", at: fizzle[3].p, dx: 40, dy: -60 },
    {
      id: "own",
      text: "EACH ITS OWN CIVILIZATION",
      at: irises[2].group.position,
      dx: 30,
      dy: -70,
    },
  ];

  const k = narrow ? 1.05 : 1;
  const grow = (items: ReturnType<typeof build>, g: number, soft: boolean) => {
    for (const { n, mesh, link, parent } of items) {
      const f = Math.min(Math.max(g - n.gen + 1, 0), 1);
      const s = n.gen === 0 ? (g > 0 ? 1 : 0.01) : Math.max(f, 0.01);
      mesh.scale.setScalar(s);
      mesh.visible = s > 0.02;
      if (link && parent) {
        const pos = link.geometry.attributes.position as THREE.BufferAttribute;
        const e = parent.clone().lerp(n.p, f);
        pos.setXYZ(1, e.x, e.y, e.z);
        pos.needsUpdate = true;
        link.visible = f > 0.01;
        link.material = soft ? kit.soft : kit.ink;
      }
    }
  };

  return {
    scene,
    kit,
    labels,
    update: () => {
      grow(left, st.left, false);
      grow(right, st.right, st.cut > 0.5);
      for (const iris of irises) iris.setOpen(st.open);
    },
    stops: [
      // 1 · Settling like an epidemic: each settlement founds new ones.
      (tl, t, c) => {
        tl.addLabel("seed", t);
        tl.fromTo(
          c.rig.target,
          { x: 0, y: 0.5, z: 0 },
          { x: 0, y: 1.6, z: 0, duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: 0, y: 1, z: 9 * k },
          { x: 0, y: 2.4 * k, z: 16 * k, duration: 2.6, ease: EASE },
          t
        );
        tl.fromTo(st, { left: 0, right: 0 }, { left: 1, right: 1, duration: 0.8 }, t + 0.8);
        lab(tl, c, { seedL: 1, seedR: 1 }, t + 1.4);
        tl.to(st, { left: 2, right: 2, duration: 1.4, ease: "none" }, t + 2.4);
      },
      // 2 · More than one each: it sweeps.
      (tl, t, c) => {
        tl.addLabel("sweep", t);
        lab(tl, c, { seedL: 0, seedR: 0 }, t);
        cam(tl, c, V(-2.6, 2.2, 0), V(1.2, 2 * k, 12 * k), t, 2.4, EASE);
        tl.to(st, { left: GENS + 1, duration: 3, ease: "none" }, t + 0.6);
        lab(tl, c, { more: 1 }, t + 1);
        lab(tl, c, { sweeps: 1 }, t + 3.4);
      },
      // 3 · Fewer than one each: it fizzles.
      (tl, t, c) => {
        tl.addLabel("fizzle", t);
        lab(tl, c, { more: 0, sweeps: 0 }, t);
        cam(tl, c, V(2.6, 1.6, 0), V(-1.2, 2 * k, 11 * k), t, 2.4, EASE);
        tl.to(st, { right: GENS + 1, duration: 3, ease: "none" }, t + 0.6);
        lab(tl, c, { fewer: 1 }, t + 1);
        lab(tl, c, { fizzles: 1 }, t + 3);
      },
      // 4 · Distance breaks control: each settlement becomes its own civilization.
      (tl, t, c) => {
        tl.addLabel("own", t);
        lab(tl, c, { fewer: 0, fizzles: 0 }, t);
        cam(tl, c, V(3.6, 1.2, 0), V(-0.6, 1.6 * k, 8 * k), t, 2.4, EASE);
        tl.set(st, { cut: 1 }, t + 1.2);
        for (const iris of irises) tl.set(iris.group, { visible: true }, t + 1.6);
        tl.to(st, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 1.6);
        lab(tl, c, { own: 1 }, t + 2.6);
      },
    ],
  };
}
