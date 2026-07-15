import { MetadataRoute } from 'next'
import { getAllBlogAndNewsPosts } from '@/lib/blog'
import { getAllHelpArticles } from '@/lib/help'
import { helpSectionsSorted } from '@/lib/help-sections'
import { routing } from '@/i18n/routing'

// Generated at request time, not at build: blog/news/help entries come from the
// Payload database, which only exists at runtime.
export const dynamic = 'force-dynamic'

/**
 * Sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com'
    const urlFor = (locale: string, path: string) =>
        locale === routing.defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`

    // Static routes, localized (EN at root, NL under /nl).
    const staticPaths = [
        '',
        '/about',
        '/features',
        '/pricing',
        '/platforms',
        '/docs',
        '/blog',
        '/help',
        ...helpSectionsSorted().map((s) => `/help/${s.key}`),
        '/contact',
        '/mission',
        '/press-kit',
        '/source-code',
        '/report-abuse',
        '/privacy-policy',
        '/terms-and-conditions',
        '/account-deletion',
        '/responsible-disclosure',
        '/security',
        '/alternative-to/bitwarden',
        '/alternative-to/simplelogin',
        '/alternative-to/proton-pass',
        '/alternative-to/1password'
    ]

    const staticRoutes: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
        staticPaths.map((path) => ({ url: urlFor(locale, path) }))
    )

    // Blog and news posts are localized, so both language URLs are listed.
    const posts = await getAllBlogAndNewsPosts()
    const postRoutes: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
        posts.map((post) => ({
            url: urlFor(locale, `/${post.type}/${post.slug}`),
            lastModified: new Date(post.date),
        }))
    )

    // Help articles are localized, so both language URLs are listed.
    const helpArticles = await getAllHelpArticles()
    const helpRoutes: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
        helpArticles.map((article) => ({
            url: urlFor(locale, `/help/${article.slug}`),
            ...(article.updated ? { lastModified: new Date(article.updated) } : {}),
        }))
    )

    return [...staticRoutes, ...postRoutes, ...helpRoutes]
}
