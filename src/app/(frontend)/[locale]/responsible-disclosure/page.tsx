import Breadcrumb from "@/components/Common/Breadcrumb";
import ResponsibleDisclosureContent from "@/components/ResponsibleDisclosure/index";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import Page from "@/components/Common/Page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('responsibleDisclosure.metadata.title'),
    description: t('responsibleDisclosure.metadata.description'),
    path: '/responsible-disclosure',
    locale,
  });
}

const ResponsibleDisclosurePage = () => {
  const t = useTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('responsibleDisclosure.title')}
        description={t('responsibleDisclosure.description')}
      />
      <ResponsibleDisclosureContent />
    </Page>
  );
};

export default ResponsibleDisclosurePage;