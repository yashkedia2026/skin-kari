# SKINKARI storefront

A custom Next.js App Router storefront for **SKINKARI — SAME SKIN. BRIGHTER DAYS.**, grounded in the supplied product packaging. This is a standalone headless application, not a Shopify theme.

The project opens in **demo mode** without credentials. The demo bag supports additions, quantity changes, removals and persistence. The client-provided ₹499 per-mask MRP is provisional for all four masks; selling prices remain unset and checkout is disabled. The Shopify integration is implemented and tested against mocked provider responses, but **live checkout has not been configured or verified**.

The current redesign follows the client's supplied reference: warm cream and
black, Oswald condensed headings, DM Sans body text, a Caveat handwritten note,
two reconstructed geometric portraits, faceted foliage and four saturated
product panels. Homepage order is hero, skin concerns, ingredients, Indian-skin
story, four masks and footer. Both portraits and the leaf cluster were generated
with the built-in image tool using the supplied reference; they are reconstructions,
not original client vectors or packaging crops. Product packaging remains unchanged.
The homepage uses the reference wording at the user's explicit request. See the
[redesign report](docs/REDESIGN-REPORT.md) for fidelity and asset details.
**This redesign remains local: no commit, push or deployment is authorized.**

## Run locally

Use Node.js 22.20+ and npm. The lockfile fixes the dependency versions used for this build.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open **http://127.0.0.1:3000**. Keep `NEXT_PUBLIC_SITE_URL` equal to the browser origin, including protocol and port. No Shopify account is needed for the demo. `.env.local` is ignored by Git.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm start` serves the production build on the same loopback address. Stop the development server before starting production on port 3000. On a server/container, use `npx next start --hostname 0.0.0.0` behind your HTTPS proxy.

## Implemented

- Four-product packaging-derived catalogue: names, featured ingredients, 20 ml size, directions and warnings. Homepage promotional copy follows the supplied reference; catalogue editorial data remains separate. No invented prices, reviews, certifications or stock counts.
- Reference-based responsive homepage with illustrated skin-concern links, ingredient row and four product panels; shop filtering/search, product details and variants, cart page and modal drawer.
- Product-coloured pack selectors for 1, 3, 6, 9 and 12 units of the same mask, with exact MRP and Shopify price calculations. No invented pack discounts or bundles.
- Reusable, accessible HTML5 video testimonials with lazy media, playback controls and a mobile carousel. The public section stays hidden until authentic approved footage is added; see [video integration](docs/VIDEO-TESTIMONIALS.md).
- Shopify Storefront API product/variant pagination, India market context, public editorial metafields, authoritative prices, availability checks, persistent carts and fresh checkout URLs.
- Explicit demo mode with HttpOnly cookie persistence; configuration/provider errors never silently turn a live store into a demo.
- About, ingredients, FAQs, contact, shipping/returns, privacy, terms, journal and two articles. Missing merchant contact/policies are disclosed instead of fabricated.
- Motion animations with reduced-motion support. Native modal dialogs, semantic headings, visible focus states, keyboard navigation and a skip link.
- Server-rendered product content, canonical metadata, social image, sitemap, robots, Organization/Breadcrumb/Product JSON-LD. Offers appear only from verified Shopify prices. No fake rating schema.
- Local Oswald (400/500/600/700), DM Sans and Caveat fonts with responsive optimized images. Original packaging crops and generated reference illustrations have separate asset directories and documented provenance. Detailed inline SVG ingredient and value symbols avoid platform-dependent emoji rendering.
- Functional search and account-information dialogs. Account sign-in and newsletter subscription are explicitly unavailable. Reference footer labels and social marks appear as unavailable placeholders when no real destination or integration exists; they do not link to invented profiles or pages.

## Project map

```text
src/app/                    App Router pages, SEO endpoints, cart API
src/app/(information)/      Supporting pages and journal content
src/components/             Storefront, motion, cart and purchase components
src/data/products.ts        Packaging-backed editorial fixtures
src/lib/commerce/           Typed demo/live commerce adapters and validation
src/lib/seo.ts              Shared metadata, origin and indexing policy
public/images/products/    Original packaging crops and optimized WebP assets
public/images/editorial/   Preserved original packaging illustration crops
public/images/reference/   Generated reference portraits and leaf cluster
reference/products/        Preserved source PDFs
reference/packaging-renders/ Extracted text and rendered packaging proof sheets
scripts/                    Reproducible PDF/artwork extraction tools
tests/                      Commerce/API and browser/accessibility tests
docs/                       Analysis, design, merchant setup, SEO and QA notes
```

