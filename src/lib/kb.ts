import { getPayloadClient } from '@/payload/client'
import { routing } from '@/i18n/routing'

export type KBStatus = 'draft' | 'published'

export interface KBArticle {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  updated?: string
  status: KBStatus
  snippetId?: string
  content: unknown
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArticle(doc: any): KBArticle {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? '',
    category: doc.category ?? 'General',
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    updated: doc.updated ? String(doc.updated).slice(0, 10) : undefined,
    status: doc._status === 'published' ? 'published' : 'draft',
    snippetId: doc.snippetId ?? undefined,
    content: doc.content,
  }
}

export async function getKBArticleBySlug(
  slug: string,
  locale: string = routing.defaultLocale,
  draft = false,
): Promise<KBArticle | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'knowledge-base',
    locale: locale as 'en' | 'nl',
    draft,
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    overrideAccess: true,
  })
  return res.docs[0] ? mapArticle(res.docs[0]) : null
}

export async function getAllKBArticles(locale: string = routing.defaultLocale): Promise<KBArticle[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'knowledge-base',
    locale: locale as 'en' | 'nl',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    overrideAccess: true,
  })
  return res.docs.map(mapArticle).sort((a, b) => a.title.localeCompare(b.title))
}

export async function getAllKBSlugs(): Promise<string[]> {
  const articles = await getAllKBArticles(routing.defaultLocale)
  return articles.map((a) => a.slug)
}

export async function getKBArticlesByCategory(
  locale: string = routing.defaultLocale,
): Promise<Record<string, KBArticle[]>> {
  const grouped: Record<string, KBArticle[]> = {}
  for (const article of await getAllKBArticles(locale)) {
    ;(grouped[article.category] ||= []).push(article)
  }
  return grouped
}

export async function getKBSnippet(
  snippetId: string,
  locale: string = routing.defaultLocale,
): Promise<KBArticle | null> {
  const all = await getAllKBArticles(locale)
  return all.find((a) => a.snippetId === snippetId) ?? null
}
