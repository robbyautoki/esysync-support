import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { key, label, description, categoryId, order } = body

    const problem = await prisma.supportProblem.update({
      where: { id },
      data: {
        ...(key && { key }),
        ...(label && { label }),
        ...(description && { description }),
        ...(categoryId && { categoryId }),
        ...(typeof order === 'number' && { order })
      }
    })

    return NextResponse.json({ success: true, problem })
  } catch (error) {
    console.error('Error updating support problem:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Aktualisieren des Problems' },
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

    await prisma.supportProblem.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting support problem:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Löschen des Problems' },
      { status: 500 }
    )
  }
}
