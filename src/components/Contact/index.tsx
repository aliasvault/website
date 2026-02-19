import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ContactContent = () => {
  const t = useTranslations();

  return (
    <section className="pb-16 pt-8">
      <div className="container">
        <div className="mx-auto">
          <div className="mb-12 rounded-lg border border-body-color/20 bg-body-color/5 p-6 dark:border-body-color-dark/20 dark:bg-body-color-dark/5">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('contact.content.main.title')}
            </h3>
            <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.intro')}{" "}
              <a
                href="https://github.com/lanedirt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t('contact.content.founder')}
              </a>{" "}
              {t('contact.content.location')}
            </p>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.main.contactBlurb')}{" "}
              <a
                href="mailto:contact@support.aliasvault.net"
                className="text-primary hover:underline"
              >
                contact@support.aliasvault.net
              </a>
            </p>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('contact.content.faq.title')}
            </h3>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.faq.description')}
            </p>
            <div className="mt-4">
            <Link
                  href="/#faq"
                  className="text-primary hover:underline"
              >
                {t('contact.content.faq.links.faq')}
              </Link>
              {" • "}
              <Link
                  href="/docs"
                  className="text-primary hover:underline"
              >
                {t('contact.content.faq.links.docs')}
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('contact.content.features.title')}
            </h3>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.features.description')}
            </p>
            <div className="mt-4">
              <a
                  href="https://github.com/aliasvault/aliasvault/discussions/categories/ideas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
              >
                {t('contact.content.features.links.submit')}
              </a>
              {" • "}
              <a
                  href="https://discord.gg/DsaXMTEtpF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
              >
               {t('contact.content.features.links.discuss')}
              </a>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('contact.content.support.title')}
            </h3>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.support.description')}
            </p>
            <ul className="mt-4 list-disc pl-6 text-body-color dark:text-body-color-dark">
              <li className="mb-2">
                <a
                    href="https://github.com/aliasvault/aliasvault/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                  {t('contact.content.support.links.github')}
                </a>
              </li>
              <li className="mb-2">
                <a
                    href="https://discord.gg/DsaXMTEtpF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                  {t('contact.content.support.links.discord')}
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('contact.content.security.title')}
            </h3>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.security.description')}
            </p>
            <div className="mt-4">
              <Link
                  href="/responsible-disclosure"
                  className="text-primary hover:underline"
              >
                {t('contact.content.security.links.disclosure')}
              </Link>
              {" • "}
              <a
                  href="mailto:security@support.aliasvault.net"
                  className="text-primary hover:underline"
              >
                {t('contact.content.security.links.email')}
              </a>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              {t('contact.content.donations.title')}
            </h3>
            <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.donations.description')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a
                href="https://www.buymeacoffee.com/lanedirt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/contact/buymeacoffee.png"
                  alt={t('contact.content.donations.imageAlt')}
                  width={217}
                  height={60}
                />
              </a>
              <a
                href="https://opencollective.com/aliasvault"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.293 0-9.6-4.307-9.6-9.6S6.707 2.4 12 2.4s9.6 4.307 9.6 9.6-4.307 9.6-9.6 9.6z"/>
                  <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10.8c-2.651 0-4.8-2.149-4.8-4.8s2.149-4.8 4.8-4.8 4.8 2.149 4.8 4.8-2.149 4.8-4.8 4.8z"/>
                </svg>
                {t('contact.content.donations.openCollectiveAlt')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;