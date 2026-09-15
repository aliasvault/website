import { getTranslations } from "next-intl/server";
import CtaBlock from "@/components/Common/CtaBlock";

/**
 * Small full-width CTA on the mission page pointing to the separate roadmap page.
 * Keeps `/mission#roadmap` working for older links that pointed at the
 * timeline when it still lived on this page.
 */
export default async function RoadmapLink() {
  const t = await getTranslations();

  return (
    <section id="roadmap" className="mt-16 scroll-mt-24 md:mt-20">
      <div className="container">
        <CtaBlock
          headingAs="h2"
          title={t('mission.roadmapLink.title')}
          description={t('mission.roadmapLink.description')}
          buttonLabel={t('mission.roadmapLink.viewRoadmap')}
          href="/roadmap"
        />
      </div>
    </section>
  );
}
