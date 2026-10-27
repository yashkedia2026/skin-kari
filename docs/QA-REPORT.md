# Verification report

## Follow-up: longer connectors and cloud spacing

The next 28 October refinement extends all six hero connectors underneath the portrait, so their visible ends meet its silhouette at every breakpoint. The image masks the excess line length; labels and icons remain above it. URBAN LIFE moves upward to compensate for empty space inside the cloud SVG.

Chrome and WebKit checks at 320, 390, 768, 900, 1100, 1280, 1440 and 1470 px verified all 96 connector endpoints reach opaque portrait pixels beneath the image, with no horizontal overflow, clipped hero text, missing images or browser exceptions. The cloud's visible label gap is within 1.3 px of the sun's gap; the existing droplet illustration retains its separate inset. The independent reviewer accepted all six screenshot widths. CSS formatting and diff checks passed, and homepage previews were refreshed. This CSS-only follow-up did not rerun the broader production suite below.

## Follow-up: symmetric portrait and mobile connectors

The next 28 October refinement centers the hero portrait between equal-width, mirrored callout columns. Matching rows share icon-box heights and connector lengths/offsets. All six connectors remain visible on phones, using shorter lines at narrow widths. The caption and corner foliage leave room for the centered shoulder.

Chrome and WebKit checks at 320, 390, 768, 900, 1100, 1280, 1440 and 1470 px passed all 16 viewport/browser combinations: equal callout-column widths, equal row positions, equal connector lengths, visible connectors, no horizontal overflow or clipped hero text, all images loaded and no browser exceptions. Portrait centering differed by at most 0.243 px due to browser subpixel rounding (accepted tolerance: 0.5 px). The independent visual reviewer also checked desktop, tablet and phone captures. CSS formatting and diff checks passed; homepage preview files were refreshed. No application logic changed and the production suite below was not rerun for this CSS adjustment.

## Follow-up: hero spacing and decoration removal

On 28 October 2026, the user requested removal of the sun on the woman's hair and the two standalone drops. The labelled Strong Sun and Humidity illustrations remain. CSS now compensates for transparent artwork gutters so the laptop portrait meets the divider and the story illustration reaches the right edge. Callout connectors follow their icon positions; the hero stacks at narrow tablet widths to prevent overlap.

This focused follow-up passed TypeScript, ESLint for the edited component, formatting and diff checks. Local Chrome and WebKit checks at 320, 390, 768, 900, 1280, 1440 and 1470 px found no horizontal overflow, out-of-viewport hero text, missing images or browser errors. Both removed decorations were absent and all three climate labels remained. Calculated visible portrait-to-divider alignment was within one pixel at the tested two-column widths. Homepage previews were refreshed from the local development server; the broader production suite below describes the preceding revision and was not rerun for this presentation-only adjustment.

## Full redesign baseline

Verified locally on **28 October 2026** with Node 22.20.0 and the exact dependency versions in `package-lock.json`. This report covers the current reference fidelity revision: reconstructed women/foliage, detailed SVG icons, Oswald typography, reference wording and footer. No commit, push or deployment was performed.

| Check                               | Result                                                                                                                       |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Production build (`npm run build`)  | Passed                                                                                                                       |
| ESLint (`npm run lint`)             | Passed, no warnings/errors                                                                                                   |
| TypeScript (`npm run typecheck`)    | Passed                                                                                                                       |
| Formatting (`npm run format:check`) | Passed                                                                                                                       |
| Commerce and API tests (`npm test`) | 21 passed                                                                                                                    |
| Production Chrome browser suite     | 27 passed across the full run and two corrected-locator reruns; 1 intentional desktop skip for mobile-only navigation        |
| Focused production WebKit suite     | 7 completed: 6 passed initially, then the corrected-locator case passed on rerun                                             |
| Automated axe accessibility         | Final home, product and open-bag scans reported no WCAG 2/2.1 A/AA violations in desktop/mobile Chrome and phone WebKit      |
| Responsive layout scan              | Home/shop/product at 320, 390, 430, 768, 900, 1280 and 1440 px: no overflow, text clipping, missing images or browser errors |
| WebKit image/layout checks          | 390 and 768 px: all 11 images loaded, no browser errors                                                                      |
| Independent reference review        | Accepted after six correction reviews; see `REFERENCE-REVIEW.md`                                                             |

The 17-page, 21-destination, 18-fragment and 5-search-case content/metadata audit
in `CONTENT-QA.md` is a **historical baseline from the prior redesign round**.
It has not been rerun as a complete full-site audit for this revision.

## Browser coverage

