import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBlogPostBySlug } from '@/lib/blog'
import ArticlePreview from '@/components/Blog/ArticlePreview'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const post = await getBlogPostBySlug(slug, locale, true)
  if (!post) notFound()
  return <ArticlePreview post={post} />
}
