"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

/**
 * Keeps old homepage deep links working: when `/#<slug>` names a question that
 * is no longer shown on the homepage, send the visitor to `/faq#<slug>`.
 */
export default function FaqHashRedirect({ slugs }: { slugs: string[] }) {
  const locale = useLocale();

  useEffect(() => {
    const redirectIfMoved = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash || !slugs.includes(hash)) return;
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      window.location.replace(`${prefix}/faq#${hash}`);
    };
    redirectIfMoved();
    window.addEventListener("hashchange", redirectIfMoved);
    return () => window.removeEventListener("hashchange", redirectIfMoved);
  }, [slugs, locale]);

  return null;
}
