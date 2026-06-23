import type { Field } from 'payload'
import { authorSelectOptions } from '@/lib/authors'

/**
 * Fields shared by Posts (blog) and News.
 */
export const articleFields: Field[] = [
  { name: 'title', type: 'text', required: true, localized: true },
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'URL segment, shared across languages.',
    },
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
    localized: true,
    admin: { description: 'Used as the SEO meta description and listing excerpt.' },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: { position: 'sidebar', description: 'Cover image (used in listings and as the social/SEO image).' },
  },
  { name: 'date', type: 'date', required: true, admin: { position: 'sidebar' } },
  { name: 'tags', type: 'text', hasMany: true },
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
  { name: 'content', type: 'richText', required: true, localized: true },
]
