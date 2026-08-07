"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * "Curtain" footer reveal: the footer sits fixed at the bottom of the
 * viewport the whole time. The main content column reserves empty scroll
 * space equal to the footer's height and stays opaque on top of it, so
 * the footer only becomes visible once the page has been scrolled all the
 * way down, peeling away like a page lifting off the one underneath.
 */
export default function RevealFooter({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const update = () => setFooterHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <main
        className="relative z-10 bg-surface"
        style={{ marginBottom: footerHeight }}
      >
        {children}
      </main>
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        {footer}
      </div>
    </>
  );
}
