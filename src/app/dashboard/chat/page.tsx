'use client'

import { useEffect, useState, useRef, type ComponentType, type CSSProperties } from 'react'

import {
  ChartColumnBigIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  LanguagesIcon,
  PlusIcon,
  SearchIcon,
  InboxIcon,
  SettingsIcon,
  Loader2Icon,
  BellIcon,
  MessageCircleIcon,
  SendIcon,
  UserIcon,
  BotIcon,
  HeadphonesIcon,
  XCircleIcon,
  LogOutIcon,
  BookOpenIcon,
  FolderIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

import LogoSvg from '@/assets/svg/logo'
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ClerkProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile-clerk'

interface ChatMessage {
  id: string
  role: 'user' | 'ai' | 'team'
  content: string
  teamMemberName?: string
  createdAt: string
}

interface ChatSession {
  id: string
  visitorId: string
  visitorName?: string
  status: 'ai' | 'team' | 'closed'
  messages: ChatMessage[]
  _count: { messages: number }
  createdAt: string
  updatedAt: string
}

type MenuSubItem = { label: string; href: string; badge?: string }
type MenuItem = { icon: ComponentType; label: string } & (
  | { href: string; badge?: string; items?: never }
  | { href?: never; badge?: never; items: MenuSubItem[] }
)

const menuItems: MenuItem[] = [{ icon: ChartColumnBigIcon, label: 'Dashboard', href: '/dashboard' }]
const settingsItems: MenuItem[] = [{ icon: SettingsIcon, label: 'Einstellungen', href: '/dashboard/einstellungen' }]

const SidebarGroupedMenuItems = ({ data, groupLabel }: { data: MenuItem[]; groupLabel?: string }) => (
  <SidebarGroup>
    {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
    <SidebarGroupContent>
      <SidebarMenu>
        {data.map(item =>
          item.items ? (
            <Collapsible className='group/collapsible' key={item.label}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                    <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map(subItem => (
                      <SidebarMenuSubItem key={subItem.label}>
                        <SidebarMenuSubButton className='justify-between' asChild>
                          <a href={subItem.href}>
                            {subItem.label}
                            {subItem.badge && (
                              <span className='bg-primary/10 flex h-5 min-w-5 items-center justify-center rounded-full text-xs'>
                                {subItem.badge}
                              </span>
                            )}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton tooltip={item.label} asChild>
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge className='bg-primary/10 rounded-full'>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
)

export default function DashboardChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [teamMemberName, setTeamMemberName] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  const supportItems: MenuItem[] = [
    { icon: InboxIcon, label: 'Support-Anfragen', href: '/dashboard/anfragen' },
    { icon: MessageCircleIcon, label: 'Live-Chat', href: '/dashboard/chat' },
    { icon: PlusIcon, label: 'Neue Anfrage', href: '/multi-step-form-02' },
    { icon: ClipboardListIcon, label: 'Berichte', items: [
      { label: 'Offene Tickets', href: '#' },
      { label: 'Abgeschlossen', href: '#' }
    ]}
  ]

  const guidesItems: MenuItem[] = [
    { icon: BookOpenIcon, label: 'Alle Anleitungen', href: '/dashboard/anleitungen' },
    { icon: FolderIcon, label: 'Kategorien', href: '/dashboard/anleitungen/kategorien' },
    { icon: PlusIcon, label: 'Neue Anleitung', href: '/dashboard/anleitungen/neu' }
  ]

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/chat/sessions')
      const data = await response.json()
      if (data.success) {
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error('Fetch sessions error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat/message?sessionId=${sessionId}`)
      const data = await response.json()
      if (data.success) {
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Fetch messages error:', error)
    }
  }

  useEffect(() => {
    fetchSessions()
    pollingRef.current = setInterval(fetchSessions, 5000)
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [])

  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession.id)
      const msgPolling = setInterval(() => fetchMessages(selectedSession.id), 3000)
      return () => clearInterval(msgPolling)
    }
  }, [selectedSession])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSelectSession = (session: ChatSession) => {
    setSelectedSession(session)
    setMessages([])
  }

  const handleSendReply = async () => {
    if (!selectedSession || !replyContent.trim() || !teamMemberName.trim()) return
    setSending(true)
    try {
      await fetch('/api/chat/team-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          content: replyContent,
          teamMemberName,
        }),
      })
      setReplyContent('')
      await fetchMessages(selectedSession.id)
    } catch (error) {
      console.error('Send reply error:', error)
    } finally {
      setSending(false)
    }
  }

  const handleCloseSession = async () => {
    if (!selectedSession) return
    try {
      await fetch('/api/chat/close', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: selectedSession.id }),
      })
      setSelectedSession(null)
      await fetchSessions()
    } catch (error) {
      console.error('Close session error:', error)
    }
  }

  const handleLeaveSession = async () => {
    if (!selectedSession) return
    try {
      await fetch('/api/chat/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sessionId: selectedSession.id,
          teamMemberName: teamMemberName || undefined,
        }),
      })
      // Session aktualisieren
      setSelectedSession({ ...selectedSession, status: 'ai' })
      await fetchMessages(selectedSession.id)
      await fetchSessions()
    } catch (error) {
      console.error('Leave session error:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ai':
        return <Badge variant="outline"><BotIcon className="size-3 mr-1" />AI</Badge>
      case 'team':
        return <Badge variant="default"><HeadphonesIcon className="size-3 mr-1" />Team</Badge>
      default:
        return <Badge variant="secondary">Geschlossen</Badge>
    }
  }

  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider style={{ '--sidebar-width': '17.5rem', '--sidebar-width-icon': '3.5rem' } as CSSProperties}>
        <Sidebar variant='floating' collapsible='icon' className='p-6 pr-0 [&>[data-slot=sidebar-inner]]:group-data-[variant=floating]:rounded-xl'>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size='lg' className='gap-2.5 !bg-transparent [&>svg]:size-8' asChild>
                  <a href='/'><LogoSvg className='[&_rect]:fill-sidebar [&_rect:first-child]:fill-primary' /><span className='text-xl font-semibold'>esysync</span></a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroupedMenuItems data={menuItems} />
            <SidebarGroupedMenuItems data={supportItems} groupLabel='Support' />
            <SidebarGroupedMenuItems data={guidesItems} groupLabel='Anleitungen' />
            <SidebarGroupedMenuItems data={settingsItems} groupLabel='System' />
          </SidebarContent>
          <SidebarFooter className='[[data-state=collapsed]_&]:hidden'>
            <div className='flex flex-col items-start gap-4 overflow-hidden rounded-md p-2'>
              <p className='truncate text-lg font-semibold'>Hilfe benötigt?</p>
              <p className='line-clamp-2 text-sm'>Kontaktieren Sie uns telefonisch oder per E-Mail.</p>
              <Button className='truncate' asChild><a href='/#kontakt'>Kontakt</a></Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='before:bg-background/60 sticky top-0 z-50 before:absolute before:inset-0 before:mask-[linear-gradient(var(--card),var(--card)_18%,transparent_100%)] before:backdrop-blur-md'>
            <div className='bg-card relative z-51 mx-auto mt-6 flex w-[calc(100%-2rem)] items-center justify-between rounded-xl border px-6 py-2 shadow-sm sm:w-[calc(100%-3rem)]'>
              <div className='flex items-center gap-1.5 sm:gap-4'>
                <SidebarTrigger className='[&_svg]:!size-5' />
                <Separator orientation='vertical' className='hidden !h-4 sm:block' />
                <SearchDialog trigger={<Button variant='ghost' className='hidden !bg-transparent px-1 py-0 font-normal sm:block'><div className='text-muted-foreground hidden items-center gap-1.5 text-sm sm:flex'><SearchIcon /><span>Suchen...</span></div></Button>} />
              </div>
              <div className='flex items-center gap-1.5'>
                <LanguageDropdown trigger={<Button variant='ghost' size='icon'><LanguagesIcon /></Button>} />
                <NotificationDropdown trigger={<Button variant='ghost' size='icon' className='relative'><BellIcon /></Button>} />
                <ClerkProfileDropdown />
              </div>
            </div>
          </header>
          <main className='size-full flex-1 px-4 py-6 sm:px-6'>
            <div className='mb-6'>
              <h1 className='text-2xl font-bold'>Live-Chat</h1>
              <p className='text-muted-foreground'>Chat-Anfragen von Website-Besuchern</p>
            </div>

            <div className='grid gap-6 lg:grid-cols-3'>
              {/* Session List */}
              <Card className='lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MessageCircleIcon className='size-5' />
                    Aktive Chats
                    {sessions.length > 0 && (
                      <Badge variant='secondary'>{sessions.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className='p-0'>
                  {loading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className='text-center py-8 text-muted-foreground'>
                      <MessageCircleIcon className='size-12 mx-auto mb-2 opacity-50' />
                      <p>Keine aktiven Chats</p>
                    </div>
                  ) : (
                    <div className='divide-y'>
                      {sessions.map((session) => (
                        <button
                          key={session.id}
                          onClick={() => handleSelectSession(session)}
                          className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${
                            selectedSession?.id === session.id ? 'bg-muted' : ''
                          }`}
                        >
                          <div className='flex items-center justify-between mb-1'>
                            <span className='font-medium text-sm'>
                              {session.visitorName || session.visitorId.slice(0, 12)}
                            </span>
                            {getStatusBadge(session.status)}
                          </div>
                          {session.messages[0] && (
                            <p className='text-sm text-muted-foreground truncate'>
                              {session.messages[0].content}
                            </p>
                          )}
                          <p className='text-xs text-muted-foreground mt-1'>
                            {session._count.messages} Nachrichten
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Chat View */}
              <Card className='lg:col-span-2'>
                {selectedSession ? (
                  <>
                    <CardHeader className='border-b'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <CardTitle className='flex items-center gap-2'>
                            <UserIcon className='size-5' />
                            {selectedSession.visitorName || selectedSession.visitorId.slice(0, 12)}
                          </CardTitle>
                          <CardDescription>
                            Session gestartet: {new Date(selectedSession.createdAt).toLocaleString('de-DE')}
                          </CardDescription>
                        </div>
                        <div className='flex items-center gap-2'>
                          {getStatusBadge(selectedSession.status)}
                          {selectedSession.status === 'team' && (
                            <Button variant='outline' size='sm' onClick={handleLeaveSession}>
                              <LogOutIcon className='size-4 mr-1' />
                              Verlassen
                            </Button>
                          )}
                          <Button variant='outline' size='sm' onClick={handleCloseSession}>
                            <XCircleIcon className='size-4 mr-1' />
                            Schließen
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='p-0'>
                      {/* Messages */}
                      <div className='h-[400px] overflow-y-auto p-4 space-y-4'>
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex gap-2 ${msg.role === 'user' ? '' : 'flex-row-reverse'}`}
                          >
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                msg.role === 'user'
                                  ? 'bg-muted'
                                  : msg.role === 'team'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              {msg.role === 'user' ? (
                                <UserIcon className='size-4' />
                              ) : msg.role === 'team' ? (
                                <HeadphonesIcon className='size-4' />
                              ) : (
                                <BotIcon className='size-4' />
                              )}
                            </div>
                            <div
                              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                                msg.role === 'user'
                                  ? 'bg-muted'
                                  : msg.role === 'team'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              {msg.role === 'team' && msg.teamMemberName && (
                                <p className='text-xs font-semibold opacity-80 mb-1'>
                                  {msg.teamMemberName}
                                </p>
                              )}
                              {msg.role === 'ai' && (
                                <p className='text-xs font-semibold opacity-80 mb-1'>
                                  AI-Assistent
                                </p>
                              )}
                              <p className='text-sm whitespace-pre-wrap'>{msg.content}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Reply Form */}
                      <div className='border-t p-4 space-y-3'>
                        <div className='grid gap-2'>
                          <Label htmlFor='team-name'>Ihr Name</Label>
                          <Input
                            id='team-name'
                            placeholder='z.B. Max Mustermann'
                            value={teamMemberName}
                            onChange={(e) => setTeamMemberName(e.target.value)}
                          />
                        </div>
                        <div className='grid gap-2'>
                          <Label htmlFor='reply'>Antwort</Label>
                          <Textarea
                            id='reply'
                            placeholder='Ihre Nachricht an den Kunden...'
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <Button
                          onClick={handleSendReply}
                          disabled={sending || !replyContent.trim() || !teamMemberName.trim()}
                          className='w-full'
                        >
                          {sending ? (
                            <><Loader2Icon className='size-4 mr-2 animate-spin' />Senden...</>
                          ) : (
                            <><SendIcon className='size-4 mr-2' />Antwort senden</>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className='flex items-center justify-center h-[500px]'>
                    <div className='text-center text-muted-foreground'>
                      <MessageCircleIcon className='size-16 mx-auto mb-4 opacity-50' />
                      <p className='text-lg font-medium'>Wählen Sie einen Chat aus</p>
                      <p className='text-sm'>Klicken Sie auf eine Session links, um den Chat anzuzeigen</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </main>
          <footer className='flex items-center justify-between gap-3 px-4 pb-6 max-lg:flex-col sm:px-6 lg:gap-6'>
            <p className='text-muted-foreground text-sm text-balance max-lg:text-center'>
              {`©${new Date().getFullYear()}`}{' '}
              <a href='/' className='text-primary'>esysync</a>
              , Display-Support für Immobilienprofis
            </p>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}
