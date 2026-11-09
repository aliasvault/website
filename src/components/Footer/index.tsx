"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SiGithub, SiCodeberg, SiGitlab, SiDiscord, SiMastodon, SiX, SiYoutube, SiFacebook } from "react-icons/si";
import { FaEnvelope, FaRedditAlien } from "react-icons/fa";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getStatusPageUrl } from "@/lib/status-banner";
import { routing } from "@/i18n/routing";
import { Grain, Waves } from "@/components/Common/Decor";

/**
 * Normalize a pathname between language prefixes.
 */
const normalizePath = (path: string) => {
  const stripped = path.replace(new RegExp(`^/${routing.defaultLocale}(?=/|$)`), "").replace(/\/+$/, "");
  return stripped || "/";
};

/**
 * Clicking a footer link of the current page should scroll to the top instead of doing nothing.
 */
const handleFooterLinkClick = (e: React.MouseEvent<HTMLElement>) => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const anchor = (e.target as HTMLElement).closest("a");
  if (!anchor || anchor.target === "_blank") return;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin || url.hash) return;

  if (normalizePath(url.pathname) === normalizePath(window.location.pathname)) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();
  const statusUrl = getStatusPageUrl();

  return (
    <>
      <footer
        className="relative z-10 overflow-hidden bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24"
        onClickCapture={handleFooterLinkClick}
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
              <Link
                href={`/${locale}`}
                className={`header-logo flex items-center justify-start w-full pb-6`}>
                <div className="flex items-center">
                  <Image
                    src="/images/logo/icon-trimmed.png"
                    alt={t('footer.alt.logo')}
                    width={50}
                    height={50}
                    className="mr-3"
                  />
                  <h1 className="text-2xl font-bold my-auto">AliasVault</h1>
                </div>
              </Link>
                <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {t('footer.description')}
                </p>
                <a
                  href="mailto:support@aliasvault.com"
                  className="mb-9 inline-flex items-center gap-2 text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                  <FaEnvelope className="h-4 w-4" aria-hidden="true" />
                  support@aliasvault.com
                </a>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a
                    href="https://github.com/aliasvault/aliasvault"
                    aria-label="GitHub"
                    title="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiGithub className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://codeberg.org/aliasvault/aliasvault"
                    aria-label={t('footer.codebergMirror')}
                    title={t('footer.codebergMirror')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiCodeberg className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://gitlab.com/aliasvault/aliasvault"
                    aria-label={t('footer.gitlabMirror')}
                    title={t('footer.gitlabMirror')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiGitlab className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://discord.gg/DsaXMTEtpF"
                    aria-label="Discord"
                    title="Discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiDiscord className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://mastodon.social/@aliasvault"
                    aria-label="Mastodon"
                    title="Mastodon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiMastodon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.reddit.com/r/AliasVault/"
                    aria-label="Reddit"
                    title="Reddit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <FaRedditAlien className="h-5 w-5" aria-hidden="true" />
                  </a>

                  <a
                    href="https://x.com/AliasVault"
                    aria-label="X"
                    title="X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiX className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.youtube.com/@AliasVault"
                    aria-label="YouTube"
                    title="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiYoutube className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.facebook.com/aliasvault"
                    aria-label="Facebook"
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiFacebook className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  {t('footer.sections.aliasvault')}
                </h2>
                <ul>
                  <li>
                    <Link
                      href={`/${locale}/about`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.about')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/mission`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.mission')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/roadmap`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.roadmap')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/features`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.features')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/pricing`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.pricing')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/platforms`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.platforms')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/press-kit`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.press_kit')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                      href={`/${locale}/source-code`}
                    >
                      {t('footer.links.source')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://docs.aliasvault.com"
                      target="_blank"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.documentation')}
                      <svg
                        className="ml-1 inline-block h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://downloads.aliasvault.com"
                      target="_blank"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.downloads')}
                      <svg
                        className="ml-1 inline-block h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  {t('footer.sections.alternatives')}
                </h2>
                <ul>
                  <li>
                    <Link
                      href={`/${locale}/alternative-to/1password`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.alt_1password')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/alternative-to/bitwarden`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.alt_bitwarden')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/alternative-to/proton-pass`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.alt_proton')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/alternative-to/simplelogin`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.alt_simplelogin')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  {t('footer.sections.support')}
                </h2>
                <ul>
                  <li>
                    <Link
                        href={`/${locale}/contact`}
                        className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.contact')}
                    </Link>
                  </li>
                  <li>
                    <Link
                        href={`/${locale}/faq`}
                        className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.faq')}
                    </Link>
                  </li>
                  <li>
                    <a
                        href={statusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.status')}
                      <svg
                        className="ml-1 inline-block h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/security`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.trust_security')}
                    </Link>
                  </li>
                  <li>
                    <Link
                        href={`/${locale}/responsible-disclosure`}
                        className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.responsible_disclosure')}
                    </Link>
                  </li>
                  <li>
                    <Link
                        href={`/${locale}/report-abuse`}
                        className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.report_abuse')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/privacy-policy`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.privacy')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/account-deletion`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.account_deletion')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/terms-and-conditions`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.terms_and_conditions')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/legal-notice`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.legal_notice')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Language Switcher */}
          {/* No divider line: the wave band behind this row separates it from the links. */}
          <div className="pt-8 pb-8 md:pt-12 md:pb-10">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-base text-body-color dark:text-body-color-dark">
               © 2024{new Date().getFullYear() !== 2024 ? `-${new Date().getFullYear()}` : ""} {t('footer.copyright')}
                &nbsp;{t('footer.links.license')}:&nbsp;
                <Link
                    href="https://github.com/aliasvault/aliasvault/blob/main/LICENSE.md"
                    target="_blank"
                    className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                     AGPL-3.0
                  </Link>
                  .
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-body-color dark:text-body-color-dark">
                  {t('footer.language')}
                </span>
                <LanguageSwitcher />
              </div>
            </div>
          </div>

        </div>
        {/* Decorative background: layered waves along the bottom, doubling as the divider above the copyright row */}
        <Waves variant="footer" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 w-full opacity-75 dark:opacity-55 md:h-72" />
        <Grain className="-z-10 opacity-[0.03] dark:opacity-[0.05]" />
      </footer>
    </>
  );
};

export default Footer;
