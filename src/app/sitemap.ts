import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/commerce";
import { siteUrl } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    ...[
      "",
      "/shop",
      "/about",
      "/ingredients",
      "/faqs",
      "/journal",
      "/journal/your-fifteen-minute-mask-ritual",
      "/journal/reading-your-mask-pack",
    ].map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...products.map((p) => ({
      url: `${siteUrl}/products/${p.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
