FROM node:22-alpine AS base

RUN npm install -g npm@11

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry data about general usage
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry during the build
# ENV NEXT_TELEMETRY_DISABLED 1

# Payload boots during `next build` (to generate its admin import map etc.), so
# it needs a writable database to connect to. Point it at a THROWAWAY db in /tmp
# so the build doesn't touch the runtime ./data dir (bind-mounted at runtime and
# excluded from the image). This /tmp db is discarded with the builder stage.
#
# The real database is separate: at runtime DATABASE_URI is set by docker-compose
# to ./data/payload.db, and `prodMigrations` (see payload.config.ts) auto-applies
# any pending migrations to it on the container's first startup. Each db tracks
# its own migration state, so the build-time /tmp db does not affect it.
ENV DATABASE_URI=file:/tmp/payload-build.db

# Make sure your next.config.js has output: 'standalone' set
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Instead of using standalone output, copy the entire .next directory
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# Copy node_modules needed for production
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
# Copy package.json and next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Enable HSTS with a 5-minute max-age (300 seconds) as recommended for initial deployment
ENV HSTS_MAX_AGE 300
ENV HSTS_INCLUDE_SUBDOMAINS false
ENV HSTS_PRELOAD false

# Security Headers Configuration
ENV CSP_ENABLED true
ENV X_FRAME_OPTIONS "SAMEORIGIN"
ENV X_CONTENT_TYPE_OPTIONS "nosniff"
ENV X_XSS_PROTECTION "1; mode=block"
ENV REFERRER_POLICY "strict-origin-when-cross-origin"
ENV PERMISSIONS_POLICY "camera=(), microphone=(), geolocation=(), interest-cohort=()"

# Use next start to run the application
CMD ["npm", "run", "start"]