import { NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const documents = await prisma.knowledgeDocument.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        filename: true,
        fileUrl: true,
        fileType: true,
        fileSize: true,
        createdAt: true,
        _count: {
          select: { chunks: true },
        },
      },
    })

    return NextResponse.json({
      success: true,
      documents: documents.map(doc => ({
        ...doc,
        chunksCount: doc._count.chunks,
        _count: undefined,
      })),
    })
  } catch (error) {
    console.error('Fetch documents error:', error)
    return NextResponse.json(
      { success: false, error: 'Dokumente konnten nicht geladen werden' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Dokument-ID ist erforderlich' },
        { status: 400 }
      )
    }

    // Dokument finden
    const document = await prisma.knowledgeDocument.findUnique({
      where: { id },
    })

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Dokument nicht gefunden' },
        { status: 404 }
      )
    }

    // Blob löschen
    try {
      await del(document.fileUrl)
    } catch (blobError) {
      console.error('Blob delete error:', blobError)
    }

    // Dokument und Chunks aus DB löschen (Cascade)
    await prisma.knowledgeDocument.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete document error:', error)
    return NextResponse.json(
      { success: false, error: 'Dokument konnte nicht gelöscht werden' },
      { status: 500 }
    )
  }
}
