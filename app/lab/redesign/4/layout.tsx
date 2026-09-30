import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";
import LinkRewriter from "../_shared/LinkRewriter";
import MotionBoot from "../_shared/MotionBoot";
import { BASE } from "./_components/base";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "../_shared/base.css";
import "./r4.css";

// Archivo carries a width axis (62 to 125) as well as weight: the poster type uses both.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--r4-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--r4-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Holos (⊛) – Redesign 4: Ledger",
  robots: { index: false, follow: false },
};

export default function LedgerLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`rd r4 ${archivo.variable} ${mono.variable}`}>
      <MotionBoot />
      <a className="r4-skip" href="#r4-main">
        Skip to content
      </a>
      <Header base={BASE} />
      <div id="r4-main">{children}</div>
      <Footer base={BASE} />
      <LinkRewriter base={BASE} />
    </div>
  );
}
