// Engraved scenes for the logic2 figures (the Logic page from Totality onward).

import type { Built3D } from "../tourScenes3d";
import { born } from "./logic2/born";
import { calibration } from "./logic2/calibration";
import { criticality } from "./logic2/criticality";
import { decoherence } from "./logic2/decoherence";
import { eyes } from "./logic2/eyes";
import { fingerprints } from "./logic2/fingerprints";
import { interpretations } from "./logic2/interpretations";
import { measure } from "./logic2/measure";
import { minds } from "./logic2/minds";
import { pipeline } from "./logic2/pipeline";
import { selves } from "./logic2/selves";
import { walls } from "./logic2/walls";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "logic2.eyes": eyes,
  "logic2.walls": walls,
  "logic2.selves": selves,
  "logic2.decoherence": decoherence,
  "logic2.born": born,
  "logic2.pipeline": pipeline,
  "logic2.interpretations": interpretations,
  "logic2.minds": minds,
  "logic2.measure": measure,
  "logic2.fingerprints": fingerprints,
  "logic2.criticality": criticality,
  "logic2.calibration": calibration,
};
