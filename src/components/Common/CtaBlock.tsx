import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";

interface CtaBlockProps {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  /** Open in a new tab with an external-link icon; otherwise a locale-aware internal link with an arrow. */
  external?: boolean;
  /** Optional icon shown left of the text, e.g. `SiGithub`. */
  icon?: IconType;
  /** Heading element, so the block fits the heading outline of the page it is used on. */
  headingAs?: "h2" | "h3";
  className?: string;
}

/**
 * Small full-width call to action: a neutral card with a title and description,
 * and a separate button (stacked on small screens). Only the button is clickable.
 */
const CtaBlock = ({
  title,
  description,
  buttonLabel,
  href,
  external = false,
  icon: Icon,
  headingAs: Heading = "h3",
  className = "",
}: CtaBlockProps) => {
  const buttonClassName =
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-base font-semibold text-white duration-300 hover:bg-primary/90";

  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-dark sm:flex-row sm:items-center sm:justify-between sm:p-6 ${className}`}
    >
      <div className="flex items-center gap-4">
        {Icon && <Icon className="h-8 w-8 shrink-0 text-black dark:text-white" aria-hidden="true" />}
        <div>
          <Heading className="text-lg font-semibold text-black dark:text-white">{title}</Heading>
          <p className="text-base text-body-color dark:text-body-color-dark">{description}</p>
        </div>
      </div>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClassName}>
          {buttonLabel}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ) : (
        <Link href={href} className={buttonClassName}>
          {buttonLabel}
          <FiArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
};

export default CtaBlock;
