"use client";
import { useTranslations } from "next-intl";

const PressKitQuotes = () => {
  const t = useTranslations("pressKitQuotes");

  return (
    <div className="py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
          {t("title")}
        </h2>
        <p className="mb-8 text-base text-center leading-relaxed text-body-color dark:text-body-color-dark">
          {t("description")}
        </p>
        <div className="mx-auto max-w-6xl mt-20">
          <div className="grid gap-6 md:grid-cols-2">
            {t.raw("quotes").map((quote: { text: string; context: string }, index: number) => (
              <div key={index} className="rounded-lg border border-gray-200 p-6 dark:border-gray-700 bg-white dark:bg-gray-800">
                <blockquote className="text-lg italic text-body-color dark:text-body-color-dark mb-4">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {quote.context}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressKitQuotes;