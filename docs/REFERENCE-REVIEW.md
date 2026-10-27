# Independent reference review

Review date: 28 October 2026. This document records the independent review
requested by the user; it is a working checklist, not a claim of an exact match.
No commit, push or deployment is part of the review.

**Final status after six correction reviews: accepted as a faithful responsive
implementation.** The major visual discrepancies and overlap/readability
issues identified below are resolved. This is visual acceptance of the
reviewed screenshots, not a claim of pixel identity or a substitute for the
separate production/browser test results. The historical “Open” states in the
initial checklist describe the starting point; see the final verdict below.

## Evidence

- Reference: `/Users/yashkedia/Downloads/WhatsApp Image 2026-10-27 at 11.38.00 PM.jpeg`, 900 × 1600.
- Initial implementation: `docs/previews/desktop-home.png`, 1440 × 2575, and `docs/previews/mobile-home.png`, 390 × 4022.
- Initial code read: homepage, hero, ingredient art, footer, homepage CSS and navigation CSS.
- Desktop images are compared at equal width. A similar total page height does not establish matching illustrations, typography, section density or copy.

## Initial verdict

**Major visual changes required.** Section order and broad colour families match.
The two central illustrations, foliage, several icons, typography and visible
copy remain visibly different. The current mobile layout is a sensible
adaptation, but carries those same artwork and copy differences.

## Prioritized correction checklist

| Priority | Element                   | Observed difference                                                                                                                                                                                             | Acceptance criterion                                                                                                                                                 | Initial state |
| -------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| P0       | Hero portrait             | Current narrow packaging profile has a closed eye, citrus and flowers. Reference is a front-facing geometric woman with both eyes open, blue and black hair, bindi, earrings, multicoloured face and shoulders. | Use the reference composition or a faithful reconstruction. Both eyes, front-facing pose, blue hair silhouette, facial geometry and visible shoulders must match.    | Open          |
| P0       | Second portrait           | Current Detan profile is narrow and includes lotus/cucumber packaging imagery. Reference is a large left-facing profile, closed eye, dark hair, pink lips, geometric earring and abundant green leaves.         | Match the profile composition and crop, with face filling the right part of the section, dark hair and foliage; remove unrelated lotus/cucumber/citrus elements.     | Open          |
| P0       | Foliage                   | Missing hero bottom-right cluster and both footer corner clusters. Story leaves are the wrong shape, colour distribution and arrangement.                                                                       | Faceted emerald/dark-green leaves at the same locations and comparable scale. Leaves must not cover copy or controls at any width.                                   | Open          |
| P1       | Hero backdrop             | Current large flat yellow sun behind the portrait is absent from reference.                                                                                                                                     | Remove this backdrop from hero; retain the separate striped orange sun in the story section.                                                                         | Open          |
| P1       | Aloe icon                 | Current sparse three-blade packaging symbol differs from dense pointed fan.                                                                                                                                     | Dense 7–9-blade emerald fan, shaded faces, no pot or detached baseline. Reuse consistently in hero and ingredients.                                                  | Open          |
| P1       | Charcoal icon             | Current irregular charcoal rocks differ from stacked geometric cubes.                                                                                                                                           | Small shaded black cube pile, pyramid arrangement, consistent in hero and ingredients.                                                                               | Open          |
| P1       | Green tea / leaf          | Current flat green leaf with bold white vein differs from faceted green leaf.                                                                                                                                   | Pointed shaded leaf with diagonal stem and subtle vein. Reuse for concern, ingredients and Indian-skin value.                                                        | Open          |
| P1       | Collagen icon             | Current thin near-vertical loose helix differs from broad diagonal pink helix.                                                                                                                                  | Two bold intertwined pink curves, diagonal from lower-left to upper-right, with aligned ladder rungs.                                                                | Open          |
| P1       | Peptides icon             | Current node layout, node count and visual weight differ.                                                                                                                                                       | Match pink molecular diagram: larger centre and endpoints, connected diagonals and outline circles.                                                                  | Open          |
| P1       | Vitamin C icon            | Current slice-with-leaf is repeated in hero and ingredient row.                                                                                                                                                 | Hero: whole orange plus overlapping sliced orange and green leaf. Ingredient row: circular cut orange slice, no added top leaf.                                      | Open          |
| P1       | Climate and concern icons | Climate humidity uses one drop; reference has three. Extra two drops under urban cloud and small sun on hair are missing. Sun/cloud shading differs.                                                            | One drop for dehydration concern, three for humidity, two under cloud; filled yellow sun for climate and thin outline orange sun for concern. Soft light-grey cloud. | Open          |
| P1       | Hero connector lines      | Current three disconnected short dashes do not follow reference.                                                                                                                                                | Thin muted lines with small dots extending from portrait/ingredients toward climate labels as in reference. Do not overlap legible copy.                             | Open          |
| P1       | Hero values               | Hand-heart and leaf silhouettes differ; second value copy changed.                                                                                                                                              | Match outline leaf, flask and two-hands-with-heart symbols; exact reference wording below.                                                                           | Open          |
| P1       | Headline typography       | Current Anton is visibly heavier than reference throughout. Hero letters and product labels are especially dense.                                                                                               | Closer condensed display face/weight, same line breaks and comparable rendered widths. Do not simply shrink all text.                                                | Open          |
| P1       | Exact copy                | Several descriptions and footer labels changed.                                                                                                                                                                 | Match the transcription below, with functional limitations disclosed honestly when needed.                                                                           | Open          |
| P2       | Header                    | Logo is proportionally too small; desktop nav begins too far right. Added demo notice changes the top edge.                                                                                                     | Enlarge wordmark roughly 25–30% at desktop and redistribute logo/nav/actions to reference proportions. Preserve an honest demo notice without making it dominate.    | Open          |
| P2       | Concern cards             | Current fourth heading stays on one line at desktop; reference uses two lines. Font is heavier, accent colours darker.                                                                                          | Match 2-line fourth heading and compact card density; keep contrast and mobile readability.                                                                          | Open          |
| P2       | Story sun                 | Current sun is larger, further left/lower relative to face; more stripes.                                                                                                                                       | Orange disc immediately behind profile to its left, three fine cream horizontal cuts around lower half, matching reference proportions.                              | Open          |
| P2       | Product panels            | Order is correct; current panels are taller and packs have more vertical whitespace. Blue/pink text is black while reference is white. Reference pack crops are wider/shorter.                                  | Tighten panel density and match label/button placement. Keep actual supplied packaging unwarped. Evaluate white text against adjusted panel colour for legibility.   | Open          |
| P2       | Footer                    | Current newsletter row, links, social row and copyright differ; no corner leaves.                                                                                                                               | Match visible reference content and compact layout while never inventing working integrations or merchant URLs. See constraints below.                               | Open          |
| P3       | Edge trim                 | Current simple repeated checker triangles differ from reference irregular dense multicolour mosaic.                                                                                                             | Increase facet variation, preserve left-lower and right-upper triangular cuts and colour order.                                                                      | Open          |
| P3       | Handwritten line          | Typeface/quote marks differ; mobile cream box cuts across portrait.                                                                                                                                             | Match two lines, angled handwritten style and opening/closing quotation marks; no large opaque block over the art.                                                   | Open          |

