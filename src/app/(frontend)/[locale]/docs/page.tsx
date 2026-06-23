import Documentation from "@/components/Docs/Documentation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  return generatePageSEOMetadata({
    title: t('docs.title'),
    description: t('docs.description'),
    path: '/docs',
    locale,
  });
}

const DocsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Documentation"
      />
      <Documentation />
    </>
  );
};

export default DocsPage;
