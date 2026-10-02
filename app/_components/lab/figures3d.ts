// Shared pieces for the engraved figures: the house camera ease and a posable person.

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import * as THREE from "three";
import type { Kit } from "./engrave3d";

gsap.registerPlugin(CustomEase);

// A slow lean in, then a long engraver's settle. Every figure's camera uses it.
export const EASE = "engrave";
if (!CustomEase.get(EASE)) CustomEase.create(EASE, "M0,0 C0.4,0 0.12,1 1,1");

export type Pose = {
  // Shoulder swing about the body's side axis: 0 hangs, π raises straight up.
  armL: number;
  armR: number;
  // Forearm bend toward the face.
  bendL: number;
  bendR: number;
  head: number; // nod: positive bows
  lean: number; // torso pitch: positive stoops
};

export const STAND: Pose = { armL: 0.15, armR: 0.15, bendL: 0, bendR: 0, head: 0, lean: 0 };
export const JOY: Pose = { armL: 2.6, armR: 2.6, bendL: 0.2, bendR: 0.2, head: -0.35, lean: -0.1 };
export const GRIEF: Pose = { armL: 0.9, armR: 0.9, bendL: 2.2, bendR: 2.2, head: 0.6, lean: 0.35 };

// A plain engraved person about 1.75 units tall, feet at the origin, facing +z.
export function makePerson(kit: Kit, tone = 0.1) {
  const root = new THREE.Group();
  const body = new THREE.Group();
  body.position.y = 0.95;
  root.add(body);
  const mat = kit.surface(tone);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.42, 6, 14), mat);
  torso.position.y = 0.26;
  body.add(torso);
  const neck = new THREE.Group();
  neck.position.y = 0.62;
  body.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 14), mat);
  head.position.y = 0.14;
  neck.add(head);

  const limb = (len: number, r: number) => {
    const g = new THREE.CapsuleGeometry(r, len, 4, 10);
    g.translate(0, -len / 2 - r, 0);
    return new THREE.Mesh(g, mat);
  };
  const arm = (side: number) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.25, 0.5, 0);
    body.add(shoulder);
    shoulder.add(limb(0.26, 0.055));
    const elbow = new THREE.Group();
    elbow.position.y = -0.38;
    shoulder.add(elbow);
    elbow.add(limb(0.24, 0.05));
    return { shoulder, elbow };
  };
  const L = arm(-1);
  const R = arm(1);
  for (const side of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(side * 0.11, 0.0, 0);
    body.add(hip);
    hip.add(limb(0.7, 0.07));
  }

  const pose: Pose = { ...STAND };
  const apply = () => {
    // Arms swing forward and out a little as they rise, so raised arms open into a V.
    L.shoulder.rotation.set(pose.armL * 0.08, 0, -pose.armL * 0.92);
    R.shoulder.rotation.set(pose.armR * 0.08, 0, pose.armR * 0.92);
    // Bent forearms come forward and in, toward the face.
    L.elbow.rotation.set(-pose.bendL, 0, pose.bendL * 0.35);
    R.elbow.rotation.set(-pose.bendR, 0, -pose.bendR * 0.35);
    // Grief folds the arms in front instead of out to the sides.
    if (pose.bendL > 1) L.shoulder.rotation.set(-pose.armL, 0, -0.15);
    if (pose.bendR > 1) R.shoulder.rotation.set(-pose.armR, 0, 0.15);
    neck.rotation.x = pose.head;
    body.rotation.x = pose.lean;
  };
  apply();
  return {
    group: root,
    pose,
    setPose(p: Partial<Pose>) {
      Object.assign(pose, p);
      apply();
    },
    apply,
  };
}
