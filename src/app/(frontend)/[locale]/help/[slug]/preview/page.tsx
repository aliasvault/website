import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getHelpArticleBySlug } from '@/lib/help'
import { getCurrentUser } from '@/payload/auth'
import HelpArticleView from '@/components/Help/HelpArticleView'
import RefreshOnSave from '@/components/Lexical/RefreshOnSave'

// Rendered on demand (never statically generated) so reviewers can preview any
// article — including drafts — in the real site theme, with Payload Live Preview.
export const dynamic = 'force-dynamic'

interface HelpPreviewPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function HelpPreviewPage({ params }: HelpPreviewPageProps) {
  const { slug, locale } = await params
  const user = await getCurrentUser()
  if (!user) notFound()

  // draft = true → returns the latest draft (or published) version.
  const article = await getHelpArticleBySlug(slug, locale, { draft: true, user })

  if (!article) {
    notFound()
  }

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100'

  return (
    <>
      <RefreshOnSave serverURL={serverURL} />
      <HelpArticleView article={article} locale={locale} isPreview />
    </>
  )
}
