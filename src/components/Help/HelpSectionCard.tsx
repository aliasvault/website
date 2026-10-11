import { FiArrowRight } from 'react-icons/fi'
import Card from '@/components/Common/Card'
import IconTile from '@/components/Common/IconTile'
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
    <Card href={`/help/${section.key}`} padding="lg" interactive lift className="group flex h-full flex-col">
      <IconTile className="mb-5 transition-colors duration-200 group-hover:from-primary/25 group-hover:to-primary/10">
        <HelpSectionIcon icon={section.icon} className="h-6 w-6" />
      </IconTile>
      <span className="mb-2 block text-lg font-semibold text-black transition-colors group-hover:text-primary dark:text-white">
        {title}
      </span>
      <span className="mb-5 block text-sm leading-relaxed text-body-color dark:text-body-color-dark">
        {description}
      </span>
      <span className="mt-auto flex items-center justify-between text-xs font-medium text-body-color dark:text-body-color-dark">
        {meta}
        <FiArrowRight className="h-4 w-4 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
      </span>
    </Card>
  )
}
