"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Dictionary } from "@/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact({ dict }: { dict: Dictionary }) {
  // Fixed on the server/first render to avoid a hydration mismatch, then
  // rolled to a real random pair on mount.
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [answer, setAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    setA(Math.floor(Math.random() * 8) + 1);
    setB(Math.floor(Math.random() * 8) + 1);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Number(answer) !== a + b) {
      setCaptchaError(true);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
          captchaA: a,
          captchaB: b,
          captchaAnswer: answer,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setAnswer("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[url('/hero-network-poster.jpg')] bg-cover bg-center bg-fixed py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-charcoal/80" aria-hidden="true" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-eyebrow text-white/70">
          {dict.contact.eyebrow}
        </p>
        <h2 className="mt-4 text-2xl font-bold uppercase tracking-sub text-white md:text-3xl">
          {dict.contact.title}
        </h2>
        <p className="mt-4 text-white/80">{dict.contact.subtitle}</p>

        {status === "success" ? (
          <p className="mt-12 rounded-lg border border-white/20 bg-white/10 px-6 py-8 text-white">
            {dict.contact.form.success}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-5 text-left"
            noValidate
          >
            {/* Honeypot: hidden from real visitors, bots that auto-fill
                every field tend to fill this in. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="name" className="sr-only">
                {dict.contact.form.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={dict.contact.form.name}
                className="w-full rounded-lg border border-charcoal/15 bg-surface px-5 py-4 text-body outline-none transition focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {dict.contact.form.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={dict.contact.form.email}
                className="w-full rounded-lg border border-charcoal/15 bg-surface px-5 py-4 text-body outline-none transition focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                {dict.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={dict.contact.form.message}
                className="w-full rounded-lg border border-charcoal/15 bg-surface px-5 py-4 text-body outline-none transition focus:border-accent"
              />
            </div>
            <div>
              <label
                htmlFor="captcha"
                className="mb-2 block text-sm font-semibold text-white"
              >
                {dict.contact.form.captchaLabel}: {a} + {b} =
              </label>
              <input
                id="captcha"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                required
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setCaptchaError(false);
                }}
                placeholder={dict.contact.form.captchaPlaceholder}
                className="w-32 rounded-lg border border-charcoal/15 bg-surface px-5 py-4 text-body outline-none transition focus:border-accent"
              />
              {captchaError ? (
                <p className="mt-2 text-sm text-accent">
                  {dict.contact.form.captchaError}
                </p>
              ) : null}
            </div>
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-accent px-9 py-4 text-[15px] font-semibold uppercase tracking-heading text-white transition hover:bg-[#d97f40] disabled:opacity-60"
              >
                {status === "sending"
                  ? dict.contact.form.sending
                  : dict.contact.form.submit}
              </button>
              {status === "error" ? (
                <p className="mt-4 text-sm text-accent">
                  {dict.contact.form.error}
                </p>
              ) : null}
            </div>
          </form>
        )}

        <p className="mt-10 text-sm text-white/80">
          {dict.contact.emailLabel}{" "}
          <a
            href={`mailto:${dict.contact.email}`}
            className="font-semibold text-white underline underline-offset-4 transition hover:text-accent"
          >
            {dict.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
