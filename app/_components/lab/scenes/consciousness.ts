// Engraved scenes for the consciousness figures. Register each scene here by name.

import type { Built3D } from "../tourScenes3d";
import { echo } from "./consciousness/echo";
import { fluency } from "./consciousness/fluency";
import { joined } from "./consciousness/joined";

export const SCENES: Record<string, (narrow?: boolean) => Built3D> = {
  "consciousness.joined": joined,
  "consciousness.fluency": fluency,
  "consciousness.echo": echo,
};
