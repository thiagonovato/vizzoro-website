import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/dictionaries";

export const SERVICE_SLUGS = [
  "custom-software",
  "websites",
  "ongoing-care",
  "seo-local-visibility",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function getServiceContent(lang: Locale, slug: ServiceSlug) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "services",
    lang,
    `${slug}.md`
  );
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    title: data.title as string,
    summary: data.summary as string,
    html: marked.parse(content, { async: false }) as string,
  };
}
