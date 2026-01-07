import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { sessionId, teamMemberName } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'sessionId ist erforderlich' },
        { status: 400 }
      )
    }

    // Session prüfen
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session nicht gefunden' },
        { status: 404 }
      )
    }

    // Status zurück auf "ai" setzen
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { status: 'ai' },
    })

    // System-Nachricht hinzufügen
    const leaveMessage = teamMemberName 
      ? `${teamMemberName} hat den Chat verlassen. Sie werden wieder vom AI-Assistenten betreut.`
      : 'Der Mitarbeiter hat den Chat verlassen. Sie werden wieder vom AI-Assistenten betreut.'

    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'ai',
        content: leaveMessage,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Leave chat error:', error)
    return NextResponse.json(
      { success: false, error: 'Chat konnte nicht verlassen werden' },
      { status: 500 }
    )
  }
}
