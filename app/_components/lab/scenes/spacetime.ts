// Engraved scenes for the spacetime figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { lightCone } from "./spacetime/cone";
import { edge } from "./spacetime/edge";
import { noNow } from "./spacetime/now";
import { traces } from "./spacetime/traces";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "spacetime.cone": lightCone,
  "spacetime.now": noNow,
  "spacetime.traces": traces,
  "spacetime.edge": edge,
};
