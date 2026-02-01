import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { PDFDocument } from "pdf-lib";


// Check if we're running in a serverless environment (Vercel, AWS Lambda, etc.)
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

// For local development, try to use regular puppeteer (better performance)
// For serverless, use puppeteer-core with chromium
async function getPuppeteer() {
  if (isServerless) {
    return puppeteerCore;
  }
  // Try to use regular puppeteer for local development
  try {
    const puppeteer = await import("puppeteer");
    return puppeteer.default;
  } catch {
    // Fall back to puppeteer-core if puppeteer is not available
    return puppeteerCore;
  }
}

// Dynamic imports to avoid Next.js restrictions
async function getRenderToString() {
  const { renderToString } = await import("react-dom/server");
  return renderToString;
}

// This function is no longer needed since we handle React setup in renderPDFDocument
// Keeping it for potential future use
async function getPDFDocument() {
  const React = await import("react");
  const PDFDocument = (await import("../app/_components/PDFDocument")).default;
  return { React, PDFDocument };
}

// PDF generation options
const pdfOptions = {
  format: "Letter" as const,
  margin: {
    top: "2cm",
    right: "2cm",
    bottom: "2cm",
    left: "2cm",
  },
  printBackground: true,
  outline: true,
};

// Prepare HTML for PDF rendering
function prepareHTML(html: string): string {
  // Replace className with class for proper HTML rendering
  let fullHTML = html.replace(/className=/g, "class=");

  // Add DOCTYPE to prevent quirks mode (required for KaTeX)
  if (!fullHTML.trim().toLowerCase().startsWith('<!doctype')) {
    fullHTML = '<!DOCTYPE html>\n' + fullHTML;
  }

  // Inject KaTeX scripts before </head>
  const scriptsToInject = `
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.27/dist/katex.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.27/dist/contrib/auto-render.min.js" defer></script>
  `;
  fullHTML = fullHTML.replace('</head>', `${scriptsToInject}</head>`);

  return fullHTML;
}

// Apply fonts, render KaTeX, and process special characters
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function preparePageContent(page: any) {
  // Force load Bitter font
  await page.evaluate(async () => {
    const weights = ['200', '300', '400', '600'];
    for (const weight of weights) {
      try {
        await document.fonts.load(`${weight} 16px "Bitter"`);
      } catch (e) {
        // Font weight may not be available
      }
    }
    await document.fonts.ready;
  });

  // Apply Bitter font (excluding KaTeX elements which need their own fonts)
  await page.evaluate(() => {
    document.documentElement.style.fontFamily = '"Bitter", serif';
    document.body.style.fontFamily = '"Bitter", serif';
    
    const allElements = document.querySelectorAll('*:not(.katex):not(.katex *)');
    allElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style && !htmlEl.classList.contains('katex') && !htmlEl.closest('.katex')) {
        htmlEl.style.fontFamily = '"Bitter", serif';
      }
    });
  });

  // Wait for fonts to be applied
  await new Promise(resolve => setTimeout(resolve, 500));

  // Render KaTeX math equations
  await page.evaluate(() => {
    if (typeof (window as any).katex === 'undefined') return;
    
    // Render display math
    document.querySelectorAll('.math-display').forEach(element => {
      const text = element.textContent?.trim() || '';
      if (text) {
        try {
          (window as any).katex.render(text, element, { displayMode: true, throwOnError: false });
        } catch (e) {
          // Ignore render errors
        }
      }
    });
    
    // Render inline math
    document.querySelectorAll('.math-inline').forEach(element => {
      const text = element.textContent?.trim() || '';
      if (text) {
        try {
          (window as any).katex.render(text, element, { displayMode: false, throwOnError: false });
        } catch (e) {
          // Ignore render errors
        }
      }
    });
    
    // Auto-render any remaining math
    if (typeof (window as any).renderMathInElement !== 'undefined') {
      try {
        (window as any).renderMathInElement(document.body, {
          delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
          ],
          throwOnError: false
        });
      } catch (e) {
        // Ignore auto-render errors
      }
    }
  });

  // Wait for KaTeX to finish rendering
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Wrap all instances of ⊛ and → with a span that uses Times New Roman font
  await page.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    const textNodes: Text[] = [];
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent || '';
      if (text.includes('⊛') || text.includes('→')) {
        textNodes.push(node as Text);
      }
    }
    
    textNodes.forEach(textNode => {
      const parent = textNode.parentElement;
      if (!parent) return;
      // Don't wrap inside SVG — SVG text must not contain HTML; use font on the <text> element instead
      if (parent.closest('svg')) return;
      
      const text = textNode.textContent || '';
      const parts = text.split(/(⊛|→)/);
      
      if (parts.length > 1) {
        const fragment = document.createDocumentFragment();
        
        parts.forEach((part) => {
          if (!part) return;
          
          if (part === '⊛' || part === '→') {
            const span = document.createElement('span');
            span.style.fontFamily = 'Times New Roman, Times, serif';
            span.textContent = part;
            fragment.appendChild(span);
          } else {
            fragment.appendChild(document.createTextNode(part));
          }
        });
        
        parent.replaceChild(fragment, textNode);
      }
    });
  });
}



