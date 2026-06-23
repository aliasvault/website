import type { Field } from 'payload'

/**
 * Fields shared by Posts (blog) and News. Cover and author images are Media
 * uploads (relationTo: 'media'); the migration in src/payload/seed.ts imports
 * the original /public files into the Media collection. The frontend resolves a
 * populated media doc back to a /uploads/<filename> path (see src/lib/blog.ts).
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
    type: 'group',
    fields: [
      { name: 'name', type: 'text' },
      { name: 'designation', type: 'text', localized: true },
      { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Author avatar.' } },
    ],
  },
  { name: 'content', type: 'richText', required: true, localized: true },
]
