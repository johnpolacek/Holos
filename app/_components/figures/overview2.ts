// Added Overview figures. Each spec lives in specs/<name>.ts.

import { SPEC as csOneWay } from "./specs/csOneWay";
import { SPEC as csRequirements } from "./specs/csRequirements";
import { SPEC as csTwilight } from "./specs/csTwilight";
import { SPEC as csTwoSides } from "./specs/csTwoSides";
import { SPEC as omegaNotMind } from "./specs/omegaNotMind";
import { SPEC as whyLived } from "./specs/whyLived";
import type { InlineMap } from "./types";

export const INLINE: InlineMap = {
  "omega-point": { 3: [omegaNotMind] },
  consciousness: { 4: [csRequirements], 5: [csTwilight], 6: [csTwoSides], 8: [csOneWay] },
  why: { 0: [whyLived] },
};
