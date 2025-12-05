import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Einzelne Kategorie abrufen
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const category = await prisma.guideCategory.findUnique({
      where: { id },
      include: {
        guides: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { guides: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Kategorie nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, category })
  } catch (error) {
    console.error('Category fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Kategorie konnte nicht geladen werden' },
      { status: 500 }
    )
  }
}

// PATCH: Kategorie aktualisieren
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    // Prüfen ob Kategorie existiert
    const existingCategory = await prisma.guideCategory.findUnique({
      where: { id },
    })

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Kategorie nicht gefunden' },
        { status: 404 }
      )
    }

    // Wenn Slug geändert wird, prüfen ob neuer Slug bereits existiert
    if (data.slug && data.slug !== existingCategory.slug) {
      const slugExists = await prisma.guideCategory.findUnique({
        where: { slug: data.slug },
      })

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Eine Kategorie mit diesem Slug existiert bereits' },
          { status: 400 }
        )
      }
    }

    const category = await prisma.guideCategory.update({
      where: { id },
      data: {
        name: data.name ?? existingCategory.name,
        slug: data.slug ?? existingCategory.slug,
        description: data.description !== undefined ? data.description : existingCategory.description,
        order: data.order ?? existingCategory.order,
      },
    })

    return NextResponse.json({ success: true, category })
  } catch (error) {
    console.error('Category update error:', error)
    return NextResponse.json(
      { success: false, error: 'Kategorie konnte nicht aktualisiert werden' },
      { status: 500 }
    )
  }
}

// DELETE: Kategorie löschen
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Prüfen ob Kategorie existiert
    const existingCategory = await prisma.guideCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { guides: true },
        },
      },
    })

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Kategorie nicht gefunden' },
        { status: 404 }
      )
    }

    // Prüfen ob Guides in dieser Kategorie existieren
    if (existingCategory._count.guides > 0) {
      return NextResponse.json(
        { success: false, error: 'Kategorie kann nicht gelöscht werden, da noch Anleitungen zugeordnet sind' },
        { status: 400 }
      )
    }

    await prisma.guideCategory.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Category delete error:', error)
    return NextResponse.json(
      { success: false, error: 'Kategorie konnte nicht gelöscht werden' },
      { status: 500 }
    )
  }
}
