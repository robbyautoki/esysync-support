'use client'

import { useEffect, useState, type ComponentType, type CSSProperties } from 'react'

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
  DatabaseIcon,
  MailIcon,
  XCircleIcon,
  UserIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

interface TeamUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  imageUrl: string
  createdAt: number
  role: string
}

interface Invitation {
  id: string
  emailAddress: string
  status: string
  createdAt: number
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
  { icon: ClipboardListIcon, label: 'Support-Kategorien', href: '/dashboard/support-kategorien' },
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

export default function DashboardTeamPage() {
  const [users, setUsers] = useState<TeamUser[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchData = async () => {
    try {
      const response = await fetch('/api/invitations')
      const data = await response.json()
      if (data.success) {
        setUsers(data.users)
        setInvitations(data.invitations)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setSending(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailAddress: email }),
      })
      const data = await response.json()

      if (data.success) {
        setSuccess(`Einladung an ${email} wurde gesendet!`)
        setEmail('')
        fetchData()
      } else {
        setError(data.error || 'Fehler beim Senden der Einladung')
      }
    } catch (err) {
      setError('Fehler beim Senden der Einladung')
    } finally {
      setSending(false)
    }
  }

  const handleRevokeInvitation = async (invitationId: string) => {
    try {
      await fetch(`/api/invitations?id=${invitationId}`, {
        method: 'DELETE',
      })
      fetchData()
    } catch (err) {
      console.error('Revoke error:', err)
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
              <h1 className='text-2xl font-bold'>Team verwalten</h1>
              <p className='text-muted-foreground'>Team-Mitglieder einladen und verwalten</p>
            </div>

            <div className='grid gap-6 lg:grid-cols-2'>
              {/* Einladung senden */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MailIcon className='size-5' />
                    Neues Mitglied einladen
                  </CardTitle>
                  <CardDescription>
                    Senden Sie eine Einladung an eine E-Mail-Adresse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInvite} className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>E-Mail-Adresse</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='email@beispiel.de'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {error && (
                      <p className='text-sm text-red-500'>{error}</p>
                    )}
                    {success && (
                      <p className='text-sm text-green-500'>{success}</p>
                    )}
                    <Button type='submit' disabled={sending} className='w-full'>
                      {sending ? (
                        <><Loader2Icon className='size-4 mr-2 animate-spin' />Senden...</>
                      ) : (
                        <><MailIcon className='size-4 mr-2' />Einladung senden</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Ausstehende Einladungen */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <ClipboardListIcon className='size-5' />
                    Ausstehende Einladungen
                    {invitations.length > 0 && (
                      <Badge variant='secondary'>{invitations.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
                    </div>
                  ) : invitations.length === 0 ? (
                    <p className='text-muted-foreground text-center py-4'>
                      Keine ausstehenden Einladungen
                    </p>
                  ) : (
                    <div className='space-y-3'>
                      {invitations.map((inv) => (
                        <div key={inv.id} className='flex items-center justify-between p-3 rounded-lg bg-muted/50'>
                          <div>
                            <p className='font-medium'>{inv.emailAddress}</p>
                            <p className='text-xs text-muted-foreground'>
                              Gesendet am {new Date(inv.createdAt).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => handleRevokeInvitation(inv.id)}
                          >
                            <XCircleIcon className='size-4 text-red-500' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Team-Mitglieder */}
              <Card className='lg:col-span-2'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <UsersIcon className='size-5' />
                    Team-Mitglieder
                    {users.length > 0 && (
                      <Badge variant='secondary'>{users.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className='flex items-center justify-center py-8'>
                      <Loader2Icon className='size-6 animate-spin text-muted-foreground' />
                    </div>
                  ) : users.length === 0 ? (
                    <p className='text-muted-foreground text-center py-4'>
                      Keine Team-Mitglieder gefunden
                    </p>
                  ) : (
                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                      {users.map((user) => (
                        <div key={user.id} className='flex items-center gap-3 p-4 rounded-lg border'>
                          <Avatar>
                            <AvatarImage src={user.imageUrl} />
                            <AvatarFallback>
                              <UserIcon className='size-4' />
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1 min-w-0'>
                            <p className='font-medium truncate'>
                              {user.firstName && user.lastName 
                                ? `${user.firstName} ${user.lastName}`
                                : user.email}
                            </p>
                            <p className='text-sm text-muted-foreground truncate'>
                              {user.email}
                            </p>
                          </div>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'Admin' : 'Mitglied'}
                          </Badge>
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
