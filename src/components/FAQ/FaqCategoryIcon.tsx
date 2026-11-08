import { FiCompass, FiDatabase, FiMail, FiServer, FiShield, FiTag, FiUsers } from "react-icons/fi";
import type { FaqCategoryIconKey } from "@/lib/faq-categories";

const ICONS: Record<FaqCategoryIconKey, React.ComponentType<{ className?: string }>> = {
  compass: FiCompass,
  shield: FiShield,
  database: FiDatabase,
  mail: FiMail,
  server: FiServer,
  tag: FiTag,
  users: FiUsers,
};

/** Maps a category's icon key (pure data) to a rendered icon. */
export default function FaqCategoryIcon({ icon, className }: { icon: FaqCategoryIconKey; className?: string }) {
  const Icon = ICONS[icon] ?? FiCompass;
  return <Icon className={className} aria-hidden />;
}
