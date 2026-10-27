# SKINKARI packaging analysis

Reviewed 27 October 2026. All four catalogue packaging PDFs were read with macOS PDFKit and their complete front/back artwork rendered and visually inspected before product content or visual direction was established. The original workspace files are untouched; copies are in `reference/products/`. Raw extracted text and full-page PNGs are in `reference/packaging-renders/`.

A fifth, image-only `BRIGHTENING MASK.pdf` was also visually inspected. It is supplementary reference and is **not a fifth catalogue product**. `Photo.pdf` was initially listed but disappeared while the files were being inspected; the subsequent `BRIGHTENING MASK.pdf` has the same file size and appears to be the renamed reference. This identity has not been independently verified.

## Source map

| Catalogue product                      | Source PDF in `reference/products/`                      | Web artwork                                  |
| -------------------------------------- | -------------------------------------------------------- | -------------------------------------------- |
| Vitamin C Radiance Face Mask           | `VITAMIN C ACID FACE SHEET MASK_SKINKARI_231026.pdf`     | `/images/products/vitamin-c.png`             |
| Hyaluronic Acid Face Mask              | `HYALURONIC ACID FACE SHEET MASK_SKINKARI_231026.pdf`    | `/images/products/hyaluronic-acid.png`       |
| Collagen & Peptide Face Mask           | `COLLAGEN & PEPTIDE FACE SHEET MASK_SKINKARI_231026.pdf` | `/images/products/collagen-peptide.png`      |
| Detan Face Mask                        | `DETAN FACE SHEET MASK_SKINKARI_231026.pdf`              | `/images/products/detan.png`                 |
| Supplementary Brightening Mask concept | `BRIGHTENING MASK.pdf`                                   | `/images/products/brightening-reference.png` |

Each primary PDF is a one-page landscape artwork sheet, 841.8898 × 595.2756 PDF points, with the front on the left and back on the right. These are flat packaging artworks, not actual product photographs. Web front crops preserve printed artwork, text, and outline; the connected white exterior is made transparent. The four front images are 1098 × 1500 pixels. The extracted brand wordmark is `/images/products/brand-wordmark.png` (950 × 360 pixels), copied from the isolated Vitamin C back header, not redrawn. The supplementary concept crop is 747 × 846 pixels.

Reproduce on macOS with PDFKit/AppKit using `swift scripts/extract-packaging.swift` and `swift scripts/crop-packaging.swift`. If the default Swift module cache is not writable, set `CLANG_MODULE_CACHE_PATH=/private/tmp/skinkari-clang-cache` and `SWIFT_MODULECACHE_PATH=/private/tmp/skinkari-swift-cache`. PDF text extraction has some broken `ti`/`ft` ligatures; the transcriptions below restore the letters visible in the rendered artwork.

Matching `.webp` derivatives, preserving dimensions and transparency, are included for storefront performance. Recreate them after dependency installation using `node scripts/optimize-packaging.mjs` (Sharp, quality 90). PNGs remain the original rendered crops. All five reference PDF copies were verified byte-for-byte against the originals with SHA-256.

## Shared packaging information

- Brand: SKINKARI, with a large multicolour Latin/Devanagari wordmark and a `TM` mark.
- Tagline: **SAME SKIN. BRIGHTER DAYS.**
- Positioning: **INDIAN SKINCARE FOR REAL LIFE**.
- Secondary line: **REAL INGREDIENTS BRIGHTER DAYS**.
- Contents: **1 SHEET MASK / 20ml** on all four.
- Printed front claims: **CLEAN FORMULA**, **NO ADDED PARABENS**, **SUITS ALL SKIN TYPES**. These are packaging claims, not independently established certifications. Do not turn them into certification badges or stronger claims (organic, vegan, cruelty-free, dermatologist-tested, hypoallergenic, fragrance-free, etc.).
- Manufacturer, exactly as printed: **HCP WELLNESS PVT. LTD.**, **#8 Ozone Industrial Park, Bavla-Bagodara Highway, Bhayla, Ahmedabad- 382220, Gujarat, India. Mfg.Lic.: GC/1348**.
- Back artwork includes a Make in India silhouette, recycling mark, Swachh Bharat-style glasses graphic, and a circular two-arrow mark. These graphics do not establish independent certification, recycled content, compostability, or material composition.
- All four have blank `INGEDIENTS` sections. Featured ingredients are **not** the complete INCI list.

### Exact shared directions

1. **Apply mask on freshly cleansed face**
2. **Keep it on for 15 minutes before removing gently**
3. **Pat in the excess serum on face and neck**

No approved frequency of use, refrigeration instruction, overnight-use instruction, rinsing instruction, or patch-test procedure appears in these four packages. Do not invent a product-specific routine beyond the three approved steps.

### Exact shared caution

> CAUTION : Consult with a specialist if there are any symptoms or side effects such as red spots, swelling or itching after exposure to direct sunlight during or after use.

### Exact shared warning

