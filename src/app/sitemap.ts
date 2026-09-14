import type { MetadataRoute } from "next";
import { locales } from "@/dictionaries";
import { BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
  }));

  return homePages;
}
