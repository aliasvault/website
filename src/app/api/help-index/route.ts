import { NextRequest, NextResponse } from 'next/server'
import { getAllHelpArticles } from '@/lib/help'
import { routing } from '@/i18n/routing'

// Search index for the Help center's live search. Content lives in the Payload
// database (runtime-only), so this is built per request and cached briefly.
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get('locale') ?? routing.defaultLocale
  const locale = (routing.locales as readonly string[]).includes(requested)
    ? requested
    : routing.defaultLocale

  const articles = await getAllHelpArticles(locale)
  const index = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    section: a.section,
  }))

  return NextResponse.json(
    { articles: index },
    { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' } },
  )
}
