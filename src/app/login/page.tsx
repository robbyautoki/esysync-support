import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function LoginPage() {
  const { userId } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  // Redirect to Clerk's hosted sign-in page
  redirect('https://full-oarfish-57.clerk.accounts.dev/sign-in?redirect_url=https%3A%2F%2Fesysync-support.vercel.app%2Fdashboard')
}
