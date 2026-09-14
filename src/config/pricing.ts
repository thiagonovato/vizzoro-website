import type { Locale } from "@/dictionaries";

type MarketPrice = {
  currency: "USD" | "BRL";
  value: string;
};

const pricingByLocale: Record<Locale, readonly MarketPrice[]> = {
  en: [
    { currency: "USD", value: "$99" },
    { currency: "USD", value: "$199" },
    { currency: "USD", value: "$399" },
  ],
  "pt-BR": [
    { currency: "BRL", value: "R$ 497" },
    { currency: "BRL", value: "R$ 997" },
    { currency: "BRL", value: "R$ 1.997" },
  ],
  es: [
    { currency: "USD", value: "US$ 99" },
    { currency: "USD", value: "US$ 199" },
    { currency: "USD", value: "US$ 399" },
  ],
};

export function getMarketPricing(locale: Locale) {
  return pricingByLocale[locale];
}
