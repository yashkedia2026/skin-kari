# SKINKARI design system

## Source and direction

The client's October 27 reference image sets the layout and visual direction:
warm cream, black condensed headings and buttons, geometric portraits,
thin separators, rectangular cards and four saturated product colour panels.
The four approved packaging PDFs remain the source of truth for the logo,
product artwork and catalogue information. At the user's explicit request,
homepage promotional copy follows the reference word for word. The reference
screenshot is not used as a page background or substituted for real components.
Its two portraits and foliage are reconstructed raster assets generated with
the built-in image tool; they are not original source illustrations.

The homepage follows the reference sequence: navigation; “Indian Skincare for
Real Life” hero; four skin-concern links; “Good stuff. No gimmicks” ingredients;
“Made for Indian skin” illustration split; four product panels; compact footer.
The order of those panels is Detan, Vitamin C, Hyaluronic Acid, then Collagen &
Peptide. Supporting pages, shop, product details and cart share the same visual
system while retaining their commerce behaviour.

## Type and tokens

Oswald provides condensed display headings, navigation labels and primary
buttons, with local weights 400, 500, 600 and 700. DM Sans handles paragraphs and interface text. Caveat is reserved for
the handwritten hero statement. Fonts are served locally through Next Font;
the handwritten font is not preloaded. The original multicoloured SKINKARI logo
is an extracted image, not typeset text.

Base styles remain in `src/app/globals.css`. The current brand treatment lives
in `src/app/redesign.css`, shopping overrides in `src/app/commerce-redesign.css`,
and header/footer/search styles in `src/components/navigation-redesign.css`.

| Role                             | Value                 |
| -------------------------------- | --------------------- |
| Canvas                           | `#faf8f1`             |
| Text / primary action            | `#101010` / `#080808` |
| Detan product panel              | `#00744f`             |
| Vitamin C product panel          | `#ffb022`             |
| Hyaluronic Acid product panel    | `#0075d4`             |
| Collagen & Peptide product panel | `#d51b72`             |
| Orange concern-link text         | `#a94f00`             |
| Blue concern-link text           | `#0067b8`             |
| Green concern-link text          | `#00704c`             |
| Pink concern-link text           | `#bb1460`             |

The surface palette follows the supplied reference and the four packaging colour
families. The original packaging colours are not recoloured. Text accents are
darker than the bright surfaces to preserve contrast; panel text uses black or
white according to its background. Forms, navigation, cart controls and product
information retain visible focus states and readable body text.

## Artwork and components

- Hero: reconstructed front-facing geometric woman with separate ingredient
  icons, climate symbols, connector lines, geometric trim, sun, corner leaves
  and handwritten statement. Text remains selectable, responsive and server rendered.
- Concern cards: four rectangular links directly to the corresponding existing
  product pages. Shop filters remain URL based on the shop page.
- Ingredient row: six distinct inline SVG icons with thin separators and the
  reference descriptions. Faceted charcoal cubes, a shaded leaf, a seven-blade
  aloe fan, a citrus slice, a pink molecule and a diagonal pink helix replace
  the earlier mixed packaging crops and simplified symbols.
- Indian-skin split: reconstructed geometric profile portrait surrounded by
  emerald foliage, a separate warm sun shape and four value icons. Product
  packaging itself remains the original supplied artwork.
- Product showcase: four equal desktop panels with original packaging, accurate
  titles/descriptions and links to existing product pages. Shopify's catalogue
  continues to supply products in live mode.
- Product pages: colour-specific presentation, large packaging, ingredient
  details, benefits, directions, warning disclosures and related products.
  Selected variants still determine real Shopify price and availability.
- Header: original logo, reference navigation, functional product search,
  accessible account-information dialog, current bag count and mobile menu.
- Footer: reference wording and social marks, current-year copyright, leaf
  clusters at both corners and an honest newsletter/social availability notice.
  Missing destinations are non-interactive placeholders; no invented profile
  links or simulated integrations are provided.
- Cart: native modal dialog with Escape handling, focus restoration, scroll
  lock, explicit loading/error feedback and quantity controls. The full cart
  route remains available.

All arrows and decorative symbols are SVG or image assets, avoiding
platform-dependent emoji glyphs. Native dialogs support search, account
information, mobile navigation and the bag. Account authentication and email
subscription are not implemented; their interface does not pretend otherwise.

## Motion and responsive behaviour

Motion uses modest reveals, hover movement and short opacity/transform changes.
`MotionConfig reducedMotion="user"` and CSS media rules respect reduced-motion
preferences. Content remains visible before JavaScript runs; no purchase or
navigation action waits for an animation to complete.

The hero adapts to a stacked phone composition, concern cards and products use
usable responsive grids, and ingredients wrap into smaller groups. Product
details become a single column on narrow screens. Header navigation becomes an
accessible mobile menu when space is insufficient. Text is allowed to wrap;
fixed-height boxes must not clip product names or supporting copy.

## Asset status and fidelity

The product graphics are high-resolution crops of original packaging flats,
with WebP derivatives. They are accurate supplied artwork, not finished product
photography. Original directions illustrations remain available for usage
content. The fifth PDF, Brightening Mask, is preserved as reference material and
excluded from the storefront at the user's request.

The original editable vectors for the two reference women and standalone
foliage are not available. The current homepage uses generated reconstructions
in `public/images/reference/`, with separate transparent PNGs and optimized
WebP derivatives. Earlier packaging-derived portraits remain preserved in
`public/images/editorial/` but no longer supply the homepage women. See
[artwork provenance](REDESIGN-ARTWORK.md) and
[generation prompts and asset details](REFERENCE-ASSETS.md). Do not describe
generated assets as original client artwork or claim a pixel-perfect match.

This redesign is local only. No commit, GitHub push or deployment is part of the
redesign without the user's explicit authorization. See
[the redesign report](REDESIGN-REPORT.md) and [QA report](QA-REPORT.md) for the
current validation status and remaining external requirements.
