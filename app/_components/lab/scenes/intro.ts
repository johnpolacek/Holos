// Engraved scenes for the intro figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { claims } from "./intro/claims";
import { formula } from "./intro/formula";
import { closing, witness } from "./intro/orrery";
import { twoIdeas } from "./intro/twoIdeas";
import { walls } from "./intro/walls";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "intro.witness": witness,
  "intro.formula": formula,
  "intro.twoIdeas": twoIdeas,
  "intro.claims": claims,
  "intro.walls": walls,
  "intro.closing": closing,
};
