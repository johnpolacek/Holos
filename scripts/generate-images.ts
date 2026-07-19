import { writeFileSync } from "fs";
import { join } from "path";
import puppeteer from "puppeteer";

async function generateImages() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Set viewport to match image dimensions
    await page.setViewport({ width: 1200, height: 630 });

    // HTML for the image
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              width: 1200px;
              height: 630px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: #ffffff;
              font-family: 'Bitter', serif;
              padding: 80px;
            }
            .symbol {
              font-size: 120px;
              line-height: 1;
              margin-bottom: 20px;
              margin-top: -15px;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.6);
              font-family: 'Times New Roman', Times, serif;
            }
            .holos-text {
              font-size: 96px;
              font-weight: 600;
              line-height: 1;
              margin-bottom: 20px;
              color: #000;
              letter-spacing: -0.02em;
            }
            .subtitle {
              font-size: 28px;
              font-weight: 400;
              line-height: 1.4;
              color: #333;
              text-align: center;
              max-width: 900px;
            }
          </style>
        </head>
        <body>
          <div class="symbol">⊛</div>
          <div class="holos-text">Holos</div>
          <div class="subtitle">A Scientific Interpretive Framework for Explaining Reality</div>
        </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: "networkidle0" });

    // Generate opengraph image
    const opengraphBuffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    writeFileSync(join(process.cwd(), "app", "opengraph-image.png"), opengraphBuffer);
    console.log("✓ Generated opengraph-image.png");

    // Generate twitter image (same design)
    const twitterBuffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
    writeFileSync(join(process.cwd(), "app", "twitter-image.png"), twitterBuffer);
    console.log("✓ Generated twitter-image.png");
  } finally {
    await browser.close();
  }
}

generateImages().catch(console.error);
