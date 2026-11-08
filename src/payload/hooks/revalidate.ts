import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const sectionFor = (slug: string): 'help' | 'blog' | 'news' =>
  slug === 'posts' ? 'blog' : slug === 'news' ? 'news' : 'help'

// next-intl `as-needed`: English at root, Dutch under /nl.
function pathsFor(section: string, slug?: string): string[] {
  const bases = ['', '/nl']
  const paths = bases.map((b) => `${b}/${section}`)
  if (slug) bases.forEach((b) => paths.push(`${b}/${section}/${slug}`))
  paths.push('/sitemap.xml')
  return paths
}

async function revalidate(paths: string[]) {
  // Imported dynamically so the config never pulls next/cache at load time
  // (it's only valid within a Next request/runtime, which is where hooks fire).
  let revalidatePath: (path: string) => void
  try {
    ;({ revalidatePath } = await import('next/cache'))
  } catch {
    return // not running inside Next (e.g. a CLI migration)
  }
  for (const p of paths) {
    try {
      revalidatePath(p)
    } catch {
      /* outside a render scope (e.g. seeding) — safe to ignore */
    }
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, collection }) => {
  await revalidate(pathsFor(sectionFor(collection.slug), doc?.slug))
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection }) => {
  await revalidate(pathsFor(sectionFor(collection.slug), doc?.slug))
  return doc
}

// FAQ questions appear on /faq, the homepage and the pricing page (EN + NL).
const FAQ_PATHS = ['', '/nl'].flatMap((b) => [b || '/', `${b}/faq`, `${b}/pricing`])

export const revalidateFaqsAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidate(FAQ_PATHS)
  return doc
}

export const revalidateFaqsAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidate(FAQ_PATHS)
  return doc
}
