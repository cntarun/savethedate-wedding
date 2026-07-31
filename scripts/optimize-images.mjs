/* ============================================================
   IMAGE PIPELINE
   Drop your original photos into  /raw-photos  named exactly:
       coimbatore.jpg   roots.jpg   france.jpg
       his-proposal.jpg her-proposal.jpg
   (any of .jpg / .jpeg / .png / .webp works), then run:
       npm run images
   For each one this writes, into /public/photos:
       <name>-480.webp  -800.webp  -1200.webp   (modern, small)
       <name>-480.jpg   -800.jpg   -1200.jpg    (fallback)
   Sized + compressed to stay well under 300 KB each. The site's
   <picture>/srcset markup then serves the right file per device.
   ============================================================ */

import { readdir, mkdir } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RAW = "raw-photos";
const OUT = "public/photos";
const WIDTHS = [480, 800, 1200];
const INPUT_RE = /\.(jpe?g|png|webp)$/i;

await mkdir(OUT, { recursive: true });

let files = [];
try {
  files = (await readdir(RAW)).filter((f) => INPUT_RE.test(f));
} catch {
  console.error(`No /${RAW} folder found. Create it and add your photos.`);
  process.exit(1);
}

if (files.length === 0) {
  console.log(`No images in /${RAW}. Add photos named coimbatore/roots/france/his-proposal/her-proposal and re-run.`);
  process.exit(0);
}

const kb = (p) => (statSync(p).size / 1024).toFixed(0);

for (const file of files) {
  const base = file.replace(INPUT_RE, "");
  const input = path.join(RAW, file);

  for (const w of WIDTHS) {
    const pipeline = sharp(input).rotate().resize({
      width: w,
      withoutEnlargement: true,
    });

    const webpOut = path.join(OUT, `${base}-${w}.webp`);
    const jpgOut = path.join(OUT, `${base}-${w}.jpg`);

    // Quality nudged down a touch for the largest size to hold the budget.
    const q = w >= 1200 ? 72 : 78;
    await pipeline.clone().webp({ quality: q }).toFile(webpOut);
    await pipeline.clone().jpeg({ quality: q, mozjpeg: true }).toFile(jpgOut);

    console.log(`  ${base}-${w}.webp (${kb(webpOut)} KB)   ${base}-${w}.jpg (${kb(jpgOut)} KB)`);
  }
  console.log(`✓ ${base}`);
}

console.log(`\nDone — ${files.length} photo(s) → /${OUT}`);
