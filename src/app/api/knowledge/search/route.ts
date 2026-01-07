import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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

export async function POST(request: Request) {
  try {
    const { query, limit = 5 } = await request.json()

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Suchanfrage ist erforderlich' },
        { status: 400 }
      )
    }

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
          select: {
            id: true,
            filename: true,
          },
        },
      },
    })

    // Similarity berechnen und sortieren
    const results = chunks
      .map(chunk => {
        const chunkEmbedding = JSON.parse(chunk.embedding) as number[]
        const similarity = cosineSimilarity(queryEmbedding, chunkEmbedding)
        return {
          id: chunk.id,
          content: chunk.content,
          similarity,
          documentId: chunk.document.id,
          documentFilename: chunk.document.filename,
          chunkIndex: chunk.chunkIndex,
        }
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error('Knowledge search error:', error)
    return NextResponse.json(
      { success: false, error: 'Suche fehlgeschlagen' },
      { status: 500 }
    )
  }
}
