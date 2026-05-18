'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function scrollToHashIfNeeded() {
  const hash = window.location.hash
  if (!hash) return

  const id = hash.substring(1)
  const element = document.getElementById(id)
  if (!element) return

  // FAQ accordions handle their own hash scrolling (open + scroll on deeplink).
  if (element.closest('#faq, #pricing-faq')) return

  setTimeout(() => {
    element.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

export default function ScrollHandler() {
  const searchParams = useSearchParams()

  useEffect(() => {
    scrollToHashIfNeeded()
  }, [searchParams])

  useEffect(() => {
    const onHashChange = () => scrollToHashIfNeeded()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return null
}