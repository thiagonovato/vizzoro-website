import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/dictionaries";
import { getServiceContent, isServiceSlug, SERVICE_SLUGS } from "@/lib/services";
import { BASE_URL } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    SERVICE_SLUGS.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) return {};
  const service = getServiceContent(lang, slug);
  const url = `${BASE_URL}/${lang}/services/${slug}`;
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Vizzoro",
      title: service.title,
      description: service.summary,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isServiceSlug(slug)) notFound();

  const dict = getDictionary(lang);
  const service = getServiceContent(lang, slug);

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main className="pb-24 pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href={`/${lang}#services`}
            className="text-sm font-semibold uppercase tracking-sub text-accent transition hover:text-[#d97f40]"
          >
            {dict.header.nav.services}
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold uppercase tracking-heading text-ink md:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 text-lg text-body">{service.summary}</p>
          <div
            className="service-content mt-10"
            dangerouslySetInnerHTML={{ __html: service.html }}
          />
          <div className="mt-14">
            <a
              href={`/${lang}#contact`}
              className="rounded-full bg-accent px-9 py-4 text-[15px] font-semibold uppercase tracking-heading text-white transition hover:bg-[#d97f40]"
            >
              {dict.header.cta}
            </a>
          </div>
        </div>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
