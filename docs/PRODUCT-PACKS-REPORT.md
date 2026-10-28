# Product packs and video testimonials

Local update completed on 28 October 2026. The existing Next.js project was modified; the approved homepage layout, typography, illustrations and packaging assets were preserved. Nothing was deployed.

## Product pages and carts

All four product pages offer native, keyboard-accessible radio selections for quantities of the same sheet mask. Selected packs use Detan green, Vitamin C orange, Hyaluronic Acid blue and Collagen & Peptide pink. Pricing updates are announced politely to assistive technology. Cart quantity controls continue to change individual masks; repeated additions merge through the existing cart.

The product image follows that same selection. A single mask shows one packet; every multipack shows a compact three-packet stack using the original artwork, with a prominent exact quantity label such as “Pack of 12” and “12 individual sheet masks”. Selecting a single mask restores one packet. The visual stack represents multiple individual masks, with no invented bundle box. Decorative copies are hidden from assistive technology, and the subtle animation respects reduced motion. A product-scoped provider keeps image, price and cart quantity synchronized while the surrounding product content stays server rendered.

| Pack            | Provisional demo MRP |
| --------------- | -------------------: |
| Single Mask (1) |                 ₹499 |
| Pack of 3       |               ₹1,497 |
| Pack of 6       |               ₹2,994 |
| Pack of 9       |               ₹4,491 |
| Pack of 12      |               ₹5,988 |

The client-provided ₹499 per-mask MRP is provisional for all four products. Demo selling prices and subtotals remain unset. No discounts, offers or mix-and-match bundles were introduced. Decimal multiplication preserves exact merchant amounts. Demo MRPs are never substituted for live prices.

Shopify remains authoritative for selling prices, inventory and cart costs. Each Shopify variant must represent a single mask. Live reference MRP is shown only when the merchant confirms that Shopify `compareAtPrice` contains actual MRP and sets `SHOPIFY_MRP_VERIFIED=true`. Missing or unverified MRP stays unconfirmed. `SHOPIFY_CHECKOUT_VERIFIED=false` blocks checkout both in the cart UI and at the server endpoint, even when Shopify credentials are present. Both flags default to false; see [Shopify setup](SHOPIFY-SETUP.md).

## Video integration

The reusable component is wired into product pages before related products. Its data registry is empty, so there is no public testimonial section, video request, invented customer, review or rating. Approved future entries support lazy thumbnails, playback on request, native HTML5 controls, captions, optional names/copy/transcripts, mobile scrolling and reduced motion. Playback pauses when another video starts, the card leaves view or the tab becomes hidden. See [video integration instructions](VIDEO-TESTIMONIALS.md).

## Verification

| Check                      | Result                                                                                                                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm test`                 | 43 unit/API tests passed, including Shopify payloads, verification gates and cookie persistence.                                                                                                |
| Initial `npm run test:e2e` | 59 browser tests passed; one mobile-only navigation test intentionally skipped on desktop.                                                                                                      |
| Pack-image follow-up       | 24 pack browser tests and 27 storefront/navigation tests passed, with the same intentional desktop skip. The final image sizing refinement also passed all 12 affected visual/responsive tests. |
| `npm run build`            | Passed production compilation, type checking and route generation.                                                                                                                              |
| `npm run typecheck`        | Passed.                                                                                                                                                                                         |
| `npm run lint`             | Passed.                                                                                                                                                                                         |
| `npm run format:check`     | Passed.                                                                                                                                                                                         |
| `git diff --check`         | Passed.                                                                                                                                                                                         |

Browser coverage includes all five quantities, exact provisional MRPs, persistent carts and quantity changes, keyboard selection, all four product colours, responsive layouts, axe accessibility, homepage/navigation regressions, product metadata without fabricated offers or ratings, and the isolated video component. The browser run used the existing local development server. The production build was verified separately.

The production build required execution outside the filesystem sandbox after the restricted Turbopack compiler stalled. No application workaround or deployment was introduced. A pre-existing navigation assertion was scoped to the visible main content so hidden Next.js content cannot cause a duplicate text match.

Shopify request compatibility is verified using mocked provider responses. No real merchant checkout, payment or inventory configuration has been verified. Video tests use isolated test-only fixtures and media API stubs; decoding, audio and caption timing require the genuine client assets. Tests do not add sample testimonials to the public application.

Screenshots are saved in [previews/packs](previews/packs/) for all four masks on desktop (1440px) and mobile (390px), with full-page and focused selector views. Layout checks additionally cover 320px and 768px widths.

| Product            | Desktop                                                              | Mobile                                                              |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Detan              | [Full page](previews/packs/desktop-detan-face-mask.png)              | [Full page](previews/packs/mobile-detan-face-mask.png)              |
| Vitamin C          | [Full page](previews/packs/desktop-vitamin-c-radiance-face-mask.png) | [Full page](previews/packs/mobile-vitamin-c-radiance-face-mask.png) |
| Hyaluronic Acid    | [Full page](previews/packs/desktop-hyaluronic-acid-face-mask.png)    | [Full page](previews/packs/mobile-hyaluronic-acid-face-mask.png)    |
| Collagen & Peptide | [Full page](previews/packs/desktop-collagen-peptide-face-mask.png)   | [Full page](previews/packs/mobile-collagen-peptide-face-mask.png)   |

Full-page captures load the existing lazy artwork before saving, restore the page to the top and omit the development toolbar. Matching `-selector.png` files show the pack controls at full size.

The image follow-up refreshed the full-page captures and added `-image.png` previews for every product. Compare [a single mask](previews/packs/desktop-vitamin-c-radiance-face-mask-single-image.png) with [a desktop multipack](previews/packs/desktop-vitamin-c-radiance-face-mask-pack12-image.png) and [a mobile multipack](previews/packs/mobile-vitamin-c-radiance-face-mask-pack12-image.png).
