import Breadcrumb from "@/components/Common/Breadcrumb";
import SectionSpacing from "@/components/Common/SectionSpacing";
import MissionSection from "@/components/Mission/MissionSection";
import Roadmap from "@/components/Mission/Roadmap";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import Page from "@/components/Common/Page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('mission.metadata.title'),
    description: t('mission.metadata.description'),
    path: '/mission',
    locale,
  });
}

export default async function MissionPage() {
  const t = await getTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('mission.breadcrumb.title')}
        description={t('mission.breadcrumb.description')}
      />
      <MissionSection />
      <SectionSpacing withBorder className="pt-16 md:pt-20" />
      <Roadmap />
    </Page>
  );
}
