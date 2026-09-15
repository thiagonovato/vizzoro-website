import { notFound } from "next/navigation";
import { docs } from "@/content/docs";
import { getDictionary, isLocale, locales } from "@/dictionaries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function DocsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = docs[lang];
  const dict = getDictionary(lang);
  const sectionIds = ["start", "install", "sdk", "security", "api", "troubleshooting"];

  return <main className="docs-shell">
    <header className="docs-header">
      <a className="docs-brand" href={`/${lang}`}>VIZZORO</a>
      <nav className="docs-locale" aria-label={dict.localeSwitcher.label}>
        {locales.map((locale) => <a key={locale} href={`/${locale}/docs`} className={locale === lang ? "docs-locale-active" : ""}>{dict.localeSwitcher[locale]}</a>)}
      </nav>
    </header>
    <section className="docs-hero"><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.subtitle}</p></section>
    <div className="docs-layout">
      <aside className="docs-aside"><p>Vizzoro SDK</p>{content.nav.map((label, index) => <a key={label} href={`#${sectionIds[index]}`}>{label}</a>)}</aside>
      <div className="docs-content">
        <section id="start"><h2>{content.start.title}</h2><p>{content.start.body}</p><div className="docs-steps">{content.start.steps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>
        <section id="install"><h2>{content.install.title}</h2><p>{content.install.body}</p><pre><code>{content.install.code}</code></pre><p className="docs-note">{content.install.note}</p></section>
        <section id="sdk"><h2>{content.options.title}</h2><p>{content.options.body}</p><pre><code>{content.options.code}</code></pre><div className="docs-table">{content.options.rows.map((row) => <div key={row.name}><code>{row.name}</code><span>{row.type}</span><p>{row.description}</p></div>)}</div></section>
        <section id="security"><h2>{content.security.title}</h2><p>{content.security.body}</p><ul>{content.security.items.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section id="api"><h2>{content.api.title}</h2><p>{content.api.body}</p>{content.api.items.map((item) => <article className="docs-api" key={item.path}><span>{item.method}</span><code>{item.path}</code><p>{item.body}</p></article>)}</section>
        <section id="troubleshooting"><h2>{content.troubleshoot.title}</h2>{content.troubleshoot.items.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
        <section className="docs-support"><h2>{content.support.title}</h2><p>{content.support.body}</p><a className="button-primary" href={`mailto:${dict.contact.email}`}>{content.support.link}</a></section>
      </div>
    </div>
  </main>;
}
