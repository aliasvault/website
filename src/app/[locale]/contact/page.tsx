import Breadcrumb from "@/components/Common/Breadcrumb";
import ContactContent from "@/components/Contact/index";
import AlertBanner from "@/components/AlertBanner";
import StatusUpdateBanner from "@/components/StatusUpdateBanner";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import Page from "@/components/Common/Page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('contact.metadata.title'),
    description: t('contact.metadata.description'),
    path: '/contact',
    locale,
  });
}

const ContactPage = () => {
  const t = useTranslations();

  return (
    <Page>
      <Breadcrumb
        pageName={t('contact.title')}
        description={t('contact.description')}
      />
      <section className="pb-0 pt-8">
        <div className="container">
          <StatusUpdateBanner />
          <AlertBanner />
        </div>
      </section>
      <ContactContent />
    </Page>
  );
};

export default ContactPage;
