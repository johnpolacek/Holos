// Engraved scenes for the revisions figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { timeline } from "./revisions/timeline";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "revisions.timeline": timeline,
};
