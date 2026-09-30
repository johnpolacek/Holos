import type React from "react";
import ApertureFigure from "./ApertureFigure";
import BlockUniverseAnimation from "./BlockUniverseAnimation";
import { sections } from "./content-data";
import EraserFigure from "./EraserFigure";
import HolosAnimation from "./HolosAnimation";
import InfiniteWrapAnimation from "./InfiniteWrapAnimation";
import IntegrationHypothesisAnimation from "./IntegrationHypothesisAnimation";
import InvarianceWarpAnimation from "./InvarianceWarpAnimation";
import OmegaLimitAnimation from "./OmegaLimitAnimation";
import OntologicalAnchorAnimation from "./OntologicalAnchorAnimation";
import Section from "./Section";
import TeemingDarkAnimation from "./TeemingDarkAnimation";

interface ContentProps {
  isPDF?: boolean;
}

export default function Content({ isPDF = false }: ContentProps) {
  return (
    <>
      {sections.map((section) => (
        <Section key={section.id} id={section.id} title={section.title}>
          {section.paragraphs.map((paragraph, pIndex) => {
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
          {section.id === "consciousness" && <ApertureFigure isPDF={isPDF} />}
          {section.id === "spacetime" && (
            <>
              <InvarianceWarpAnimation isPDF={isPDF} />
              <BlockUniverseAnimation isPDF={isPDF} />
              <EraserFigure isPDF={isPDF} />
            </>
          )}
          {section.id === "infinity" && <InfiniteWrapAnimation isPDF={isPDF} />}
          {section.id === "aliens" && <IntegrationHypothesisAnimation isPDF={isPDF} />}
          {section.id === "the-teeming-dark" && <TeemingDarkAnimation isPDF={isPDF} />}
          {section.id === "omega-point" && <OmegaLimitAnimation isPDF={isPDF} />}
          {section.id === "why" && <OntologicalAnchorAnimation isPDF={isPDF} />}
        </Section>
      ))}
    </>
  );
}
