import React from "react";
import { getTranslations } from "next-intl/server";

interface Milestone {
  month: string;
  label: string;
  text: string;
  detail?: string;
}

interface MilestoneListProps {
  milestones: Milestone[];
  side: "left" | "right";
  isCurrentYear: boolean;
  currentMonth: number;
  wereHereLabel: string;
}

function MilestoneList({
  milestones,
  side,
  isCurrentYear,
  currentMonth,
  wereHereLabel,
}: MilestoneListProps) {
  return (
    <ul className={`mt-8 max-w-sm space-y-6 ${side === "left" ? "ml-auto" : "mr-auto"}`}>
      {milestones.map((m, i) => {
        const isNow =
          isCurrentYear &&
          Math.floor((parseInt(m.month) - 1) / 3) === Math.floor((currentMonth - 1) / 3);

        return (
          <li key={i} className="relative text-base text-body-color">
            {m.label && <span className="font-medium">{m.label}: </span>}
            {m.text}
            {m.detail && (
              <span className="mt-2 block text-sm !leading-relaxed text-body-color/80">
                {m.detail}
              </span>
            )}
            {isNow && (
              <span
                className={`absolute top-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white ${
                  side === "left" ? "left-full ml-4" : "right-full mr-4"
                }`}
              >
                {wereHereLabel}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default async function Roadmap() {
  const t = await getTranslations();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // Create timeline from translations
  const timeline = [
    {
      year: "2024",
      milestones: t.raw('mission.roadmap.years.2024.milestones'),
    },
    {
      year: "2025",
      milestones: t.raw('mission.roadmap.years.2025.milestones'),
    },
    {
      year: "2026",
      milestones: t.raw('mission.roadmap.years.2026.milestones'),
    },
    {
      year: "2027",
      milestones: t.raw('mission.roadmap.years.2027.milestones'),
    },
    {
      year: "2028",
      milestones: t.raw('mission.roadmap.years.2028.milestones'),
    },
  ];

  return (
    <section className="mt-20">
      <div className="container">
        <h2 className="mb-4 text-center text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
          {t('mission.roadmap.title')}
        </h2>
        <p className="mx-auto max-w-3xl text-center text-base !leading-relaxed text-body-color md:text-lg">
          {t('mission.roadmap.description')} <a href="https://github.com/aliasvault/aliasvault/issues/731" className="text-primary">{t('mission.roadmap.githubLinkText')}</a>.
        </p>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-primary/20" />

          <div className="space-y-24">
            {timeline.map((yearBlock, yearIdx) => {
              const isLeft = yearIdx % 2 === 0;
              const yearNumber = parseInt(yearBlock.year);

              return (
                <div
                  key={yearBlock.year}
                  className="relative grid grid-cols-2 items-start"
                >
                  {/* Center dot per year */}
                  <div className="absolute left-1/2 top-4 -translate-x-1/2 transform">
                    <div className="h-4 w-4 rounded-full bg-primary" />
                  </div>

                  {isLeft ? (
                    <>
                      {/* Content Left */}
                      <div className="col-span-1 pr-8 text-right">
                        <h3 className="text-2xl mt-2 font-bold text-black dark:text-white">
                          {yearBlock.year}
                        </h3>
                        {yearBlock.milestones && (
                          <MilestoneList
                            milestones={yearBlock.milestones}
                            side="left"
                            isCurrentYear={yearNumber === currentYear}
                            currentMonth={currentMonth}
                            wereHereLabel={t('mission.roadmap.wereHere')}
                          />
                        )}
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div className="col-span-1 pl-8 text-left">
                        <h3 className="text-2xl mt-2 font-bold text-black dark:text-white">
                          {yearBlock.year}
                        </h3>
                        {yearBlock.milestones && (
                          <MilestoneList
                            milestones={yearBlock.milestones}
                            side="right"
                            isCurrentYear={yearNumber === currentYear}
                            currentMonth={currentMonth}
                            wereHereLabel={t('mission.roadmap.wereHere')}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
