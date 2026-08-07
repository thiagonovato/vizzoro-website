"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/dictionaries";

type VariantKey = "target" | "network";

const VARIANTS: Record<VariantKey, { src: string; poster: string }> = {
  target: { src: "/hero-target.mp4", poster: "/hero-target-poster.jpg" },
  network: { src: "/hero-network.mp4", poster: "/hero-network-poster.jpg" },
};

export default function Hero({ dict }: { dict: Dictionary }) {
  // Server and first client render always agree on "target", so there is
  // no hydration mismatch. The variant is rolled once per page load, after
  // mount, so every visit can land on a different clip.
  const [variant, setVariant] = useState<VariantKey>("target");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const pool: VariantKey[] = ["target", "network"];
    setVariant(pool[Math.floor(Math.random() * pool.length)]);
  }, []);

  const media = VARIANTS[variant];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface"
    >
      {reduceMotion ? (
        // Static poster only, no autoplaying motion for users who asked
        // for reduced motion.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <video
          key={media.src}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={media.poster}
          aria-hidden="true"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      )}

      {/* Deliberately dark Hero: the video stays the focal point instead
          of being washed out. A soft charcoal tint (not white) unifies
          contrast and gives white text something to sit on. Rest of the
          site stays light, this section is a contained exception, see
          specs/design.md. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/45 to-charcoal/70"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-eyebrow text-white/70">
          {dict.hero.eyebrow}
        </p>
        <h1 className="mt-6 text-5xl font-extrabold uppercase tracking-heading text-white md:text-7xl">
          {dict.hero.title}
        </h1>
        <div className="relative mx-auto mt-8 h-px w-40" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-white/80">
          {dict.hero.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-accent px-9 py-4 text-[15px] font-semibold uppercase tracking-heading text-white transition hover:bg-[#d97f40]"
          >
            {dict.hero.primaryCta}
          </a>
          <a
            href="#portfolio"
            className="rounded-full border border-white/50 bg-white/10 px-9 py-4 text-[15px] font-semibold uppercase tracking-heading text-white backdrop-blur transition hover:border-white hover:bg-white/20"
          >
            {dict.hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
