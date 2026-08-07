import type { Dictionary, Locale } from "@/dictionaries";

export default function Footer({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const nav = [
    { label: dict.header.nav.about, href: "#about" },
    { label: dict.header.nav.services, href: "#services" },
    { label: dict.header.nav.portfolio, href: "#portfolio" },
    { label: dict.header.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <a
            href={`/${lang}`}
            className="text-lg font-extrabold uppercase tracking-heading text-white"
          >
            Vizzoro
          </a>
          <p className="mt-4 text-sm">{dict.footer.tagline}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-white/50">
            {dict.footer.navTitle}
          </p>
          <nav className="mt-4 flex flex-col gap-2" aria-label="Footer">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm transition hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-white/50">
            {dict.footer.contactTitle}
          </p>
          <a
            href={`mailto:${dict.contact.email}`}
            className="mt-4 block text-sm transition hover:text-accent"
          >
            {dict.contact.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        {dict.footer.copyright.replace(
          "{year}",
          String(new Date().getFullYear())
        )}
      </div>
    </footer>
  );
}
