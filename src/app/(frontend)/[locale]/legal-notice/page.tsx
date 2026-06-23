import LegalNotice from "@/components/LegalNotice";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import { getTranslations } from "next-intl/server";
import Page from "@/components/Common/Page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('legalNotice.title'),
    description: t('legalNotice.description'),
    path: '/legal-notice',
    locale,
  });
}

const LegalNoticePage = () => {
  return (
    <Page>
      <Breadcrumb
        pageName="Legal Notice"
      />
      <LegalNotice />
    </Page>
  );
};

export default LegalNoticePage;
