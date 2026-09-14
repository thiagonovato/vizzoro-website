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
      className={`flex items-center gap-1 rounded-full border p-1 text-[11px] font-semibold uppercase tracking-[.08em] transition-colors duration-500 ${
        dark ? "border-white/35" : "border-ink/20"
      }`}
    >
      {locales.map((locale) => (
        <a
          key={locale}
          href={`/${locale}`}
          aria-current={locale === lang ? "true" : undefined}
          className={
            locale === lang
              ? dark
                ? "rounded-full bg-bone px-2.5 py-1 text-ink shadow-sm"
                : "rounded-full bg-ink px-2.5 py-1 text-bone shadow-sm"
              : `rounded-full px-2.5 py-1 transition hover:bg-lime hover:text-ink ${
                  dark ? "text-white/70" : "text-ink/55"
                }`
          }
        >
          {dict.localeSwitcher[locale]}
        </a>
      ))}
    </nav>
  );
}
