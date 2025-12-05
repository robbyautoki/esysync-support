import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function LoginPage() {
  const { userId } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  // Redirect to Clerk's Account Portal sign-in
  redirect('https://accounts.full-oarfish-57.clerk.accounts.dev/sign-in?redirect_url=https://esysync-support.vercel.app/dashboard')
}
