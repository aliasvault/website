import Breadcrumb from "@/components/Common/Breadcrumb";
import Timeline from "@/components/Roadmap/Timeline";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import Page from "@/components/Common/Page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('roadmap.metadata.title'),
    description: t('roadmap.metadata.description'),
    path: '/roadmap',
    locale,
  });
}

/**
 * Roadmap page.
 */
export default async function RoadmapPage() {
  const t = await getTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('roadmap.breadcrumb.title')}
        description={t('roadmap.breadcrumb.description')}
      />
      <Timeline />
    </Page>
  );
}
