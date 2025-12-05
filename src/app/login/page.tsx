'use client'

import { useEffect } from 'react'
import { useSignIn, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { signIn, isLoaded } = useSignIn()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    // If already signed in, go to dashboard
    if (isSignedIn) {
      router.push('/dashboard')
      return
    }

    // Start Google OAuth flow immediately
    if (signIn) {
      signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard'
      })
    }
  }, [isLoaded, isSignedIn, signIn, router])

  return (
    <div className='flex min-h-dvh items-center justify-center bg-muted'>
      <p className='text-muted-foreground'>Weiterleitung zur Anmeldung...</p>
    </div>
  )
}
