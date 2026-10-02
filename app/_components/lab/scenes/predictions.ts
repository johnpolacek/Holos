// Engraved scenes for the predictions figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { claims } from "./predictions/claims";
import { rulesOut } from "./predictions/rulesOut";
import { testability } from "./predictions/testability";
import { twoLayers } from "./predictions/twoLayers";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "predictions.claims": claims,
  "predictions.rulesOut": rulesOut,
  "predictions.twoLayers": twoLayers,
  "predictions.testability": testability,
};
