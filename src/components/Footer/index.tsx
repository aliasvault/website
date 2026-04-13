"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SiGithub, SiCodeberg, SiGitlab, SiDiscord, SiMastodon, SiX, SiYoutube, SiFacebook } from "react-icons/si";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
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
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {t('footer.description')}
                </p>
                <div className="flex items-center">
                  <a
                    href="https://github.com/aliasvault/aliasvault"
                    aria-label="GitHub"
                    title="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiGithub className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://codeberg.org/aliasvault/aliasvault"
                    aria-label={t('footer.codebergMirror')}
                    title={t('footer.codebergMirror')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiCodeberg className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://gitlab.com/aliasvault/aliasvault"
                    aria-label={t('footer.gitlabMirror')}
                    title={t('footer.gitlabMirror')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiGitlab className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://discord.gg/DsaXMTEtpF"
                    aria-label="Discord"
                    title="Discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiDiscord className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://mastodon.social/@aliasvault"
                    aria-label="Mastodon"
                    title="Mastodon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiMastodon className="h-5 w-5" aria-hidden="true" />
                  </a>

                  <a
                    href="https://x.com/AliasVault"
                    aria-label="X"
                    title="X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiX className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.youtube.com/@AliasVault"
                    aria-label="YouTube"
                    title="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <SiYoutube className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.facebook.com/aliasvault"
                    aria-label="Facebook"
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
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
                      href={`/${locale}/features`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.features')}
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
                      href="https://docs.aliasvault.net"
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
                      href="https://downloads.aliasvault.net"
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
                  <li>
                    <Link
                      href="https://github.com/aliasvault/aliasvault"
                      target="_blank"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.source')}
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
                      href={`/${locale}/alternative-to/simplelogin`}
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.alt_simplelogin')}
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
                        href={`/${locale}/report-abuse`}
                        className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {t('footer.links.report_abuse')}
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
          <div className="border-t border-body-color/50 pt-6 dark:border-body-color/20 pb-8">
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
        <div className="absolute right-0 top-14 z-[-1]">
          <svg
              width="55"
              height="99"
              viewBox="0 0 55 99"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1"/>
            <mask
                id="mask0_94:899"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="99"
              height="99"
            >
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="#4A6CF7"
              />
            </mask>
            <g mask="url(#mask0_94:899)">
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="url(#paint0_radial_94:899)"
              />
              <g opacity="0.8" filter="url(#filter0_f_94:899)">
                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_94:899"
                x="12.4852"
                y="-15.1763"
                width="82.7646"
                height="82.7646"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10.5"
                  result="effect1_foregroundBlur_94:899"
                />
              </filter>
              <radialGradient
                id="paint0_radial_94:899"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
              >
                <stop stopOpacity="0.47" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-24 left-0 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d68338" stopOpacity="0.62" />
                <stop offset="1" stopColor="#d68338" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d68338" stopOpacity="0" />
                <stop offset="1" stopColor="#f49541" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d68338" stopOpacity="0.62" />
                <stop offset="1" stopColor="#d68338" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d68338" stopOpacity="0" />
                <stop offset="1" stopColor="#f49541" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d68338" stopOpacity="0.62" />
                <stop offset="1" stopColor="#d68338" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d68338" stopOpacity="0" />
                <stop offset="1" stopColor="#f49541" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
