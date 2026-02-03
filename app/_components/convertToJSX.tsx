import React from "react";
import { citationAnchorMap } from "./citation-sections";
import MathInline from "./MathInline";

/**
 * Converts markdown-style text to JSX elements.
 * This is a one-time conversion utility to transform markdown strings to JSX.
 * Handles inline math: \\(...\\) -> MathInline component
 */
export function convertMarkdownToJSX(text: string): React.ReactNode {
  const elements: (string | React.ReactElement)[] = [];
  let keyIndex = 0;

  // Check for trailing footnote reference [^N]
  const trailingFootnoteMatch = text.match(/\[\^(\d+)\]$/);
  let mainText = text;
  let trailingFootnote: string | null = null;

  if (trailingFootnoteMatch) {
    trailingFootnote = trailingFootnoteMatch[1];
    mainText = text.slice(0, -trailingFootnoteMatch[0].length);
  }

  // Parse the main text
  let remaining = mainText;

  while (remaining.length > 0) {
    // Check for inline math \\(...\\)
    const inlineMathMatch = remaining.match(/^\\\\\(([^)]+)\)/);
    if (inlineMathMatch) {
      elements.push(<MathInline key={`math-${keyIndex++}`}>{inlineMathMatch[1]}</MathInline>);
      remaining = remaining.slice(inlineMathMatch[0].length);
      continue;
    }

    // Check for bold link **[text](url)** (must come before regular bold)
    const boldLinkStartMatch = remaining.match(/^\*\*\[([^\]]+)\]\(/);
    if (boldLinkStartMatch) {
      const linkText = boldLinkStartMatch[1];
      const afterBracket = remaining.slice(boldLinkStartMatch[0].length);

      // Find the matching closing parenthesis for the URL
      let urlEnd = -1;
      let parenDepth = 1;

      for (let i = 0; i < afterBracket.length; i++) {
        if (afterBracket[i] === "(") {
          parenDepth++;
        } else if (afterBracket[i] === ")") {
          parenDepth--;
          if (parenDepth === 0) {
            urlEnd = i;
            break;
          }
        }
      }

      // Check if the link is followed by ** to close the bold
      if (urlEnd !== -1 && afterBracket.slice(urlEnd + 1).startsWith("**")) {
        const url = afterBracket.slice(0, urlEnd);
        elements.push(
          <strong key={`bold-${keyIndex++}`}>
            <a href={url}>{linkText}</a>
          </strong>
        );
        remaining = remaining.slice(boldLinkStartMatch[0].length + urlEnd + 3); // +3 for ) and **
        continue;
      }
    }

    // Check for bold **text** (must come before italic to avoid conflicts)
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      // Recursively process content inside bold tags to handle nested formatting
      const boldContent = convertMarkdownToJSX(boldMatch[1]);
      elements.push(<strong key={`bold-${keyIndex++}`}>{boldContent}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Check for italic *text* (single asterisk, not part of bold)
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      elements.push(<em key={`italic-${keyIndex++}`}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Check for axiom-style link: ([text](#url)[^N])
    const axiomLinkMatch = remaining.match(/^\(\[([^\]]+)\]\(([^)]+)\)\[\^(\d+)\]\)/);
    if (axiomLinkMatch) {
      const [fullMatch, linkText, url, footnoteNum] = axiomLinkMatch;
      elements.push(
        <React.Fragment key={`axiom-${keyIndex++}`}>
          (
          <a className="px-0.5 opacity-80 hover:opacity-100" href={url}>
            {linkText}
            <sup>{footnoteNum}</sup>
          </a>
          )
        </React.Fragment>
      );
      remaining = remaining.slice(fullMatch.length);
      continue;
    }

    // Check for regular link [text](url)
    // Match [text] first, then find the URL between ( and the closing )
    // URLs can contain parentheses, so we need to match carefully
    const linkStartMatch = remaining.match(/^\[([^\]]+)\]\(/);
    if (linkStartMatch) {
      const linkText = linkStartMatch[1];
      const afterBracket = remaining.slice(linkStartMatch[0].length);

      // Find the matching closing parenthesis for the URL
      // Track depth to handle nested parentheses in URLs
      let urlEnd = -1;
      let parenDepth = 1; // Start at 1 because we're already inside the opening (

      for (let i = 0; i < afterBracket.length; i++) {
        if (afterBracket[i] === "(") {
          parenDepth++;
        } else if (afterBracket[i] === ")") {
          parenDepth--;
          if (parenDepth === 0) {
            urlEnd = i;
            break;
          }
        }
      }

      if (urlEnd !== -1) {
        const url = afterBracket.slice(0, urlEnd);
        elements.push(
          <a key={`link-${keyIndex++}`} href={url}>
            {linkText}
          </a>
        );
        remaining = remaining.slice(linkStartMatch[0].length + urlEnd + 1);
        continue;
      }
    }

    // Find the next special character position
    const nextBold = remaining.indexOf("**");
    const nextItalic = remaining.indexOf("*");
    const nextLink = remaining.indexOf("[");
    const nextParen = remaining.indexOf("(");

    let nextSpecial = remaining.length;
    if (nextBold !== -1 && nextBold < nextSpecial) nextSpecial = nextBold;
    if (nextItalic !== -1 && nextItalic < nextSpecial) nextSpecial = nextItalic;
    if (nextLink !== -1 && nextLink < nextSpecial) nextSpecial = nextLink;
    if (nextParen !== -1 && nextParen < nextSpecial) nextSpecial = nextParen;

    if (nextSpecial > 0) {
      elements.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    } else {
      // No special characters found in first position, add one char and continue
      elements.push(remaining[0]);
      remaining = remaining.slice(1);
    }
  }

  // Add trailing footnote if present
  if (trailingFootnote) {
    const footerId = getFooterIdForNumber(parseInt(trailingFootnote, 10));
    elements.push(
      <a
        key={`footnote-${keyIndex++}`}
        className="pl-0.5 pr-2 opacity-80 hover:opacity-100"
        href={`#${footerId}`}
      >
        <sup>{trailingFootnote}</sup>
      </a>
    );
  }

  return elements.length === 1 ? elements[0] : elements;
}

function getFooterIdForNumber(num: number): string {
  return citationAnchorMap[num] ?? "footer-why";
}
