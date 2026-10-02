// Engraved scenes for the logic figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { axiomMap, claimsMap } from "./logic/claims";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "logic.claims": claimsMap,
  "logic.axioms": axiomMap,
};
