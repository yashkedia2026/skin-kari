# SKINKARI design system

## Source and direction

The five packaging PDFs establish the visual identity: a multicoloured illustrated SKINकारी wordmark, geometric portrait collages, flowers, foliage, arches, sun motifs and expressive orange/blue/pink/green colour stories. Brightening Mask adds a separate illustrated white sachet with an orange accent. The site extends that language using original artwork rather than unrelated stock imagery. The wordmark in the header is extracted from the supplied packaging.

The layout alternates spacious cream editorial areas with full-colour product experiences. Forest green anchors navigation and the footer. Large, tightly spaced headings pair Bricolage Grotesque with occasional Georgia italics; DM Sans handles reading text. Variable Latin fonts are served locally and preloaded with Next Font.

## Tokens

Tokens and responsive rules live in `src/app/globals.css`; Tailwind 4 is configured via PostCSS and exposes the same cream/ink/font tokens.

| Role                          | Value                 |
| ----------------------------- | --------------------- |
| Canvas                        | `#faf4e8`             |
| Ink / primary action          | `#25392e`             |
| Accessible brand orange       | `#cc3d20`             |
| Vitamin C surface / accent    | `#f9dfb7` / `#a73819` |
| Hyaluronic surface / accent   | `#d9eaf1` / `#24528e` |
| Collagen surface / accent     | `#f5dce1` / `#9c2949` |
| Detan surface / accent        | `#e0e8cc` / `#315e36` |
| Content gutter                | responsive 22–80 px   |
| Primary action minimum height | 52 px                 |

Orange was deepened after automated contrast checks. Product illustrations keep their original print colours. Cards use subtle corner rounding; arches and circular motifs carry most of the visual character.

## Components and behaviour

- Hero: server-rendered copy with optional entrance motion; original product artworks on a geometric stage. Images reserve dimensions and load eagerly above the fold.
- Product card: colour context, artwork, real title, ingredient highlights and quick add. Multiple variants route to a product selector rather than choosing silently.
- Product page: selected variant controls the displayed Shopify price and availability. Directions, ingredient highlights and warnings use accessible native disclosures.
- Concern navigation: real links to URL-based filters, so browsing and browser history remain coherent.
- Spotlight: native pressed-state buttons and a concise live region. Its content comes from the current catalogue and optional Shopify editorial fields.
- Cart: native modal dialog, dismissible by Escape, focus handling from the browser, body scroll lock, explicit loading/error feedback and quantity controls. A full cart route remains available.
- Mobile navigation: native modal dialog with descriptive controls and simple route links.

Motion uses small transforms and opacity changes with no parallax, background video or continuous product animation. `MotionConfig reducedMotion="user"` and CSS media rules respect reduced-motion settings. Rendered content remains visible before JavaScript executes. No motion completion controls a purchase or navigation action.

## Asset status

Four product graphics are temporary crops of source packaging flats; Brightening Mask uses the front mockup from its own PDF. All five have optimized WebP derivatives. These assets do not establish finished production photography. Brightening Mask remains a separate catalogue product with its own artwork and the existing `brightening-reference` image filename. Replace assets with approved final images before launch; preserve accurate alt text and aspect ratios.

## Responsive intent

The full collection uses five columns above 1100 px, three from 801–1100 px and two on smaller screens. Shorter filtered collections retain the standard four-column desktop grid. Product details become a single column below 600 px. Header links become a mobile menu at 800 px. Type scales fluidly, editorial grids stack, and concern choices stay usable without horizontal scrolling. Desktop/mobile browser tests check document overflow, navigation and cart behaviour. Real-device and assistive-technology review remains a launch task.
