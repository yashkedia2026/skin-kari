# Product video testimonials

The public product pages render `VideoTestimonials` with entries from
`src/data/video-testimonials.ts`. The authentic customer registry remains empty:
no customer names, quotes or ratings have been invented.

For the client presentation, demo-mode product pages now pass a separate
`demoVideos` list from `src/data/demo-videos.ts`. Three locally hosted skincare
stock clips demonstrate the carousel under “A little care, on film.” The section
says “Demo video preview”, every card is labelled “Demo footage”, and the copy
explains that client videos will replace these clips. These are visual samples,
not customer testimonials or product endorsements. See [asset provenance](DEMO-VIDEO-SOURCES.md).

The preview clips are supplied only for demo products. A connected Shopify
storefront receives no demo fallback. Approved authentic videos take precedence
over demo clips when supplied for a product. An empty or entirely unapproved
authentic list without demo clips still renders no section.

To replace the preview, add genuine entries to `productTestimonials` as described
below. The product automatically displays the approved videos and testimonial
heading. To remove preview footage everywhere before genuine videos arrive,
empty the `demoSkincareVideos` array. No changes to playback or carousel code are
needed. The source MP4 and poster paths are centralized in that data file.

When the client supplies authentic footage, add entries under the matching
product handle in `productTestimonials`. Each entry needs a stable `id`, `src`
(HTML5-compatible video URL), `poster` (thumbnail URL), an accessible descriptive
`title`, and `approved`. Set `approved: true` only after the client approves the
actual footage and its use on that product. Use `customerName` and `caption` only
when supplied and approved; both may be omitted. Never substitute invented names
or testimonial copy.

Supply accurate WebVTT caption files in `captions` for videos containing speech.
Each track uses `src`, `srcLang`, `label`, and an optional `default: true`. Supply a
`transcript` when available, including meaningful visual information needed to
understand the video. The transcript is displayed in an expandable text section.
Use local paths under `public/` or HTTPS asset URLs; cross-origin video hosts must
serve videos and caption tracks with appropriate anonymous CORS headers. Keep media files compressed
and avoid embedding third-party video players. Check the actual formats in
Safari and Chrome before publishing the supplied footage.

The component accepts `videos`, optional `demoVideos`, and an optional `tone`
(`green`, `orange`, `blue`, or `pink`). Its CSS module leaves the homepage and other product styles unchanged.
Cards use the storefront's warm cream surface, Oswald titles, product-colour
video frames and badges, and solid black playback/carousel controls. The green
badge uses white text; orange, blue and pink use black text for contrast.
It uses native horizontal scrolling with snap points for mobile swiping, keyboard
scrolling and previous/next buttons. Reduced-motion settings disable smooth
scrolling and decorative transitions.

Thumbnails use native lazy loading. No video URL or caption track is attached
until a visitor presses play; `preload="none"` is retained and autoplay is never
enabled. Native HTML5 controls provide seeking, volume and caption selection
alongside the visible play/pause button. Starting a video pauses others in the
section; leaving the viewport or hiding the browser tab pauses playback. Playback
errors show a retry control and a polite status message.

`tests/video-testimonials.spec.ts` mounts synthetic, explicitly labelled media
fixtures inside the test browser only. These synthetic fixtures are not public routes or catalogue
data. It verifies the empty state, demo disclosure and authentic-video precedence, source loading, native controls, caption track
configuration, play/pause coordination, scrolling, reduced motion and errors.
Media API stubs exercise component state. `tests/demo-videos.spec.ts` exercises
actual local stock-video decoding, time advancement and pause in the browser,
and saves desktop/mobile previews. The demo footage is silent; supplied video
descriptions explain the visual content. Decoding, caption timing and audio of
the final client videos must still be checked when those assets arrive.
