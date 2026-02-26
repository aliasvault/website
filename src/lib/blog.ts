import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ContentPost {
  type: 'blog' | 'news'
  slug: string
  title: string
  description: string
  date: string
  image?: string
  /** Blog only: 'full' = no sidebar (news-style), omit or 'default' = with sidebar */
  layout?: 'default' | 'full'
  author: {
    name: string
    image: string
    designation: string
  }
  tags: string[]
  content: string
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog')
const newsDirectory = path.join(process.cwd(), 'src/content/news')

function getPostsFromDirectory(directory: string, type: 'blog' | 'news', locale: string = 'en'): ContentPost[] {
  const fileNames = fs.readdirSync(directory)

  // Get only the base files (without locale suffixes) to avoid duplicates
  const baseFileNames = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .filter((fileName) => !fileName.match(/\.[a-z]{2}\.mdx$/)) // Filter out any localized files with 2-letter ISO codes
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
  return baseFileNames
    .map((slug) => {
      const localizedPost = getLocalizedPost(directory, slug, type, locale)
      return localizedPost
    })
    .filter((post): post is ContentPost => post !== null)
}

function getLocalizedPost(directory: string, slug: string, type: 'blog' | 'news', locale: string = 'en'): ContentPost | null {
  let fullPath: string

  if (locale !== 'en') {
    const localizedPath = path.join(directory, `${slug}.${locale}.mdx`)
    if (fs.existsSync(localizedPath)) {
      fullPath = localizedPath
    } else {
      fullPath = path.join(directory, `${slug}.mdx`)
    }
  } else {
    fullPath = path.join(directory, `${slug}.mdx`)
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      type,
      ...data,
    } as ContentPost
  } catch {
    return null
  }
}

export function getAllBlogPosts(locale: string = 'en'): ContentPost[] {
  const posts = getPostsFromDirectory(postsDirectory, 'blog', locale)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllNewsPosts(locale: string = 'en'): ContentPost[] {
  const posts = getPostsFromDirectory(newsDirectory, 'news', locale)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllBlogAndNewsPosts(locale: string = 'en'): ContentPost[] {
  const blogPosts = getPostsFromDirectory(postsDirectory, 'blog', locale)
  const newsPosts = getPostsFromDirectory(newsDirectory, 'news', locale)
  const allPosts = [...blogPosts, ...newsPosts]
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPostBySlug(slug: string, locale: string = 'en'): ContentPost | null {
  return getLocalizedPost(postsDirectory, slug, 'blog', locale)
}

export function getNewsBySlug(slug: string, locale: string = 'en'): ContentPost | null {
  return getLocalizedPost(newsDirectory, slug, 'news', locale)
}

export function getBlogPostsByTag(tag: string, locale: string = 'en'): ContentPost[] {
  const blogPosts = getAllBlogPosts(locale);
  const newsPosts = getAllNewsPosts(locale);
  const allPosts = [...blogPosts, ...newsPosts];
  return allPosts.filter(post => post.tags.includes(tag));
}
