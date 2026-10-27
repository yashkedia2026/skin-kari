# Merchant content and launch checklist

The current storefront uses the four supplied main packaging PDFs as its source of product information. Missing facts have not been fabricated. See `PACKAGING-ANALYSIS.md` for exact wording, provenance, extraction details and the supplementary Brightening Mask reference.

## Required before commercial launch

| Needed                                                           | Why it matters                                                                                                                                       | Where it belongs                                                                                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Final full INCI for each of the four masks                       | Front highlights are not complete ingredient lists; the supplied full-list fields are blank.                                                         | Approved product data and a separately modelled full-ingredients section; Shopify metafield + adapter extension. |
| Final approved packaging version                                 | Correct the Hyaluronic pack’s `PLUMED` / `PLUMS & SMOOTHS` and the `INGEDIENTS` heading; confirm product names and all required printed information. | Source PDFs, packaging analysis and replacement image assets.                                                    |
| Actual product photography                                       | Current primary imagery is cropped flat print artwork, not finished product photography.                                                             | Shopify images, local fallbacks and product social images.                                                       |
| Real prices, variant IDs, SKUs, market/currency and stock policy | Required for an honest purchase flow. No demo prices or inventory counts were invented.                                                              | Shopify product/variant and market settings.                                                                     |
| Shopify credentials and merchant checkout configuration          | Live product/cart/payment behaviour is unverified until configured and exercised.                                                                    | Hosting environment and Shopify admin; follow `SHOPIFY-SETUP.md`.                                                |
| Merchant legal entity, marketed-by details and business address  | These cannot be inferred from the manufacturer’s address. `Marketed by` is blank on the artwork.                                                     | Contact, policies and applicable product/checkout records.                                                       |
| Verified customer-care email, phone and operating hours          | The pack’s email/phone fields are blank; there is no fake contact destination or form.                                                               | Contact page, footer and Shopify support settings.                                                               |
| Approved delivery and return rules                               | Destinations, charges, estimates, cancellations, eligibility, damaged-item process and refund timelines are unknown.                                 | Shipping & Returns and Shopify checkout policies.                                                                |
| Approved privacy policy and terms                                | Must match the actual merchant, deployment, data handling and commercial terms.                                                                      | Privacy/Terms pages and Shopify settings; obtain appropriate review.                                             |
| Final domain and indexing decision                               | Canonicals and public SEO need a verified production origin.                                                                                         | `NEXT_PUBLIC_SITE_URL`; enable indexing only after launch checks.                                                |

## Product details to confirm

- [ ] Full ingredients and any concentrations the merchant intends to communicate. Do not infer a Vitamin C form, collagen origin, peptide type, fragrance status or allergen absence.
- [ ] Manufacturing/batch/expiry information and supported shelf life from final product documentation. PDF filenames are not manufacture or expiry dates.
- [ ] Final MRP/U.S.P. and pricing treatment from the merchant. Do not create an offer from blank printed fields.
- [ ] Product material. The four main PDFs do not name sheet material; the supplementary Brightening Mask reference says bio-cellulose but has a different name/artwork. Do not apply that claim across the collection.
- [ ] Clarify whether the supplementary Brightening Mask is an alternate concept or an approved replacement. It is not currently a fifth catalogue product.
- [ ] Any approved usage frequency. Only the shared three steps and 15-minute wear time are supplied. Do not add refrigeration, overnight use or a daily/weekly schedule without support.
- [ ] Review all cosmetic claims against final approved evidence, retaining qualifiers such as “helps” and “appearance.” Do not convert detan wording into SPF, sunburn treatment or guaranteed lightening.
- [ ] Confirm the exact trademark/wordmark files and brand asset usage. The extracted wordmark is a temporary asset from supplied packaging.

## Optional content that remains deliberately absent

- Genuine customer reviews, provenance/moderation and permission to publish. No placeholder stars, review counts or testimonial quotes are present.
- Verified social profile URLs. Do not publish `#` links or guessed handles.
- Founder story, launch history, team identities and brand milestones. The About page currently uses only the provided brand positioning and collection facts.
- Certifications, testing claims, awards, cruelty-free/vegan/organic/fragrance-free claims or clinical results. The printed “clean formula”/“no added parabens” statements are not independent certifications.
- Discovery bundle SKU, quantities, price and availability. Publish only after the actual product/variant exists in Shopify.
- Newsletter provider, approved purpose, privacy wording and a working subscription process. Do not show a pretend successful subscription form.
- Rich ingredient education beyond the packaging. Any scientific assertions need suitable primary sources and editorial review.

## Content currently implemented

- Packaging-derived collection and product facts, four colour identities, named ingredient highlights and shared usage directions.
- An About page built around “Indian skincare for real life,” with no invented company history.
- An ingredient guide that explicitly distinguishes highlights from full formulas.
- FAQs using the exact wear time and package cautions, with unknown frequency and commercial policies clearly described as pending.
- Two original journal articles about the three-step mask ritual and reading a pack. No fake author, publication date or review data.
- Contact and policy routes with clear pending-content notices. These pages are intentionally noindex until final merchant content is supplied.

## Final editorial review

1. Compare visible product copy and Shopify metafields with the approved final artwork. Keep a dated source record when changing claims.
2. Replace temporary artwork with approved product photos/mockups. Keep alt text accurate about what the image shows.
3. Update all affected pages together if formulas, names or directions change: Shopify product details, homepage, ingredient guide, FAQs and journal.
4. Replace contact/policy notices with actual approved content; verify links and remove the page-specific noindex only when appropriate.
5. Complete live cart/checkout verification; do not describe checkout as working until the actual store has been tested.
6. Confirm launch metadata, SEO, accessibility and mobile checks, then deliberately enable indexing on the final live domain.

No external accounts, store settings, legal policies or merchant decisions were created or assumed by this implementation.