## Reference copy transcription

The following is the visible reference, preserving wording and meaningful
capitalization. Layout line breaks may adapt on phones.

| Location                 | Exact reference text                                                                                                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigation               | SHOP · WHY INDIAN SKIN · INGREDIENTS · OUR STORY · JOURNAL · BAG (0)                                                                                                                      |
| Hero kicker              | INDIAN SKINCARE                                                                                                                                                                           |
| Hero heading             | Indian Skincare / for Real Life.                                                                                                                                                          |
| Hero description         | Thoughtful ingredients and modern actives, made for the realities of life in India.                                                                                                       |
| Hero CTA                 | EXPLORE OUR PRODUCTS                                                                                                                                                                      |
| Hero values              | Thoughtful Ingredients · No Unnecessary Additives · Made for Real Life                                                                                                                    |
| Hero ingredient labels   | ALOE · CHARCOAL · VITAMIN C                                                                                                                                                               |
| Hero climate labels      | STRONG SUN · HUMIDITY · URBAN LIFE                                                                                                                                                        |
| Hero handwritten note    | “Rooted in India. Made for real life.”                                                                                                                                                    |
| Concern heading          | WHAT DOES YOUR SKIN NEED TODAY?                                                                                                                                                           |
| Concern 1                | I’M DULL → VITAMIN C                                                                                                                                                                      |
| Concern 2                | I’M DEHYDRATED → HYALURONIC ACID                                                                                                                                                          |
| Concern 3                | MY SKIN LOOKS TIRED → DETAN                                                                                                                                                               |
| Concern 4                | I WANT PLUMP, BOUNCY SKIN → COLLAGEN & PEPTIDES                                                                                                                                           |
| Ingredient heading       | GOOD STUFF. NO GIMMICKS.                                                                                                                                                                  |
| Ingredient intro         | Every ingredient has a reason to be here.                                                                                                                                                 |
| Ingredients              | CHARCOAL / Purifies pores · GREEN TEA / Soothes skin · ALOE / Hydrates skin · VITAMIN C / Brightens skin · PEPTIDES / Supports firmer skin · COLLAGEN / Helps maintain plump-looking skin |
| Indian skin heading      | MADE FOR INDIAN SKIN.                                                                                                                                                                     |
| Indian skin description  | Different climates. Different routines. Same thoughtful care.                                                                                                                             |
| Indian skin values       | REAL INDIAN CLIMATES · THOUGHTFUL INGREDIENTS · CONSIDERED FORMULAS · SKIN, NOT STANDARDS                                                                                                 |
| Product section heading  | FOUR RITUALS. MANY REALITIES.                                                                                                                                                             |
| Product section subtitle | Four masks. Four skin moments.                                                                                                                                                            |
| Detan panel              | DETAN MASK / For sun-exposed, tired-looking skin. / VIEW MASK                                                                                                                             |
| Vitamin C panel          | VITAMIN C MASK / For dull-looking skin that needs a brighter boost. / VIEW MASK                                                                                                           |
| Hyaluronic panel         | HYALURONIC ACID MASK / For skin that feels thirsty and needs hydration. / VIEW MASK                                                                                                       |
| Collagen panel           | COLLAGEN & PEPTIDE MASK / For skin that wants a plumper, bouncier feel. / VIEW MASK                                                                                                       |
| Footer brand             | MADE IN INDIA. FOR EVERY INDIAN SKIN.                                                                                                                                                     |
| Footer Shop              | Shop / Shop All / Best Sellers / New Arrivals                                                                                                                                             |
| Footer About             | About / Our Story / Sustainability / Careers                                                                                                                                              |
| Footer Help              | Help / FAQ / Shipping / Track Order / Contact                                                                                                                                             |
| Footer Legal             | Legal / Terms of Service / Privacy Policy                                                                                                                                                 |
| Footer newsletter        | Stay in the loop. / New rituals, ingredient stories and occasional good stuff. / Email                                                                                                    |
| Footer signoff           | Real Ingredients. A Brighter Tomorrow.                                                                                                                                                    |
| Reference copyright      | © 2024 SKINकारी. All rights reserved.                                                                                                                                                     |

