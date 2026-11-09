import { useTranslations } from "next-intl";
import CallToActionPanel from "./CallToActionPanel";

interface ImportCallToActionProps {
  /** Translation namespace, e.g. "alternative1Password.import" */
  namespace: string;
  href?: string;
  className?: string;
}

/** Call to action for the alternative-to pages: import from a competing password manager. */
const ImportCallToAction = ({ namespace, href, className = "" }: ImportCallToActionProps) => {
  const t = useTranslations();
  return (
    <CallToActionPanel
      title={t(`${namespace}.title`)}
      description={t(`${namespace}.description`)}
      buttonText={t(`${namespace}.cta`)}
      href={href}
      logoAlt={t("callToAction.logoAlt")}
      className={className}
    />
  );
};

export default ImportCallToAction;
