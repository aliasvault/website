import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getKBArticleBySlug, getAllKBArticles } from '@/lib/kb'
import { generatePageSEOMetadata } from '@/lib/seo-utils'
import { routing } from '@/i18n/routing'
import KBArticleView from '@/components/KB/KBArticleView'

interface KBArticlePageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const all = await Promise.all(
    routing.locales.map(async (locale) =>
      (await getAllKBArticles(locale)).map((article) => ({ locale, slug: article.slug })),
    ),
  )
  return all.flat()
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
