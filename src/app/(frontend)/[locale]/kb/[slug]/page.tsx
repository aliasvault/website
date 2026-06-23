import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getKBArticleBySlug } from '@/lib/kb'
import { generatePageSEOMetadata } from '@/lib/seo-utils'
import KBArticleView from '@/components/KB/KBArticleView'

// KB articles live in the Payload database (runtime-only), so render on demand
// at request time rather than prerendering at build.
export const dynamic = 'force-dynamic'

interface KBArticlePageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: KBArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const article = await getKBArticleBySlug(slug, locale)

  if (!article) {
    return { title: 'Article Not Found' }
  }

  return generatePageSEOMetadata({
    title: article.title,
    description: article.description,
    path: `/kb/${slug}`,
    locale,
    type: 'article',
    modifiedTime: article.updated,
    tags: article.tags,
  })
}

export default async function KBArticlePage({ params }: KBArticlePageProps) {
  const { slug, locale } = await params
  const article = await getKBArticleBySlug(slug, locale)
  const t = await getTranslations()

  if (!article) {
    notFound()
  }

  return <KBArticleView article={article} locale={locale} kbLabel={t('navigation.knowledgeBase')} />
}
