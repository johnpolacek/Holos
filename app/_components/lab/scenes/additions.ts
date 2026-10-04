// Engraved scenes for figures added in the 2026-10-02 completion pass.

import type { Built3D } from "../tourScenes3d";
import { artificial } from "./additions/artificial";
import { bet } from "./additions/bet";
import { boundaries } from "./additions/boundaries";
import { csRequirements } from "./additions/csRequirements";
import { foundations } from "./additions/foundations";
import { integration } from "./additions/integration";
import { primitives } from "./additions/primitives";
import { requirements } from "./additions/requirements";
import { threshold } from "./additions/threshold";
import { thresholded } from "./additions/thresholded";
import { whyLived } from "./additions/whyLived";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "add.boundaries": boundaries,
  "add.integration": integration,
  "add.artificial": artificial,
  "add.requirements": requirements,
  "add.threshold": threshold,
  "add.foundations": foundations,
  "add.primitives": primitives,
  "add.thresholded": thresholded,
  "add.bet": bet,
  "add.csRequirements": csRequirements,
  "add.whyLived": whyLived,
};
