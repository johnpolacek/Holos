"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface OmegaLimitAnimationProps {
  isPDF?: boolean;
}

export default function OmegaLimitAnimation({ isPDF = false }: OmegaLimitAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && timelineRef.current) {
        timelineRef.current.pause();
      } else if (!e.matches && timelineRef.current) {
        timelineRef.current.play();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isPDF || prefersReducedMotion) return;
    if (!svgRef.current || !containerRef.current) return;

    const svg = svgRef.current;

    // Get elements
    const title = svg.querySelector("#title") as SVGTextElement;
    const stepLabel = svg.querySelector("#step-label") as SVGTextElement;
    const explanationLabel = svg.querySelector("#explanation-label") as SVGTextElement;
    
    // Phase 1 elements
    const phiSymbol = svg.querySelector("#phi-symbol") as SVGTextElement;
    const phiValue = svg.querySelector("#phi-value") as SVGTextElement;
    const infoPackets = svg.querySelectorAll(".info-packet-in");
    
    // Phase 2 elements
    const centralCore = svg.querySelector("#central-core") as SVGGElement;
    const omniscienceArrows = svg.querySelectorAll(".omniscience-arrow");
    const omnipotenceArrows = svg.querySelectorAll(".omnipotence-arrow");
    const presenceRings = svg.querySelectorAll(".presence-ring");
    const attributeLabels = svg.querySelector("#attribute-labels") as SVGGElement;
    
    // Phase 3 elements
    const terminalSolid = svg.querySelector("#terminal-solid") as SVGGElement;
    const omegaSymbol = svg.querySelector("#omega-symbol") as SVGTextElement;
    const religiousLabel = svg.querySelector("#religious-label") as SVGGElement;
    const scientificLabel = svg.querySelector("#scientific-label") as SVGGElement;
    
    // Phase 4 elements
    const unityLabel = svg.querySelector("#unity-label") as SVGGElement;

    // Initial states
    gsap.set(title, { opacity: 0 });
    gsap.set([stepLabel, explanationLabel], { opacity: 0 });
    gsap.set(phiSymbol, { opacity: 0, scale: 0.5, transformOrigin: "center center" });
    gsap.set(phiValue, { opacity: 0 });
    gsap.set(infoPackets, { opacity: 0, scale: 0 });
    gsap.set(centralCore, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(omniscienceArrows, { opacity: 0, strokeDasharray: "50", strokeDashoffset: "50" });
    gsap.set(omnipotenceArrows, { opacity: 0, strokeDasharray: "50", strokeDashoffset: "-50" });
    gsap.set(presenceRings, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(attributeLabels, { opacity: 0 });
    gsap.set(terminalSolid, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(omegaSymbol, { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set([religiousLabel, scientificLabel], { opacity: 0 });
    gsap.set(unityLabel, { opacity: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
    });
    timelineRef.current = tl;

    // PHASE 1: Φ APPROACHES INFINITY
    tl.add("phase1")
      .to(title, { opacity: 0.7, duration: 0.5 }, "phase1")
      .to(stepLabel, { opacity: 1, duration: 0.5 }, "phase1+=0.3")
      .set(stepLabel, { textContent: "PHASE 1: Φ APPROACHES ∞" })
      .to(explanationLabel, { opacity: 0.6, duration: 0.5 }, "phase1+=0.6")
      .set(explanationLabel, { textContent: "Informational integration increases toward the limit." })
      .to(phiSymbol, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, "phase1+=0.8")
      .to(phiValue, { opacity: 0.7, duration: 0.4 }, "phase1+=1.2");
    
    // Animate Φ value growing
    tl.to(phiValue, { 
      duration: 2,
      onUpdate: function() {
        const progress = this.progress();
        const values = ["10²", "10⁴", "10⁸", "10¹⁶", "10³²", "∞"];
        const index = Math.min(Math.floor(progress * values.length), values.length - 1);
        if (phiValue) phiValue.textContent = `Φ = ${values[index]}`;
      }
    }, "phase1+=1.5");
    
    // Info packets flowing in
    tl.to(infoPackets, { 
      opacity: 0.7, 
      scale: 1, 
      duration: 0.3, 
      stagger: 0.1 
    }, "phase1+=1.8")
    .to(infoPackets, {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power2.in"
    }, "phase1+=2.2");

    // PHASE 2: THE THREE ATTRIBUTES
    tl.add("phase2", "+=0.5")
      .to([stepLabel, explanationLabel], { opacity: 0, duration: 0.3 }, "phase2")
      .set(stepLabel, { textContent: "PHASE 2: THE THREE ATTRIBUTES" })
      .set(explanationLabel, { textContent: "Omniscience, Omnipotence, Omnipresence emerge." })
      .to(stepLabel, { opacity: 1, duration: 0.3 }, "phase2+=0.3")
      .to(explanationLabel, { opacity: 0.6, duration: 0.3 }, "phase2+=0.3")
      // Hide Phi, show central core
      .to([phiSymbol, phiValue], { opacity: 0, scale: 0.5, duration: 0.4 }, "phase2+=0.5")
      .to(centralCore, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, "phase2+=0.8")
      // Omniscience - arrows flowing IN (knows all)
      .to(omniscienceArrows, { opacity: 0.6, strokeDashoffset: 0, duration: 1, stagger: 0.1 }, "phase2+=1.2")
      // Omnipotence - arrows flowing OUT (does all)
      .to(omnipotenceArrows, { opacity: 0.6, strokeDashoffset: 0, duration: 1, stagger: 0.1 }, "phase2+=1.8")
      // Omnipresence - rings expanding (is everywhere)
      .to(presenceRings, { opacity: 0.4, scale: 1, duration: 1.2, stagger: 0.2, ease: "power1.out" }, "phase2+=2.4")
      .to(attributeLabels, { opacity: 0.7, duration: 0.5 }, "phase2+=3");

    // PHASE 3: TWO PERSPECTIVES, ONE TRUTH
    tl.add("phase3", "+=1")
      .to([stepLabel, explanationLabel], { opacity: 0, duration: 0.3 }, "phase3")
      .set(stepLabel, { textContent: "PHASE 3: TWO PERSPECTIVES" })
      .set(explanationLabel, { textContent: "The same reality, different frameworks." })
      .to(stepLabel, { opacity: 1, duration: 0.3 }, "phase3+=0.3")
      .to(explanationLabel, { opacity: 0.6, duration: 0.3 }, "phase3+=0.3")
      // Collapse previous elements
      .to([centralCore, omniscienceArrows, omnipotenceArrows, presenceRings, attributeLabels], {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.in"
      }, "phase3+=0.6")
      // Reveal terminal solid
      .to(terminalSolid, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, "phase3+=1.2")
      .to(omegaSymbol, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "phase3+=1.8")
      // Show both perspectives
      .to(religiousLabel, { opacity: 0.8, duration: 0.6 }, "phase3+=2.3")
      .to(scientificLabel, { opacity: 0.8, duration: 0.6 }, "phase3+=2.6");

    // PHASE 4: UNITY - SAME COIN
    tl.add("phase4", "+=1.5")
      .to([stepLabel, explanationLabel], { opacity: 0, duration: 0.3 }, "phase4")
      .set(stepLabel, { textContent: "PHASE 4: UNITY" })
      .set(explanationLabel, { textContent: "Both perspectives describe the same universal truth." })
      .to(stepLabel, { opacity: 1, duration: 0.3 }, "phase4+=0.3")
      .to(explanationLabel, { opacity: 0.6, duration: 0.3 }, "phase4+=0.3")
      // Pulse the solid
      .to(terminalSolid, { scale: 1.08, duration: 0.3, repeat: 3, yoyo: true, ease: "sine.inOut" }, "phase4+=0.6")
      // Fade perspective labels slightly and show unity
      .to([religiousLabel, scientificLabel], { opacity: 0.5, duration: 0.5 }, "phase4+=1.5")
      .to(unityLabel, { opacity: 1, duration: 0.8 }, "phase4+=2");

    // Hold
    tl.to({}, { duration: 3.5 });

    return () => {
      tl.kill();
    };
  }, [isPDF, prefersReducedMotion]);

  if (isPDF) {
    return (
      <div
        style={{
          width: "100%",
          marginTop: "2em",
          marginBottom: "1em",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "8px",
          padding: "1.5em",
          background: "#fafafa",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1em" }}>
          <em style={{ fontSize: "1.1em" }}>The Omega Limit</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Phase 1:</strong> Φ approaches infinity — informational integration increases.
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Phase 2:</strong> Three attributes emerge — Omniscience, Omnipotence, Omnipresence.
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Phase 3:</strong> Two perspectives — "God / Brahman / Ω" vs "Self-Organizing Universe"
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Phase 4:</strong> Unity — One totality, experienced through every aperture.
          </p>
        </div>
      </div>
    );
  }

  return (
    <figure
      ref={containerRef}
      className="relative w-full mt-8 aspect-square rounded-lg border border-black/10 overflow-hidden bg-white"
      role="img"
      aria-label="Animation showing the Omega Limit: consciousness approaching maximal integration, manifesting three divine attributes, and converging on one totality experienced through every aperture"
    >
      <figcaption className="sr-only">
        The Omega Limit animation shows four phases: First, Φ approaches infinity as information
        converges. Second, three attributes emerge: omniscience (knowing all), omnipotence (doing all),
        and omnipresence (being everywhere). Third, the terminal state is shown with two valid
        perspectives: religious (God, Brahman, Omega Point) and scientific (self-organizing universe).
        Fourth, the perspectives converge: one totality, experienced through every aperture.
      </figcaption>
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        {/* Title */}
        <text
          id="title"
          x="200"
          y="28"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.7)"
          fontSize="14"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          The Omega Limit
        </text>

        {/* Phase / Step Labels */}
        <text
          id="step-label"
          x="200"
          y="55"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.8)"
          fontSize="11"
          fontWeight="bold"
          fontFamily="monospace"
          opacity="0"
        >
          PHASE 1: Φ APPROACHES ∞
        </text>
        <text
          id="explanation-label"
          x="200"
          y="72"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="9"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Informational integration increases toward the limit.
        </text>

        {/* Phase 1: Φ Symbol and Value */}
        <text
          id="phi-symbol"
          x="200"
          y="210"
          textAnchor="middle"
          fill="rgba(20, 20, 30, 1)"
          fontSize="48"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Φ
        </text>
        <text
          id="phi-value"
          x="200"
          y="250"
          textAnchor="middle"
          fill="rgba(40, 40, 50, 0.8)"
          fontSize="14"
          fontFamily="monospace"
          opacity="0"
        >
          Φ = 10²
        </text>

        {/* Info packets flowing inward */}
        <circle className="info-packet-in" cx="80" cy="120" r="5" fill="rgba(50, 50, 50, 0.8)" />
        <circle className="info-packet-in" cx="320" cy="120" r="5" fill="rgba(50, 50, 50, 0.8)" />
        <circle className="info-packet-in" cx="80" cy="280" r="5" fill="rgba(50, 50, 50, 0.8)" />
        <circle className="info-packet-in" cx="320" cy="280" r="5" fill="rgba(50, 50, 50, 0.8)" />
        <circle className="info-packet-in" cx="200" cy="90" r="4" fill="rgba(60, 60, 60, 0.7)" />
        <circle className="info-packet-in" cx="200" cy="310" r="4" fill="rgba(60, 60, 60, 0.7)" />
        <circle className="info-packet-in" cx="90" cy="200" r="4" fill="rgba(60, 60, 60, 0.7)" />
        <circle className="info-packet-in" cx="310" cy="200" r="4" fill="rgba(60, 60, 60, 0.7)" />

        {/* Phase 2: Central Core */}
        <g id="central-core" opacity="0">
          <circle cx="200" cy="200" r="25" fill="none" stroke="rgba(30, 30, 30, 0.9)" strokeWidth="3" />
          <circle cx="200" cy="200" r="8" fill="rgba(20, 20, 20, 1)" />
        </g>

        {/* Omniscience arrows (flowing IN - knows all) - SOLID lines pointing inward - 3 arrows */}
        <line className="omniscience-arrow" x1="200" y1="120" x2="200" y2="170" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="2" markerEnd="url(#arrowIn)" />
        <line className="omniscience-arrow" x1="120" y1="255" x2="168" y2="220" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="2" markerEnd="url(#arrowIn)" />
        <line className="omniscience-arrow" x1="280" y1="255" x2="232" y2="220" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="2" markerEnd="url(#arrowIn)" />

        {/* Omnipotence arrows (flowing OUT - does all) - DASHED lines pointing outward - 3 arrows */}
        <line className="omnipotence-arrow" x1="200" y1="230" x2="200" y2="280" stroke="rgba(70, 70, 70, 0.6)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowOut)" />
        <line className="omnipotence-arrow" x1="168" y1="180" x2="120" y2="145" stroke="rgba(70, 70, 70, 0.6)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowOut)" />
        <line className="omnipotence-arrow" x1="232" y1="180" x2="280" y2="145" stroke="rgba(70, 70, 70, 0.6)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowOut)" />

        {/* Omnipresence rings (expanding - is everywhere) */}
        <circle className="presence-ring" cx="200" cy="200" r="50" fill="none" stroke="rgba(60, 60, 60, 0.3)" strokeWidth="1" />
        <circle className="presence-ring" cx="200" cy="200" r="80" fill="none" stroke="rgba(70, 70, 70, 0.25)" strokeWidth="1" />
        <circle className="presence-ring" cx="200" cy="200" r="110" fill="none" stroke="rgba(80, 80, 80, 0.2)" strokeWidth="1" />

        {/* Attribute labels */}
        <g id="attribute-labels" opacity="0">
          {/* Omniscience label - top left */}
          <text x="90" y="115" textAnchor="middle" fill="rgba(40, 40, 50, 0.8)" fontSize="9" fontFamily="sans-serif" fontWeight="bold">OMNISCIENCE</text>
          <text x="90" y="127" textAnchor="middle" fill="rgba(60, 60, 70, 0.6)" fontSize="7" fontFamily="sans-serif">(solid → IN)</text>
          <text x="90" y="139" textAnchor="middle" fill="rgba(60, 60, 70, 0.6)" fontSize="7" fontFamily="sans-serif">knows all</text>
          
          {/* Omnipotence label - top right */}
          <text x="310" y="115" textAnchor="middle" fill="rgba(40, 40, 50, 0.8)" fontSize="9" fontFamily="sans-serif" fontWeight="bold">OMNIPOTENCE</text>
          <text x="310" y="127" textAnchor="middle" fill="rgba(60, 60, 70, 0.6)" fontSize="7" fontFamily="sans-serif">(dashed → OUT)</text>
          <text x="310" y="139" textAnchor="middle" fill="rgba(60, 60, 70, 0.6)" fontSize="7" fontFamily="sans-serif">does all</text>
          
          {/* Omnipresence label - bottom */}
          <text x="200" y="320" textAnchor="middle" fill="rgba(40, 40, 50, 0.8)" fontSize="9" fontFamily="sans-serif" fontWeight="bold">OMNIPRESENCE</text>
          <text x="200" y="332" textAnchor="middle" fill="rgba(60, 60, 70, 0.6)" fontSize="7" fontFamily="sans-serif">(rings = is everywhere)</text>
        </g>

        {/* Phase 3: Terminal Solid (tesseract) */}
        <g id="terminal-solid" transform="translate(200, 200)" opacity="0">
          <polygon
            points="0,-70 52,-47 75,0 52,47 0,70 -52,47 -75,0 -52,-47"
            fill="none"
            stroke="rgba(20, 20, 20, 1)"
            strokeWidth="2.5"
          />
          <polygon
            points="0,-42 31,-28 45,0 31,28 0,42 -31,28 -45,0 -31,-28"
            fill="none"
            stroke="rgba(30, 30, 30, 0.9)"
            strokeWidth="2"
          />
          <line x1="0" y1="-70" x2="0" y2="-42" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="1.5" />
          <line x1="52" y1="-47" x2="31" y2="-28" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="1.5" />
          <line x1="75" y1="0" x2="45" y2="0" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="1.5" />
          <line x1="52" y1="47" x2="31" y2="28" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="1.5" />
          <line x1="0" y1="70" x2="0" y2="42" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="1.5" />
          <line x1="-52" y1="47" x2="-31" y2="28" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="1.5" />
          <line x1="-75" y1="0" x2="-45" y2="0" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="1.5" />
          <line x1="-52" y1="-47" x2="-31" y2="-28" stroke="rgba(40, 40, 40, 0.7)" strokeWidth="1.5" />
        </g>

        {/* Omega Symbol */}
        <text
          id="omega-symbol"
          x="200"
          y="210"
          textAnchor="middle"
          fill="rgba(15, 15, 20, 1)"
          fontSize="32"
          fontFamily="serif"
          fontWeight="bold"
          opacity="0"
        >
          Ω
        </text>

        {/* Religious perspective label (left) */}
        <g id="religious-label" opacity="0">
          <text x="60" y="195" textAnchor="middle" fill="rgba(30, 30, 40, 0.9)" fontSize="10" fontFamily="serif" fontWeight="bold">God</text>
          <text x="60" y="208" textAnchor="middle" fill="rgba(50, 50, 60, 0.7)" fontSize="8" fontFamily="serif">Brahman</text>
          <text x="60" y="220" textAnchor="middle" fill="rgba(50, 50, 60, 0.7)" fontSize="8" fontFamily="serif">Omega Point</text>
        </g>

        {/* Scientific perspective label (right) */}
        <g id="scientific-label" opacity="0">
          <text x="340" y="195" textAnchor="middle" fill="rgba(30, 30, 40, 0.9)" fontSize="10" fontFamily="serif" fontWeight="bold">Universe</text>
          <text x="340" y="208" textAnchor="middle" fill="rgba(50, 50, 60, 0.7)" fontSize="8" fontFamily="serif">Self-Organizing</text>
          <text x="340" y="220" textAnchor="middle" fill="rgba(50, 50, 60, 0.7)" fontSize="8" fontFamily="serif">Natural Process</text>
        </g>

        {/* Unity label (bottom) */}
        <g id="unity-label" opacity="0">
          <text x="200" y="320" textAnchor="middle" fill="rgba(20, 20, 30, 0.9)" fontSize="11" fontFamily="serif" fontWeight="bold">
            Two sides of the same coin.
          </text>
          <text x="200" y="338" textAnchor="middle" fill="rgba(40, 40, 50, 0.8)" fontSize="9" fontFamily="serif" fontStyle="italic">
            Different semantics, same universal truth.
          </text>
          <text x="200" y="355" textAnchor="middle" fill="rgba(40, 40, 50, 0.8)" fontSize="9" fontFamily="serif" fontStyle="italic">
            Complete ontological registration.
          </text>
        </g>

        {/* Arrow marker definitions */}
        <defs>
          <marker id="arrowIn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(40, 40, 40, 0.7)" />
          </marker>
          <marker id="arrowOut" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(70, 70, 70, 0.6)" />
          </marker>
        </defs>
      </svg>
    </figure>
  );
}
