import type { Metadata } from "next";
import { Bitter, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import LinkRewriter from "../_shared/LinkRewriter";
import MotionBoot from "../_shared/MotionBoot";
import { BASE } from "./_components/base";
import Rail from "./_components/Rail";
import "../_shared/base.css";
import "./r1.css";

// Newsreader carries the text and the display cuts (its optical-size axis); Bitter, the plates'
// lettering, sets the spaced capitals of labels, numerals, and navigation.
const serif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--r1-serif",
});
const caps = Bitter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--r1-caps",
});

export const metadata: Metadata = {
  title: "Holos (⊛) – Redesign 1: Monograph",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export default function MonographLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`rd r1 ${serif.variable} ${caps.variable}`}>
      <MotionBoot />
      <a className="r1-skip" href="#r1-main">
        Skip to text
      </a>
      <Rail base={BASE} />
      <div className="r1-body" id="r1-main">
        {children}
      </div>
      <LinkRewriter base={BASE} />
    </div>
  );
}
