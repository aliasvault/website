import { useTranslations } from "next-intl";
import Link from "next/link";
import HallOfFame from "./HallOfFame";

const ResponsibleDisclosureContent = () => {
  const t = useTranslations();

  return (
    <section className="pb-16 pt-8">
      <div className="container">
        <div className="mx-auto">
          <div className="mb-12">
            <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
              {t('responsibleDisclosure.content.intro')}
            </p>

            <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50">
              <p className="text-lg text-body-color dark:text-body-color-dark">
                {t('responsibleDisclosure.content.email')}{' '}
                <a
                  href="mailto:security@support.aliasvault.net"
                  className="font-semibold block mt-2 text-primary hover:underline"
                >
                  {t('responsibleDisclosure.content.emailAddress')}
                </a>
              </p>
            </div>

            <div className="mb-8">
              <p className="text-base text-body-color dark:text-body-color-dark">
                {t('responsibleDisclosure.content.fullPolicy.description')}
                <Link
                  href="https://github.com/aliasvault/aliasvault/blob/main/SECURITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-base font-semibold text-primary hover:underline ml-1"
                >
                  {t('responsibleDisclosure.content.fullPolicy.linkText')}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </p>
            </div>

            <h3 className="mb-6 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('responsibleDisclosure.content.commitment.title')}
            </h3>
            <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
              {t('responsibleDisclosure.content.commitment.description')}
            </p>
            <ul className="mb-8 list-disc pl-6 text-body-color dark:text-body-color-dark">
              <li className="mb-2">{t('responsibleDisclosure.content.commitmentList.acknowledge')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.commitmentList.investigate')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.commitmentList.timeline')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.commitmentList.credit')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.commitmentList.cve')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.commitmentList.coordinate')}</li>
            </ul>
          </div>

          <div className="mb-12">
            <h3 className="mb-6 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('responsibleDisclosure.content.guidelines.title')}
            </h3>
            <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
              {t('responsibleDisclosure.content.guidelines.description')}
            </p>
            <ul className="mb-8 list-disc pl-6 text-body-color dark:text-body-color-dark">
              <li className="mb-2">{t('responsibleDisclosure.content.guidelines.items.noHarm')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.guidelines.items.minimal')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.guidelines.items.confidential')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.guidelines.items.legal')}</li>
              <li className="mb-2">{t('responsibleDisclosure.content.guidelines.items.scope')}</li>
            </ul>
          </div>

          <div className="mb-12">
            <h3 className="mb-6 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('responsibleDisclosure.content.scope.title')}
            </h3>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('responsibleDisclosure.content.scope.description')}
            </p>
          </div>

          <HallOfFame />
        </div>
      </div>
    </section>
  );
};

export default ResponsibleDisclosureContent;