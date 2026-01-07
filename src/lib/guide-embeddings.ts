import { prisma } from '@/lib/prisma'
import openai from '@/lib/openai'

// HTML-Tags entfernen für reinen Text
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

// Text in Chunks aufteilen
function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
  const chunks: string[] = []
  let start = 0
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push(text.slice(start, end))
    start += chunkSize - overlap
  }
  
  return chunks.filter(chunk => chunk.trim().length > 50)
}

// Embeddings generieren
async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return []
  
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  })
  
  return response.data.map(item => item.embedding)
}

// Guide-Chunks erstellen/aktualisieren
export async function updateGuideChunks(guideId: string, title: string, content: string): Promise<void> {
  try {
    // Alte Chunks löschen
    await prisma.guideChunk.deleteMany({
      where: { guideId },
    })

    // HTML zu Text konvertieren
    const plainText = stripHtml(content)
    const fullText = `${title}\n\n${plainText}`
    
    // In Chunks aufteilen
    const textChunks = chunkText(fullText)
    
    if (textChunks.length === 0) return

    // Embeddings generieren
    const embeddings = await generateEmbeddings(textChunks)

    // Chunks speichern
    await prisma.guideChunk.createMany({
      data: textChunks.map((chunk, index) => ({
        guideId,
        content: chunk,
        embedding: JSON.stringify(embeddings[index]),
        chunkIndex: index,
      })),
    })

    console.log(`Created ${textChunks.length} chunks for guide ${guideId}`)
  } catch (error) {
    console.error('Error updating guide chunks:', error)
    // Fehler nicht werfen, da Guide trotzdem gespeichert werden soll
  }
}

// Guide-Chunks löschen
export async function deleteGuideChunks(guideId: string): Promise<void> {
  try {
    await prisma.guideChunk.deleteMany({
      where: { guideId },
    })
  } catch (error) {
    console.error('Error deleting guide chunks:', error)
  }
}
