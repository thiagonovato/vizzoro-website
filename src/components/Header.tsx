"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/dictionaries";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const nav = [[dict.header.nav.product, "#experience"], [dict.header.nav.materials, "#materials"], [dict.header.nav.how, "#how-it-works"], [dict.header.nav.pricing, "#pricing"]];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className={`mx-auto max-w-[1400px] rounded-[22px] border transition-all duration-500 ${scrolled || open ? "border-ink/10 bg-bone/92 shadow-[0_18px_60px_rgba(26,40,32,.08)] backdrop-blur-xl" : "border-ink/8 bg-bone/72 backdrop-blur-md"}`}>
        <div className="flex h-[68px] items-center justify-between gap-5 px-5 md:px-7">
          <a href={`/${lang}`} className="shrink-0" aria-label="Vizzoro home"><Image src="/vizzoro-logo-v2.png" width={164} height={48} alt="Vizzoro" className="h-9 w-auto" priority /></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label={dict.header.mainLabel}>{nav.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}</nav>
          <div className="hidden items-center gap-3 lg:flex"><LocaleSwitcher dict={dict} lang={lang} /><a href="https://app.vizzoro.com" className="button-small button-app">{dict.header.appCta}</a><a href="#contact" className="button-small">{dict.header.cta}</a></div>
          <button type="button" className="menu-button lg:hidden" aria-label={open ? dict.header.closeMenu : dict.header.openMenu} aria-expanded={open} onClick={() => setOpen(!open)}><span className={open ? "translate-y-[5px] rotate-45" : ""} /><span className={open ? "opacity-0" : ""} /><span className={open ? "-translate-y-[5px] -rotate-45" : ""} /></button>
        </div>
        <div className={`overflow-hidden transition-all duration-300 lg:hidden ${open ? "max-h-[440px] border-t border-ink/10 opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="flex flex-col p-4" aria-label={dict.header.mobileLabel}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-white/70">{label}</a>)}</nav>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 p-4"><LocaleSwitcher dict={dict} lang={lang} /><div className="flex gap-2"><a href="https://app.vizzoro.com" className="button-small button-app">{dict.header.appCta}</a><a href="#contact" onClick={() => setOpen(false)} className="button-small">{dict.header.cta}</a></div></div>
        </div>
      </div>
    </header>
  );
}
