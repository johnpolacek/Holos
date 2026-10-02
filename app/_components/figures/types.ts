import type { ComponentType } from "react";
import type { FigureStage } from "../EngravedFigure";

// One engraved figure: the 3D scene it plays, its stages, an accessible description, and
// the still the PDF shows (a PNG in public/figures, captured at the last stage).
export type FigureSpec = {
  scene: string;
  still: string;
  label: string;
  stages: FigureStage[];
};

// An inline entry is a spec, or an existing figure component that takes `isPDF`.
export type InlineEntry = FigureSpec | ComponentType<{ isPDF?: boolean }>;

// Overview section id → paragraph index → figures shown right after that paragraph.
export type InlineMap = Record<string, Record<number, InlineEntry[]>>;
