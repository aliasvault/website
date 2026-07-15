'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { FiSearch, FiArrowRight } from 'react-icons/fi'
import { Link, useRouter } from '@/i18n/navigation'

interface HelpSearchResult {
  slug: string
  title: string
  description: string
  section: string
}

/**
 * Live search over the Help articles.
 */
export default function HelpSearch() {
  const t = useTranslations('help')
  const locale = useLocale()
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<HelpSearchResult[] | null>(null)
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const fetchStarted = useRef(false)

  const loadIndex = useCallback(() => {
    if (fetchStarted.current) return
    fetchStarted.current = true
    fetch(`/api/help-index?locale=${locale}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setIndex(data.articles ?? []))
      .catch(() => {
        // Search silently degrades to browsing when the index can't load.
        fetchStarted.current = false
      })
  }, [locale])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || !index) return []
    const terms = q.split(/\s+/)
    return index
      .map((article) => {
        const title = article.title.toLowerCase()
        const description = article.description.toLowerCase()
        let score = 0
        for (const term of terms) {
          if (title.includes(term)) score += title.startsWith(term) ? 3 : 2
          else if (description.includes(term)) score += 1
          else return null
        }
        return { article, score }
      })
      .filter((r): r is { article: HelpSearchResult; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)
      .map((r) => r.article)
  }, [query, index])

  // Close the dropdown on outside click.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => setHighlighted(0), [query])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || !results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => (h + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => (h - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = results[highlighted]
      if (target) {
        setOpen(false)
        router.push(`/help/${target.slug}`)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showResults = open && query.trim().length > 0

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-2xl">
      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-body-color dark:text-body-color-dark" />
        <input
          type="search"
          role="combobox"
          aria-expanded={showResults}
          aria-controls="help-search-results"
          aria-label={t('searchPlaceholder')}
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            loadIndex()
            setOpen(true)
          }}
          onKeyDown={onKeyDown}
          className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-[3.25rem] pr-5 text-base text-black shadow-three outline-none transition-all duration-200 placeholder:text-body-color/70 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-gray-800 dark:bg-gray-dark dark:text-white dark:shadow-none dark:placeholder:text-body-color-dark/70"
        />
      </div>

      {showResults && (
        <ul
          id="help-search-results"
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white py-2 shadow-xl shadow-black/[0.08] dark:border-white/10 dark:bg-[#232B3A] dark:shadow-black/50"
        >
          {results.length === 0 ? (
            <li className="px-5 py-4 text-sm text-body-color dark:text-body-color-dark">
              {index === null ? t('searchLoading') : t('searchNoResults', { query: query.trim() })}
            </li>
          ) : (
            results.map((article, i) => (
              <li key={article.slug} role="option" aria-selected={i === highlighted}>
                <Link
                  href={`/help/${article.slug}`}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHighlighted(i)}
                  className={`flex items-center justify-between gap-4 px-5 py-3 transition-colors ${
                    i === highlighted ? 'bg-primary/5 dark:bg-primary/10' : ''
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-black dark:text-white">
                      {article.title}
                    </span>
                    {article.description && (
                      <span className="mt-0.5 block truncate text-sm text-body-color dark:text-body-color-dark">
                        {article.description}
                      </span>
                    )}
                  </span>
                  <FiArrowRight
                    className={`h-4 w-4 shrink-0 text-primary transition-opacity ${
                      i === highlighted ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
