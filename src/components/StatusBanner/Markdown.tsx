import type { ReactNode } from "react";

// Minimal inline Markdown for admin-authored text.

const TOKEN =
  /\[([^\]\n]+)\]\(([^()\s]+)\)|\*\*([^*\n]+)\*\*|`([^`\n]+)`|\*([^*\s][^*\n]*)\*|(https?:\/\/[^\s<>"')\]]*[^\s<>"')\].,;:!?])|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

function safeHref(url: string): string | null {
  return /^(https?:\/\/|mailto:)/i.test(url) ? url : null;
}

const LINK_CLASS = "text-primary underline hover:no-underline";

function link(key: number, href: string, children: ReactNode, className: string) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      key={key}
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function render(text: string, linkClass: string, inLink = false): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TOKEN)) {
    const [whole, linkText, linkUrl, bold, code, italic, url, email] = m;
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    last = start + whole.length;

    if (linkText !== undefined) {
      const href = safeHref(linkUrl);
      const inner = render(linkText, linkClass, true);
      out.push(href && !inLink ? link(k++, href, inner, linkClass) : <span key={k++}>{inner}</span>);
    } else if (bold !== undefined) {
      out.push(<strong key={k++}>{render(bold, linkClass, inLink)}</strong>);
    } else if (italic !== undefined) {
      out.push(<em key={k++}>{render(italic, linkClass, inLink)}</em>);
    } else if (code !== undefined) {
      out.push(
        <code key={k++} className="rounded bg-black/[0.06] px-1 py-0.5 text-[0.9em] dark:bg-white/10">
          {code}
        </code>,
      );
    } else if (url !== undefined) {
      out.push(inLink ? url : link(k++, url, url, linkClass));
    } else if (email !== undefined) {
      out.push(inLink ? email : link(k++, `mailto:${email}`, email, linkClass));
    }
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({
  text,
  linkClassName = LINK_CLASS,
}: {
  text: string;
  linkClassName?: string;
}) {
  return <>{render(text, linkClassName)}</>;
}

// Plain-text version for places that can't hold markup (e.g. native tooltips):
// links keep their text, emphasis markers are dropped.
export function stripMarkdown(text: string): string {
  return text.replace(TOKEN, (whole, linkText, _u, bold, code, italic) =>
    linkText ?? bold ?? code ?? italic ?? whole,
  );
}
