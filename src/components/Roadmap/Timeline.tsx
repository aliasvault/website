import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { SiGithub } from "react-icons/si";
import Card from "@/components/Common/Card";
import CtaBlock from "@/components/Common/CtaBlock";

type Bucket = "now" | "next" | "later";
type Status = Bucket | "shipped";

interface Milestone {
  month: string;
  label: string;
  status: Status;
  text: string;
  detail?: string;
}

interface Item extends Milestone {
  year: string;
  quarter: number;
}

const YEARS = ["2024", "2025", "2026", "2027", "2028"];

/** Quarter index used to sort milestones chronologically. */
function quarterIndex(year: number, month: number): number {
  return year * 4 + Math.floor((month - 1) / 3);
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42L8.5 12.09l6.79-6.8a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const bucketStyles: Record<Bucket, { dot: string; highlight: boolean; card: string }> = {
  now: {
    dot: "bg-primary",
    highlight: true,
    card: "border-l-4 border-l-primary dark:border-l-primary",
  },
  next: {
    dot: "bg-primary/40",
    highlight: false,
    card: "",
  },
  later: {
    dot: "bg-gray-400 dark:bg-gray-500",
    highlight: false,
    card: "",
  },
};

/** "Now" is shown in a highlighted card; the other buckets are plain sections. */
function BucketWrapper({ id, highlight, children }: { id: string; highlight: boolean; children: ReactNode }) {
  return highlight ? (
    <Card as="section" id={id} variant="highlight" className="scroll-mt-24">
      {children}
    </Card>
  ) : (
    <section id={id} className="scroll-mt-24">
      {children}
    </section>
  );
}

/**
 * Roadmap bucket component.
 */
export default async function Timeline() {
  const t = await getTranslations();

  const items: Item[] = YEARS.flatMap((year) => {
    const milestones = (t.raw(`roadmap.timeline.years.${year}.milestones`) as Milestone[]) ?? [];
    return milestones.map((m) => ({
      ...m,
      status: m.status ?? "later",
      year,
      quarter: quarterIndex(parseInt(year), parseInt(m.month)),
    }));
  });

  const shipped = items.filter((i) => i.status === "shipped").sort((a, b) => b.quarter - a.quarter);
  const buckets: Record<Bucket, Item[]> = {
    now: items.filter((i) => i.status === "now"),
    next: items.filter((i) => i.status === "next"),
    later: items.filter((i) => i.status === "later"),
  };

  const shippedByYear = shipped.reduce<Record<string, Item[]>>((acc, item) => {
    (acc[item.year] ??= []).push(item);
    return acc;
  }, {});
  const shippedYears = Object.keys(shippedByYear).sort((a, b) => parseInt(b) - parseInt(a));

  const columns: Bucket[] = ["now", "next", "later"];

  return (
    <section className="pb-8 pt-8">
      <div className="container">
        {/* Now / Next / Later */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {columns.map((bucket) => {
            const style = bucketStyles[bucket];
            const list = buckets[bucket];
            const compact = bucket === "later";
            return (
              <BucketWrapper key={bucket} id={bucket} highlight={style.highlight}>
                <div className="mb-2 flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${style.dot}`} aria-hidden="true" />
                  <h3 className="text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    {t(`roadmap.timeline.sections.${bucket}.title`)}
                  </h3>
                </div>
                <p className="mb-5 text-base text-body-color dark:text-body-color-dark">
                  {t(`roadmap.timeline.sections.${bucket}.subtitle`)}
                </p>

                {list.length === 0 ? (
                  <Card variant="dashed" padding="sm" className="text-base text-body-color dark:text-body-color-dark">
                    {t("roadmap.timeline.empty")}
                  </Card>
                ) : (
                  <ul className="space-y-4">
                    {list.map((item) => (
                      <Card
                        as="li"
                        key={`${item.year}-${item.label}`}
                        padding="sm"
                        className={style.card}
                      >
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary">
                          {item.label} {item.year}
                        </p>
                        <p className="text-lg font-semibold leading-snug text-black dark:text-white">
                          {item.text}
                        </p>
                        {!compact && item.detail && (
                          <p className="mt-3 text-base !leading-relaxed text-body-color dark:text-body-color-dark">
                            {item.detail}
                          </p>
                        )}
                      </Card>
                    ))}
                  </ul>
                )}
              </BucketWrapper>
            );
          })}
        </div>

        {/* Technical details on GitHub */}
        <CtaBlock
          className="mt-12"
          icon={SiGithub}
          title={t("roadmap.timeline.github.title")}
          description={t("roadmap.timeline.github.description")}
          buttonLabel={t("roadmap.timeline.github.button")}
          href="https://github.com/aliasvault/aliasvault/issues/731"
          external
        />

        {/* Shipped */}
        <div className="mt-16 border-t border-body-color/[.15] pt-16 dark:border-white/[.15]">
          <Card as="section" id="shipped" padding="lg" className="scroll-mt-24">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                <CheckIcon className="h-4 w-4" />
              </span>
              <h3 className="text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                {t("roadmap.timeline.sections.shipped.title")}
              </h3>
            </div>
            <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
              {t("roadmap.timeline.sections.shipped.subtitle")}
            </p>

            <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
              {shippedYears.map((year) => (
                <div key={year}>
                  <h4 className="mb-4 text-lg font-bold text-black dark:text-white">{year}</h4>
                  <ul className="space-y-4">
                    {shippedByYear[year].map((item) => (
                      <li key={`${item.year}-${item.label}`} className="flex items-start gap-3">
                        <CheckIcon className="mt-1 shrink-0 text-green-500" />
                        <div>
                          <p className="text-base font-medium text-body-color dark:text-body-color-dark">
                            {item.text}
                          </p>
                          <p className="text-sm text-body-color/70 dark:text-body-color-dark/70">
                            {item.label} {item.year}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
