import TermsAndConditions from "@/components/TermsAndConditions";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Page from "@/components/Common/Page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('termsAndConditions.title'),
    description: t('termsAndConditions.description'),
    path: '/terms-and-conditions',
    locale,
  });
}

const TermsAndConditionsPage = () => {
  const t = useTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('termsAndConditions.title')}
      />
      <TermsAndConditions />
    </Page>
  );
};

export default TermsAndConditionsPage;
