import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

// GET: Einzelnes Ticket abrufen
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      )
    }

    const { id } = await params

    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!ticket) {
      return NextResponse.json(
        { success: false, error: 'Ticket nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, ticket })
  } catch (error) {
    console.error('Ticket fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Ticket konnte nicht geladen werden' },
      { status: 500 }
    )
  }
}

// PATCH: Ticket-Status ändern
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { status, comment } = body

    // Aktuelles Ticket holen
    const currentTicket = await prisma.supportTicket.findUnique({
      where: { id },
    })

    if (!currentTicket) {
      return NextResponse.json(
        { success: false, error: 'Ticket nicht gefunden' },
        { status: 404 }
      )
    }

    // Status-Verlauf erstellen und Ticket aktualisieren
    const [statusHistory, ticket] = await prisma.$transaction([
      prisma.statusHistory.create({
        data: {
          ticketId: id,
          fromStatus: currentTicket.status,
          toStatus: status,
          comment: comment || null,
        },
      }),
      prisma.supportTicket.update({
        where: { id },
        data: { status },
        include: {
          statusHistory: {
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
    ])

    return NextResponse.json({ success: true, ticket, statusHistory })
  } catch (error) {
    console.error('Ticket update error:', error)
    return NextResponse.json(
      { success: false, error: 'Ticket konnte nicht aktualisiert werden' },
      { status: 500 }
    )
  }
}
