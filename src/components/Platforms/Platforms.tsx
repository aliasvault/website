import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiDownload, FiGlobe, FiPackage, FiSmartphone } from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import AnchorHeading from "@/components/Common/AnchorHeading";

const SectionIconTile = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-inset ring-primary/15">
    {children}
  </span>
);

interface PlatformLink {
  name: string;
  /** Where the link leads, e.g. the store name — the scannable "available on" info. */
  sublabel: string;
  href: string;
  icon: React.ReactNode;
  aria?: string;
  /** Optional anchor id, to keep existing deep links working. */
  id?: string;
}

/** Platform link list. */
const PlatformLinkList = ({ links }: { links: PlatformLink[] }) => (
  <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-three dark:divide-white/[0.06] dark:border-gray-700/60 dark:bg-white/[0.03] dark:shadow-none">
    {links.map((link) => (
      <li key={link.name} id={link.id}>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.aria ?? link.name}
          className="group flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-primary/[0.09] focus-visible:bg-primary/[0.09] focus-visible:outline-none dark:hover:bg-primary/[0.06] dark:focus-visible:bg-primary/[0.06]"
        >
          <span className="flex min-w-0 items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-light dark:bg-white/10">
              {link.icon}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold text-black dark:text-white">{link.name}</span>
              <span className="mt-0.5 block truncate text-xs text-body-color dark:text-body-color-dark">
                {link.sublabel}
              </span>
            </span>
          </span>
          <FiArrowRight className="h-4 w-4 shrink-0 text-primary opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </a>
      </li>
    ))}
  </ul>
);

const browserIcon = (file: string) => (
  <Image src={`/images/browser-icons/${file}`} alt="" width={24} height={24} className="h-6 w-6" />
);

const Platforms = () => {
  const t = useTranslations();

  return (
    <section className="pt-9 pb-4">
      <div className="container">
        <div className="space-y-10 lg:space-y-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-three dark:border-gray-800 dark:bg-gray-dark dark:shadow-none lg:p-8">
            <div className="mb-4 flex items-center gap-4">
              <SectionIconTile>
                <FiGlobe className="h-6 w-6" />
              </SectionIconTile>
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
                className="inline-flex w-full items-center justify-center rounded-3xl bg-primary px-7 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 sm:w-auto"
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
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-three dark:border-gray-800 dark:bg-gray-dark dark:shadow-none lg:p-8">
            <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <SectionIconTile>
                    <FiPackage className="h-6 w-6" />
                  </SectionIconTile>
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

              <PlatformLinkList
                links={[
                  {
                    name: "Chrome",
                    sublabel: "Chrome Web Store",
                    href: "https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj",
                    icon: browserIcon("chrome.svg"),
                    aria: "Chrome Web Store",
                  },
                  {
                    name: "Firefox",
                    sublabel: "Firefox Add-ons",
                    href: "https://addons.mozilla.org/en-US/firefox/addon/aliasvault/",
                    icon: browserIcon("firefox.svg"),
                    aria: "Firefox extension",
                  },
                  {
                    name: "Edge",
                    sublabel: "Edge Add-ons",
                    href: "https://microsoftedge.microsoft.com/addons/detail/aliasvault/kabaanafahnjkfkplbnllebdmppdemfo",
                    icon: browserIcon("edge.svg"),
                    aria: "Microsoft Edge extension",
                  },
                  {
                    name: "Safari",
                    sublabel: "App Store",
                    href: "https://apps.apple.com/app/id6743163173",
                    icon: browserIcon("safari.svg"),
                    aria: "Safari extension",
                  },
                  {
                    name: "Brave",
                    sublabel: "Chrome Web Store",
                    href: "https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj",
                    icon: browserIcon("brave.svg"),
                    aria: "Brave extension",
                  },
                ]}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-three dark:border-gray-800 dark:bg-gray-dark dark:shadow-none lg:p-8">
            <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <SectionIconTile>
                    <FiSmartphone className="h-6 w-6" />
                  </SectionIconTile>
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

              <PlatformLinkList
                links={[
                  {
                    id: "ios",
                    name: "App Store",
                    sublabel: t("platforms.mobileApps.iosLabel"),
                    href: "https://apps.apple.com/app/id6745490915",
                    icon: <FaApple className="h-6 w-6 text-black dark:text-white" />,
                    aria: t("platforms.mobileApps.appStoreAlt"),
                  },
                  {
                    id: "android",
                    name: "Google Play",
                    sublabel: t("platforms.mobileApps.androidLabel"),
                    href: "https://play.google.com/store/apps/details?id=net.aliasvault.app",
                    icon: <FaGooglePlay className="h-5 w-5 text-black dark:text-white" />,
                    aria: t("platforms.mobileApps.playStoreAlt"),
                  },
                  {
                    name: "F-Droid",
                    sublabel: t("platforms.mobileApps.androidLabel"),
                    href: "https://f-droid.org/packages/net.aliasvault.app/",
                    icon: (
                      <Image src="/images/store-icons/fdroid.svg" alt="" width={24} height={24} className="h-6 w-6" />
                    ),
                    aria: t("platforms.mobileApps.fDroidAlt"),
                  },
                  {
                    name: "Obtainium",
                    sublabel: t("platforms.mobileApps.androidLabel"),
                    href: "https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/{%22id%22:%22net.aliasvault.app%22,%22url%22:%22https://github.com/aliasvault/aliasvault%22,%22author%22:%22AliasVault%22,%22name%22:%22AliasVault%22,%22additionalSettings%22:%22{\\%22about\\%22:\\%22Privacy-first%20Password%20Manager%20with%20Built-in%20Email%20Aliasing.\\%22}%22}",
                    icon: (
                      <Image src="/images/store-icons/obtainium.png" alt="" width={24} height={24} className="h-6 w-6" />
                    ),
                    aria: t("platforms.mobileApps.obtainiumAlt"),
                  },
                ]}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-three dark:border-gray-800 dark:bg-gray-dark dark:shadow-none lg:p-8">
            <div className="mb-4 flex items-center gap-4">
              <SectionIconTile>
                <FiDownload className="h-6 w-6" />
              </SectionIconTile>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platforms;