"use client";

import { useTranslations } from "next-intl";
import { FaCheckCircle, FaExclamationTriangle, FaTools } from "react-icons/fa";
import type { StatusBanner } from "@/lib/status-banner";

// "bar"    → full-width solid strip, used at the top of the site header.
// "inline" → rounded card that flows inside page content (e.g. /contact).
export type StatusBannerVariant = "bar" | "inline";

type Props = {
  banner: StatusBanner;
  href: string | null;
  variant?: StatusBannerVariant;
};

/**
 * Presentational status notice. Persistent / non-closable by design.
 */
const StatusBannerClient = ({ banner, href, variant = "bar" }: Props) => {
  const t = useTranslations();

  const resolved = banner.resolved;
  const Icon = resolved
    ? FaCheckCircle
    : banner.type === "maintenance"
      ? FaTools
      : FaExclamationTriangle;
  const label =
    banner.type === "maintenance"
      ? t("statusBanner.maintenance")
      : t("statusBanner.incident");

  const tone =
    variant === "inline"
      ? resolved
        ? "border-2 border-green-400 bg-green-50 text-green-900 dark:border-green-600 dark:bg-green-900/20 dark:text-green-200"
        : "border-2 border-primary/40 bg-primary/10 text-dark dark:text-white"
      : resolved
        ? "bg-green-500 text-white"
        : "bg-primary text-black";

  const container =
    variant === "inline"
      ? `rounded-lg px-6 py-4 shadow-md ${tone}`
      : `w-full shadow-md ${tone}`;

  const isInline = variant === "inline";
  const inner = isInline
    ? "flex flex-wrap items-start gap-x-3 gap-y-1 text-sm"
    : "container flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-sm sm:flex-nowrap";

  return (
    <div role="status" className={container}>
      <div className={inner}>
        <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="flex-shrink-0 rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide dark:bg-white/15">
          {label}
        </span>
        <span className="min-w-0 flex-1">
          <span className={isInline ? "block font-bold" : "font-bold"}>
            {banner.title}
          </span>
          {banner.description &&
            (isInline ? (
              <span className="mt-0.5 block opacity-90">
                {banner.description}
              </span>
            ) : (
              // Hidden on mobile in the header bar where space is tight.
              <span className="hidden opacity-90 sm:inline">
                : {banner.description}
              </span>
            ))}
        </span>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 whitespace-nowrap font-semibold underline hover:no-underline"
          >
            {t("statusBanner.viewDetails")}
          </a>
        )}
      </div>
    </div>
  );
};

export default StatusBannerClient;
