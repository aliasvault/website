import type { CollectionConfig } from 'payload'
import { publishedOrAuthenticated, authenticated, adminsOnly } from '../access'
import { previewUrl } from '../livePreview'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const KnowledgeBase: CollectionConfig = {
  slug: 'knowledge-base',
  labels: { singular: 'KB Article', plural: 'Knowledge Base' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: { url: previewUrl('kb') },
    preview: (doc, { locale }) => previewUrl('kb')({ data: doc as Record<string, unknown>, locale }),
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
        description: 'URL segment. Shared across languages (English & Dutch use the same slug).',
      },
    },
    { name: 'category', type: 'text', required: true, localized: true },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Shown in listings and used as the SEO meta description.' },
    },
    { name: 'tags', type: 'text', hasMany: true },
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
