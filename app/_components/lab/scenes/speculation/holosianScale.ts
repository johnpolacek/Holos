// The Holosian Scale beside the Kardashev Scale. Kardashev: three columns ranked by
// energy. Holosian: a staircase H0 to H5. On each step a small civilization, a cluster of
// bodies, draws closer and more joined as the steps rise, while the light and heat it
// sheds fall away. H4 keeps only a faint thermal ring. H5 is drawn in outline: a limit.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, segments, show, V } from "../../tourScenes3d";
import { makeRays, makeRipples, rand } from "./parts";

const STEP_W = 1.3;
const STEP_H = 0.42;
const X0 = -2.3;
const DEPTH = 1.4;
const N = 6;

export function holosianScale(narrow = false): Built3D {
  const kit = makeKit();
  const scene = new THREE.Scene();
  const st = { vis: 0, tight: 0, time: 0 };

  // Ground.
  const ground: THREE.Vector3[] = [];
  for (let i = 0; i <= 14; i++) {
    const x = -6.4 + i * 0.95;
    ground.push(V(x, 0, -1.2), V(x, 0, 1.2));
  }
  ground.push(V(-6.4, 0, 1.2), V(6.9, 0, 1.2), V(-6.4, 0, -1.2), V(6.9, 0, -1.2));
  scene.add(segments(ground, kit.soft));

  // Kardashev: three columns by energy, each crowned by a bright body.
  const kCols = [1.1, 2.2, 3.3].map((h, i) => {
    const g = new THREE.Group();
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.62, h, 0.62), kit.surface(0.2));
    col.position.y = h / 2;
    g.add(col);
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.16 + i * 0.07, 20, 14),
      kit.surface(-0.7)
    );
    sun.position.y = h + 0.3 + i * 0.07;
    g.add(sun);
    const rays = makeRays(kit, 12, 0.24 + i * 0.08, 0.42 + i * 0.16);
    rays.position.copy(sun.position);
    g.add(rays);
    g.position.set(-5.6 + i * 0.95, 0, 0);
    g.visible = false;
    scene.add(g);
    return g;
  });

  // The Holosian staircase.
  const steps = Array.from({ length: N }, (_, i) => {
    const h = (i + 1) * STEP_H;
    const x = X0 + i * STEP_W + STEP_W / 2;
    const g = new THREE.Group();
    g.position.set(x, 0, 0);
    const geo = new THREE.BoxGeometry(STEP_W, h, DEPTH);
    geo.translate(0, h / 2, 0);
    if (i < N - 1) g.add(new THREE.Mesh(geo, kit.surface(0.05)));
    else g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), kit.soft));
    g.visible = false;
    scene.add(g);

    // A civilization: five bodies, scattered at H0 and drawn in as the steps rise.
    const bodies = Array.from({ length: 5 }, (_, j) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 12, 8),
        i < N - 1 ? kit.surface(-0.3) : kit.soft
      );
      const a = (j / 5) * Math.PI * 2 + rand(i * 7 + j) * 0.9;
      const r = 0.2 + rand(i * 5 + j * 3) * 0.35;
      m.userData = { a, r, y: 0.12 + rand(j + i) * 0.35 };
      m.visible = i < N - 1;
      g.add(m);
      return m;
    });
    // Links between neighbors: none at H0, all joined from H2 on.
    const linkCount = [0, 3, 5, 5, 5, 5][i];
    const linkGeo = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 10 }, () => V(0, 0, 0))
    );
    linkGeo.setDrawRange(0, linkCount * 2);
    const links = new THREE.LineSegments(linkGeo, i < N - 1 ? kit.ink : kit.soft);
    g.add(links);

    // What it sheds: light rays and heat rings, falling away up the stairs.
    const top = V(0, h + 0.35, 0);
    const rays = makeRays(kit, 14, 0.45, [0.95, 0.8, 0.65, 0.5, 0.45, 0.45][i]);
    rays.position.copy(top);
    rays.visible = false;
    g.add(rays);
    const rip = makeRipples(kit, 3, 0.35, 0.95);
    rip.group.position.copy(top);
    g.add(rip.group);
    return { g, h, bodies, links, linkGeo, rays, rip, top };
  });

  const HEAT = [1, 1, 0.7, 0.67, 0.34, 0];
  const LIGHT = [1, 1, 1, 1, 0, 0];

  const labels: Label3D[] = [
    {
      id: "kardashev",
      text: "KARDASHEV, ENERGY",
      at: V(-5.6, 1.1, 0.31),
      dx: -40,
      dy: -150,
    },
    ...steps.map((s, i) => ({
      id: `h${i}`,
      text: `H${i}`,
      at: V(s.g.position.x, 0, DEPTH / 2),
      dx: 0,
      dy: 26,
    })),
    {
      id: "holosian",
      text: "HOLOSIAN, COHERENCE",
      at: V(steps[3].g.position.x, steps[3].h, -DEPTH / 2),
      dx: -70,
      dy: -110,
    },
    {
      id: "loud",
      text: "LOUD",
      at: steps[0].top.clone().add(V(steps[0].g.position.x - 0.5, 0.4, 0)),
      dx: -30,
      dy: -50,
    },
    {
      id: "thermal",
      text: "ONLY WARMTH",
      at: steps[4].top.clone().add(V(steps[4].g.position.x + 0.3, 0.2, 0)),
      dx: 10,
      dy: -60,
    },
    {
      id: "limit",
      text: "A LIMIT, NOT A STAGE",
      at: V(steps[5].g.position.x + STEP_W / 2, steps[5].h, DEPTH / 2),
      dx: -30,
      dy: -60,
    },
  ];

  const k = narrow ? 0.95 : 1;
  const p = new THREE.Vector3();
  const q = new THREE.Vector3();

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      steps.forEach((s, i) => {
        // Spread shrinks with the step once `tight` runs; a little drift keeps it alive.
        const pull = 1 - st.tight * (i / (N - 1)) * 0.75;
        s.bodies.forEach((m, j) => {
          const { a, r, y } = m.userData as { a: number; r: number; y: number };
          const aa = a + time * (i === 0 ? 0.25 : 0.12) * (j % 2 ? 1 : -1) * (1 - i / N);
          m.position.set(Math.cos(aa) * r * pull, s.h + y * pull + 0.05, Math.sin(aa) * r * pull);
        });
        const pos = s.linkGeo.attributes.position as THREE.BufferAttribute;
        for (let j = 0; j < 5; j++) {
          p.copy(s.bodies[j].position);
          q.copy(s.bodies[(j + 1) % 5].position);
          pos.setXYZ(j * 2, p.x, p.y, p.z);
          pos.setXYZ(j * 2 + 1, q.x, q.y, q.z);
        }
        pos.needsUpdate = true;
        s.links.visible = st.tight > 0.5 && i < N - 1;
        s.rays.visible = st.vis > 0.5 && LIGHT[i] > 0;
        s.rays.rotation.z = time * 0.1;
        s.rip.update(time, st.vis * HEAT[i], 0.35, i * 0.17);
      });
    },
    stops: [
      // 1 · Kardashev ranks by energy.
      (tl, t, c) => {
        tl.addLabel("energy", t);
        tl.fromTo(
          c.rig.target,
          { x: -4.6, y: 1.8, z: 0 },
          { x: -4.6, y: 1.9, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: 3, y: 1, z: 9 },
          { x: 2.2 * k, y: 1.4, z: 10 * k, duration: 3, ease: EASE },
          t
        );
        kCols.forEach((g, i) => {
          show(tl, g, t + 0.4 + i * 0.4, 0.9);
        });
        lab(tl, c, { kardashev: 1 }, t + 2.2);
      },
      // 2 · Holosian ranks by coherence: the stairs rise and each civilization draws in.
      (tl, t, c) => {
        tl.addLabel("coherence", t);
        lab(tl, c, { kardashev: 0 }, t);
        cam(tl, c, V(0.3, 1.1, 0), V(0, 3.2 * k, 13.5 * k), t, 2.6, EASE);
        steps.forEach((s, i) => {
          show(tl, s.g, t + 0.8 + i * 0.3, 0.7);
          lab(tl, c, { [`h${i}`]: 1 }, t + 1.2 + i * 0.3);
        });
        tl.set(st, { tight: 1 }, t + 3);
        lab(tl, c, { holosian: 1 }, t + 3.2);
      },
      // 3 · Visibility falls as coherence rises.
      (tl, t, c) => {
        tl.addLabel("visibility", t);
        lab(tl, c, { holosian: 0 }, t);
        cam(tl, c, V(1.2, 1.6, 0), V(-1.5, 2.8 * k, 12 * k), t, 2.4, EASE);
        tl.set(st, { vis: 1 }, t + 0.8);
        lab(tl, c, { loud: 1 }, t + 1.6);
        lab(tl, c, { thermal: 1 }, t + 2.4);
      },
      // 4 · H5 is a limit, drawn in outline.
      (tl, t, c) => {
        tl.addLabel("limit", t);
        lab(tl, c, { loud: 0, thermal: 0 }, t);
        cam(tl, c, V(3, 1.8, 0), V(-3, 2.6 * k, 9.5 * k), t, 2.6, EASE);
        lab(tl, c, { limit: 1 }, t + 2.2);
      },
    ],
  };
}
