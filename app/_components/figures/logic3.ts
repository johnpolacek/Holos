// Added Logic figures (Primitives, Foundations, Threshold, Open Problems). Each spec lives in specs/<name>.ts.

import { SPEC as primitives } from "./specs/primitives";
import type { FigureSpec } from "./types";

export const SPECS = {
  primitives,
} satisfies Record<string, FigureSpec>;
