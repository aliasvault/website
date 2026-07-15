import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO/SEOMetadata';

/**
 * Generate SEO metadata for a specific page
 */
export async function generatePageSEOMetadata({
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
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
  image?: string;
  /** Short label shown as a pill on the default dynamic OG image (e.g. "Help Center"). */
  ogBadge?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  contentLanguage?: string;
}): Promise<Metadata> {
  return generateSEOMetadata({
    title,
    description,
    path,
    locale,
    image,
    ogBadge,
    type,
    publishedTime,
    modifiedTime,
    authors,
    tags,
    contentLanguage
  });
}

/**
 * Get the current pathname without locale prefix for SEO purposes
 */
export function getPathWithoutLocale(pathname: string, locale: string): string {
  // Remove locale prefix if present (but not for default locale)
  if (locale !== 'en' && pathname.startsWith(`/${locale}`)) {
    return pathname.slice(`/${locale}`.length) || '/';
  }
  return pathname;
}