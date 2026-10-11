import { FiEdit2 } from 'react-icons/fi'
import { getCurrentUser } from '@/payload/auth'
import { buttonClasses } from '@/components/Common/Button'

interface AdminEditButtonProps {
  collection: 'posts' | 'news' | 'help-articles'
  id: string | number
  locale: string
}

/**
 * Floating "Edit in admin" shortcut, rendered only for logged-in Payload users
 * (same `payload-token` cookie as /admin). Bottom-left (offset past the Next.js dev indicator), so it doesn't collide
 * with ScrollToTop on the right. Anonymous visitors get nothing.
 */
export default async function AdminEditButton({ collection, id, locale }: AdminEditButtonProps) {
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <a
      href={`/admin/collections/${collection}/${id}?locale=${locale}`}
      // Inside the Live Preview iframe, open the editor in the whole window, not nested in the frame.
      target="_top"
      className={buttonClasses({ size: 'sm', className: 'fixed bottom-5 left-[4.5rem] z-[99] shadow-lg' })}
    >
      <FiEdit2 aria-hidden="true" className="h-4 w-4" />
      Edit in admin
    </a>
  )
}
