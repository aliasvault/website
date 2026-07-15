import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  StatusBannerProvider,
  StatusBannerBar,
  StatusBannerSpacer,
} from "@/components/StatusBanner";
import ScrollToTop from "@/components/ScrollToTop";
import AOSInit from "@/components/AOS/AOSInit";
import { Providers } from "../providers";
import "@/styles/index.css";
import { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from "@/i18n/routing";
import { generateSEOMetadata } from '@/components/SEO/SEOMetadata';
import { siteJsonLd, jsonLdScript } from '@/lib/jsonLd';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  
  const title = t('metadata.title');
  const description = t('metadata.description');
  const seoSuffix = t('metadata.seoSuffix');

  const metadata = generateSEOMetadata({
    title,
    description,
    path: '/',
    locale,
    type: 'website'
  });

  return {
    ...metadata,
    title: {
      default: title,
      template: `%s | ${seoSuffix}`
    }
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, locale)) {
    console.log('Locale not found', locale);
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  // The status banner is fetched client-side (StatusBannerProvider) so a slow
  // status API never blocks this render. The provider feeds both the header bar
  // and the spacer that pushes content below the absolutely-positioned header.
  return (
    <NextIntlClientProvider messages={messages}>
      {/* Site-wide Organization + WebSite entities for search engines and LLMs. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(siteJsonLd(locale)) }}
      />
      <Providers>
        <AOSInit />
        <StatusBannerProvider>
          <Header banner={<StatusBannerBar />} />
          <StatusBannerSpacer />
          {children}
          <Footer />
          <ScrollToTop />
        </StatusBannerProvider>
      </Providers>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}