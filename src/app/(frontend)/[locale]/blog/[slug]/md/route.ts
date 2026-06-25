import { getBlogPostBySlug, contentPostToMarkdown } from '@/lib/blog'

// Blog content is runtime-only (Payload DB) → render on demand.
export const dynamic = 'force-dynamic'

/**
 * Clean Markdown twin of a blog post, served at `/blog/<slug>/md` (and exposed
 * as `/blog/<slug>.md` via the rewrite in src/proxy.ts) for LLM crawlers.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; locale: string }> },
) {
  const { slug, locale } = await params
  const post = await getBlogPostBySlug(slug, locale)
  if (!post) {
    return new Response('Not found', { status: 404 })
  }
  return new Response(contentPostToMarkdown(post), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
