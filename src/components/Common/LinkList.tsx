import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import Card from "@/components/Common/Card";

export interface LinkListItem {
  title: ReactNode;
  href: string;
  /** Secondary line, e.g. the store name or an article summary. */
  description?: ReactNode;
  /** Optional icon, shown in a neutral tile left of the text. */
  icon?: ReactNode;
  /** Open in a new tab; otherwise a locale-aware internal link. */
  external?: boolean;
  ariaLabel?: string;
  /** Optional anchor id on the row, to keep deep links working. */
  id?: string;
}

/** Card with a divided list of link rows, each ending in an arrow. */
interface LinkListProps {
  items: LinkListItem[];
  /** Set when the list sits inside another card. */
  nested?: boolean;
  className?: string;
}

const LinkList = ({ items, nested = false, className = "" }: LinkListProps) => (
  <Card
    as="ul"
    padding="none"
    nested={nested}
    className={`divide-y divide-gray-100 overflow-hidden dark:divide-white/[0.06] ${className}`}
  >
    {items.map((item, i) => {
      const rowClassName =
        "group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-primary/[0.06] focus-visible:bg-primary/[0.06] focus-visible:outline-none";
      const content = (
        <>
          <span className="flex min-w-0 items-center gap-4">
            {item.icon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-light dark:bg-white/10">
                {item.icon}
              </span>
            )}
            <span className="min-w-0">
              <span className="block font-semibold text-black transition-colors group-hover:text-primary dark:text-white">
                {item.title}
              </span>
              {item.description && (
                <span className="mt-0.5 block text-sm text-body-color dark:text-body-color-dark">
                  {item.description}
                </span>
              )}
            </span>
          </span>
          <FiArrowRight
            className="h-4 w-4 shrink-0 text-primary opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden="true"
          />
        </>
      );

      return (
        // Index in the key: different rows may share a URL (e.g. Chrome and Brave).
        <li key={`${i}-${item.href}`} id={item.id}>
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              className={rowClassName}
            >
              {content}
            </a>
          ) : (
            <Link href={item.href} aria-label={item.ariaLabel} className={rowClassName}>
              {content}
            </Link>
          )}
        </li>
      );
    })}
  </Card>
);

export default LinkList;
