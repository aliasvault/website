import type { CollectionConfig } from 'payload'
import { publishedOrAuthenticated, authenticated, adminsOnly } from '../access'
import { previewUrl } from '../livePreview'
import { articleFields } from './articleFields'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News Item', plural: 'News' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: { url: previewUrl('news') },
    preview: (doc, { locale }) => previewUrl('news')({ data: doc as Record<string, unknown>, locale }),
  },
  versions: { drafts: true },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  fields: articleFields,
}
