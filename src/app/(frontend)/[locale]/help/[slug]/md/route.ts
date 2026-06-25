import { getHelpArticleBySlug } from '@/lib/help'
import { getHelpSection } from '@/lib/help-sections'
import { lexicalToMarkdown } from '@/lib/lexical'
import en from '@/messages/en.json'
import nl from '@/messages/nl.json'

// Help content is runtime-only (Payload DB) → render on demand.
export const dynamic = 'force-dynamic'

/**
 * Clean Markdown twin of an article, served at `/help/<slug>/md` (and exposed
 * as `/help/<slug>.md` via the rewrite in src/proxy.ts). This gives LLM
 * crawlers the full prose without site layout.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; locale: string }> },
) {
  const { slug, locale } = await params
  const article = await getHelpArticleBySlug(slug, locale)
  if (!article) {
    return new Response('Not found', { status: 404 })
  }

  const messages = locale === 'nl' ? nl : en
  const sectionTitle =
    (messages.help.sections as Record<string, { title: string }>)[article.section]?.title ??
    getHelpSection(article.section)?.key ??
    article.section

  const parts: string[] = [`# ${article.title}`, '']
  if (article.summary || article.description) parts.push(`> ${article.summary || article.description}`, '')
  parts.push(`*Section: ${sectionTitle}*`)
  if (article.group) parts.push(`*Topic: ${article.group}*`)
  if (article.updated) parts.push(`*Last updated: ${article.updated}*`)
  parts.push('', '---', '', lexicalToMarkdown(article.content))

  if (article.faq.length) {
    parts.push('', '## Frequently asked questions', '')
    for (const f of article.faq) parts.push(`### ${f.question}`, '', f.answer, '')
  }

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
