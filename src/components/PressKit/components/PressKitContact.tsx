"use client";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/Common/SectionTitle";

const PressKitContact = () => {
  const t = useTranslations("pressKitContact");

  return (
    <div className="py-16 md:py-20 lg:py-24">
      <div className="container">
        <SectionTitle
          title={t("title")}
          paragraph={t("description")}
          center
        />
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8">
            {/* Contact Information */}
            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                {t("contactInfo.title")}
              </h3>
              <div className="space-y-3">
                <p className="text-base text-body-color dark:text-body-color-dark">
                  <strong>{t("contactInfo.name")}</strong><br />
                  {t("contactInfo.founderTitle")}
                </p>
                <p className="text-base text-body-color dark:text-body-color-dark">
                  <strong>{t("contactInfo.email")}</strong> <a href="mailto:press@aliasvault.com" className="text-primary hover:underline">press@aliasvault.com</a>
                </p>
                <p className="text-base text-body-color dark:text-body-color-dark">
                  <strong>{t("contactInfo.linkedin")}</strong> <a href="https://www.linkedin.com/in/leendert-de-borst-02a60844/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.linkedin.com/in/leendert-de-borst-02a60844/</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressKitContact;