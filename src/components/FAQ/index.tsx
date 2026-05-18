"use client";

import { useTranslations } from "next-intl";
import FAQAccordion from "./FAQAccordion";
import getFAQData from "./faqData";

const FAQ = () => {
  const t = useTranslations();
  const faqData = getFAQData(t);

  return (
    <FAQAccordion
      id="faq"
      title={t("faq.title")}
      description={t("faq.description")}
      items={faqData}
      copyLabel={t("faq.copyLink")}
    />
  );
};

export default FAQ;
