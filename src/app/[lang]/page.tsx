import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/dictionaries";
import { organizationJsonLd } from "@/lib/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealFooter from "@/components/RevealFooter";

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
      <RevealFooter footer={<Footer dict={dict} lang={lang} />}>
        <Hero dict={dict} />
        <About dict={dict} />
        <Services dict={dict} lang={lang} />
        <Portfolio dict={dict} />
        <Contact dict={dict} />
      </RevealFooter>
    </>
  );
}
