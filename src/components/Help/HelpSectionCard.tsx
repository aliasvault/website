import { Link } from '@/i18n/navigation'
import HelpSectionIcon from './HelpSectionIcon'
import type { HelpSection } from '@/lib/help-sections'

interface HelpSectionCardProps {
  section: HelpSection
  title: string
  description: string
  /** e.g. "5 articles". */
  meta?: string
}

/** A single section tile on the Help home grid. */
export default function HelpSectionCard({ section, title, description, meta }: HelpSectionCardProps) {
  return (
    <Link
      href={`/help/${section.key}`}
      className="shadow-three dark:bg-gray-dark flex h-full flex-col rounded-sm bg-white p-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-two dark:shadow-none"
    >
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <HelpSectionIcon icon={section.icon} className="h-6 w-6" />
      </span>
      <span className="mb-2 block text-lg font-semibold text-black dark:text-white">{title}</span>
      <span className="mb-4 block text-sm leading-relaxed text-body-color">{description}</span>
      {meta && <span className="mt-auto text-xs font-medium text-body-color">{meta}</span>}
    </Link>
  )
}
