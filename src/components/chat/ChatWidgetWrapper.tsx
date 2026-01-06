'use client'

import { usePathname } from 'next/navigation'
import ChatWidget from './ChatWidget'

export default function ChatWidgetWrapper() {
  const pathname = usePathname()
  
  // Chat Widget nicht im Dashboard anzeigen
  if (pathname?.startsWith('/dashboard')) {
    return null
  }
  
  return <ChatWidget />
}
