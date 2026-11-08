import { FiArrowRight } from "react-icons/fi";
import RichText from "@/components/Lexical/RichText";
import { Link } from "@/i18n/navigation";
import type { FaqEntry } from "@/lib/faq";
import type { FAQItem } from "./FAQAccordion";

/** Server-rendered answer: compact rich text plus an optional "Learn more" Help link. */
function FaqAnswer({ entry, learnMoreLabel }: { entry: FaqEntry; learnMoreLabel: string }) {
  return (
    <>
      <RichText data={entry.answer} className="faq-answer" />
      {entry.related ? (
        <Link
          href={`/help/${entry.related.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          {learnMoreLabel}: {entry.related.title}
          <FiArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : null}
    </>
  );
}

/** Maps CMS entries to accordion items, rendering each answer on the server. */
export function faqAccordionItems(entries: FaqEntry[], learnMoreLabel: string): FAQItem[] {
  return entries.map((entry) => ({
    id: entry.id,
    slug: entry.slug,
    question: entry.question,
    answer: <FaqAnswer entry={entry} learnMoreLabel={learnMoreLabel} />,
  }));
}