> WARNING : For external use, keep out of reach of children. Store in cool and dry place. Avoid direct contact with eyes, if contact occurs, rinse well with water. Do not apply to wounds or damaged skin. Keep away from direct sunlight. Use immediately after opening the pack. Discontinue use if irritation or rash appears.

## Vitamin C Radiance Face Mask

**Approved display name:** Vitamin C Radiance Face Mask. The source filename includes “ACID,” but the actual artwork does not use it in the product name.

**Featured ingredients, as printed:** Vitamin C; Niacinamide; Licorice Extract.

**Front wording:**

- BRIGHTEN . EVEN TONE . REVIVE
- REDUCES DULLNESS
- BOOSTS RADIANCE
- HEALTHIER LOOKING SKIN
- BRIGHTER HEALTHIER MORE YOU

**Exact back description:**

> Skinkari Vitamin C Radiance Face Mask helps brighten dull-looking skin while delivering intense hydration and nourishment. Enriched with Vitamin C, it helps improve the appearance of uneven skin tone, reduce the visibility of dark spots, and enhance natural radiance. This refreshing face mask supports smoother, softer, and healthier-looking skin. It helps revive tired skin, restore moisture, and leave your complexion feeling fresh, glowing, and beautifully revitalized after every use.

**Supported discovery concerns:** dull-looking skin, uneven-looking tone, radiance. Preserve cosmetic “appearance” language for dark spots; do not turn this into a treatment or guaranteed result.

**Visual observations:** orange and yellow sun/citrus forms; cream and dark green; geometric female profile; leaf, citrus slice, and white flower illustrations; decorative arched/tiled blocks. Orange is the main product accent, while the shared wordmark adds magenta, red, yellow, and forest green.

## Hyaluronic Acid Face Mask

**Approved display name:** Hyaluronic Acid Face Mask.

**Featured ingredients, as printed:** Hyaluronic Acid; Ceramides; Panthenol; Aloe Vera.

**Front wording:**

- DEEP HYDRATION / ALL DAY GLOW
- QUENCHES THIRSTY SKIN
- PLUMS & SMOOTHS [sic]
- STRENGTHENS SKIN BARRIER
- PLUMED / HYDRATED / HEALTHY / SKIN [sic]

**Exact back description:**

> Skinkari Hyaluronic Acid Face Mask helps deliver intense hydration, leaving skin soft, smooth, and refreshed. Enriched with hyaluronic acid, it helps replenish moisture, improve skin elasticity, and reduce the appearance of dryness and fine lines. This nourishing face mask supports the skin’s natural moisture barrier while promoting a plump, supple, and healthy-looking complexion. It revitalizes dull, dehydrated skin and leaves your face feeling fresh, hydrated, and naturally radiant after every use.

**Supported discovery concerns:** dryness/dehydrated-looking skin, moisture, plump-looking skin. Prefer “supports the skin’s natural moisture barrier,” directly supported by the back description.

**Editorial correction required:** front says `PLUMED` and `PLUMS & SMOOTHS`. Do not silently alter source artwork. Website prose can use the correctly spelled “plump” and “smooth” from the back description. Obtain corrected print artwork from the merchant.

**Visual observations:** sky blue, aqua, cobalt and navy; cream, dark green leaves; geometric female profile; translucent water drops/bubbles, wave bands, and petal-like tiles. The blue directions panel repeats the front's identity.

## Collagen & Peptide Face Mask

**Approved display name:** Collagen & Peptide Face Mask (singular Peptide in the name; plural PEPTIDES in the featured ingredients).

**Featured ingredients, as printed:** Collagen; Peptides; Squalane.

**Front wording:**

- FIRM . PLUMP . BOUNCE
- IMPROVES ELASTICITY
- SMOOTHER - LOOKING SKIN
- HEALTHY GLOW
- YOUNGER / FIRMER / HEALTHIER / SKIN

**Exact back description:**

> Skinkari Collagen & Peptide Face Mask helps deeply hydrate, nourish, and rejuvenate tired-looking skin. Enriched with collagen and peptides, it supports skin elasticity, improves the appearance of fine lines, and promotes a firmer, smoother complexion. This refreshing sheet mask helps restore moisture, enhance skin softness, and reduce the appearance of dullness. It leaves your skin feeling plump, refreshed, and radiant with a healthy, youthful-looking glow after every use.

**Supported discovery concerns:** firmer-looking skin, smoother-looking skin, moisture/softness, dullness. Do not claim increased collagen production, a lifting procedure, or permanent anti-ageing effects.

**Visual observations:** blush, coral, rose, terracotta, ochre, cream, and deep green; textured geometric portrait; glossy bead/molecule-like circles; botanical leaves, lotus, patterned tiles. The pack is more coral/rose than bright bubblegum pink.

## Detan Face Mask

**Approved display name:** Detan Face Mask.

**Featured ingredients and paired copy, exactly as printed:**

| Featured ingredient | Paired front claim            |
| ------------------- | ----------------------------- |
| ACTIVATED CHARCOAL  | Deeply purifies & removes tan |
| GREEN TEA EXTRACT   | Soothes & protects            |
| ALOE VERA           | Hydrates & calms              |
| NIACINAMIDE         | Evens skin tone               |

