import { getNewsBySlug, contentPostToMarkdown } from '@/lib/blog'

// News content is runtime-only (Payload DB) → render on demand.
export const dynamic = 'force-dynamic'

/**
 * Clean Markdown twin of a news item, served at `/news/<slug>/md` (and exposed
 * as `/news/<slug>.md` via the rewrite in src/proxy.ts) for LLM crawlers.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; locale: string }> },
) {
  const { slug, locale } = await params
  const post = await getNewsBySlug(slug, locale)
  if (!post) {
    return new Response('Not found', { status: 404 })
  }
  return new Response(contentPostToMarkdown(post), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
