import { NextResponse } from 'next/server'
import { clerkClient, auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      )
    }

    const { emailAddress } = await request.json()

    if (!emailAddress) {
      return NextResponse.json(
        { success: false, error: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      )
    }

    const client = await clerkClient()
    const invitation = await client.invitations.createInvitation({
      emailAddress,
      publicMetadata: { role: 'admin' },
      redirectUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard',
    })

    return NextResponse.json({ success: true, invitation })
  } catch (error: unknown) {
    console.error('Invitation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Einladung konnte nicht gesendet werden'
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      )
    }

    const client = await clerkClient()
    
    // Ausstehende Einladungen abrufen
    const invitations = await client.invitations.getInvitationList({
      status: 'pending',
    })

    // Aktive Benutzer abrufen
    const users = await client.users.getUserList({
      limit: 100,
    })

    return NextResponse.json({
      success: true,
      invitations: invitations.data,
      users: users.data.map((user) => ({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
        role: user.publicMetadata?.role || 'member',
      })),
    })
  } catch (error) {
    console.error('Fetch invitations error:', error)
    return NextResponse.json(
      { success: false, error: 'Daten konnten nicht geladen werden' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const invitationId = searchParams.get('id')

    if (!invitationId) {
      return NextResponse.json(
        { success: false, error: 'Einladungs-ID ist erforderlich' },
        { status: 400 }
      )
    }

    const client = await clerkClient()
    await client.invitations.revokeInvitation(invitationId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Revoke invitation error:', error)
    return NextResponse.json(
      { success: false, error: 'Einladung konnte nicht widerrufen werden' },
      { status: 500 }
    )
  }
}
