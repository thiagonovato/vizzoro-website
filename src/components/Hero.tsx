"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries";

export default function Hero({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState(58);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-[145vh] bg-bone">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden pt-24">
        <div className="hero-orbit hero-orbit-one" style={{ transform: `translate3d(0, ${progress * -80}px, 0) rotate(${progress * 18}deg)` }} aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" style={{ transform: `translate3d(0, ${progress * 110}px, 0) rotate(${progress * -12}deg)` }} aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 pb-12 pt-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div className="relative z-10 lg:pb-16">
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="display-title mt-5 max-w-[760px] text-ink">{dict.hero.title}</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-ink/68 md:text-lg">{dict.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#experience" className="button-primary">{dict.hero.primaryCta}<span aria-hidden="true">↗</span></a>
              <a href="#how-it-works" className="button-secondary">{dict.hero.secondaryCta}</a>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">{dict.hero.note}</p>
          </div>
          <div className="relative" style={{ transform: `translate3d(0, ${22 - progress * 38}px, 0) scale(${0.96 + progress * 0.04})` }}>
            <div className="room-stage">
              <Image src="/product/room-oak.webp" alt={dict.hero.beforeAlt} fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}>
                <Image src="/product/room-stone.webp" alt={dict.hero.afterAlt} fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
              </div>
              <div className="compare-line" style={{ left: `${reveal}%` }} aria-hidden="true"><span>‹ ›</span></div>
              <span className="room-tag room-tag-left">{dict.hero.stone}</span>
              <span className="room-tag room-tag-right">{dict.hero.oak}</span>
              <div className="surface-marker marker-floor"><span /> {dict.hero.detectedFloor}</div>
              <input aria-label={dict.hero.compareLabel} className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0" type="range" min="0" max="100" value={reveal} onChange={(event) => setReveal(Number(event.target.value))} />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/48"><span>{dict.hero.drag}</span><span>{dict.hero.powered}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
