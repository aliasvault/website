import { getTranslations } from 'next-intl/server'
import { FiArrowRight, FiClock } from 'react-icons/fi'
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
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-8/12">
            {isPreview && (
              <div className="mb-8 rounded-sm border border-primary bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
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

            <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
              {article.title}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-body-color border-opacity-10 pb-6 text-sm text-body-color dark:border-white dark:border-opacity-10 dark:text-body-color-dark">
              <span className="inline-flex items-center gap-1.5">
                <FiClock className="h-4 w-4" />
                {t('help.readMinutes', { minutes })}
              </span>
              {author?.name && <span>{author.name}</span>}
              {article.updated && (
                <span>
                  {t('help.lastUpdated')} {article.updated}
                </span>
              )}
            </div>

            {(article.summary || article.description) && (
              <div className="mb-10 rounded-sm border-l-4 border-primary bg-primary/5 px-5 py-4 text-base leading-relaxed text-black dark:text-white">
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
                      className="shadow-three dark:bg-gray-dark rounded-sm bg-white p-5 dark:shadow-none"
                    >
                      <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                        {item.question}
                      </h3>
                      <p className="text-base text-body-color dark:text-body-color-dark">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div className="mt-14 border-t border-body-color border-opacity-10 pt-8 dark:border-white dark:border-opacity-10">
                <h2 className="mb-5 text-xl font-semibold text-black dark:text-white">
                  {t('help.related')}
                </h2>
                <ul className="space-y-3">
                  {related.map((rel) => (
                    <li key={rel.slug}>
                      <Link
                        href={`/help/${rel.slug}`}
                        className="group inline-flex items-center gap-2 font-medium text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                      >
                        <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* On this page — sticky on large screens. */}
          {headings.length >= 2 && (
            <aside className="w-full px-4 lg:w-4/12">
              <div className="sticky top-28 hidden lg:block">
                <TableOfContents headings={headings} label={t('help.onThisPage')} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
