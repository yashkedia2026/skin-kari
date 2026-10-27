# Verification report

Verified locally on 27 October 2026 with Node 22.20.0 and the dependency versions in `package-lock.json`.

| Check                                         | Result                                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Production build (`npm run build`)            | Passed; 19 static build entries generated, product/shop/cart API routes use the appropriate dynamic rendering |
| ESLint (`npm run lint`)                       | Passed, no warnings/errors                                                                                    |
| TypeScript (`npm run typecheck`)              | Passed                                                                                                        |
| Formatting (`npm run format:check`)           | Passed                                                                                                        |
| Commerce and API tests (`npm test`)           | 19 passed                                                                                                     |
| Production browser suite (`npm run test:e2e`) | 17 passed; 1 intentionally skipped desktop check for the mobile-only navigation                               |
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

Final screenshots are saved in `docs/previews/`. Browser traces/report output stays in ignored `test-results/` and `playwright-report/`.

## Commerce coverage

The 19 tests exercise configuration failures, untrusted cart input, quantity limits, cross-origin requests, local proxy origins, malformed/oversized bodies, demo serialization, unavailable products, product/variant pagination, Shopify contextual prices (including zero), exact cart subtotals, expired carts, HttpOnly cookies, provider errors and checkout hostname validation. Live Shopify responses are mocked; these are not merchant-store transaction tests.

## Issues caught and corrected

Browser QA caught and resolved a local host/origin mismatch that blocked mutations, low-contrast small orange labels, a cart accessible-name mismatch, narrow-screen headline overflow and streamed missing-product responses returning HTTP 200. Code review also corrected stale cart response races, expired-cart recovery and use of authoritative Shopify cart-line prices.

## Verification limits and launch requirements

- No real Shopify store credentials were supplied. Live products, merchant availability, shipping/tax/discount calculations and checkout must be tested on the configured merchant store before claiming a working purchase flow.
- No payment was attempted or card information collected.
- Product photography, complete ingredients, merchant details and commercial/legal policies remain pending; see `EDITORIAL-TODO.md`.
- Chrome desktop/mobile emulation is not physical-device or Safari/Firefox testing. Automated axe checks do not replace a full assistive-technology audit.
- No field Core Web Vitals or production traffic measurements are available. Image optimization, local preloaded fonts, stable image dimensions and restrained motion are implemented, but no unmeasured performance score is claimed.
- No external deployment was performed. The application is prepared for a Node-compatible Next.js host and defaults to an unindexed demo.
