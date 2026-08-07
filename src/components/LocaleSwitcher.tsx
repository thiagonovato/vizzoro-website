import type { Dictionary, Locale } from "@/dictionaries";
import { locales } from "@/dictionaries";

export default function LocaleSwitcher({
  dict,
  lang,
  dark = false,
}: {
  dict: Dictionary;
  lang: Locale;
  dark?: boolean;
}) {
  return (
    <nav
      aria-label={dict.localeSwitcher.label}
      className={`flex items-center gap-1 rounded-full border px-1 py-1 text-[11px] font-semibold uppercase tracking-sub transition-colors duration-500 ${
        dark ? "border-white/40" : "border-charcoal/10"
      }`}
    >
      {locales.map((locale) => (
        <a
          key={locale}
          href={`/${locale}`}
          aria-current={locale === lang ? "true" : undefined}
          className={
            locale === lang
              ? "rounded-full bg-accent px-2.5 py-1 text-white"
              : `rounded-full px-2.5 py-1 transition hover:text-accent ${
                  dark ? "text-white/70" : "text-body"
                }`
          }
        >
          {dict.localeSwitcher[locale]}
        </a>
      ))}
    </nav>
  );
}
