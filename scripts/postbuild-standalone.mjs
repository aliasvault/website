import { cpSync, existsSync } from 'node:fs'

const standalone = '.next/standalone'

if (!existsSync(standalone)) {
  console.log('[postbuild] no standalone output (output !== "standalone") — skipping')
  process.exit(0)
}

cpSync('.next/static', `${standalone}/.next/static`, { recursive: true })
console.log('[postbuild] copied .next/static → standalone')

if (existsSync('public')) {
  cpSync('public', `${standalone}/public`, { recursive: true })
  console.log('[postbuild] copied public → standalone')
}
