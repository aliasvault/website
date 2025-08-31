import Image from "next/image";
import { ContentPost } from "@/lib/blog";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface SingleNewsProps {
  news: ContentPost;
}

const SingleNews = ({ news }: SingleNewsProps) => {
  const t = useTranslations();
  return (
    <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-three dark:bg-gray-dark dark:shadow-none">
      <Link
        href={`/news/${news.slug}`}
        className="relative block aspect-[37/22] w-full"
      >
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
          {news.tags[0]}
        </span>
        <Image
          src={news.image || "/images/blog/blog-placeholder.jpg"}
          alt={t('blogComponent.alt.image')}
          fill
          className="object-cover object-center transition group-hover:rotate-6 group-hover:scale-125"
        />
      </Link>
      <div className="p-8 sm:p-9 md:p-7 xl:p-9">
        <h3>
          <Link
            href={`/news/${news.slug}`}
            className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {news.title}
          </Link>
        </h3>
        <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {news.description}
        </p>
        <div className="flex items-center">
          <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={news.author.image}
                  alt={t('blogComponent.alt.author')}
                  fill
                />
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                {t('blogComponent.by')} {news.author.name}
              </h4>
              <p className="text-xs text-body-color">{news.author.designation}</p>
            </div>
          </div>
          <div className="inline-block">
            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              {t('blogComponent.date')}
            </h4>
            <p className="text-xs text-body-color">{news.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
