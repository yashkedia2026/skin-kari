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

The reusable component is wired into product pages before related products. The authentic testimonial registry is empty; no customer, review or rating has been invented. At the user's subsequent request, demo product pages now display three clearly labelled skincare stock clips for client presentation. These are separate from the testimonial registry, show a preview disclosure and individual “Demo footage” labels, and are excluded from live Shopify pages. Approved genuine footage takes precedence when supplied. The clips are local, silent nine-second MP4s with matching thumbnails; all three videos together are about 1.2 MB. See [video sources](DEMO-VIDEO-SOURCES.md) and [replacement instructions](VIDEO-TESTIMONIALS.md).

The component supports lazy thumbnails, playback on request, native HTML5 controls, captions, optional names/copy/transcripts, mobile scrolling and reduced motion. Playback pauses when another video starts, the card leaves view or the tab becomes hidden. No video data is fetched until play is requested.

## Verification

| Check                  | Result                                                                                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm test`             | 45 unit/API tests passed, including Shopify payloads, verification gates, cookie persistence and the demo-only video fallback.                                                                  |
| `npm run test:e2e`     | 65 browser tests passed; one mobile-only navigation test intentionally skipped on desktop. Includes actual playback of all three demo clips on desktop and mobile.                              |
| Pack-image follow-up   | 24 pack browser tests and 27 storefront/navigation tests passed, with the same intentional desktop skip. The final image sizing refinement also passed all 12 affected visual/responsive tests. |
| `npm run build`        | Passed production compilation, type checking and route generation.                                                                                                                              |
| `npm run typecheck`    | Passed.                                                                                                                                                                                         |
| `npm run lint`         | Passed.                                                                                                                                                                                         |
| `npm run format:check` | Passed.                                                                                                                                                                                         |
| `git diff --check`     | Passed.                                                                                                                                                                                         |

Browser coverage includes all five quantities, exact provisional MRPs, persistent carts and quantity changes, keyboard selection, all four product colours, responsive layouts, axe accessibility, homepage/navigation regressions, product metadata without fabricated offers or ratings, and the isolated video component. The browser run used the existing local development server. The production build was verified separately.

The production build required execution outside the filesystem sandbox after the restricted Turbopack compiler stalled. No application workaround or deployment was introduced. A pre-existing navigation assertion was scoped to the visible main content so hidden Next.js content cannot cause a duplicate text match.

Shopify request compatibility is verified using mocked provider responses. No real merchant checkout, payment or inventory configuration has been verified. Component tests use isolated fixtures and media API stubs, and demo-video tests exercise actual local MP4 playback. Decoding, audio and caption timing of genuine customer footage still require the client assets. Test fixtures do not add customer testimonials to the application.

Screenshots are saved in [previews/packs](previews/packs/) for all four masks on desktop (1440px) and mobile (390px), with full-page and focused selector views. Layout checks additionally cover 320px and 768px widths.

| Product            | Desktop                                                              | Mobile                                                              |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Detan              | [Full page](previews/packs/desktop-detan-face-mask.png)              | [Full page](previews/packs/mobile-detan-face-mask.png)              |
| Vitamin C          | [Full page](previews/packs/desktop-vitamin-c-radiance-face-mask.png) | [Full page](previews/packs/mobile-vitamin-c-radiance-face-mask.png) |
| Hyaluronic Acid    | [Full page](previews/packs/desktop-hyaluronic-acid-face-mask.png)    | [Full page](previews/packs/mobile-hyaluronic-acid-face-mask.png)    |
| Collagen & Peptide | [Full page](previews/packs/desktop-collagen-peptide-face-mask.png)   | [Full page](previews/packs/mobile-collagen-peptide-face-mask.png)   |

Full-page captures load the existing lazy artwork before saving, restore the page to the top and omit the development toolbar. Matching `-selector.png` files show the pack controls at full size.

The image follow-up refreshed the full-page captures and added `-image.png` previews for every product. Compare [a single mask](previews/packs/desktop-vitamin-c-radiance-face-mask-single-image.png) with [a desktop multipack](previews/packs/desktop-vitamin-c-radiance-face-mask-pack12-image.png) and [a mobile multipack](previews/packs/mobile-vitamin-c-radiance-face-mask-pack12-image.png).

The demo-video follow-up adds [a desktop section preview](previews/videos/desktop-skincare-demo.png) and [a mobile carousel preview](previews/videos/mobile-skincare-demo.png). Browser tests verify no video requests before play, real MP4 decoding and time advancement, pause controls, mobile scrolling, accessibility and the replacement of demo footage by approved genuine videos. A mobile overflow caused by offscreen credit labels was fixed by containing each label within its card.
