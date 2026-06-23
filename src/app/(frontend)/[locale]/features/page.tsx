import ScrollUp from "@/components/Common/ScrollUp";
import SectionSpacing from "@/components/Common/SectionSpacing";
import { Metadata } from "next";
import { Suspense } from 'react';
import ScrollHandler from '@/components/ScrollHandler';
import Breadcrumb from "@/components/Common/Breadcrumb";
import FeatureSection from "@/components/FeatureSection";
import { getLocalizedFeaturesData } from "@/components/FeatureSection/getLocalizedFeaturesData";
import CallToAction from "@/components/CallToAction/CallToAction";
import { getTranslations } from "next-intl/server";
import { generatePageSEOMetadata } from '@/lib/seo-utils';
import Page from "@/components/Common/Page";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();

  return generatePageSEOMetadata({
    title: t('features.metadata.title'),
    description: t('features.metadata.description'),
    path: '/features',
    locale,
    type: 'website'
  });
}

export default async function Features() {
  const t = await getTranslations();
  const localizedFeatureCategories = getLocalizedFeaturesData(t);

  return (
    <Page>
      <Breadcrumb
        pageName={t('features.title')}
        description={t('features.pageDescription')}
      />
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <ScrollUp />

      {/* Feature Sections */}
      <div className="bg-gray-50 dark:bg-black">
        {localizedFeatureCategories.map((category, index) => (
          <FeatureSection
            key={index}
            title={category.title}
            description={category.description}
            features={category.features}
            imageSrc={category.imageSrc}
            imageAlt={category.imageAlt}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>

      {/* Legend Section */}
      <section className="py-10 md:py-16" data-aos="fade-up" data-aos-delay="0">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center">
              <div className="mr-3 flex h-[50px] w-[50px] items-center justify-center rounded-md bg-green-500 bg-opacity-10 text-green-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-base text-gray-700 dark:text-gray-300">{t('features.legend.available')}</span>
            </div>
            <div className="flex items-center">
              <div className="mr-3 flex h-[50px] w-[50px] items-center justify-center rounded-md bg-primary-500 bg-opacity-10 text-primary-500">
                <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-base text-gray-700 dark:text-gray-300">{t('features.legend.comingSoon')}</span>
            </div>
            <div className="flex items-center">
              <div className="mr-3 flex h-[50px] w-[50px] items-center justify-center rounded-md bg-red-500 bg-opacity-10 text-red-500">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-base text-gray-700 dark:text-gray-300">{t('features.legend.notAvailable')}</span>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-base text-gray-700 dark:text-gray-300">
              {t('features.legend.roadmapText')}{" "}
              <a
                href="https://github.com/aliasvault/aliasvault/issues/731"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                {t('features.legend.roadmapLink')}
              </a>
            </p>
          </div>
        </div>
      </section>

      <SectionSpacing withBorder />

      <CallToAction />

    </Page>
  );
}