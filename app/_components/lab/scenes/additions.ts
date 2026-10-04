// Engraved scenes for figures added in the 2026-10-02 completion pass.

import type { Built3D } from "../tourScenes3d";
import { bet } from "./additions/bet";
import { csRequirements } from "./additions/csRequirements";
import { primitives } from "./additions/primitives";
import { thresholded } from "./additions/thresholded";
import { whyLived } from "./additions/whyLived";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "add.primitives": primitives,
  "add.thresholded": thresholded,
  "add.bet": bet,
  "add.csRequirements": csRequirements,
  "add.whyLived": whyLived,
};
