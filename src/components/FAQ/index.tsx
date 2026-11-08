import { FiArrowRight } from "react-icons/fi";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/Common/Button";
import { getFaqs } from "@/lib/faq";
import FAQAccordion from "./FAQAccordion";
import FaqHashRedirect from "./FaqHashRedirect";
import { faqAccordionItems } from "./faqItems";

/** Homepage FAQ: the questions marked "Homepage" in the CMS, plus a link to /faq. */
const FAQ = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({ locale });
  const all = await getFaqs(locale);
  const home = all.filter((f) => f.showOn.includes("home"));
  // Old homepage deep links (/#slug) for questions now only on /faq.
  const onFaqPageOnly = all
    .filter((f) => !f.showOn.includes("home") && f.showOn.includes("faq"))
    .map((f) => f.slug);

  return (
    <section id="faq" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <FAQAccordion
          id="faq-home-list"
          title={t("faq.title")}
          description={t("faq.description")}
          items={faqAccordionItems(home, t("faq.learnMore"))}
          copyLabel={t("faq.copyLink")}
          className="!mb-10"
          embedded
        />
        <div className="text-center">
          <Link href="/faq" className={buttonClasses({ variant: "secondary" })}>
            {t("faq.viewAll")}
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <FaqHashRedirect slugs={onFaqPageOnly} />
      </div>
    </section>
  );
};

export default FAQ;
