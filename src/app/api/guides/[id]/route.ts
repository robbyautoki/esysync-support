import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Einzelnen Guide abrufen
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const guide = await prisma.guide.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    if (!guide) {
      return NextResponse.json(
        { success: false, error: 'Anleitung nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, guide })
  } catch (error) {
    console.error('Guide fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Anleitung konnte nicht geladen werden' },
      { status: 500 }
    )
  }
}

// PATCH: Guide aktualisieren
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    // Prüfen ob Guide existiert
    const existingGuide = await prisma.guide.findUnique({
      where: { id },
    })

    if (!existingGuide) {
      return NextResponse.json(
        { success: false, error: 'Anleitung nicht gefunden' },
        { status: 404 }
      )
    }

    // Wenn Slug geändert wird, prüfen ob neuer Slug bereits existiert
    if (data.slug && data.slug !== existingGuide.slug) {
      const slugExists = await prisma.guide.findUnique({
        where: { slug: data.slug },
      })

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Ein Guide mit diesem Slug existiert bereits' },
          { status: 400 }
        )
      }
    }

    // PublishedAt setzen wenn erstmals veröffentlicht
    let publishedAt = existingGuide.publishedAt
    if (data.published && !existingGuide.published) {
      publishedAt = new Date()
    }

    const guide = await prisma.guide.update({
      where: { id },
      data: {
        title: data.title ?? existingGuide.title,
        slug: data.slug ?? existingGuide.slug,
        excerpt: data.excerpt ?? existingGuide.excerpt,
        content: data.content ?? existingGuide.content,
        coverImage: data.coverImage !== undefined ? data.coverImage : existingGuide.coverImage,
        categoryId: data.categoryId ?? existingGuide.categoryId,
        published: data.published ?? existingGuide.published,
        publishedAt,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json({ success: true, guide })
  } catch (error) {
    console.error('Guide update error:', error)
    return NextResponse.json(
      { success: false, error: 'Anleitung konnte nicht aktualisiert werden' },
      { status: 500 }
    )
  }
}

// DELETE: Guide löschen
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Prüfen ob Guide existiert
    const existingGuide = await prisma.guide.findUnique({
      where: { id },
    })

    if (!existingGuide) {
      return NextResponse.json(
        { success: false, error: 'Anleitung nicht gefunden' },
        { status: 404 }
      )
    }

    await prisma.guide.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Guide delete error:', error)
    return NextResponse.json(
      { success: false, error: 'Anleitung konnte nicht gelöscht werden' },
      { status: 500 }
    )
  }
}
