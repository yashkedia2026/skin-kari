# Content and metadata smoke check

Checked 27 October 2026 against the local demo at `http://127.0.0.1:3001` using read-only HTTP fetches and source inspection.

- All 10 informational routes returned **200**: About, Ingredients, FAQs, Contact, Shipping & Returns, Privacy, Terms, Journal, and both journal articles.
- Homepage, Shop, Cart and all five product routes also returned **200**. Across all 18 pages, each had one H1, a unique title, a description and the expected absolute canonical URL.
- All 18 pages emitted **noindex** in demo. Pending contact/policy pages use `noindex, follow`; other checked pages use `noindex, nofollow`. Demo robots.txt contains `Disallow: /`.
- All **22 distinct internal link destinations** discovered in rendered pages returned 200, including concern-filter URLs. No empty `#` or JavaScript links were present. In-page links pointed to existing IDs.
- An unknown journal slug returned **404**. The generated Open Graph image returned **200** with `image/png`.
- Sitemap returned 200 with **13 URLs**, including both articles. Cart and unfinished contact/policy pages were absent. The sitemap remains inspectable in demo; it should only be submitted after production launch approval.
- Demo HTML contained no numeric rupee prices or `Offer`, `Review` or `AggregateRating` schema. Fixture price/subtotal fields are null; no live stock quantity is claimed.
- Product/ingredient/routine copy was compared with `PACKAGING-ANALYSIS.md`. No unsupported certification, full ingredient list, concentration, founder history, shipping promise, testimonial or medical claim was found in the reviewed default copy. Featured ingredients and missing merchant details are identified clearly.
- Setup documentation was reconciled with `.env.example`, commerce configuration and actual origin checks: local URL `http://127.0.0.1:3000`, optional checkout hostname, India context, cart limits and cookie persistence.

This check covers rendered content, links and metadata. It does not establish visual accessibility, field performance, live Shopify availability or successful payment. Real-store checkout remains unverified without merchant credentials and configuration.

The five-product correction was rechecked on 27 October 2026: Brightening Mask returns HTTP 200, appears in the sitemap, and retains its own packaging details without inheriting another mask’s directions.
