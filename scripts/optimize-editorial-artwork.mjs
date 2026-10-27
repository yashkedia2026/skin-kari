import sharp from "sharp";
import { stat } from "node:fs/promises";

// Run after extract-editorial-artwork.swift. Preserve the original brand
// colours and transparent outline; lossless assets keep printed icons sharp.
for (const name of [
  "vitamin-c-portrait",
  "detan-portrait",
  "green-tea",
  "aloe",
  "charcoal",
  "vitamin-c",
]) {
  const path = `public/images/editorial/${name}`;
  const texturedArtwork = name.endsWith("-portrait") || name === "vitamin-c";
  await sharp(`${path}.png`)
    .webp({ quality: 92, lossless: !texturedArtwork, effort: 6 })
    .toFile(`${path}.webp`);
  const file = await stat(`${path}.webp`);
  console.log(`${name}.webp: ${file.size} bytes`);
}
