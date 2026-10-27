# Content and metadata smoke check

This is the previous redesign's content/metadata baseline. It was not rerun after the 28 October reference-artwork revision; current browser, layout and visual-review results are recorded in `QA-REPORT.md` and `REFERENCE-REVIEW.md`.

Checked 27 October 2026 against the redesigned local production build in demo mode at `http://127.0.0.1:3001`. Checks used read-only HTTP requests, HTML parsing, structured-data parsing and PNG-header inspection. The checks did not publish or modify remote content.

- All **17 pages** returned **200**: Homepage, Shop, Cart, the four product pages, About, Ingredients, FAQs, Contact, Shipping & Returns, Privacy, Terms, Journal, and both journal articles.
- Each page had one H1, a unique title, a description and the expected absolute canonical URL. The homepage title is now “Indian Skincare for Real Life”. The local build uses the configured/default canonical origin `http://127.0.0.1:3000`; the check normalized an empty homepage URL path to `/`.
- All 17 pages emitted **noindex** in demo. Pending contact/policy pages use `noindex, follow`; other checked pages use `noindex, nofollow`. Demo robots.txt returned 200 and contains `Disallow: /`.
- All **21 distinct internal route/query destinations** discovered in rendered pages returned 200, including concern filters. No empty, bare `#` or JavaScript links were present.
- All **18 distinct linked fragment destinations** resolved to existing element IDs, including the new `/#why-indian-skin` navigation target and the skip link on each page. The homepage product showcase also exposes `#meet-the-masks`.
- Five additional server-rendered search cases passed: `q=aloe` returned two masks; `concern=Dryness&q=aloe` returned one; `q=vitamin%20c` returned one; an unmatched term returned zero with an empty-state message; repeated `q` parameters safely fell back to the four-product catalogue. Each search result used the `/shop` canonical and contained a working GET search form.
- The removed `/products/brightening-mask` route and an unknown journal slug returned **404**. No reviewed page contained Brightening Mask product links or five-product collection copy.
- Sitemap returned **200** with **12 URLs**: homepage, shop, four products, about, ingredients, FAQs, journal and two articles. Brightening Mask, Cart and unfinished contact/policy pages were absent. The sitemap remains inspectable in demo; submit it only after production launch approval.
- Each of the four product pages emitted exactly one `Product` JSON-LD object. Demo products have no `offers` field, avoiding invented pricing or availability.
- The redesigned Open Graph image returned **200** with `image/png`, a valid PNG signature and dimensions of **1200 × 630**.
- Header and footer destinations lead to existing pages. Account information explicitly states that sign-in is unavailable; demo orders/payments remain disabled. Newsletter text states that sign-up is not open and does not collect email addresses. No unapproved social profiles or placeholder commerce destinations were introduced.

**Result: no errors in either content/metadata check.** Browser-based search, navigation, layout and accessibility checks are recorded separately in `QA-REPORT.md`.

This check does not establish field performance, live Shopify availability or successful payment. Real-store checkout remains unverified without merchant credentials and configuration.
