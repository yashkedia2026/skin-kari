# Content and metadata smoke check

Checked 27 October 2026 against the local production build in demo mode at `http://127.0.0.1:3001`, after restoring the approved four-product catalogue. Checks used read-only HTTP fetches, HTML parsing and source inspection.

- All **17 pages** returned **200**: Homepage, Shop, Cart, the four product pages, About, Ingredients, FAQs, Contact, Shipping & Returns, Privacy, Terms, Journal, and both journal articles.
- Each page had one H1, a unique title, a description and the expected absolute canonical URL. The local build uses the configured/default canonical origin `http://127.0.0.1:3000`; the check normalized an empty homepage URL path to `/`.
- All 17 pages emitted **noindex** in demo. Pending contact/policy pages use `noindex, follow`; other checked pages use `noindex, nofollow`. Demo robots.txt returned 200 and contains `Disallow: /`.
- All **21 distinct internal link destinations** discovered in rendered pages returned 200, including concern-filter URLs. No empty `#` or JavaScript links were present. In-page links pointed to existing IDs.
- The removed `/products/brightening-mask` route and an unknown journal slug returned **404**. No reviewed page contained Brightening Mask product links or five-product collection copy.
- Sitemap returned **200** with **12 URLs**: homepage, shop, four products, about, ingredients, FAQs, journal and two articles. Brightening Mask, Cart and unfinished contact/policy pages were absent. The sitemap remains inspectable in demo; submit it only after production launch approval.
- The generated Open Graph image returned **200** with `image/png`.
- About, Ingredients, FAQs and both journal articles now describe the four approved masks. The supplied 15-minute routine remains intact, with its original packaging illustrations. Reference documentation preserves all five source PDFs while clearly excluding Brightening Mask from the storefront.
- Decorative link arrows in informational pages use SVG icons with `aria-hidden="true"` and `focusable="false"`, avoiding platform-dependent emoji glyphs.

This check covers rendered content, links and metadata. It does not establish visual accessibility, field performance, live Shopify availability or successful payment. Browser layout/accessibility checks are recorded separately in `QA-REPORT.md`. Real-store checkout remains unverified without merchant credentials and configuration.
