import { FiChevronRight } from 'react-icons/fi'
import { Link } from '@/i18n/navigation'

export interface Crumb {
  label: string
  /** Omit href for the current (last) item. */
  href?: string
}

/** Visible breadcrumb trail for Help pages (backs the BreadcrumbList JSON-LD). */
export default function HelpBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-body-color dark:text-body-color-dark">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-x-2">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-black dark:text-white">{item.label}</span>
            )}
            {i < items.length - 1 && <FiChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
