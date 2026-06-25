import { getPayloadClient } from '@/payload/client'
import type { User } from '@/payload-types'
import { routing } from '@/i18n/routing'
import { HELP_DEFAULT_SECTION, getHelpSection } from '@/lib/help-sections'

export type HelpStatus = 'draft' | 'published'

export interface HelpFaqItem {
  question: string
  answer: string
}

/** Lightweight reference to another article (for related lists). */
export interface HelpArticleRef {
  slug: string
  title: string
  description: string
  section: string
  group?: string
}

export interface HelpArticle extends HelpArticleRef {
  summary?: string
  seoTitle?: string
  tags: string[]
  faq: HelpFaqItem[]
  related: HelpArticleRef[]
  author?: string
  order: number
  featured: boolean
  updated?: string
  status: HelpStatus
  snippetId?: string
  content: unknown
}

type Locale = 'en' | 'nl'

const asLocale = (locale: string): Locale => (locale === 'nl' ? 'nl' : 'en')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRef(doc: any): HelpArticleRef {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? '',
    section: getHelpSection(doc.section) ? doc.section : HELP_DEFAULT_SECTION,
    group: doc.group || undefined,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(doc: any): HelpArticle {
  return {
    ...mapRef(doc),
    summary: doc.summary || undefined,
    seoTitle: doc.seoTitle || undefined,
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    faq: Array.isArray(doc.faq)
      ? doc.faq
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((f: any) => f?.question && f?.answer)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((f: any) => ({ question: f.question, answer: f.answer }))
      : [],
    related: Array.isArray(doc.related)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        doc.related.filter((r: any) => r && typeof r === 'object' && r.slug).map(mapRef)
      : [],
    author: doc.author || undefined,
    order: typeof doc.order === 'number' ? doc.order : 0,
    featured: Boolean(doc.featured),
    updated: doc.updated ? String(doc.updated).slice(0, 10) : undefined,
    status: doc._status === 'published' ? 'published' : 'draft',
    snippetId: doc.snippetId ?? undefined,
    content: doc.content,
  }
}

export async function getHelpArticleBySlug(
  slug: string,
  locale: string = routing.defaultLocale,
  { draft = false, user = null }: { draft?: boolean; user?: User | null } = {},
): Promise<HelpArticle | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'help-articles',
    locale: asLocale(locale),
    draft,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1, // populate `related` one level so we get slug/title/etc.
    overrideAccess: false,
    user,
  })
  return res.docs[0] ? mapArticle(res.docs[0]) : null
}

export async function getAllHelpArticles(locale: string = routing.defaultLocale): Promise<HelpArticle[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'help-articles',
    locale: asLocale(locale),
    where: { _status: { equals: 'published' } },
    limit: 1000,
    depth: 1,
    // Backstop: access control forces published-only for anonymous requests.
    overrideAccess: false,
  })
  return res.docs.map(mapArticle).sort(byOrderThenTitle)
}

function byOrderThenTitle(a: HelpArticle, b: HelpArticle): number {
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  if (a.order !== b.order) return a.order - b.order
  return a.title.localeCompare(b.title)
}

export async function getAllHelpSlugs(): Promise<string[]> {
  const articles = await getAllHelpArticles(routing.defaultLocale)
  return articles.map((a) => a.slug)
}

/** Published articles in a section, clustered by their `group` (insertion-ordered). */
export interface HelpGroup {
  /** Group label, or '' for ungrouped articles. */
  name: string
  articles: HelpArticle[]
}

export async function getHelpSectionContent(
  sectionKey: string,
  locale: string = routing.defaultLocale,
): Promise<{ articles: HelpArticle[]; groups: HelpGroup[] }> {
  const all = await getAllHelpArticles(locale)
  const articles = all.filter((a) => a.section === sectionKey)

  const order: string[] = []
  const byGroup = new Map<string, HelpArticle[]>()
  for (const article of articles) {
    const key = article.group ?? ''
    if (!byGroup.has(key)) {
      byGroup.set(key, [])
      order.push(key)
    }
    byGroup.get(key)!.push(article)
  }
  // Named groups first (in first-seen order), ungrouped articles last.
  const groups: HelpGroup[] = order
    .sort((a, b) => (a === '' ? 1 : b === '' ? -1 : 0))
    .map((name) => ({ name, articles: byGroup.get(name)! }))

  return { articles, groups }
}

/** Section → article count, for the home grid. */
export async function getHelpSectionCounts(
  locale: string = routing.defaultLocale,
): Promise<Record<string, number>> {
  const counts: Record<string, number> = {}
  for (const article of await getAllHelpArticles(locale)) {
    counts[article.section] = (counts[article.section] ?? 0) + 1
  }
  return counts
}

/** Related articles for an article — its hand-picked list, else same-section fallback. */
export async function getRelatedArticles(
  article: HelpArticle,
  locale: string = routing.defaultLocale,
  limit = 4,
): Promise<HelpArticleRef[]> {
  if (article.related.length) return article.related.slice(0, limit)
  const { articles } = await getHelpSectionContent(article.section, locale)
  return articles.filter((a) => a.slug !== article.slug).slice(0, limit)
}

export async function getHelpSnippet(
  snippetId: string,
  locale: string = routing.defaultLocale,
): Promise<HelpArticle | null> {
  const all = await getAllHelpArticles(locale)
  return all.find((a) => a.snippetId === snippetId) ?? null
}
