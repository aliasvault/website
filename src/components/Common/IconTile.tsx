import type { ReactNode } from "react";

const sizeClasses = {
  md: "h-12 w-12 rounded-xl",
  lg: "h-14 w-14 rounded-2xl",
};

interface IconTileProps {
  children: ReactNode;
  size?: keyof typeof sizeClasses;
  className?: string;
}

/** Primary-tinted square holding a section icon, e.g. next to a card heading. */
const IconTile = ({ children, size = "md", className = "" }: IconTileProps) => (
  <span
    className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-inset ring-primary/15 ${sizeClasses[size]} ${className}`}
  >
    {children}
  </span>
);

export default IconTile;
