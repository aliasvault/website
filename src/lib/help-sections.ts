/**
 * Help top-level sections — the product-owned layer.
 *
 * Sections are the stable, top-level themes of the help area (the cards on the
 * `/help` home and the landing pages at `/help/<key>`). They are defined here in
 * code — not in the CMS — because they are few, stable, and need bespoke
 * ordering/icons (and sometimes custom landing copy).
 *
 * Within a section, articles are clustered by the free-text `group` field in
 * Payload (see the HelpArticles collection) — that layer IS content-managed.
 *
 * Single source of truth: the Payload `section` select options are derived from
 * this list (see HelpArticles.ts), so the two never drift. Labels and
 * descriptions live in next-intl messages under `help.sections.<key>` so they
 * can be translated per locale.
 *
 * This module is pure data (no React/JSX) so it can be imported by both the
 * Payload config and the front-end. Icons are referenced by key and mapped to
 * components in `HelpSectionIcon`. To add a section later, add an entry here
 * plus its `help.sections.<key>` messages (and an icon key if needed).
 */

export type HelpSectionIconKey = 'rocket' | 'grid' | 'shield' | 'card' | 'users' | 'book'

export interface HelpSection {
  /** URL segment and stored `section` value. Must never collide with an article slug. */
  key: string
  /** Icon key, mapped to a component in HelpSectionIcon. */
  icon: HelpSectionIconKey
  /** Sort order on the home grid (ascending). */
  order: number
}

export const HELP_SECTIONS: readonly HelpSection[] = [
  { key: 'get-started', icon: 'rocket', order: 1 },
  { key: 'using-aliasvault', icon: 'grid', order: 2 },
  { key: 'security', icon: 'shield', order: 3 },
] as const

/** All sections, sorted for display. */
export const helpSectionsSorted = (): HelpSection[] => [...HELP_SECTIONS].sort((a, b) => a.order - b.order)

const SECTION_KEYS = new Set(HELP_SECTIONS.map((s) => s.key))

/** Is this slug a reserved section key? Used to disambiguate /help/[slug]. */
export const isHelpSectionKey = (slug: string): boolean => SECTION_KEYS.has(slug)

export const getHelpSection = (key: string): HelpSection | undefined =>
  HELP_SECTIONS.find((s) => s.key === key)

/** Payload `select` options for the article `section` field — kept in sync here. */
export const helpSectionSelectOptions = helpSectionsSorted().map((s) => ({
  // Human-readable fallback label for the admin UI; the public site uses the
  // localized `help.sections.<key>.title` message instead.
  label: s.key
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' '),
  value: s.key,
}))

export const HELP_DEFAULT_SECTION = 'using-aliasvault'
