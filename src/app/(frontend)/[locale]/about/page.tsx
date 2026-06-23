import AboutSectionOne from "@/components/About/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Page from "@/components/Common/Page";
import Founder from "@/components/Founder";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generatePageSEOMetadata } from '@/lib/seo-utils';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();

  return generatePageSEOMetadata({
    title: t('about.metadata.title'),
    description: t('about.metadata.description'),
    path: '/about',
    locale,
    type: 'website'
  });
}

const AboutPage = async () => {
  const t = await getTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('about.title')}
        description={t('about.pageDescription')}
      />
      <AboutSectionOne />
      <Founder />
    </Page>
  );
};

export default AboutPage;
