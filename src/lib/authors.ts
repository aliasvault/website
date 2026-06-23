/**
 * Single source of truth for article authors.
 *
 * Payload stores only the author *key* (a `select` value on Posts/News). The
 * avatar and per-locale designation are defined here once, instead of being
 * re-uploaded and re-typed on every article. Add a new author by adding an
 * entry below — the Payload select options and the rendered byline both derive
 * from this map.
 */

export type AuthorKey = 'leendert'

/** Render-ready author, resolved for a specific locale. */
export interface ResolvedAuthor {
  name: string
  image: string
  designation: string
}

interface AuthorDef {
  name: string
  /** Avatar path under /public. Shared across all articles by this author. */
  image: string
  /** Designation per locale; falls back to `en` when a locale is missing. */
  designation: Record<string, string>
}

export const AUTHORS: Record<AuthorKey, AuthorDef> = {
  leendert: {
    name: 'Leendert de Borst',
    image: '/images/founder/founder.jpg',
    designation: { en: 'Founder', nl: 'Oprichter' },
  },
}

/** Options for the Payload `author` select — kept in sync with AUTHORS. */
export const authorSelectOptions = (Object.entries(AUTHORS) as [AuthorKey, AuthorDef][]).map(
  ([value, a]) => ({ label: a.name, value }),
)

const FALLBACK_AVATAR = '/images/founder/founder.jpg'

/** Resolve a stored author key to a render-ready author for the given locale. */
export function resolveAuthor(
  key: string | null | undefined,
  locale: string = 'en',
): ResolvedAuthor {
  const def = key ? AUTHORS[key as AuthorKey] : undefined
  if (!def) {
    return { name: '', image: FALLBACK_AVATAR, designation: '' }
  }
  return {
    name: def.name,
    image: def.image,
    designation: def.designation[locale] ?? def.designation.en ?? '',
  }
}

/** Best-effort reverse lookup (name → key), used by the content migration. */
export function authorKeyForName(name: string | null | undefined): AuthorKey | undefined {
  if (!name) return undefined
  const match = (Object.entries(AUTHORS) as [AuthorKey, AuthorDef][]).find(
    ([, a]) => a.name === name,
  )
  return match?.[0] ?? 'leendert'
}
