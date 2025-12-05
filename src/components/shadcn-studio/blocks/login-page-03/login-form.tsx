'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const LoginForm = () => {
  const { signIn, isLoaded, setActive } = useSignIn()
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    setError('')
    setLoading(true)

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message?: string }> }
      setError(clerkError.errors?.[0]?.message || 'Login fehlgeschlagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      {error && (
        <div className='bg-destructive/10 text-destructive rounded-md p-3 text-sm'>
          {error}
        </div>
      )}

      {/* Email */}
      <div className='space-y-1'>
        <Label className='leading-5' htmlFor='userEmail'>
          E-Mail-Adresse*
        </Label>
        <Input
          type='email'
          id='userEmail'
          placeholder='Ihre E-Mail-Adresse eingeben'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className='w-full space-y-1'>
        <Label className='leading-5' htmlFor='password'>
          Passwort*
        </Label>
        <div className='relative'>
          <Input
            id='password'
            type={isVisible ? 'text' : 'password'}
            placeholder='••••••••••••••••'
            className='pr-9'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant='ghost'
            size='icon'
            type='button'
            onClick={() => setIsVisible(prevState => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>{isVisible ? 'Passwort verbergen' : 'Passwort anzeigen'}</span>
          </Button>
        </div>
      </div>

      {/* Remember Me and Forgot Password */}
      <div className='flex items-center justify-between gap-y-2'>
        <div className='flex items-center gap-3'>
          <Checkbox id='rememberMe' className='size-6' />
          <Label htmlFor='rememberMe' className='text-muted-foreground'>
            Angemeldet bleiben
          </Label>
        </div>

        <a href='#' className='hover:underline'>
          Passwort vergessen?
        </a>
      </div>

      <Button className='w-full' type='submit' disabled={loading}>
        {loading ? (
          <>
            <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
            Wird angemeldet...
          </>
        ) : (
          'Anmelden'
        )}
      </Button>
    </form>
  )
}

export default LoginForm
