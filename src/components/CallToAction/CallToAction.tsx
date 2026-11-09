import { useTranslations } from "next-intl";
import CallToActionPanel from "./CallToActionPanel";

interface CallToActionProps {
  className?: string;
}

/** Generic "create your vault" call to action, used on the homepage and feature pages. */
const CallToAction = ({ className = "" }: CallToActionProps) => {
  const t = useTranslations();
  return (
    <CallToActionPanel
      eyebrow={t("callToAction.eyebrow")}
      title={t("callToAction.title")}
      description={t("callToAction.description")}
      buttonText={t("callToAction.buttonText")}
      logoAlt={t("callToAction.logoAlt")}
      className={className}
    />
  );
};

export default CallToAction;
