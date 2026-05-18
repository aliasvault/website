"use client";

import FAQAccordion from "@/components/FAQ/FAQAccordion";
import { useTranslations } from "next-intl";
import getPricingFAQData from "./pricingFaqData";

const withContactLink = (text: string) =>
  text
    .replace(/\[contactLink\]/g, "<a href='/contact'>")
    .replace(/\[\/contactLink\]/g, "</a>");

const PricingFAQ = ({ className = "" }: { className?: string }) => {
  const t = useTranslations();
  const items = getPricingFAQData(t);

  return (
    <FAQAccordion
      id="pricing-faq"
      title={t("pricing.faq.title")}
      description={withContactLink(t("pricing.faq.description"))}
      items={items}
      copyLabel={t("pricing.faq.copyLink")}
      className={className}
      embedded
    />
  );
};

export default PricingFAQ;
