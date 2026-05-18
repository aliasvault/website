import { FAQItem } from "@/components/FAQ/faqData";
import { withMarkdownLinks } from "@/components/FAQ/faqAnswerLinks";

const getPricingFAQData = (t: (key: string) => string): FAQItem[] => [
  {
    id: 1,
    slug: "when-premium-available",
    question: t("pricing.faq.items.whenPremiumAvailable.question"),
    answer: t("pricing.faq.items.whenPremiumAvailable.answer")
      .replace(/\[contactLink\]/g, "<a href='/contact'>")
      .replace(/\[\/contactLink\]/g, "</a>")
      .replace(/\[supportLink\]/g, "<a href='#support-development'>")
      .replace(/\[\/supportLink\]/g, "</a>"),
  },
  {
    id: 2,
    slug: "free-tier-stays",
    question: t("pricing.faq.items.freeTierStays.question"),
    answer: t("pricing.faq.items.freeTierStays.answer"),
  },
  {
    id: 3,
    slug: "how-can-it-be-free",
    question: t("pricing.faq.items.howCanItBeFree.question"),
    answer: t("pricing.faq.items.howCanItBeFree.answer"),
  },
  {
    id: 4,
    slug: "self-funded",
    question: t("pricing.faq.items.selfFunded.question"),
    answer: t("pricing.faq.items.selfFunded.answer")
      .replace(/\[missionLink\]/g, "<a href='/mission'>")
      .replace(/\[\/missionLink\]/g, "</a>")
      .replace(/\[contactLink\]/g, "<a href='/contact'>")
      .replace(/\[\/contactLink\]/g, "</a>"),
  },
  {
    id: 5,
    slug: "fair-use",
    question: t("pricing.faq.items.fairUse.question"),
    answer: t("pricing.faq.items.fairUse.answer"),
  },
  {
    id: 6,
    slug: "self-hosted-vs-cloud",
    question: t("pricing.faq.items.selfHostedVsCloud.question"),
    answer: t("pricing.faq.items.selfHostedVsCloud.answer")
      .replace(/\[sourceLink\]/g, "<a href='/source-code'>")
      .replace(/\[\/sourceLink\]/g, "</a>"),
  },
  {
    id: 7,
    slug: "here-to-stay",
    question: t("pricing.faq.items.hereToStay.question"),
    answer: withMarkdownLinks(t("pricing.faq.items.hereToStay.answer")),
  },
];

export default getPricingFAQData;

export const PREMIUM_AVAILABILITY_FAQ_HASH = "when-premium-available";
