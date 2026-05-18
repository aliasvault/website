"use client";

import { useCallback, useEffect, useState } from "react";
import CopyLinkIcon from "../Common/CopyLinkIcon";
import SectionTitle from "../Common/SectionTitle";
import { FAQItem } from "./faqData";

export function getFaqItemId(faq: FAQItem) {
  return faq.slug ?? `faq-${faq.id}`;
}

type FAQColorMode = "default" | "onGrayBackground";

const headerColorClasses: Record<
  FAQColorMode,
  { base: string; open: string }
> = {
  default: {
    base: "bg-gray-100/50 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/80",
    open: "bg-gray-200/80 dark:bg-gray-700/80",
  },
  onGrayBackground: {
    base: "bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/80",
    open: "bg-gray-50 dark:bg-gray-700/80",
  },
};

type FAQAccordionProps = {
  id?: string;
  title: string;
  description: string;
  items: FAQItem[];
  className?: string;
  copyLabel?: string;
  /** Renders inside a parent container (e.g. pricing page) without extra section/container wrappers. */
  embedded?: boolean;
  /** Use `onGrayBackground` when FAQ sits on a light grey section (e.g. pricing). */
  colorMode?: FAQColorMode;
};

const FAQAccordion = ({
  id = "faq",
  title,
  description,
  items,
  className = "",
  copyLabel = "Copy link",
  embedded = false,
  colorMode = "default",
}: FAQAccordionProps) => {
  const headerColors = headerColorClasses[colorMode];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openFromHash = useCallback(
    (options: { scroll?: boolean; smooth?: boolean } = {}) => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const index = items.findIndex((faq) => getFaqItemId(faq) === hash);
      if (index < 0) return;

      setOpenIndex(index);
      if (!options.scroll) return;

      const scrollToTarget = () => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: options.smooth ? "smooth" : "instant",
          block: "start",
        });
      };

      // Wait for open state to land in the DOM before measuring scroll position.
      requestAnimationFrame(() => requestAnimationFrame(scrollToTarget));
    },
    [items]
  );

  useEffect(() => {
    const hasHash = Boolean(window.location.hash);
    openFromHash(hasHash ? { scroll: true, smooth: false } : {});
    const onHashChange = () => openFromHash({ scroll: true, smooth: true });
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [openFromHash]);

  const handleToggle = (index: number) => {
    const itemId = getFaqItemId(items[index]);
    const isClosing = openIndex === index;

    if (isClosing) {
      setOpenIndex(null);
      if (window.location.hash.slice(1) === itemId) {
        const path = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(null, "", path);
      }
      return;
    }

    setOpenIndex(index);
    // Do not set location.hash on user toggle — browsers scroll to #:id targets; copy links still work via CopyLinkIcon.
  };

  const accordion = (
    <>
      <SectionTitle title={title} paragraph={description} center width="800px" />
      <div className="mx-auto max-w-[800px]">
        {items.map((faq, index) => (
          <div
            key={faq.id}
            id={getFaqItemId(faq)}
            className={`mb-4 scroll-mt-28 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 ${
              colorMode === "onGrayBackground" ? "bg-white dark:bg-gray-800" : ""
            }`}
          >
            <div
              className={`relative flex w-full items-center gap-2 px-6 py-4 transition-colors duration-200 ${headerColors.base} ${
                openIndex === index ? headerColors.open : ""
              }`}
            >
              <button
                type="button"
                className="absolute inset-0 z-0"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
                aria-labelledby={`faq-question-${faq.id}`}
              />
              <span
                id={`faq-question-${faq.id}`}
                className="pointer-events-none relative z-10 min-w-0 flex-1 text-left text-lg font-semibold text-black dark:text-white"
              >
                {faq.question}
              </span>
              {openIndex === index ? (
                <div className="relative z-10 shrink-0">
                  <CopyLinkIcon sectionId={getFaqItemId(faq)} label={copyLabel} />
                </div>
              ) : null}
              <svg
                className={`pointer-events-none relative z-10 h-4 w-4 shrink-0 transform text-black transition-transform duration-200 ease-in-out dark:text-white ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
              className={`transform transition-all duration-300 ease-in-out ${
                openIndex === index ? "visible max-h-128 opacity-100" : "invisible max-h-0 opacity-0"
              }`}
            >
              <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                <div
                  className="whitespace-pre-line text-base text-body-color dark:text-body-color-dark [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-2 [&_a]:transition-all [&_a]:duration-200 hover:[&_a]:decoration-primary"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  if (embedded) {
    return (
      <div id={id} className={`mb-12 md:mb-16 ${className}`}>
        {accordion}
      </div>
    );
  }

  return (
    <section id={id} className={`pt-16 md:pt-20 lg:pt-28 ${className}`}>
      <div className="container">{accordion}</div>
    </section>
  );
};

export default FAQAccordion;
