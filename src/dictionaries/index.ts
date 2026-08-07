import en from "./en.json";
import ptBR from "./pt-BR.json";

export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "pt-BR": ptBR,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
