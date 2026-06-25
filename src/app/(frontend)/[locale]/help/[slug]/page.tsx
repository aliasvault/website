import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getHelpArticleBySlug } from '@/lib/help'
import { getHelpSection, isHelpSectionKey } from '@/lib/help-sections'
import { generatePageSEOMetadata } from '@/lib/seo-utils'
import HelpArticleView from '@/components/Help/HelpArticleView'
import HelpSectionView from '@/components/Help/HelpSectionView'

// Help content lives in the Payload database (runtime-only) → render on demand.
export const dynamic = 'force-dynamic'

interface HelpSlugPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: HelpSlugPageProps): Promise<Metadata> {
  const { slug, locale } = await params

  // Section landing page.
  if (isHelpSectionKey(slug)) {
    const t = await getTranslations({ locale })
    return generatePageSEOMetadata({
      title: `${t(`help.sections.${slug}.title`)} | ${t('help.title')}`,
      description: t(`help.sections.${slug}.description`),
      path: `/help/${slug}`,
      locale,
    })
  }

  // Article page.
  const article = await getHelpArticleBySlug(slug, locale)
  if (!article) return { title: 'Article Not Found' }

  return generatePageSEOMetadata({
    title: article.seoTitle || article.title,
    description: article.summary || article.description,
    path: `/help/${slug}`,
    locale,
    type: 'article',
    modifiedTime: article.updated,
    tags: article.tags,
  })
}

export default async function HelpSlugPage({ params }: HelpSlugPageProps) {
  const { slug, locale } = await params

  // The slug segment is shared between section landings (/help/<section>) and
  // articles (/help/<slug>). Section keys are reserved from article slugs, so
  // a match here is unambiguous.
  if (isHelpSectionKey(slug)) {
    const section = getHelpSection(slug)!
    return <HelpSectionView section={section} locale={locale} />
  }

  const article = await getHelpArticleBySlug(slug, locale)
  if (!article) notFound()

  return <HelpArticleView article={article} locale={locale} />
}
