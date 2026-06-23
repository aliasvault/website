import RichText from '@/components/Lexical/RichText'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import type { KBArticle } from '@/lib/kb'

interface KBArticleViewProps {
  article: KBArticle
  locale: string
  /** Backlink label for the breadcrumb (already localised by the caller). */
  kbLabel: string
  isPreview?: boolean
}

export default function KBArticleView({ article, locale, kbLabel, isPreview }: KBArticleViewProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com'
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const url = `${baseUrl}${prefix}/kb/${article.slug}`

  // Structured data — Article + BreadcrumbList (the site previously emitted none).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        inLanguage: locale,
        url,
        ...(article.updated ? { dateModified: article.updated } : {}),
        author: { '@type': 'Organization', name: 'AliasVault' },
        publisher: { '@type': 'Organization', name: 'AliasVault' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: kbLabel, item: `${baseUrl}${prefix}/kb` },
          { '@type': 'ListItem', position: 2, name: article.title, item: url },
        ],
      },
    ],
  }

  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            {isPreview && (
              <div className="mb-8 rounded-sm border border-primary bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                Preview — this is how the article will look in the live theme. Status:{' '}
                <span className="font-semibold">{article.status}</span>.
              </div>
            )}
            <nav className="mb-6 text-sm text-body-color">
              <Link href="/kb" className="hover:text-primary">
                {kbLabel}
              </Link>
              <span className="px-2">/</span>
              <span>{article.category}</span>
            </nav>
            <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
              {article.title}
            </h1>
            {article.updated && (
              <p className="mb-10 border-b border-body-color border-opacity-10 pb-4 text-base text-body-color dark:border-white dark:border-opacity-10">
                Last updated {article.updated}
              </p>
            )}
            <RichText data={article.content} />
          </div>
        </div>
      </div>
    </section>
  )
}
