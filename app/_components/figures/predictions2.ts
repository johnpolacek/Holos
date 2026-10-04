// Added Predictions figures (commitments, tests, the bet, technology). Each spec lives in specs/<name>.ts.

import { SPEC as bet } from "./specs/bet";
import { SPEC as checkC } from "./specs/checkC";
import { SPEC as communication } from "./specs/communication";
import { SPEC as exploration } from "./specs/exploration";
import { SPEC as testA } from "./specs/testA";
import { SPEC as testB } from "./specs/testB";
import { SPEC as thresholded } from "./specs/thresholded";
import { SPEC as vault } from "./specs/vault";
import type { FigureSpec } from "./types";

export const SPECS = {
  exploration,
  communication,
  vault,
  checkC,
  testB,
  testA,
  thresholded,
  bet,
} satisfies Record<string, FigureSpec>;
