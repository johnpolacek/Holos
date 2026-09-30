import type { Metadata } from "next";
import { Bitter, Inter_Tight, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";
import { getSection, introBoxes } from "../_shared/content";
import LinkRewriter from "../_shared/LinkRewriter";
import MotionBoot from "../_shared/MotionBoot";
import { BASE } from "./_components/atlas";
import Chrome from "./_components/Chrome";
import "../_shared/base.css";
import "./r3.css";

// Atlas: Holos as an atlas of plates. Inter Tight for display and UI, Source Serif 4 for
// reading, Bitter italic for symbols and plate captions, in the engraved paper and ink.

const display = Inter_Tight({
  subsets: ["latin", "greek"],
  style: ["normal", "italic"],
  variable: "--r3-display",
});
const serif = Source_Serif_4({
  subsets: ["latin", "greek"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--r3-serif",
});
const plate = Bitter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--r3-plate",
});

export const metadata: Metadata = {
  title: "Holos (⊛) – Redesign 3: Atlas",
  robots: { index: false, follow: false },
};

export default function AtlasLayout({ children }: { children: ReactNode }) {
  const intro = getSection("introduction");
  return (
    <div className={`rd r3 ${display.variable} ${serif.variable} ${plate.variable}`}>
      <MotionBoot />
      <Chrome
        base={BASE}
        glossary={intro.paragraphs[introBoxes.terms]}
        legend={intro.paragraphs[introBoxes.claims]}
      />
      {children}
      <LinkRewriter base={BASE} />
    </div>
  );
}
