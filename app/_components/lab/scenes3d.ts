// Every engraved 3D scene, by name. Plate3D builds from this registry.

import { closure } from "./closureScene3d";
import { copies } from "./copies3d";
import { gallery } from "./gallery3d";
import { lineage } from "./lineage3d";
import { lived } from "./litScene3d";
import { omegaWhole } from "./omegaWhole3d";
import type { Built3D } from "./tourScenes3d";
import { SCENES3D as TOUR } from "./tourScenes3d";

// `narrow` asks for the portrait composition; scenes without one ignore it.
export const SCENES3D: Record<string, (narrow?: boolean) => Built3D> = {
  ...TOUR,
  lived,
  closure,
  omegaWhole,
  gallery,
  copies,
  lineage,
};
