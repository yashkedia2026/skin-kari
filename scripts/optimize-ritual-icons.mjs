import sharp from "sharp";
import { stat } from "node:fs/promises";

// Lossless WebP retains the fine original packaging line art and transparent
// exterior. Run after extract-ritual-icons.swift; PNGs are the source crops.
for (const name of ["apply-mask", "wait-fifteen", "pat-serum"]) {
  const path = `public/images/ritual/${name}`;
  await sharp(`${path}.png`)
    .webp({ lossless: true, effort: 6 })
    .toFile(`${path}.webp`);
  const file = await stat(`${path}.webp`);
  console.log(`${name}.webp: ${file.size} bytes`);
}
