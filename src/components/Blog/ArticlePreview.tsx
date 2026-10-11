import RichText from '@/components/Lexical/RichText'
import RefreshOnSave from '@/components/Lexical/RefreshOnSave'
import type { ContentPost } from '@/lib/blog'
import SingleBlog from '@/components/Blog/SingleBlog'
import SingleNews from '@/components/Blog/SingleNews'

/**
 * In-theme preview of a blog/news article (drafts included), used by the Payload
 * Live Preview iframe. Intentionally simpler than the public article layout.
 */
export default function ArticlePreview({ post }: { post: ContentPost }) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100'
  return (
    <section className="pb-[120px] pt-[150px]">
      <RefreshOnSave serverURL={serverURL} />
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div className="mb-8 rounded-sm border border-primary bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
              Preview — {post.type} draft rendered in the live theme.
            </div>
            <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
              {post.title}
            </h1>
            <p className="mb-10 border-b border-body-color border-opacity-10 pb-4 text-base text-body-color dark:border-white dark:border-opacity-10">
              {[post.author?.name, post.date].filter(Boolean).join(' · ')}
            </p>
            <RichText data={post.content} />
          </div>
        </div>

        {/* Collapsed by default so it never obstructs the article. Native <details>
            keeps its open state across RefreshOnSave's router.refresh(). */}
        <details className="group/list mt-16 border-t border-body-color border-opacity-10 pt-6 dark:border-white dark:border-opacity-10">
          <summary className="cursor-pointer select-none text-sm font-medium text-primary">
            <span className="group-open/list:hidden">Show</span>
            <span className="hidden group-open/list:inline">Hide</span> list preview
          </summary>
          {/* Same column widths as the /blog grid so truncation and image crop match. */}
          <div className="-mx-4 mt-8 flex flex-wrap">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              {post.type === 'blog' ? <SingleBlog blog={post} /> : <SingleNews news={post} />}
            </div>
          </div>
        </details>
      </div>
    </section>
  )
}
