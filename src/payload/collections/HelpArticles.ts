import type { CollectionConfig } from 'payload'
import { publishedOrAuthenticated, authenticated, adminsOnly } from '../access'
import { previewUrl } from '../livePreview'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { authorSelectOptions } from '@/lib/authors'
import {
  helpSectionSelectOptions,
  HELP_DEFAULT_SECTION,
  isHelpSectionKey,
} from '@/lib/help-sections'

/**
 * Help articles.
 *
 * Two-layer taxonomy:
 *  - `section` (select, code-owned options from HELP_SECTIONS) — the top-level
 *    theme. Drives the URL `/help/<section>` landing page.
 *  - `group` (free text, content-owned) — clusters articles within a section
 *    on that landing page. Typing a new value creates a new cluster; no code
 *    change needed.
 *
 * Articles render at the flat URL `/help/<slug>`. Because section landings live
 * at `/help/<section>` and share that segment, a slug may not equal a section key
 * (enforced below).
 */
export const HelpArticles: CollectionConfig = {
  slug: 'help-articles',
  labels: { singular: 'Help Article', plural: 'Help' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'group', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: { url: previewUrl('help') },
    preview: (doc, { locale }) => previewUrl('help')({ data: doc as Record<string, unknown>, locale }),
  },
  versions: { drafts: true },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL segment (/help/<slug>). Shared across languages. Cannot equal a section key.',
      },
      validate: (value: unknown) => {
        if (typeof value === 'string' && isHelpSectionKey(value)) {
          return `"${value}" is reserved for a section landing page — choose a different slug.`
        }
        return true
      },
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      defaultValue: HELP_DEFAULT_SECTION,
      options: helpSectionSelectOptions,
      admin: {
        position: 'sidebar',
        description: 'Top-level help section. Defined in code (src/lib/help-sections.ts).',
      },
    },
    {
      name: 'group',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Free-text cluster shown as a heading within the section (e.g. "Getting started", "Browser extension"). Reuse the exact text to group articles together.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Shown in listings and used as the SEO meta description.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'Optional TL;DR (~30–60 words). Rendered as a lead answer at the top of the article and reused for AI/LLM indexing. Falls back to the description.',
      },
    },
    {
      name: 'seoTitle',
      type: 'text',
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'Optional <title> override. Defaults to the article title.',
      },
    },
    { name: 'tags', type: 'text', hasMany: true },
    {
      name: 'related',
      type: 'relationship',
      relationTo: 'help-articles',
      hasMany: true,
      admin: {
        description: 'Hand-picked related articles. When empty, the page falls back to same-section articles.',
      },
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
    },
    {
      name: 'faq',
      type: 'array',
      localized: true,
      labels: { singular: 'FAQ', plural: 'FAQs' },
      admin: {
        description: 'Optional Q&A pairs. Rendered at the bottom and emitted as FAQPage structured data.',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'author',
      type: 'select',
      defaultValue: 'leendert',
      options: authorSelectOptions,
      admin: {
        position: 'sidebar',
        description: 'Byline author. Avatar and title are defined in src/lib/authors.ts.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Sort order within a group (ascending). Ties break alphabetically.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: { position: 'sidebar', description: 'Surface near the top of its section.' },
    },
    {
      name: 'snippetId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional stable id to reuse this answer as an inline help snippet (e.g. in the FAQ).',
      },
    },
    { name: 'updated', type: 'date', admin: { position: 'sidebar' } },
    { name: 'content', type: 'richText', required: true, localized: true },
  ],
}
