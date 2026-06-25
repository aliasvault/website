import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import ClickableImage from '@/components/MDX/ClickableImage'
import { GitHubRelease } from '@/components/Common/GitHubRelease'
import { headingId } from '@/lib/lexical'

/**
 * Renders Payload Lexical content using the site theme.
 *
 * Custom converters:
 * - `upload` nodes render the ClickableImage lightbox (src resolved to the
 *   static /uploads/<filename> path, with caption).
 * - `githubRelease` blocks render the live GitHubRelease download widget.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function headingText(node: any): string {
  if (typeof node?.text === 'string') return node.text
  if (Array.isArray(node?.children)) return node.children.map(headingText).join('')
  return ''
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsxConverters = ({ defaultConverters }: any) => ({
  ...defaultConverters,
  // Inject a stable anchor id on h2/h3 so the "On this page" TOC can link to
  // them (id slug matches extractHeadings() in lib/lexical). Other tags keep
  // default rendering; .rich-text CSS styles by element so nothing else changes.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heading: ({ node, nodesToJSX }: any) => {
    const Tag = (node?.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    const children = nodesToJSX({ nodes: node?.children })
    const id = Tag === 'h2' || Tag === 'h3' ? headingId(headingText(node)) : undefined
    return <Tag id={id}>{children}</Tag>
  },
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
