import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sessions = await prisma.chatSession.findMany({
      where: {
        status: { in: ['ai', 'team'] },
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ success: true, sessions })
  } catch (error) {
    console.error('Chat sessions fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Sessions konnten nicht geladen werden' },
      { status: 500 }
    )
  }
}
