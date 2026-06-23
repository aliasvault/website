'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Minimal Payload Live Preview integration: when an editor saves in /admin, the
 * admin iframe posts a message; we re-fetch the server component so the preview
 * reflects the latest draft in the real theme. Avoids a separate live-preview dep.
 */
export default function RefreshOnSave({ serverURL }: { serverURL: string }) {
  const router = useRouter()
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin === serverURL && event.data?.type === 'payload-live-preview') {
        router.refresh()
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [router, serverURL])
  return null
}
