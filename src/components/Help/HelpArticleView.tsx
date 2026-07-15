import { getTranslations } from 'next-intl/server'
import { FiArrowRight, FiClock, FiRefreshCw, FiUser } from 'react-icons/fi'
import RichText from '@/components/Lexical/RichText'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getRelatedArticles, type HelpArticle } from '@/lib/help'
import { getHelpSection, HELP_DEFAULT_SECTION } from '@/lib/help-sections'
import { extractHeadings, readingTimeMinutes } from '@/lib/lexical'
import { resolveAuthor } from '@/lib/authors'
import { articleJsonLd, jsonLdScript } from '@/lib/jsonLd'
import TableOfContents from './TableOfContents'
import HelpBreadcrumb from './HelpBreadcrumb'
import HelpSectionIcon from './HelpSectionIcon'

interface HelpArticleViewProps {
  article: HelpArticle
  locale: string
  isPreview?: boolean
}

export default async function HelpArticleView({ article, locale, isPreview }: HelpArticleViewProps) {
  const t = await getTranslations({ locale })
  const section = getHelpSection(article.section) ?? getHelpSection(HELP_DEFAULT_SECTION)!

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com'
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const url = `${baseUrl}${prefix}/help/${article.slug}`

  const sectionTitle = t(`help.sections.${section.key}.title`)
  const headings = extractHeadings(article.content)
  const minutes = readingTimeMinutes(article.content)
  const related = await getRelatedArticles(article, locale)
  const author = article.author ? resolveAuthor(article.author, locale) : null

  const jsonLd = articleJsonLd({
    article,
    url,
    locale,
    crumbs: [
      { name: t('help.title'), url: `${baseUrl}${prefix}/help` },
      { name: sectionTitle, url: `${baseUrl}${prefix}/help/${section.key}` },
      { name: article.title, url },
    ],
  })

  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
        <div className="mx-auto flex max-w-6xl justify-center gap-12">
          <div className="w-full min-w-0 max-w-3xl">
            {isPreview && (
              <div className="mb-8 rounded-xl border border-primary bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                Preview — this is how the article will look in the live theme. Status:{' '}
                <span className="font-semibold">{article.status}</span>.
              </div>
            )}

            <HelpBreadcrumb
              items={[
                { label: t('help.title'), href: '/help' },
                { label: sectionTitle, href: `/help/${section.key}` },
                { label: article.title },
              ]}
            />

            <Link
              href={`/help/${section.key}`}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <HelpSectionIcon icon={section.icon} className="h-4 w-4" />
              {sectionTitle}
            </Link>

            <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
              {article.title}
            </h1>

            <div className="mb-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-gray-200 pb-6 text-sm text-body-color dark:border-gray-800 dark:text-body-color-dark">
              <span className="inline-flex items-center gap-1.5">
                <FiClock className="h-4 w-4 text-primary" />
                {t('help.readMinutes', { minutes })}
              </span>
              {author?.name && (
                <span className="inline-flex items-center gap-1.5">
                  <FiUser className="h-4 w-4 text-primary" />
                  {author.name}
                </span>
              )}
              {article.updated && (
                <span className="inline-flex items-center gap-1.5">
                  <FiRefreshCw className="h-4 w-4 text-primary" />
                  {t('help.lastUpdated')} {article.updated}
                </span>
              )}
            </div>

            {(article.summary || article.description) && (
              <div className="mb-10 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 text-base leading-relaxed text-black dark:border-primary/25 dark:text-white">
                {article.summary || article.description}
              </div>
            )}

            <RichText data={article.content} />

            {article.faq.length > 0 && (
              <div className="mt-14">
                <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                  {t('help.faqHeading')}
                </h2>
                <div className="space-y-4">
                  {article.faq.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-gray-200 bg-white p-6 shadow-three dark:border-gray-800 dark:bg-gray-dark dark:shadow-none"
                    >
                      <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                        {item.question}
                      </h3>
                      <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div className="mt-14 border-t border-gray-200 pt-9 dark:border-gray-800">
                <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
                  {t('help.related')}
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {related.map((rel) => (
                    <li key={rel.slug}>
                      <Link
                        href={`/help/${rel.slug}`}
                        className="group flex h-full items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-three transition-all duration-200 hover:border-primary/40 dark:border-gray-800 dark:bg-gray-dark dark:shadow-none dark:hover:border-primary/40"
                      >
                        <span className="min-w-0">
                          <span className="block font-medium text-black transition-colors group-hover:text-primary dark:text-white">
                            {rel.title}
                          </span>
                          {rel.description && (
                            <span className="mt-1 line-clamp-2 block text-sm text-body-color dark:text-body-color-dark">
                              {rel.description}
                            </span>
                          )}
                        </span>
                        <FiArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* On this page — sticky on large screens. */}
          {headings.length >= 2 && (
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-28">
                <TableOfContents headings={headings} label={t('help.onThisPage')} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
