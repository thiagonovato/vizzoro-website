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

  const docsPages: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${BASE_URL}/${lang}/docs`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: lang === "en" ? 0.8 : 0.7,
  }));

  return [...homePages, ...docsPages];
}
