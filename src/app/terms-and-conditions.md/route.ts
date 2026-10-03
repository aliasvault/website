import { legalMarkdownResponse } from '@/lib/legal'
import { termsAndConditions } from '@/lib/legal/terms-and-conditions'

/** Markdown version of the Terms and Conditions; the AliasVault web app shows it during registration. */
export function GET() {
  return legalMarkdownResponse(termsAndConditions)
}
