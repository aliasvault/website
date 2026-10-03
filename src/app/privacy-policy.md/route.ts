import { legalMarkdownResponse } from '@/lib/legal'
import { privacyPolicy } from '@/lib/legal/privacy-policy'

/** Markdown version of the Privacy Policy. */
export function GET() {
  return legalMarkdownResponse(privacyPolicy)
}
