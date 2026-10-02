// Logic figure: why one experiencer has many walled-off perspectives.
// Five small plates in turn. Sparks gather into a person's shape and never fuse (the
// combination problem). One lit cosmic sphere is carved into wedges (the decomposition
// problem). Holos: two peaks with apertures, nothing bridging them, nothing carved. One
// life along a time axis, each moment lit within its own walls. A brain whose link is
// cut, one aperture becoming two. Stops tween only plain state.

import type gsap from "gsap";
import * as THREE from "three";
import { makeKit } from "../../engrave3d";
import { EASE, makePerson } from "../../figures3d";
import {
  type Built3D,
  cam,
  circlePts,
  dashed,
  type Label3D,
  lab,
  line,
  makeIris,
  segments,
  V,
} from "../../tourScenes3d";

// A small seeded random, so every build lays out the same.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SPARK_S = 2.1; // the person the sparks would make, scaled up
const BIG = 2.2; // the cosmic sphere
const WEDGES = 6;
const LIFE = 9; // moments drawn along one life
const LIFE_X = 4.8;

export function walls(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(-1, 0, 0);
  kit.ink.side = THREE.DoubleSide;
  kit.soft.side = THREE.DoubleSide;
  const scene = new THREE.Scene();
  const st = { gather: 0, carve: 0, cut: 0, split: 0 };
  const plates = Array.from({ length: 5 }, () => {
    const g = new THREE.Group();
    g.visible = false;
    scene.add(g);
    return g;
  });

  // 1 · Sparks. Each finds a place inside a person's outline but stays its own.
  const rand = rng(7);
  const inPerson = () => {
    const pick = rand();
    const j = () => (rand() - 0.5) * 2;
    if (pick < 0.14) return V(j() * 0.13, 1.71 + j() * 0.13, j() * 0.1);
    if (pick < 0.5) return V(j() * 0.18, 1.0 + rand() * 0.48, j() * 0.12);
    if (pick < 0.75) return V((rand() < 0.5 ? -1 : 1) * 0.11 + j() * 0.05, rand() * 0.95, 0);
    return V((rand() < 0.5 ? -1 : 1) * (0.29 + j() * 0.04), 0.85 + rand() * 0.6, 0);
  };
  const sparkGeo = new THREE.SphereGeometry(0.075, 12, 8);
  const sparkMat = kit.surface(-1);
  const sparks = Array.from({ length: 64 }, (_, i) => {
    const target = inPerson()
      .multiplyScalar(SPARK_S)
      .add(V(0, -1.85, 0));
    const home = V((rand() - 0.5) * 11, (rand() - 0.5) * 4.6, (rand() - 0.5) * 3);
    const m = new THREE.Mesh(sparkGeo, sparkMat);
    m.position.copy(home);
    plates[0].add(m);
    return { m, home, target, phase: i * 1.37 };
  });
  // The one experience they would have to become: a dashed outline, never filled.
  const oneAt = V(0, 0.05, 0);
  const oneRing = new THREE.Group();
  const ringPts = circlePts(2.15, 72);
  const ringPairs: THREE.Vector3[] = [];
  for (let i = 0; i < ringPts.length; i += 2) ringPairs.push(ringPts[i], ringPts[i + 1]);
  oneRing.add(segments(ringPairs, kit.soft));
  oneRing.position.copy(oneAt);
  oneRing.visible = false;
  plates[0].add(oneRing);

  // 2 · The cosmic whole: one lit sphere, cut into wedges that part.
  const wedgeMat = kit.surface(-1);
  const faceMat = kit.surface(0.5);
  const wedges = Array.from({ length: WEDGES }, (_, i) => {
    const p0 = (i / WEDGES) * Math.PI * 2;
    const p1 = ((i + 1) / WEDGES) * Math.PI * 2;
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.SphereGeometry(BIG, 16, 32, p0, p1 - p0, 0, Math.PI), wedgeMat));
    for (const p of [p0, p1]) {
      const face = new THREE.Mesh(
        new THREE.CircleGeometry(BIG, 32, -Math.PI / 2, Math.PI),
        faceMat
      );
      face.rotation.y = Math.PI + p;
      g.add(face);
    }
    const pm = (p0 + p1) / 2;
    g.userData.dir = V(-Math.cos(pm), 0, Math.sin(pm));
    plates[1].add(g);
    return g;
  });
  // The knife's lines along each cut, drawn before the pieces part.
  const knives = Array.from({ length: WEDGES }, (_, i) => {
    const p = (i / WEDGES) * Math.PI * 2;
    const pts = Array.from({ length: 49 }, (_, k) => {
      const th = (k / 48) * Math.PI;
      return V(
        -Math.cos(p) * Math.sin(th),
        Math.cos(th),
        Math.sin(p) * Math.sin(th)
      ).multiplyScalar(BIG + 0.02);
    });
    const l = line(pts, kit.ink);
    l.visible = false;
    plates[1].add(l);
    return l;
  });

  // 3 · Holos: two peaks of integration, an aperture on each, nothing bridging them.
  const ground = new THREE.Group();
  const grid: THREE.Vector3[] = [];
  for (let x = -5; x <= 5; x += 1) grid.push(V(x, 0, -2.5), V(x, 0, 2.5));
  for (let z = -2.5; z <= 2.5; z += 1.25) grid.push(V(-5, 0, z), V(5, 0, z));
  ground.add(segments(grid, kit.soft));
  ground.position.y = -1.6;
  plates[2].add(ground);
  const hillPts = Array.from({ length: 24 }, (_, i) => {
    const r = (i / 23) * 1.9;
    return new THREE.Vector2(Math.max(r, 0.001), 2.3 * Math.exp(-((r / 0.85) ** 2)));
  }).reverse();
  const hillMat = kit.surface(0);
  const peaks = [-2.4, 2.4].map((x) => {
    const hill = new THREE.Mesh(new THREE.LatheGeometry(hillPts, 48), hillMat);
    hill.position.set(x, -1.6, 0);
    plates[2].add(hill);
    const iris = makeIris(kit, 0.2);
    iris.setOpen(0.85);
    iris.group.position.set(x, 1.15, 0.05);
    plates[2].add(iris.group);
    return { x, iris };
  });
  // Reaches from each peak toward the other that stop short: no structure to carry it.
  const reachA = dashed(V(-1.7, 0.2, 0), V(-0.45, 0.2, 0), kit.ink, 0.1);
  const reachB = dashed(V(1.7, 0.2, 0), V(0.45, 0.2, 0), kit.ink, 0.1);
  for (const r of [reachA, reachB]) {
    r.visible = false;
    plates[2].add(r);
  }

  // 4 · One life along time: each moment a lit stretch, walled from its neighbours.
  const momentLen = (2 * LIFE_X) / LIFE;
  const momentMats = Array.from({ length: LIFE }, () => kit.surface(0.35));
  const moments = momentMats.map((m, i) => {
    const g = new THREE.CylinderGeometry(0.34, 0.34, momentLen - 0.1, 28, 1);
    g.rotateZ(Math.PI / 2);
    const mesh = new THREE.Mesh(g, m);
    mesh.position.x = -LIFE_X + momentLen * (i + 0.5);
    mesh.position.y = -0.6;
    plates[3].add(mesh);
    return mesh;
  });
  const wallMat = kit.surface(0.75);
  for (let i = 1; i < LIFE; i++) {
    const g = new THREE.CylinderGeometry(0.52, 0.52, 0.06, 32, 1);
    g.rotateZ(Math.PI / 2);
    const w = new THREE.Mesh(g, wallMat);
    w.position.set(-LIFE_X + momentLen * i, -0.6, 0);
    plates[3].add(w);
  }
  const arrowY = -1.5;
  plates[3].add(line([V(-LIFE_X, arrowY, 0.6), V(LIFE_X + 0.2, arrowY, 0.6)], kit.ink));
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 12), kit.ink);
  head.rotation.z = -Math.PI / 2;
  head.position.set(LIFE_X + 0.3, arrowY, 0.6);
  plates[3].add(head);
  // The same person at three ages, each standing on a moment.
  const ages = [
    { i: 1, s: 0.55, pose: {} },
    { i: 4, s: 0.82, pose: {} },
    { i: 7, s: 0.8, pose: { lean: 0.22, head: 0.25 } },
  ].map(({ i, s, pose }) => {
    const p = makePerson(kit, 0.1);
    p.setPose(pose);
    p.group.scale.setScalar(s);
    p.group.position.set(moments[i].position.x, -0.26, 0);
    plates[3].add(p.group);
    return { p, top: V(moments[i].position.x, -0.26 + 1.8 * s, 0) };
  });

  // 5 · A brain: two halves joined by one link. Cut it, and one aperture becomes two.
  const brainMat = kit.surface(0.12);
  const halves = [-1, 1].map((side) => {
    const g = new THREE.Group();
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1, 40, 24, side < 0 ? -Math.PI / 2 : Math.PI / 2, Math.PI),
      brainMat
    );
    shell.scale.set(1.3, 1.05, 1.75);
    g.add(shell);
    const medial = new THREE.Mesh(new THREE.CircleGeometry(1, 48), kit.surface(0.4));
    medial.rotation.y = Math.PI / 2;
    medial.scale.set(1.75, 1.05, 1);
    g.add(medial);
    // A few folds engraved on the surface.
    for (const [y, a] of [
      [0.45, 0.88],
      [0.0, 1.0],
      [-0.45, 0.88],
    ]) {
      const pts = Array.from({ length: 33 }, (_, k) => {
        const th = (k / 32) * Math.PI - Math.PI / 2;
        return V(
          side * Math.cos(th) * 1.3 * a,
          y + Math.sin(th * 3) * 0.06,
          Math.sin(th) * 1.75 * a
        );
      });
      g.add(line(pts, kit.soft));
    }
    g.position.x = side * 0.22;
    plates[4].add(g);
    // Each half's end of the link, hinged at its own face so it can draw back.
    const lg = new THREE.CylinderGeometry(0.2, 0.2, 0.22, 20, 1);
    lg.rotateZ(Math.PI / 2);
    lg.translate(-side * 0.11, 0, 0);
    const link = new THREE.Mesh(lg, kit.surface(0.05));
    link.position.set(side * 0.22, -0.05, 0.1);
    plates[4].add(link);
    return { g, link, side };
  });
  const knife = dashed(V(0, 1.4, 0.1), V(0, -1.3, 0.1), kit.ink, 0.08);
  knife.visible = false;
  plates[4].add(knife);
  const one = makeIris(kit, 0.22);
  one.setOpen(0.85);
  one.group.position.set(0, 1.75, 0.3);
  plates[4].add(one.group);
  const two = [-1, 1].map((s) => {
    const iris = makeIris(kit, 0.18);
    iris.setOpen(0.85);
    iris.group.position.set(s * 1.25, 1.65, 0.3);
    iris.group.scale.setScalar(0.001);
    iris.group.visible = false;
    plates[4].add(iris.group);
    return iris;
  });
  // Stems carry each half's activity up to the aperture it feeds.
  const stemPos = new Float32Array(4 * 2 * 3);
  const stemGeo = new THREE.BufferGeometry();
  stemGeo.setAttribute("position", new THREE.BufferAttribute(stemPos, 3));
  plates[4].add(new THREE.LineSegments(stemGeo, kit.ink));

  const labels: Label3D[] = [
    { id: "spark", text: "A SPARK EACH", at: sparks[3].target, dx: 110, dy: -40 },
    { id: "person", text: "ONE PERSON?", at: V(1.6, 1.55, 0), dx: 70, dy: -40 },
    { id: "cosmos", text: "ONE COSMIC EXPERIENCE", at: V(0, BIG, 0), dx: 0, dy: -30 },
    { id: "carved", text: "CARVED INTO PIECES", at: V(BIG * 0.9, -0.6, 0.6), dx: 90, dy: 50 },
    { id: "peaks", text: "TWO APERTURES", at: peaks[0].iris.group.position, dx: -60, dy: -60 },
    { id: "bridge", text: "NOTHING BRIDGING", at: V(0, 0.2, 0), dx: 0, dy: 60 },
    { id: "young", text: "AT FIVE", at: ages[0].top, dx: -30, dy: -50 },
    { id: "old", text: "DECADES LATER", at: ages[2].top, dx: 40, dy: -55 },
    {
      id: "walled",
      text: "WALLED OFF",
      at: V(-LIFE_X + momentLen * 6, -1.1, 0.3),
      dx: 0,
      dy: 50,
    },
    { id: "time", text: "TIME", at: V(LIFE_X + 0.3, arrowY, 0.6), dx: 0, dy: 30 },
    { id: "brain", text: "ONE BRAIN", at: V(-1.3, -0.6, 1.2), dx: -70, dy: 50 },
    { id: "link", text: "LINK CUT", at: V(0, -0.05, 0.3), dx: 50, dy: 70 },
    { id: "streams", text: "TWO STREAMS", at: V(1.25, 1.65, 0.3), dx: 70, dy: -40 },
  ];

  const k = narrow ? 1.08 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const ALL = labels.map((l) => l.id);
  const none = Object.fromEntries(ALL.map((id) => [id, 0]));

  // Bring one plate in: hide the others, then engrave it left to right.
  const plate = (
    tl: gsap.core.Timeline,
    c: Parameters<typeof cam>[1],
    i: number,
    t: number,
    d = 0.5
  ) => {
    lab(tl, c, none, t);
    plates.forEach((p, j) => {
      tl.set(p, { visible: j === i }, t + d);
    });
    tl.fromTo(
      kit.clip,
      { constant: -6.5 },
      { constant: 6.5, duration: 1.6, ease: "power1.inOut" },
      t + d
    );
    tl.set(kit.clip, { constant: 100 }, t + d + 1.65);
  };

  const tmpA = new THREE.Vector3();
  return {
    scene,
    kit,
    labels,
    update: (time) => {
      if (plates[0].visible) {
        const g = st.gather;
        for (const s of sparks) {
          const amp = 0.05 + (1 - g) * 0.35;
          s.m.position
            .copy(s.home)
            .lerp(s.target, g)
            .add(
              tmpA.set(
                Math.sin(time * 0.7 + s.phase) * amp,
                Math.cos(time * 0.6 + s.phase * 1.3) * amp,
                Math.sin(time * 0.5 + s.phase * 0.7) * amp
              )
            );
        }
      }
      for (const w of wedges) {
        w.position.copy(w.userData.dir as THREE.Vector3).multiplyScalar(st.carve * 0.75);
      }
      for (const h of halves) h.link.scale.x = 1 - st.cut * 0.55;
      // Stems: before the cut both halves feed the one aperture; after, each its own.
      const tops = halves.map((h) => V(h.side * 0.75, 0.9, 0.3));
      const ends = halves.map((h) => V(0, 1.38, 0.3).lerp(V(h.side * 1.25, 1.3, 0.3), st.split));
      tops.forEach((p, i) => {
        stemPos.set([p.x, p.y, p.z, ends[i].x, ends[i].y, ends[i].z], i * 6);
      });
      stemGeo.attributes.position.needsUpdate = true;
      stemGeo.computeBoundingSphere();
      one.group.scale.setScalar(Math.max(1 - st.split, 0.001));
      one.group.visible = st.split < 1;
      for (const iris of two) {
        iris.group.scale.setScalar(Math.max(st.split, 0.001));
        iris.group.visible = st.split > 0;
      }
    },
    stops: [
      // 1 · Combination: sparks drift in to make a person and stay many.
      (tl, t, c) => {
        tl.addLabel("combination", t);
        plate(tl, c, 0, t, 0);
        tl.fromTo(
          c.rig.target,
          { x: -1, y: 0, z: 0 },
          { x: 0, y: 0, z: 0, duration: 3, ease: EASE },
          t
        );
        tl.fromTo(
          c.rig.offset,
          { ...view(-3, 0.5, 13) },
          { ...view(0, 1.2, 14), duration: 3, ease: EASE },
          t
        );
        tl.fromTo(st, { gather: 0 }, { gather: 1, duration: 3.2, ease: "power2.inOut" }, t + 1.2);
        lab(tl, c, { spark: 1 }, t + 1.4);
        tl.set(oneRing, { visible: true }, t + 4.2);
        lab(tl, c, { person: 1 }, t + 4.4);
      },
      // 2 · Decomposition: one lit cosmic whole, then the cuts, then the pieces part.
      (tl, t, c) => {
        tl.addLabel("decomposition", t);
        plate(tl, c, 1, t);
        tl.set(st, { carve: 0 }, t);
        cam(tl, c, V(0, 0, 0), view(0, 4.2, 12.5), t, 2.2, EASE);
        lab(tl, c, { cosmos: 1 }, t + 2.2);
        knives.forEach((kn, i) => {
          tl.set(kn, { visible: true }, t + 3 + i * 0.18);
        });
        knives.forEach((kn) => {
          tl.set(kn, { visible: false }, t + 4.5);
        });
        tl.to(st, { carve: 1, duration: 1.6, ease: "power2.inOut" }, t + 4.5);
        lab(tl, c, { cosmos: 0, carved: 1 }, t + 5);
      },
      // 3 · Holos: no cosmic experience, nothing to carve. Two peaks, nothing bridging.
      (tl, t, c) => {
        tl.addLabel("walls", t);
        plate(tl, c, 2, t);
        tl.set([reachA, reachB], { visible: false }, t);
        cam(tl, c, V(0, 0, 0), view(0, 3.2, 13.5), t, 2.2, EASE);
        lab(tl, c, { peaks: 1 }, t + 2.2);
        tl.set([reachA, reachB], { visible: true }, t + 3);
        tl.fromTo(
          hillMat.uniforms.tone,
          { value: 0 },
          { value: -0.6, duration: 1, ease: "power1.inOut" },
          t + 1.8
        );
        lab(tl, c, { bridge: 1 }, t + 3.4);
      },
      // 4 · Moments of a life: one experiencer, each moment lit within its own walls.
      (tl, t, c) => {
        tl.addLabel("moments", t);
        plate(tl, c, 3, t);
        cam(tl, c, V(0, 0, 0), view(-1.5, 3, 13), t, 2.4, EASE);
        momentMats.forEach((m, i) => {
          tl.fromTo(
            m.uniforms.tone,
            { value: 0.35 },
            { value: -1, duration: 0.5, ease: "power1.inOut" },
            t + 2 + i * 0.22
          );
        });
        lab(tl, c, { young: 1, time: 1 }, t + 2.4);
        lab(tl, c, { old: 1 }, t + 3.4);
        lab(tl, c, { walled: 1 }, t + 4.2);
      },
      // 5 · Split brain: cut the link and one aperture becomes two.
      (tl, t, c) => {
        tl.addLabel("split", t);
        plate(tl, c, 4, t);
        tl.set(st, { cut: 0, split: 0 }, t);
        tl.set(knife, { visible: false }, t);
        cam(tl, c, V(0, 0.4, 0), view(2.2, 2.6, 10), t, 2.4, EASE);
        lab(tl, c, { brain: 1 }, t + 2);
        tl.set(knife, { visible: true }, t + 3);
        tl.to(st, { cut: 1, duration: 0.8, ease: "power2.out" }, t + 3.2);
        lab(tl, c, { link: 1 }, t + 3.4);
        tl.to(st, { split: 1, duration: 1.4, ease: "power2.inOut" }, t + 4);
        lab(tl, c, { brain: 0, streams: 1 }, t + 4.8);
      },
    ],
  };
}
