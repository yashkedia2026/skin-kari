import type { Metadata } from "next";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000"
).replace(/\/$/, "");
export const indexingEnabled =
  process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true" &&
  process.env.STOREFRONT_MODE === "live";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | SKINKARI`,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
      siteName: "SKINKARI",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "SKINKARI — Same skin. Brighter days.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
