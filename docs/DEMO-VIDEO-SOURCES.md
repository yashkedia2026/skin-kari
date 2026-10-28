# Skincare demo video sources

These clips are licensed stock footage for the client presentation, added on 28 October 2026. They are not SKINKARI customers, product demonstrations, reviews or endorsements. Keep the visible demo labels until genuine client videos replace them. No names, testimonial quotes or ratings were created.

All three source pages identify their footage as free under the [Pexels License](https://www.pexels.com/license/). The license permits free website use and modification without mandatory attribution, while prohibiting implied endorsement by depicted people or brands. Creator credits and source links are retained below for traceability.

| Local file                                 | Observed content                                          | Creator and source                                                                                                                                       | Source ID |
| ------------------------------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `public/videos/demo/sheet-mask.mp4`        | A woman smooths a sheet mask against her cheeks.          | Sora Shimazaki, [Young Woman Applying Beauty Sheet Mask](https://www.pexels.com/video/young-woman-applying-beauty-sheet-mask-5937382/)                   | 5937382   |
| `public/videos/demo/skincare-ritual.mp4`   | A woman wipes her cheek with a cotton pad.                | Mikhail Nilov, [A Woman Cleaning Her Face With A Face Towel](https://www.pexels.com/video/a-woman-cleaning-her-face-with-a-face-towel-6706913/)          | 6706913   |
| `public/videos/demo/serum-application.mp4` | A close-up shows serum applied to a cheek with a dropper. | Ron Lach, [Close-Up Video of Woman Applying Serum on her Face](https://www.pexels.com/video/close-up-video-of-woman-applying-serum-on-her-face-8131891/) | 8131891   |

The page title for clip 6706913 mentions a face towel; inspection of the downloaded footage confirms that the visible item is a round cotton pad. Descriptions in the website should follow the observed content. Do not copy stock-page benefit claims into SKINKARI product copy.

## Prepared assets

Every clip is a silent 9-second, 540×720 (3:4) H.264 MP4 at 24 fps, `yuv420p`, with fast-start metadata. The source portrait footage was centre cropped for the existing cards. Clips contain no audio stream, so there is no speech to caption. Matching WebP thumbnails are actual frames extracted from each prepared clip.

| Basename            | Clip bytes | Poster bytes | Excerpt from original |
| ------------------- | ---------: | -----------: | --------------------- |
| `sheet-mask`        |    578,538 |       20,470 | 0–9 seconds           |
| `skincare-ritual`   |    368,055 |       14,954 | 2–11 seconds          |
| `serum-application` |    270,575 |       18,536 | 2–11 seconds          |

Videos live under `public/videos/demo/`; matching thumbnails live under `public/images/videos/demo/` with the same basename and a `.webp` extension. Total video payload is approximately 1.22 MB, fetched only after a visitor requests playback. The original downloads remain temporary working files, outside the repository.

The exact download targets were resolved through the source pages' download links:

- `https://videos.pexels.com/video-files/5937382/5937382-uhd_2160_3840_24fps.mp4`
- `https://videos.pexels.com/video-files/6706913/6706913-hd_1080_1920_25fps.mp4`
- `https://videos.pexels.com/video-files/8131891/8131891-uhd_2160_4096_25fps.mp4`

Assets were inspected visually and checked with `ffprobe` for duration, dimensions, codec and absence of audio. This verifies the supplied demo files; genuine replacement footage needs its own playback, caption and content approval checks.
