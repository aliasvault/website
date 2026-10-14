// Server-side integration with the status site's public banner API.
//
// IMPORTANT: this is only ever called server-side (from the /api/status-banner
// route handler). The visitor's browser polls that internal route, never the
// status API directly; we fetch it on the server and cache the response for up
// to STATUS_BANNER_REVALIDATE_SECONDS.
type BulletinResponse = {
  id: number;
  title: string;
  summary: string;
  details: string | null;
  updatedAt: number;
};

export type StatusBannerResponse = { bulletin?: BulletinResponse | null } & (
  | { active: false }
  | {
      active: true;
      resolved: boolean;
      type: "incident" | "maintenance";
      title: string;
      description: string | null;
      status: string;
      updatedAt: number;
      url: string;
    }
);

// An incident/maintenance notice, linking to the status page for details.
export type StatusNotice = Omit<
  Extract<StatusBannerResponse, { active: true }>,
  "bulletin"
>;

// A bulletin, normalized to the banner shape. Its details open in a modal on
// the website itself instead of linking to the status page.
export type StatusBulletin = {
  type: "notice";
  resolved: false;
  title: string;
  description: string;
  details: string | null;
  updatedAt: number;
};

// What callers actually render: one banner at a time.
export type StatusBanner = StatusNotice | StatusBulletin;

// How long a single fetched response is reused across requests.
const STATUS_BANNER_REVALIDATE_SECONDS = 10;

// Hard ceiling on a single upstream request. Without this, a status API that
// accepts the connection but never responds would hang the server-side fetch
// (and any render awaiting it) indefinitely. On timeout the request aborts and
// we fail closed, exactly like an outright outage.
const STATUS_BANNER_TIMEOUT_MS = 2000;

function normalizeBaseUrl(raw: string): string {
  return raw.replace(/\/+$/, "");
}

// The canonical public status page, used when no NEXT_PUBLIC_STATUS_URL override
// is configured. Static links (footer, contact page, FAQ) should always resolve
// to a real page, so they fall back to this rather than disappearing.
export const DEFAULT_STATUS_PAGE_URL = "https://status.aliasvault.com";

/**
 * The visitor-facing status page URL for static links. Prefers the configured
 * NEXT_PUBLIC_STATUS_URL (so local/staging can point elsewhere) and otherwise
 * falls back to the production status site. Safe to call from client components
 * (NEXT_PUBLIC_* is inlined at build time).
 */
export function getStatusPageUrl(): string {
  const configured = process.env.NEXT_PUBLIC_STATUS_URL;
  return configured ? normalizeBaseUrl(configured) : DEFAULT_STATUS_PAGE_URL;
}

/**
 * Fetch the current status banner, server-side and cached. An active incident
 * or maintenance notice always wins; otherwise the bulletin (if any) is shown.
 */
export async function getStatusBanner(): Promise<StatusBanner | null> {
  const baseUrl = process.env.STATUS_API_URL;
  if (!baseUrl) {
    // Integration not configured — feature is simply off.
    return null;
  }

  try {
    const res = await fetch(`${normalizeBaseUrl(baseUrl)}/api/banner`, {
      // Next.js caches this response and revalidates at most once per window,
      // so concurrent visitors share a single upstream request.
      next: { revalidate: STATUS_BANNER_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
      // Bound a slow/hung upstream so it can never stall the caller.
      signal: AbortSignal.timeout(STATUS_BANNER_TIMEOUT_MS),
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as StatusBannerResponse;
    if (data.active) {
      return data;
    }
    if (data.bulletin) {
      return {
        type: "notice",
        resolved: false,
        title: data.bulletin.title,
        description: data.bulletin.summary,
        details: data.bulletin.details,
        updatedAt: data.bulletin.updatedAt,
      };
    }
    return null;
  } catch {
    // Network error, timeout, bad JSON — fail closed (no banner).
    return null;
  }
}

/**
 * Build the absolute URL a banner should link to. The API returns a path
 * relative to the status site; we resolve it against NEXT_PUBLIC_STATUS_URL
 * (the visitor-facing status page). Returns `null` when no public URL is
 * configured so the banner can render without a link.
 */
export function resolveStatusUrl(path: string): string | null {
  const publicStatusUrl = process.env.NEXT_PUBLIC_STATUS_URL;
  if (!publicStatusUrl) {
    return null;
  }
  try {
    return new URL(path, normalizeBaseUrl(publicStatusUrl) + "/").toString();
  } catch {
    return null;
  }
}
