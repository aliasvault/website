import { getTranslations } from 'next-intl/server'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getHelpSectionContent } from '@/lib/help'
import type { HelpSection } from '@/lib/help-sections'
import { sectionJsonLd, jsonLdScript } from '@/lib/jsonLd'
import HelpSectionIcon from './HelpSectionIcon'
import HelpBreadcrumb from './HelpBreadcrumb'

interface HelpSectionViewProps {
  section: HelpSection
  locale: string
}

/** Section landing page: intro + articles clustered by their free-text `group`. */
export default async function HelpSectionView({ section, locale }: HelpSectionViewProps) {
  const t = await getTranslations({ locale })
  const { articles, groups } = await getHelpSectionContent(section.key, locale)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com'
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const articleUrl = (slug: string) => `${baseUrl}${prefix}/help/${slug}`

  const title = t(`help.sections.${section.key}.title`)
  const description = t(`help.sections.${section.key}.description`)

  const jsonLd = sectionJsonLd({
    crumbs: [
      { name: t('help.title'), url: `${baseUrl}${prefix}/help` },
      { name: title, url: `${baseUrl}${prefix}/help/${section.key}` },
    ],
    articles,
    baseUrlForArticle: articleUrl,
  })

  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
        <div className="mx-auto max-w-4xl">
          <HelpBreadcrumb items={[{ label: t('help.title'), href: '/help' }, { label: title }]} />

          <div className="mb-12 flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-inset ring-primary/15">
              <HelpSectionIcon icon={section.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="mb-2 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                {title}
              </h1>
              <p className="text-base text-body-color dark:text-body-color-dark">{description}</p>
            </div>
          </div>

          {articles.length === 0 ? (
            <p className="text-body-color dark:text-body-color-dark">{t('help.sectionEmpty')}</p>
          ) : (
            <div className="space-y-12">
              {groups.map((group) => (
                <div key={group.name || '_ungrouped'}>
                  {group.name && (
                    <h2 className="mb-5 flex items-baseline gap-3 text-xl font-semibold text-black dark:text-white">
                      {group.name}
                      <span className="text-sm font-medium text-body-color dark:text-body-color-dark">
                        {t('help.articlesCount', { count: group.articles.length })}
                      </span>
                    </h2>
                  )}
                  <ul className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-three dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-dark dark:shadow-none divide-y divide-gray-100">
                    {group.articles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/help/${article.slug}`}
                          className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-primary/[0.04] dark:hover:bg-primary/[0.06]"
                        >
                          <span>
                            <span className="block font-medium text-black transition-colors group-hover:text-primary dark:text-white">
                              {article.title}
                            </span>
                            {article.description && (
                              <span className="mt-1 block text-sm text-body-color dark:text-body-color-dark">
                                {article.description}
                              </span>
                            )}
                          </span>
                          <FiArrowRight className="h-5 w-5 shrink-0 text-body-color transition-all group-hover:translate-x-1 group-hover:text-primary dark:text-body-color-dark" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Cross-navigation to the other help sections. */}
          <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
            <Link
              href="/help"
              className="group inline-flex items-center gap-2 font-medium text-body-color transition-colors hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
            >
              <FiArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              {t('help.backToHelp')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
