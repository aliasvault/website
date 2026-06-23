import type { CollectionConfig } from 'payload'
import { publishedOrAuthenticated, authenticated, adminsOnly } from '../access'
import { previewUrl } from '../livePreview'
import { articleFields } from './articleFields'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: { url: previewUrl('blog') },
    preview: (doc, { locale }) => previewUrl('blog')({ data: doc as Record<string, unknown>, locale }),
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
    ...articleFields,
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'default',
      admin: { position: 'sidebar', description: "'full' hides the sidebar." },
      options: [
        { label: 'Default (with sidebar)', value: 'default' },
        { label: 'Full width', value: 'full' },
      ],
    },
  ],
}
