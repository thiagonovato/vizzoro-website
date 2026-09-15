import Image from "next/image";
import type { Dictionary, Locale } from "@/dictionaries";

export default function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const links = [[dict.header.nav.product, "#experience"], [dict.header.nav.materials, "#materials"], [dict.header.nav.how, "#how-it-works"], [dict.header.nav.pricing, "#pricing"]];
  return (
    <footer className="border-t border-bone/12 bg-ink text-bone">
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 px-5 py-14 md:flex-row lg:px-10">
        <div><a href={`/${lang}`}><Image src="/vizzoro-logo-v2.png" width={180} height={53} alt="Vizzoro" className="h-12 w-auto brightness-0 invert" /></a><p className="mt-4 max-w-xs text-sm text-bone/50">{dict.footer.tagline}</p></div>
        <div className="flex gap-16"><div><p className="footer-label">{dict.footer.navTitle}</p><nav className="mt-4 flex flex-col gap-2">{links.map(([label, href]) => <a key={href} href={href} className="text-sm text-bone/65 hover:text-lime">{label}</a>)}<a href="https://help.vizzoro.com" target="_blank" rel="noreferrer" className="text-sm text-bone/65 hover:text-lime">{dict.footer.help}</a></nav></div><div><p className="footer-label">{dict.footer.contactTitle}</p><a href={`mailto:${dict.contact.email}`} className="mt-4 block text-sm text-bone/65 hover:text-lime">{dict.contact.email}</a><a href={`tel:${dict.contact.phoneHref}`} className="mt-2 block text-sm text-bone/65 hover:text-lime">{dict.contact.phone}</a></div></div>
      </div>
      <div className="border-t border-bone/10 px-5 py-5 text-center text-xs text-bone/35">{dict.footer.copyright.replace("{year}", String(new Date().getFullYear()))}</div>
    </footer>
  );
}