**Additional initial copy mismatch:** ingredient intro currently says “to be
there,” while the reference says “to be here.” This is easy to overlook.

## Functional constraints and responsive adaptations

- Four catalogue products, real product URLs, cart persistence, working search,
  filtering, Shopify adapter and demo checkout restrictions must remain intact.
- The user requested exact visible copy. Missing footer destinations can be
  represented honestly as unavailable; do not create fake credentials, social
  handles, order tracking, newsletter success, or unsupported merchant facts.
- Reference social icons are Instagram, YouTube, Pinterest, Facebook and
  WhatsApp. Exact social profile URLs have not been supplied. A decorative or
  clearly unavailable treatment is preferable to invented links.
- The reference copyright year is 2024. Keeping a current legal year is a
  deliberate difference and must be recorded if retained.
- Mobile may stack hero/art, use two concern/product columns and a three-column
  ingredient grid. That is an allowed adaptation, provided no text clips and
  visual assets/content still match.
- Retain crisp SVG or image icons instead of platform emoji. The user's word
  “emojis” refers to the pictured symbols, not a requirement to use Unicode.
- Do not distort original product packaging merely to copy the mockup's shape.

## Review loop

1. Fix P0 portraits and foliage first; these dominate similarity.
2. Fix icon family and exact copy, then typography, spacing and footer.
3. Capture fresh desktop and mobile images after fonts and images have loaded,
   with scroll restored to the top.
4. Review normalized 900 px desktop against reference and inspect 390 px mobile
   separately. Check both illustration crops and leaves at narrower widths.
5. Record remaining differences explicitly. A passing functional test suite is
   not evidence of visual fidelity, and a visually close desktop does not prove
   the mobile page is free of overlap.

### Round 1 — before corrections

Result: **Changes requested.** P0 and P1 items above remain open. No final visual
approval issued.

### Round 2 — reconstructed art, matching copy and revised type

Evidence: `.cache/reference-round2/desktop-normalized.png` (1440 px capture
normalized to 900 px), `home-900.png`, `home-390.png` and `viewport-320.png`.

