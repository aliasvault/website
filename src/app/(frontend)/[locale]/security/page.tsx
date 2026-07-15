import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Page from "@/components/Common/Page";
import { generatePageSEOMetadata } from "@/lib/seo-utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t("trustAndSecurity.metadata.title"),
    description: t("trustAndSecurity.metadata.description"),
    path: "/security",
    locale,
  });
}

const LOCATION_KEYS = ["main", "backup", "website", "status"] as const;

const TrustAndSecurityPage = () => {
  const t = useTranslations("trustAndSecurity");

  return (
    <Page>
      <Breadcrumb pageName={t("title")} description={t("pageDescription")} />

      <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
        <div className="container">
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                {t("encryption.title")}
              </h3>
              <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {t("encryption.intro")}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                <li>{t("encryption.points.keys")}</li>
                <li>{t("encryption.points.emails")}</li>
                <li>{t("encryption.points.server")}</li>
              </ul>
              <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {t("encryption.docsText")}{" "}
                <a
                  href="https://docs.aliasvault.com/architecture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t("encryption.docsLinkText")}
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                {t("infrastructure.title")}
              </h3>
              <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {t("infrastructure.intro")}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {LOCATION_KEYS.map((key) => (
                  <li key={key}>
                    <span className="font-semibold text-black dark:text-white">
                      {t(`infrastructure.locations.${key}.name`)}
                    </span>
                    {": "}
                    {t(`infrastructure.locations.${key}.detail`)}
                    {key === "status" && (
                      <>
                        {" "}
                        <a
                          href="https://status.aliasvault.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          status.aliasvault.com
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {t("infrastructure.gdpr")}
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                {t("backups.title")}
              </h3>
              <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {t("backups.intro")}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                <li>{t("backups.points.frequency")}</li>
                <li>{t("backups.points.encrypted")}</li>
                <li>{t("backups.points.offsite")}</li>
                <li>{t("backups.points.replication")}</li>
              </ul>
              <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {t("backups.statusText")}{" "}
                <a
                  href="https://status.aliasvault.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t("backups.statusLinkText")}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default TrustAndSecurityPage;
