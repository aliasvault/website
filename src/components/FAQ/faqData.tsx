export type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const getFAQData = (t: (key: string) => string): FAQItem[] => [
  {
    id: 1,
    question: t('faq.items.whatIsAliasVault.question'),
    answer: t('faq.items.whatIsAliasVault.answer'),
  },
  {
    id: 2,
    question: t('faq.items.passkeySupport.question'),
    answer: t('faq.items.passkeySupport.answer'),
  },
  {
    id: 3,
    question: t('faq.items.pricing.question'),
    answer: t('faq.items.pricing.answer')
      .replace(/\[contactLink\]/g, "<a href='/contact' rel='noopener noreferrer'>")
      .replace(/\[\/contactLink\]/g, "</a>"),
  },
  {
    id: 4,
    question: t('faq.items.deviceSupport.question'),
    answer: t('faq.items.deviceSupport.answer'),
  },
  {
    id: 5,
    question: t('faq.items.security.question'),
    answer: t('faq.items.security.answer')
      .replace(/\[docsLink\]/g, "<a href='https://docs.aliasvault.net/architecture' target='_blank' rel='noopener noreferrer'>")
      .replace(/\[\/docsLink\]/g, "</a>"),
  },
  {
    id: 6,
    question: t('faq.items.importData.question'),
    answer: t('faq.items.importData.answer'),
  },
  {
    id: 7,
    question: t('faq.items.selfHosting.question'),
    answer: t('faq.items.selfHosting.answer')
      .replace(/\[docsLink\]/g, "<a href='https://docs.aliasvault.net' target='_blank' rel='noopener noreferrer'>")
      .replace(/\[\/docsLink\]/g, "</a>"),
  },
  {
    id: 8,
    question: t('faq.items.emailAliasFeature.question'),
    answer: t('faq.items.emailAliasFeature.answer'),
  },
  {
    id: 9,
    question: t('faq.items.emailAliasLimitations.question'),
    answer: t('faq.items.emailAliasLimitations.answer'),
  },
  {
    id: 10,
    question: t('faq.items.story.question'),
    answer: t('faq.items.story.answer')
      .replace(/\[missionLink\]/g, "<a href='/mission' rel='noopener noreferrer'>")
      .replace(/\[\/missionLink\]/g, "</a>"),
  },
];

export default getFAQData;