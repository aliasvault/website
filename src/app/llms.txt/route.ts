import { getAllHelpArticles } from '@/lib/help'
import { getAllBlogAndNewsPosts } from '@/lib/blog'
import { helpSectionsSorted } from '@/lib/help-sections'
import en from '@/messages/en.json'

// Built per request — Help/blog/news content lives in the Payload DB (runtime-only).
export const dynamic = 'force-dynamic'

interface FeatureCategory {
  title: string
  description: string
  features?: Record<string, { name: string; description: string }>
}

const clean = (s: string) => s.replace(/\s+/g, ' ').trim()

// Strip the FAQ answer link placeholders (e.g. `[docsLink]text[/docsLink]`),
// keeping the link text. Preserves paragraph breaks.
const stripLinks = (s: string) => s.replace(/\[\/?[a-zA-Z]+Link\]/g, '').trim()

// FAQ entries that are relevant to the site overview.
const TRUST_FAQ_KEYS = ['security', 'whatIsAliasVault', 'selfHosting']

/**
 * /llms.txt — a Markdown index of the site for LLMs (llmstxt.org). H1 + summary
 * blockquote, then H2 sections: a Features overview, the Help sections with their
 * articles, and the Blog/News archives — each entry as `[title](url): note`.
 * English (default-locale) content; every Help article also has a clean Markdown
 * twin at its URL with a `.md` suffix.
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com'
  const sections = en.help.sections as Record<string, { title: string; description: string }>
  const featuresData = en.featuresData as unknown as Record<string, FeatureCategory>

  const lines: string[] = [
    '# AliasVault',
    '',
    '> AliasVault is an open-source, end-to-end encrypted password and email alias manager. ' +
      'It lets you generate unique identities, passwords and email aliases for every website, ' +
      'protecting your privacy and reducing spam and data-breach exposure.',
    '',
    "This file indexes AliasVault's features, Help articles, blog posts and news for language " +
      'models. Every Help article, blog post and news item also has a clean Markdown version at ' +
      'its URL with a `.md` suffix.',
    '',
  ]

  // Features overview — from the data that drives the /features page.
  lines.push('## Features', '', `Full overview: [Features](${baseUrl}/features).`, '')
  for (const category of Object.values(featuresData)) {
    lines.push(`### ${category.title}`, '', clean(category.description), '')
    for (const sub of Object.values(category.features ?? {})) {
      lines.push(`- **${sub.name}**: ${clean(sub.description)}`)
    }
    lines.push('')
  }

  // Trust & Security — a common "is it safe/trusted/secure?" question, answered
  // from a lead summary plus the relevant FAQ entries.
  const faqItems = en.faq.items as Record<string, { question: string; answer: string }>
  lines.push(
    '## Trust & Security',
    '',
    'AliasVault is fully open-source and ' +
      'transparent, with end-to-end encryption (AES-256-GCM): everything — usernames, passwords ' +
      'and even email contents — is encrypted and can only be accessed with your master password. Its ' +
      'zero-knowledge architecture means your master password never leaves your device, so no one ' +
      '(not even AliasVault) can read your vault. There are no third-party dependencies, and you ' +
      'can self-host the entire stack on your own infrastructure for full control.',
    '',
  )
  for (const key of TRUST_FAQ_KEYS) {
    const item = faqItems[key]
    if (!item) continue
    lines.push(`**${item.question}**`, '', stripLinks(item.answer), '')
  }

  // Help sections + their articles.
  const articles = await getAllHelpArticles()
  const bySection = new Map<string, typeof articles>()
  for (const a of articles) {
    if (!bySection.has(a.section)) bySection.set(a.section, [])
    bySection.get(a.section)!.push(a)
  }
  for (const section of helpSectionsSorted()) {
    const list = bySection.get(section.key)
    if (!list?.length) continue
    lines.push(`## Help: ${sections[section.key]?.title ?? section.key}`, '')
    for (const a of list) {
      lines.push(`- [${a.title}](${baseUrl}/help/${a.slug}): ${clean(a.summary || a.description || '')}`)
    }
    lines.push('')
  }

  // Blog & News archives.
  const posts = await getAllBlogAndNewsPosts()
  const blog = posts.filter((p) => p.type === 'blog')
  const news = posts.filter((p) => p.type === 'news')
  if (blog.length) {
    lines.push('## Blog', '')
    for (const p of blog) {
      lines.push(`- [${p.title}](${baseUrl}/blog/${p.slug}): ${clean(p.description || '')}`)
    }
    lines.push('')
  }
  if (news.length) {
    lines.push('## News', '')
    for (const p of news) {
      lines.push(`- [${p.title}](${baseUrl}/news/${p.slug}): ${clean(p.description || '')}`)
    }
    lines.push('')
  }

  lines.push(
    '## Optional',
    '',
    `- [Help home](${baseUrl}/help): Browse all help sections.`,
    `- [Pricing](${baseUrl}/pricing): Plans and pricing.`,
    `- [AliasVault website](${baseUrl}): Product overview.`,
    '',
  )

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
