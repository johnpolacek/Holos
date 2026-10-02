// Logic figure: why dependence on apertures is not circular.
// One engraved globe stands for the whole. Regions of its own surface fold into apertures;
// the globe is there whether they open or not (existence), and only the open ones light
// (experience). An organism and its eyes make the same point beside it. Then the globe is
// cut open behind an aperture: no one sits there. Stops tween only plain state.

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
  show,
  V,
} from "../../tourScenes3d";

const R = 3; // the globe
const CAP = 0.3; // angular radius of an aperture's region
const CUT = 0.24; // height of the cutaway in the last stage
const PX = -6; // the organism stands left of the globe
const PS = 3; // and is drawn large, so its eyes read

// A point on the globe at angular distance `a` from direction n, around it at angle t.
function onSphere(n: THREE.Vector3, a: number, t: number, r = R) {
  const u = new THREE.Vector3().crossVectors(n, Math.abs(n.y) < 0.9 ? V(0, 1, 0) : V(1, 0, 0));
  u.normalize();
  const w = new THREE.Vector3().crossVectors(n, u);
  return n
    .clone()
    .multiplyScalar(Math.cos(a))
    .addScaledVector(u, Math.sin(a) * Math.cos(t))
    .addScaledVector(w, Math.sin(a) * Math.sin(t))
    .multiplyScalar(r);
}

