import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'sessionId ist erforderlich' },
        { status: 400 }
      )
    }

    // Session auf "team" setzen
    const session = await prisma.chatSession.update({
      where: { id: sessionId },
      data: { status: 'team' },
    })

    // System-Nachricht hinzufügen
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'ai',
        content: 'Sie wurden mit unserem Support-Team verbunden. Ein Mitarbeiter wird sich in Kürze bei Ihnen melden.',
      },
    })

    return NextResponse.json({ success: true, session })
  } catch (error) {
    console.error('Chat escalate error:', error)
    return NextResponse.json(
      { success: false, error: 'Eskalation fehlgeschlagen' },
      { status: 500 }
    )
  }
}
