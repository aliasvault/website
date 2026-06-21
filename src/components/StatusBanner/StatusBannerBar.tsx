"use client";

import StatusBannerClient from "./StatusBannerClient";
import { useStatusBanner } from "./StatusBannerProvider";

/**
 * Header slot: renders the full-width status strip once the async fetch in
 * StatusBannerProvider resolves, sliding it in from the top. Renders nothing
 * while there's no active banner, so it never blocks the initial paint.
 */
export default function StatusBannerBar() {
  const { banner, href, mounted, shown } = useStatusBanner();
  if (!mounted || !banner) {
    return null;
  }
  return (
    <div
      className={`overflow-hidden transition-[height] duration-300 ease-out ${
        shown ? "h-11" : "h-0"
      }`}
    >
      <div
        className={`transition-all duration-300 ease-out ${
          shown ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
        }`}
      >
        <StatusBannerClient banner={banner} href={href} variant="bar" />
      </div>
    </div>
  );
}
