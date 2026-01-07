import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getChatResponse } from '@/lib/openai'
import openai from '@/lib/openai'

// Cosine Similarity berechnen
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0
  let normA = 0
  let normB = 0
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

// Wissensdatenbank durchsuchen
async function searchKnowledge(query: string): Promise<string | null> {
  try {
    // Prüfen ob Chunks vorhanden sind
    const chunksCount = await prisma.knowledgeChunk.count()
    if (chunksCount === 0) return null

    // Query embedden
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    })
    const queryEmbedding = embeddingResponse.data[0].embedding

    // Alle Chunks laden
    const chunks = await prisma.knowledgeChunk.findMany({
      include: {
        document: {
          select: { filename: true },
        },
      },
    })

    // Similarity berechnen und Top 3 finden
    const results = chunks
      .map(chunk => {
        const chunkEmbedding = JSON.parse(chunk.embedding) as number[]
        const similarity = cosineSimilarity(queryEmbedding, chunkEmbedding)
        return { content: chunk.content, similarity, filename: chunk.document.filename }
      })
      .filter(r => r.similarity > 0.3) // Mindest-Ähnlichkeit
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)

    if (results.length === 0) return null

    const contextText = results
      .map(r => `[Aus "${r.filename}"]: ${r.content}`)
      .join('\n\n')

    return `[WISSENSDATENBANK-KONTEXT - Nutze diese Informationen für deine Antwort wenn relevant:]\n${contextText}`
  } catch (error) {
    console.error('Knowledge search error:', error)
    return null
  }
}

// Funktion um Ticketnummer zu erkennen und Status abzufragen
async function checkForTicketStatus(content: string): Promise<string | null> {
  // Pattern für Ticketnummern: SUP-YYYYMMDD-XXXX
  const ticketPattern = /SUP-\d{8}-\d{4}/gi
  const matches = content.match(ticketPattern)
  
  if (!matches || matches.length === 0) return null
  
  const ticketNumber = matches[0].toUpperCase()
  
  try {
    const ticket = await prisma.supportTicket.findUnique({
      where: { ticketNumber },
      select: {
        ticketNumber: true,
        status: true,
        category: true,
        problemDetail: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    
    if (!ticket) {
      return `[TICKET-STATUS: Ticket ${ticketNumber} wurde nicht gefunden. Bitte überprüfen Sie die Nummer.]`
    }
    
    const statusMap: Record<string, string> = {
      'open': 'Offen - Wird bearbeitet',
      'in_progress': 'In Bearbeitung',
      'waiting_for_device': 'Warten auf Gerät',
      'device_received': 'Gerät eingegangen',
      'in_repair': 'In Reparatur',
      'completed': 'Abgeschlossen',
      'shipped': 'Versendet',
      'closed': 'Geschlossen',
    }
    
    const statusText = statusMap[ticket.status] || ticket.status
    const createdDate = new Date(ticket.createdAt).toLocaleDateString('de-DE')
    const updatedDate = new Date(ticket.updatedAt).toLocaleDateString('de-DE')
    
    return `[TICKET-STATUS: Ticket ${ticket.ticketNumber} - Status: ${statusText}. Erstellt am: ${createdDate}. Letzte Aktualisierung: ${updatedDate}. Kategorie: ${ticket.category}.]`
  } catch (error) {
    console.error('Ticket lookup error:', error)
    return null
  }
}

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
      // Prüfen ob eine Ticketnummer enthalten ist
      const ticketStatus = await checkForTicketStatus(content)
      
      // Wissensdatenbank durchsuchen
      const knowledgeContext = await searchKnowledge(content)
      
      // Nachrichten für OpenAI vorbereiten
      const chatHistory = session.messages.map((msg) => ({
        role: (msg.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.content,
      }))
      
      // Content mit Ticket-Status und Wissensdatenbank-Kontext erweitern
      let enrichedContent = content
      if (ticketStatus) enrichedContent += `\n\n${ticketStatus}`
      if (knowledgeContext) enrichedContent += `\n\n${knowledgeContext}`
      chatHistory.push({ role: 'user', content: enrichedContent })

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
