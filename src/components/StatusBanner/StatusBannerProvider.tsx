"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { StatusBanner } from "@/lib/status-banner";

// Shared state for the bar and the layout spacer.
// - `banner`/`href`: the resolved banner (null when there's nothing to show).
// - `mounted`: keep the DOM present through the slide-out, not just while active.
// - `shown`: the transition target — false = collapsed (height 0), true = open.
// - `contentHeight`/`setContentHeight`: (estimated) height of the banner content.
export type StatusBannerContextValue = {
  banner: StatusBanner | null;
  href: string | null;
  mounted: boolean;
  shown: boolean;
  contentHeight: number;
  setContentHeight: (height: number) => void;
};

const DEFAULT_CONTENT_HEIGHT = 44;

const StatusBannerContext = createContext<StatusBannerContextValue>({
  banner: null,
  href: null,
  mounted: false,
  shown: false,
  contentHeight: DEFAULT_CONTENT_HEIGHT,
  setContentHeight: () => {},
});

export function useStatusBanner(): StatusBannerContextValue {
  return useContext(StatusBannerContext);
}

// How often a long-lived tab re-checks for new incidents. The internal route is
// itself cached (~10s), so polling faster than that just hits our own server;
// 60s keeps idle tabs reasonably current at negligible cost.
const POLL_INTERVAL_MS = 60_000;

// Keep in sync with the `duration-300` transitions on the bar and spacer.
const TRANSITION_MS = 300;

/**
 * Fetches the status banner from the internal /api/status-banner route on mount
 * (and on a slow poll), keeping it entirely off the server render path so a
 * slow/unreachable status API can never delay the page. Drives an enter/exit
 * slide animation and shares the result with the bar and spacer via context so
 * they animate in lockstep.
 */
export default function StatusBannerProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Resolved banner from the server — the source of truth.
  const [data, setData] = useState<{
    banner: StatusBanner;
    href: string | null;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [contentHeight, setContentHeight] = useState(DEFAULT_CONTENT_HEIGHT);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/status-banner", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) return;
        const body = (await res.json()) as {
          banner: StatusBanner | null;
          href: string | null;
        };
        if (!cancelled) {
          setData(body.banner ? { banner: body.banner, href: body.href } : null);
        }
      } catch {
        // Non-critical: keep whatever we last showed rather than flapping.
      }
    };

    load();
    const id = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Mount when a banner arrives; on its way out, slide closed first, then unmount
  // once the transition has finished. Re-running on `data` change also cancels a
  // pending unmount if the banner reappears mid slide-out.
  useEffect(() => {
    if (data) {
      setMounted(true);
      return;
    }
    setShown(false);
    const timer = setTimeout(() => setMounted(false), TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [data]);

  // Once mounted in the collapsed state, flip to open on the next frame so the
  // browser has a closed frame to transition from (otherwise it just appears).
  useEffect(() => {
    if (!mounted || !data) return;
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, [mounted, data]);

  const value: StatusBannerContextValue = {
    banner: data?.banner ?? null,
    href: data?.href ?? null,
    mounted,
    shown,
    contentHeight,
    setContentHeight,
  };

  return (
    <StatusBannerContext.Provider value={value}>
      {children}
    </StatusBannerContext.Provider>
  );
}
