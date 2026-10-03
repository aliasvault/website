import LegalDocument from "@/components/LegalDocument";
import { termsAndConditions } from "@/lib/legal/terms-and-conditions";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import { getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();

  return (
    <Page>
      <Breadcrumb
        pageName={t('termsAndConditions.title')}
      />
      <LegalDocument doc={termsAndConditions} locale={locale} />
    </Page>
  );
};

export default TermsAndConditionsPage;
