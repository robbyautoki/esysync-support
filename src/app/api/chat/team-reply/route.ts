import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { sessionId, content, teamMemberName } = await request.json()

    if (!sessionId || !content || !teamMemberName) {
      return NextResponse.json(
        { success: false, error: 'sessionId, content und teamMemberName sind erforderlich' },
        { status: 400 }
      )
    }

    // Prüfen ob Session existiert
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session nicht gefunden' },
        { status: 404 }
      )
    }

    // Team-Nachricht erstellen
    const message = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'team',
        content,
        teamMemberName,
      },
    })

    // Session Status auf "team" setzen falls noch auf "ai"
    if (session.status === 'ai') {
      await prisma.chatSession.update({
        where: { id: sessionId },
        data: { status: 'team' },
      })
    }

    // Session updatedAt aktualisieren
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.error('Team reply error:', error)
    return NextResponse.json(
      { success: false, error: 'Antwort konnte nicht gesendet werden' },
      { status: 500 }
    )
  }
}
