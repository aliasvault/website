import { getTranslations } from "next-intl/server";
import FAQAccordion from "@/components/FAQ/FAQAccordion";
import { faqAccordionItems } from "@/components/FAQ/faqItems";
import { getFaqs } from "@/lib/faq";

const withContactLink = (text: string) =>
  text
    .replace(/\[contactLink\]/g, "<a href='/contact'>")
    .replace(/\[\/contactLink\]/g, "</a>");

/** Pricing FAQ: the questions marked "Pricing page" in the CMS. */
const PricingFAQ = async ({ locale, className = "" }: { locale: string; className?: string }) => {
  const t = await getTranslations({ locale });
  const entries = await getFaqs(locale, { showOn: "pricing" });
  if (!entries.length) return null;

  return (
    <FAQAccordion
      id="pricing-faq"
      title={t("pricing.faq.title")}
      description={withContactLink(t("pricing.faq.description"))}
      items={faqAccordionItems(entries, t("faq.learnMore"))}
      copyLabel={t("pricing.faq.copyLink")}
      className={className}
      embedded
    />
  );
};

export default PricingFAQ;
