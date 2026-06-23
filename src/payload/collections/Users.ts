import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email', group: 'Admin' },
  access: {
    // Only logged-in users can read the user list.
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Editor (can create & edit drafts)', value: 'editor' },
        { label: 'Admin (can publish & manage users)', value: 'admin' },
      ],
    },
  ],
}
