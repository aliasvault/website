import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiArrowRight, FiClock, FiGlobe, FiMail } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import AnchorHeading from "@/components/Common/AnchorHeading";
import { buttonClasses } from "@/components/Common/Button";
import Card from "@/components/Common/Card";
import IconTile from "@/components/Common/IconTile";
import { getStatusPageUrl } from "@/lib/status-banner";

const ContactContent = () => {
  const t = useTranslations();
  const statusUrl = getStatusPageUrl();

  return (
    <section className="pb-16 pt-8">
      <div className="container">
        <div className="mx-auto">
          {/* Primary channel and company details */}
          <div className="mb-12 grid gap-6 lg:grid-cols-3">
            <Card id="contact" variant="highlight" padding="lg" className="flex flex-col lg:col-span-2">
              <div className="mb-4 flex items-center gap-4">
                <IconTile>
                  <FiMail className="h-6 w-6" aria-hidden="true" />
                </IconTile>
                <h2 className="text-2xl font-bold text-black dark:text-white">{t('contact.content.email.title')}</h2>
              </div>
              <p className="mb-6 max-w-2xl text-base leading-relaxed text-body-color dark:text-body-color-dark">
                {t('contact.content.email.description')}
              </p>
              <div className="mb-6">
                <a href="mailto:support@aliasvault.com" className={buttonClasses()}>
                  <FiMail className="h-4 w-4" aria-hidden="true" />
                  support@aliasvault.com
                </a>
              </div>
              <ul className="mt-auto flex flex-wrap gap-x-8 gap-y-2 border-t border-primary/20 pt-5 text-sm text-body-color dark:border-primary/25 dark:text-body-color-dark">
                <li className="flex items-center gap-2">
                  <FiGlobe className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {t('contact.content.email.languages')}
                </li>
                <li className="flex items-center gap-2">
                  <FiClock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {t('contact.content.email.responseTime')}
                </li>
              </ul>
            </Card>

            <Card id="company" padding="lg" className="flex flex-col">
              <h2 className="mb-5 text-lg font-semibold text-black dark:text-white">{t('contact.content.company.title')}</h2>
              <dl className="mb-6 space-y-4 text-base">
                <div>
                  <dt className="text-sm text-body-color dark:text-body-color-dark">{t('contact.content.company.name')}</dt>
                  <dd className="font-medium text-black dark:text-white">AliasVault</dd>
                </div>
                <div>
                  <dt className="text-sm text-body-color dark:text-body-color-dark">{t('contact.content.company.location')}</dt>
                  <dd className="flex items-center gap-2 font-medium text-black dark:text-white">
                    <Image
                      src="/images/flags/nl.svg"
                      width={16}
                      height={11}
                      alt=""
                      aria-hidden="true"
                      className="w-4 rounded-[2px] ring-1 ring-black/10 dark:ring-white/10"
                    />
                    {t('footer.location')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-body-color dark:text-body-color-dark">{t('contact.content.company.kvk')}</dt>
                  <dd className="font-medium text-black dark:text-white">51592193</dd>
                </div>
              </dl>
              <Link href="/legal-notice" className="group mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                {t('contact.content.company.legalNotice')}
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Card>
          </div>

          <div className="mb-12">
            <AnchorHeading
              as="h3"
              id="status"
              className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              copyLabel="Copy link"
            >
              {t('contact.content.status.title')}
            </AnchorHeading>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.status.description')}
            </p>
            <div className="mt-4">
              <a
                  href={statusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
              >
                {t('contact.content.status.link')}
              </a>
            </div>
          </div>

          <div className="mb-12">
            <AnchorHeading
              as="h3"
              id="faq"
              className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              copyLabel="Copy link"
            >
              {t('contact.content.faq.title')}
            </AnchorHeading>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.faq.description')}
            </p>
            <div className="mt-4">
            <Link
                  href="/faq"
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
            <AnchorHeading
              as="h3"
              id="support"
              className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              copyLabel="Copy link"
            >
              {t('contact.content.support.title')}
            </AnchorHeading>
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
            <AnchorHeading
              as="h3"
              id="feature-requests"
              className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              copyLabel="Copy link"
            >
              {t('contact.content.features.title')}
            </AnchorHeading>
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
            <AnchorHeading
              as="h3"
              id="security"
              className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              copyLabel="Copy link"
            >
              {t('contact.content.security.title')}
            </AnchorHeading>
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
                  href="mailto:security@aliasvault.com"
                  className="text-primary hover:underline"
              >
                {t('contact.content.security.links.email')}
              </a>
            </div>
          </div>

          <div className="mt-12">
            <AnchorHeading
              as="h3"
              id="donations"
              className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              copyLabel="Copy link"
            >
              {t('contact.content.donations.title')}
            </AnchorHeading>
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
                className={buttonClasses()}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.293 0-9.6-4.307-9.6-9.6S6.707 2.4 12 2.4s9.6 4.307 9.6 9.6-4.307 9.6-9.6 9.6z"/>
                  <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10.8c-2.651 0-4.8-2.149-4.8-4.8s2.149-4.8 4.8-4.8 4.8 2.149 4.8 4.8-2.149 4.8-4.8 4.8z"/>
                </svg>
                {t('contact.content.donations.openCollectiveAlt')}
              </a>
            </div>
          </div>

          <div className="mt-12 border-t border-body-color/20 pt-8 dark:border-body-color-dark/20">
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('contact.content.closing.text')}{" "}
              <a
                href="mailto:support@aliasvault.com"
                className="text-primary hover:underline"
              >
                support@aliasvault.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;