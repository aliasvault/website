import { PHASE_PRODUCTION_BUILD } from 'next/constants'

/**
 * Centralized validation of required environment variables.
 *
 * The goal is a single, readable failure ("PAYLOAD_SECRET is missing, set it in
 * .env") instead of a deep "missing secret key" stack trace from inside Payload.
 */

/** True while `next build` is running (no DB/secret available yet). */
export const isBuildPhase = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD

interface RequiredVar {
  name: string
  /** What it's for, shown in the error to explain why it matters. */
  purpose: string
  /** How to obtain/set it. */
  hint: string
}

const REQUIRED_IN_PRODUCTION: RequiredVar[] = [
  {
    name: 'PAYLOAD_SECRET',
    purpose: 'signs auth JWTs and encrypts stored fields',
    hint: 'generate one with `openssl rand -hex 32`',
  },
]

let validated = false

/**
 * Throw a clear, aggregated error if any production-required env var is missing.
 */
export function assertRequiredEnv(): void {
  if (validated) return
  validated = true

  if (process.env.NODE_ENV !== 'production' || isBuildPhase) return

  const missing = REQUIRED_IN_PRODUCTION.filter(({ name }) => !process.env[name]?.trim())
  if (missing.length === 0) return

  const lines = missing.map(({ name, purpose, hint }) => `  • ${name} — ${purpose} (${hint})`)
  throw new Error(
    [
      `Missing required environment variable${missing.length > 1 ? 's' : ''}:`,
      ...lines,
      '',
      'Set them in .env (copy .env.example) before starting the server.',
    ].join('\n'),
  )
}
