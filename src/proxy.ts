import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Clean Markdown twins for Payload content: `/help|blog|news/<slug>.md`
// (and the `/<locale>/…` variants) → the matching `…/<slug>/md` route handler.
const CONTENT_MD = /^\/(?:([a-z]{2})\/)?(help|blog|news)\/([^/]+?)\.md$/;

export default function proxy(req: NextRequest) {
  const md = req.nextUrl.pathname.match(CONTENT_MD);
  if (md) {
    const [, locale, section, slug] = md;
    const url = req.nextUrl.clone();
    url.pathname = `/${locale ?? routing.defaultLocale}/${section}/${slug}/md`;
    return NextResponse.rewrite(url);
  }
  return intlMiddleware(req);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    '/((?!api|trpc|_next|_vercel|admin|.*\\..*).*)',

    '/:locale([a-z]{2})?/rss.xml',
    '/:locale([a-z]{2})?/news/:path*',
    '/:locale([a-z]{2})?/blog/:path*',

    // Markdown twins for Payload content (help/blog/news) — dotted paths,
    // otherwise excluded by the first matcher.
    '/((?:[a-z]{2}/)?(?:help|blog|news)/[^/]+\\.md)',
  ]
};
