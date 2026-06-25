/**
 * schema.org / JSON-LD builders.
 *
 * We emit TechArticle + BreadcrumbList on every article, FAQPage when an article
 * has Q&A pairs, and a site-wide Organization for SEO purposes.
 */
import type { HelpArticle, HelpFaqItem } from '@/lib/help'

const ORG = {
  '@type': 'Organization',
  name: 'AliasVault',
  url: 'https://www.aliasvault.com',
  logo: 'https://www.aliasvault.com/images/logo/logo.svg',
  sameAs: [
    'https://github.com/lanedirt/AliasVault',
    'https://x.com/AliasVault',
    'https://www.aliasvault.com',
  ],
} as const

export function organizationJsonLd() {
  return { '@context': 'https://schema.org', ...ORG }
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
 * Full JSON-LD @graph for a Help article page: TechArticle + BreadcrumbList
 * (+ FAQPage when present). `crumbs` should be Home → Section → Article.
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
      '@type': 'TechArticle',
      headline: article.seoTitle || article.title,
      description: article.summary || article.description,
      inLanguage: locale,
      url,
      mainEntityOfPage: url,
      ...(article.updated ? { dateModified: article.updated, datePublished: article.updated } : {}),
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
