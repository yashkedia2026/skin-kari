# Routine illustration sources

The three routine illustrations are extracted directly from the “Directions to use” panel on page 1 of `reference/products/HYALURONIC ACID FACE SHEET MASK_SKINKARI_231026.pdf`.

| Asset                                    | Original illustration                                       |
| ---------------------------------------- | ----------------------------------------------------------- |
| `public/images/ritual/apply-mask.webp`   | Hands applying a blue sheet mask to a freshly cleansed face |
| `public/images/ritual/wait-fifteen.webp` | Circular timer marked “15 min”                              |
| `public/images/ritual/pat-serum.webp`    | Face and neck with sparkle marks after serum application    |

Each image is 512 × 512 pixels. The original white disk, colours, and line art are preserved; the surrounding blue panel, step labels, and captions are excluded. An elliptical clipping path follows the printed white disk with a slight inset to prevent a blue fringe. The exterior is transparent. These are original packaging assets, not generated or redrawn illustrations.

To reproduce on macOS, run from the repository root:

```sh
swift -module-cache-path /tmp/skinkari-swift-module-cache scripts/extract-ritual-icons.swift
node scripts/optimize-ritual-icons.mjs
```

The Swift script renders the source PDF artwork at its final resolution using PDFKit. The Node script makes lossless WebP derivatives. The PNG source crops remain alongside them for inspection and reproduction.
