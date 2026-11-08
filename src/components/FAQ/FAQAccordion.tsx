"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import CopyLinkIcon from "../Common/CopyLinkIcon";
import SectionTitle from "../Common/SectionTitle";

export type FAQItem = {
  id: string | number;
  /** Element id and URL hash for deep links (e.g. /faq#self-hosting). */
  slug: string;
  question: string;
  /** Rendered answer (server-rendered rich text). */
  answer: ReactNode;
};

const headerColors = {
  base: "bg-gray-100/50 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/80",
  open: "bg-gray-200/80 dark:bg-gray-700/80",
};

type FAQAccordionProps = {
  id?: string;
  /** Section heading; omit to render just the list (e.g. per category on /faq). */
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
  copyLabel?: string;
  /** Renders inside a parent container (e.g. pricing page) without extra section/container wrappers. */
  embedded?: boolean;
};

const FAQAccordion = ({
  id = "faq",
  title,
  description,
  items,
  className = "",
  copyLabel = "Copy link",
  embedded = false,
}: FAQAccordionProps) => {
  // Several answers can be open at once, so readers can compare them.
  const [openSlugs, setOpenSlugs] = useState<string[]>([]);

  // Read through a ref so a changing list (e.g. /faq search filtering) doesn't
  // re-run the mount effect below and scroll back to the hashed question.
  const slugsRef = useRef<string[]>([]);
  useEffect(() => {
    slugsRef.current = items.map((faq) => faq.slug);
  }, [items]);

  const openFromHash = useCallback(
    (options: { scroll?: boolean; smooth?: boolean } = {}) => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      if (!slugsRef.current.includes(hash)) return;

      setOpenSlugs((prev) => (prev.includes(hash) ? prev : [...prev, hash]));
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
    []
  );

  useEffect(() => {
    const hasHash = Boolean(window.location.hash);
    openFromHash(hasHash ? { scroll: true, smooth: false } : {});
    const onHashChange = () => openFromHash({ scroll: true, smooth: true });
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [openFromHash]);

  const handleToggle = (slug: string) => {
    const isClosing = openSlugs.includes(slug);

    if (isClosing) {
      setOpenSlugs((prev) => prev.filter((s) => s !== slug));
      if (window.location.hash.slice(1) === slug) {
        const path = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(null, "", path);
      }
      return;
    }

    setOpenSlugs((prev) => [...prev, slug]);
    // Do not set location.hash on user toggle — browsers scroll to #:id targets; copy links still work via CopyLinkIcon.
  };

  const accordion = (
    <>
      {title ? <SectionTitle title={title} paragraph={description ?? ""} center width="800px" /> : null}
      <div className="mx-auto max-w-[800px]">
        {items.map((faq) => {
          const isOpen = openSlugs.includes(faq.slug);
          return (
            <div
              key={faq.id}
              id={faq.slug}
              // Solid page-colored body, so items look the same on plain and tinted sections.
              className="mb-4 scroll-mt-28 overflow-hidden rounded-lg border border-gray-200 bg-[#FCFCFC] dark:border-white/10 dark:bg-black"
            >
              <div
                className={`relative flex w-full items-center gap-2 px-6 py-4 transition-colors duration-200 ${headerColors.base} ${
                  isOpen ? headerColors.open : ""
                }`}
              >
                <button
                  type="button"
                  className="absolute inset-0 z-0"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleToggle(faq.slug)}
                  aria-expanded={isOpen}
                  aria-labelledby={`faq-question-${faq.id}`}
                />
                <span
                  id={`faq-question-${faq.id}`}
                  className="pointer-events-none relative z-10 min-w-0 flex-1 text-left text-lg font-semibold text-black dark:text-white"
                >
                  {faq.question}
                </span>
                {isOpen ? (
                  <div className="relative z-10 shrink-0">
                    <CopyLinkIcon sectionId={faq.slug} label={copyLabel} />
                  </div>
                ) : null}
                <svg
                  className={`pointer-events-none relative z-10 h-4 w-4 shrink-0 transform text-black transition-transform duration-200 ease-in-out dark:text-white ${
                    isOpen ? "rotate-180" : ""
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
                  isOpen ? "visible max-h-128 opacity-100" : "invisible max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-gray-200 px-6 py-4 dark:border-white/10">{faq.answer}</div>
              </div>
            </div>
          );
        })}
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
