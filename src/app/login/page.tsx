import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Logo from '@/components/shadcn-studio/logo'

export default async function LoginPage() {
  const { userId } = await auth()

  if (userId) {
    redirect('/dashboard')
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
          <SignedOut>
            <SignInButton mode='redirect' forceRedirectUrl='/dashboard'>
              <Button className='w-full' size='lg'>
                Anmelden
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button className='w-full' size='lg' asChild>
              <a href='/dashboard'>Zum Dashboard</a>
            </Button>
          </SignedIn>
          <p className='text-center text-sm text-muted-foreground'>
            Melden Sie sich an, um Ihre Support-Anfragen zu verwalten.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
