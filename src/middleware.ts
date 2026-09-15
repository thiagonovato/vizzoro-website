import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/dictionaries";

function negotiateLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of preferred) {
    if (tag.startsWith("pt")) return "pt-BR";
    if (tag.startsWith("es")) return "es";
    if (tag.startsWith("en")) return defaultLocale;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "").split(",")[0].split(":")[0].toLowerCase();
  const isHelpDomain = host === "help.vizzoro.com";

  const hasLocale = pathname.split("/")[1] && isLocale(pathname.split("/")[1]);
  if (hasLocale) return NextResponse.next();

  const locale = negotiateLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${isHelpDomain && pathname === "/" ? "/docs" : pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Skip internals, metadata routes and any path that looks like a file
     * (favicon.ico, hero.mp4, og-image.png, ...).
     */
    "/((?!_next|api|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
