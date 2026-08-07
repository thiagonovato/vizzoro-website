import type { MetadataRoute } from "next";
import { locales } from "@/dictionaries";
import { BASE_URL } from "@/lib/seo";
import { SERVICE_SLUGS } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = locales.flatMap((lang) =>
    SERVICE_SLUGS.map((slug) => ({
      url: `${BASE_URL}/${lang}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: lang === "en" ? 0.8 : 0.7,
    }))
  );

  return [...homePages, ...servicePages];
}
