// Every engraved 3D scene, by name. Plate3D builds from this registry.

import { closure } from "./closureScene3d";
import { copies } from "./copies3d";
import { gallery } from "./gallery3d";
import { lineage } from "./lineage3d";
import { lived } from "./litScene3d";
import { omegaWhole } from "./omegaWhole3d";
import { SCENES as aliens } from "./scenes/aliens";
import { SCENES as consciousness } from "./scenes/consciousness";
import { SCENES as dark } from "./scenes/dark";
import { SCENES as intro } from "./scenes/intro";
import { SCENES as logic } from "./scenes/logic";
import { SCENES as logic2 } from "./scenes/logic2";
import { SCENES as predictions } from "./scenes/predictions";
import { SCENES as revisions } from "./scenes/revisions";
import { SCENES as spacetime } from "./scenes/spacetime";
import { SCENES as speculation } from "./scenes/speculation";
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
  ...intro,
  ...consciousness,
  ...spacetime,
  ...aliens,
  ...dark,
  ...logic,
  ...logic2,
  ...predictions,
  ...speculation,
  ...revisions,
};
