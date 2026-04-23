import { SiCodeberg, SiGithub, SiGitlab } from "react-icons/si";
import { useTranslations } from "next-intl";
import AnchorHeading from "@/components/Common/AnchorHeading";

export default function SourceCode() {
  const t = useTranslations();

  return (
    <section className="pt-9 pb-4">
      <div className="container">
        <div className="space-y-6">
          <AnchorHeading as="h2" id="foss" className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-3xl">
            {t("sourceCode.sections.foss.title")}
          </AnchorHeading>

          <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
            {t("sourceCode.sections.foss.paragraph1")}
          </p>
          <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
            {t("sourceCode.sections.foss.paragraph2")}
          </p>

          <div className="pt-2">
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/aliasvault/aliasvault"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:border-primary/50 hover:text-primary dark:border-gray-800 dark:bg-gray-800/50 dark:text-white dark:hover:border-primary/60 dark:hover:text-primary"
              >
                <SiGithub className="h-5 w-5" aria-hidden="true" />
                <span>GitHub</span>
                <span className="text-xs text-body-color dark:text-body-color-dark">{t("sourceCode.repositories.primary")}</span>
              </a>
              <a
                href="https://codeberg.org/aliasvault/aliasvault"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:border-primary/50 hover:text-primary dark:border-gray-800 dark:bg-gray-800/50 dark:text-white dark:hover:border-primary/60 dark:hover:text-primary"
              >
                <SiCodeberg className="h-5 w-5" aria-hidden="true" />
                <span>Codeberg</span>
                <span className="text-xs text-body-color dark:text-body-color-dark">{t("sourceCode.repositories.mirror")}</span>
              </a>
              <a
                href="https://gitlab.com/aliasvault/aliasvault"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-black transition-colors hover:border-primary/50 hover:text-primary dark:border-gray-800 dark:bg-gray-800/50 dark:text-white dark:hover:border-primary/60 dark:hover:text-primary"
              >
                <SiGitlab className="h-5 w-5" aria-hidden="true" />
                <span>GitLab</span>
                <span className="text-xs text-body-color dark:text-body-color-dark">{t("sourceCode.repositories.mirror")}</span>
              </a>
            </div>
          </div>

          <p className="pt-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
            {t("sourceCode.sections.selfHosting.paragraph")}{" "}
            <a
              href="https://docs.aliasvault.net/installation/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t("sourceCode.sections.selfHosting.installationLinkText")}
            </a>
            .
          </p>

          <div className="pt-4">
            <AnchorHeading as="h2" id="roadmap" className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-3xl">
              {t("platforms.roadmap.title")}
            </AnchorHeading>
            <p className="mb-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("platforms.roadmap.description")}
            </p>

            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-800/50">
              <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                {t("platforms.roadmap.statusTitle")}
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-base font-medium text-body-color dark:text-body-color-dark">
                <li>{t("platforms.roadmap.statusItems.releases")}</li>
                <li>{t("platforms.roadmap.statusItems.production")}</li>
                <li>{t("platforms.roadmap.statusItems.migration")}</li>
                <li>{t("platforms.roadmap.statusItems.feedback")}</li>
              </ul>
            </div>

            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              {t("platforms.roadmap.roadmapLink")}{" "}
              <a
                href="https://github.com/aliasvault/aliasvault/issues/731"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("platforms.roadmap.roadmapLinkText")}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

