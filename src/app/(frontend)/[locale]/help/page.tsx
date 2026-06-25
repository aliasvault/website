import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getHelpSectionCounts } from '@/lib/help'
import { helpSectionsSorted } from '@/lib/help-sections'
import { generatePageSEOMetadata } from '@/lib/seo-utils'
import HelpSectionCard from '@/components/Help/HelpSectionCard'

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
  })
}

export default async function HelpIndexPage({ params }: HelpIndexPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const counts = await getHelpSectionCounts(locale)
  const sections = helpSectionsSorted()

  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
            {t('help.title')}
          </h1>
          <p className="text-base text-body-color">{t('help.description')}</p>
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
