import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    const problems = await prisma.supportProblem.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: {
        category: true
      },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({ success: true, problems })
  } catch (error) {
    console.error('Error fetching support problems:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Laden der Probleme' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { key, label, description, categoryId } = body

    if (!key || !label || !description || !categoryId) {
      return NextResponse.json(
        { success: false, error: 'Key, Label, Beschreibung und Kategorie sind erforderlich' },
        { status: 400 }
      )
    }

    // Nächste Order-Nummer für diese Kategorie ermitteln
    const maxOrder = await prisma.supportProblem.aggregate({
      where: { categoryId },
      _max: { order: true }
    })
    const nextOrder = (maxOrder._max.order ?? -1) + 1

    const problem = await prisma.supportProblem.create({
      data: {
        key,
        label,
        description,
        categoryId,
        order: nextOrder
      }
    })

    return NextResponse.json({ success: true, problem })
  } catch (error) {
    console.error('Error creating support problem:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Erstellen des Problems' },
      { status: 500 }
    )
  }
}
