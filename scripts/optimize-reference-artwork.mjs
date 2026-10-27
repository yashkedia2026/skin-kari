import sharp from "sharp";

// The PNGs are the saved imagegen reconstructions, not packaging artwork.
// Preserve transparency and aspect ratio while creating browser assets.
for (const name of ["hero-woman", "story-woman", "leaf-cluster"]) {
  await sharp(`public/images/reference/${name}.png`)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 94, alphaQuality: 100, effort: 6 })
    .toFile(`public/images/reference/${name}.webp`);
}
