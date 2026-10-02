// Consciousness figure 1: a rock and a person. Seen through, both are the same kind of
// atoms. In the rock they jostle loose, each on its own. In the person they are joined, and
// a pulse runs through them as one. Past a threshold, an aperture opens above the person.
// Stops tween only `st`, the rig, labels, and visibility, so any stop fast-forwards.

import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import { type Built3D, cam, type Label3D, lab, makeIris, segments, V } from "../../tourScenes3d";
import { drawIn, growSegments, seeded } from "./common";

const S = 1.2; // person scale

// Points inside a person standing at the origin, by body part.
function personPoints(rand: () => number) {
  const pts: THREE.Vector3[] = [];
  // Keep atoms a little apart, so the figure's outline reads.
  const add = (p: THREE.Vector3) => {
    if (pts.every((q) => q.distanceTo(p) > 0.055)) pts.push(p);
  };
  const inRod = (a: THREE.Vector3, b: THREE.Vector3, r: number, n: number) => {
    for (let i = 0; i < n * 8; i++) {
      const t = rand();
      const ang = rand() * Math.PI * 2;
      const rr = r * Math.sqrt(0.3 + 0.7 * rand());
      add(
        a
          .clone()
          .lerp(b, t)
          .add(V(Math.cos(ang) * rr, 0, Math.sin(ang) * rr))
      );
    }
  };
  const inBall = (c: THREE.Vector3, r: number, n: number) => {
    for (let i = 0; i < n * 8; i++) {
      const d = V(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize();
      add(c.clone().addScaledVector(d, r * Math.cbrt(0.3 + 0.7 * rand())));
    }
  };
  inBall(V(0, 1.71, 0), 0.15, 22);
  inRod(V(0, 0.92, 0), V(0, 1.48, 0), 0.21, 70);
  for (const s of [-1, 1]) {
    inRod(V(s * 0.27, 1.42, 0), V(s * 0.36, 0.72, 0), 0.05, 16);
    inRod(V(s * 0.11, 0.92, 0), V(s * 0.11, 0.06, 0), 0.07, 24);
  }
  return pts.map((p) => p.multiplyScalar(S));
}

function rockPoints(rand: () => number, n: number) {
  const pts: THREE.Vector3[] = [];
  let guard = 0;
  while (pts.length < n && guard++ < 20000) {
    const d = V(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
    if (d.lengthSq() > 1) continue;
    const p = V(d.x * 1.05, 0.62 + d.y * 0.55, d.z * 0.8);
    if (pts.every((q) => q.distanceTo(p) > 0.1)) pts.push(p);
  }
  return pts;
}

export function joined(narrow = false): Built3D {
  // Each object's distance from the middle. Phones bring them closer to fill the frame.
  const GAP = narrow ? 1.45 : 1.8;
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  const scene = new THREE.Scene();
  const st = { jit: 0, links: 0, open: 0 };
  const rand = seeded(7);

  // One long plinth for both.
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(GAP * 2 + 3, 0.16, 2.6), kit.surface(0.2));
  plinth.position.y = -0.08;
  scene.add(plinth);

  // The rock, solid.
  const rockGeo = new THREE.DodecahedronGeometry(1, 1);
  const rp = rockGeo.attributes.position;
  for (let i = 0; i < rp.count; i++) {
    const k = 1 + 0.08 * Math.sin(rp.getX(i) * 5.3 + rp.getZ(i) * 3.1);
    rp.setXYZ(i, rp.getX(i) * k, rp.getY(i) * k, rp.getZ(i) * k);
  }
  rockGeo.computeVertexNormals();
  const rock = new THREE.Mesh(rockGeo, kit.surface(0.1));
  rock.scale.set(1.15, 0.66, 0.9);
  rock.position.set(-GAP, 0.6, 0);
  scene.add(rock);

  // The person, solid.
  const person = makePerson(kit, 0.05);
  person.group.scale.setScalar(S);
  person.group.position.x = GAP;
  scene.add(person.group);

  // Their atoms, hidden inside them until the solids fall away.
  const atomGeo = new THREE.SphereGeometry(0.034, 10, 8);
  const atomMat = kit.surface(-0.4);
  const cloud = (pts: THREE.Vector3[], x: number) => {
    const g = new THREE.Group();
    g.position.x = x;
    g.visible = false;
    scene.add(g);
    const atoms = pts.map((p, i) => {
      const m = new THREE.Mesh(atomGeo, atomMat);
      m.position.copy(p);
      m.userData = { home: p.clone(), f: 2 + rand() * 3, ph: rand() * 7, i };
      g.add(m);
      return m;
    });
    return { g, atoms, pts };
  };
  const personAtoms = cloud(personPoints(rand), GAP);
  // The rock gets exactly as many.
  const rockAtoms = cloud(rockPoints(rand, personAtoms.pts.length), -GAP);

  // The person's atoms joined to their nearest neighbours.
  const pairs: THREE.Vector3[] = [];
  const seen = new Set<string>();
  personAtoms.pts.forEach((p, i) => {
    const near = personAtoms.pts
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    for (const { j } of near) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push(p, personAtoms.pts[j]);
    }
  });
  // Grow the links from the head down, so the joining reads as it spreads.
  const order = pairs
    .map((_, k) => k)
    .filter((k) => k % 2 === 0)
    .sort((a, b) => pairs[b].y + pairs[b + 1].y - (pairs[a].y + pairs[a + 1].y));
  const links = segments(
    order.flatMap((k) => [pairs[k], pairs[k + 1]]),
    kit.ink
  );
  links.position.x = GAP;
  growSegments(links, 0);
  scene.add(links);

  // The aperture above the person.
  const iris = makeIris(kit, 0.24);
  iris.setOpen(0);
  iris.group.position.set(GAP, 2.75, 0);
  iris.group.visible = false;
  scene.add(iris.group);

  const labels: Label3D[] = [
    { id: "rock", text: "A ROCK", at: V(-GAP, 1.1, 0), dx: -50, dy: -60 },
    { id: "person", text: "A PERSON", at: V(GAP + 0.1, 2.1, 0), dx: 70, dy: -50 },
    { id: "atomsR", text: "ATOMS", at: V(-GAP + 0.6, 0.9, 0.5), dx: -40, dy: -80 },
    { id: "atomsP", text: "THE SAME KIND OF ATOMS", at: V(GAP - 0.25, 1.4, 0.2), dx: -90, dy: -90 },
    { id: "loose", text: "LOOSE, EACH ON ITS OWN", at: V(-GAP, 1.05, 0.3), dx: -10, dy: -70 },
    { id: "joined", text: "JOINED, ACTING AS ONE", at: V(GAP + 0.15, 1.5, 0.2), dx: 40, dy: -120 },
    { id: "aperture", text: "AN APERTURE", at: iris.group.position, dx: -120, dy: -6 },
    { id: "none", text: "NO POINT OF VIEW", at: V(-GAP, 1.25, 0), dx: 0, dy: -80 },
  ];

  const back = narrow ? 0.86 : 1;
  const home = { t: V(0, 1.05, 0), o: V(0, 1.3 * back, 8.4 * back) };

  return {
    scene,
    kit,
    labels,
    update: (time) => {
      // Loose atoms jostle on their own. Joined ones move together, and a pulse runs
      // down through them from the head.
      for (const a of rockAtoms.atoms) {
        const u = a.userData;
        const j = 0.05 * st.jit;
        a.position.set(
          u.home.x + j * Math.sin(time * u.f + u.ph),
          u.home.y + j * Math.sin(time * u.f * 1.3 + u.ph * 2),
          u.home.z + j * Math.cos(time * u.f * 0.9 + u.ph)
        );
      }
      const sway = Math.sin(time * 1.4) * 0.025 * st.links;
      for (const a of personAtoms.atoms) {
        const u = a.userData;
        const j = 0.05 * st.jit * (1 - st.links);
        a.position.set(
          u.home.x + j * Math.sin(time * u.f + u.ph) + sway,
          u.home.y + j * Math.sin(time * u.f * 1.3 + u.ph * 2),
          u.home.z + j * Math.cos(time * u.f * 0.9 + u.ph)
        );
        const wave = Math.max(0, Math.sin(time * 3 + u.home.y * 3.2)) ** 6;
        a.scale.setScalar(1 - 0.45 * st.links + 0.8 * wave * st.links);
      }
      links.position.x = GAP + sway;
      growSegments(links, st.links);
      iris.setOpen(st.open);
    },
    stops: [
      // 1 · A rock and a person.
      (tl, t, c) => {
        tl.addLabel("two", t);
        drawIn(tl, kit, -GAP - 2.2, GAP + 2.4, t);
        tl.fromTo(
          c.rig.target,
          { x: -1.5, y: 1, z: 0 },
          { ...home.t, duration: 2.8, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { x: -3, y: 1, z: 7.5 },
          { ...home.o, duration: 2.8, ease: EASE },
          t
        );
        lab(tl, c, { rock: 1 }, t + 1.8);
        lab(tl, c, { person: 1 }, t + 2.6);
      },
      // 2 · Seen through: the same kind of atoms in both.
      (tl, t, c) => {
        tl.addLabel("atoms", t);
        lab(tl, c, { rock: 0, person: 0 }, t);
        cam(tl, c, V(0, 1, 0), V(0, 1.1 * back, 7.6 * back), t, 2, EASE);
        tl.set([rockAtoms.g, personAtoms.g], { visible: true }, t + 0.6);
        tl.set(rock, { visible: false }, t + 1);
        tl.set(person.group, { visible: false }, t + 1.4);
        tl.to(st, { jit: 1, duration: 1, ease: "power1.in" }, t + 1.2);
        lab(tl, c, { atomsR: 1, atomsP: 1 }, t + 2);
      },
      // 3 · Loose in one, joined in the other.
      (tl, t, c) => {
        tl.addLabel("joined", t);
        lab(tl, c, { atomsR: 0, atomsP: 0 }, t);
        cam(tl, c, V(0, 1.1, 0), V(0.6, 1.8, 7.8 * back), t, 2, EASE);
        tl.to(st, { links: 1, duration: 2.4, ease: "power1.inOut" }, t + 0.6);
        lab(tl, c, { loose: 1 }, t + 1.2);
        lab(tl, c, { joined: 1 }, t + 2.6);
      },
      // 4 · Past a threshold, an aperture opens.
      (tl, t, c) => {
        tl.addLabel("aperture", t);
        lab(tl, c, { loose: 0, joined: 0 }, t);
        cam(tl, c, V(0, 1.35, 0), V(0, 1.3 * back, 8.4 * back), t, 2, EASE);
        tl.set(iris.group, { visible: true }, t + 1);
        tl.fromTo(st, { open: 0 }, { open: 1, duration: 1.4, ease: "power2.out" }, t + 1);
        lab(tl, c, { aperture: 1 }, t + 2.2);
        lab(tl, c, { none: 1 }, t + 2.8);
      },
    ],
  };
}
