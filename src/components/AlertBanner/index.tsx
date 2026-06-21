"use client";
import { useTranslations } from "next-intl";
import { getStatusPageUrl } from "@/lib/status-banner";

const AlertBanner = () => {
  const t = useTranslations();
  const statusUrl = getStatusPageUrl();

  return (
    <div className="bg-primary/10 border border-primary/30 rounded-lg py-4 px-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
        <span className="text-dark dark:text-white">
          {t('alertBanner.message')}
          <a
            href={statusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline ml-1"
          >
            {t('alertBanner.statusLink')}
          </a>{" "}
          {t('alertBanner.contactPrompt')}
          <a
            href="mailto:support@aliasvault.com"
            className="text-primary font-semibold hover:underline ml-1"
          >
            support@aliasvault.com
          </a>
        </span>

      </div>
    </div>
  );
};

export default AlertBanner;
