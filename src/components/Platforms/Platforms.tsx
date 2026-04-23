import Image from "next/image";
import { useTranslations } from "next-intl";
import AnchorHeading from "@/components/Common/AnchorHeading";

const Platforms = () => {
  const t = useTranslations();

  return (
    <section className="pt-9 pb-4">
      <div className="container">
        <div className="space-y-10 lg:space-y-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 lg:p-8">
            <AnchorHeading
              as="h3"
              id="web-app"
              copyLabel={t("platforms.share.copyLink", { section: t("platforms.webApp.title") })}
              className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl"
            >
              {t("platforms.webApp.title")}
            </AnchorHeading>
            <p className="mb-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("platforms.webApp.description")} {t("platforms.webApp.noInstallNote")}
            </p>

            <div className="flex flex-col items-start gap-3">
              <a
                href="https://app.aliasvault.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-primary/90 sm:w-auto"
              >
                {t("platforms.webApp.linkText")}
              </a>
              <div className="text-sm text-body-color dark:text-body-color-dark">
                {t("platforms.webApp.selfHostLinkText")}{" "}
                <a
                  href="https://docs.aliasvault.net/installation/"
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

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 lg:p-8">
            <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
              <div>
                <AnchorHeading
                  as="h3"
                  id="browser-extensions"
                  copyLabel={t("platforms.share.copyLink", { section: t("platforms.browserExtensions.title") })}
                  className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl"
                >
                  {t("platforms.browserExtensions.title")}
                </AnchorHeading>
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

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  {
                    name: "Chrome",
                    href: "https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj",
                    iconLight: "/images/browser-icons/chrome.svg",
                    iconDark: "/images/browser-icons/chrome.svg",
                    alt: "Chrome Web Store",
                  },
                  {
                    name: "Firefox",
                    href: "https://addons.mozilla.org/en-US/firefox/addon/aliasvault/",
                    iconLight: "/images/browser-icons/firefox.svg",
                    iconDark: "/images/browser-icons/firefox.svg",
                    alt: "Firefox extension",
                  },
                  {
                    name: "Edge",
                    href: "https://microsoftedge.microsoft.com/addons/detail/aliasvault/kabaanafahnjkfkplbnllebdmppdemfo",
                    iconLight: "/images/browser-icons/edge.svg",
                    iconDark: "/images/browser-icons/edge.svg",
                    alt: "Microsoft Edge extension",
                  },
                  {
                    name: "Safari",
                    href: "https://apps.apple.com/app/id6743163173",
                    iconLight: "/images/browser-icons/safari.svg",
                    iconDark: "/images/browser-icons/safari.svg",
                    alt: "Safari extension",
                  },
                  {
                    name: "Brave",
                    href: "https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj",
                    iconLight: "/images/browser-icons/brave.svg",
                    iconDark: "/images/browser-icons/brave.svg",
                    alt: "Brave extension",
                  },
                ].map((b) => (
                  <a
                    key={b.name}
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={b.alt}
                    className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-primary/60 dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/80 dark:focus-visible:ring-offset-gray-900"
                  >
                    <div
                      className="mx-auto mb-2 inline-flex items-center justify-center rounded-md bg-gray-100 p-2 transition-all duration-200 hover:bg-gray-200 dark:bg-slate-600 dark:hover:bg-slate-700"
                      title={b.alt}
                    >
                      <Image src={b.iconLight} alt={b.alt} width={24} height={24} className="h-6 w-6 dark:hidden" />
                      <Image src={b.iconDark} alt={b.alt} width={24} height={24} className="hidden h-6 w-6 dark:block" />
                    </div>
                    <div className="text-sm font-semibold text-black dark:text-white">{b.name}</div>
                    <div className="mt-0.5 text-xs text-green-600 dark:text-green-400">
                      {t("platforms.browserExtensions.install")}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 lg:p-8">
            <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
              <div>
                <AnchorHeading
                  as="h3"
                  id="mobile-apps"
                  copyLabel={t("platforms.share.copyLink", { section: t("platforms.mobileApps.title") })}
                  className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl"
                >
                  {t("platforms.mobileApps.title")}
                </AnchorHeading>
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

              <div className="space-y-5">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/40">
                  <AnchorHeading
                    as="h4"
                    id="ios"
                    copyLabel={t("platforms.share.copyLink", { section: t("platforms.mobileApps.iosLabel") })}
                    className="mb-3 text-sm font-semibold text-body-color dark:text-body-color-dark"
                  >
                    {t("platforms.mobileApps.iosLabel")}
                  </AnchorHeading>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://apps.apple.com/app/id6745490915"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:border-primary/50 focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-dark dark:hover:border-primary/60 dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/80 dark:focus-visible:ring-offset-gray-900"
                    >
                      <Image
                        src="/images/app-store/download-app-store.svg"
                        alt={t("platforms.mobileApps.appStoreAlt")}
                        width={120}
                        height={40}
                        className="h-[40px] w-[120px] object-contain"
                      />
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/40">
                  <AnchorHeading
                    as="h4"
                    id="android"
                    copyLabel={t("platforms.share.copyLink", { section: t("platforms.mobileApps.androidLabel") })}
                    className="mb-3 text-sm font-semibold text-body-color dark:text-body-color-dark"
                  >
                    {t("platforms.mobileApps.androidLabel")}
                  </AnchorHeading>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="https://play.google.com/store/apps/details?id=net.aliasvault.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:border-primary/50 focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-dark dark:hover:border-primary/60 dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/80 dark:focus-visible:ring-offset-gray-900"
                    >
                      <Image
                        src="/images/app-store/download-play-store.svg"
                        alt={t("platforms.mobileApps.playStoreAlt")}
                        width={120}
                        height={40}
                        className="h-[40px] w-[120px] object-contain"
                      />
                    </a>
                    <a
                      href="https://f-droid.org/packages/net.aliasvault.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:border-primary/50 focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-dark dark:hover:border-primary/60 dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/80 dark:focus-visible:ring-offset-gray-900"
                    >
                      <Image
                        src="/images/app-store/download-f-droid.svg"
                        alt={t("platforms.mobileApps.fDroidAlt")}
                        width={120}
                        height={40}
                        className="h-[40px] w-[120px] object-contain"
                      />
                    </a>
                    <a
                      href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/{%22id%22:%22net.aliasvault.app%22,%22url%22:%22https://github.com/aliasvault/aliasvault%22,%22author%22:%22AliasVault%22,%22name%22:%22AliasVault%22,%22additionalSettings%22:%22{\%22about\%22:\%22Privacy-first%20Password%20Manager%20with%20Built-in%20Email%20Aliasing.\%22}%22}"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:border-primary/50 focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-dark dark:hover:border-primary/60 dark:focus-visible:border-primary/70 dark:focus-visible:ring-primary/80 dark:focus-visible:ring-offset-gray-900"
                    >
                      <Image
                        src="/images/app-store/download-obtainium.png"
                        alt={t("platforms.mobileApps.obtainiumAlt")}
                        width={120}
                        height={40}
                        className="h-[40px] w-[120px] object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 lg:p-8">
            <AnchorHeading
              as="h3"
              id="downloads"
              copyLabel={t("platforms.share.copyLink", { section: t("platforms.downloads.title") })}
              className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl"
            >
              {t("platforms.downloads.title")}
            </AnchorHeading>
            <p className="mb-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("platforms.downloads.description")}
            </p>
            <a
              href="https://downloads.aliasvault.net"
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