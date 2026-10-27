import sharp from "sharp";
import { stat } from "node:fs/promises";

// Run after the Swift extraction scripts. PNGs remain the reproducible source
// crops; these same-size WebP derivatives reduce storefront transfer size.
for (const name of [
  "vitamin-c",
  "hyaluronic-acid",
  "collagen-peptide",
  "detan",
  "brand-wordmark",
  "brightening-reference",
]) {
  const path = `public/images/products/${name}`;
  await sharp(`${path}.png`)
    .webp({ quality: 90, effort: 6 })
    .toFile(`${path}.webp`);
  const file = await stat(`${path}.webp`);
  console.log(`${name}.webp: ${file.size} bytes`);
}
