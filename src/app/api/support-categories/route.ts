import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.supportCategory.findMany({
      include: {
        problems: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({ success: true, categories })
  } catch (error) {
    console.error('Error fetching support categories:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Laden der Kategorien' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { key, label, description, icon } = body

    if (!key || !label || !description) {
      return NextResponse.json(
        { success: false, error: 'Key, Label und Beschreibung sind erforderlich' },
        { status: 400 }
      )
    }

    // Nächste Order-Nummer ermitteln
    const maxOrder = await prisma.supportCategory.aggregate({
      _max: { order: true }
    })
    const nextOrder = (maxOrder._max.order ?? -1) + 1

    const category = await prisma.supportCategory.create({
      data: {
        key,
        label,
        description,
        icon: icon || 'monitor',
        order: nextOrder
      }
    })

    return NextResponse.json({ success: true, category })
  } catch (error) {
    console.error('Error creating support category:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Erstellen der Kategorie' },
      { status: 500 }
    )
  }
}
