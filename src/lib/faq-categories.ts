/**
 * FAQ categories and placements — the code-owned layer of the FAQ.
 *
 * Same split as the Help sections (see help-sections.ts): the few, stable
 * categories live here in code (key, icon, order), their labels and descriptions
 * live in next-intl messages under `faq.categories.<key>`, and the questions
 * themselves are content in the Payload `faqs` collection. Adding a question never
 * needs a code change; adding a category does (an entry here plus its messages).
 *
 * The Payload `category` and `showOn` select options are derived from these
 * lists, so the CMS and the site never drift.
 *
 * Pure data (no React/JSX) so both the Payload config and the front-end can
 * import it. Icons are referenced by key and mapped in FaqCategoryIcon.
 */

export type FaqCategoryIconKey = 'compass' | 'shield' | 'database' | 'mail' | 'server' | 'tag' | 'users'

export interface FaqCategory {
  /** Stored `category` value; also the anchor `#category-<key>` on /faq. */
  key: string
  icon: FaqCategoryIconKey
  /** Display order on /faq (ascending). */
  order: number
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  { key: 'getting-started', icon: 'compass', order: 1 },
  { key: 'security', icon: 'shield', order: 2 },
  { key: 'your-data', icon: 'database', order: 3 },
  { key: 'email-aliases', icon: 'mail', order: 4 },
  { key: 'self-hosting', icon: 'server', order: 5 },
  { key: 'pricing', icon: 'tag', order: 6 },
  { key: 'company', icon: 'users', order: 7 },
] as const

export const faqCategoriesSorted = (): FaqCategory[] => [...FAQ_CATEGORIES].sort((a, b) => a.order - b.order)

export const getFaqCategory = (key: string): FaqCategory | undefined => FAQ_CATEGORIES.find((c) => c.key === key)

export const FAQ_DEFAULT_CATEGORY = 'getting-started'

/** Anchor prefix for category headings on /faq; question slugs may not use it. */
export const FAQ_CATEGORY_ANCHOR_PREFIX = 'category-'

export const faqCategoryAnchor = (key: string): string => `${FAQ_CATEGORY_ANCHOR_PREFIX}${key}`

const titleCase = (key: string) =>
  key
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

/** Payload `select` options for the `category` field (admin-only labels). */
export const faqCategorySelectOptions = faqCategoriesSorted().map((c) => ({ label: titleCase(c.key), value: c.key }))

/**
 * Pages that can show a question; editors pick any combination per entry.
 * - `faq`: the full /faq page, grouped by category.
 * - `home`: the FAQ section on the homepage.
 * - `pricing`: the FAQ block on the pricing page.
 */
export const FAQ_PLACEMENTS = ['faq', 'home', 'pricing'] as const
export type FaqPlacement = (typeof FAQ_PLACEMENTS)[number]

export const faqPlacementSelectOptions = [
  { label: 'FAQ page', value: 'faq' },
  { label: 'Homepage', value: 'home' },
  { label: 'Pricing page', value: 'pricing' },
] satisfies { label: string; value: FaqPlacement }[]
