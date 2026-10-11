"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Card from "@/components/Common/Card";
import { buttonClasses } from "@/components/Common/Button";

const PressKitScreenshots = () => {
  const t = useTranslations("pressKitScreenshots");

  return (
    <div className="py-16 md:py-20 lg:py-24 bg-gray-light dark:bg-gray-900">
      <div className="container">
        <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
          {t("title")}
        </h2>
        <p className="mb-12 text-base text-center leading-relaxed text-body-color dark:text-body-color-dark">
          {t("description")}
        </p>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <Card padding="sm" className="mb-4">
                <Image src="/presskit/screenshot-previews-web.jpg" alt="Web Interface" width={334} height={203} />
              </Card>
              <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                {t("webInterface.title")}
              </h4>
              <p className="text-sm text-body-color dark:text-body-color-dark">
                {t("webInterface.description")}
              </p>
            </div>

            <div className="text-center">
              <Card padding="sm" className="mb-4">
                <Image src="/presskit/screenshot-previews-browser.jpg" alt="Browser Extension" width={334} height={203} />
              </Card>
              <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                {t("browserExtension.title")}
              </h4>
              <p className="text-sm text-body-color dark:text-body-color-dark">
                {t("browserExtension.description")}
              </p>
            </div>

            <div className="text-center">
              <Card padding="sm" className="mb-4">
                <Image src="/presskit/screenshot-previews-mobile.jpg" alt="Mobile Application" width={334} height={203} />
              </Card>
              <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                {t("mobileApplication.title")}
              </h4>
              <p className="text-sm text-body-color dark:text-body-color-dark">
                {t("mobileApplication.description")}
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a
              href="/presskit/aliasvault-screenshots.zip"
              download
              className={buttonClasses()}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              {t("downloadAll")}
            </a>
            <div className="mt-4 text-sm text-body-color dark:text-body-color-dark">
              <p>{t("note1")}</p>
              <p className="mt-2">{t("note2")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressKitScreenshots;