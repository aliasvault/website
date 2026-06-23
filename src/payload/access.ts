import type { Access } from 'payload'

/**
 * Anonymous visitors can only read published documents; authenticated users
 * (and the live-preview/draft-mode context) can read drafts too.
 */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

/** Only logged-in users may create/update/delete content. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Only admins (publish + user management). */
export const adminsOnly: Access = ({ req: { user } }) => user?.role === 'admin'
