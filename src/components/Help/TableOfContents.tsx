'use client'

import { useEffect, useState } from 'react'
import type { TocHeading } from '@/lib/lexical'

/**
 * "On this page" navigation for an article. Sticky on large screens, with a
 * scroll-spy that highlights the section currently in view.
 */
export default function TableOfContents({
  headings,
  label,
}: {
  headings: TocHeading[]
  label: string
}) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? '')

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav aria-label={label} className="text-sm">
      <p className="mb-4 font-semibold text-black dark:text-white">{label}</p>
      <ul className="space-y-2 border-l border-body-color border-opacity-20 dark:border-white dark:border-opacity-20">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-7' : 'pl-4'}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 py-0.5 transition-colors ${
                active === h.id
                  ? 'border-primary font-medium text-primary'
                  : 'border-transparent text-body-color hover:text-primary'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
