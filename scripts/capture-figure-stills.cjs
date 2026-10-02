// Captures each engraved figure's last stage as public/figures/<still>, the image the PDF shows.
// Needs the dev server on :3000. Usage: node scripts/capture-figure-stills.cjs [--all]
// Without --all, only missing stills are captured.

const fs = require("node:fs");
const path = require("node:path");
const puppeteer = require("puppeteer");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.join(__dirname, "..", "public", "figures");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

(async () => {
  const all = process.argv.includes("--all");
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(CHROME) ? CHROME : undefined,
    args: ["--use-angle=metal"],
  });
  const page = await browser.newPage();
  await page.goto(`${BASE}/lab/stills`, { waitUntil: "networkidle0" });
  const specs = JSON.parse(await page.$eval("#specs", (el) => el.textContent));
  const seen = new Set();
  let done = 0;
  for (const { i, still } of specs) {
    if (seen.has(still)) continue;
    seen.add(still);
    const file = path.join(OUT, still);
    if (!all && fs.existsSync(file)) continue;
    // A fresh page per figure: one WebGL context, and no frozen frames from earlier screenshots.
    const p = await browser.newPage();
    await p.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });
    await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(`${BASE}/lab/stills?i=${i}`, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1500));
    const stage = await p.$("#still .engraved-figure-stage");
    const box = stage && (await stage.boundingBox());
    if (!box || errors.length) {
      console.log(`FAILED ${still}`, errors.join(" | "));
    } else {
      await p.screenshot({ path: file, clip: box });
      done++;
      console.log(`captured ${still}`);
    }
    await p.close();
  }
  console.log(`${done} captured`);
  await browser.close();
})();
