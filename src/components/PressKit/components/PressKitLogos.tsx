"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/Common/SectionTitle";
import Card from "@/components/Common/Card";
import { buttonClasses } from "@/components/Common/Button";

const PressKitLogos = () => {
  const t = useTranslations("pressKitLogos");

  return (
    <div className="py-16 md:py-20 lg:py-24">
      <div className="container">
        <SectionTitle
          title={t("title")}
          paragraph={t("description")}
          center
        />
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Square Logo - Left Side */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="mb-6">
                    <Image
                      src="/presskit/logo.svg"
                      alt="AliasVault logo"
                      width={120}
                      height={120}
                      className="h-32 w-32"
                    />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                    {t("squareLogo.title")}
                  </h4>
                  <p className="mb-6 text-sm text-center text-body-color dark:text-body-color-dark">
                    {t("squareLogo.description")}
                  </p>
                  <div className="space-y-2">
                    <a
                      href="/presskit/logo.svg"
                      download
                      className={buttonClasses({ size: "sm", fullWidth: true })}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      {t("downloads.downloadSvg")}
                    </a>
                    <a
                      href="/presskit/logo-1024.png"
                      download
                      className={buttonClasses({ variant: "secondary", size: "sm", fullWidth: true })}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      {t("downloads.downloadPng")}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Wordmark Preview - Right Side (2 columns) */}
            <div className="lg:col-span-2">
              <Card padding="none" className="overflow-hidden">
                <div className="p-6">
                  <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
                    {t("wordmarkLogos.title")}
                  </h4>
                  <p className="mb-6 text-sm text-body-color dark:text-body-color-dark">
                    {t("wordmarkLogos.description")}
                  </p>

                  {/* Wordmark Preview Grid */}
                  <div className="grid grid-cols-2 gap-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
                    {/* Black wordmark on light background */}
                    <div className="bg-gray-50 dark:bg-gray-100 p-8 flex items-center justify-center">
                      <Image
                        src="/presskit/aliasvault-wordmark-black.svg"
                        alt="AliasVault wordmark black"
                        width={200}
                        height={60}
                        className="w-full max-w-[180px] h-auto"
                      />
                    </div>

                    {/* White wordmark on dark background */}
                    <div className="bg-gray-800 dark:bg-gray-900 p-8 flex items-center justify-center">
                      <Image
                        src="/presskit/aliasvault-wordmark-white.svg"
                        alt="AliasVault wordmark white"
                        width={200}
                        height={60}
                        className="w-full max-w-[180px] h-auto"
                      />
                    </div>
                  </div>

                  {/* Usage Guidelines */}
                  <div className="mb-6 rounded-lg bg-gray-light p-4 dark:bg-gray-900">
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t("usageGuidelines.title")}
                    </h5>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {t.raw("usageGuidelines.items").map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Download All Assets */}
                  <div className="space-y-3">
                    {/* Main ZIP download */}
                    <a
                      href="/presskit/aliasvault-logos.zip"
                      download
                      className={buttonClasses({ fullWidth: true })}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      {t("downloads.downloadAll")}
                    </a>

                    {/* Individual downloads */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {t("downloads.blackWordmark")}
                        </p>
                        <div className="flex gap-2">
                          <a
                            href="/presskit/aliasvault-wordmark-black.svg"
                            download
                            className={buttonClasses({ variant: "secondary", size: "xs", className: "flex-1" })}
                          >
                            SVG
                          </a>
                          <a
                            href="/presskit/aliasvault-wordmark-black.png"
                            download
                            className={buttonClasses({ variant: "secondary", size: "xs", className: "flex-1" })}
                          >
                            PNG
                          </a>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {t("downloads.whiteWordmark")}
                        </p>
                        <div className="flex gap-2">
                          <a
                            href="/presskit/aliasvault-wordmark-white.svg"
                            download
                            className={buttonClasses({ variant: "secondary", size: "xs", className: "flex-1" })}
                          >
                            SVG
                          </a>
                          <a
                            href="/presskit/aliasvault-wordmark-white.png"
                            download
                            className={buttonClasses({ variant: "secondary", size: "xs", className: "flex-1" })}
                          >
                            PNG
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Brand Colors */}
          <Card className="mt-8">
            <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
              {t("brandColors.title")}
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="h-20 rounded-lg bg-primary mb-2"></div>
                <p className="text-sm font-medium">{t("brandColors.primary")}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">#f49541</p>
              </div>
              <div className="text-center">
                <div className="h-20 rounded-lg bg-[#FCFCFC] mb-2 border border-gray-200 dark:border-gray-700"></div>
                <p className="text-sm font-medium">{t("brandColors.lightBackground")}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">#fcfcfc</p>
              </div>
              <div className="text-center">
                <div className="h-20 rounded-lg bg-[#121723] mb-2 border border-gray-200 dark:border-gray-700"></div>
                <p className="text-sm font-medium">{t("brandColors.darkBackground")}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">#121723</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PressKitLogos;