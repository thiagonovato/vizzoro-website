import Image from "next/image";
import type { Dictionary } from "@/dictionaries";

export default function Portfolio({ dict }: { dict: Dictionary }) {
  return (
    <section id="portfolio" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-body">
            {dict.portfolio.eyebrow}
          </p>
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-sub text-ink md:text-3xl">
            {dict.portfolio.title}
          </h2>
          <p className="mt-4 text-body">{dict.portfolio.subtitle}</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dict.portfolio.items.map((item) => (
            <a
              key={item.slug}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[8/5] overflow-hidden rounded-xl bg-surface">
                <Image
                  src={`/portfolio/${item.slug}.jpg`}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-base font-bold uppercase tracking-sub text-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-eyebrow text-ink/40">
                {item.category}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition group-hover:text-[#d97f40]">
                {dict.portfolio.visitLabel}
                <span aria-hidden="true">&#8599;</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
