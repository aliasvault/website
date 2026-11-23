import { getAllBlogAndNewsPosts } from '@/lib/blog';
import { NextResponse } from 'next/server';

// Built from Payload content, which is only available at runtime.
export const dynamic = 'force-dynamic';

const locales = ['en', 'nl'];
const localeNames = {
  en: 'en-US',
  nl: 'nl-NL'
};

const localeDescriptions = {
  en: 'Latest blog posts and news from AliasVault',
  nl: 'Laatste blogposts en nieuws van AliasVault'
};

const localeTitles = {
  en: 'AliasVault Blog',
  nl: 'AliasVault Blog'
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    return new NextResponse('Invalid locale', { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com';
  // The list query only selects card fields (no body), so each item uses the
  // post's summary `description` field.
  const posts = await getAllBlogAndNewsPosts(locale);

  // Generate alternate feed links for all locales except current locale
  const alternateLinks = locales
    .filter(loc => loc !== locale) // Filter out self link
    .map(loc => `<atom:link href="${baseUrl}${loc === 'en' ? '' : '/' + loc}/rss.xml" rel="alternate" type="application/rss+xml" hreflang="${loc}" />`)
    .join('\n        ');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${localeTitles[locale as keyof typeof localeTitles]}</title>
        <link>${baseUrl}${locale === 'en' ? '' : '/' + locale}</link>
        <description>${localeDescriptions[locale as keyof typeof localeDescriptions]}</description>
        <language>${localeNames[locale as keyof typeof localeNames]}</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}${locale === 'en' ? '' : '/' + locale}/rss.xml" rel="self" type="application/rss+xml" />
        ${alternateLinks}
        ${posts.map((post) => `
          <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${baseUrl}${locale === 'en' ? '' : '/' + locale}/${post.type}/${post.slug}</link>
            <guid>${baseUrl}${locale === 'en' ? '' : '/' + locale}/${post.type}/${post.slug}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <description><![CDATA[${post.description}]]></description>
            <category><![CDATA[${post.tags.join(', ')}]]></category>
            <dc:creator><![CDATA[${post.author.name}]]></dc:creator>
          </item>
        `).join('')}
      </channel>
    </rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}