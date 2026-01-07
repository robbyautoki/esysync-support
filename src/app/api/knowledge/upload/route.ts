import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { prisma } from '@/lib/prisma'
import openai from '@/lib/openai'

// Text aus verschiedenen Dateitypen extrahieren
async function extractText(buffer: Buffer, fileType: string): Promise<string> {
  switch (fileType) {
    case 'pdf':
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse')
      const pdfData = await pdfParse(buffer)
      return pdfData.text
    case 'docx':
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mammoth = require('mammoth')
      const docxResult = await mammoth.extractRawText({ buffer })
      return docxResult.value
    case 'txt':
    case 'md':
      return buffer.toString('utf-8')
    default:
      throw new Error(`Dateityp ${fileType} wird nicht unterstützt`)
  }
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
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  })
  
  return response.data.map(item => item.embedding)
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Keine Datei hochgeladen' },
        { status: 400 }
      )
    }

    // Dateityp ermitteln
    const filename = file.name
    const extension = filename.split('.').pop()?.toLowerCase() || ''
    const allowedTypes = ['pdf', 'docx', 'txt', 'md']
    
    if (!allowedTypes.includes(extension)) {
      return NextResponse.json(
        { success: false, error: `Dateityp .${extension} wird nicht unterstützt. Erlaubt: ${allowedTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Datei zu Vercel Blob hochladen
    const blob = await put(`knowledge/${Date.now()}-${filename}`, file, {
      access: 'public',
    })

    // Text extrahieren
    const buffer = Buffer.from(await file.arrayBuffer())
    const content = await extractText(buffer, extension)
    
    if (!content.trim()) {
      return NextResponse.json(
        { success: false, error: 'Kein Text konnte aus der Datei extrahiert werden' },
        { status: 400 }
      )
    }

    // Text in Chunks aufteilen
    const textChunks = chunkText(content)
    
    // Embeddings generieren
    const embeddings = await generateEmbeddings(textChunks)

    // Dokument in DB speichern
    const document = await prisma.knowledgeDocument.create({
      data: {
        filename,
        fileUrl: blob.url,
        fileType: extension,
        fileSize: file.size,
        content,
        chunks: {
          create: textChunks.map((chunk, index) => ({
            content: chunk,
            embedding: JSON.stringify(embeddings[index]),
            chunkIndex: index,
          })),
        },
      },
      include: {
        chunks: true,
      },
    })

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        filename: document.filename,
        fileType: document.fileType,
        fileSize: document.fileSize,
        chunksCount: document.chunks.length,
        createdAt: document.createdAt,
      },
    })
  } catch (error) {
    console.error('Knowledge upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Fehler beim Hochladen der Datei' },
      { status: 500 }
    )
  }
}
