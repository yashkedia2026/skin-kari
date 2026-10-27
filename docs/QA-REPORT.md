# Verification report

Verified locally on 27 October 2026 with Node 22.20.0 and the dependency versions in `package-lock.json`.

| Check                                         | Result                                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Production build (`npm run build`)            | Passed; 19 static build entries generated, product/shop/cart API routes use the appropriate dynamic rendering |
| ESLint (`npm run lint`)                       | Passed, no warnings/errors                                                                                    |
| TypeScript (`npm run typecheck`)              | Passed                                                                                                        |
| Formatting (`npm run format:check`)           | Passed                                                                                                        |
| Commerce and API tests (`npm test`)           | 21 passed                                                                                                     |
| Production browser suite (`npm run test:e2e`) | 21 passed; 1 intentionally skipped desktop check for the mobile-only navigation                               |
| WebKit production regression checks           | 4 passed: layout, accessibility, removed product, and phone ribbon readability                                |
| Automated axe accessibility                   | No WCAG A/AA violations found on homepage, product detail or open bag at either tested viewport               |
| Supporting content/link smoke check           | 17 pages and 21 rendered internal destinations passed; see `CONTENT-QA.md`                                    |
| Dependency reproducibility                    | Exact manifest versions match the npm lockfile                                                                |

## Browser coverage

The final suite ran against `next start`, not only the development server, using installed Chrome with a 1440×1000 desktop viewport and 390×844 mobile viewport. It verified:

- Four-mask discovery, concern filtering and navigation to the matching product.
- Product quantity selection, add-to-bag, quantity increase/decrease, removal and empty-cart recovery.
- Cookie persistence across reloads and navigation between the drawer and full cart.
- No invented demo price/subtotal and disabled live checkout.
- Safe handling of an unavailable-variant API response without adding a phantom item.
- Mobile menu route changes and close behaviour.
- A real HTTP 404 for a missing product with a useful recovery link.
- No horizontal document overflow on home, shop or product pages.
- Native dialog Escape dismissal and restoration of keyboard focus.
- Readable, server-rendered product content and working native usage disclosures with JavaScript disabled.
- Reduced-motion behaviour during the browser suite.
- Brightening Mask removed from discovery, the Dullness filter and sitemap; its former product route returns HTTP 404.
- All four ribbon messages fit completely at 320, 390 and 430 px. Text line bounds are checked against the ribbon and viewport, catching internal clipping that document-width checks would miss.

Final screenshots are saved in `docs/previews/`. Browser traces/report output stays in ignored `test-results/` and `playwright-report/`.

After replacing the decorative text stars with inline SVGs, the production build, ESLint and TypeScript checks passed again. Eight targeted Chrome checks passed for layout, accessibility, 404 recovery and content without JavaScript. WebKit 27.2 also passed home, shop, product and 404 checks at 1024×768, 768×1024 and 390×844: no horizontal overflow or unexpected browser errors. All six WebKit axe scans (home and product at each size) passed. Visual inspection confirmed the orange/cream vector decorations in place of the green emoji boxes, including the tablet hero and story artwork. Existing preview screenshots were refreshed.

## Commerce coverage

The 21 tests exercise configuration failures, untrusted cart input, quantity limits, cross-origin requests, local proxy origins, malformed/oversized bodies, demo serialization, unavailable products, product/variant pagination, Shopify contextual prices (including zero), exact cart subtotals, expired carts, HttpOnly cookies, provider errors and checkout hostname validation. Catalogue regression checks verify the four approved products, removal of the retired mask from saved bags, and rejection of stale add-to-bag requests for it. Live Shopify responses are mocked; these are not merchant-store transaction tests.

## Issues caught and corrected

Browser QA caught and resolved a local host/origin mismatch that blocked mutations, low-contrast small orange labels, a cart accessible-name mismatch, narrow-screen headline overflow and streamed missing-product responses returning HTTP 200. Code review also corrected stale cart response races, expired-cart recovery and use of authoritative Shopify cart-line prices.

User screenshots revealed that Apple devices rendered the decorative eight-spoked text character as a green emoji. All instances now use one shared, font-independent SVG with the existing section colors and responsive sizes.

The three routine symbols were subsequently replaced with the original apply-mask, 15-minute timer and after-care illustrations from the Hyaluronic Acid packaging. Production build, ESLint and TypeScript passed. Chrome at 1440, 390 and 320 px, and WebKit at 1024 and 390 px, loaded all three illustrations without text overlap, horizontal overflow or browser errors. All five homepage axe scans passed. Desktop/mobile routine previews and the full homepage screenshots were refreshed; extraction details are in `RITUAL-ARTWORK.md`.

The latest correction restores the four-product catalogue at the user's request while preserving those illustration fixes. Remaining text arrows were replaced with SVGs across links, the story graphic, footer and recovery pages. The clipped single-line ribbon became a responsive grid with two rows on phones. A Chrome/WebKit text-range audit at 320, 390 and 430 px found no clipped text across home, shop, Hyaluronic product detail, About, Ingredients, FAQs, Shipping & Returns and the footer. Four focused WebKit checks passed against the final production build, including axe on the homepage, product page and open bag; phone screenshots confirm the corrected ribbon and arrows.

## Verification limits and launch requirements

- No real Shopify store credentials were supplied. Live products, merchant availability, shipping/tax/discount calculations and checkout must be tested on the configured merchant store before claiming a working purchase flow.
- No payment was attempted or card information collected.
- Product photography, complete ingredients, merchant details and commercial/legal policies remain pending; see `EDITORIAL-TODO.md`.
- Chrome and Playwright WebKit viewport emulation are not physical-device or installed Safari/Firefox testing. Automated axe checks do not replace a full assistive-technology audit.
- No field Core Web Vitals or production traffic measurements are available. Image optimization, local preloaded fonts, stable image dimensions and restrained motion are implemented, but no unmeasured performance score is claimed.
- This report verifies the local production build. The user reported a successful prior Vercel deployment; deployment of this correction must be confirmed in Vercel. The storefront defaults to an unindexed demo.
