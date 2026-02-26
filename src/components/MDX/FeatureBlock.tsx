'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

export interface FeatureBlockProps {
  /** Image path (e.g. /images/blog/feature-x.png) */
  src: string
  alt: string
  /** "left" = image left, text right; "right" = image right, text left */
  side: 'left' | 'right'
  /** Optional caption below the image (good for social sharing context) */
  caption?: string
  /** Optional short title above the text (e.g. feature name) */
  title?: string
  /** Text content – use MDX children */
  children: ReactNode
}

/**
 * A paragraph block with a screenshot on either the left or right.
 * Use for monthly updates: one feature per block, each block is shareable as its own visual.
 */
export default function FeatureBlock({
  src,
  alt,
  side,
  caption,
  title,
  children,
}: FeatureBlockProps) {
  return (
    <article
      className="mb-12 flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-start lg:gap-10"
      data-feature-block
    >
      <div
        className={
          side === 'right'
            ? 'lg:order-2 lg:flex-shrink-0 lg:w-[45%]'
            : 'lg:flex-shrink-0 lg:w-[45%]'
        }
      >
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-dark">
          <div className="relative aspect-video w-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          {caption && (
            <p className="border-t border-gray-100 px-4 py-3 text-sm text-body-color dark:border-gray-700 dark:text-body-color-dark">
              {caption}
            </p>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="mb-3 text-lg font-semibold text-black dark:text-white sm:text-xl">
            {title}
          </h3>
        )}
        <div className="text-base leading-relaxed text-body-color md:text-lg [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:mb-3 [&>ul]:list-inside [&>ul]:list-disc">
          {children}
        </div>
      </div>
    </article>
  )
}