export async function generatePDF(html: string): Promise<Buffer> {
  const fullHTML = prepareHTML(html);

  // Configure Chromium for serverless environments
  if (isServerless) {
    chromium.setGraphicsMode = false;
  }

  const puppeteer = await getPuppeteer();

  // Launch args - include outline generation flag
  const baseArgs = isServerless
    ? [
        ...chromium.args,
        "--hide-scrollbars",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
      ]
    : ["--no-sandbox", "--disable-setuid-sandbox"];
  const launchArgs = [...baseArgs, "--generate-pdf-document-outline"];

  if (process.env.DEBUG_PDF === "true") {
    console.log("[generatePDF] Launch args:", launchArgs);
  }

  const browser = await puppeteer.launch({
    args: launchArgs,
    defaultViewport: isServerless
      ? { width: 1920, height: 1080, deviceScaleFactor: 1 }
      : undefined,
    executablePath: isServerless ? await chromium.executablePath() : undefined,
    headless: isServerless ? "shell" : true,
  });

  try {
    // === FIRST PASS: Generate PDF to get accurate page count ===
    if (process.env.DEBUG_PDF === "true") {
      console.log("[generatePDF] First pass: generating PDF to count pages...");
    }

    const page1 = await browser.newPage();
    await page1.setContent(fullHTML, { waitUntil: "networkidle0" });
    await preparePageContent(page1);

    // Get list of TOC target IDs
    const targetIds = await page1.evaluate(() => {
      const ids: string[] = [];
      document.querySelectorAll('[data-toc-target]').forEach(span => {
        const id = span.getAttribute('data-toc-target');
        if (id) ids.push(id);
      });
      return ids;
    });

    // Generate first PDF (to get accurate page count)
    const firstPdf = await page1.pdf(pdfOptions);
    const firstBuffer = Buffer.from(firstPdf);

    if (process.env.DEBUG_PDF === "true") {
      console.log("[generatePDF] First pass PDF size:", firstBuffer.length, "bytes");
    }

    // Get total page count and try to extract named destinations from the first PDF
    const pdfDoc = await PDFDocument.load(firstBuffer);
    const totalPages = pdfDoc.getPageCount();
    const pages = pdfDoc.getPages();

    if (process.env.DEBUG_PDF === "true") {
      console.log("[generatePDF] First pass PDF has", totalPages, "pages");
    }

    // Try to extract page numbers from PDF named destinations
    const extractedPageNumbers: Record<string, number> = {};
    try {
      // Access the catalog's Names dictionary
      const catalog = pdfDoc.catalog;
      const namesDict = catalog.lookup(pdfDoc.context.obj('/Names'));
      
      if (namesDict) {
        const destsDict = (namesDict as any).get?.(pdfDoc.context.obj('/Dests'));
        if (destsDict) {
          // Recursively extract from the names tree
          const extractFromNamesTree = (node: any): void => {
            if (!node) return;
            
            // Check for Names array (leaf node)
            const names = node.get?.(pdfDoc.context.obj('/Names'));
            if (names) {
              const namesArray = names.asArray?.();
              if (namesArray) {
                for (let i = 0; i < namesArray.length; i += 2) {
                  const nameObj = namesArray[i];
                  const destObj = namesArray[i + 1];
                  if (nameObj && destObj) {
                    // Get the name as string
                    let name = '';
                    if (typeof nameObj.decodeText === 'function') {
                      name = nameObj.decodeText();
                    } else if (typeof nameObj.toString === 'function') {
                      name = nameObj.toString().replace(/^\(|\)$/g, '');
                    }
                    
                    // Get the destination page
                    const destArray = destObj.asArray?.();
                    if (destArray && destArray.length > 0) {
                      const pageRef = destArray[0];
                      // Find which page this reference points to
                      for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
                        if (pages[pageIndex].ref.toString() === pageRef.toString()) {
                          extractedPageNumbers[name] = pageIndex + 1;
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
            
            // Check for Kids array (intermediate node)
            const kids = node.get?.(pdfDoc.context.obj('/Kids'));
            if (kids) {
              const kidsArray = kids.asArray?.();
              if (kidsArray) {
                for (const kidRef of kidsArray) {
                  const kid = pdfDoc.context.lookup(kidRef);
                  extractFromNamesTree(kid);
                }
              }
            }
          };
          
          extractFromNamesTree(destsDict);
        }
      }
      
      if (process.env.DEBUG_PDF === "true" && Object.keys(extractedPageNumbers).length > 0) {
        console.log("[generatePDF] Extracted page numbers from PDF:", extractedPageNumbers);
      }
    } catch (e) {
      if (process.env.DEBUG_PDF === "true") {
        console.log("[generatePDF] Could not extract page numbers from PDF:", e);
      }
    }

    // Close first page
    await page1.close();

    // === SECOND PASS: Generate final PDF with calculated page numbers ===
    if (process.env.DEBUG_PDF === "true") {
      console.log("[generatePDF] Second pass: generating final PDF with page numbers...");
    }

    const page2 = await browser.newPage();
    await page2.setContent(fullHTML, { waitUntil: "networkidle0" });
    await preparePageContent(page2);

    // Calculate page numbers using the known total page count
    // Use pixel-based calculation with known page height
    const pageNumbers = await page2.evaluate((total: number, ids: string[]) => {
      const results: Record<string, number> = {};
      const sectionBreaks = Array.from(document.querySelectorAll('.section-break'));
      
      // Calculate heights for each section
      const sectionData = sectionBreaks.map((section, i) => {
        const rect = section.getBoundingClientRect();
        return {
          index: i,
          height: rect.height,
          top: rect.top + window.scrollY
        };
      });
      
      // Title page = section 0, TOC page = section 1
      // Content sections start at index 2
      const contentSections = sectionData.slice(2);
      const totalContentHeight = contentSections.reduce((sum, s) => sum + s.height, 0);
      
      // Content pages = total pages - 2 (title + TOC)
      const contentPages = total - 2;
      
      // Pixels per PDF page (derived from actual content)
      const pixelsPerPage = totalContentHeight / contentPages;
      
      // Track cumulative content height to determine page numbers
      // Each section-break forces a new page
      let cumulativePages = 2; // Start after title (1) and TOC (2)
      const sectionStartPages: number[] = [1, 2]; // Title, TOC
      
      for (let i = 2; i < sectionBreaks.length; i++) {
        cumulativePages++; // Section starts on new page
        sectionStartPages[i] = cumulativePages;
        
        // Add additional pages based on section height
        // Subtract 1 because we already counted the first page of this section
        const additionalPages = Math.floor(sectionData[i].height / pixelsPerPage);
        if (additionalPages > 0) {
          cumulativePages += additionalPages;
        }
      }
      
      // Now calculate page number for each TOC target
      for (const id of ids) {
        const targetEl = document.getElementById(id);
        if (!targetEl) continue;
        
        // Find which section contains this element
        let sectionIndex = -1;
        for (let i = 0; i < sectionBreaks.length; i++) {
          if (sectionBreaks[i].contains(targetEl)) {
            sectionIndex = i;
            break;
          }
        }
        
        if (sectionIndex < 0 || sectionIndex < 2) continue;
        
        // Get position within the section
        const targetRect = targetEl.getBoundingClientRect();
        const sectionRect = sectionBreaks[sectionIndex].getBoundingClientRect();
        const positionInSection = targetRect.top - sectionRect.top;
        
        // Calculate additional pages based on position within section
        // Apply adjustment factor to better match PDF's actual page layout
        const adjustedPixelsPerPage = pixelsPerPage * 1.10; // 10% adjustment
        const additionalPages = Math.floor(positionInSection / adjustedPixelsPerPage);
        
        results[id] = sectionStartPages[sectionIndex] + additionalPages;
      }
      
      return results;
    }, totalPages, targetIds);

    // Merge extracted page numbers with calculated ones (extracted take priority)
    const finalPageNumbers: Record<string, number> = { ...pageNumbers };
    for (const [id, page] of Object.entries(extractedPageNumbers)) {
      if (targetIds.includes(id)) {
        finalPageNumbers[id] = page;
      }
    }

    if (process.env.DEBUG_PDF === "true") {
      console.log("[generatePDF] Calculated page numbers:", pageNumbers);
      if (Object.keys(extractedPageNumbers).length > 0) {
        console.log("[generatePDF] Using extracted page numbers where available");
      }
      console.log("[generatePDF] Final page numbers:", finalPageNumbers);
    }

    // Inject page numbers into TOC
    await page2.evaluate((pageNums: Record<string, number>) => {
      const tocSpans = document.querySelectorAll('[data-toc-target]');
      tocSpans.forEach(span => {
        const targetId = span.getAttribute('data-toc-target');
        if (!targetId || !pageNums[targetId]) return;
        span.textContent = String(pageNums[targetId]);
      });
    }, finalPageNumbers);

    // Generate final PDF
    const finalPdf = await page2.pdf(pdfOptions);
    const finalBuffer = Buffer.from(finalPdf);

    if (process.env.DEBUG_PDF === "true") {
      console.log("[generatePDF] Final PDF size:", finalBuffer.length, "bytes");
    }

    return finalBuffer;
  } finally {
    await browser.close();
  }
}

export async function renderPDFDocument(): Promise<string> {
  const renderToString = await getRenderToString();
  // Import React first and make it globally available before importing PDFDocument.
  // PDFDocument → Content → content-data.tsx, and content-data exports JSX at module load time.
  const ReactModule = await import("react");
  if (typeof global !== "undefined" && !global.React) {
    global.React = ReactModule;
  }
  // Now import PDFDocument after React is available
  const PDFDocument = (await import("../app/_components/PDFDocument")).default;
  return renderToString(ReactModule.createElement(PDFDocument));
}
