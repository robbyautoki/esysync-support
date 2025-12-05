import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET: Guide per Slug abrufen (für öffentliche Seite)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const guide = await prisma.guide.findUnique({
      where: { slug },
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

    // Für öffentliche Anfragen nur veröffentlichte Guides zurückgeben
    const { searchParams } = new URL(request.url)
    const isAdmin = searchParams.get('admin') === 'true'

    if (!isAdmin && !guide.published) {
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
