import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Login from '@/components/shadcn-studio/blocks/login-page-03/login-page-03'

export default async function LoginPage() {
  const { userId } = await auth()

  // Wenn User bereits eingeloggt, zum Dashboard weiterleiten
  if (userId) {
    redirect('/dashboard')
  }

  return <Login />
}
