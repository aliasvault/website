import { getStatusPageUrl } from "@/lib/status-banner";

/**
 * Legal documents (terms, privacy policy, …) are kept as Markdown so the page and its `.md` URL version share one
 * source. The `.md` version is fetched cross-origin by the AliasVault apps (e.g. to show the terms during registration).
 */
export type LegalDocument = {
  /** Site path without leading slash, e.g. `privacy-policy`. */
  slug: string;
  title: string;
  /** Date of the current revision, e.g. "October 2, 2026". */
  lastUpdated: string;
  /** Markdown body starting at `##` level. Root-relative links (`/contact`) and `{{statusUrl}}` are resolved on output. */
  body: string;
};

/**
 * The document body as Markdown. With a base URL, root-relative links are made absolute (for use outside the site).
 */
export function getLegalMarkdown(doc: LegalDocument, baseUrl?: string): string {
  const body = doc.body.split("{{statusUrl}}").join(getStatusPageUrl());
  return baseUrl ? body.replace(/\]\(\//g, `](${baseUrl.replace(/\/$/, "")}/`) : body;
}

/**
 * Response for a document's `.md` URL: full Markdown with title and revision date, absolute links and open CORS.
 */
export function legalMarkdownResponse(doc: LegalDocument): Response {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.aliasvault.com";
  const markdown = [`# ${doc.title}`, "", `*Last updated: ${doc.lastUpdated}*`, "", getLegalMarkdown(doc, baseUrl)].join("\n");

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
