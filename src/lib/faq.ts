import { getPayloadClient } from '@/payload/client'
import { routing } from '@/i18n/routing'
import { FAQ_DEFAULT_CATEGORY, getFaqCategory, type FaqPlacement } from '@/lib/faq-categories'
import { lexicalToMarkdown, lexicalToPlainText } from '@/lib/lexical'

export interface FaqEntry {
  id: string | number
  /** Link anchor: /faq#<slug> (and /#<slug>, /pricing#<slug> where shown). */
  slug: string
  question: string
  /** Lexical rich text. */
  answer: unknown
  /** Answer as plain text (search, JSON-LD). */
  answerText: string
  /** Answer as Markdown with links (llms.txt). */
  answerMarkdown: string
  category: string
  showOn: FaqPlacement[]
  order: number
  related?: { slug: string; title: string }
}

const asLocale = (locale: string): 'en' | 'nl' => (locale === 'nl' ? 'nl' : 'en')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFaq(doc: any): FaqEntry {
  const related = doc.related && typeof doc.related === 'object' && doc.related.slug ? doc.related : null
  return {
    id: doc.id,
    slug: doc.slug,
    question: doc.question ?? '',
    answer: doc.answer,
    answerText: lexicalToPlainText(doc.answer),
    answerMarkdown: lexicalToMarkdown(doc.answer),
    category: getFaqCategory(doc.category) ? doc.category : FAQ_DEFAULT_CATEGORY,
    showOn: Array.isArray(doc.showOn) ? doc.showOn : [],
    order: typeof doc.order === 'number' ? doc.order : 0,
    ...(related ? { related: { slug: related.slug, title: related.title } } : {}),
  }
}

/**
 * Published FAQ entries, sorted by `order`. Pass `showOn` to get only the
 * questions picked for the homepage or the pricing page.
 */
export async function getFaqs(
  locale: string = routing.defaultLocale,
  { showOn }: { showOn?: FaqPlacement } = {},
): Promise<FaqEntry[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'faqs',
    locale: asLocale(locale),
    where: {
      and: [{ _status: { equals: 'published' } }, ...(showOn ? [{ showOn: { in: [showOn] } }] : [])],
    },
    sort: 'order',
    limit: 1000,
    depth: 1, // populate `related` (published Help articles only; access control filters drafts)
    // Backstop: access control forces published-only for anonymous requests.
    overrideAccess: false,
  })
  return res.docs.map(mapFaq).filter((f) => f.slug && f.question)
}
