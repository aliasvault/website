/**
 * - `primary`: filled brand button; the main action in a section.
 * - `primaryStrong`: darker filled button, for use on primary-tinted/gradient backgrounds.
 * - `secondary`: neutral outline; for alternative or less important actions.
 * - `outline`: brand-colored outline that fills on hover (e.g. header login).
 */
export type ButtonVariant = "primary" | "primaryStrong" | "secondary" | "outline";
/** `nav`: compact padding with base-size text, to line up with header menu links. */
export type ButtonSize = "xs" | "sm" | "nav" | "md" | "lg";

interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90 hover:shadow-md hover:shadow-black/10",
  primaryStrong: "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-md hover:shadow-black/10",
  secondary:
    "border border-gray-300 bg-white text-black hover:border-primary/50 hover:text-primary dark:border-gray-700 dark:bg-white/[0.03] dark:text-white dark:hover:border-primary/60 dark:hover:text-primary",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "gap-1.5 px-3 py-1.5 text-xs",
  sm: "gap-2 px-4 py-2 text-sm",
  nav: "gap-2 px-4 py-2 text-base",
  md: "gap-2 px-6 py-3 text-base",
  lg: "gap-2 px-8 py-4 text-base",
};

/**
 * Class names for the shared button style. Apply to whatever element fits the
 * use (`Link`, `<a>`, `<button>`), so all buttons share one shape and hover.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonClassOptions = {}): string {
  return [
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}
