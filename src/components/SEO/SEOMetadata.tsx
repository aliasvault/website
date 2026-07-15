import { Metadata } from 'next';
import { locales, defaultLocale } from '@/i18n/config';

interface SEOMetadataProps {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string;
  ogBadge?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  contentLanguage?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aliasvault.com';

const localizedUrl = (loc: string, path: string) =>
  loc === defaultLocale ? `${BASE_URL}${path}` : `${BASE_URL}/${loc}${path}`;

const OG_LOCALES: Record<string, string> = { en: 'en_US', nl: 'nl_NL' };

export function generateSEOMetadata({
  title,
  description,
  path,
  locale,
  image,
  ogBadge,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  contentLanguage
}: SEOMetadataProps): Metadata {
  // Use content language if provided, otherwise use locale
  const actualContentLanguage = contentLanguage || locale;

  // For content that's in English but might be on different locale routes,
  // we need to set the canonical URL to the English version
  const canonicalUrl =
    actualContentLanguage === 'en' ? `${BASE_URL}${path}` : localizedUrl(locale, path);

  // Alternate language URLs + x-default (default-locale version).
  const alternateUrls: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateUrls[loc] = localizedUrl(loc, path);
  });
  alternateUrls['x-default'] = localizedUrl(defaultLocale, path);

  // Default social image: branded, per-page dynamic OG image (1200x630).
  const ogImage =
    image ??
    `/api/og?${new URLSearchParams({
      title,
      ...(description ? { description } : {}),
      ...(ogBadge ? { badge: ogBadge } : {}),
    }).toString()}`;

  const currentOgLocale = OG_LOCALES[actualContentLanguage] ?? actualContentLanguage;
  const ogAlternateLocales = locales
    .filter((loc) => loc !== actualContentLanguage)
    .map((loc) => OG_LOCALES[loc] ?? loc);

  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls
    },
    openGraph: {
      type,
      url: canonicalUrl,
      siteName: 'AliasVault',
      title,
      description,
      locale: currentOgLocale,
      alternateLocale: ogAlternateLocales,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(tags && { tags })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@AliasVault',
      creator: '@AliasVault',
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };

  return metadata;
}
