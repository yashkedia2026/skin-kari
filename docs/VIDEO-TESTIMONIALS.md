# Product video testimonials

The public product pages render `VideoTestimonials` with entries from
`src/data/video-testimonials.ts`. The registry is intentionally empty: no customer
videos, names, quotes, ratings or sample testimonials ship with the site. An empty
or entirely unapproved list renders no section or placeholder.

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

The component accepts `videos` and an optional `tone` (`green`, `orange`, `blue`,
or `pink`). Its CSS module leaves the homepage and other product styles unchanged.
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
fixtures inside the test browser only. They are not public routes or catalogue
data. It verifies the empty state, source loading, native controls, caption track
configuration, play/pause coordination, scrolling, reduced motion and errors.
Media API stubs exercise component state; browser decoding of client videos can
only be checked after genuine assets arrive.
