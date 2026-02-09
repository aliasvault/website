import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const AccountDeletion = () => {
  const t = useTranslations("accountDeletion");

  return (
    <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="space-y-8">
          <div>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("lastUpdated")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t("howToRequest.title")}
            </h3>
            <p className="mb-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("howToRequest.intro")}
            </p>
            <ul className="list-inside list-disc space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li>
                <strong>{t("howToRequest.option1.title")}</strong>{" "}
                {t("howToRequest.option1.description")}
              </li>
              <li>
                <strong>{t("howToRequest.option2.title")}</strong>{" "}
                {t("howToRequest.option2.description")}{" "}
                <a
                  href="mailto:contact@support.aliasvault.net"
                  className="text-primary hover:underline"
                >
                  contact@support.aliasvault.net
                </a>
                {t("howToRequest.option2.suffix")}
              </li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("howToRequest.permanent")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t("whatIsDeleted.title")}
            </h3>
            <ul className="list-inside list-disc space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li>{t("whatIsDeleted.profile")}</li>
              <li>{t("whatIsDeleted.content")}</li>
              <li>{t("whatIsDeleted.userData")}</li>
              <li>{t("whatIsDeleted.identifiers")}</li>
              <li>{t("whatIsDeleted.backups")}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t("whatMayBeRetained.title")}
            </h3>
            <ul className="list-inside list-disc space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li>{t("whatMayBeRetained.fraudPrevention")}</li>
              <li>{t("whatMayBeRetained.offsiteBackups")}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t("retentionPeriod.title")}
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("retentionPeriod.description")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t("processingTime.title")}
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("processingTime.description")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t("developerInfo.title")}
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("developerInfo.description")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t("whyGoogle.title")}
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("whyGoogle.description")}
            </p>
          </div>

          <div>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("moreInfo")}{" "}
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                {t("privacyPolicyLink")}
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountDeletion;
