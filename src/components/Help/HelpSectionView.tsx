import { getTranslations } from 'next-intl/server'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getHelpSectionContent } from '@/lib/help'
import type { HelpSection } from '@/lib/help-sections'
import { sectionJsonLd, jsonLdScript } from '@/lib/jsonLd'
import HelpSectionIcon from './HelpSectionIcon'
import HelpBreadcrumb from './HelpBreadcrumb'
import IconTile from '@/components/Common/IconTile'
import LinkList from '@/components/Common/LinkList'

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
            <IconTile size="lg">
              <HelpSectionIcon icon={section.icon} className="h-7 w-7" />
            </IconTile>
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
                  <LinkList
                    items={group.articles.map((article) => ({
                      title: article.title,
                      description: article.description,
                      href: `/help/${article.slug}`,
                    }))}
                  />
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
