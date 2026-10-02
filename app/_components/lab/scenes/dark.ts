// Engraved scenes for the dark figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { budget } from "./dark/budget";
import { landauer } from "./dark/landauer";
import { lineup } from "./dark/lineup";
import { node } from "./dark/node";
import { tell } from "./dark/tell";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "dark.budget": budget,
  "dark.landauer": landauer,
  "dark.node": node,
  "dark.lineup": lineup,
  "dark.tell": tell,
};
