import type { CollectionConfig } from 'payload'
import {
  BoldFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { publishedOrAuthenticated, authenticated, adminsOnly } from '../access'
import { revalidateFaqsAfterChange, revalidateFaqsAfterDelete } from '../hooks/revalidate'
import {
  FAQ_CATEGORY_ANCHOR_PREFIX,
  FAQ_DEFAULT_CATEGORY,
  faqCategorySelectOptions,
  faqPlacementSelectOptions,
} from '@/lib/faq-categories'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * Frequently asked questions.
 *
 * One document per question. All published questions appear on /faq, grouped by
 * `category` (options defined in code: src/lib/faq-categories.ts). `showOn` picks
 * which questions also appear on the homepage and the pricing page.
 *
 * `slug` is the link anchor (`/faq#<slug>`, `/#<slug>`, `/pricing#<slug>`), so
 * changing it breaks existing links to that question.
 */
export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'showOn', 'order', '_status'],
    group: 'Content',
    listSearchableFields: ['question', 'slug'],
  },
  defaultSort: 'order',
  versions: { drafts: true },
  hooks: { afterChange: [revalidateFaqsAfterChange], afterDelete: [revalidateFaqsAfterDelete] },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  fields: [
    { name: 'question', type: 'text', required: true, localized: true },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      localized: true,
      // Short answers only: paragraphs, emphasis, links, lists and inline code.
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          InlineCodeFeature(),
          LinkFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Link anchor, e.g. "self-hosting" → /faq#self-hosting. Shared across languages. Changing it breaks existing links.',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !SLUG_PATTERN.test(value)) {
          return 'Use lowercase letters, numbers and single dashes (e.g. "export-data").'
        }
        if (value.startsWith(FAQ_CATEGORY_ANCHOR_PREFIX)) {
          return `"${FAQ_CATEGORY_ANCHOR_PREFIX}…" is reserved for category anchors on /faq.`
        }
        return true
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: FAQ_DEFAULT_CATEGORY,
      options: faqCategorySelectOptions,
      admin: {
        position: 'sidebar',
        description: 'Section on /faq. Categories are defined in code (src/lib/faq-categories.ts).',
      },
    },
    {
      name: 'showOn',
      type: 'select',
      hasMany: true,
      options: faqPlacementSelectOptions,
      defaultValue: ['faq'],
      admin: {
        position: 'sidebar',
        description: 'Pages that show this question. Leave empty to keep it published but hidden.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description:
          'Lower numbers come first: within the category on /faq and on the homepage/pricing lists. Leave gaps (10, 20, …) to insert questions later.',
      },
    },
    {
      name: 'related',
      type: 'relationship',
      relationTo: 'help-articles',
      admin: {
        position: 'sidebar',
        description: 'Optional Help article shown as a "Learn more" link under the answer.',
      },
    },
  ],
}
