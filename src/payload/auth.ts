import { headers as nextHeaders } from 'next/headers'
import type { User } from '@/payload-types'
import { getPayloadClient } from './client'

/**
 * Resolve the currently authenticated Payload user from the request's
 * `payload-token` cookie (the same cookie set by logging into /admin).
 * Returns null for anonymous visitors.
 *
 * Used to gate the draft/live-preview routes: only logged-in editors/admins
 * may view unpublished content.
 */
export async function getCurrentUser(): Promise<User | null> {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await nextHeaders() })
  return (user as User) ?? null
}
