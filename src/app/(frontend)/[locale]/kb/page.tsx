import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getKBArticlesByCategory } from '@/lib/kb'
import { generatePageSEOMetadata } from '@/lib/seo-utils'

// KB articles come from the Payload database (runtime-only), so render this
// index per request instead of prerendering it at build time.
export const dynamic = 'force-dynamic'

interface KBIndexPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: KBIndexPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return generatePageSEOMetadata({
    title: t('kb.title'),
    description: t('kb.description'),
    path: '/kb',
    locale,
  })
}

export default async function KBIndexPage({ params }: KBIndexPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const byCategory = await getKBArticlesByCategory(locale)
  const categories = Object.keys(byCategory).sort((a, b) => a.localeCompare(b))

  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
            {t('kb.title')}
          </h1>
          <p className="mb-12 text-base text-body-color">{t('kb.description')}</p>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-body-color">{t('kb.empty')}</p>
        ) : (
          <div className="mx-auto max-w-4xl">
            {categories.map((category) => (
              <div key={category} className="mb-12">
                <h2 className="mb-5 text-xl font-semibold text-black dark:text-white">{category}</h2>
                <ul className="space-y-3">
                  {byCategory[category].map((article) => (
                    <li
                      key={article.slug}
                      className="shadow-three dark:bg-gray-dark rounded-sm bg-white dark:shadow-none"
                    >
                      <Link href={`/kb/${article.slug}`} className="block px-6 py-5 hover:text-primary">
                        <span className="block text-lg font-medium text-black dark:text-white">
                          {article.title}
                        </span>
                        <span className="mt-1 block text-sm text-body-color">{article.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
