// Every engraved 3D scene, by name. Plate3D builds from this registry.

import { lived } from "./litScene3d";
import type { Built3D } from "./tourScenes3d";
import { SCENES3D as TOUR } from "./tourScenes3d";

export const SCENES3D: Record<string, () => Built3D> = { ...TOUR, lived };
