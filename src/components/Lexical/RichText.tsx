import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import ClickableImage from '@/components/MDX/ClickableImage'
import { GitHubRelease } from '@/components/Common/GitHubRelease'

/**
 * Renders Payload Lexical content using the site theme. Element styling lives in
 * the `.rich-text` block in src/styles/index.css (shared by KB, blog and news),
 * replacing the old next-mdx-remote + MDXComponents pipeline.
 *
 * Custom converters:
 * - `upload` nodes render the ClickableImage lightbox (src resolved to the
 *   static /uploads/<filename> path, with caption).
 * - `githubRelease` blocks render the live GitHubRelease download widget.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsxConverters = ({ defaultConverters }: any) => ({
  ...defaultConverters,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload: ({ node }: any) => {
    const doc = node?.value
    if (!doc || typeof doc !== 'object') return null
    const src = doc.filename ? `/uploads/${doc.filename}` : doc.url
    if (!src) return null
    const caption = node.fields?.caption || doc.alt || ''
    const alt = doc.alt || caption || ''
    // Wrapped in .rich-text-embed so the .rich-text img margins don't stack on
    // the component's own card spacing (it brings its own mb-8).
    return (
      <div className="rich-text-embed">
        <ClickableImage src={src} alt={alt} caption={caption} />
      </div>
    )
  },
  blocks: {
    // Wrapped in .rich-text-embed so the .rich-text prose margins don't leak
    // into the component's own h2/h3/p (it brings its own spacing).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    githubRelease: ({ node }: any) => (
      <div className="rich-text-embed">
        <GitHubRelease version={node?.fields?.version || 'latest'} />
      </div>
    ),
  },
})

export default function RichText({ data }: { data: unknown }) {
  if (!data) return null
  return (
    <PayloadRichText
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data={data as any}
      converters={jsxConverters}
      className="rich-text max-w-none"
    />
  )
}
