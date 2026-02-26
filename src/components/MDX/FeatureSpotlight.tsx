'use client'

import Image from 'next/image'

export interface FeatureSpotlightProps {
  /** Image path – use a square or 4:3 for best social previews */
  src: string
  alt: string
  /** Short headline (e.g. "Did you know we now support X?") – ideal for X/social copy */
  headline: string
  /** Optional one or two sentences; keep it punchy for sharing */
  description?: string
  /** Optional badge: "New" | "Coming soon" | "Beta" – shown above the image */
  badge?: 'New' | 'Coming soon' | 'Beta' | 'Released'
}

/**
 * Compact, shareable feature card. Each spotlight works as its own social post:
 * headline + image (+ optional description). Use for "did you know we added X?" style updates.
 */
export default function FeatureSpotlight({
  src,
  alt,
  headline,
  description,
  badge,
}: FeatureSpotlightProps) {
  return (
    <figure
      className="group mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-dark dark:shadow-none dark:hover:shadow-md"
      data-feature-spotlight
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {badge && (
          <span
            className={
              badge === 'Coming soon'
                ? 'absolute right-3 top-3 rounded-full bg-gray-700/90 px-3 py-1 text-xs font-medium text-white dark:bg-gray-600'
                : badge === 'Beta'
                  ? 'absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white'
                  : 'absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white'
            }
          >
            {badge}
          </span>
        )}
      </div>
      <figcaption className="p-4 md:p-5">
        <h3 className="mb-2 text-lg font-semibold leading-snug text-black dark:text-white md:text-xl">
          {headline}
        </h3>
        {description && (
          <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark md:text-base">
            {description}
          </p>
        )}
      </figcaption>
    </figure>
  )
}
