# SKINKARI search-intent and technical SEO plan

Prepared for the four-mask catalogue. This is an editorial and measurement plan, not a claim of keyword volume, search rankings or commercial demand. No search-volume dataset was supplied. Confirm priorities with first-party Search Console data once the live domain has accumulated impressions.

## Search intent and page ownership

Use one primary destination per intent. Product names should remain aligned with the packaging rather than being expanded into a list of keywords.

| Intent                | Example language to research                                         | Primary destination                           | Content that earns the visit                                                                                   |
| --------------------- | -------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Brand / navigation    | SKINKARI, Skinkari sheet masks                                       | `/`                                           | Brand, collection overview, direct shop navigation and the packaging-derived visual identity.                  |
| Collection / purchase | sheet masks India, Indian skincare sheet masks                       | `/shop`                                       | All four masks, their named ingredients and verified Shopify pricing/availability when live.                   |
| Product / purchase    | SKINKARI Vitamin C Radiance Face Mask, vitamin C sheet mask          | `/products/vitamin-c-radiance-face-mask`      | Exact name, packaging-supported cosmetic benefits, directions, featured ingredients and actual variants.       |
| Product / purchase    | SKINKARI hyaluronic acid face mask, hydration sheet mask             | `/products/hyaluronic-acid-face-mask`         | Hydration positioning from the pack; avoid turning it into treatment advice.                                   |
| Product / purchase    | SKINKARI collagen peptide face mask                                  | `/products/collagen-peptide-face-mask`        | Hydration and smoother-looking skin language supported by the packaging.                                       |
| Product / purchase    | SKINKARI detan face mask                                             | `/products/detan-face-mask`                   | Qualified appearance-of-tan and dullness language; no SPF or sunburn-treatment claims.                         |
| Ingredient discovery  | SKINKARI ingredients, ingredients in SKINKARI masks                  | `/ingredients`                                | Clear featured-ingredient groups and an explicit distinction from complete INCI.                               |
| How to use            | how to use SKINKARI sheet mask, how long to leave on a SKINKARI mask | `/journal/your-fifteen-minute-mask-ritual`    | Directions and 15-minute wear time for Vitamin C Radiance, Hyaluronic Acid, Collagen & Peptide and Detan only. |
| Label literacy        | how to read a sheet mask pack                                        | `/journal/reading-your-mask-pack`             | Names, highlighted ingredients, directions and the limits of the supplied artwork.                             |
| Brand trust           | about SKINKARI                                                       | `/about`                                      | Brand positioning without fabricated founder history, awards, facilities or testimonials.                      |
| Support               | SKINKARI shipping, returns, customer care                            | Relevant policy/contact page after completion | Verified, usable merchant information. Pending pages are currently noindex.                                    |

Do not target acne treatment, eczema, melasma treatment, guaranteed tan removal, permanent skin lightening, SPF, clinically proven results, or quantified improvements without suitable evidence and editorial approval. Avoid city doorway pages, copied ingredient glossaries and pages generated solely to capture keyword variations.

## Content rules

- The approved source record is `docs/PACKAGING-ANALYSIS.md`, with original PDFs in `reference/products/`. Preserve cosmetic qualifiers such as “helps” and “appearance.”
- Keep each product description distinct: Vitamin C Radiance/orange, Hyaluronic Acid/blue, Collagen & Peptide/pink and Detan/green. Do not repeat the full product description in every homepage module.
- The journal currently contains two original articles based on package directions and label reading. No author credentials, publication dates, review ratings or clinical references have been invented.
- Ingredient concentrations, full INCI and product-specific recommended frequency are absent. Add these only from approved final product documentation. Ingredient education beyond the packs needs suitable primary sources and review.
- Use genuine reviews only after a working collection/moderation process exists. Do not add empty or fictional review counts to visible pages or structured data.
- Brightening Mask is excluded from the approved catalogue. Its source remains in the reference archive; omit its route from product navigation and the sitemap.

## Crawlable architecture

Keep product titles, descriptions, ingredients and directions in the server-rendered response. Client-side animations and discovery selectors enhance content that already exists as semantic HTML. Product links must be real anchor links with descriptive text.

The four-product collection fits on one page. If the catalogue grows, implement crawlable pagination with distinct URLs and links so crawlers do not depend on clicking a “load more” button. Google documents these tradeoffs in [Pagination and incremental page loading](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading).

Maintain stable descriptive handles. If an approved product is renamed, preserve its useful URL or add a permanent redirect and update links, sitemap and canonicals together. An unknown product handle must return a genuine 404. Do not redirect every removed product to the homepage.

## Metadata and index controls

