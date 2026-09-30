"use client";

import { useState } from "react";

type Term = "R" | "C" | "O" | null;

export default function RcoHover() {
  const [on, setOn] = useState<Term>(null);
  const letter = (t: Exclude<Term, null>) => (
    <span
      onMouseEnter={() => setOn(t)}
      onMouseLeave={() => setOn(null)}
      className="cursor-default transition-colors"
      style={{ color: on === t ? "#b3401e" : undefined }}
    >
      {t}
    </span>
  );
  const sentence = (t: Exclude<Term, null>, text: string) => (
    <span
      onMouseEnter={() => setOn(t)}
      onMouseLeave={() => setOn(null)}
      className="transition-all"
      style={{
        textDecoration: on === t ? "underline" : "none",
        textDecorationColor: "#b3401e",
        textUnderlineOffset: "4px",
      }}
    >
      {text}
    </span>
  );
  return (
    <p>
      Holos writes this as{" "}
      <span style={{ fontFamily: "var(--font-fell)", fontStyle: "italic", fontSize: "1.2em" }}>
        {letter("R")} = {letter("C")} ⊛ {letter("O")}
      </span>
      . {sentence("C", "Creation is the structure physics produces.")}{" "}
      {sentence("O", "Observation is that structure experienced from the inside.")}{" "}
      {sentence("R", "Reality is the result.")} On the physics Holos bets on, observing changes
      nothing it takes in (see{" "}
      <a href="/logic#mathematical-formalism" className="underline">
        Notation
      </a>
      ).
    </p>
  );
}
