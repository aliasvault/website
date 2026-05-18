"use client";

import { useEffect } from "react";

export default function ScrollUp() {
  useEffect(() => {
    // Preserve fragment deeplinks (e.g. FAQ #slug) — ScrollHandler / FAQAccordion scroll instead.
    if (window.location.hash) return;
    window.document.scrollingElement?.scrollTo(0, 0);
  }, []);

  return null;
}
