import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Page from "@/components/Common/Page";
import SupportUs from "@/components/SupportUs/SupportUs";
import { generatePageSEOMetadata } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t("supportUs.metadata.title"),
    description: t("supportUs.metadata.description"),
    path: "/support-us",
    locale,
  });
}

export default function SupportUsPage() {
  const t = useTranslations();

  return (
    <Page>
      <Breadcrumb pageName={t("supportUs.title")} description={t("supportUs.pageDescription")} />
      <SupportUs />
    </Page>
  );
}
