# Reference illustration reconstruction

Created on 28 October 2026 using the built-in `image_gen` tool and the imagegen
skill. The supplied WhatsApp reference was the edit target. Transparent output
was requested for each of three separate asset calls. No API-key/CLI fallback
was used.

These are generated reconstructions of the reference illustrations, not the
client's original editable vectors or literal pixel extractions. The original
product packaging remains unchanged. The page uses separate React elements,
SVG icons, responsive text and individual images; it does not embed the entire
reference as a page image.

| Asset                     | Browser dimensions | Saved files                                                     |
| ------------------------- | ------------------ | --------------------------------------------------------------- |
| Front-facing hero woman   | 1200 × 1305        | `public/images/reference/hero-woman.png`, `hero-woman.webp`     |
| Profile woman and foliage | 1200 × 800         | `public/images/reference/story-woman.png`, `story-woman.webp`   |
| Decorative leaf fan       | 1200 × 1075        | `public/images/reference/leaf-cluster.png`, `leaf-cluster.webp` |

The PNGs preserve the tool outputs. WebP derivatives preserve alpha and aspect
ratio and cap width at 1200 px. Recreate them with
`node scripts/optimize-reference-artwork.mjs`. CSS positions/crops the portrait
shoulders and reflects the leaf fan for opposite corners.

## Input and prompts

Input for all calls:
`/Users/yashkedia/Downloads/WhatsApp Image 2026-10-27 at 11.38.00 PM.jpeg`.
Each call set `transparent_background: true`.

### Hero woman

Use case: background-extraction. Edit target: attached SKINKARI website reference image. Extract ONLY the exact front-facing colorful geometric Indian woman's portrait from the TOP hero (approximately x437..694 y69..410 in the 900x1600 image), as an isolated high-resolution illustration with genuinely transparent background. Preserve her identity and exact visual design: open symmetrical almond eyes with blue irises, black lashes and brows, pink red bindi, rounded blue hair on viewer-right, near-black hair on viewer-left, angular saturated yellow/orange/pink/red/green/blue facial polygons, black lips with pink-red lower lip, gold hoop earrings with round gold drops, long multicolored geometric neck and shoulders. Full silhouette from rounded hair top to shoulder base, tightly framed with modest transparent margin. Faithful reconstruction of THIS illustration, not a new woman. Exclude ALL external icons, labels, text, connector lines, leaves, page background, buttons or other website content. Exclude the small sun overlay on hair (will be separate SVG). No cream box, no added orange disc, no fruits or flowers. Clean sharp vector-like edges and color facets. Keep the original exact face proportions and gaze.

### Profile woman

Use case: background-extraction. Edit target: attached SKINKARI website reference image. Extract ONLY the second geometric woman's profile illustration and its original surrounding green foliage from the MADE FOR INDIAN SKIN section (approximately x570..900 y772..1032 of 900x1600). Reconstruct this exact composition as a high-resolution isolated illustration on genuinely transparent background. Woman faces LEFT, large graceful cream/peach face with orange cheek facet, a closed eye with long black lashes, deep teal angular eyebrow and nose bridge, small pink lips, black hair sweeping down viewer-left, pink and yellow polygons at the top of head, long geometric green/orange neck, hot pink/orange rectangular/geometric earring details on viewer-right. Dense dark emerald faceted leaves fill the right edge/top-right; faceted green leaves overlap the lower-left in front of hair. Preserve exact original pose, shape, scale, colors and cropping at right/bottom. Include foliage but EXCLUDE orange sunset circle and all horizontal sunsetlines behind the head: that backdrop will be drawn in CSS separately. Exclude ALL text, logos, icons, lines, cream background, product packaging, flowers, lotus, cucumber, citrus. This is the second illustration from reference, NOT the front-facing hero. Clean vector-like angular artistic style. Tight rectangular composition, full portrait visible as in original.

### Leaf fan

Use case: background-extraction. Edit target: attached SKINKARI website reference image. Extract and faithfully recreate ONLY the large emerald green faceted leaf cluster visible in the BOTTOM LEFT corner of the website reference (around x0..145 y1495..1600) as a high-resolution isolated decorative leaf cluster on genuinely transparent background. A fan of approximately 7 overlapping broad long pointed lanceolate leaves growing from one base at bottom-left, spreading up and right; rich dark green, emerald and teal low-poly angular facets with subtle painterly texture exactly like reference. Preserve the botanical shape and angular shaded facets. Complete the small clipped leaf outlines naturally so it can be positioned and cropped responsively. Leave modest transparent margins. NO words, no logo, no cream rectangle, no stems extending past the shared base, no flowers, no fruit, no pots. This will decorate both footer corners and the hero right corner; a standalone leaf fan, not an entire website screenshot.

## Review

An independent agent reviewed the assembled site repeatedly against the supplied
reference. The sequence, observed differences and final verdict are recorded in
`REFERENCE-REVIEW.md`. Output inspection verified transparency, separate portrait
compositions, missing-background removal and readability around decorative art.
Generated pixels and some facial facets differ from the source; no pixel-perfect
claim is made.
