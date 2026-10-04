// Added Logic figures (Primitives, Foundations, Threshold, Open Problems). Each spec lives in specs/<name>.ts.

import { SPEC as artificial } from "./specs/artificial";
import { SPEC as boundaries } from "./specs/boundaries";
import { SPEC as foundations } from "./specs/foundations";
import { SPEC as integration } from "./specs/integration";
import { SPEC as primitives } from "./specs/primitives";
import { SPEC as requirements } from "./specs/requirements";
import { SPEC as threshold } from "./specs/threshold";
import type { FigureSpec } from "./types";

export const SPECS = {
  boundaries,
  integration,
  artificial,
  requirements,
  threshold,
  foundations,
  primitives,
} satisfies Record<string, FigureSpec>;
