import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { FiArrowRight, FiFileText } from 'react-icons/fi'
import { Link } from '@/i18n/navigation'
import { getAllHelpArticles, getHelpSectionCounts } from '@/lib/help'
import { helpSectionsSorted } from '@/lib/help-sections'
import { generatePageSEOMetadata } from '@/lib/seo-utils'
import HelpSectionCard from '@/components/Help/HelpSectionCard'
import HelpSearch from '@/components/Help/HelpSearch'

// Help content comes from the Payload database (runtime-only), so render per request.
export const dynamic = 'force-dynamic'

interface HelpIndexPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HelpIndexPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return generatePageSEOMetadata({
    title: t('help.title'),
    description: t('help.description'),
    path: '/help',
    locale,
    ogBadge: t('help.title'),
  })
}

export default async function HelpIndexPage({ params }: HelpIndexPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const [counts, articles] = await Promise.all([
    getHelpSectionCounts(locale),
    getAllHelpArticles(locale),
  ])
  const sections = helpSectionsSorted()

  return (
    <section className="relative overflow-hidden pb-[120px] pt-[150px]">
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[500px] w-[500px] rounded-full opacity-25 dark:opacity-15"
        aria-hidden
        style={{ background: 'radial-gradient(circle, #f49541 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute left-[-8%] top-[280px] h-96 w-96 rounded-full opacity-20 dark:opacity-10"
        aria-hidden
        style={{ background: 'radial-gradient(circle, #d68338 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mt-10 sm:mb-20">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[42px]">
            {t('help.heroTitle')}
          </h1>
          <p className="mb-9 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg">
            {t('help.description')}
          </p>
          <HelpSearch />
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <HelpSectionCard
              key={section.key}
              section={section}
              title={t(`help.sections.${section.key}.title`)}
              description={t(`help.sections.${section.key}.description`)}
              meta={t('help.articlesCount', { count: counts[section.key] ?? 0 })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
