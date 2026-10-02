// Engraved scenes for the speculation figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { holocore } from "./speculation/holocore";
import { holosianScale } from "./speculation/holosianScale";
import { kernel } from "./speculation/kernel";
import { lightLag } from "./speculation/lightLag";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "speculation.lightLag": lightLag,
  "speculation.scale": holosianScale,
  "speculation.holocore": holocore,
  "speculation.kernel": kernel,
};
