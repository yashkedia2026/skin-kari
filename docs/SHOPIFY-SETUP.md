# Shopify setup and launch verification

This project is a custom Next.js storefront with Shopify as its commerce backend. Shopify credentials were not provided, so a live store, payment, shipping calculation or completed checkout has **not** been verified. Demo mode is intended for local review.

## 1. Prepare the store

Create or use the merchant’s Shopify store. Add the Headless sales channel, create a storefront and grant the Storefront API access needed to read products/variants and create/update carts. Publish the four products to that channel. The current adapter uses a **public Storefront access token on the server**, sent with `X-Shopify-Storefront-Access-Token`; do not paste an Admin API token or a private Storefront token into that field. The official [headless overview](https://shopify.dev/docs/storefronts/headless/overview) explains channel setup and token types, and the [Storefront API reference](https://shopify.dev/docs/api/storefront/latest) documents authentication.

This integration does not need an Admin API credential. Product and metafield editing happens in Shopify admin; the website reads the approved content.

## 2. Configure the environment

Copy `.env.example` to `.env.local` for development. Keep secrets out of version control. Set the equivalent variables in the production hosting environment and rebuild/redeploy after changing public variables.

| Variable                          | Value and purpose                                                                                                                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STOREFRONT_MODE`                 | `demo` for packaging fixtures and a local demonstration cart; `live` to require Shopify. Explicitly use `live` in production.                                                                                              |
| `SHOPIFY_STORE_DOMAIN`            | Bare permanent shop hostname, e.g. `your-shop.myshopify.com`; no scheme, slash or custom storefront hostname.                                                                                                              |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Public Storefront API access token for the Headless storefront. It remains server-side in this implementation.                                                                                                             |
| `SHOPIFY_API_VERSION`             | `2026-10`, the stable version selected for this build. Review Shopify’s supported versions during maintenance.                                                                                                             |
| `SHOPIFY_CHECKOUT_DOMAIN`         | Optional exact custom checkout hostname, without scheme or path, only if Shopify returns checkout URLs on this merchant-owned domain.                                                                                      |
| `NEXT_PUBLIC_SITE_URL`            | Final HTTPS storefront origin, such as the merchant’s verified domain. Used for canonical URLs, social/schema URLs and cart origin checks. Local development uses `http://127.0.0.1:3000`; open that exact browser origin. |
| `NEXT_PUBLIC_INDEXING_ENABLED`    | Leave `false` during review. Set `true` only on the approved live production domain after content and commerce checks.                                                                                                     |

When mode is omitted, the application defaults to demo only if both Shopify credentials are absent. Partial credentials, invalid configuration and Shopify failures do not silently become successful demo purchases. Explicit `demo` mode deliberately ignores Shopify credentials.

Checkout redirects accept HTTPS URLs only, on the configured `myshopify.com` domain or the exact optional checkout domain. Confirm the actual hostname returned by your store before launch; do not use a wildcard allowlist.

## 3. Create the four products

Use these handles so Shopify products match the editorial colour, artwork and packaging content in `src/data/products.ts`:

| Shopify handle                 | Packaging product name       | Family |
| ------------------------------ | ---------------------------- | ------ |
| `vitamin-c-radiance-face-mask` | Vitamin C Radiance Face Mask | Orange |
| `hyaluronic-acid-face-mask`    | Hyaluronic Acid Face Mask    | Blue   |
| `collagen-peptide-face-mask`   | Collagen & Peptide Face Mask | Pink   |
| `detan-face-mask`              | Detan Face Mask              | Green  |

Supply merchant-approved titles, plain product descriptions, product imagery with alt text, variant names/options, actual prices and currency, inventory settings, SKUs and any applicable tax/shipping settings. Live prices and availability come from Shopify variants, not the fixture file. Keep each product published to the intended Headless channel.

All supplied main packs say one sheet mask / 20 ml. A single default variant is sufficient if that is the actual merchandise. Add multipacks or discovery bundles only when the merchant has created and approved the real Shopify products/variants and their prices. The supplementary Brightening Mask artwork is not an additional SKU.

Do not copy the fixture art into Shopify as if it were finished product photography. It is extracted print artwork; replace it with approved images of the actual saleable products.

## 4. Make product detail content editable in Shopify

Create **product** metafield definitions using the exact namespace/key pairs below. Enable Storefront API access for each definition (`access.storefront: PUBLIC_READ`). Shopify describes this in [Retrieve metafields with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/metafields).

| Namespace/key                 | Shopify type                  | Shape / purpose                                                                                       |
| ----------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `custom.benefits`             | `list.single_line_text_field` | List of approved cosmetic benefit statements.                                                         |
| `custom.directions`           | `list.single_line_text_field` | Ordered usage steps.                                                                                  |
| `custom.caution`              | `list.single_line_text_field` | Cautions and warnings, each as one list item.                                                         |
| `custom.featured_ingredients` | `json`                        | Array of objects with nonempty `name` and `description` strings. These are highlights, not full INCI. |
| `custom.net_content`          | `single_line_text_field`      | Approved net content, initially `20 ml`.                                                              |

Example direction values, transcribed from the packs:

```json
[
  "Apply mask on freshly cleansed face",
  "Keep it on for 15 minutes before removing gently",
  "Pat in the excess serum on face and neck"
]
```

Example featured-ingredient value for the Vitamin C pack:

```json
[
  {
    "name": "Vitamin C",
    "description": "Featured on the Vitamin C Radiance Face Mask packaging."
  },
  {
    "name": "Niacinamide",
    "description": "Named alongside Vitamin C and Licorice Extract on the pack."
  },
  {
    "name": "Licorice Extract",
    "description": "One of the three ingredients highlighted on the front of the pack."
  }
]
```

The adapter validates these shapes and exposes valid values as product detail overrides. Missing or malformed metafields leave the packaging-derived defaults in place. Confirm each override appears correctly on its live product page. The brand palette, editorial collection mapping, homepage text, ingredient guide, FAQs and journal remain repository-managed; coordinate those pages when packaging or formulas change.

The supplied full INCI sections are blank. This build does not invent them or pretend the highlights are complete. Obtain the final full lists and add a clearly named, separately modelled full-ingredients field and page section before commercial launch; do not overload `custom.featured_ingredients` with an INCI string.

## 5. Configure checkout in Shopify

Configure the merchant’s actual India market and INR pricing, tax treatment, shipping profiles/zones/rates, fulfilment settings, discounts, supported payment methods and approved policies inside Shopify. The adapter queries products in India context and creates carts with India as the buyer country. These commercial settings cannot be inferred from the packaging. Test the returned currency and actual checkout rather than assuming the market setup is complete.

The storefront creates and changes carts through the Storefront Cart API. When the shopper chooses checkout it requests a fresh `checkoutUrl` and redirects to Shopify’s hosted checkout. Shopify’s supported checkout is responsible for the shipping, tax, discounts and payment total; no local card form is implemented. See [Create and update a cart](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage).

Account login and a customer-account portal are not included in this initial implementation. Verify guest checkout using the actual store configuration.

## 6. Verify before opening the store

Use an approved development/test payment setup and test orders before accepting real payments. Record the environment and evidence for each check.

1. Load all four product pages server-side. Verify Shopify titles, descriptions, images, variant IDs, INR prices and availability against admin.
2. Change an approved metafield in Shopify. Confirm the product page reflects it, then restore the intended value. Check missing and malformed metafield fallback in a test product.
3. Add each real variant, update quantities, remove a line, empty the bag, and reload. Confirm bag persistence and the displayed subtotal against Shopify.
4. Try an unavailable variant and a quantity greater than available inventory. Confirm the shopper receives a useful response and is not shown a false successful purchase.
5. Change a price and availability in admin. Confirm the cart and product view handle the updated values, including cart warnings and checkout recalculation.
6. Reload with an expired/invalid cart in a test environment. Verify recovery and clear error feedback. Simulate an API outage; it must not switch a live purchase into demo mode.
7. Choose checkout. Verify the exact allowed HTTPS destination, line items, quantities, market/currency, shipping address eligibility, shipping charges, taxes, discounts and final payment amount.
8. Complete a test checkout, verify the order in Shopify admin, and verify the merchant’s order-confirmation/fulfilment process. Test a failed/cancelled payment and return to the storefront.
9. Repeat the complete flow on narrow mobile and desktop viewports with keyboard navigation, reduced motion and a slow connection.
10. Confirm merchant legal/contact details and approved shipping/returns/privacy/terms are published. Remove the preview notices only after replacing them with approved content.

Demo verification does not prove any of the Shopify-dependent steps above.

## Maintenance notes

- Shopify cart IDs include secret material. This implementation retains the full identifier in an HttpOnly cookie; do not add cart identifiers, tokens or checkout URLs to analytics, error logs or public metadata.
- The demo bag uses a necessary HttpOnly cookie and has no authoritative price, subtotal or live inventory. Its checkout is disabled and it never creates an order.
- Cart cookies persist for up to 30 days. The app caps a line at 99 units and a bag at 40 distinct lines; these are application limits, not stock claims. Shopify still determines actual live availability.
- Cart writes require JSON from the configured storefront origin. If local add-to-bag requests return an origin error, match the browser address to `NEXT_PUBLIC_SITE_URL`; do not weaken origin validation.
- Recheck the API version and token permissions before Shopify retires the pinned version. Rotate tokens through the merchant’s account when required.
- Keep the final privacy notice aligned with the deployment’s actual hosting, cookies, Shopify connection and any future analytics/marketing additions.
- Re-run cart tests and live smoke checks after changing commerce queries, product handles, domains, inventory policy, pricing or checkout settings.
