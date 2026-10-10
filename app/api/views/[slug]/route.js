import { prisma } from '@/lib/prisma'

// GET /api/views/[slug] — retorna contagem real de visualizações
export async function GET(request, { params }) {
  const { slug } = await params
  try {
    const record = await prisma.articleView.findUnique({ where: { slug } })
    return Response.json({ slug, count: record?.count ?? 0 })
  } catch {
    return Response.json({ slug, count: 0 })
  }
}

// POST /api/views/[slug] — incrementa +1 e retorna novo total
export async function POST(request, { params }) {
  const { slug } = await params
  try {
    const record = await prisma.articleView.upsert({
      where: { slug },
      update: { count: { increment: 1 } },
      create: { slug, count: 1 },
    })
    return Response.json({ slug, count: record.count })
  } catch {
    return Response.json({ slug, count: 0 })
  }
}
