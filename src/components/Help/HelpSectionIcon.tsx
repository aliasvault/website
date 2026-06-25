import {
  FiBookOpen,
  FiCreditCard,
  FiGrid,
  FiShield,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import type { HelpSectionIconKey } from '@/lib/help-sections'

const ICONS: Record<HelpSectionIconKey, React.ComponentType<{ className?: string }>> = {
  rocket: FiZap,
  grid: FiGrid,
  shield: FiShield,
  card: FiCreditCard,
  users: FiUsers,
  book: FiBookOpen,
}

/** Maps a section's icon key (pure data) to a rendered icon. */
export default function HelpSectionIcon({
  icon,
  className,
}: {
  icon: HelpSectionIconKey
  className?: string
}) {
  const Icon = ICONS[icon] ?? FiBookOpen
  return <Icon className={className} />
}