**Other front wording:**

- TAN FREE . FRESH SKIN . BRIGHTER YOU
- REMOVES TAN / PURIFIES PORES / REFRESHES / BRIGHTENS
- Good Skin Brighter Days

**Exact back description:**

> Skinkari Detan Face Mask helps reduce the appearance of sun tan, dullness, and uneven skin tone for a brighter, healthier-looking complexion. Its refreshing formula gently nourishes and hydrates the skin while improving its overall appearance. This face mask helps restore natural radiance, leaving skin feeling soft, smooth, and revitalized. Ideal for tired and sun-exposed skin, it promotes a fresh, glowing, and even-toned look with regular use for enhanced skin brightness.

**Supported discovery concerns:** appearance of sun tan, dullness, uneven-looking skin tone. Prefer the qualified back wording “helps reduce the appearance of sun tan.” The packaging does not establish UV protection, SPF, sunburn treatment, or a fixed time-to-result.

**Visual observations:** dark forest green and leaf green, contrasted with turmeric yellow, orange, pink and cream; sun, geometric face, lotus, aloe segments, charcoal, leaves and decorative arch panels. Green is the product accent, but a vivid multi-colour botanical mosaic is essential to its identity.

## Supplementary Brightening Mask reference

`BRIGHTENING MASK.pdf` is a one-page 288 × 432 pt image-only document. Visual review shows a white sachet photo-style mockup with a colourful illustrated portrait, citrus, leaves, pink lotus, arch panels and tiles. It repeats the brand tagline and positioning.

Visible words include:

- **BRIGHTENING MASK**
- **WITH VITAMIN C, NIACINAMIDE & LICORICE**
- **EVEN TONE / FADE DULLNESS / RADIANT GLOW**
- **GLOW GOOD REPEAT**
- **1 SHEET MASK / BIO-CELLULOSE / 20 ml**
- **CLEAN FORMULA / NO ADDED PARABENS / SUITS ALL SKIN TYPES**

Its name differs from the main Vitamin C artwork and it adds **BIO-CELLULOSE**, which the four catalogue PDFs do not establish. No back, complete ingredients, directions, prices or commercial details are visible. It should remain supplementary design reference, or be displayed explicitly as a packaging concept. Do not infer a fifth SKU, update the catalogue name, or apply the material claim to all four masks without merchant clarification. The visual asset is not evidence that the pictured finished product is commercially available.

## Design direction derived from packaging

- Use expressive condensed uppercase display typography, simpler readable body type, generous space, and a dark ink/forest foundation.
- Let the four product families carry orange, sky/cobalt blue, coral/rose pink, and leaf/forest green through cards and product details.
- Extend the printed arches, sun rays, waves, petals, leaves and tiled geometric rhythms with lightweight CSS/SVG decoration.
- Use the original extracted colourful wordmark where legibility permits. Preserve SKINKARI as accessible text.
- Balance these saturated colours against warm paper/cream, not a predominantly beige “luxury” treatment.
- Rounded sachet outlines and portrait collages support overlapping product compositions and editorial scale shifts. Avoid implying a generated rendering is actual photography.
- Motion should accent existing artwork; product names and purchase controls must work with reduced motion.

## Missing information and source inconsistencies

1. Full INCI lists: all four printed `INGEDIENTS` sections are blank; the heading itself is misspelled.
2. Prices/MRP/U.S.P., product IDs, variant IDs, SKUs, barcodes, live stock and merchant-approved sale status are absent.
3. `Marketed by`, customer support email and phone are blank.
4. Batch numbers, manufacturing dates, expiry dates and shelf life are absent. Dates must not be fabricated from the PDF filenames.
5. Shipping destinations/costs/timelines, tax configuration, returns/refunds, privacy controller, legal entity, policy wording and social URLs require merchant input.
6. No reviews, numerical ratings, clinical studies, certifications or quantified efficacy evidence were provided.
7. No ingredient concentrations or full formulation details are supplied. Do not assume Vitamin C form, collagen source, peptide type, or fragrance status.
8. Sheet material is not given in the four primary PDFs. Supplementary Brightening Mask says bio-cellulose but differs in name/artwork.
9. Usage frequency is unspecified. Fifteen minutes is the shared wear time; it does not establish a guaranteed time to results.
10. Hyaluronic front typography contains the wording errors noted above; request revised artwork.
11. Actual final product photography/mockups matching all four approved SKUs are needed. Current main imagery is extracted print artwork; supplementary image is a different concept.
12. Ingredient educational copy beyond the exact packaging context needs credible primary sources and editorial approval. Do not transform an ingredient mention into a separate medical or universal efficacy promise.
13. Confirm the final trademark/wordmark files, print artwork version, and naming of the supplementary Brightening concept before launch.

The storefront may use conservative cosmetic descriptions based on the source text. The merchant must supply missing commercial information through Shopify and confirm final content before enabling live checkout.
