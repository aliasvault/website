import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBlogPostBySlug } from '@/lib/blog'
import { getCurrentUser } from '@/payload/auth'
import ArticlePreview from '@/components/Blog/ArticlePreview'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const user = await getCurrentUser()
  if (!user) notFound()
  const post = await getBlogPostBySlug(slug, locale, { draft: true, user })
  if (!post) notFound()
  return <ArticlePreview post={post} />
}
