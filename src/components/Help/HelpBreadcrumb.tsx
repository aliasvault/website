import { Link } from '@/i18n/navigation'

export interface Crumb {
  label: string
  /** Omit href for the current (last) item. */
  href?: string
}

/** Visible breadcrumb trail for Help pages (backs the BreadcrumbList JSON-LD). */
export default function HelpBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-body-color">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-x-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-black dark:text-white">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
