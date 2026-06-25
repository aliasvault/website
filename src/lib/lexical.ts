/**
 * Helpers that read Payload Lexical rich-text JSON without rendering it.
 *
 * Used to derive the article "On this page" table of contents, the estimated
 * reading time, and a clean Markdown twin of the content (for the `.md` URL and
 * `llms.txt`).
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

/** Slugify heading text into a stable anchor id (shared with the renderer). */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function rootChildren(data: any): any[] {
  return data?.root?.children ?? (Array.isArray(data) ? data : [])
}

/** Concatenate all descendant text of a node. */
function nodeText(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(nodeText).join('')
  return ''
}

/** Extract h2/h3 headings for a table of contents. */
export function extractHeadings(data: any): TocHeading[] {
  const out: TocHeading[] = []
  const walk = (nodes: any[]) => {
    for (const node of nodes ?? []) {
      if (node?.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
        const text = nodeText(node).trim()
        if (text) out.push({ id: headingId(text), text, level: node.tag === 'h2' ? 2 : 3 })
      } else if (Array.isArray(node?.children)) {
        walk(node.children)
      }
    }
  }
  walk(rootChildren(data))
  return out
}

/** Estimated reading time in whole minutes (min 1), at ~220 wpm. */
export function readingTimeMinutes(data: any): number {
  let text = ''
  const walk = (nodes: any[]) => {
    for (const node of nodes ?? []) {
      if (typeof node?.text === 'string') text += ' ' + node.text
      if (Array.isArray(node?.children)) walk(node.children)
    }
  }
  walk(rootChildren(data))
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

/** Apply Lexical text-format bitmask (bold/italic/code) as Markdown. */
function formatText(node: any): string {
  let t = node.text ?? ''
  if (!t) return t
  const f = node.format ?? 0
  if (f & 16) t = '`' + t + '`' // code
  if (f & 1) t = '**' + t + '**' // bold
  if (f & 2) t = '*' + t + '*' // italic
  return t
}

function inlineToMarkdown(nodes: any[]): string {
  return (nodes ?? [])
    .map((n) => {
      if (n?.type === 'text') return formatText(n)
      if (n?.type === 'link') {
        const url = n.fields?.url ?? n.url ?? ''
        return `[${inlineToMarkdown(n.children)}](${url})`
      }
      if (n?.type === 'linebreak') return '\n'
      if (Array.isArray(n?.children)) return inlineToMarkdown(n.children)
      return ''
    })
    .join('')
}

function listToMarkdown(node: any, depth = 0): string {
  const ordered = node.listType === 'number'
  const indent = '  '.repeat(depth)
  return (node.children ?? [])
    .map((item: any, i: number) => {
      const marker = ordered ? `${i + 1}.` : '-'
      const nested = (item.children ?? []).filter((c: any) => c.type === 'list')
      const inline = (item.children ?? []).filter((c: any) => c.type !== 'list')
      let line = `${indent}${marker} ${inlineToMarkdown(inline)}`
      for (const n of nested) line += '\n' + listToMarkdown(n, depth + 1)
      return line
    })
    .join('\n')
}

/**
 * Plain text of a paragraph built from its text + linebreak children, or null if
 * it contains anything else (links, formatting, etc.).
 */
function paragraphPlainText(node: any): string | null {
  if (node?.type !== 'paragraph' || !Array.isArray(node.children)) return null
  let out = ''
  for (const c of node.children) {
    if (c?.type === 'text') out += c.text ?? ''
    else if (c?.type === 'linebreak') out += '\n'
    else return null
  }
  return out
}

/**
 * Convert paragraphs that contain literal Markdown ```lang … ``` fences (left
 * behind by the MDX→Lexical migration) into synthetic `codeblock` nodes, so the
 * renderer can show real code blocks instead of raw backticks. Handles a fence
 * contained in a single paragraph (linebreak-separated) and a fence spanning
 * consecutive paragraphs. Only the HTML render uses this; the Markdown twins
 * already emit correct fences from the raw text.
 */
export function transformCodeBlocks(data: any): any {
  const children = data?.root?.children
  if (!Array.isArray(children)) return data
  return { ...data, root: { ...data.root, children: foldFences(children) } }
}

function foldFences(nodes: any[]): any[] {
  const out: any[] = []
  for (let i = 0; i < nodes.length; i++) {
    const text = paragraphPlainText(nodes[i])
    if (text != null) {
      // (a) Complete fence inside one paragraph.
      const single = text.trim().match(/^```([\w-]*)\n([\s\S]*?)\n?```$/)
      if (single) {
        out.push({ type: 'codeblock', language: single[1] || '', code: single[2] })
        continue
      }
      // (b) Fence that opens here and closes in a later paragraph.
      const open = text.trim().match(/^```([\w-]*)$/)
      if (open) {
        const lines: string[] = []
        let j = i + 1
        let closed = false
        for (; j < nodes.length; j++) {
          const t = paragraphPlainText(nodes[j])
          if (t == null) break
          if (t.trim() === '```') {
            closed = true
            break
          }
          lines.push(t)
        }
        if (closed) {
          out.push({ type: 'codeblock', language: open[1] || '', code: lines.join('\n') })
          i = j
          continue
        }
      }
    }
    out.push(nodes[i])
  }
  return out
}

/** Convert Lexical content to clean Markdown (best-effort, block-level). */
export function lexicalToMarkdown(data: any): string {
  const blocks: string[] = []
  for (const node of rootChildren(data)) {
    switch (node?.type) {
      case 'heading': {
        const level = Number(String(node.tag).replace('h', '')) || 2
        blocks.push(`${'#'.repeat(level)} ${inlineToMarkdown(node.children)}`)
        break
      }
      case 'paragraph': {
        const text = inlineToMarkdown(node.children).trim()
        if (text) blocks.push(text)
        break
      }
      case 'list':
        blocks.push(listToMarkdown(node))
        break
      case 'quote':
        blocks.push(
          inlineToMarkdown(node.children)
            .split('\n')
            .map((l) => `> ${l}`)
            .join('\n'),
        )
        break
      case 'upload': {
        const doc = node.value
        const src = doc?.filename ? `/uploads/${doc.filename}` : doc?.url
        const alt = node.fields?.caption || doc?.alt || ''
        if (src) blocks.push(`![${alt}](${src})`)
        break
      }
      case 'horizontalrule':
        blocks.push('---')
        break
      default: {
        const text = inlineToMarkdown(node?.children).trim()
        if (text) blocks.push(text)
      }
    }
  }
  return blocks.join('\n\n').trim()
}
