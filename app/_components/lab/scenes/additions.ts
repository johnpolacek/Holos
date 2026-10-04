// Engraved scenes for figures added in the 2026-10-02 completion pass.

import type { Built3D } from "../tourScenes3d";
import { artificial } from "./additions/artificial";
import { bet } from "./additions/bet";
import { boundaries } from "./additions/boundaries";
import { checkC } from "./additions/checkC";
import { communication } from "./additions/communication";
import { csRequirements } from "./additions/csRequirements";
import { exploration } from "./additions/exploration";
import { foundations } from "./additions/foundations";
import { integration } from "./additions/integration";
import { primitives } from "./additions/primitives";
import { requirements } from "./additions/requirements";
import { testA } from "./additions/testA";
import { testB } from "./additions/testB";
import { threshold } from "./additions/threshold";
import { thresholded } from "./additions/thresholded";
import { vault } from "./additions/vault";
import { whyLived } from "./additions/whyLived";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "add.exploration": exploration,
  "add.communication": communication,
  "add.vault": vault,
  "add.checkC": checkC,
  "add.testB": testB,
  "add.testA": testA,
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
