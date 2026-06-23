import { getBlogPostsByTag } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import SingleBlog from '@/components/Blog/SingleBlog'
import SingleNews from '@/components/Blog/SingleNews'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { getTranslations } from 'next-intl/server'
import { generatePageSEOMetadata } from '@/lib/seo-utils'

// Tag results are queried from the Payload database (runtime-only) — render per
// request rather than at build time.
export const dynamic = 'force-dynamic'

interface TagPageProps {
  params: Promise<{
    tag: string
    locale: string
  }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag, locale } = await params
  const posts = await getBlogPostsByTag(tag, locale)
  const t = await getTranslations({ locale })

  if (posts.length === 0) {
    return generatePageSEOMetadata({
      title: t('tagPage.notFound.title'),
      description: t('tagPage.notFound.description'),
      path: `/blog/tag/${tag}`,
      locale,
    })
  }

  return generatePageSEOMetadata({
    title: t('tagPage.metadata.titleTemplate', { tag }),
    description: t('tagPage.metadata.descriptionTemplate', { tag }),
    path: `/blog/tag/${tag}`,
    locale,
  })
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag, locale } = await params
  const posts = await getBlogPostsByTag(tag, locale)
  const t = await getTranslations()

  if (posts.length === 0) {
    notFound()
  }

  return (
    <>
      <Breadcrumb
        pageName={t('tagPage.breadcrumb.titleTemplate', { tag })}
        description={t('tagPage.breadcrumb.descriptionTemplate', { tag })}
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                {post.type === 'blog' ? (
                  <SingleBlog blog={post} />
                ) : (
                  <SingleNews news={post} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}