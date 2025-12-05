import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Ticket-Nummer generieren: SUP-YYYYMMDD-XXXX
function generateTicketNumber() {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.floor(1000 + Math.random() * 9000)
  return `SUP-${dateStr}-${random}`
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber: generateTicketNumber(),
        category: data.category,
        problemDetail: data.problemDetail,
        hasRestarted: data.hasRestarted,
        shippingOption: data.shippingOption,
        accountNumber: data.accountNumber,
        displayNumber: data.displayNumber,
        displayLocation: data.displayLocation,
        alternateReturnAddress: data.alternateReturnAddress || null,
        email: data.email,
        additionalDeviceAffected: data.additionalDeviceAffected || false,
        differentShippingAddress: data.differentShippingAddress || false,
        shippingAddress: data.shippingAddress || null,
        salutation: data.salutation,
        contactPerson: data.contactPerson,
      },
    })

    return NextResponse.json({ success: true, ticket })
  } catch (error) {
    console.error('Ticket creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Ticket konnte nicht erstellt werden' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const tickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ tickets })
  } catch (error) {
    console.error('Ticket fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Tickets konnten nicht geladen werden' },
      { status: 500 }
    )
  }
}
