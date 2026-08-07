import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  // Honeypot: hidden from real visitors via CSS, bots that auto-fill every
  // input tend to fill it in. Any non-empty value here is a silent reject.
  website?: string;
  // Client-side math captcha, re-checked here so disabling JS doesn't
  // bypass it.
  captchaA?: number;
  captchaB?: number;
  captchaAnswer?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { website, captchaA, captchaB, captchaAnswer } = body;
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  // Honeypot tripped: pretend success so the bot moves on.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "One or more fields exceed the maximum length." }, { status: 400 });
  }
  if (
    typeof captchaA !== "number" ||
    typeof captchaB !== "number" ||
    Number(captchaAnswer) !== captchaA + captchaB
  ) {
    return NextResponse.json({ error: "Captcha check failed." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured yet. Please email info@vizzoro.com directly." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    // Shared Resend sender until vizzoro.com is verified as a sending
    // domain. Swap to something like "Vizzoro <notifications@vizzoro.com>"
    // once that's done.
    const { error } = await resend.emails.send({
      from: "Vizzoro <onboarding@resend.dev>",
      to: "info@vizzoro.com",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message. Please try again or email us directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again or email us directly." }, { status: 500 });
  }
}
