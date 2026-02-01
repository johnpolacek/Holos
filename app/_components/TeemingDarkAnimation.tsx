"use client";

import gsap from "gsap";
import { Earth, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TeemingDarkAnimationProps {
  isPDF?: boolean;
}

export default function TeemingDarkAnimation({ isPDF = false }: TeemingDarkAnimationProps) {
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
    const earthGroup = svg.querySelector("#earth-group") as SVGGElement;
    const dishGroup = svg.querySelector("#dish-group") as SVGGElement;
    const waves = svg.querySelectorAll(".wave") as NodeListOf<SVGCircleElement>;
    const starfield = svg.querySelector("#starfield") as SVGGElement;
    const whereLabel = svg.querySelector("#where-label") as SVGTextElement;
    const silenceLabel = svg.querySelector("#silence-label") as SVGTextElement;
    const darkMatter = svg.querySelector("#dark-matter") as SVGGElement;
    const teemingLabel = svg.querySelector("#teeming-label") as SVGTextElement;
    const caption = svg.querySelector("#caption") as SVGTextElement;

    // Initial states
    gsap.set(title, { opacity: 0 });
    gsap.set(earthGroup, { opacity: 0 });
    gsap.set(dishGroup, { opacity: 0 });
    gsap.set(waves, { opacity: 0, scale: 0.3, transformOrigin: "280px 260px" });
    gsap.set(starfield, { opacity: 0 });
    gsap.set(whereLabel, { opacity: 0 });
    gsap.set(silenceLabel, { opacity: 0 });
    gsap.set(darkMatter, { opacity: 0 });
    gsap.set(teemingLabel, { opacity: 0 });
    gsap.set(caption, { opacity: 0 });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });
    timelineRef.current = tl;

    // Phase 1: Earth listening
    tl.add("listening")
      .to(title, { opacity: 0.6, duration: 0.5 }, "listening")
      .to(starfield, { opacity: 1, duration: 1 }, "listening+=0.2")
      .to(earthGroup, { opacity: 1, duration: 0.5 }, "listening+=0.5")
      .to(dishGroup, { opacity: 1, duration: 0.3 }, "listening+=0.7");

    // Waves expanding outward (staggered, repeating pulse)
    tl.add("waves", "listening+=1")
      .to(waves[0], { opacity: 0.6, scale: 1, duration: 1.2, ease: "power1.out" }, "waves")
      .to(waves[0], { opacity: 0, duration: 0.8 }, "waves+=1")
      .to(waves[1], { opacity: 0.5, scale: 1, duration: 1.2, ease: "power1.out" }, "waves+=0.4")
      .to(waves[1], { opacity: 0, duration: 0.8 }, "waves+=1.4")
      .to(waves[2], { opacity: 0.4, scale: 1, duration: 1.2, ease: "power1.out" }, "waves+=0.8")
      .to(waves[2], { opacity: 0, duration: 0.8 }, "waves+=1.8")
      .to(whereLabel, { opacity: 0.7, duration: 0.5 }, "waves+=1.2");

    // Phase 2: The Eerie Silence
    tl.add("silence", "+=0.8")
      .to(whereLabel, { opacity: 0, duration: 0.4 }, "silence")
      .to(silenceLabel, { opacity: 0.6, duration: 0.5 }, "silence+=0.3")
      .to({}, { duration: 1.5 }); // hold on silence

    // Phase 3: The Switch - dim stars, reveal dark matter
    tl.add("switch", "+=0.3")
      .to(silenceLabel, { opacity: 0, duration: 0.4 }, "switch")
      .to(starfield, { opacity: 0.3, duration: 0.6 }, "switch")
      .to(darkMatter, { opacity: 1, duration: 1.2, ease: "power2.out" }, "switch+=0.4");

    // Phase 4: The Teeming Dark
    tl.add("teeming", "+=0.5")
      .to(teemingLabel, { opacity: 0.85, duration: 0.5 }, "teeming")
      .to(caption, { opacity: 0.7, duration: 0.5 }, "teeming+=0.4")
      .to({}, { duration: 2.5 }); // hold

    // Reset
    tl.add("reset")
      .to(
        [
          title,
          earthGroup,
          dishGroup,
          starfield,
          whereLabel,
          silenceLabel,
          darkMatter,
          teemingLabel,
          caption,
        ],
        { opacity: 0, duration: 0.5 },
        "reset"
      )
      .to(waves, { opacity: 0, duration: 0.3 }, "reset")
      .set(waves, { scale: 0.3 });

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
          <em style={{ fontSize: "1.1em" }}>The Teeming Dark</em>
        </div>
        <div style={{ textAlign: "center", color: "rgba(0,0,0,0.7)", fontSize: "0.9em" }}>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Earth Listening:</strong> Radio signals sent into the cosmos
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>The Eerie Silence:</strong> No response detected
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>The Switch:</strong> We were listening for the wrong signal
          </p>
          <p style={{ margin: "0.5em 0" }}>
            <strong>Ordered Dark Matter:</strong> The gravitational signature of post-baryonic systems that have achieved high informational integration.
          </p>
          <p style={{ margin: "1em 0", fontStyle: "italic" }}>
            The silence is not empty. It is the Teeming Dark.
          </p>
        </div>
      </div>
    );
  }

  // Generate random starfield positions (light gray dots)
  const stars = Array.from({ length: 100 }, () => ({
    cx: 20 + Math.random() * 520,
    cy: 15 + Math.random() * 220,
    r: 0.8 + Math.random() * 1.2,
    opacity: 0.2 + Math.random() * 0.35,
  }));

  return (
    <figure
      ref={containerRef}
      className="relative w-full mt-8 aspect-video rounded-lg border border-black/10 overflow-hidden bg-white"
      role="img"
      aria-label="Animation showing Earth listening for signals in the cosmos, encountering the Eerie Silence, then revealing dark matter as the Teeming Dark - gravitational evidence of transcended civilizations"
    >
      <figcaption className="sr-only">
        The Teeming Dark animation illustrates the answer to the Fermi Paradox. Earth sends radio
        signals into space and listens for a response. The cosmos appears silent - no signals
        detected. Then the perspective shifts: the starfield dims and dark matter structures become
        visible as geometric, cubist forms. The silence was never empty; it is the gravitational
        footprint of civilizations that have transcended into higher dimensions.
      </figcaption>
      <svg
        ref={svgRef}
        viewBox="0 0 560 315"
        className="w-full h-full"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        {/* Title */}
        <text
          id="title"
          x="280"
          y="22"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="12"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          The Answer to The Eerie Silence
        </text>

        {/* Starfield (light gray dots) */}
        <g id="starfield" opacity="0">
          {stars.map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill={`rgba(0, 0, 0, ${star.opacity})`}
            />
          ))}
        </g>

        {/* Dark Matter structures - Cubist/geometric style (hidden initially) */}
        <g id="dark-matter" opacity="0" transform="translate(0, 8)">
          {/* Large angular forms */}
          <polygon
            points="120,60 160,40 180,70 150,95 110,80"
            fill="rgba(40, 40, 40, 0.15)"
            stroke="rgba(30, 30, 30, 0.3)"
            strokeWidth="1"
          />
          <polygon
            points="200,30 250,25 270,55 240,85 195,70"
            fill="rgba(50, 50, 50, 0.12)"
            stroke="rgba(30, 30, 30, 0.25)"
            strokeWidth="1"
          />
          <polygon
            points="320,35 380,30 400,65 370,100 330,90 310,60"
            fill="rgba(35, 35, 35, 0.18)"
            stroke="rgba(20, 20, 20, 0.35)"
            strokeWidth="1"
          />
          <polygon
            points="420,50 470,45 490,80 460,120 415,100"
            fill="rgba(45, 45, 45, 0.14)"
            stroke="rgba(30, 30, 30, 0.28)"
            strokeWidth="1"
          />

          {/* Medium angular nodes */}
          <polygon
            points="80,120 115,105 135,130 110,155 75,145"
            fill="rgba(30, 30, 30, 0.2)"
            stroke="rgba(20, 20, 20, 0.4)"
            strokeWidth="1"
          />
          <polygon
            points="170,100 210,90 230,120 200,150 165,135"
            fill="rgba(40, 40, 40, 0.22)"
            stroke="rgba(25, 25, 25, 0.38)"
            strokeWidth="1"
          />
          <polygon
            points="280,80 330,70 355,105 325,140 275,125"
            fill="rgba(35, 35, 35, 0.25)"
            stroke="rgba(20, 20, 20, 0.45)"
            strokeWidth="1"
          />
          <polygon
            points="380,110 430,95 455,130 420,165 375,150"
            fill="rgba(45, 45, 45, 0.18)"
            stroke="rgba(30, 30, 30, 0.32)"
            strokeWidth="1"
          />

          {/* Smaller dense cores */}
          <polygon
            points="140,55 165,50 175,70 155,85 135,75"
            fill="rgba(25, 25, 25, 0.4)"
            stroke="rgba(15, 15, 15, 0.6)"
            strokeWidth="1"
          />
          <polygon
            points="350,55 375,48 388,72 368,90 345,80"
            fill="rgba(20, 20, 20, 0.45)"
            stroke="rgba(10, 10, 10, 0.65)"
            strokeWidth="1"
          />
          <polygon
            points="300,95 325,88 340,112 318,130 295,118"
            fill="rgba(30, 30, 30, 0.5)"
            stroke="rgba(15, 15, 15, 0.7)"
            strokeWidth="1"
          />
          <polygon
            points="190,110 215,102 228,125 208,142 185,132"
            fill="rgba(25, 25, 25, 0.42)"
            stroke="rgba(15, 15, 15, 0.58)"
            strokeWidth="1"
          />

          {/* Connecting angular filaments */}
          <path
            d="M 155 75 L 190 105 L 210 100"
            fill="none"
            stroke="rgba(30, 30, 30, 0.35)"
            strokeWidth="1.5"
          />
          <path
            d="M 210 100 L 250 85 L 300 95"
            fill="none"
            stroke="rgba(25, 25, 25, 0.3)"
            strokeWidth="1.5"
          />
          <path
            d="M 300 95 L 345 70 L 370 75"
            fill="none"
            stroke="rgba(30, 30, 30, 0.32)"
            strokeWidth="1.5"
          />
          <path
            d="M 110 130 L 165 115 L 190 110"
            fill="none"
            stroke="rgba(25, 25, 25, 0.28)"
            strokeWidth="1"
          />
          <path
            d="M 325 110 L 375 125 L 420 115"
            fill="none"
            stroke="rgba(30, 30, 30, 0.3)"
            strokeWidth="1"
          />

          {/* Additional geometric accents */}
          <line x1="140" y1="70" x2="195" y2="105" stroke="rgba(20, 20, 20, 0.2)" strokeWidth="1" />
          <line x1="350" y1="65" x2="305" y2="100" stroke="rgba(20, 20, 20, 0.2)" strokeWidth="1" />
          <line x1="225" y1="50" x2="280" y2="85" stroke="rgba(25, 25, 25, 0.18)" strokeWidth="1" />
          <line
            x1="450"
            y1="75"
            x2="400"
            y2="120"
            stroke="rgba(25, 25, 25, 0.18)"
            strokeWidth="1"
          />
        </g>

        {/* Radio waves (expanding from Earth) - grayscale */}
        <circle
          className="wave"
          cx="280"
          cy="260"
          r="60"
          fill="none"
          stroke="rgba(80, 80, 80, 0.5)"
          strokeWidth="1"
          opacity="0"
        />
        <circle
          className="wave"
          cx="280"
          cy="260"
          r="100"
          fill="none"
          stroke="rgba(100, 100, 100, 0.4)"
          strokeWidth="1"
          opacity="0"
        />
        <circle
          className="wave"
          cx="280"
          cy="260"
          r="140"
          fill="none"
          stroke="rgba(120, 120, 120, 0.3)"
          strokeWidth="1"
          opacity="0"
        />

        {/* Earth using Lucide Earth icon */}
        <g id="earth-group" opacity="0" transform="translate(262, 242)">
          <Earth size={36} strokeWidth={1} stroke="rgba(60, 60, 60, 0.9)" fill="none" />
        </g>

        {/* Satellite Dish using Lucide Radio icon */}
        <g id="dish-group" opacity="0" transform="translate(272, 212)">
          <Radio size={16} strokeWidth={1.5} stroke="rgba(50, 50, 50, 0.85)" fill="none" />
        </g>

        {/* "Where is everybody?" label */}
        <text
          id="where-label"
          x="280"
          y="180"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="14"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          Where is everybody?
        </text>

        {/* "The Eerie Silence" label */}
        <text
          id="silence-label"
          x="280"
          y="160"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.5)"
          fontSize="13"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          The Eerie Silence
        </text>

        {/* "The Teeming Dark" label */}
        <text
          id="teeming-label"
          x="280"
          y="168"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.8)"
          fontSize="16"
          fontFamily="serif"
          fontWeight="500"
          opacity="0"
        >
          The Teeming Dark
        </text>

        {/* Caption */}
        <text
          id="caption"
          x="280"
          y="300"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.6)"
          fontSize="10"
          fontFamily="serif"
          fontStyle="italic"
          opacity="0"
        >
          The silence is not empty. Dark Matter is the gravitational footprint.
        </text>
      </svg>
    </figure>
  );
}
