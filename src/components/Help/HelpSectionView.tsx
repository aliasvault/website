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

          <div className="mb-12 flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <HelpSectionIcon icon={section.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="mb-2 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                {title}
              </h1>
              <p className="text-base text-body-color">{description}</p>
            </div>
          </div>

          {articles.length === 0 ? (
            <p className="text-body-color">{t('help.sectionEmpty')}</p>
          ) : (
            <div className="space-y-12">
              {groups.map((group) => (
                <div key={group.name || '_ungrouped'}>
                  {group.name && (
                    <h2 className="mb-5 text-xl font-semibold text-black dark:text-white">
                      {group.name}
                    </h2>
                  )}
                  <ul className="space-y-3">
                    {group.articles.map((article) => (
                      <li
                        key={article.slug}
                        className="shadow-three dark:bg-gray-dark rounded-sm bg-white dark:shadow-none"
                      >
                        <Link
                          href={`/help/${article.slug}`}
                          className="group flex items-center justify-between gap-4 px-6 py-4 hover:text-primary"
                        >
                          <span>
                            <span className="block font-medium text-black group-hover:text-primary dark:text-white">
                              {article.title}
                            </span>
                            <span className="mt-1 block text-sm text-body-color">
                              {article.description}
                            </span>
                          </span>
                          <FiArrowRight className="h-5 w-5 shrink-0 text-body-color transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
