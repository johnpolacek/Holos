import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import LinkRewriter from "../_shared/LinkRewriter";
import MotionBoot from "../_shared/MotionBoot";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "../_shared/base.css";
import "./nocturne.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--n-display",
});
const sans = Inter({ subsets: ["latin"], variable: "--n-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--n-mono" });

export const metadata: Metadata = {
  title: "Holos (⊛) – Redesign 2: Nocturne",
  robots: { index: false, follow: false },
};

export default function NocturneLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`rd r2 ${display.variable} ${sans.variable} ${mono.variable}`}>
      <MotionBoot />
      <Header />
      {children}
      <Footer />
      <LinkRewriter base="/lab/redesign/2" />
    </div>
  );
}
