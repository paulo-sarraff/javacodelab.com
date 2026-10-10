import { readFile } from 'fs/promises'
import path from 'path'
import GithubSlugger from 'github-slugger'

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles')

export async function getMdxSource(slug) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  try {
    return await readFile(filePath, 'utf-8')
  } catch {
    return null
  }
}

export function extractHeadings(source) {
  if (!source) return []

  const slugger = new GithubSlugger()
  const headings = []

  for (const line of source.split('\n')) {
    const h2 = line.match(/^## (.+)/)
    const h3 = line.match(/^### (.+)/)

    if (h2) {
      const text = h2[1].trim()
      headings.push({ level: 2, text, id: slugger.slug(text) })
    } else if (h3) {
      const text = h3[1].trim()
      headings.push({ level: 3, text, id: slugger.slug(text) })
    }
  }

  return headings
}