export function eyes(narrow = false): Built3D {
  const kit = makeKit();
  kit.clip.normal.set(0, -1, 0);
  kit.ink.side = THREE.DoubleSide;
  const scene = new THREE.Scene();
  const st = { open: 0, eyes: 0 };

  // The whole: a solid engraved globe with meridians and parallels on its skin.
  const bodyMat = kit.surface(0);
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(R, 72, 48), bodyMat));
  const skin = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI;
    skin.add(
      line(
        circlePts(R + 0.01, 128).map((p) => V(p.x * Math.cos(a), p.y, p.x * Math.sin(a))),
        kit.soft,
        true
      )
    );
  }
  for (const lat of [-1.05, -0.6, -0.2, 0.2, 0.6, 1.05]) {
    const y = (R + 0.01) * Math.sin(lat);
    const r = (R + 0.01) * Math.cos(lat);
    skin.add(
      line(
        circlePts(r, 128).map((p) => V(p.x, y, p.y)),
        kit.soft,
        true
      )
    );
  }
  scene.add(skin);

  // Apertures: regions of the surface itself. Each has a ring marking its region, a cap
  // of the skin that lifts to clean paper when lit, and an iris set into it.
  const dirs = [V(-0.55, 0.45, 0.7), V(0.02, -0.5, 0.87), V(0.62, CUT / R, 0.78)].map((d) =>
    d.normalize()
  );
  const capMat = kit.surface(0);
  const apertures = dirs.map((n) => {
    const ring = line(
      Array.from({ length: 64 }, (_, i) => onSphere(n, CAP, (i / 64) * Math.PI * 2, R + 0.015)),
      kit.ink,
      true
    );
    ring.visible = false;
    scene.add(ring);
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(R + 0.008, 40, 6, 0, Math.PI * 2, 0, CAP),
      capMat
    );
    cap.quaternion.setFromUnitVectors(V(0, 1, 0), n);
    cap.visible = false;
    scene.add(cap);
    const iris = makeIris(kit, 0.24);
    iris.setOpen(0);
    iris.group.position.copy(n).multiplyScalar(R + 0.02);
    iris.group.quaternion.setFromUnitVectors(V(0, 0, 1), n);
    iris.group.visible = false;
    scene.add(iris.group);
    return { n, ring, cap, iris };
  });
  const cutAp = apertures[2];
  // The organism tilts its eyes toward the camera; the globe's own irises keep their normals.

  // An organism and its eyes, drawn large to the left of the globe.
  const person = makePerson(kit, 0.1);
  person.group.scale.setScalar(PS);
  person.group.position.set(PX, -R, 0);
  person.group.visible = false;
  scene.add(person.group);
  const eyeIrises = [-1, 1].map((s) => {
    const e = makeIris(kit, 0.019);
    e.setOpen(0.85);
    e.group.position.set(s * 0.055, 1.74, 0.142);
    person.group.add(e.group);
    return e;
  });
  const eyeAt = V(PX + 0.055 * PS, -R + 1.74 * PS, 0.15 * PS);

  // The cutaway: the rim of the cut, and the empty place behind the aperture.
  const rim = line(
    circlePts(Math.sqrt(R * R - CUT * CUT), 128).map((p) => V(p.x, CUT - 0.002, p.y)),
    kit.ink,
    true
  );
  rim.visible = false;
  scene.add(rim);
  // A dashed outline where a viewer would sit, facing the aperture from inside: empty.
  const flat = V(cutAp.n.x, 0, cutAp.n.z).normalize();
  const behind = flat
    .clone()
    .multiplyScalar(R * 0.45)
    .setY(CUT - 0.42);
  const ghost = new THREE.Group();
  const dash = (pts: THREE.Vector3[]) => {
    const pairs: THREE.Vector3[] = [];
    for (let i = 0; i + 1 < pts.length; i += 2) pairs.push(pts[i], pts[i + 1]);
    ghost.add(segments(pairs, kit.ink));
  };
  dash([...circlePts(0.26, 40), circlePts(0.26, 40)[0]]);
  dash(
    Array.from({ length: 33 }, (_, i) => {
      const a = (i / 32) * Math.PI;
      return V(Math.cos(a) * 0.55, -0.95 + Math.sin(a) * 0.6, 0);
    })
  );
  ghost.position.copy(behind);
  ghost.quaternion.setFromUnitVectors(V(0, 0, 1), flat);
  ghost.visible = false;
  scene.add(ghost);
  const feed = dashed(
    behind.clone(),
    cutAp.n
      .clone()
      .multiplyScalar(R - 0.05)
      .setY(CUT - 0.08),
    kit.ink,
    0.09
  );
  feed.visible = false;
  scene.add(feed);

  const labels: Label3D[] = [
    { id: "whole", text: "OMEGA, THE WHOLE", at: V(0, R, 0), dx: 0, dy: -26 },
    {
      id: "region",
      text: "A REGION OF IT",
      at: apertures[0].iris.group.position,
      dx: -90,
      dy: -60,
    },
    {
      id: "either",
      text: "THERE EITHER WAY",
      at: onSphere(V(-0.6, -0.55, 0.58).normalize(), 0, 0),
      dx: -80,
      dy: 60,
    },
    {
      id: "here",
      text: "EXPERIENCE HERE",
      at: cutAp.iris.group.position,
      dx: 90,
      dy: -70,
    },
    { id: "organism", text: "THE ORGANISM", at: V(PX, -R + 1.15 * PS, 0.2 * PS), dx: 90, dy: 70 },
    { id: "eyes", text: "ITS EYES", at: eyeAt, dx: 80, dy: -50 },
    { id: "noone", text: "NO ONE BEHIND", at: behind.clone().add(V(0, -0.5, 0)), dx: -100, dy: 60 },
    {
      id: "happens",
      text: "WHERE IT HAPPENS",
      at: cutAp.n
        .clone()
        .multiplyScalar(R - 0.05)
        .setY(CUT - 0.5),
      dx: 90,
      dy: -60,
    },
  ];

  const k = narrow ? 1.04 : 1;
  const view = (x: number, y: number, z: number) => V(x * k, y * k, z * k);
  const home = V(0, 0, 0);
  const front = view(0, 1.6, 14.5);

  return {
    scene,
    kit,
    labels,
    update: () => {
      for (const a of apertures) a.iris.setOpen(st.open);
      for (const e of eyeIrises) e.setOpen(st.eyes);
    },
    stops: [
      // 1 · The whole engraves in, bottom to top, with no aperture anywhere.
      (tl, t, c) => {
        tl.addLabel("whole", t);
        tl.fromTo(
          kit.clip,
          { constant: -R - 0.2 },
          { constant: R + 0.4, duration: 2.6, ease: "power1.inOut" },
          t
        );
        tl.set(kit.clip, { constant: 100 }, t + 2.7);
        tl.fromTo(c.rig.target, { x: 0, y: -1.5, z: 0 }, { ...home, duration: 3.2, ease: EASE }, t);
        tl.fromTo(
          c.rig.offset,
          { ...view(-5, -0.5, 11) },
          { ...front, duration: 3.2, ease: EASE },
          t
        );
        lab(tl, c, { whole: 1 }, t + 2.4);
      },
      // 2 · Regions of its own surface fold into apertures. Nothing comes from outside.
      (tl, t, c) => {
        tl.addLabel("regions", t);
        lab(tl, c, { whole: 0 }, t);
        cam(tl, c, V(-0.4, 0.2, 0), view(-2.5, 1.4, 13), t, 2.2, EASE);
        apertures.forEach((a, i) => {
          const s = t + 0.9 + i * 0.5;
          tl.set(a.ring, { visible: true }, s);
          show(tl, a.iris.group, s + 0.3, 0.8);
        });
        tl.to(st, { open: 0.85, duration: 1, ease: "back.out(2)" }, t + 2.6);
        lab(tl, c, { region: 1 }, t + 2.8);
      },
      // 3 · Two dependences: shut every aperture and the globe stays (existence); open
      // them and only their regions light (experience).
      (tl, t, c) => {
        tl.addLabel("dependences", t);
        lab(tl, c, { region: 0 }, t);
        cam(tl, c, home, front, t, 2, EASE);
        tl.to(st, { open: 0, duration: 0.8, ease: "power2.in" }, t + 0.6);
        lab(tl, c, { either: 1 }, t + 1.4);
        tl.to(st, { open: 0.85, duration: 0.9, ease: "back.out(2)" }, t + 3);
        for (const a of apertures) tl.set(a.cap, { visible: true }, t + 3);
        tl.fromTo(
          capMat.uniforms.tone,
          { value: 0 },
          { value: -1, duration: 1.2, ease: "power1.inOut" },
          t + 3.2
        );
        tl.to(bodyMat.uniforms.tone, { value: 0.55, duration: 1.4, ease: "power1.inOut" }, t + 3.2);
        lab(tl, c, { either: 0, here: 1 }, t + 3.8);
      },
      // 4 · An organism sees only through its eyes, and is not posterior to them. Its eyes
      // and the globe's apertures shut together; both bodies stay.
      (tl, t, c) => {
        tl.addLabel("organism", t);
        lab(tl, c, { here: 0 }, t);
        show(tl, person.group, t + 0.4, 0);
        tl.fromTo(
          person.group.scale,
          { x: PS * 0.01, y: PS * 0.01, z: PS * 0.01 },
          { x: PS, y: PS, z: PS, duration: 0.9, ease: "back.out(1.4)" },
          t + 0.4
        );
        tl.to(st, { eyes: 0.85, duration: 0.6, ease: "power2.out" }, t + 0.8);
        cam(tl, c, view(-2.4, 0.3, 0), view(1.2, 1.4, 18), t, 2.4, EASE);
        lab(tl, c, { organism: 1 }, t + 2);
        lab(tl, c, { eyes: 1 }, t + 2.6);
        tl.to(st, { eyes: 0, open: 0, duration: 0.5, ease: "power2.in" }, t + 3.8);
        tl.to(st, { eyes: 0.85, open: 0.85, duration: 0.7, ease: "back.out(2)" }, t + 5);
      },
      // 5 · Cut the globe open behind an aperture: no one sits there receiving a feed.
      (tl, t, c) => {
        tl.addLabel("behind", t);
        lab(tl, c, { organism: 0, eyes: 0 }, t);
        tl.set(st, { open: 0.85, eyes: 0.85 }, t);
        tl.set(person.group, { visible: false }, t + 0.6);
        tl.to(bodyMat.uniforms.tone, { value: 0.25, duration: 1.2, ease: "power1.inOut" }, t + 0.6);
        tl.fromTo(
          kit.clip,
          { constant: R + 0.4 },
          { constant: CUT, duration: 1.8, ease: "power2.inOut" },
          t + 0.6
        );
        tl.set(rim, { visible: true }, t + 2.3);
        cam(
          tl,
          c,
          behind.clone().add(V(0, -0.3, 0)),
          view(-flat.x * 6.5, 7.5, -flat.z * 6.5),
          t,
          2.8,
          EASE
        );
        tl.set(ghost, { visible: true }, t + 2.8);
        tl.set(feed, { visible: true }, t + 2.8);
        lab(tl, c, { noone: 1 }, t + 3.2);
        lab(tl, c, { happens: 1 }, t + 3.8);
      },
    ],
  };
}
