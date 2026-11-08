import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CtaBlock from '@/components/Common/CtaBlock'
import FaqDirectory, { type DirectoryCategory } from '@/components/FAQ/FaqDirectory'
import { faqAccordionItems } from '@/components/FAQ/faqItems'
import { routing } from '@/i18n/routing'
import { getFaqs } from '@/lib/faq'
import { faqCategoriesSorted } from '@/lib/faq-categories'
import { faqPageJsonLd, jsonLdScript } from '@/lib/jsonLd'
import { generatePageSEOMetadata } from '@/lib/seo-utils'

// FAQ content comes from the Payload database (runtime-only), so render per request.
export const dynamic = 'force-dynamic'

interface FaqPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return generatePageSEOMetadata({
    title: t('faq.page.metaTitle'),
    description: t('faq.page.metaDescription'),
    path: '/faq',
    locale,
    ogBadge: 'FAQ',
  })
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const entries = await getFaqs(locale, { showOn: 'faq' })
  const learnMore = t('faq.learnMore')

  const categories: DirectoryCategory[] = faqCategoriesSorted()
    .map((c) => {
      const inCategory = entries.filter((e) => e.category === c.key)
      const rendered = faqAccordionItems(inCategory, learnMore)
      return {
        key: c.key,
        icon: c.icon,
        title: t(`faq.categories.${c.key}.title`),
        description: t(`faq.categories.${c.key}.description`),
        items: rendered.map((item, i) => ({
          ...item,
          searchText: `${inCategory[i].question}\n${inCategory[i].answerText}`,
        })),
      }
    })
    .filter((c) => c.items.length > 0)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com'
  const url = `${baseUrl}${locale === routing.defaultLocale ? '' : `/${locale}`}/faq`
  const jsonLd = faqPageJsonLd({
    items: entries.map((e) => ({ question: e.question, answer: e.answerText })),
    url,
    locale,
  })

  return (
    <section className="relative overflow-hidden pb-[120px] pt-[150px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
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
        <div className="mx-auto mb-9 max-w-3xl text-center md:mt-10">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[42px]">
            {t('faq.page.title')}
          </h1>
          <p className="text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg">
            {t('faq.page.description')}
          </p>
        </div>

        {/* Narrow reading column: full-container accordions are hard to scan on desktop. */}
        <div className="mx-auto max-w-4xl">
          <FaqDirectory categories={categories} />
          <CtaBlock
            className="mt-16"
            headingAs="h2"
            title={t('faq.page.contact.title')}
            description={t('faq.page.contact.description')}
            buttonLabel={t('faq.page.contact.cta')}
            href="/contact"
          />
        </div>
      </div>
    </section>
  )
}
