// Added Overview figures. Each spec lives in specs/<name>.ts.

import { SPEC as csRequirements } from "./specs/csRequirements";
import { SPEC as whyLived } from "./specs/whyLived";
import type { InlineMap } from "./types";

export const INLINE: InlineMap = {
  consciousness: { 4: [csRequirements] },
  why: { 0: [whyLived] },
};
