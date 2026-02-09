import AccountDeletion from "@/components/AccountDeletion/AccountDeletion";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import { getTranslations } from "next-intl/server";
import Page from "@/components/Common/Page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t("accountDeletion.title"),
    description: t("accountDeletion.description"),
    path: "/account-deletion",
    locale,
  });
}

const AccountDeletionPage = async () => {
  const t = await getTranslations("accountDeletion");

  return (
    <Page>
      <Breadcrumb pageName={t("title")} />
      <AccountDeletion />
    </Page>
  );
};

export default AccountDeletionPage;
