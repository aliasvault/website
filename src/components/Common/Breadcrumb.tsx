import Link from "next/link";
import { useTranslations } from "next-intl";
import { GlowOrb } from "@/components/Common/Decor";

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description?: string;
}) => {
  const t = useTranslations();
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className={`w-full px-4 md:w-8/12 lg:w-7/12 ${!description ? 'mb-0' : ''}`}>
              <div className={`max-w-[570px] ${description ? 'mb-8 md:mb-0 lg:mb-12' : 'mb-0'}`}>
                <h1 className={`${!description ? 'mb-0' : 'mb-5'} text-2xl font-bold text-black dark:text-white sm:text-3xl`}>
                  {pageName}
                </h1>
                {description && (
                  <p className="text-base font-medium leading-relaxed text-body-color">
                    {description}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full px-4 md:w-4/12 lg:w-5/12">
              <div className="text-end">
                <ul className="flex items-center md:justify-end">
                  <li className="flex items-center">
                    <Link
                      href="/"
                      className="pr-1 text-base font-medium text-body-color hover:text-primary"
                    >
                      {t('common.home')}
                    </Link>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                  </li>
                  <li className="text-base font-medium text-primary">
                    {pageName}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <GlowOrb tone="orange" size="32rem" className="-right-44 -top-60 -z-10 opacity-20 dark:opacity-[0.14]" />
        <GlowOrb tone="gold" size="18rem" className="-left-32 -top-16 -z-10 opacity-[0.10] dark:opacity-[0.08]" />
      </section>
    </>
  );
};

export default Breadcrumb;
