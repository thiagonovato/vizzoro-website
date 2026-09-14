import type { Metadata } from "next";
import type { Dictionary, Locale } from "@/dictionaries";

/**
 * Canonical production URL. Placeholder, update when the real domain is live.
 * Used by metadata alternates, OpenGraph, sitemap, robots and JSON-LD.
 */
export const BASE_URL = "https://vizzoro.com";

export function buildMetadata(lang: Locale, dict: Dictionary): Metadata {
  const url = `${BASE_URL}/${lang}`;
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: dict.metadata.title,
      template: "%s | Vizzoro",
    },
    description: dict.metadata.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en`,
        "pt-BR": `${BASE_URL}/pt-BR`,
        es: `${BASE_URL}/es`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Vizzoro",
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: lang === "pt-BR" ? "pt_BR" : lang === "es" ? "es_ES" : "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Vizzoro material visualization platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ["/og-image.png"],
    },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vizzoro",
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.png`,
    foundingDate: "2000",
    description: "Material visualization platform for retailers and manufacturers.",
    email: "info@vizzoro.com",
  };
}