Original PDFs in the workspace root are preserved. An unrelated financial document is not used as a brand/content source. All five product PDFs are preserved as source material. The approved storefront contains Vitamin C Radiance, Hyaluronic Acid, Collagen & Peptide and Detan. Brightening Mask and its extracted artwork remain reference material, excluded from the catalogue at the user’s request.

## Connect Shopify

Follow [Shopify setup](docs/SHOPIFY-SETUP.md). Set `STOREFRONT_MODE=live`, the store’s `*.myshopify.com` domain, Storefront access token and production origin in the host environment. Never prefix the token with `NEXT_PUBLIC_`. Set the optional exact checkout hostname if Shopify uses a custom checkout domain. Rebuild after changing modes or public environment variables.

Create the four matching product handles listed in the setup guide and publish them to the appropriate storefront channel. Shopify owns product titles, descriptions, images, variants, prices, stock and optional `custom` editorial metafields. Known catalogue products fall back to the documented packaging editorial data for unspecified fields. The product showcase consumes the active catalogue; hero brand imagery and education pages remain curated repository content.

Checkout remains blocked server-side until `SHOPIFY_CHECKOUT_VERIFIED=true` is explicitly set after pricing and Shopify configuration verification. Once enabled, it uses Shopify’s Cart API and redirects to Shopify’s fresh HTTPS checkout URL. Taxes, shipping and discounts are calculated there. This app has no payment form and does not store card details. Missing, expired, unavailable and sold-out states return safe errors. No cart secret is exposed to browser JavaScript.

Live comparison prices are shown as MRP only after `SHOPIFY_MRP_VERIFIED=true` confirms that the merchant uses Shopify `compareAtPrice` for each variant's actual per-mask MRP. This gate defaults to false and is independent of checkout verification. Without confirmation, the page says “MRP awaiting confirmation”; demo ₹499 values never enter live pricing.

## Browser checks

Start `npm run dev` in another terminal, then run:

```sh
npm run test:e2e
```

The suite uses installed Google Chrome on macOS or Playwright Chromium elsewhere. If neither is installed, run `npx playwright install chromium`. `PLAYWRIGHT_CHANNEL` and `PLAYWRIGHT_BASE_URL` can override these choices. Desktop (1440 px) and mobile (390 px) tests cover shopping, persistence, API failures, navigation, true 404s, overflow and axe accessibility checks. Reports are written to ignored `playwright-report/` and `test-results/` directories. Reduced-motion is exercised by default. Automated accessibility checks supplement, rather than replace, broader assistive-technology testing.

Pack tests save full-page and selector screenshots for all four products to `docs/previews/packs/`. Video behavior is tested in an isolated browser harness; no test videos, names or reviews are included in public routes.

For a production browser pass, build and serve with `npm start` before running the same tests. Actual Shopify checkout, real devices and field Core Web Vitals require the configured deployment.

## Before launch

Read [the editorial checklist](docs/EDITORIAL-TODO.md), [packaging analysis](docs/PACKAGING-ANALYSIS.md), [design system](docs/DESIGN-SYSTEM.md), and [SEO plan](docs/SEO-PLAN.md).

The main external requirements are real prices/variants/inventory, full ingredient lists, final photography, merchant identity/contact, approved shipping/return/privacy/terms content, and a configured/tested Shopify checkout. Original reference vectors remain unavailable; the generated illustrations are documented reconstructions, not an exact-source match. Customer accounts and newsletter subscriptions need real integrations. Reviews are absent; social marks remain unavailable placeholders until genuine profile URLs are supplied.

`NEXT_PUBLIC_INDEXING_ENABLED=false` deliberately prevents indexing the demo. Only enable it with explicit live mode on the final HTTPS domain after content and checkout validation. Cart and unfinished policy/contact pages remain noindex; the sitemap excludes them. The frontend can run on a Node-compatible Next.js host. The current redesign has not been pushed or deployed; publication requires the user's explicit instruction.

## Technical references

Implementation follows the [Next.js App Router documentation](https://nextjs.org/docs/app), [Shopify Storefront Cart API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage), and [Motion accessibility guidance](https://motion.dev/docs/react-accessibility). Next.js, React, Tailwind and Motion versions were resolved from the npm stable releases during setup. ESLint 9.39.5 is pinned for compatibility with the peer requirements of Next.js’s current lint plugins.
