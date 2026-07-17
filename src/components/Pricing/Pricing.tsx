"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import PricingFAQ from "./PricingFAQ";
import { PREMIUM_AVAILABILITY_FAQ_HASH } from "./pricingFaqData";

const PANEL_BASE =
  "rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800/50 lg:p-8";

type PlanId = "free" | "premium" | "family";
type FeatureVariant = "included" | "limited" | "excluded";

type PlanFeature = {
  key: string;
  variant: FeatureVariant;
};

type PlanConfig = {
  id: PlanId;
  features: PlanFeature[];
  badgeAbove?: string;
  recommended?: boolean;
  comingSoon?: boolean;
  cta?: { label: string; href: string; external?: boolean };
};

function getPanelClass(plan: Pick<PlanConfig, "recommended" | "comingSoon">) {
  if (plan.comingSoon) {
    return `${PANEL_BASE} border border-dashed border-gray-300 dark:border-gray-600`;
  }
  if (plan.recommended) {
    return `${PANEL_BASE} border-2 border-primary/50 shadow-sm dark:border-primary/40`;
  }
  return `${PANEL_BASE} border border-gray-200 dark:border-gray-800`;
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-green-500 ${className}`.trim()}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function MinusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-body-color/70 dark:text-body-color-dark/80 ${className}`.trim()}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function LimitIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 ${className}`.trim()}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function FeatureRow({ variant, label }: { variant: FeatureVariant; label: string }) {
  const Icon = variant === "excluded" ? MinusIcon : variant === "limited" ? LimitIcon : CheckIcon;
  const textClass =
    variant === "excluded"
      ? "text-body-color/80 dark:text-body-color-dark/80"
      : "text-body-color dark:text-body-color-dark";

  return (
    <li className={`flex gap-2.5 text-base font-medium leading-relaxed ${textClass}`}>
      <Icon className="mt-1 shrink-0" />
      <span>{label}</span>
    </li>
  );
}

function PlanCard({
  plan,
  t,
}: {
  plan: PlanConfig;
  t: ReturnType<typeof useTranslations<"pricing">>;
}) {
  const planKey = plan.id;
  const ctaClass = plan.recommended
    ? "bg-primary text-white hover:bg-primary/90"
    : "border border-gray-300 text-dark hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800/50";

  return (
    <div className="flex h-full flex-col">
      {plan.badgeAbove ? (
        <p
          className={`mb-2 text-center text-sm font-bold uppercase tracking-wider ${
            plan.comingSoon ? "text-body-color dark:text-body-color-dark" : "text-primary"
          }`}
        >
          {plan.badgeAbove}
        </p>
      ) : (
        <p className="mb-2 h-5" aria-hidden />
      )}

      <article className={`flex flex-1 flex-col ${getPanelClass(plan)}`}>
        <h3 className="text-xl font-bold text-black dark:text-white sm:text-2xl">
          {t(`plans.${planKey}.name`)}
        </h3>

        <div className="mt-4">
          <p
            className={`text-3xl font-bold tabular-nums leading-none sm:text-4xl ${
              plan.comingSoon ? "text-body-color dark:text-body-color-dark" : "text-black dark:text-white"
            }`}
          >
            {t(`plans.${planKey}.price`)}
          </p>
        </div>

        <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
          {t(`plans.${planKey}.description`)}
        </p>

        {plan.cta ? (
          plan.cta.external ? (
            <a
              href={plan.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-base font-semibold transition-colors ${ctaClass}`}
            >
              {plan.cta.label}
            </a>
          ) : (
            <Link
              href={plan.cta.href}
              className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-base font-semibold transition-colors ${ctaClass}`}
            >
              {plan.cta.label}
            </Link>
          )
        ) : plan.comingSoon ? (
          <a
            href={`#${PREMIUM_AVAILABILITY_FAQ_HASH}`}
            className="mt-6 flex h-12 items-center justify-center rounded-xl border border-dashed border-primary/35 text-sm font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-primary/5 dark:border-primary/40 dark:hover:bg-primary/10"
          >
            {t(`plans.${planKey}.comingSoonLabel`)}
          </a>
        ) : (
          <span className="mt-6 block h-12" aria-hidden />
        )}

        <ul className="mt-6 flex-1 space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
          {plan.features.map((feature) => (
            <FeatureRow
              key={feature.key}
              variant={feature.variant}
              label={t(`plans.${planKey}.features.${feature.key}`)}
            />
          ))}
        </ul>
      </article>
    </div>
  );
}

function ApproachItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-black dark:text-white sm:text-2xl">{title}</h3>
      <p className="whitespace-pre-line text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">{body}</p>
    </div>
  );
}

export default function Pricing() {
  const t = useTranslations("pricing");

  const plans: PlanConfig[] = [
    {
      id: "free",
      recommended: true,
      features: [
        { key: "allFeatures", variant: "included" },
        { key: "passwordManagement", variant: "included" },
        { key: "emailAliases", variant: "included" },
        { key: "builtIn2FA", variant: "included" },
        { key: "fullOfflineMode", variant: "included" },
        { key: "sync", variant: "included" },
        { key: "fairUseAliases", variant: "limited" },
        { key: "fairUseEmailStorage", variant: "limited" },
      ],
      cta: { label: t("plans.free.cta"), href: "https://app.aliasvault.com", external: true },
    },
    {
      id: "premium",
      badgeAbove: t("plans.premium.badge"),
      comingSoon: true,
      features: [
        { key: "allFeatures", variant: "included" },
        { key: "higherLimits", variant: "included" },
        { key: "vipAliasDomains", variant: "included" },
        { key: "oneAccount", variant: "included" },
      ],
    },
    {
      id: "family",
      badgeAbove: t("plans.family.badge"),
      comingSoon: true,
      features: [
        { key: "allPremium", variant: "included" },
        { key: "higherLimits", variant: "included" },
        { key: "sixAccounts", variant: "included" },
      ],
    },
  ];

  const approachKeys = ["freeVersion", "premiumAfterV1"] as const;

  return (
    <section className="pt-9">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-16 md:space-y-20">
          <div className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6">
              {plans.map((plan) => (
                <div key={plan.id}>
                  <PlanCard plan={plan} t={t} />
                </div>
              ))}
            </div>

            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <span className="font-semibold text-black dark:text-white">{t("selfHost.title")}</span>{" "}
              {t("selfHost.body")}{" "}
              <Link href="/source-code" className="text-primary hover:underline">
                {t("selfHost.cta")}
              </Link>
            </p>
          </div>

        </div>
      </div>

      <div className="container mt-16 md:mt-20">
        <section className="mx-auto max-w-3xl space-y-8 border-t border-gray-200 pt-16 dark:border-gray-800 md:pt-20">
          <h2 className="text-center text-2xl font-bold text-black dark:text-white sm:text-3xl md:text-4xl">
            {t("approach.title")}
          </h2>
          <p className="whitespace-pre-line text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
            {t("approach.intro")}
          </p>
          {approachKeys.map((key) => (
            <div key={key}>
              <ApproachItem title={t(`approach.${key}.title`)} body={t(`approach.${key}.body`)} />
            </div>
          ))}
        </section>
      </div>

      <div className="mt-16 bg-gray-light py-16 dark:bg-bg-color-dark md:mt-20 md:py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-6xl" data-aos="fade-up" data-aos-delay="0">
            <PricingFAQ className="!mb-0" />
          </div>
        </div>
      </div>

      <div className="container mt-16 md:mt-20">
        <div className="mx-auto max-w-6xl">
          <section
            id="support-development"
            className="mx-auto max-w-3xl scroll-mt-28 space-y-6 text-center"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-black dark:text-white sm:text-3xl md:text-4xl">{t("support.title")}</h2>
              <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                {t("support.body")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a
                href="https://opencollective.com/aliasvault"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary/90"
              >
                {t("support.donateOpenCollective")}
              </a>
              <a
                href="https://www.buymeacoffee.com/lanedirt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center"
              >
                <Image
                  src="/images/contact/buymeacoffee.png"
                  alt={t("support.donateBuyMeACoffeeAlt")}
                  width={180}
                  height={50}
                />
              </a>
            </div>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <Link href="/contact" className="text-primary hover:underline">
                {t("support.contactLink")}
              </Link>
              {" · "}
              <Link href="/mission" className="text-primary hover:underline">
                {t("support.missionLink")}
              </Link>
              {" · "}
              <Link href="/features" className="text-primary hover:underline">
                {t("support.featuresLink")}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
