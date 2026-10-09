import type { MetadataRoute } from "next";
import { urlSite } from "@/secoes/util";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${urlSite}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
