"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { FiSearch, FiX } from "react-icons/fi";
import Card from "@/components/Common/Card";
import IconTile from "@/components/Common/IconTile";
import { faqCategoryAnchor, type FaqCategoryIconKey } from "@/lib/faq-categories";
import FAQAccordion, { type FAQItem } from "./FAQAccordion";
import FaqCategoryIcon from "./FaqCategoryIcon";

export type DirectoryItem = FAQItem & {
  /** Question + answer as plain text, for search. */
  searchText: string;
};

export interface DirectoryCategory {
  key: string;
  icon: FaqCategoryIconKey;
  title: string;
  description: string;
  items: DirectoryItem[];
}

// Case- and accent-insensitive ("geïmporteerd" matches "geimporteerd").
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/**
 * The /faq body: a search box and one accordion per category, in a single
 * scrollable column. Search filters the questions in place; everything is
 * already in the server-rendered HTML.
 */
export default function FaqDirectory({ categories }: { categories: DirectoryCategory[] }) {
  const t = useTranslations("faq");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const indexed = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        items: c.items.map((item) => ({ item, haystack: normalize(item.searchText) })),
      })),
    [categories]
  );

  const visible = useMemo(() => {
    const terms = normalize(deferredQuery).split(/\s+/).filter(Boolean);
    return indexed
      .map((c) => ({
        ...c,
        items: c.items
          .filter(({ haystack }) => terms.every((term) => haystack.includes(term)))
          .map(({ item }) => item),
      }))
      .filter((c) => c.items.length > 0);
  }, [indexed, deferredQuery]);

  const searching = deferredQuery.trim().length > 0;

  return (
    <div id="faq-directory">
      <div className="relative mx-auto mb-14 w-full max-w-2xl">
        <FiSearch
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-body-color dark:text-body-color-dark"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("page.searchPlaceholder")}
          aria-label={t("page.searchPlaceholder")}
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-[3.25rem] pr-12 text-base text-black shadow-three outline-none transition-all duration-200 placeholder:text-body-color/70 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-800 dark:bg-gray-dark dark:text-white dark:shadow-none dark:placeholder:text-body-color-dark/70 [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={t("page.clearSearch")}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-body-color transition-colors hover:text-primary dark:text-body-color-dark"
          >
            <FiX className="h-5 w-5" aria-hidden />
          </button>
        ) : null}
      </div>

      <div className="space-y-14">
        {visible.map((c) => (
          <section key={c.key} id={faqCategoryAnchor(c.key)} className="scroll-mt-28" aria-labelledby={`${faqCategoryAnchor(c.key)}-title`}>
            <div className="mb-6 flex items-center gap-4">
              <IconTile>
                <FaqCategoryIcon icon={c.icon} className="h-6 w-6" />
              </IconTile>
              <div>
                <h2 id={`${faqCategoryAnchor(c.key)}-title`} className="text-xl font-bold text-black dark:text-white sm:text-2xl">
                  {c.title}
                </h2>
                <p className="text-base text-body-color dark:text-body-color-dark">{c.description}</p>
              </div>
            </div>
            <FAQAccordion
              id={`faq-list-${c.key}`}
              items={c.items}
              copyLabel={t("copyLink")}
              className="!mb-0 [&>div]:max-w-none"
              embedded
            />
          </section>
        ))}

        {searching && visible.length === 0 ? (
          <Card variant="dashed" className="text-center">
            <p className="text-lg font-semibold text-black dark:text-white">
              {t("page.noResults", { query: deferredQuery.trim() })}
            </p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
