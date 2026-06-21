"use client";

import { useStatusBanner } from "./StatusBannerProvider";

/**
 * The header is absolutely positioned and overlays the page; when the status
 * bar is visible it grows the header, so we push content down by the bar's
 * height. Animates its height in lockstep with the bar (same context, same
 * duration) so content slides down smoothly instead of jumping.
 */
export default function StatusBannerSpacer() {
  const { mounted, shown, contentHeight } = useStatusBanner();
  if (!mounted) {
    return null;
  }
  return (
    <div
      aria-hidden
      className="transition-[height] duration-300 ease-out"
      style={{ height: shown ? contentHeight : 0 }}
    />
  );
}
