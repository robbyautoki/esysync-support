import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Alle Guides abrufen (mit optionalen Filtern)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const published = searchParams.get('published')
    const search = searchParams.get('search')

    const where: {
      categoryId?: string
      published?: boolean
      OR?: Array<{ title?: { contains: string; mode: 'insensitive' }; excerpt?: { contains: string; mode: 'insensitive' } }>
    } = {}

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (published !== null) {
      where.published = published === 'true'
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ]
    }

    const guides = await prisma.guide.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, guides })
  } catch (error) {
    console.error('Guides fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Anleitungen konnten nicht geladen werden' },
      { status: 500 }
    )
  }
}

// POST: Neue Anleitung erstellen
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Slug generieren falls nicht vorhanden
    const slug = data.slug || generateSlug(data.title)

    // Prüfen ob Slug bereits existiert
    const existingGuide = await prisma.guide.findUnique({
      where: { slug },
    })

    if (existingGuide) {
      return NextResponse.json(
        { success: false, error: 'Ein Guide mit diesem Slug existiert bereits' },
        { status: 400 }
      )
    }

    const guide = await prisma.guide.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        categoryId: data.categoryId,
        published: data.published || false,
        publishedAt: data.published ? new Date() : null,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json({ success: true, guide })
  } catch (error) {
    console.error('Guide creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Anleitung konnte nicht erstellt werden' },
      { status: 500 }
    )
  }
}

// Hilfsfunktion: Slug aus Titel generieren
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
