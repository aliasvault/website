import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CallToAction from "@/components/CallToAction/CallToAction";
import { getTranslations } from "next-intl/server";
import { generatePageSEOMetadata } from "@/lib/seo-utils";
import Page from "@/components/Common/Page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageSEOMetadata({
    title: t('alternativeBitwarden.hero.title'),
    description: t('alternativeBitwarden.hero.description'),
    path: '/alternative-to/bitwarden',
    locale,
  });
}

const BitwardenPage = async () => {
  const t = await getTranslations();
  return (
    <Page>
      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden bg-white pb-8 pt-[120px] dark:bg-gray-dark md:pb-[140px] md:pt-[150px] xl:pt-[180px]">
        <div className="container relative z-10">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="text-center lg:text-left">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  {t('alternativeBitwarden.hero.title')}
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                  {t('alternativeBitwarden.hero.description')}
                </p>
                {/* Same buttons as before */}
                <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="https://app.aliasvault.net"
                    className="rounded-3xl bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    {t('alternativeBitwarden.hero.tryButton')}
                  </Link>
                  <Link
                    href="https://github.com/aliasvault/aliasvault"
                    className="inline-flex items-center justify-center py-4 text-base font-semibold duration-300 ease-in-out hover:underline dark:text-white"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t('alternativeBitwarden.hero.githubButton')} <Image
                      className="inline-block ml-3"
                      alt={t('alternativeBitwarden.hero.alt.githubStars')}
                      src={`https://img.shields.io/github/stars/aliasvault/aliasvault?${new Date().getTime()}`}
                      width={90}
                      height={20}
                      unoptimized
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="mt-8 text-center lg:mt-0">
                <Image
                  src="/images/alternative/hero/bitwarden.png"
                  alt={t('alternativeBitwarden.hero.alt.hero')}
                  width={1000}
                  height={1000}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Same SVG decorations as before */}
      </section>

      {/* Feature Comparison */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">
          {t('alternativeBitwarden.comparison.title')}
        </h2>

        {/* Feature 1 - Email Alias Integration */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="md:w-1/2">
            <Image
              src="/images/alternative/icons/passwords.png"
              alt={t('alternativeBitwarden.comparison.features.emailAlias.alt')}
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {t('alternativeBitwarden.comparison.features.emailAlias.title')}
            </h3>
            <p>
              {t('alternativeBitwarden.comparison.features.emailAlias.description')}
            </p>
          </div>
        </div>

        {/* Feature 2 - Identity Generation */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
          <div className="md:w-1/2 text-end">
            <Image
              src="/images/alternative/icons/identities.png"
              alt={t('alternativeBitwarden.comparison.features.identityGeneration.alt')}
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {t('alternativeBitwarden.comparison.features.identityGeneration.title')}
            </h3>
            <p>
              {t('alternativeBitwarden.comparison.features.identityGeneration.description')}
            </p>
          </div>
        </div>

        {/* Feature 3 - Self-hosting */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/images/alternative/icons/encryption.png"
              alt={t('alternativeBitwarden.comparison.features.selfHosting.alt')}
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">
              {t('alternativeBitwarden.comparison.features.selfHosting.title')}
            </h3>
            <p>
              {t('alternativeBitwarden.comparison.features.selfHosting.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t('alternativeBitwarden.featureComparison.title')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-4 text-left dark:text-white">{t('alternativeBitwarden.featureComparison.tableHeaders.feature')}</th>
                <th className="border border-gray-300 dark:border-gray-700 p-4 text-center dark:text-white">{t('alternativeBitwarden.featureComparison.tableHeaders.aliasVault')}</th>
                <th className="border border-gray-300 dark:border-gray-700 p-4 text-center dark:text-white">{t('alternativeBitwarden.featureComparison.tableHeaders.bitwarden')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.passwordManagement')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.passkeySupport')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.emailAliasManagement')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">❌</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.randomIdentityGeneration')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">❌</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.openSource')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.endToEndEncryption')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.easySelfHosting')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">⚠️</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.browserExtensions')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.mobileApps')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">✅</td>
              </tr>
              <tr className="dark:text-white">
                <td className="border border-gray-300 dark:border-gray-700 p-4">{t('alternativeBitwarden.featureComparison.features.dataStorageLocation')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">{t('alternativeBitwarden.featureComparison.storageDetails.aliasVault')}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-4 text-center">{t('alternativeBitwarden.featureComparison.storageDetails.bitwarden')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Limitations Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t('alternativeBitwarden.limitations.title')}
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="mb-6 text-lg">
            {t('alternativeBitwarden.limitations.description')}
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>{t('alternativeBitwarden.limitations.items.age.title')}</strong> {t('alternativeBitwarden.limitations.items.age.description')}
            </li>
          </ul>
        </div>
      </div>

      <CallToAction />
    </Page>
  );
};

export default BitwardenPage;
