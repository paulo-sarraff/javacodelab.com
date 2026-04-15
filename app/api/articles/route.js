import { NextResponse } from 'next/server'
import { getAllArticles, searchArticles } from '@/data/articles'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  const articles = query && query.length >= 2
    ? await searchArticles(query)
    : await getAllArticles()

  return NextResponse.json(articles)
}
