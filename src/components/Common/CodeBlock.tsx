'use client'

import { useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'

/**
 * Styled code block for rich-text content: a header with the language label and
 * a copy button, over a dark, horizontally-scrollable code area. Wrapped in
 * `.rich-text-embed` so the surrounding prose margins don't leak in.
 */
export default function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div className="rich-text-embed my-6 overflow-hidden rounded-md border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-700">
        <span className="font-mono text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          {copied ? <FiCheck className="h-3.5 w-3.5" /> : <FiCopy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {/* bg-transparent overrides the global `.rich-text pre` dark background so
          the code area shows the container's theme-aware grey. */}
      <pre className="overflow-x-auto bg-transparent p-4 text-sm leading-relaxed text-gray-800 dark:text-gray-100">
        <code className="bg-transparent font-mono text-inherit">{code}</code>
      </pre>
    </div>
  )
}
