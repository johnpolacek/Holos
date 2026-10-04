// Every inline figure on the Overview, merged from each group's file.

import { INLINE as aliens } from "./aliens";
import { INLINE as consciousness } from "./consciousness";
import { INLINE as dark } from "./dark";
import { INLINE as intro } from "./intro";
import { INLINE as omega } from "./omega";
import { INLINE as overview2 } from "./overview2";
import { INLINE as spacetime } from "./spacetime";
import type { InlineEntry, InlineMap } from "./types";

const GROUPS: InlineMap[] = [intro, consciousness, spacetime, omega, aliens, dark, overview2];

export const INLINE: InlineMap = {};
for (const group of GROUPS) {
  for (const [section, byIndex] of Object.entries(group)) {
    INLINE[section] ??= {};
    for (const [i, entries] of Object.entries(byIndex)) {
      const at = Number(i);
      INLINE[section][at] = [...(INLINE[section][at] ?? []), ...entries];
    }
  }
}

export const inlineAt = (section: string, index: number): InlineEntry[] =>
  INLINE[section]?.[index] ?? [];
