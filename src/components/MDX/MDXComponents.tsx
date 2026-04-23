import Image from 'next/image'
import { GitHubRelease } from '@/components/Common/GitHubRelease'
import ClickableImage from './ClickableImage'
import FeatureBlock from './FeatureBlock'
import FeatureSpotlight from './FeatureSpotlight'
import FeatureGrid from './FeatureGrid'
import UpdateSection from './UpdateSection'
import Callout from './Callout'
import { ComponentProps } from 'react'
import AnchorHeading from '@/components/Common/AnchorHeading'

export const components = {
  GitHubRelease,
  ClickableImage,
  FeatureBlock,
  FeatureSpotlight,
  FeatureGrid,
  UpdateSection,
  Callout,
  a: (props: ComponentProps<'a'>) => (
    <a
      className="text-primary transition-all duration-300 hover:underline"
      {...props}
    />
  ),
  img: (props: ComponentProps<'img'>) => (
    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
      <Image
        src={props.src || ''}
        alt={props.alt || ''}
        fill
        className="object-cover object-center"
      />
    </div>
  ),
  h1: (props: ComponentProps<'h1'>) => (
    <AnchorHeading
      as="h1"
      className="mb-12 mt-8 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl sm:leading-tight"
      {...props}
    />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <AnchorHeading
      as="h2"
      className="mb-8 mt-12 text-xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight"
      {...props}
    />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <AnchorHeading
      as="h3"
      className="mb-6 mt-8 text-lg font-medium leading-tight text-black dark:text-white sm:text-xl sm:leading-tight"
      {...props}
    />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p
      className="mb-6 text-base leading-relaxed text-body-color md:text-lg md:leading-relaxed"
      {...props}
    />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul
      className="mb-6 list-inside list-disc text-body-color"
      {...props}
    />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol
      className="list-decimal list-inside mb-6 text-body-color"
      {...props}
    />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li
      className="mb-2 text-base leading-relaxed text-body-color md:text-lg md:leading-relaxed"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <div className="relative z-10 mb-6 overflow-hidden rounded-lg bg-primary/10 border border-primary/20 p-4 md:p-5 shadow-sm dark:bg-primary/5 dark:border-primary/10">
      <blockquote className="text-left text-base font-medium text-body-color dark:text-body-color-dark [&>p]:mb-0" {...props} />
    </div>
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-50 border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200 [&>code]:bg-transparent [&>code]:p-0" {...props} />
    </div>
  ),
  code: (props: ComponentProps<'code'>) => (
    <code
      className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  hr: (props: ComponentProps<'hr'>) => (
    <hr
      className="my-8 border-0 border-t border-gray-200 dark:border-gray-700"
      {...props}
    />
  ),
}