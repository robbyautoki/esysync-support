'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircleIcon, XIcon, SendIcon, Loader2Icon, UserIcon, BotIcon, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: string
  role: 'user' | 'ai' | 'team'
  content: string
  teamMemberName?: string
  createdAt: string
}

function generateVisitorId() {
  if (typeof window === 'undefined') return ''
  let visitorId = localStorage.getItem('chat_visitor_id')
  if (!visitorId) {
    visitorId = 'visitor_' + Math.random().toString(36).substring(2, 15)
    localStorage.setItem('chat_visitor_id', visitorId)
  }
  return visitorId
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'ai' | 'team' | 'closed'>('ai')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = useCallback(async () => {
    if (!sessionId) return
    try {
      const response = await fetch(`/api/chat/message?sessionId=${sessionId}`)
      const data = await response.json()
      if (data.success) {
        setMessages(data.messages)
        if (data.status) setStatus(data.status)
      }
    } catch (error) {
      console.error('Fetch messages error:', error)
    }
  }, [sessionId])

  // Polling für neue Nachrichten
  useEffect(() => {
    if (isOpen && sessionId) {
      pollingRef.current = setInterval(fetchMessages, 3000)
    }
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
      }
    }
  }, [isOpen, sessionId, fetchMessages])

  const initSession = async () => {
    const visitorId = generateVisitorId()
    try {
      const response = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId }),
      })
      const data = await response.json()
      if (data.success) {
        setSessionId(data.session.id)
        setMessages(data.session.messages || [])
        setStatus(data.session.status)
        
        // Willkommensnachricht nur bei neuer Session
        if (data.session.messages.length === 0) {
          const welcomeMsg: Message = {
            id: 'welcome',
            role: 'ai',
            content: 'Hallo! Ich bin der esysync Support-Assistent. Wie kann ich Ihnen helfen? Sie können mir Fragen zu unseren Displays stellen oder auf "Mit Mitarbeiter sprechen" klicken, um direkt mit unserem Team zu sprechen.',
            createdAt: new Date().toISOString(),
          }
          setMessages([welcomeMsg])
        }
      }
    } catch (error) {
      console.error('Init session error:', error)
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (!sessionId) {
      initSession()
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim() || !sessionId || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setIsLoading(true)

    // Optimistic update
    const tempUserMsg: Message = {
      id: 'temp_user_' + Date.now(),
      role: 'user',
      content: userMessage,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, tempUserMsg])

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, content: userMessage }),
      })
      const data = await response.json()
      if (data.success) {
        // Refresh messages
        await fetchMessages()
      }
    } catch (error) {
      console.error('Send message error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEscalate = async () => {
    if (!sessionId) return
    setIsLoading(true)
    try {
      await fetch('/api/chat/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      setStatus('team')
      await fetchMessages()
    } catch (error) {
      console.error('Escalate error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
          aria-label="Chat öffnen"
        >
          <MessageCircleIcon className="size-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl border bg-background shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                {status === 'ai' ? (
                  <BotIcon className="size-5" />
                ) : (
                  <HeadphonesIcon className="size-5" />
                )}
              </div>
              <div>
                <p className="font-semibold">esysync Support</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  <span className="text-xs opacity-90">
                    {status === 'ai' ? 'AI-Assistent' : 'Team verbunden'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-primary-foreground/20"
              aria-label="Chat schließen"
            >
              <XIcon className="size-5" />
            </button>
          </div>

          {/* Status Badge */}
          {status === 'team' && (
            <div className="border-b bg-green-50 px-4 py-2 dark:bg-green-950/30">
              <Badge variant="outline" className="border-green-500 text-green-700 dark:text-green-400">
                <HeadphonesIcon className="mr-1 size-3" />
                Mit Support-Team verbunden
              </Badge>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : msg.role === 'team'
                      ? 'bg-green-500 text-white'
                      : 'bg-muted'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <UserIcon className="size-4" />
                  ) : msg.role === 'team' ? (
                    <HeadphonesIcon className="size-4" />
                  ) : (
                    <BotIcon className="size-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.role === 'team' && msg.teamMemberName && (
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
                      {msg.teamMemberName}
                    </p>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <Loader2Icon className="size-4 animate-spin" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-2">
                  <p className="text-sm text-muted-foreground">Schreibt...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Escalate Button */}
          {status === 'ai' && messages.length > 1 && (
            <div className="border-t px-4 py-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEscalate}
                disabled={isLoading}
                className="w-full"
              >
                <HeadphonesIcon className="mr-2 size-4" />
                Mit Mitarbeiter sprechen
              </Button>
            </div>
          )}

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Nachricht schreiben..."
                disabled={isLoading || status === 'closed'}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading || status === 'closed'}
                size="icon"
              >
                <SendIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
