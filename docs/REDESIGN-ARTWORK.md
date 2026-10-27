# Redesign artwork sources

The current homepage combines generated reference illustrations with code-native
SVG icons and unchanged original product packaging. The client's screenshot is
a visual reference; the page remains real responsive components with selectable
text, not a screenshot used as the website.

## Current reference illustrations

The built-in image-generation tool reconstructed the two women and a separate
leaf cluster from the user-supplied reference. These assets are **generated
reconstructions**, not original client vectors, packaging crops, stock photographs
or exact pixel reproductions of the source screenshot.

| Asset                                        | Homepage role                       | Files                                               |
| -------------------------------------------- | ----------------------------------- | --------------------------------------------------- |
| Front-facing geometric woman                 | Hero portrait                       | `public/images/reference/hero-woman.png`, `.webp`   |
| Geometric profile woman with emerald foliage | Indian-skin story illustration      | `public/images/reference/story-woman.png`, `.webp`  |
| Faceted green leaf cluster                   | Hero corner and both footer corners | `public/images/reference/leaf-cluster.png`, `.webp` |

Transparent PNG sources and optimized WebP derivatives are retained separately.
The source illustration's original editable vectors remain unavailable. Prompt
details, generation provenance and asset preparation are recorded in
[REFERENCE-ASSETS.md](REFERENCE-ASSETS.md).

## Current SVG illustrations

`src/components/ingredient-art.tsx` contains hand-authored inline SVGs for a
faceted green leaf, aloe fan, charcoal cubes, citrus slice, whole orange with a
slice, glossy blue water drop, three-drop humidity cluster, orange outline sun,
yellow strong-sun symbol, pink peptide molecule, diagonal collagen helix,
sparkles and grey cloud. `src/components/brand-value-icon.tsx` supplies the
outline leaf, flask, cupped hands with heart, heart and sun values.

These symbols follow the reference artwork's shapes and colours. They are not
Unicode emoji and do not depend on a device's emoji font. The implementation
uses SVG paths without external image requests or repeated gradient IDs.

## Preserved packaging extracts

The following original PDF extracts remain in `public/images/editorial/` as
preserved source assets. They supplied the earlier redesign but no longer
provide the homepage women or ingredient icons. The product pack images in
`public/images/products/` remain unchanged original packaging artwork.

| Editorial asset           | Source                                    | Dimensions | Treatment                                                                              |
| ------------------------- | ----------------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| `vitamin-c-portrait.webp` | Vitamin C packaging, page 1 front artwork | 960 × 1728 | Profile portrait, citrus, flowers and leaves, clipped away from package text           |
| `detan-portrait.webp`     | Detan packaging, page 1 front artwork     | 972 × 1602 | Profile portrait, lotus, leaves and ingredient artwork, clipped away from package text |
| `green-tea.webp`          | Detan packaging, page 1 ingredient icon   | 432 × 432  | Original green leaf, isolated from the circular label border                           |
| `aloe.webp`               | Detan packaging, page 1 ingredient icon   | 432 × 432  | Original aloe symbol, isolated from the circular label border                          |
| `charcoal.webp`           | Detan packaging, page 1 ingredient icon   | 432 × 432  | Original charcoal illustration, isolated from the circular label border                |
| `vitamin-c.webp`          | Vitamin C packaging, page 1 front artwork | 608 × 696  | Original citrus slice, clipped just inside the peel edge                               |

These editorial extracts have transparent exteriors. Their original colours and
drawing details are preserved; the extracts themselves are not generated
replacements. The PNGs are retained as inspectable source crops.
Rendering a PDF at a larger size preserves vector detail but does not add detail
to raster textures embedded in the original PDFs.

## Reproducing the packaging extracts

Run from the repository root on macOS:

```sh
swift -module-cache-path /tmp/skinkari-swift-module-cache scripts/extract-editorial-artwork.swift
node scripts/optimize-editorial-artwork.mjs
```

The Swift script uses PDFKit to render the exact PDF regions with explicit
clipping paths. Near-white page background connected to a transparent edge is
cleared while enclosed white illustration details are preserved. The Node script
produces WebP derivatives: lossless for the small printed ingredient symbols,
quality 92 for the textured portraits and citrus.

Those scripts reproduce the preserved PDF extracts only. They do not generate
the current portraits or foliage in `public/images/reference/`.
