import { getPayloadClient } from '@/payload/client'
import { resolveAuthor, type ResolvedAuthor } from './authors'

export interface ContentPost {
  type: 'blog' | 'news'
  slug: string
  title: string
  description: string
  date: string
  image?: string
  /** Blog only: 'full' = no sidebar (news-style), omit or 'default' = with sidebar */
  layout?: 'default' | 'full'
  /** Resolved from the stored author key via src/lib/authors.ts. */
  author: ResolvedAuthor
  tags: string[]
  content: unknown
}

/**
 * Resolve a Media upload field to a same-origin /uploads/<filename> path that
 * next/image accepts. Accepts a populated media doc (depth >= 1), a bare id, or
 * a string path.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mediaUrl(value: any): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value.filename) return `/uploads/${value.filename}`
  return undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(doc: any, type: 'blog' | 'news', locale: string): ContentPost {
  return {
    type,
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? '',
    date: doc.date ? String(doc.date).slice(0, 10) : '',
    image: mediaUrl(doc.image),
    layout: doc.layout ?? undefined,
    author: resolveAuthor(doc.author, locale),
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    content: doc.content,
  }
}

async function findAll(collection: 'posts' | 'news', locale: string): Promise<ContentPost[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection,
    locale: locale as 'en' | 'nl',
    where: { _status: { equals: 'published' } },
    sort: '-date',
    limit: 1000,
    depth: 1,
    overrideAccess: true,
    // List view only select card field instead of rendering full body.
    select: {
      slug: true,
      title: true,
      description: true,
      date: true,
      image: true,
      layout: true,
      author: true,
      tags: true,
    },
  })
  return res.docs.map((d) => mapPost(d, collection === 'posts' ? 'blog' : 'news', locale))
}

async function findBySlug(
  collection: 'posts' | 'news',
  slug: string,
  locale: string,
  draft = false,
): Promise<ContentPost | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection,
    locale: locale as 'en' | 'nl',
    draft,
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
    overrideAccess: true,
  })
  const doc = res.docs[0]
  return doc ? mapPost(doc, collection === 'posts' ? 'blog' : 'news', locale) : null
}

export async function getAllBlogPosts(locale: string = 'en'): Promise<ContentPost[]> {
  return findAll('posts', locale)
}

export async function getAllNewsPosts(locale: string = 'en'): Promise<ContentPost[]> {
  return findAll('news', locale)
}

export async function getAllBlogAndNewsPosts(locale: string = 'en'): Promise<ContentPost[]> {
  const [blog, news] = await Promise.all([findAll('posts', locale), findAll('news', locale)])
  return [...blog, ...news].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getBlogPostBySlug(
  slug: string,
  locale: string = 'en',
  draft = false,
): Promise<ContentPost | null> {
  return findBySlug('posts', slug, locale, draft)
}

export async function getNewsBySlug(
  slug: string,
  locale: string = 'en',
  draft = false,
): Promise<ContentPost | null> {
  return findBySlug('news', slug, locale, draft)
}

export async function getBlogPostsByTag(tag: string, locale: string = 'en'): Promise<ContentPost[]> {
  const all = await getAllBlogAndNewsPosts(locale)
  return all.filter((post) => post.tags.includes(tag))
}
