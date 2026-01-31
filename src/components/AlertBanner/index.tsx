"use client";
import { useTranslations } from "next-intl";

const AlertBanner = () => {
  const t = useTranslations();

  return (
    <div className="bg-primary/10 border border-primary/30 rounded-lg py-4 px-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
        <span className="text-dark dark:text-white">
          {t('alertBanner.message')}
          <a
          href="mailto:contact@support.aliasvault.net"
          className="text-primary font-semibold hover:underline ml-1"
        >
          contact@support.aliasvault.net
        </a>
        </span>

      </div>
    </div>
  );
};

export default AlertBanner;
