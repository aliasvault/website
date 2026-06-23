import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/uploads',
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 768 },
      { name: 'hero', width: 1600 },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', type: 'text', localized: true },
    {
      name: 'sourcePath',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        description: 'Original /public path imported during migration (dedup key). Leave empty for admin uploads.',
      },
    },
  ],
}
