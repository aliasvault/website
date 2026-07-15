import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

/**
 * Dynamic Open Graph image (1200×630) for social sharing / link unfurls.
 *
 * Usage: /api/og?title=Page+Title&description=...&badge=Help+Center
 * Every page's metadata points here (see SEOMetadata.tsx) unless it supplies
 * its own image (e.g. blog posts with a cover image).
 */

// Assets are read from public/ (copied into the standalone output by
// scripts/postbuild-standalone.mjs) and cached for the process lifetime.
let assets: Promise<{ inter400: Buffer; inter700: Buffer; logo: string }> | null = null

function loadAssets() {
  if (!assets) {
    assets = (async () => {
      const pub = (...p: string[]) => path.join(process.cwd(), 'public', ...p)
      const [inter400, inter700, logoPng] = await Promise.all([
        readFile(pub('fonts', 'inter-latin-400-normal.woff')),
        readFile(pub('fonts', 'inter-latin-700-normal.woff')),
        readFile(pub('presskit', 'logo-1024.png')),
      ])
      return {
        inter400,
        inter700,
        logo: `data:image/png;base64,${logoPng.toString('base64')}`,
      }
    })()
  }
  return assets
}

const clamp = (value: string | null, max: number): string => {
  const v = (value ?? '').replace(/\s+/g, ' ').trim()
  return v.length > max ? `${v.slice(0, max - 1).trimEnd()}…` : v
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = clamp(searchParams.get('title'), 100) || 'AliasVault'
  const description = clamp(searchParams.get('description'), 160)
  const badge = clamp(searchParams.get('badge'), 40)

  const { inter400, inter700, logo } = await loadAssets()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#121723',
          backgroundImage:
            'radial-gradient(circle at 88% 8%, rgba(244,149,65,0.28) 0%, rgba(244,149,65,0) 46%), ' +
            'radial-gradient(circle at 6% 100%, rgba(214,131,56,0.22) 0%, rgba(214,131,56,0) 42%)',
          padding: '60px 72px',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={64} height={64} alt="" />
          <span style={{ fontSize: 34, fontWeight: 700, color: '#FFFFFF', letterSpacing: -0.5 }}>
            AliasVault
          </span>
          {badge && (
            <span
              style={{
                marginLeft: 8,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 9999,
                border: '1.5px solid rgba(244,149,65,0.55)',
                backgroundColor: 'rgba(244,149,65,0.12)',
                color: '#f6a752',
                fontSize: 24,
                fontWeight: 700,
                padding: '8px 22px',
              }}
            >
              {badge}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div
            style={{
              fontSize: title.length > 60 ? 56 : 66,
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.12,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                marginTop: 26,
                fontSize: 29,
                fontWeight: 400,
                color: '#9FA6B9',
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 6, backgroundColor: '#f49541', borderRadius: 3 }} />
            <span style={{ fontSize: 26, color: '#9FA6B9' }}>aliasvault.com</span>
          </div>
          <span style={{ fontSize: 24, color: '#6A7485' }}>Open source · End-to-end encrypted</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter700, weight: 700, style: 'normal' },
      ],
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800',
      },
    },
  )
}
