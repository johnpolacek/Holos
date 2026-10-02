// Engraved scenes for the aliens figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { aliensEpidemic } from "./aliens/epidemic";
import { aliensGoingQuiet } from "./aliens/goingQuiet";
import { aliensGrabby } from "./aliens/grabby";
import { aliensHephaistos } from "./aliens/hephaistos";
import { aliensMindSize } from "./aliens/mindSize";
import { aliensOnlyOne } from "./aliens/onlyOne";
import { aliensSilence } from "./aliens/silence";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "aliens.silence": aliensSilence,
  "aliens.goingQuiet": aliensGoingQuiet,
  "aliens.onlyOne": aliensOnlyOne,
  "aliens.epidemic": aliensEpidemic,
  "aliens.grabby": aliensGrabby,
  "aliens.mindSize": aliensMindSize,
  "aliens.hephaistos": aliensHephaistos,
};
