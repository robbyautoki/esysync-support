import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST: Öffentliche Ticket-Suche per Ticket-Nummer
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { ticketNumber } = body

    if (!ticketNumber) {
      return NextResponse.json(
        { success: false, error: 'Ticket-Nummer erforderlich' },
        { status: 400 }
      )
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { ticketNumber: ticketNumber.toUpperCase() },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!ticket) {
      return NextResponse.json(
        { success: false, error: 'Kein Ticket mit dieser Nummer gefunden' },
        { status: 404 }
      )
    }

    // Nur sichere Daten zurückgeben (keine sensiblen Infos)
    const safeTicket = {
      ticketNumber: ticket.ticketNumber,
      category: ticket.category,
      problemDetail: ticket.problemDetail,
      status: ticket.status,
      displayNumber: ticket.displayNumber,
      shippingOption: ticket.shippingOption,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      statusHistory: ticket.statusHistory.map(h => ({
        toStatus: h.toStatus,
        comment: h.comment,
        createdAt: h.createdAt,
      })),
    }

    return NextResponse.json({ success: true, ticket: safeTicket })
  } catch (error) {
    console.error('Ticket track error:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler bei der Suche' },
      { status: 500 }
    )
  }
}
