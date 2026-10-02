import type React from "react";
import { Fragment } from "react";
import { sections } from "./content-data";
import EvidenceSoFar from "./EvidenceSoFar";
import { evidence } from "./evidence-data";
import { hasInline, inlineAt } from "./figures";
import { InlineFigure } from "./figures/SpecFigure";
import HolosAnimation from "./HolosAnimation";
import IntegrationHypothesisAnimation from "./IntegrationHypothesisAnimation";
import OntologicalAnchorAnimation from "./OntologicalAnchorAnimation";
import Section from "./Section";
import TeemingDarkAnimation from "./TeemingDarkAnimation";

// Older section-level animations, shown only until a section has inline figures of its own.
const LEGACY: Record<string, React.ComponentType<{ isPDF?: boolean }>> = {
  introduction: HolosAnimation,
  aliens: IntegrationHypothesisAnimation,
  "the-teeming-dark": TeemingDarkAnimation,
  why: OntologicalAnchorAnimation,
};

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
            const body = isDivContent ? (
              <div key={`${section.id}-p-${pIndex}`}>{paragraph}</div>
            ) : (
              <p key={`${section.id}-p-${pIndex}`}>{paragraph}</p>
            );
            // Figures sit inline, right after the paragraph they illustrate.
            const figures = inlineAt(section.id, pIndex);
            if (figures.length) {
              return (
                <Fragment key={`${section.id}-p-${pIndex}`}>
                  {body}
                  {figures.map((entry, i) => (
                    <InlineFigure
                      key={`${section.id}-f-${pIndex}-${i}`}
                      entry={entry}
                      isPDF={isPDF}
                    />
                  ))}
                </Fragment>
              );
            }
            return body;
          })}
          {!hasInline(section.id) &&
            LEGACY[section.id] &&
            (() => {
              const Legacy = LEGACY[section.id];
              return <Legacy isPDF={isPDF} />;
            })()}
          {evidence[section.id] && <EvidenceSoFar block={evidence[section.id]} />}
        </Section>
      ))}
    </>
  );
}
