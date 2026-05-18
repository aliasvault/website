import Breadcrumb from "@/components/Common/Breadcrumb";
import Page from "@/components/Common/Page";
import Pricing from "@/components/Pricing/Pricing";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t("pricing.title"),
    description: t("pricing.description"),
    path: "/pricing",
    locale,
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <Page>
      <Breadcrumb pageName={t("pricing.title")} description={t("pricing.pageDescription")} />
      <Pricing />
    </Page>
  );
}