Result: **Substantial improvement; changes still requested.** The portrait
subjects now follow the correct compositions, the missing foliage is present,
the icon family is recognizably closer, and the visible reference copy has been
restored. Oswald is closer to the reference than the previous Anton treatment.
Header wordmark/navigation and footer structure are also much closer. These
changes resolve the major _wrong asset_ problems; the page is not yet ready for
visual approval because several placement and scale issues remain.

| Priority | Remaining issue                                   | Exact next correction                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | Hero portrait too small and too low               | In the normalized image, hair begins around y143 vs reference y70, while the hero ends at y432 vs y410. Enlarge the portrait and position its hair close to the hero's upper boundary (about 12 px below header at reference scale), with shoulders meeting the bottom. The mismatch is larger at the actual 900 px viewport, where the head begins around y248. The current `object-fit: contain` plus width-limited image box appears to be the cause. |
| P0       | 320 px handwritten note overlaps face/climate art | The rotated cream rectangle expands into several lines and covers the woman's face and climate content. Remove the opaque panel, give the caption a deliberate reserved region and tune its small-screen type/line breaks. Inspect the full 320 px hero, not only 390 px.                                                                                                                                                                                |
| P1       | Hero foliage covers handwritten copy              | On normalized desktop the right leaf cluster visually intersects the words. Move/reduce the cluster or shift the note left/up; keep the words on clear cream as in reference.                                                                                                                                                                                                                                                                            |
| P1       | Small sun floats above woman                      | It belongs over the blue upper-right hair in the reference. Re-anchor it after enlarging the portrait so it reads as an overlay on hair rather than a second unrelated climate icon.                                                                                                                                                                                                                                                                     |
| P1       | Footer leaf clusters intersect text               | Left foliage reaches the copyright baseline and right foliage intersects the signoff. Reserve horizontal space for these text elements or lower the leaf clusters, preserving both corner decorations.                                                                                                                                                                                                                                                   |
| P1       | Ingredient symbols too small                      | Most normalized symbols are about 34–40 px tall against reference 45–55 px. Increase their visual scale roughly 30–40%; preserve the six-column row and separators.                                                                                                                                                                                                                                                                                      |
| P1       | Value symbols too small/thin                      | Hero and Indian-skin outline symbols are now correct kinds, but appear like tiny hairlines. Increase drawing size/weight approximately 30–40%, especially sun, flask and heart.                                                                                                                                                                                                                                                                          |
| P2       | Hero CTA too narrow                               | Normalized CTA is about 191 px wide vs reference 235 px. Increase label size and horizontal padding/gap to match without forcing full desktop column width.                                                                                                                                                                                                                                                                                              |
| P2       | Product strip too tall                            | Normalized product packages are about 178 px tall vs reference 135 px. Reduce showcase package height around 20–24% and tighten vertical spacing. Keep actual package aspect ratios and readable descriptions. This should remove roughly 40 px of excess section height.                                                                                                                                                                                |
| P2       | Some heading/body sizes still differ              | Concern-section title is about 419 px wide vs reference approximately 490 px; many small labels/body lines are smaller. Increase the concern heading and relevant body sizes rather than globally increasing hero type (which is already slightly larger than reference).                                                                                                                                                                                |
| P2       | Footer text is small                              | Footer links look about 9–10 px at normalized width vs reference approximately 11 px. A 10–15% desktop increase is appropriate if it does not produce wrapping.                                                                                                                                                                                                                                                                                          |
| P3       | Geometric edge trim remains simpler               | Current checker facets do not reproduce reference's denser irregular mosaic. Secondary to placement/readability corrections above.                                                                                                                                                                                                                                                                                                                       |

Copy review: hero value, ingredient intro (“here”), peptide/collagen descriptions,
footer group labels, newsletter text and signoff capitalization now match. The
current copyright year and honest unavailable-service note are deliberate
functional differences, not unnoticed omissions. The reconstructed portraits
are faithful in subject/composition but are not pixel-identical source artwork.

The actual 900 px desktop remains substantially taller than the reference due
to responsive sizing. This can be an intentional layout decision, but reference
approval should use a defined desktop capture size, and the 900 px portrait
placement still needs correction regardless of the responsive policy.

### Round 3 — scale, spacing and overlap corrections

Evidence: `.cache/reference-round3/desktop-normalized.png`, `home-900.png`,
`home-390.png` and `home-320.png`.

