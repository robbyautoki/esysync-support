import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { visitorId, visitorName } = await request.json()

    if (!visitorId) {
      return NextResponse.json(
        { success: false, error: 'visitorId ist erforderlich' },
        { status: 400 }
      )
    }

    // Prüfe ob bereits eine offene Session existiert
    const existingSession = await prisma.chatSession.findFirst({
      where: {
        visitorId,
        status: { in: ['ai', 'team'] },
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (existingSession) {
      return NextResponse.json({ success: true, session: existingSession })
    }

    // Neue Session erstellen
    const session = await prisma.chatSession.create({
      data: {
        visitorId,
        visitorName: visitorName || null,
      },
      include: {
        messages: true,
      },
    })

    return NextResponse.json({ success: true, session })
  } catch (error) {
    console.error('Chat session error:', error)
    return NextResponse.json(
      { success: false, error: 'Session konnte nicht erstellt werden' },
      { status: 500 }
    )
  }
}
