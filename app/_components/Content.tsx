import type React from "react";
import AxiomDiagram from "./AxiomDiagram";
import BlockUniverseAnimation from "./BlockUniverseAnimation";
import ConsciousnessAnimation from "./ConsciousnessAnimation";
import { sections } from "./content-data";
import HolographicSingularityAnimation from "./HolographicSingularityAnimation";
import HolosAnimation from "./HolosAnimation";
import InfiniteWrapAnimation from "./InfiniteWrapAnimation";
import InvarianceWarpAnimation from "./InvarianceWarpAnimation";
import NullIntervalAnimation from "./NullIntervalAnimation";
import OmegaLimitAnimation from "./OmegaLimitAnimation";
import OntologicalAnchorAnimation from "./OntologicalAnchorAnimation";
import OperatorAnatomyDiagram from "./OperatorAnatomyDiagram";
import QuantumEraserAnimation from "./QuantumEraserAnimation";
import Section from "./Section";
import ShadowProjectionAnimation from "./ShadowProjectionAnimation";
import SpacetimeBlockAnimation from "./SpacetimeBlockAnimation";
import TeemingDarkAnimation from "./TeemingDarkAnimation";
import TranscensionAnimation from "./TranscensionAnimation";

interface ContentProps {
  isPDF?: boolean;
}

export default function Content({ isPDF = false }: ContentProps) {
  return (
    <>
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          variant={section.id === "extrapolation" ? "note" : undefined}
        >
          {section.id === "axioms"
            ? section.paragraphs.map((paragraph, pIndex) => {
                const axiomMap: Record<
                  number,
                  "relationality" | "manifestation" | "conservation" | "unification" | "interface"
                > = {
                  1: "relationality",
                  2: "manifestation",
                  3: "conservation",
                  4: "unification",
                  5: "interface",
                };
                return (
                  <div key={`${section.id}-p-${pIndex}`}>
                    <p>{paragraph}</p>
                    {axiomMap[pIndex] && <AxiomDiagram axiom={axiomMap[pIndex]} isPDF={isPDF} />}
                  </div>
                );
              })
            : section.paragraphs.map((paragraph, pIndex) => {
                // Check if paragraph is a fragment containing a div (for subsections with tables)
                const checkForDiv = (node: React.ReactNode): boolean => {
                  if (typeof node !== "object" || node === null) return false;
                  if ("type" in node && node.type === "div") return true;
                  if (
                    "props" in node &&
                    node.props &&
                    typeof node.props === "object" &&
                    "children" in node.props
                  ) {
                    const children = node.props.children;
                    if (Array.isArray(children)) {
                      return children.some(checkForDiv);
                    }
                    return checkForDiv(children);
                  }
                  return false;
                };
                const isDivContent = checkForDiv(paragraph);
                return isDivContent ? (
                  <div key={`${section.id}-p-${pIndex}`}>{paragraph}</div>
                ) : (
                  <p key={`${section.id}-p-${pIndex}`}>{paragraph}</p>
                );
              })}
          {section.id === "introduction" && <HolosAnimation isPDF={isPDF} />}
          {section.id === "meaning-of-life" && <BlockUniverseAnimation isPDF={isPDF} />}
          {section.id === "consciousness" && <ConsciousnessAnimation isPDF={isPDF} />}
          {section.id === "our-universe" && <SpacetimeBlockAnimation isPDF={isPDF} />}
          {section.id === "spacetime" && (
            <>
              <InvarianceWarpAnimation isPDF={isPDF} />
              <NullIntervalAnimation isPDF={isPDF} />
              <QuantumEraserAnimation isPDF={isPDF} />
            </>
          )}
          {section.id === "higher-dimensions" && <ShadowProjectionAnimation isPDF={isPDF} />}
          {section.id === "infinity" && <InfiniteWrapAnimation isPDF={isPDF} />}
          {section.id === "black-holes" && <HolographicSingularityAnimation isPDF={isPDF} />}
          {section.id === "aliens" && <TranscensionAnimation isPDF={isPDF} />}
          {section.id === "the-teeming-dark" && <TeemingDarkAnimation isPDF={isPDF} />}
          {section.id === "god" && <OmegaLimitAnimation isPDF={isPDF} />}
          {section.id === "why" && <OntologicalAnchorAnimation isPDF={isPDF} />}
          {section.id === "holos" && <OperatorAnatomyDiagram isPDF={isPDF} />}
        </Section>
      ))}
    </>
  );
}
