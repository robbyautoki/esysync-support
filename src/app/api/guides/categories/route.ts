import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Alle Kategorien abrufen
export async function GET() {
  try {
    const categories = await prisma.guideCategory.findMany({
      include: {
        _count: {
          select: { guides: true },
        },
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ success: true, categories })
  } catch (error) {
    console.error('Categories fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Kategorien konnten nicht geladen werden' },
      { status: 500 }
    )
  }
}

// POST: Neue Kategorie erstellen
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Slug generieren falls nicht vorhanden
    const slug = data.slug || generateSlug(data.name)

    // Prüfen ob Slug bereits existiert
    const existingCategory = await prisma.guideCategory.findUnique({
      where: { slug },
    })

    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Eine Kategorie mit diesem Slug existiert bereits' },
        { status: 400 }
      )
    }

    // Höchste Order ermitteln
    const maxOrder = await prisma.guideCategory.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const category = await prisma.guideCategory.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    return NextResponse.json({ success: true, category })
  } catch (error) {
    console.error('Category creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Kategorie konnte nicht erstellt werden' },
      { status: 500 }
    )
  }
}

// Hilfsfunktion: Slug aus Name generieren
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
