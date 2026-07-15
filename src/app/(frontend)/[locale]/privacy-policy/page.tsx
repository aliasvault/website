import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import { getTranslations } from "next-intl/server";
import Page from "@/components/Common/Page";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('privacyPolicy.title'),
    description: t('privacyPolicy.description'),
    path: '/privacy-policy',
    locale,
  });
}

const PrivacyPolicyPage = () => {
  const t = useTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('privacyPolicy.title')}
      />
      <PrivacyPolicy />
    </Page>
  );
};

export default PrivacyPolicyPage;
