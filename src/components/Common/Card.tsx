import type { HTMLAttributes } from "react";
import { Link } from "@/i18n/navigation";

/**
 * - `default`: white surface with a subtle shadow; the standard content card.
 * - `highlight`: primary-tinted panel, to draw attention (e.g. "Now", article summary, key contact info).
 * - `dashed`: outline only, for empty states and placeholders.
 */
export type CardVariant = "default" | "highlight" | "dashed";

/** `sm` is meant for compact/nested cards (list items) and also uses a smaller radius. */
export type CardPadding = "none" | "sm" | "md" | "lg";

interface CardClassOptions {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Hover state for cards that are (or contain a single) link. */
  interactive?: boolean;
  /** Lift the card on hover; only applies when `interactive`. */
  lift?: boolean;
  /** Card placed inside another card: keeps it distinguishable from its parent in dark mode. */
  nested?: boolean;
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  default:
    "border border-gray-200 bg-white shadow-three dark:border-white/10 dark:bg-gray-dark dark:shadow-none",
  highlight: "border border-primary/25 bg-primary/5 dark:border-primary/30 dark:bg-primary/10",
  dashed: "border border-dashed border-gray-300 dark:border-gray-700",
};

const nestedDefaultClasses =
  "border border-gray-200 bg-white shadow-three dark:border-gray-700/60 dark:bg-white/[0.03] dark:shadow-none";

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6",
  lg: "p-6 sm:p-7 lg:p-8",
};

/** Class names for the shared card surface; used by `<Card>`. */
function cardClasses({
  variant = "default",
  padding = "md",
  interactive = false,
  lift = false,
  nested = false,
  className = "",
}: CardClassOptions = {}): string {
  return [
    padding === "sm" ? "rounded-xl" : "rounded-2xl",
    nested && variant === "default" ? nestedDefaultClasses : variantClasses[variant],
    paddingClasses[padding],
    interactive && "transition-all duration-200 hover:border-primary/40 dark:hover:border-primary/40",
    interactive && lift && "hover:-translate-y-1 hover:shadow-two dark:hover:shadow-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

interface CardProps extends CardClassOptions, HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article" | "aside" | "figure" | "ul" | "li";
  /** Render the whole card as a locale-aware internal link (ignores `as`). */
  href?: string;
}

/** Shared card/panel surface, so boxes look the same throughout the site. */
const Card = ({
  as: Tag = "div",
  variant,
  padding,
  interactive,
  lift,
  nested,
  href,
  className,
  children,
  ...rest
}: CardProps) => {
  const classes = cardClasses({ variant, padding, interactive, lift, nested, className });
  return href ? (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  ) : (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};

export default Card;
