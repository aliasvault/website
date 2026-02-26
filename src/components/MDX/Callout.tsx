'use client'

import { ReactNode } from 'react'

export interface CalloutProps {
  /** "released" | "upcoming" | "tip" | "note" – controls icon and colors */
  type?: 'released' | 'upcoming' | 'tip' | 'note'
  /** Optional short title (e.g. "Heads up") */
  title?: string
  children: ReactNode
}

const typeStyles = {
  released:
    'border-primary/30 bg-primary/10 text-body-color dark:bg-primary/5 dark:border-primary/20',
  upcoming:
    'border-gray-300 bg-gray-50 text-body-color dark:border-gray-600 dark:bg-gray-800/50 dark:text-body-color-dark',
  tip: 'border-primary/30 bg-primary/10 text-body-color dark:bg-primary/5 dark:border-primary/20',
  note: 'border-gray-300 bg-gray-50 text-body-color dark:border-gray-600 dark:bg-gray-800/50 dark:text-body-color-dark',
}

const typeLabels = {
  released: 'Released',
  upcoming: 'Coming soon',
  tip: 'Tip',
  note: 'Note',
}

/**
 * Short callout for a single sentence or small paragraph.
 * Use for "We shipped X this week" or "We're working on Y" without a full FeatureBlock.
 */
export default function Callout({
  type = 'note',
  title,
  children,
}: CalloutProps) {
  const label = title ?? typeLabels[type]
  return (
    <div
      className={`my-6 rounded-lg border px-4 py-3 ${typeStyles[type]}`}
      data-callout
    >
      <p className="mb-1 text-sm font-semibold text-black dark:text-white">
        {label}
      </p>
      <div className="text-sm leading-relaxed [&>p]:mb-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
