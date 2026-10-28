import type { Product } from "@/lib/commerce/types";

/** Stock footage for demonstrating the layout, separate from customer reviews. */
export interface DemoSkincareVideo {
  id: string;
  src: string;
  poster: string;
  title: string;
  caption?: string;
  transcript?: string;
  credit?: { label: string; url: string };
}

export const demoSkincareVideos: readonly DemoSkincareVideo[] = [
  {
    id: "demo-sheet-mask",
    src: "/videos/demo/sheet-mask.mp4",
    poster: "/images/videos/demo/sheet-mask.webp",
    title: "The sheet-mask moment",
    caption: "A little time for a face-mask routine.",
    transcript:
      "Silent stock footage: a woman smooths a sheet mask over her cheeks. This is a layout preview, not a SKINKARI customer testimonial.",
    credit: {
      label: "Stock footage: Sora Shimazaki / Pexels",
      url: "https://www.pexels.com/video/young-woman-applying-beauty-sheet-mask-5937382/",
    },
  },
  {
    id: "demo-skincare-ritual",
    src: "/videos/demo/skincare-ritual.mp4",
    poster: "/images/videos/demo/skincare-ritual.webp",
    title: "A moment of skincare",
    caption: "A closer look at an everyday skincare ritual.",
    transcript:
      "Silent stock footage: a woman wipes her cheek with a cotton pad. This is a layout preview, not a SKINKARI customer testimonial.",
    credit: {
      label: "Stock footage: Mikhail Nilov / Pexels",
      url: "https://www.pexels.com/video/a-woman-cleaning-her-face-with-a-face-towel-6706913/",
    },
  },
  {
    id: "demo-serum-application",
    src: "/videos/demo/serum-application.mp4",
    poster: "/images/videos/demo/serum-application.webp",
    title: "The finishing touch",
    caption: "Simple moments from a skincare routine.",
    transcript:
      "Silent stock footage: a close-up of a woman applying serum to her cheek with a dropper. This is a layout preview, not a SKINKARI customer testimonial.",
    credit: {
      label: "Stock footage: Ron Lach / Pexels",
      url: "https://www.pexels.com/video/close-up-video-of-woman-applying-serum-on-her-face-8131891/",
    },
  },
];

/** Demo clips are never a fallback for a connected Shopify storefront. */
export function getDemoSkincareVideos(source: Product["source"]) {
  return source === "demo" ? demoSkincareVideos : [];
}
