import { routing } from '@/i18n/routing'

const baseUrl = () =>
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  'http://localhost:3100'

// Payload passes locale as a Locale object ({ code }) to livePreview/preview,
// but a plain string elsewhere — accept both.
type LocaleArg = string | { code?: string } | undefined

const localeCode = (locale: LocaleArg): string => {
  if (!locale) return routing.defaultLocale
  return typeof locale === 'string' ? locale : locale.code || routing.defaultLocale
}

/**
 * Build the front-end preview URL for a document, honouring the next-intl
 * `as-needed` locale prefix (English at root, Dutch under /nl). Points at the
 * draft-mode preview route which renders the live theme.
 */
export const previewUrl =
  (section: 'help' | 'blog' | 'news') =>
  ({ data, locale }: { data?: Record<string, unknown>; locale?: LocaleArg }) => {
    const loc = localeCode(locale)
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`
    const slug = (data?.slug as string) || ''
    return `${baseUrl()}${prefix}/${section}/${slug}/preview`
  }
