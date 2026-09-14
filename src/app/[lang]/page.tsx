import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/dictionaries";
import { organizationJsonLd } from "@/lib/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Header dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <ProductSections dict={dict} lang={lang} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
