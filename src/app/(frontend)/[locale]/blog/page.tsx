import { getAllBlogAndNewsPosts } from '@/lib/blog'
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import SingleNews from '@/components/Blog/SingleNews';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import RssIcon from '@/components/Common/RssIcon';
import { generatePageSEOMetadata } from '@/lib/seo-utils';

// Blog/news posts come from the Payload database (runtime-only), so render this
// listing per request instead of prerendering it at build time.
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();

  return generatePageSEOMetadata({
    title: t('blogPage.metadata.title'),
    description: t('blogPage.metadata.description'),
    path: '/blog',
    locale,
    type: 'website'
  });
}

const ITEMS_PER_PAGE = 12;

interface BlogPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function Blog({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const allPosts = await getAllBlogAndNewsPosts(locale);
  const totalPages = Math.ceil(allPosts.length / ITEMS_PER_PAGE);
  const t = await getTranslations();

  // Calculate the posts to show for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <>
      <Breadcrumb
        pageName={t('blogPage.breadcrumb.title')}
        description={t('blogPage.breadcrumb.description')}
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black dark:text-white">{t('blogComponent.latestPosts')}</h2>
            <RssIcon />
          </div>
          <div className="-mx-4 flex flex-wrap">
            {currentPosts.map((post) => (
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

          {totalPages > 1 && (
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <ul className="flex items-center justify-center pt-8">
                  <li className="mx-1">
                    <Link
                      href={`/blog?page=${Math.max(1, currentPage - 1)}`}
                      className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      {t('blogComponent.prev')}
                    </Link>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className="mx-1">
                      <Link
                        href={`/blog?page=${page}`}
                        className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'bg-body-color bg-opacity-[15%] text-body-color hover:bg-primary hover:bg-opacity-100 hover:text-white'
                        }`}
                      >
                        {page}
                      </Link>
                    </li>
                  ))}

                  <li className="mx-1">
                    <Link
                      href={`/blog?page=${Math.min(totalPages, currentPage + 1)}`}
                      className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      {t('blogComponent.next')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
