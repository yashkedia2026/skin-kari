# SKINKARI storefront

A custom Next.js App Router storefront for **SKINKARI — SAME SKIN. BRIGHTER DAYS.**, grounded in the supplied product packaging. This is a standalone headless application, not a Shopify theme.

The project opens in **demo mode** without credentials. The demo bag supports additions, quantity changes, removals and persistence. Prices are intentionally absent, and checkout is disabled. The Shopify integration is implemented and tested against mocked provider responses, but **live checkout has not been configured or verified**.

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

- Packaging-derived product catalogue: names, featured ingredients, cautious benefit wording, 20 ml size, three-step directions and package warnings. No invented prices, reviews, certifications or stock counts.
- Responsive illustrated homepage, concern filtering, interactive product spotlight, product details and variants, cart page and modal drawer.
- Shopify Storefront API product/variant pagination, India market context, public editorial metafields, authoritative prices, availability checks, persistent carts and fresh checkout URLs.
- Explicit demo mode with HttpOnly cookie persistence; configuration/provider errors never silently turn a live store into a demo.
- About, ingredients, FAQs, contact, shipping/returns, privacy, terms, journal and two articles. Missing merchant contact/policies are disclosed instead of fabricated.
- Motion animations with reduced-motion support. Native modal dialogs, semantic headings, visible focus states, keyboard navigation and a skip link.
- Server-rendered product content, canonical metadata, social image, sitemap, robots, Organization/Breadcrumb/Product JSON-LD. Offers appear only from verified Shopify prices. No fake rating schema.
- Local variable fonts and responsive optimized images. Primary WebP artwork is extracted from the supplied PDFs; it is temporary print artwork, not product photography.

## Project map

```text
src/app/                    App Router pages, SEO endpoints, cart API
src/app/(information)/      Supporting pages and journal content
src/components/             Storefront, motion, cart and purchase components
src/data/products.ts        Packaging-backed editorial fixtures
src/lib/commerce/           Typed demo/live commerce adapters and validation
src/lib/seo.ts              Shared metadata, origin and indexing policy
public/images/products/    Original packaging crops and optimized WebP assets
reference/products/        Preserved source PDFs
reference/packaging-renders/ Extracted text and rendered packaging proof sheets
scripts/                    Reproducible PDF/artwork extraction tools
tests/                      Commerce/API and browser/accessibility tests
docs/                       Analysis, design, merchant setup, SEO and QA notes
```

Original PDFs in the workspace root are preserved. An unrelated financial document is not used as a brand/content source. The supplementary Brightening Mask reference differs from the four approved catalogue names and is not treated as a fifth product or evidence of sheet material for the whole range.

## Connect Shopify

Follow [Shopify setup](docs/SHOPIFY-SETUP.md). Set `STOREFRONT_MODE=live`, the store’s `*.myshopify.com` domain, Storefront access token and production origin in the host environment. Never prefix the token with `NEXT_PUBLIC_`. Set the optional exact checkout hostname if Shopify uses a custom checkout domain. Rebuild after changing modes or public environment variables.

Create the four matching product handles and publish them to the appropriate storefront channel. Shopify owns product titles, descriptions, images, variants, prices, stock and optional `custom` editorial metafields. Known catalogue products fall back to the documented packaging editorial data for unspecified fields. The spotlight consumes the active catalogue; hero brand imagery and education pages remain curated repository content.

Checkout uses Shopify’s Cart API and redirects to Shopify’s fresh HTTPS checkout URL. Taxes, shipping and discounts are calculated there. This app has no payment form and does not store card details. Missing, expired, unavailable and sold-out states return safe errors. No cart secret is exposed to browser JavaScript.

## Browser checks

Start `npm run dev` in another terminal, then run:

```sh
npm run test:e2e
```

The suite uses installed Google Chrome on macOS or Playwright Chromium elsewhere. If neither is installed, run `npx playwright install chromium`. `PLAYWRIGHT_CHANNEL` and `PLAYWRIGHT_BASE_URL` can override these choices. Desktop (1440 px) and mobile (390 px) tests cover shopping, persistence, API failures, navigation, true 404s, overflow and axe accessibility checks. Reports are written to ignored `playwright-report/` and `test-results/` directories. Reduced-motion is exercised by default. Automated accessibility checks supplement, rather than replace, broader assistive-technology testing.

For a production browser pass, build and serve with `npm start` before running the same tests. Actual Shopify checkout, real devices and field Core Web Vitals require the configured deployment.

## Before launch

Read [the editorial checklist](docs/EDITORIAL-TODO.md), [packaging analysis](docs/PACKAGING-ANALYSIS.md), [design system](docs/DESIGN-SYSTEM.md), and [SEO plan](docs/SEO-PLAN.md).

The main external requirements are real prices/variants/inventory, full ingredient lists, final photography, merchant identity/contact, approved shipping/return/privacy/terms content, and a configured/tested Shopify checkout. Reviews and social accounts remain absent until genuine data is provided.

`NEXT_PUBLIC_INDEXING_ENABLED=false` deliberately prevents indexing the demo. Only enable it with explicit live mode on the final HTTPS domain after content and checkout validation. Cart and unfinished policy/contact pages remain noindex; the sitemap excludes them. The frontend is ready to deploy to a Node-compatible Next.js host; this task has not published a production website.

## Technical references

Implementation follows the [Next.js App Router documentation](https://nextjs.org/docs/app), [Shopify Storefront Cart API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage), and [Motion accessibility guidance](https://motion.dev/docs/react-accessibility). Next.js, React, Tailwind and Motion versions were resolved from the npm stable releases during setup. ESLint 9.39.5 is pinned for compatibility with the peer requirements of Next.js’s current lint plugins.
