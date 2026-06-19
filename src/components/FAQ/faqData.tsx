export type FAQItem = {
  id: number;
  question: string;
  answer: string;
  /** URL hash for deep links (e.g. pricing cards linking to a specific answer). */
  slug?: string;
};

const getFAQData = (t: (key: string) => string): FAQItem[] => [
  {
    id: 1,
    slug: "what-is-aliasvault",
    question: t('faq.items.whatIsAliasVault.question'),
    answer: t('faq.items.whatIsAliasVault.answer'),
  },
  {
    id: 2,
    slug: "passkey-support",
    question: t('faq.items.passkeySupport.question'),
    answer: t('faq.items.passkeySupport.answer'),
  },
  {
    id: 3,
    slug: "pricing",
    question: t('faq.items.pricing.question'),
    answer: t('faq.items.pricing.answer')
      .replace(/\[contactLink\]/g, "<a href='/contact#donations' rel='noopener noreferrer'>")
      .replace(/\[\/contactLink\]/g, "</a>"),
  },
  {
    id: 4,
    slug: "device-support",
    question: t('faq.items.deviceSupport.question'),
    answer: t('faq.items.deviceSupport.answer'),
  },
  {
    id: 5,
    slug: "security",
    question: t('faq.items.security.question'),
    answer: t('faq.items.security.answer')
      .replace(/\[docsLink\]/g, "<a href='https://docs.aliasvault.com/architecture' target='_blank' rel='noopener noreferrer'>")
      .replace(/\[\/docsLink\]/g, "</a>"),
  },
  {
    id: 6,
    slug: "import-data",
    question: t('faq.items.importData.question'),
    answer: t('faq.items.importData.answer'),
  },
  {
    id: 7,
    slug: "self-hosting",
    question: t('faq.items.selfHosting.question'),
    answer: t('faq.items.selfHosting.answer')
      .replace(/\[docsLink\]/g, "<a href='https://docs.aliasvault.com' target='_blank' rel='noopener noreferrer'>")
      .replace(/\[\/docsLink\]/g, "</a>"),
  },
  {
    id: 8,
    slug: "email-alias-feature",
    question: t('faq.items.emailAliasFeature.question'),
    answer: t('faq.items.emailAliasFeature.answer'),
  },
  {
    id: 9,
    slug: "email-alias-limitations",
    question: t('faq.items.emailAliasLimitations.question'),
    answer: t('faq.items.emailAliasLimitations.answer'),
  },
  {
    id: 10,
    slug: "story",
    question: t('faq.items.story.question'),
    answer: t('faq.items.story.answer')
      .replace(/\[missionLink\]/g, "<a href='/mission' rel='noopener noreferrer'>")
      .replace(/\[\/missionLink\]/g, "</a>"),
  },
];

export default getFAQData;
