"use client";

import { ReactNode, useMemo } from "react";
import CopyLinkIcon from "@/components/Common/CopyLinkIcon";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function getNodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  // React element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return getNodeText((node as any).props?.children);
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AnchorHeading({
  as,
  id: idProp,
  children,
  className = "",
  copyLabel = "Copy link",
  showCopyIcon = true,
  scrollMarginClassName = "scroll-mt-24",
  ...rest
}: {
  as: HeadingTag;
  id?: string;
  children?: ReactNode;
  className?: string;
  copyLabel?: string;
  showCopyIcon?: boolean;
  scrollMarginClassName?: string;
} & Omit<React.HTMLAttributes<HTMLHeadingElement>, "id" | "children" | "className">) {
  const derivedId = useMemo(() => {
    if (idProp) return idProp;
    const text = getNodeText(children);
    const slug = slugify(text);
    return slug || undefined;
  }, [children, idProp]);

  const Tag = as;

  return (
    <Tag
      id={derivedId}
      className={`group flex items-center gap-2 ${scrollMarginClassName} ${className}`}
      {...rest}
    >
      {derivedId ? (
        <a
          href={`#${derivedId}`}
          className="no-underline hover:underline decoration-primary/30 underline-offset-4"
        >
          {children}
        </a>
      ) : (
        children
      )}

      {derivedId && showCopyIcon ? (
        <CopyLinkIcon
          sectionId={derivedId}
          label={copyLabel}
          className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        />
      ) : null}
    </Tag>
  );
}

