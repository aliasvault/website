import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const sectionFor = (slug: string): 'kb' | 'blog' | 'news' =>
  slug === 'posts' ? 'blog' : slug === 'news' ? 'news' : 'kb'

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
  const { revalidatePath } = await import('next/cache')
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
