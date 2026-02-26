'use client'

import { ReactNode } from 'react'

export interface FeatureGridProps {
  /** Number of columns on desktop: 2 or 3 */
  columns?: 2 | 3
  children: ReactNode
}

/**
 * Grid of FeatureSpotlight (or other) blocks. Use for "three small updates"
 * in one row so each can be shared as its own social card.
 */
export default function FeatureGrid({
  columns = 2,
  children,
}: FeatureGridProps) {
  return (
    <div
      className={`mb-10 grid gap-6 sm:gap-8 ${columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}
      data-feature-grid
    >
      {children}
    </div>
  )
}
