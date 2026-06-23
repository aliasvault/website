import SingleBlog from "./SingleBlog";
import { getAllBlogAndNewsPosts } from "@/lib/blog";
import SingleNews from "./SingleNews";
import RssIcon from "@/components/Common/RssIcon";
import { getTranslations } from "next-intl/server";

interface RecentBlogAndNewsProps {
  locale: string;
}

const RecentBlogAndNews = async ({ locale }: RecentBlogAndNewsProps) => {
  const posts = await getAllBlogAndNewsPosts(locale);
  const t = await getTranslations();

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container" data-aos="fade-up" data-aos-delay="0">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-black dark:text-white">{t('blogComponent.blogTitle')}</h2>
            <RssIcon />
          </div>
          <p className="text-base text-body-color dark:text-body-color-dark">
            {t('blogComponent.blogDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {posts.slice(0, 3).map((blog) => (
            <div key={blog.slug} className="w-full">
              {blog.type === 'blog' ? (
                <SingleBlog blog={blog} />
              ) : blog.type === 'news' ? (
                <SingleNews news={blog} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogAndNews;
