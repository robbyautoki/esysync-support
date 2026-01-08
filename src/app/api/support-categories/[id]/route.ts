import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { key, label, description, icon, order } = body

    const category = await prisma.supportCategory.update({
      where: { id },
      data: {
        ...(key && { key }),
        ...(label && { label }),
        ...(description && { description }),
        ...(icon && { icon }),
        ...(typeof order === 'number' && { order })
      }
    })

    return NextResponse.json({ success: true, category })
  } catch (error) {
    console.error('Error updating support category:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Aktualisieren der Kategorie' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.supportCategory.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting support category:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Löschen der Kategorie' },
      { status: 500 }
    )
  }
}
