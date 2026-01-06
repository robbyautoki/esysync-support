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

    const session = await prisma.chatSession.update({
      where: { id: sessionId },
      data: { status: 'closed' },
    })

    return NextResponse.json({ success: true, session })
  } catch (error) {
    console.error('Chat close error:', error)
    return NextResponse.json(
      { success: false, error: 'Session konnte nicht geschlossen werden' },
      { status: 500 }
    )
  }
}
