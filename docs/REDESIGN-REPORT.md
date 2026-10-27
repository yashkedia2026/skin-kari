# SKINKARI reference fidelity revision

Status: **local working-tree changes only**. The user explicitly prohibited
further pushes without instruction. No commit, GitHub push or deployment is
part of this redesign. Existing deployed behaviour is not evidence that this
local redesign is live.

## Visual result

The homepage now follows the client's reference section order and hierarchy:
compact cream navigation, illustrated two-column hero, four skin-concern cards,
six-ingredient row, Indian-skin illustration split, four saturated product
panels and compact cream footer. Oswald at weights 400/500/600/700 replaces the
previous Anton treatment; DM Sans remains the reading face and Caveat supplies the
handwritten hero note. Black buttons, thin separators and rectangular panels
replace the previous muted editorial presentation.

Shop, product details, cart and supporting pages inherit the new typography,
cream/black palette and product colour families. The four catalogue products
remain Detan, Vitamin C Radiance, Hyaluronic Acid, and Collagen & Peptide.
Brightening Mask remains excluded, with its source PDF retained.

Original product packaging is unchanged. The hero now uses a front-facing woman;
the Indian-skin section uses a different profile portrait surrounded by emerald
foliage. Both are generated reconstructions of the supplied reference. Separate
leaf clusters appear at the hero edge and footer corners. Detailed SVG ingredient,
climate and value symbols replace the earlier packaging crops and simplified
icons. Navigation arrows and decorative symbols do not rely on emoji fonts.

Homepage wording follows the reference at the user's explicit request, including
“No Unnecessary Additives”, “Every ingredient has a reason to be here”, “Supports
firmer skin” and “Helps maintain plump-looking skin”. These reference marketing
phrases are not presented as findings from the packaging extraction process.

## Fidelity and deliberate differences

An independent reference-review agent accepted the implementation after six
correction reviews on 28 October 2026. The review record is
[REFERENCE-REVIEW.md](REFERENCE-REVIEW.md). It confirms the major portrait, foliage,
icon, copy, scale and overlap corrections at desktop, 900 px, 390 px and 320 px.
The final production previews are refreshed. This is visual acceptance of a
faithful responsive reconstruction, not pixel identity. Phone and tablet layouts
adapt the composition instead of simply shrinking the desktop image.

- Both women and the leaf cluster are reconstructed with the built-in image
  tool, using the user's reference. Original editable illustrations remain
  unavailable, so the result must not be described as original client artwork
  or a pixel-perfect reproduction. See [artwork provenance](REDESIGN-ARTWORK.md)
  and [generation details](REFERENCE-ASSETS.md).
- The original packaging retains its exact labels, colours and shape, even
  where the reference mockup depicts different pack proportions.
- Text and button colours prioritize readable contrast. Bright panel colours
  do not force white body text where contrast would be insufficient.
- Reference wording replaces earlier homepage paraphrases. Product catalogue
  fields, directions and warnings continue to come from the existing data and
  commerce adapter.
- Unavailable footer destinations and social profiles are visible placeholders
  matching the reference labels, without fabricated URLs or actions. Copyright
  uses the current year; newsletter and account availability remain explicit.

## Functionality and remaining limits

The existing Next.js architecture, commerce adapters, demo cart persistence,
quantity/removal controls, variant handling, checkout integration code, metadata,
structured data and indexing safeguards are retained. Concern cards lead to
real product pages; shop filtering continues to use URL state. Header search
opens an accessible dialog and submits to the working shop search.

Account controls open an honest information dialog; authentication is not
connected. Newsletter sign-up is not available, and the footer does not collect
email addresses or simulate a successful subscription. Contact/social details
and unfinished merchant pages are not invented to resemble the reference.

Demo mode still has no prices and checkout is disabled. Shopify's live payment
flow has not been configured or verified. Provider-mocked tests do not establish
that a real customer checkout succeeds.

## Changed file groups

