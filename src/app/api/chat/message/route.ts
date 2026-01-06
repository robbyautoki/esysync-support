import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getChatResponse } from '@/lib/openai'

export async function POST(request: Request) {
  try {
    const { sessionId, content } = await request.json()

    if (!sessionId || !content) {
      return NextResponse.json(
        { success: false, error: 'sessionId und content sind erforderlich' },
        { status: 400 }
      )
    }

    // Session prüfen
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session nicht gefunden' },
        { status: 404 }
      )
    }

    // User-Nachricht speichern
    const userMessage = await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'user',
        content,
      },
    })

    // Wenn Status "ai" ist, AI-Antwort generieren
    if (session.status === 'ai') {
      // Nachrichten für OpenAI vorbereiten
      const chatHistory = session.messages.map((msg) => ({
        role: (msg.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.content,
      }))
      chatHistory.push({ role: 'user', content })

      // AI-Antwort generieren
      const aiResponse = await getChatResponse(chatHistory)

      // AI-Nachricht speichern
      const aiMessage = await prisma.chatMessage.create({
        data: {
          sessionId,
          role: 'ai',
          content: aiResponse,
        },
      })

      return NextResponse.json({
        success: true,
        userMessage,
        aiMessage,
      })
    }

    // Bei Status "team" nur User-Nachricht zurückgeben
    return NextResponse.json({
      success: true,
      userMessage,
    })
  } catch (error) {
    console.error('Chat message error:', error)
    return NextResponse.json(
      { success: false, error: 'Nachricht konnte nicht gesendet werden' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'sessionId ist erforderlich' },
        { status: 400 }
      )
    }

    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    })

    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      select: { status: true },
    })

    return NextResponse.json({ success: true, messages, status: session?.status })
  } catch (error) {
    console.error('Chat messages fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Nachrichten konnten nicht geladen werden' },
      { status: 500 }
    )
  }
}
