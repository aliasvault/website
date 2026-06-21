import { NextResponse } from "next/server";
import { getStatusBanner, resolveStatusUrl } from "@/lib/status-banner";

// Internal endpoint the browser polls so the status banner is fetched OFF the
// page-render critical path. The heavy lifting — the cached upstream fetch, the
// timeout, and failing closed — lives in getStatusBanner(); here we just expose
// the result and resolve the public link the banner should point at.
//
// Because getStatusBanner() reads through Next.js's shared Data Cache, 100
// concurrent visitors hitting this route still trigger at most one upstream
// status-API call per revalidate window — the load stays on our own server, not
// on the status site.
export async function GET() {
  const banner = await getStatusBanner();
  const href = banner ? resolveStatusUrl(banner.url) : null;

  return NextResponse.json(
    { banner, href },
    {
      headers: {
        // Allow a CDN/browser to reuse the response briefly. Kept short so an
        // incident banner still appears/clears promptly.
        "Cache-Control":
          "public, max-age=5, s-maxage=10, stale-while-revalidate=30",
      },
    },
  );
}
