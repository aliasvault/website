import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiDownload, FiGlobe, FiPackage, FiSmartphone } from "react-icons/fi";
import { FaApple } from "react-icons/fa";
import AnchorHeading from "@/components/Common/AnchorHeading";
import Card from "@/components/Common/Card";
import IconTile from "@/components/Common/IconTile";
import LinkList from "@/components/Common/LinkList";
import { buttonClasses } from "@/components/Common/Button";

const browserIcon = (file: string) => (
  <Image src={`/images/browser-icons/${file}`} alt="" width={24} height={24} className="h-6 w-6" />
);

const Platforms = () => {
  const t = useTranslations();

  return (
    <section className="pt-9 pb-4">
      <div className="container">
        <div className="space-y-10 lg:space-y-12">
          <Card padding="lg">
            <div className="mb-4 flex items-center gap-4">
              <IconTile>
                <FiGlobe className="h-6 w-6" />
              </IconTile>
              <AnchorHeading
                as="h3"
                id="web-app"
                copyLabel={t("platforms.share.copyLink", { section: t("platforms.webApp.title") })}
                className="text-xl font-bold text-black dark:text-white sm:text-2xl"
              >
                {t("platforms.webApp.title")}
              </AnchorHeading>
            </div>
            <p className="mb-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("platforms.webApp.description")} {t("platforms.webApp.noInstallNote")}
            </p>

            <div className="flex flex-col items-start gap-3">
              <a
                href="https://app.aliasvault.com"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ fullWidth: true, className: "sm:w-auto" })}
              >
                {t("platforms.webApp.linkText")}
              </a>
              <div className="text-sm text-body-color dark:text-body-color-dark">
                {t("platforms.webApp.selfHostLinkText")}{" "}
                <a
                  href="https://docs.aliasvault.com/installation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {t("sourceCode.sections.selfHosting.installationLinkText")}
                </a>
                .
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <IconTile>
                    <FiPackage className="h-6 w-6" />
                  </IconTile>
                  <AnchorHeading
                    as="h3"
                    id="browser-extensions"
                    copyLabel={t("platforms.share.copyLink", { section: t("platforms.browserExtensions.title") })}
                    className="text-xl font-bold text-black dark:text-white sm:text-2xl"
                  >
                    {t("platforms.browserExtensions.title")}
                  </AnchorHeading>
                </div>
                <p className="mb-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                  {t("platforms.browserExtensions.description")}
                </p>

                <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                  {t("platforms.browserExtensions.featuresTitle")}
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 text-base font-medium text-body-color dark:text-body-color-dark">
                  <li>{t("platforms.browserExtensions.features.autofill")}</li>
                  <li>{t("platforms.browserExtensions.features.aliases")}</li>
                  <li>{t("platforms.browserExtensions.features.offline")}</li>
                  <li>{t("platforms.browserExtensions.features.save")}</li>
                </ul>
              </div>

              <LinkList
                nested
                items={[
                  {
                    title: "Chrome",
                    description: "Chrome Web Store",
                    href: "https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj",
                    external: true,
                    icon: browserIcon("chrome.svg"),
                    ariaLabel: "Chrome Web Store",
                  },
                  {
                    title: "Firefox",
                    description: "Firefox Add-ons",
                    href: "https://addons.mozilla.org/en-US/firefox/addon/aliasvault/",
                    external: true,
                    icon: browserIcon("firefox.svg"),
                    ariaLabel: "Firefox extension",
                  },
                  {
                    title: "Edge",
                    description: "Edge Add-ons",
                    href: "https://microsoftedge.microsoft.com/addons/detail/aliasvault/kabaanafahnjkfkplbnllebdmppdemfo",
                    external: true,
                    icon: browserIcon("edge.svg"),
                    ariaLabel: "Microsoft Edge extension",
                  },
                  {
                    title: "Safari",
                    description: "App Store",
                    href: "https://apps.apple.com/app/id6743163173",
                    external: true,
                    icon: browserIcon("safari.svg"),
                    ariaLabel: "Safari extension",
                  },
                  {
                    title: "Brave",
                    description: "Chrome Web Store",
                    href: "https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj",
                    external: true,
                    icon: browserIcon("brave.svg"),
                    ariaLabel: "Brave extension",
                  },
                ]}
              />
            </div>
          </Card>

          <Card padding="lg">
            <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <IconTile>
                    <FiSmartphone className="h-6 w-6" />
                  </IconTile>
                  <AnchorHeading
                    as="h3"
                    id="mobile-apps"
                    copyLabel={t("platforms.share.copyLink", { section: t("platforms.mobileApps.title") })}
                    className="text-xl font-bold text-black dark:text-white sm:text-2xl"
                  >
                    {t("platforms.mobileApps.title")}
                  </AnchorHeading>
                </div>
                <p className="mb-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                  {t("platforms.mobileApps.description")}
                </p>

                <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                  {t("platforms.mobileApps.featuresTitle")}
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 text-base font-medium text-body-color dark:text-body-color-dark">
                  <li>{t("platforms.mobileApps.features.passwordsPasskeys")}</li>
                  <li>{t("platforms.mobileApps.features.biometric")}</li>
                  <li>{t("platforms.mobileApps.features.offline")}</li>
                  <li>{t("platforms.mobileApps.features.integration")}</li>
                  <li>{t("platforms.mobileApps.features.sync")}</li>
                </ul>
              </div>

              <LinkList
                nested
                items={[
                  {
                    id: "ios",
                    title: "App Store",
                    description: t("platforms.mobileApps.iosLabel"),
                    href: "https://apps.apple.com/app/id6745490915",
                    external: true,
                    icon: <FaApple className="h-6 w-6 text-black dark:text-white" />,
                    ariaLabel: t("platforms.mobileApps.appStoreAlt"),
                  },
                  {
                    id: "android",
                    title: "Google Play",
                    description: t("platforms.mobileApps.androidLabel"),
                    href: "https://play.google.com/store/apps/details?id=net.aliasvault.app",
                    external: true,
                    icon: <Image src="/images/app-store/android.svg" alt="" width={24} height={24} className="h-6 w-6" />,
                    ariaLabel: t("platforms.mobileApps.playStoreAlt"),
                  },
                  {
                    title: "F-Droid",
                    description: t("platforms.mobileApps.androidLabel"),
                    href: "https://f-droid.org/packages/net.aliasvault.app/",
                    external: true,
                    icon: (
                      <Image src="/images/store-icons/fdroid.svg" alt="" width={24} height={24} className="h-6 w-6" />
                    ),
                    ariaLabel: t("platforms.mobileApps.fDroidAlt"),
                  },
                  {
                    title: "Obtainium",
                    description: t("platforms.mobileApps.androidLabel"),
                    href: "https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/{%22id%22:%22net.aliasvault.app%22,%22url%22:%22https://github.com/aliasvault/aliasvault%22,%22author%22:%22AliasVault%22,%22name%22:%22AliasVault%22,%22additionalSettings%22:%22{\\%22about\\%22:\\%22Privacy-first%20Password%20Manager%20with%20Built-in%20Email%20Aliasing.\\%22}%22}",
                    external: true,
                    icon: (
                      <Image src="/images/store-icons/obtainium.png" alt="" width={24} height={24} className="h-6 w-6" />
                    ),
                    ariaLabel: t("platforms.mobileApps.obtainiumAlt"),
                  },
                ]}
              />
            </div>
          </Card>

          <Card padding="lg">
            <div className="mb-4 flex items-center gap-4">
              <IconTile>
                <FiDownload className="h-6 w-6" />
              </IconTile>
              <AnchorHeading
                as="h3"
                id="downloads"
                copyLabel={t("platforms.share.copyLink", { section: t("platforms.downloads.title") })}
                className="text-xl font-bold text-black dark:text-white sm:text-2xl"
              >
                {t("platforms.downloads.title")}
              </AnchorHeading>
            </div>
            <p className="mb-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("platforms.downloads.description")}
            </p>
            <a
              href="https://downloads.aliasvault.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-primary/70 dark:focus-visible:ring-offset-gray-900"
            >
              {t("platforms.downloads.linkText")}
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Platforms;