Chrome used the local production build with 1440×1000 desktop and 390×844 mobile viewports. Existing commerce tests were retained; only selectors and visual regressions tied to the replaced homepage were updated. The suite checks:

- Four-mask discovery, concern filtering and navigation to matching product pages.
- Product quantity selection, add-to-bag, quantity increase/decrease, removal and empty-cart recovery.
- Cookie persistence across reloads and navigation between drawer and full cart.
- Unpriced demo products and disabled checkout.
- Unavailable-variant errors without phantom cart items.
- Mobile menu opening, routing and closing.
- Missing and retired product routes returning HTTP 404, with recovery links.
- No document overflow on home, shop and product pages.
- Native dialog Escape dismissal and restoration of keyboard focus.
- Server-rendered product information and native usage disclosures with JavaScript disabled.
- Reduced-motion support.
- Brightening Mask remaining absent from discovery, the Dullness filter and sitemap.
- Complete skin-concern text inside phone layouts at 320, 390 and 430 px.
- Search by product/ingredient, preservation of search while filtering, empty-state recovery and honest account messaging.

The focused WebKit 27.2 run covered cart persistence, mobile navigation, accessibility, skin-concern readability, search, account messaging and product content without JavaScript. Its cart check used a disposable local HTTPS proxy because WebKit does not send production Secure cookies over plain localhost HTTP. The same cart test passed over HTTPS without changing commerce code. The proxy was removed after testing.

Final screenshot and responsive-audit details are recorded in `REDESIGN-REPORT.md`. Test traces and scratch output remain in ignored `.cache/`, `test-results/` and `playwright-report/`.

## Issues caught and corrected in this revision

The independent reviewer completed six correction reviews against the supplied
reference. Corrections covered the two different women, missing corner leaves,
reference copy, ingredient/value icon shapes, portrait proportions, small sun
placement, product-strip density and decorative overlaps. The final reviewed
desktop, 900 px, 390 px and 320 px compositions were accepted as a faithful
responsive implementation. Exact source pixels are not claimed.

The Chrome full run passed 25 cases and skipped one. Two concern-readability
tests failed because `getByText` no longer matched the heading's intentional
`<br>` line break. The selector now uses `getByRole("heading", ...)`; both
Chrome cases passed on rerun. The equivalent WebKit test passed after that
selector change, completing all seven focused WebKit cases. This was a stale
test locator, not a UI clipping bug or missing content.

Current home, product and open-bag axe scans passed in desktop/mobile Chrome
and phone WebKit. Prior fixes preserving visible button text in accessible
names and avoiding opacity-faded body text remain intact.

WebKit cart persistence was checked through a disposable local HTTPS proxy so
production Secure cookies could be sent. The proxy was stopped after testing;
no commerce code was changed for this test environment. The owned production
preview on port 3001 was also stopped; the user's development server on port
3000 was retained.

Decorations and arrows use consistent SVG or image rendering rather than
platform-specific emoji. Portraits and foliage are documented generated
reconstructions; product packaging is unchanged original artwork. The removed
fifth product remains excluded. Packaging-derived usage illustrations remain
available in product details.

## Commerce coverage

The 21 unit/API tests exercise configuration failures, untrusted cart input, quantity limits, cross-origin requests, local proxy origins, malformed/oversized bodies, demo serialization, unavailable products, product/variant pagination, Shopify contextual prices (including zero), exact cart subtotals, expired carts, HttpOnly cookies, provider errors and checkout hostname validation. Catalogue regressions verify the four approved products, removal of the retired mask from saved bags, and rejection of stale purchase requests. Shopify responses are mocked; these are not merchant-store transaction tests.

## Verification limits

- No real Shopify store credentials were supplied. Live pricing, merchant availability, shipping/tax/discount calculations and payment remain unverified. No payment was attempted.
- Account sign-in and newsletter signup remain unavailable; no simulated authentication, subscription or unapproved social profiles were added.
- The reference's original editable illustration files remain unavailable. Both women and the leaf cluster are generated reconstructions; their provenance and prompts are in `REFERENCE-ASSETS.md`. They are not packaging-derived substitutes or pixel-identical original artwork.
- Merchant details and commercial/legal policies remain pending; see `EDITORIAL-TODO.md`.
- Chrome and Playwright WebKit emulation do not establish physical-device, installed Safari or Firefox compatibility. Automated axe scans do not replace a full assistive-technology review.
- No field Core Web Vitals or production performance score is claimed. Local fonts, responsive optimized images, stable dimensions and restrained motion are implemented.
- This verifies the local production build only. The deployed Vercel site has not been updated with this redesign. Demo indexing safeguards remain enabled.
