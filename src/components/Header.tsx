"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Dictionary, Locale } from "@/dictionaries";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = [
    { label: dict.header.nav.about, href: "#about" },
    { label: dict.header.nav.services, href: "#services" },
    { label: dict.header.nav.portfolio, href: "#portfolio" },
    { label: dict.header.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const getThreshold = () => {
      const hero = document.getElementById("hero");
      return hero ? hero.offsetHeight - 96 : window.innerHeight * 0.8;
    };
    const onScroll = () => setScrolled(window.scrollY > getThreshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "border border-charcoal/10 bg-white/95 shadow-[0_8px_30px_rgba(48,49,51,0.08)] backdrop-blur"
            : "border border-white/15 bg-charcoal/35 shadow-none backdrop-blur-md"
        }`}
      >
        <a href={`/${lang}`} className="shrink-0">
          <Image
            src={scrolled ? "/logo-black.png" : "/logo-white.png"}
            alt="Vizzoro"
            width={135}
            height={44}
            priority
            className="h-11 w-auto"
          />
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] font-semibold uppercase tracking-sub transition-colors duration-500 ${
                scrolled
                  ? "text-body hover:text-accent"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher dict={dict} lang={lang} dark={!scrolled} />
          <a
            href="#contact"
            className={`rounded-full border px-6 py-2.5 text-[13px] font-semibold uppercase tracking-heading transition-colors duration-500 ${
              scrolled
                ? "border-charcoal/30 text-charcoal hover:border-accent hover:text-accent"
                : "border-white/50 text-white hover:border-white hover:text-white/80"
            }`}
          >
            {dict.header.cta}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
              scrolled ? "bg-ink" : "bg-white"
            } ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
              scrolled ? "bg-ink" : "bg-white"
            } ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
              scrolled ? "bg-ink" : "bg-white"
            } ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-charcoal/10 bg-white/95 shadow-[0_8px_30px_rgba(48,49,51,0.08)] backdrop-blur transition-all duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav
          className="flex flex-col gap-1 p-4"
          aria-label="Mobile"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[13px] font-semibold uppercase tracking-sub text-body transition hover:bg-surface hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-between gap-4 border-t border-charcoal/10 p-4">
          <LocaleSwitcher dict={dict} lang={lang} />
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-full border border-charcoal/30 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-heading text-charcoal transition hover:border-accent hover:text-accent"
          >
            {dict.header.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
