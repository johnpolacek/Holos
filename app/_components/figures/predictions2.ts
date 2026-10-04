// Added Predictions figures (commitments, tests, the bet, technology). Each spec lives in specs/<name>.ts.

import { SPEC as bet } from "./specs/bet";
import { SPEC as thresholded } from "./specs/thresholded";
import type { FigureSpec } from "./types";

export const SPECS = {
  thresholded,
  bet,
} satisfies Record<string, FigureSpec>;
