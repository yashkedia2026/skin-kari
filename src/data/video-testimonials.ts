export interface VideoTestimonial {
  id: string;
  /** Publish only authentic client-supplied footage approved for this product. */
  approved: boolean;
  src: string;
  poster: string;
  /** A short, accessible description of the supplied video. */
  title: string;
  customerName?: string;
  caption?: string;
  captions?: {
    src: string;
    srcLang: string;
    label: string;
    default?: boolean;
  }[];
  transcript?: string;
}

/** Intentionally empty until authentic, approved customer videos are supplied. */
export const productTestimonials: Readonly<
  Record<string, readonly VideoTestimonial[]>
> = {};

export function getProductTestimonials(handle: string): VideoTestimonial[] {
  return (productTestimonials[handle] || []).filter((video) => video.approved);
}
