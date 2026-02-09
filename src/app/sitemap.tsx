import { MetadataRoute } from 'next'
import { getAllBlogAndNewsPosts } from '@/lib/blog'
import { routing } from '@/i18n/routing'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get base URL from environment variable or default
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aliasvault.net'

    // Static routes that should be included for all locales
    const staticPaths = [
        '',
        '/about',
        '/features',
        '/platforms',
        '/docs',
        '/blog',
        '/contact',
        '/mission',
        '/press-kit',
        '/report-abuse',
        '/privacy-policy',
        '/account-deletion',
        '/alternative-to/bitwarden',
        '/alternative-to/simplelogin',
        '/alternative-to/proton-pass'
    ]

    // Create routes for all locales
    const staticRoutes: MetadataRoute.Sitemap = []

    routing.locales.forEach(locale => {
        staticPaths.forEach(path => {
            const url = locale === routing.defaultLocale
                ? `${baseUrl}${path}`
                : `${baseUrl}/${locale}${path}`

            staticRoutes.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: path === '' ? 1.0 : 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        routing.locales.map(loc => [
                            loc,
                            loc === routing.defaultLocale
                                ? `${baseUrl}${path}`
                                : `${baseUrl}/${loc}${path}`
                        ])
                    )
                }
            })
        })
    })

    // Get all blog and news posts
    const posts = getAllBlogAndNewsPosts()

    // Create dynamic routes for blog and news posts (all locales)
    const dynamicRoutes: MetadataRoute.Sitemap = []

    routing.locales.forEach(locale => {
        posts.forEach(post => {
            const url = locale === routing.defaultLocale
                ? `${baseUrl}/${post.type}/${post.slug}`
                : `${baseUrl}/${locale}/${post.type}/${post.slug}`

            dynamicRoutes.push({
                url,
                lastModified: new Date(post.date),
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: Object.fromEntries(
                        routing.locales.map(loc => [
                            loc,
                            loc === routing.defaultLocale
                                ? `${baseUrl}/${post.type}/${post.slug}`
                                : `${baseUrl}/${loc}/${post.type}/${post.slug}`
                        ])
                    )
                }
            })
        })
    })

    return [...staticRoutes, ...dynamicRoutes]
}
