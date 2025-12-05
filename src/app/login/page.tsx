'use client'

import { useEffect } from 'react'
import { useAuth, useClerk } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Logo from '@/components/shadcn-studio/logo'

export default function LoginPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const clerk = useClerk()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      window.location.href = '/dashboard'
    }
  }, [isLoaded, isSignedIn])

  const handleGoogleLogin = () => {
    clerk.openSignIn({
      redirectUrl: '/dashboard'
    })
  }

  if (!isLoaded) {
    return (
      <div className='flex min-h-dvh items-center justify-center bg-muted'>
        <p className='text-muted-foreground'>Laden...</p>
      </div>
    )
  }

  if (isSignedIn) {
    return (
      <div className='flex min-h-dvh items-center justify-center bg-muted'>
        <p className='text-muted-foreground'>Weiterleitung zum Dashboard...</p>
      </div>
    )
  }

  return (
    <div className='flex min-h-dvh items-center justify-center bg-muted p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <Logo className='mx-auto mb-4' />
          <CardTitle className='text-2xl'>Willkommen bei esysync</CardTitle>
          <p className='text-muted-foreground'>Support-Tool für Immobilienprofis</p>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button className='w-full' size='lg' onClick={handleGoogleLogin}>
            Anmelden
          </Button>
          <p className='text-center text-sm text-muted-foreground'>
            Melden Sie sich an, um Ihre Support-Anfragen zu verwalten.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
