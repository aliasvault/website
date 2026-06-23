import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Platforms from "@/components/Platforms/Platforms";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import Page from "@/components/Common/Page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('platforms.metadata.title'),
    description: t('platforms.metadata.description'),
    path: '/platforms',
    locale,
  });
}

const PluginsPage = () => {
  const t = useTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('platforms.title')}
        description={t('platforms.pageDescription')}
      />
      <Platforms />
    </Page>
  );
};

export default PluginsPage;