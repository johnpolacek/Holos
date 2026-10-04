// Every figure spec on the site, in page order. Used to capture the PDF stills.

import { INLINE } from "./index";
import { SPECS as logic } from "./logic";
import { SPECS as logic2 } from "./logic2";
import { SPECS as logic3 } from "./logic3";
import { SPECS as predictions } from "./predictions";
import { SPECS as predictions2 } from "./predictions2";
import { SPECS as revisions } from "./revisions";
import { SPECS as speculation } from "./speculation";
import type { FigureSpec } from "./types";

const inline = Object.values(INLINE).flatMap((byIndex) =>
  Object.values(byIndex)
    .flat()
    .filter((e): e is FigureSpec => typeof e !== "function")
);

export const ALL_SPECS: FigureSpec[] = [
  ...inline,
  ...Object.values(logic),
  ...Object.values(logic2),
  ...Object.values(logic3),
  ...Object.values(predictions),
  ...Object.values(predictions2),
  ...Object.values(speculation),
  ...Object.values(revisions),
];