The shared metadata helper supplies a unique title, description, canonical path, Open Graph fields and Twitter summary card. `NEXT_PUBLIC_SITE_URL` must be the final HTTPS origin before production. Check that social previews, sitemap entries, JSON-LD and canonical URLs use that same origin.

The application includes an explicit launch gate: `NEXT_PUBLIC_INDEXING_ENABLED=true` and `STOREFRONT_MODE=live` are needed for production indexing. Keep previews/demo deployments behind the hosting provider’s access controls when possible and retain noindex while reviewing.

The XML sitemap lists homepage, shop, the four product URLs, about, ingredients, FAQs, journal and the two articles: 12 URLs for the current catalogue. It is available during demo for inspection, while demo HTML remains noindex and robots.txt disallows crawling. Submit it only after the launch gate is enabled. Cart/API routes and unfinished contact/policy pages are excluded. No last-modified timestamp is invented; derive one from a meaningful content update or omit it.

Contact, shipping/returns, privacy and terms currently have page-level noindex because their merchant details are pending. Replace their notices with approved content, then deliberately review metadata and sitemap inclusion. Cart is a utility page and should remain noindex. Keep API routes out of the sitemap.

A robots.txt rule is a crawl instruction, not a privacy mechanism or guaranteed indexing exclusion. Keep any page that relies on an HTML noindex directive crawlable so crawlers can read it; use authentication for private information. See Google’s [robots.txt guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

## Structured data

Use `Product` on product detail pages with the same name, description, image and brand that are visible. Emit `Offer` data only when real Shopify variant price, currency, availability and a matching purchase URL are available. Demo values must not become zero-price offers. Shopify errors must not produce made-up availability. Do not add ratings, reviews, GTINs, SKUs, shipping prices or return-policy terms without the corresponding verified data.

Google’s [Product structured-data overview](https://developers.google.com/search/docs/appearance/structured-data/product) distinguishes product snippets and merchant listing experiences. Structured data establishes eligibility, not a guarantee that a rich result appears.

Use Organization metadata for the actual brand/site; only add legal address, support contact and social `sameAs` links when verified. Add a BreadcrumbList matching the real hierarchy on product pages. Article structured data can be added after genuine publication and authorship details are established; do not invent those details just to fill a schema template.

Validate the rendered live page with Google’s Rich Results Test and Search Console URL Inspection. Shipping/returns properties must agree with the visible approved policies and checkout. Follow the [merchant listing documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) when extending offers or adding Merchant Center feeds.

## Internal linking

- Homepage → shop, every product, ingredient guide, how-to journal article, about.
- Shop → each canonical product URL; use product names as accessible link text.
- Product pages → collection, ingredients, directions/FAQ and relevant published policies.
- Ingredients → the mask associated with each highlighted ingredient group.
- Journal articles → ingredient guide, FAQs and collection where useful to the reader.
- Footer → informational pages, policies and customer care. Social links only after the merchant provides verified destinations.

Do not create a separate indexable landing page for every concern filter. Current concern selectors can lead to or filter the four products. Any future concern page should have distinct approved content and enough relevant products to be useful.

## Mobile performance and accessibility

Use appropriately sized responsive product imagery with fixed dimensions/aspect ratios to reduce layout movement. Prioritise only the principal above-the-fold image; lazy-load lower imagery. Replace temporary print artwork with compressed approved photography without removing informative alt text.

Keep transitions lightweight, honour reduced motion and avoid delaying readable content until an entrance animation completes. Test on mid-range mobile hardware or a representative CPU/network throttle. Check heading order, keyboard access, focus visibility, cart announcements, drawer focus, colour contrast and comfortable touch targets.

Measure LCP, INP and CLS with lab tools during development and field data after launch. Record the environment and actual results; a successful build is not a Core Web Vitals score. Avoid calling the store performance-optimised based only on a desktop screenshot.

## Launch and measurement checklist

1. Resolve the content, merchant and commerce blockers in `EDITORIAL-TODO.md`; complete live Shopify verification.
2. Verify HTML source, status codes, canonical URLs, title/description uniqueness, social images, sitemap and robots response on the final domain.
3. Check one in-stock and one unavailable product against the visible UI, Shopify data and rendered Product/Offer schema. Check demo contains no fictional offers or reviews.
4. Inspect mobile navigation, the collection, every product, the bag and both articles at narrow widths; run accessibility and performance checks.
5. Turn on indexing only for the approved live domain. Verify ownership in Search Console and submit the sitemap. Do not submit preview domains.
6. Review indexing coverage, query/page impressions and actual conversion events after traffic exists. Introduce analytics only with the merchant’s approved privacy/consent setup.
7. Use observed questions and search impressions to prioritise new articles. Review claims and internal links before publication. Record real publication/update dates at that time.
8. Recheck availability/price consistency, crawl errors and mobile field performance after commerce or content releases.
