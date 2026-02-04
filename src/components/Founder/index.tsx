import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Founder = () => {
  const t = useTranslations();
  
  return (
    <section className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        {/* Added header section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[45px] mb-4">
            {t('founder.title')}
          </h2>
          <p className="text-base text-body-color md:text-lg">
            {t('founder.subtitle')}
          </p>
        </div>

        <div className="mx-auto">
          {/* Quote content wrapper */}
          <div className="wow fadeInUp relative bg-white dark:bg-gray-800/50 rounded-2xl p-8 md:p-12 shadow-lg">
            {/* Large quote mark */}
            <span className="absolute -left-4 -top-4 text-7xl text-primary/30 select-none">&quot;</span>

            {/* Quote text */}
            <div className="space-y-6 text-base leading-relaxed text-body-color sm:text-lg sm:leading-relaxed pl-6">
              <p>
                {t('founder.story.paragraph1')}
              </p>
              <p>
                {t('founder.story.paragraph1b')}
              </p>
              <p>
                {t('founder.story.paragraph2')}
              </p>
              <p>
                {t('founder.story.paragraph3')}
              </p>
              <p>
                {t('founder.story.paragraph4')}{" "}
                <Link href="/mission" className="text-primary">
                  {t('founder.story.missionLink')}
                </Link>{" "}
                {t('founder.story.paragraph4End')}
              </p>
            </div>

            {/* Author info */}
            <div className="mt-10 flex items-center border-t pt-6 dark:border-gray-700">
              <div className="mr-4 h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary/20">
                <Image
                  src="/images/founder/founder.jpg"
                  alt={t('founder.alt.founderImage')}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h5 className="text-xl font-semibold text-dark dark:text-white">
                  {t('founder.founderName')}
                </h5>
                <p className="text-sm text-body-color">{t('founder.founderTitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