Result: **Readability blockers resolved; four final visual corrections requested.**
The 320 px caption now has a reserved region below the face. Hero and footer
foliage no longer obscure text. Ingredient and value symbols have the intended
visual prominence, the CTA is closer in scale, and the product strip is much
closer in height. Copy remains consistent with the transcription above, apart
from the documented honest service/status differences.

Remaining corrections, sent to the implementing agent:

1. **Hero face proportions.** Raising the portrait works, but the new
   `object-fit: fill` treatment makes the face noticeably narrow and elongated,
   especially at 900 px. Widen its rendered box about 12–18% at desktop, or
   preserve the natural aspect ratio and crop the shoulder area. Keep the hair
   close to the hero top and the shoulders at the bottom.
2. **Small sun on hair.** It still floats outside the head at desktop. Move it
   left onto the upper-right blue hair (approximately x625 at normalized width,
   rather than x684). Phone placement is already closer.
3. **Story sun.** It is too large and far left. Suggested desktop change:
   width approximately 38% instead of 49%, left approximately 19% instead of
   10%, retaining the top offset. On 320 px, it floats almost entirely above the
   profile; anchor it relative to the rendered portrait or shorten the
   illustration box so the disc sits behind the hair.
4. **900 px ingredient-heading wrap.** “NO GIMMICKS.” now breaks into two lines,
   making three heading lines in total. At 801–1100 px, reduce that heading to
   about 34 px at 900 px or widen its column so the heading returns to the
   intended two-line composition.

No new mobile text clipping or missing reference content is apparent in the
provided 320/390 px screenshots. Final confirmation still requires a fresh
capture after these four corrections. A faithful reconstruction remains the
standard; pixel-identical generated art is not claimed.

### Round 4 — final composition check

Evidence: `.cache/reference-round4/desktop-normalized.png`, `home-900.png`,
`home-390.png` and `home-320.png`.

Result: **One remaining overlap blocker; other requested composition fixes pass.**
Hero facial proportions are now natural and much closer to the reference. The
small sun sits on the blue hair. Story sun size/position is improved on desktop
and now stays behind the portrait on phones. The 900 px ingredient heading is
back to two lines. No clipping is apparent in the 320/390 px pages, and footer
foliage remains clear of text.

The enlarged hero portrait introduces one remaining issue at 900 px: ALOE and
CHARCOAL labels overlap its dark hair, reducing legibility, and the lower-right
shoulder extends behind the handwritten note. The normalized desktop also has
the Vitamin C label and caption almost touching the shoulder silhouette.
Reserve clear zones for the left ingredient column and lower-right caption;
move the ingredient column left at this width and/or constrain the portrait
shoulders. Do not solve this by making the labels harder to read or allowing
them to overlap the hero's main copy.

Once this overlap is corrected and a fresh 900 px / normalized desktop capture
confirms the result, the major visual problems identified in this review are
resolved. Remaining differences are reconstructed illustration details, exact
product-pack proportions, subtle typography/palette choices, responsive
reflow, and the documented demo/unavailable-service indicators. They do not
justify claiming pixel identity.

### Round 5 — ingredient clearance confirmed

Evidence: `.cache/reference-round5/desktop-normalized.png`, `home-900.png`,
`home-390.png` and `home-320.png`.

The left ingredient labels now remain on clear cream at 900 px. Normalized
desktop and both phone captures pass the requested composition/readability
review. Only a small 900 px caption-edge collision remains: the initial “R” and
“M” touch the green shoulder silhouette. Shift the caption roughly 15 px right
at 801–1100 px, or slightly reduce its type size while preserving its right
alignment, and confirm with a fresh hero crop. No other critical visual action
was identified in this round.

### Round 6 — final visual acceptance

Evidence: `.cache/reference-round6/viewport-900.png` and `home-900.png`, together
with the unchanged desktop-normalized, 390 px and 320 px captures accepted in
Round 5. The final targeted change reduces the 801–1100 px handwritten caption
from 23 px to 21 px.

**Accepted.** The caption now clears the shoulder and right-hand leaves. Aloe,
Charcoal and Vitamin C labels remain legible on cream. The reviewed desktop,
900 px, 390 px and 320 px compositions have no remaining critical visual
corrections from this checklist.

Confirmed resolved:

- Hero uses the front-facing woman with both eyes, blue/black hair, bindi,
  earrings and multicoloured geometry; the second woman uses the intended
  closed-eye profile surrounded by green foliage.
- Hero and both footer corners contain faceted leaf clusters. Decorative art
  no longer covers the reviewed copy or controls.
