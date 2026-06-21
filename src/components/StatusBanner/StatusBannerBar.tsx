"use client";

import { useLayoutEffect, useRef } from "react";
import StatusBannerClient from "./StatusBannerClient";
import { useStatusBanner } from "./StatusBannerProvider";

/**
 * Renders the full-width status strip once the async fetch in StatusBannerProvider resolves.
 */
export default function StatusBannerBar() {
  const { banner, href, mounted, shown, setContentHeight } = useStatusBanner();
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) {
      return;
    }
    const update = () =>
      setContentHeight(Math.ceil(el.getBoundingClientRect().height));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [banner, shown, setContentHeight]);

  if (!mounted || !banner) {
    return null;
  }
  return (
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-out"
      style={{ gridTemplateRows: shown ? "1fr" : "0fr" }}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          ref={contentRef}
          className={`transition-opacity duration-300 ease-out ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        >
          <StatusBannerClient banner={banner} href={href} variant="bar" />
        </div>
      </div>
    </div>
  );
}
