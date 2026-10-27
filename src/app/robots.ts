import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexingEnabled
      ? { userAgent: "*", allow: "/", disallow: ["/api/", "/shop?"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