- Aloe, charcoal, leaf, orange, peptide, collagen and climate symbols follow
  the reference icon family and use consistent image/SVG rendering.
- Reference visible marketing copy and footer labels are restored, subject to
  the explicitly documented functional differences below.
- Hero portrait scale, small sun placement, story sun placement, ingredient
  heading wrapping and product-strip density have been corrected through the
  review loop.
- Phone layouts preserve the content and artwork with readable stacked/two-
  column arrangements; the 320 px handwritten caption has its own clear area.

Remaining differences are recorded rather than concealed:

1. The two portraits and foliage are reconstructions; exact face facets,
   leaf contours, icon line geometry and the edge mosaic are not identical to
   the source image's pixels. No original editable reference vectors were
   supplied.
2. Original supplied product packaging is preserved without distortion. Its
   aspect ratios and fine details differ from the mockup's illustrated packs.
3. Fonts, exact spacing and some colour shades remain close interpretations.
   Blue/pink panels are adjusted for readable white copy.
4. Responsive behaviour deliberately differs from a fixed 900 × 1600 bitmap.
   The actual 900 px page is 2150 px tall; normalized wider-desktop proportions
   are the closer reference comparison. Phones stack content rather than
   shrinking every element to desktop scale.
5. The demo indicator and unavailable newsletter/social/account/destination
   states remain honest. Copyright uses the current year, 2026, instead of
   the reference's 2024. Checkout remains disabled in demo mode.

This review did not run production tests or validate real Shopify payments;
those are separate checks owned by the implementing agent. No remote changes
were made by the reviewer.

## User-directed follow-up — decoration and alignment refinements

The user's later instruction supersedes the earlier reference checklist for
the small sun on the woman's hair and the two standalone water drops: both are
now intentionally removed. The labelled STRONG SUN and HUMIDITY symbols remain.

Final evidence: `.cache/reference-adjustment3/viewport-1440.png`,
`viewport-1280.png`, `viewport-900.png`, `home-768.png`, `home-390.png` and
`home-320.png`.

**Accepted for this scoped refinement.** Desktop visible shoulders now meet the
hero divider, the ingredient/climate rows are evenly spaced, and connector
lines track their associated icon centres. The story portrait and foliage meet
the section's right and bottom edges. Caption text remains clear of the
portrait in the reviewed desktop/laptop captures.

Review found a 768 px collision between the two-column hero's description and
charcoal icon. A hero-only stacked arrangement at 601–800 px resolves it and
preserves the rest of the tablet page. The existing phone composition remains
readable, including its separate caption area. No remaining critical overlap
was identified in the six reviewed widths. This acceptance covers visual
inspection; automated browser and production checks remain separately
reported by the implementing agent. No application files, commits, pushes or
deployments were made by the reviewer.

## User-directed follow-up — symmetric hero spacing and phone connectors

Evidence: `.cache/reference-symmetry3/viewport-1440.png`,
`viewport-1280.png`, `viewport-900.png`, `home-768.png`,
`viewport-390.png`, `viewport-320.png` and `desktop-normalized.png`.

**Accepted for this scoped refinement.** The visible face is now centred
between the ingredient and climate callouts, with balanced left/right gaps
at the six reviewed widths. Equal-width callout slots, matching row positions
and mirrored connector lengths remove the previous directional imbalance.
All six connector marks are visibly present in both the 390 px and 320 px
captures. Labels and handwritten copy remain readable, and the desktop
portrait retains contact with the hero divider. Other sections remain outside
the scope of this follow-up. This is screenshot-based visual acceptance;
browser regression results are reported separately by the implementing agent.

## User-directed follow-up — longer connectors and cloud-label spacing

Evidence: `.cache/reference-connectors2/viewport-1440.png`,
`viewport-1280.png`, `viewport-900.png`, `viewport-768.png`,
`viewport-390.png` and `viewport-320.png`.

Final 768 px recheck also inspected `home-768.png`: the lower connectors reach
the narrower neck/shoulder silhouette after extending their hidden ends to the
stage centre. The image continues to mask the excess, with no face overlay.

**Accepted for this scoped refinement.** The six connector lines now extend
toward the portrait silhouette at every reviewed width, including both phone
sizes. The portrait masks excess line length, so no line crosses the face.
The cloud's URBAN LIFE label has a visually consistent gap compared with the
other climate labels. Portrait centring, callout alignment, caption readability
and the existing layout remain intact. This acceptance records visual review
only; no application code or remote state was changed by the reviewer.
