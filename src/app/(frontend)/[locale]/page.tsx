import AboutSectionOne from "@/components/About/AboutSectionOne";
import CallToAction from "@/components/CallToAction/CallToAction";
import ScrollUp from "@/components/Common/ScrollUp";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";
import SectionSpacing from "@/components/Common/SectionSpacing";
import ScrollHandler from '@/components/ScrollHandler'
import { Suspense } from 'react';
import Video from "@/components/Video";
import RecentBlogAndNews from "@/components/Blog/RecentBlogs";
import { getTranslations } from 'next-intl/server';
import { generatePageSEOMetadata } from '@/lib/seo-utils';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations();
  
  return generatePageSEOMetadata({
    title: t('metadata.title'),
    description: t('metadata.description'),
    path: '/',
    locale,
    type: 'website'
  });
}

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <>
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <ScrollUp />
      <Hero />
      <Video />
      <Features />
      <SectionSpacing withBorder />
      <AboutSectionOne />
      <SectionSpacing className="pt-16" />
      <CallToAction />
      <SectionSpacing withBorder className="pt-16 md:pt-20" />
      <FAQ />
      <SectionSpacing className="pt-16" />
      <RecentBlogAndNews locale={locale} />
    </>
  );
}
