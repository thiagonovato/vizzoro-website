"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Dictionary } from "@/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact({ dict }: { dict: Dictionary }) {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [answer, setAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    setA(Math.floor(Math.random() * 8) + 1);
    setB(Math.floor(Math.random() * 8) + 1);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Number(answer) !== a + b) {
      setCaptchaError(true);
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message, website, captchaA: a, captchaB: b, captchaAnswer: answer }) });
      if (!response.ok) throw new Error("send failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="overflow-hidden bg-ink py-24 text-bone md:py-36">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
        <div><p className="eyebrow eyebrow-light">{dict.contact.eyebrow}</p><h2 className="section-title mt-5 max-w-lg">{dict.contact.title}</h2><p className="mt-6 max-w-md text-sm leading-7 text-bone/58">{dict.contact.subtitle}</p><div className="mt-10 space-y-2 text-sm text-bone/70"><p>{dict.contact.emailLabel} <a href={`mailto:${dict.contact.email}`} className="text-bone underline decoration-lime underline-offset-4">{dict.contact.email}</a></p><p>{dict.contact.phoneLabel} <a href={`tel:${dict.contact.phoneHref}`} className="text-bone underline decoration-lime underline-offset-4">{dict.contact.phone}</a></p></div></div>
        <div>
          {status === "success" ? <div className="rounded-[28px] border border-lime/30 bg-lime/10 p-10 text-lg text-bone">{dict.contact.form.success}</div> : (
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
              <label className="form-label"><span>{dict.contact.form.name}</span><input required value={name} onChange={(event) => setName(event.target.value)} /></label>
              <label className="form-label"><span>{dict.contact.form.email}</span><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
              <label className="form-label sm:col-span-2"><span>{dict.contact.form.message}</span><textarea required rows={5} value={message} onChange={(event) => setMessage(event.target.value)} /></label>
              <label className="form-label max-w-[180px]"><span>{dict.contact.form.captchaLabel}: {a} + {b}</span><input required inputMode="numeric" value={answer} onChange={(event) => { setAnswer(event.target.value); setCaptchaError(false); }} placeholder={dict.contact.form.captchaPlaceholder} /></label>
              <div className="flex items-end sm:justify-end"><button type="submit" disabled={status === "sending"} className="button-primary w-full justify-center sm:w-auto">{status === "sending" ? dict.contact.form.sending : dict.contact.form.submit}<span aria-hidden="true">↗</span></button></div>
              {captchaError ? <p className="text-sm text-lime sm:col-span-2">{dict.contact.form.captchaError}</p> : null}
              {status === "error" ? <p className="text-sm text-lime sm:col-span-2">{dict.contact.form.error}</p> : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
