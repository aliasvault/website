'use client'

import { ReactNode } from 'react'

export interface UpdateSectionProps {
  /** Section title, e.g. "Released this month" or "Coming up" */
  title: string
  /** Optional subtitle or date range */
  subtitle?: string
  /** "released" | "upcoming" | "in-progress" – affects accent styling */
  variant?: 'released' | 'upcoming' | 'in-progress'
  children: ReactNode
}

const variantStyles = {
  released:
    'border-l-4 border-primary bg-primary/5 dark:bg-primary/10',
  upcoming:
    'border-l-4 border-gray-400 bg-gray-50 dark:border-gray-500 dark:bg-gray-800/50',
  'in-progress':
    'border-l-4 border-primary-400 bg-primary/5 dark:border-primary-500 dark:bg-primary/10',
}

/**
 * Wraps a group of features with a section title. Use to separate
 * "Released this month" from "What we're working on" in monthly updates.
 */
export default function UpdateSection({
  title,
  subtitle,
  variant = 'released',
  children,
}: UpdateSectionProps) {
  return (
    <section className="mb-14" data-update-section>
      <div
        className={`mb-6 rounded-r-lg px-5 py-4 ${variantStyles[variant]}`}
      >
        <h2 className="text-xl font-bold text-black dark:text-white sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-body-color dark:text-body-color-dark">
            {subtitle}
          </p>
        )}
      </div>
      <div className="space-y-10">{children}</div>
    </section>
  )
}