| Group                             | Files                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fonts and dependencies            | `package.json`, `package-lock.json`, `src/app/layout.tsx`                                                                                                                      |
| Homepage and visual system        | `src/app/page.tsx`, `src/components/hero.tsx`, `src/components/ingredient-art.tsx`, `src/components/brand-value-icon.tsx`, `src/components/motion.tsx`, `src/app/redesign.css` |
| Navigation, search and footer     | `src/components/header.tsx`, `src/components/footer.tsx`, `src/components/navigation-redesign.css`, `src/app/shop/page.tsx`                                                    |
| Product and shopping presentation | `src/app/products/[handle]/page.tsx`, `src/components/product-card.tsx`, `src/app/commerce-redesign.css`                                                                       |
| Social preview styling            | `src/app/opengraph-image.tsx`                                                                                                                                                  |
| Current reference artwork         | `public/images/reference/hero-woman.{png,webp}`, `story-woman.{png,webp}`, `leaf-cluster.{png,webp}`, `docs/REFERENCE-ASSETS.md`                                               |
| Reference artwork optimization    | `scripts/optimize-reference-artwork.mjs`                                                                                                                                       |
| Preserved packaging extracts      | `public/images/editorial/`, `scripts/extract-editorial-artwork.swift`, `scripts/optimize-editorial-artwork.mjs`                                                                |
| Browser regression coverage       | `tests/storefront.spec.ts`, `tests/navigation.spec.ts`                                                                                                                         |
| Design documentation              | `README.md`, `docs/DESIGN-SYSTEM.md`, `docs/REDESIGN-ARTWORK.md`, this report                                                                                                  |
| Validation output                 | `docs/previews/`, `docs/QA-REPORT.md`, `docs/CONTENT-QA.md`                                                                                                                    |

## Verification status

Verified against the current local production build on **28 October 2026**.
The Chrome full run passed 25 cases and intentionally skipped one; two tests
used a stale text locator after the reference heading gained an intentional
line break. The locator was corrected to query the semantic heading, and both
cases passed on rerun. This was a test-selector issue, not clipped or missing UI.
The equivalent WebKit locator case passed after the same test correction.

| Check                                            | Result                                                                                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript                                       | Passed                                                                                                                                              |
| ESLint                                           | Passed                                                                                                                                              |
| Formatting                                       | Passed                                                                                                                                              |
| Production build                                 | Passed                                                                                                                                              |
| Existing commerce/API unit tests                 | 21 passed                                                                                                                                           |
| Chrome shopping/navigation/accessibility tests   | 27 passed across the full run and two corrected-locator reruns; 1 intentional mobile-only skip on desktop                                           |
| Focused WebKit shopping/navigation/accessibility | 7 completed: 6 passed initially and the corrected-locator case passed on rerun; Secure-cookie cart test used local HTTPS                            |
| Responsive layout and text bounds                | Home, shop and product checked at 320, 390, 430, 768, 900, 1280 and 1440 px; no horizontal overflow, clipped text, missing images or browser errors |
| WebKit visual review                             | 390 and 768 px home layouts fit; all 11 images loaded and no browser errors                                                                         |
| Independent reference review                     | Accepted after six correction reviews; major discrepancies and overlap issues resolved                                                              |

Current axe scans of home, product and open bag passed in desktop/mobile Chrome
and phone WebKit. The temporary WebKit HTTPS proxy was stopped after testing.
The owned production preview server was stopped; the user's existing development
server remains available on port 3000. See [QA details](QA-REPORT.md).

The broader audit of 17 pages, 21 internal destinations, 18 linked fragments and
5 search cases belongs to the previous redesign round. It is historical baseline
coverage, not a fresh full-site content/metadata audit of this revision; see
[content checks](CONTENT-QA.md).

## Saved previews

The following captures were refreshed from the current local production build.

- [Desktop homepage](previews/desktop-home.png), [first viewport](previews/desktop-home-viewport.png)
- [Mobile homepage](previews/mobile-home.png), [first viewport](previews/mobile-home-viewport.png)
- [768 px tablet](previews/home-768.png), [900 px layout](previews/home-900.png)
- [Desktop product](previews/desktop-product-viewport.png), [mobile product](previews/mobile-product-viewport.png)
- [Desktop shop](previews/desktop-shop-viewport.png), [mobile shop](previews/mobile-shop-viewport.png)
- [Desktop usage illustrations](previews/desktop-product-ritual.png), [mobile usage illustrations](previews/mobile-product-ritual.png)

The completed visual-review loop corrected both women's appearance, foliage,
reference wording, ingredient/value illustrations, typography, section proportions
and overlaps around labels and handwritten copy. The old ribbon/home-routine
screenshots remain retired; original usage illustrations still appear in product
details.

Physical devices, assistive-technology review, field Core Web Vitals and a real
configured Shopify checkout remain separate validation requirements.
