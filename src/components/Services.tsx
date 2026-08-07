import Link from "next/link";
import type { Dictionary, Locale } from "@/dictionaries";

export default function Services({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <section
      id="services"
      className="relative bg-[url('/hero-target-poster.jpg')] bg-cover bg-center bg-fixed py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-charcoal/75" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-white/70">
            {dict.services.eyebrow}
          </p>
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-sub text-white md:text-3xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 text-white/80">{dict.services.subtitle}</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {dict.services.items.map((item) => (
            <article
              key={item.slug}
              className="flex flex-col rounded-xl bg-white p-10 text-center shadow-[0_2px_24px_rgba(48,49,51,0.05)]"
            >
              <div
                className="mx-auto h-2 w-10 rounded-full bg-accent"
                aria-hidden="true"
              />
              <h3 className="mt-6 text-base font-bold uppercase tracking-sub text-ink">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 text-base text-body">
                {item.description}
              </p>
              <Link
                href={`/${lang}/services/${item.slug}`}
                className="mt-6 text-[13px] font-semibold uppercase tracking-sub text-accent transition hover:text-[#d97f40]"
              >
                {dict.services.learnMore}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
