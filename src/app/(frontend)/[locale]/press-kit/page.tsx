import Breadcrumb from "@/components/Common/Breadcrumb";
import Page from "@/components/Common/Page";
import PressKitContent from "@/components/PressKit";
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
    title: t('pressKit.metadata.title'),
    description: t('pressKit.metadata.description'),
    path: '/press-kit',
    locale,
    type: 'website'
  });
}

const PressKitPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('pressKit.title')}
        description={t('pressKit.pageDescription')}
      />
      <PressKitContent locale={locale} />
    </Page>
  );
};

export default PressKitPage;