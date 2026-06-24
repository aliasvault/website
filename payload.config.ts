import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor, UploadFeature, BlocksFeature } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { Posts } from './src/payload/collections/Posts'
import { News } from './src/payload/collections/News'
import { KnowledgeBase } from './src/payload/collections/KnowledgeBase'
import { GitHubReleaseBlock } from './src/payload/blocks/GitHubReleaseBlock'
import { migrations } from './src/migrations'
import { assertRequiredEnv } from './src/lib/env'

const dirname = path.dirname(fileURLToPath(import.meta.url))

assertRequiredEnv()
const payloadSecret = process.env.PAYLOAD_SECRET

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  // Content first in the sidebar, admin collections last.
  collections: [KnowledgeBase, Posts, News, Media, Users],
  // Enable inline uploads (with a caption field) and the GitHubRelease block so
  // the migrated <ClickableImage>/<GitHubRelease> content validates and renders.
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      UploadFeature({
        collections: {
          media: {
            fields: [{ name: 'caption', type: 'text' }],
          },
        },
      }),
      BlocksFeature({ blocks: [GitHubReleaseBlock] }),
    ],
  }),
  secret: payloadSecret || '',
  ...(process.env.NEXT_PUBLIC_SERVER_URL
    ? {
        cors: [process.env.NEXT_PUBLIC_SERVER_URL],
        csrf: [process.env.NEXT_PUBLIC_SERVER_URL],
      }
    : {}),
  graphQL: { disablePlaygroundInProduction: true },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./data/payload.db' },
    // Only use explicit migrations, also in dev.
    push: false,
    migrationDir: path.resolve(dirname, 'src/migrations'),
    // Run pending migrations automatically on startup in production.
    prodMigrations: migrations,
  }),
  sharp,
  localization: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
  },
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
