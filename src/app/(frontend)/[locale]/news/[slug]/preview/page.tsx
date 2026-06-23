import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getNewsBySlug } from '@/lib/blog'
import ArticlePreview from '@/components/Blog/ArticlePreview'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function NewsPreviewPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const post = await getNewsBySlug(slug, locale, true)
  if (!post) notFound()
  return <ArticlePreview post={post} />
}
