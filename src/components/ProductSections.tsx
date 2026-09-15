import { getMarketPricing } from "@/config/pricing";
import type { Dictionary, Locale } from "@/dictionaries";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ProductSections({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const marketPricing = getMarketPricing(lang);

  return (
    <>
      <section id="experience" className="overflow-hidden bg-ink py-24 text-bone md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow eyebrow-light">{dict.experience.eyebrow}</p>
              <h2 className="section-title mt-5 max-w-xl">{dict.experience.title}</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-bone/65 lg:justify-self-end lg:text-lg">{dict.experience.subtitle}</p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[30px] bg-bone/15 md:grid-cols-3">
            {dict.experience.steps.map((step, index) => (
              <article key={step.title} className="group relative min-h-[330px] bg-ink p-7 transition-colors duration-500 hover:bg-[#243a2e] md:p-9">
                <span className="font-serif text-6xl text-lime/70">0{index + 1}</span>
                <div className="mt-24">
                  <h3 className="text-xl font-medium text-bone">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-bone/58">{step.description}</p>
                </div>
                <div className="absolute right-7 top-7 h-14 w-14 rounded-full border border-bone/15 transition-transform duration-500 group-hover:rotate-45 group-hover:border-lime" aria-hidden="true"><span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-lime" /><span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-lime" /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="materials" className="bg-bone py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="eyebrow">{dict.materials.eyebrow}</p><h2 className="section-title mt-5 max-w-3xl text-ink">{dict.materials.title}</h2></div>
            <p className="max-w-md text-sm leading-7 text-ink/60">{dict.materials.subtitle}</p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.materials.items.map((item, index) => (
              <article key={item.title} className="material-card">
                <div className={`material-texture texture-${index + 1}`} aria-hidden="true" />
                <div className="relative z-10 flex h-full flex-col justify-between p-7">
                  <div className="flex justify-between"><span className="text-[11px] font-semibold uppercase tracking-[.18em] text-ink/50">0{index + 1}</span><span className={`availability ${item.available ? "availability-live" : ""}`}>{item.status}</span></div>
                  <div><h3 className="font-serif text-[clamp(2rem,2.7vw,2.5rem)] leading-none text-ink">{item.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-ink/60">{item.description}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="overflow-hidden bg-white py-24 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-10">
          <div className="dashboard-scene" aria-label={dict.platform.previewAlt}>
            <div className="dashboard-nav"><span className="h-3 w-3 rounded-full bg-lime" /><span className="h-2 w-24 rounded-full bg-ink/15" /></div>
            <div className="grid min-w-0 grid-cols-[88px_minmax(0,1fr)] gap-5 p-5 md:grid-cols-[130px_minmax(0,1fr)] md:p-7">
              <div className="space-y-3"><span className="block h-8 rounded-lg bg-ink" /><span className="block h-8 rounded-lg bg-ink/7" /><span className="block h-8 rounded-lg bg-ink/7" /><span className="block h-8 rounded-lg bg-ink/7" /></div>
              <div className="min-w-0"><div className="flex items-end justify-between gap-2"><div className="min-w-0"><span className="block h-2 w-16 rounded-full bg-ink/15 md:w-20" /><span className="mt-3 block h-5 w-24 rounded-full bg-ink/80 md:w-36" /></div><span className="h-9 w-16 shrink-0 rounded-full bg-lime md:w-24" /></div><div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3"><div className="catalog-tile tile-oak" /><div className="catalog-tile tile-stone" /><div className="catalog-tile tile-green" /></div><div className="mt-5 h-24 rounded-xl bg-ink/5 p-4"><span className="block h-2 w-3/4 rounded-full bg-ink/15" /><span className="mt-4 block h-8 w-full rounded bg-white" /></div></div>
            </div>
            <div className="absolute -bottom-7 -right-3 rounded-2xl bg-ink px-5 py-4 text-bone shadow-2xl md:right-7"><span className="block text-[10px] uppercase tracking-[.16em] text-bone/55">{dict.platform.activity}</span><strong className="mt-1 block text-2xl font-medium">+28%</strong></div>
          </div>
          <div className="lg:pl-12">
            <p className="eyebrow">{dict.platform.eyebrow}</p><h2 className="section-title mt-5 text-ink">{dict.platform.title}</h2><p className="mt-6 text-base leading-8 text-ink/62">{dict.platform.subtitle}</p>
            <div className="mt-9 space-y-6">{dict.platform.items.map((item) => <div key={item.title} className="border-t border-ink/12 pt-5"><h3 className="font-medium text-ink">{item.title}</h3><p className="mt-2 text-sm leading-6 text-ink/55">{item.description}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sage py-24 md:py-36">
        <div className="integration-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1100px] px-5 text-center">
          <p className="eyebrow">{dict.integration.eyebrow}</p><h2 className="section-title mx-auto mt-5 max-w-4xl text-ink">{dict.integration.title}</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink/60">{dict.integration.subtitle}</p>
          <div className="code-line mx-auto mt-10"><span>&lt;script</span> src=&quot;https://vizzoro-app.web.app/sdk.js&quot; <span>data-key</span>=&quot;vz_pk_••••••&quot;&gt;&lt;/script&gt;<span className="code-chip">{dict.integration.copy}</span></div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">{dict.integration.features.map((feature) => <span key={feature} className="feature-pill">✓ {feature}</span>)}</div>
        </div>
      </section>

      <section id="pricing" className="bg-bone py-24 md:py-36">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <div className="text-center"><p className="eyebrow">{dict.pricing.eyebrow}</p><h2 className="section-title mx-auto mt-5 max-w-3xl text-ink">{dict.pricing.title}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink/58">{dict.pricing.subtitle}</p></div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-3">
            {dict.pricing.plans.map((plan, index) => <article key={plan.name} className={`price-card ${index === 1 ? "price-card-featured" : ""}`}><div><div className="flex items-center justify-between"><span className="text-sm font-semibold uppercase tracking-[.16em]">{plan.name}</span>{plan.badge ? <span className="availability availability-live">{plan.badge}</span> : null}</div><p className="mt-8"><strong className="font-serif text-5xl font-normal">{marketPricing[index].value}</strong><span className="text-sm opacity-60">{plan.period}</span></p><p className="mt-4 min-h-14 text-sm leading-6 opacity-60">{plan.description}</p><ul className="mt-8 space-y-3 text-sm">{plan.features.map((feature) => <li key={feature} className="flex gap-3"><span className="text-moss">✓</span>{feature}</li>)}</ul></div><a href="#contact" className={index === 1 ? "button-primary mt-10 justify-center" : "button-secondary mt-10 justify-center"}>{plan.cta}<Arrow /></a></article>)}
          </div>
          <p className="mt-7 text-center text-xs text-ink/45">{dict.pricing.note}</p>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-5 lg:grid-cols-[.65fr_1.35fr] lg:px-10"><div><p className="eyebrow">{dict.faq.eyebrow}</p><h2 className="section-title mt-5 text-ink">{dict.faq.title}</h2></div><div className="divide-y divide-ink/12 border-y border-ink/12">{dict.faq.items.map((item) => <details key={item.question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium text-ink"><span>{item.question}</span><span className="text-2xl font-light text-moss transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-4 text-sm leading-7 text-ink/58">{item.answer}</p></details>)}</div></div>
      </section>
    </>
  );
}
