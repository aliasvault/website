import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { SiOpencollective } from "react-icons/si";
import { Link } from "@/i18n/navigation";
import AnchorHeading from "@/components/Common/AnchorHeading";
import { buttonClasses } from "@/components/Common/Button";

const BUY_ME_A_COFFEE_URL = "https://www.buymeacoffee.com/lanedirt";
const OPEN_COLLECTIVE_URL = "https://opencollective.com/aliasvault";

const paragraphClassName = "text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark";
const headingClassName = "mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl";
const linkClassName = "text-primary hover:underline";

/** Inline link for `t.rich` messages: external URLs open in a new tab, paths use the locale-aware Link. */
const richLink = (href: string) => {
  const RichLink = (chunks: ReactNode) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ) : (
      <Link href={href} className={linkClassName}>
        {chunks}
      </Link>
    );
  return RichLink;
};

const strong = (chunks: ReactNode) => <strong className="font-semibold text-black dark:text-white">{chunks}</strong>;

/**
 * "Support AliasVault" page: a short intro with the donation buttons, followed
 * by why donations matter, how this differs for self-hosted and cloud users,
 * and other ways to help.
 *
 * The apps link here from their About screen for self-hosted users, so the
 * donate buttons must stay at the top.
 */
const SupportUs = () => {
  const t = useTranslations("supportUs");

  return (
    <section className="pb-4 pt-9">
      <div className="container">
        <div className="max-w-3xl space-y-12">
          <div className="space-y-4">
            <p className={paragraphClassName}>{t("intro.paragraph1")}</p>
            <p className={paragraphClassName}>{t("intro.paragraph2")}</p>
            <div id="donate" className="flex scroll-mt-28 flex-col items-start gap-4 pt-4 sm:flex-row sm:items-center">
              <a
                href={BUY_ME_A_COFFEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 rounded-lg transition-opacity hover:opacity-90"
              >
                <Image
                  src="/images/contact/buymeacoffee.png"
                  alt={t("donate.buyMeACoffeeAlt")}
                  width={180}
                  height={50}
                />
              </a>
              <a href={OPEN_COLLECTIVE_URL} target="_blank" rel="noopener noreferrer" className={buttonClasses()}>
                <SiOpencollective className="h-4 w-4" aria-hidden="true" />
                {t("donate.openCollective")}
              </a>
            </div>
          </div>

          <div>
            <AnchorHeading as="h2" id="why-donate" className={headingClassName} copyLabel="Copy link">
              {t("why.title")}
            </AnchorHeading>
            <div className="space-y-4">
              <p className={paragraphClassName}>{t("why.paragraph1")}</p>
              <p className={paragraphClassName}>{t("why.paragraph2")}</p>
              <p className={paragraphClassName}>{t("why.paragraph3")}</p>
            </div>
          </div>

          <div>
            <AnchorHeading as="h2" id="self-hosted-or-cloud" className={headingClassName} copyLabel="Copy link">
              {t("audience.title")}
            </AnchorHeading>
            <div className="space-y-4">
              <p className={paragraphClassName}>{t.rich("audience.selfHosted", { strong })}</p>
              <p className={paragraphClassName}>{t.rich("audience.cloud", { strong, link: richLink("/pricing") })}</p>
            </div>
          </div>

          <div>
            <AnchorHeading as="h2" id="other-ways" className={headingClassName} copyLabel="Copy link">
              {t("otherWays.title")}
            </AnchorHeading>
            <p className={`mb-4 ${paragraphClassName}`}>{t("otherWays.description")}</p>
            <ul className={`list-disc space-y-2 pl-6 ${paragraphClassName}`}>
              <li>{t.rich("otherWays.review", { link: richLink("/platforms") })}</li>
              <li>{t.rich("otherWays.translate", { link: richLink("https://crowdin.com/project/aliasvault") })}</li>
              <li>{t.rich("otherWays.star", { link: richLink("https://github.com/aliasvault/aliasvault") })}</li>
              <li>
                {t.rich("otherWays.bugs", {
                  bugs: richLink("https://github.com/aliasvault/aliasvault/issues"),
                  ideas: richLink("https://github.com/aliasvault/aliasvault/discussions/categories/ideas"),
                })}
              </li>
              <li>{t.rich("otherWays.community", { link: richLink("https://discord.gg/DsaXMTEtpF") })}</li>
            </ul>
          </div>

          <p className={`border-t border-body-color/20 pt-8 dark:border-body-color-dark/20 ${paragraphClassName}`}>
            {t("closing.text")}{" "}
            <a href="mailto:support@aliasvault.com" className={linkClassName}>
              support@aliasvault.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportUs;
