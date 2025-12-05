import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

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

    // Validierung: Nur Bilder erlauben
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Nur Bilder (JPEG, PNG, GIF, WebP) sind erlaubt' },
        { status: 400 }
      )
    }

    // Max 5MB
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Datei zu groß (max. 5MB)' },
        { status: 400 }
      )
    }

    // Upload zu Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload fehlgeschlagen' },
      { status: 500 }
    )
  }
}
