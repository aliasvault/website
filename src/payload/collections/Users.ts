import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  // Lock the account for 10 minutes after 5 failed logins.
  auth: { maxLoginAttempts: 5, lockTime: 1000 * 60 * 10 },
  admin: { useAsTitle: 'email', group: 'Admin' },
  access: {
    // Only logged-in users can read the user list.
    read: ({ req }) => Boolean(req.user),
    // Only admins may create or delete users; users may edit themselves, admins may edit anyone.
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user }, id }) => user?.role === 'admin' || user?.id === id,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      // Only admins may set or change a role.
      access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      options: [
        { label: 'Editor (can create & edit drafts)', value: 'editor' },
        { label: 'Admin (can publish & manage users)', value: 'admin' },
      ],
    },
  ],
}
