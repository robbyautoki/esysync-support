'use client'

import { useEffect, useState, useRef, type ComponentType, type CSSProperties } from 'react'

import {
  BellIcon,
  ChartColumnBigIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  LanguagesIcon,
  PlusIcon,
  SearchIcon,
  InboxIcon,
  SettingsIcon,
  Loader2Icon,
  BookOpenIcon,
  FolderIcon,
  MessageCircleIcon,
  UsersIcon,
  UploadIcon,
  FileTextIcon,
  TrashIcon,
  DatabaseIcon,
  SendIcon,
  BotIcon,
  ExternalLinkIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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

interface KnowledgeDocument {
  id: string
  filename: string
  fileUrl: string
  fileType: string
  fileSize: number
  chunksCount: number
  createdAt: string
}

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

type MenuSubItem = { label: string; href: string; badge?: string }
type MenuItem = { icon: ComponentType; label: string } & (
  | { href: string; badge?: string; items?: never }
  | { href?: never; badge?: never; items: MenuSubItem[] }
)

const menuItems: MenuItem[] = [{ icon: ChartColumnBigIcon, label: 'Dashboard', href: '/dashboard' }]

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

const settingsItems: MenuItem[] = [
  { icon: DatabaseIcon, label: 'Wissensdatenbank', href: '/dashboard/wissen' },
  { icon: UsersIcon, label: 'Team verwalten', href: '/dashboard/team' },
  { icon: SettingsIcon, label: 'Einstellungen', href: '/dashboard/einstellungen' }
]

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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function DashboardWissenPage() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: 'Hallo! Ich bin der KI-Assistent. Stellen Sie mir eine Frage, um die Wissensdatenbank zu testen.' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [sending, setSending] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/knowledge/documents')
      const data = await response.json()
      if (data.success) {
        setDocuments(data.documents)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/knowledge/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        fetchDocuments()
      } else {
        alert(data.error || 'Upload fehlgeschlagen')
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload fehlgeschlagen')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Dokument wirklich löschen?')) return

    try {
      await fetch(`/api/knowledge/documents?id=${id}`, {
        method: 'DELETE',
      })
      fetchDocuments()
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim() || sending) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setSending(true)

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'test-session',
          content: userMessage,
          visitorId: 'test-visitor',
        }),
      })
      const data = await response.json()
      if (data.success && data.aiResponse) {
        setChatMessages(prev => [...prev, { role: 'ai', content: data.aiResponse }])
      } else {
        setChatMessages(prev => [...prev, { role: 'ai', content: 'Entschuldigung, es ist ein Fehler aufgetreten.' }])
      }
    } catch (err) {
      console.error('Chat error:', err)
      setChatMessages(prev => [...prev, { role: 'ai', content: 'Entschuldigung, es ist ein Fehler aufgetreten.' }])
    } finally {
      setSending(false)
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' })
      }, 100)
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
              <h1 className='text-2xl font-bold'>Wissensdatenbank</h1>
              <p className='text-muted-foreground'>Dokumente für den KI-Support hochladen und verwalten</p>
            </div>

            <div className='grid gap-6 lg:grid-cols-2'>
              {/* Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <UploadIcon className='size-5' />
                    Dokument hochladen
                  </CardTitle>
                  <CardDescription>
                    PDF, DOCX, TXT oder MD Dateien hochladen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='.pdf,.docx,.txt,.md'
                    onChange={handleUpload}
                    className='hidden'
                    id='file-upload'
                  />
                  <label
                    htmlFor='file-upload'
                    className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {uploading ? (
                      <>
                        <Loader2Icon className='size-8 text-muted-foreground animate-spin mb-2' />
                        <span className='text-sm text-muted-foreground'>Wird verarbeitet...</span>
                      </>
                    ) : (
                      <>
                        <UploadIcon className='size-8 text-muted-foreground mb-2' />
                        <span className='text-sm text-muted-foreground'>Klicken zum Hochladen</span>
                        <span className='text-xs text-muted-foreground mt-1'>PDF, DOCX, TXT, MD</span>
                      </>
                    )}
                  </label>
                </CardContent>
              </Card>

              {/* Chat testen */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <BotIcon className='size-5' />
                    Chat testen
                  </CardTitle>
                  <CardDescription>
                    Testen Sie die KI mit Ihrer Wissensdatenbank
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div 
                    ref={chatContainerRef}
                    className='h-64 overflow-y-auto space-y-3 p-3 rounded-lg bg-muted/30 border'
                  >
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                            msg.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-background border'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {sending && (
                      <div className='flex justify-start'>
                        <div className='bg-background border rounded-lg px-3 py-2'>
                          <Loader2Icon className='size-4 animate-spin' />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Input
                      placeholder='Frage eingeben...'
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      disabled={sending}
                    />
                    <Button onClick={handleSendMessage} disabled={sending || !chatInput.trim()}>
                      {sending ? <Loader2Icon className='size-4 animate-spin' /> : <SendIcon className='size-4' />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Dokumente */}
              <Card className='lg:col-span-2'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <DatabaseIcon className='size-5' />
                    Gespeicherte Dokumente
                    {documents.length > 0 && (
                      <Badge variant='secondary'>{documents.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
                    </div>
                  ) : documents.length === 0 ? (
                    <div className='text-center py-8 text-muted-foreground'>
                      <DatabaseIcon className='size-12 mx-auto mb-2 opacity-50' />
                      <p>Keine Dokumente vorhanden</p>
                      <p className='text-sm'>Laden Sie Dokumente hoch, um die Wissensdatenbank zu füllen</p>
                    </div>
                  ) : (
                    <div className='space-y-2'>
                      {documents.map((doc) => (
                        <div key={doc.id} className='flex items-center justify-between p-4 rounded-lg border'>
                          <div className='flex items-center gap-3'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-muted'>
                              <FileTextIcon className='size-5 text-muted-foreground' />
                            </div>
                            <div>
                              <p className='font-medium'>{doc.filename}</p>
                              <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                                <Badge variant='outline' className='text-xs'>{doc.fileType.toUpperCase()}</Badge>
                                <span>{formatFileSize(doc.fileSize)}</span>
                                <span>•</span>
                                <span>{doc.chunksCount} Chunks</span>
                                <span>•</span>
                                <span>{new Date(doc.createdAt).toLocaleDateString('de-DE')}</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Button variant='ghost' size='icon' asChild>
                              <a href={doc.fileUrl} target='_blank' rel='noopener noreferrer'>
                                <ExternalLinkIcon className='size-4' />
                              </a>
                            </Button>
                            <Button variant='ghost' size='icon' onClick={() => handleDelete(doc.id)}>
                              <TrashIcon className='size-4 text-red-500' />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
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
