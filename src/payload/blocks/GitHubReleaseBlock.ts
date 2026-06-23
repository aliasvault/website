import type { Block } from 'payload'

/**
 * Lexical block mirroring the old `<GitHubRelease version="x.y.z" />` MDX
 * component. The frontend renders it via the `githubRelease` block converter in
 * src/components/Lexical/RichText.tsx (which mounts the live GitHubRelease
 * widget). Inserted during the content migration in src/payload/seed.ts.
 */
export const GitHubReleaseBlock: Block = {
  slug: 'githubRelease',
  labels: { singular: 'GitHub Release', plural: 'GitHub Releases' },
  fields: [
    {
      name: 'version',
      type: 'text',
      defaultValue: 'latest',
      admin: { description: 'Release tag to show, e.g. "0.29.0", or "latest".' },
    },
  ],
}
