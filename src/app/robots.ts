import type { MetadataRoute } from "next";
import { urlSite } from "@/secoes/util";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/teaser-aprovacao/"] },
    sitemap: `${urlSite}/sitemap.xml`,
  };
}
