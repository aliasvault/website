import BrowserBadge from "../Common/Badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Platforms = () => {
  const t = useTranslations();

  return (
    <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('platforms.mobileApps.title')}
            </h3>
            <p className="mb-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t('platforms.mobileApps.description')}
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <a
                href="https://apps.apple.com/app/id6745490915"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/images/app-store/download-app-store.svg"
                  alt={t('platforms.mobileApps.appStoreAlt')}
                  width={120}
                  height={40}
                  className="w-[120px] h-[40px]"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=net.aliasvault.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/images/app-store/download-play-store.svg"
                  alt={t('platforms.mobileApps.playStoreAlt')}
                  width={120}
                  height={40}
                  className="w-[120px] h-[40px]"
                />
              </a>
              <a
                href="https://f-droid.org/packages/net.aliasvault.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/images/app-store/download-f-droid.svg"
                  alt={t('platforms.mobileApps.fDroidAlt')}
                  width={120}
                  height={40}
                  className="w-[120px] h-[40px]"
                />
              </a>
            </div>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t('platforms.mobileApps.featuresTitle')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-base font-medium text-body-color dark:text-body-color-dark">
              <li>{t('platforms.mobileApps.features.passwordsPasskeys')}</li>
              <li>{t('platforms.mobileApps.features.biometric')}</li>
              <li>{t('platforms.mobileApps.features.offline')}</li>
              <li>{t('platforms.mobileApps.features.integration')}</li>
              <li>{t('platforms.mobileApps.features.sync')}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('platforms.browserExtensions.title')}
            </h3>
            <p className="mb-6 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t('platforms.browserExtensions.description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <BrowserBadge
                  href="https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj"
                  iconLight="/images/browser-icons/chrome.svg"
                  iconDark="/images/browser-icons/chrome.svg"
                  alt="Chrome Web Store"
                  className="mb-2"
                />
                <span className="text-sm font-medium text-black dark:text-white">Chrome</span>
                <span className="text-xs text-green-600 dark:text-green-400">{t('platforms.browserExtensions.install')}</span>
              </div>

              <div className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <BrowserBadge
                  href="https://addons.mozilla.org/en-US/firefox/addon/aliasvault/"
                  iconLight="/images/browser-icons/firefox.svg"
                  iconDark="/images/browser-icons/firefox.svg"
                  alt="Firefox extension"
                  className="mb-2"
                />
                <span className="text-sm font-medium text-black dark:text-white">Firefox</span>
                <span className="text-xs text-green-600 dark:text-green-400">{t('platforms.browserExtensions.install')}</span>
              </div>

              <div className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <BrowserBadge
                  href="https://microsoftedge.microsoft.com/addons/detail/aliasvault/kabaanafahnjkfkplbnllebdmppdemfo"
                  iconLight="/images/browser-icons/edge.svg"
                  iconDark="/images/browser-icons/edge.svg"
                  alt="Microsoft Edge extension"
                  className="mb-2"
                />
                <span className="text-sm font-medium text-black dark:text-white">Microsoft Edge</span>
                <span className="text-xs text-green-600 dark:text-green-400">{t('platforms.browserExtensions.install')}</span>
              </div>

              <div className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <BrowserBadge
                  href="https://apps.apple.com/app/id6743163173"
                  iconLight="/images/browser-icons/safari.svg"
                  iconDark="/images/browser-icons/safari.svg"
                  alt="Safari extension"
                  className="mb-2"
                />
                <span className="text-sm font-medium text-black dark:text-white">Safari</span>
                <span className="text-xs text-green-600 dark:text-green-400">{t('platforms.browserExtensions.install')}</span>
              </div>

              <div className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <BrowserBadge
                  iconLight="/images/browser-icons/brave.svg"
                  iconDark="/images/browser-icons/brave.svg"
                  href="https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj"
                  alt="Brave extension"
                  className="mb-2"
                />
                <span className="text-sm font-medium text-black dark:text-white">Brave</span>
                <span className="text-xs text-green-600 dark:text-green-400">{t('platforms.browserExtensions.install')}</span>
              </div>
            </div>

            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t('platforms.browserExtensions.featuresTitle')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-base font-medium text-body-color dark:text-body-color-dark">
              <li>{t('platforms.browserExtensions.features.autofill')}</li>
              <li>{t('platforms.browserExtensions.features.aliases')}</li>
              <li>{t('platforms.browserExtensions.features.access')}</li>
              <li>{t('platforms.browserExtensions.features.offline')}</li>
              <li>{t('platforms.browserExtensions.features.save')}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('platforms.roadmap.title')}
            </h3>
            <div className="space-y-4">
              <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {t('platforms.roadmap.description')}
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
                  {t('platforms.roadmap.statusTitle')}
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-base font-medium text-body-color dark:text-body-color-dark">
                  <li>{t('platforms.roadmap.statusItems.releases')}</li>
                  <li>{t('platforms.roadmap.statusItems.production')}</li>
                  <li>{t('platforms.roadmap.statusItems.migration')}</li>
                  <li>{t('platforms.roadmap.statusItems.feedback')}</li>
                </ul>
              </div>

              <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {t('platforms.roadmap.roadmapLink')}{" "}
                <a
                  href="https://github.com/aliasvault/aliasvault/issues/731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('platforms.roadmap.roadmapLinkText')}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platforms;