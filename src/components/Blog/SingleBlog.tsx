import Image from "next/image";
import { ContentPost } from "@/lib/blog";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface SingleBlogProps {
  blog: ContentPost;
}

const SingleBlog = ({ blog }: SingleBlogProps) => {
  const t = useTranslations();
  return (
    <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-three dark:bg-gray-dark dark:shadow-none">
      <Link
        href={`/blog/${blog.slug}`}
        className="relative block aspect-[37/22] w-full"
      >
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
          {blog.tags[0]}
        </span>
        <Image
          src={blog.image || "/images/blog/blog-placeholder.jpg"}
          alt={t('blogComponent.alt.image')}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 67vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-center transition group-hover:rotate-6 group-hover:scale-125"
        />
      </Link>
      <div className="p-8 sm:p-9 md:p-7 xl:p-9">
        <h3>
          <Link
            href={`/blog/${blog.slug}`}
            className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {blog.title}
          </Link>
        </h3>
        <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {blog.description}
        </p>
        <div className="flex items-center">
          <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={blog.author.image}
                  alt={t('blogComponent.alt.author')}
                  fill
                  sizes="40px"
                />
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                {t('blogComponent.by')} {blog.author.name}
              </h4>
              <p className="text-xs text-body-color">{blog.author.designation}</p>
            </div>
          </div>
          <div className="inline-block">
            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              {t('blogComponent.date')}
            </h4>
            <p className="text-xs text-body-color">{blog.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
