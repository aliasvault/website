// Server-side integration with the status site's public banner API.
//
// IMPORTANT: this is only ever called server-side (from the /api/status-banner
// route handler). The visitor's browser polls that internal route, never the
// status API directly; we fetch it on the server and cache the response for up
// to STATUS_BANNER_REVALIDATE_SECONDS.

export type StatusBannerResponse =
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
    };

// The active variant, which is what callers actually render.
export type StatusBanner = Extract<StatusBannerResponse, { active: true }>;

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

/**
 * Fetch the current status banner, server-side and cached.
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
    return data.active ? data : null;
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
