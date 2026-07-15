/**
 * schema.org / JSON-LD builders.
 */
import type { HelpArticle, HelpFaqItem } from '@/lib/help'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com'

const ORG = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'AliasVault',
  url: BASE_URL,
  logo: `${BASE_URL}/presskit/logo-1024.png`,
  sameAs: [
    'https://github.com/aliasvault/aliasvault',
    'https://x.com/AliasVault',
    'https://mastodon.social/@aliasvault',
    'https://www.youtube.com/@AliasVault',
    'https://www.facebook.com/aliasvault',
  ],
} as const

export function organizationJsonLd() {
  return { '@context': 'https://schema.org', ...ORG }
}

/** Site-wide Organization + WebSite graph, injected once in the locale layout. */
export function siteJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        name: 'AliasVault',
        url: BASE_URL,
        inLanguage: locale,
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
    ],
  }
}

export interface BreadcrumbCrumb {
  name: string
  url: string
}

function breadcrumbList(crumbs: BreadcrumbCrumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
}

function faqPage(faq: HelpFaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/**
 * Full JSON-LD @graph for a Help article page.
 */
export function articleJsonLd({
  article,
  url,
  locale,
  crumbs,
}: {
  article: HelpArticle
  url: string
  locale: string
  crumbs: BreadcrumbCrumb[]
}) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      headline: article.seoTitle || article.title,
      description: article.summary || article.description,
      inLanguage: locale,
      url,
      mainEntityOfPage: url,
      ...(article.updated ? { dateModified: article.updated } : {}),
      author: { '@type': 'Organization', name: 'AliasVault' },
      publisher: ORG,
    },
    breadcrumbList(crumbs),
  ]
  if (article.faq.length) graph.push(faqPage(article.faq))
  return { '@context': 'https://schema.org', '@graph': graph }
}

/** JSON-LD for a section landing page: BreadcrumbList + ItemList of articles. */
export function sectionJsonLd({
  crumbs,
  articles,
  baseUrlForArticle,
}: {
  crumbs: BreadcrumbCrumb[]
  articles: { slug: string; title: string }[]
  baseUrlForArticle: (slug: string) => string
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbList(crumbs),
      {
        '@type': 'ItemList',
        itemListElement: articles.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: a.title,
          url: baseUrlForArticle(a.slug),
        })),
      },
    ],
  }
}

/** Serialize for a <script type="application/ld+json"> tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
}
