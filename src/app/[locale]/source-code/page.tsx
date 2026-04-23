import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import Page from "@/components/Common/Page";
import SourceCode from "@/components/SourceCode/SourceCode";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t("sourceCode.metadata.title"),
    description: t("sourceCode.metadata.description"),
    path: "/source-code",
    locale,
  });
}

export default function SourceCodePage() {
  const t = useTranslations();

  return (
    <Page>
      <Breadcrumb pageName={t("sourceCode.title")} description={t("sourceCode.pageDescription")} />
      <SourceCode />
    </Page>
  );
}

