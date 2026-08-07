import type { Dictionary } from "@/dictionaries";

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-eyebrow text-body">
          {dict.about.eyebrow}
        </p>
        <h2 className="mt-4 text-2xl font-bold uppercase tracking-sub text-ink md:text-3xl">
          {dict.about.title}
        </h2>
        <div className="mx-auto mt-6 h-0.5 w-16 bg-accent" aria-hidden="true" />
        {dict.about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mt-8 text-body">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
