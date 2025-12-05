'use client'

import { useEffect, useState, type ComponentType, type CSSProperties } from 'react'
import Link from 'next/link'

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
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  BellIcon,
  FilterIcon,
  ListIcon,
  LayoutGridIcon,
  BookOpenIcon,
  FolderIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { KanbanBoard } from '@/components/kanban/KanbanBoard'

interface SupportTicket {
  id: string
  ticketNumber: string
  category: string
  problemDetail: string
  status: string
  accountNumber: string
  displayNumber: string
  contactPerson: string
  email: string
  createdAt: string
}

type MenuSubItem = {
  label: string
  href: string
  badge?: string
}

type MenuItem = {
  icon: ComponentType
  label: string
} & (
  | { href: string; badge?: string; items?: never }
  | { href?: never; badge?: never; items: MenuSubItem[] }
)

const menuItems: MenuItem[] = [
  { icon: ChartColumnBigIcon, label: 'Dashboard', href: '/dashboard' }
]

const settingsItems: MenuItem[] = [
  { icon: SettingsIcon, label: 'Einstellungen', href: '/dashboard/einstellungen' }
]

const SidebarGroupedMenuItems = ({ data, groupLabel }: { data: MenuItem[]; groupLabel?: string }) => {
  return (
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
}

// Kategorie-Labels
const categoryLabels: Record<string, string> = {
  hardware: 'Hardware',
  software: 'Software',
  network: 'Netzwerk'
}

// Status-Konfiguration mit erweiterten Status
const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof ClockIcon }> = {
  open: { label: 'Offen', variant: 'destructive', icon: AlertCircleIcon },
  in_progress: { label: 'In Bearbeitung', variant: 'default', icon: ClockIcon },
  waiting_for_device: { label: 'Warten auf Gerät', variant: 'outline', icon: PackageIcon },
  repair_in_progress: { label: 'Reparatur läuft', variant: 'default', icon: WrenchIcon },
  shipping_back: { label: 'Rückversand', variant: 'secondary', icon: TruckIcon },
  completed: { label: 'Abgeschlossen', variant: 'secondary', icon: CheckCircleIcon }
}

const AnfragenContent = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [stats, setStats] = useState({ open: 0, inProgress: 0, completed: 0 })
  const [view, setView] = useState<'list' | 'kanban'>('list')

  useEffect(() => {
    fetch('/api/tickets')
      .then(res => res.json())
      .then(data => {
        if (data.tickets) {
          setTickets(data.tickets)
          const open = data.tickets.filter((t: SupportTicket) => t.status === 'open').length
          const inProgress = data.tickets.filter((t: SupportTicket) =>
            ['in_progress', 'waiting_for_device', 'repair_in_progress', 'shipping_back'].includes(t.status)
          ).length
          const completed = data.tickets.filter((t: SupportTicket) => t.status === 'completed').length
          setStats({ open, inProgress, completed })
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Gefilterte Tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.displayNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Optimistic Update Handler für Kanban
  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    const previousTickets = [...tickets]

    // Optimistic update
    setTickets(prev => prev.map(t =>
      t.id === ticketId ? { ...t, status: newStatus } : t
    ))

    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (!res.ok) throw new Error()

      // Stats aktualisieren
      const updatedTickets = previousTickets.map(t =>
        t.id === ticketId ? { ...t, status: newStatus } : t
      )
      const open = updatedTickets.filter(t => t.status === 'open').length
      const inProgress = updatedTickets.filter(t =>
        ['in_progress', 'waiting_for_device', 'repair_in_progress', 'shipping_back'].includes(t.status)
      ).length
      const completed = updatedTickets.filter(t => t.status === 'completed').length
      setStats({ open, inProgress, completed })
    } catch {
      setTickets(previousTickets) // Rollback bei Fehler
    }
  }

  const supportItems: MenuItem[] = [
    { icon: InboxIcon, label: 'Support-Anfragen', href: '/dashboard/anfragen', badge: tickets.length > 0 ? String(tickets.length) : undefined },
    { icon: PlusIcon, label: 'Neue Anfrage', href: '/multi-step-form-02' },
    {
      icon: ClipboardListIcon,
      label: 'Berichte',
      items: [
        { label: 'Offene Tickets', href: '#', badge: stats.open > 0 ? String(stats.open) : undefined },
        { label: 'Abgeschlossen', href: '#', badge: stats.completed > 0 ? String(stats.completed) : undefined },
        { label: 'In Bearbeitung', href: '#', badge: stats.inProgress > 0 ? String(stats.inProgress) : undefined }
      ]
    }
  ]

  const anleitungenItems: MenuItem[] = [
    { icon: BookOpenIcon, label: 'Alle Anleitungen', href: '/dashboard/anleitungen' },
    { icon: PlusIcon, label: 'Neue Anleitung', href: '/dashboard/anleitungen/neu' },
    { icon: FolderIcon, label: 'Kategorien', href: '/dashboard/anleitungen/kategorien' }
  ]

  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider
        style={{ '--sidebar-width': '17.5rem', '--sidebar-width-icon': '3.5rem' } as CSSProperties}
      >
        <Sidebar
          variant='floating'
          collapsible='icon'
          className='p-6 pr-0 [&>[data-slot=sidebar-inner]]:group-data-[variant=floating]:rounded-xl'
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size='lg' className='gap-2.5 !bg-transparent [&>svg]:size-8' asChild>
                  <a href='/'>
                    <LogoSvg className='[&_rect]:fill-sidebar [&_rect:first-child]:fill-primary' />
                    <span className='text-xl font-semibold'>esysync</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroupedMenuItems data={menuItems} />
            <SidebarGroupedMenuItems data={supportItems} groupLabel='Support' />
            <SidebarGroupedMenuItems data={anleitungenItems} groupLabel='Anleitungen' />
            <SidebarGroupedMenuItems data={settingsItems} groupLabel='System' />
          </SidebarContent>
          <SidebarFooter className='[[data-state=collapsed]_&]:hidden'>
            <div className='flex flex-col items-start gap-4 overflow-hidden rounded-md p-2'>
              <p className='truncate text-lg font-semibold'>Hilfe benötigt?</p>
              <p className='line-clamp-2 text-sm'>Kontaktieren Sie uns telefonisch oder per E-Mail.</p>
              <Button className='truncate' asChild>
                <a href='/#kontakt'>Kontakt</a>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='before:bg-background/60 sticky top-0 z-50 before:absolute before:inset-0 before:mask-[linear-gradient(var(--card),var(--card)_18%,transparent_100%)] before:backdrop-blur-md'>
            <div className='bg-card relative z-51 mx-auto mt-6 flex w-[calc(100%-2rem)] items-center justify-between rounded-xl border px-6 py-2 shadow-sm sm:w-[calc(100%-3rem)]'>
              <div className='flex items-center gap-1.5 sm:gap-4'>
                <SidebarTrigger className='[&_svg]:!size-5' />
                <Separator orientation='vertical' className='hidden !h-4 sm:block md:max-lg:hidden' />
                <SearchDialog
                  trigger={
                    <>
                      <Button variant='ghost' className='hidden !bg-transparent px-1 py-0 font-normal sm:block md:max-lg:hidden'>
                        <div className='text-muted-foreground hidden items-center gap-1.5 text-sm sm:flex md:max-lg:hidden'>
                          <SearchIcon />
                          <span>Suchen...</span>
                        </div>
                      </Button>
                      <Button variant='ghost' size='icon' className='sm:hidden md:max-lg:inline-flex'>
                        <SearchIcon />
                        <span className='sr-only'>Suchen</span>
                      </Button>
                    </>
                  }
                />
              </div>
              <div className='flex items-center gap-1.5'>
                <LanguageDropdown trigger={<Button variant='ghost' size='icon'><LanguagesIcon /></Button>} />
                <NotificationDropdown
                  trigger={
                    <Button variant='ghost' size='icon' className='relative'>
                      <BellIcon />
                      {stats.open > 0 && <span className='bg-destructive absolute top-2 right-2.5 size-2 rounded-full' />}
                    </Button>
                  }
                />
                <ClerkProfileDropdown />
              </div>
            </div>
          </header>
          <main className='size-full flex-1 px-4 py-6 sm:px-6'>
            {/* Header mit View-Toggle */}
            <div className='flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h1 className='text-2xl font-bold'>Support-Anfragen</h1>
                <p className='text-muted-foreground'>Übersicht aller eingegangenen Support-Tickets</p>
              </div>
              <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'kanban')}>
                <TabsList>
                  <TabsTrigger value='list'>
                    <ListIcon className='size-4 mr-2' />
                    Liste
                  </TabsTrigger>
                  <TabsTrigger value='kanban'>
                    <LayoutGridIcon className='size-4 mr-2' />
                    Kanban
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Filter */}
            <Card className='mb-6'>
              <CardContent className='pt-6'>
                <div className='flex flex-col gap-4 sm:flex-row'>
                  <div className='relative flex-1'>
                    <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                    <Input
                      placeholder='Ticket-Nr., Name oder Display-Nr. suchen...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className='w-full sm:w-[200px]'>
                      <FilterIcon className='size-4 mr-2' />
                      <SelectValue placeholder='Status filtern' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Alle Status</SelectItem>
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>{config.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bedingte Ansicht: Liste oder Kanban */}
            {view === 'list' ? (
              <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle>
                    {filteredTickets.length} {filteredTickets.length === 1 ? 'Ticket' : 'Tickets'}
                    {statusFilter !== 'all' && ` (${statusConfig[statusFilter]?.label})`}
                  </CardTitle>
                  <Button size='sm' asChild>
                    <a href='/multi-step-form-02'>
                      <PlusIcon className='size-4 mr-2' />
                      Neue Anfrage
                    </a>
                  </Button>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className='flex items-center justify-center py-12'>
                      <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
                    </div>
                  ) : filteredTickets.length === 0 ? (
                    <div className='text-muted-foreground text-center py-12'>
                      <InboxIcon className='mx-auto size-12 mb-4 opacity-50' />
                      <p>Keine Tickets gefunden.</p>
                      {searchTerm && <p className='text-sm mt-2'>Versuchen Sie einen anderen Suchbegriff.</p>}
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      {filteredTickets.map(ticket => {
                        const status = statusConfig[ticket.status] || statusConfig.open
                        const StatusIcon = status.icon
                        return (
                          <Link
                            key={ticket.id}
                            href={`/dashboard/anfragen/${ticket.id}`}
                            className='flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer block'
                          >
                            <div className='flex items-start gap-4'>
                              <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-2'>
                                  <span className='font-mono text-sm font-semibold'>{ticket.ticketNumber}</span>
                                  <Badge variant={status.variant} className='text-xs'>
                                    <StatusIcon className='size-3 mr-1' />
                                    {status.label}
                                  </Badge>
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                  {categoryLabels[ticket.category] || ticket.category} - Display: {ticket.displayNumber}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                  {ticket.contactPerson} ({ticket.email})
                                </p>
                              </div>
                            </div>
                            <div className='flex items-center gap-4'>
                              <div className='text-right text-sm text-muted-foreground'>
                                {new Date(ticket.createdAt).toLocaleDateString('de-DE', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                              <ChevronRightIcon className='size-5 text-muted-foreground' />
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Kanban-Ansicht */
              loading ? (
                <div className='flex items-center justify-center py-12'>
                  <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
                </div>
              ) : (
                <KanbanBoard
                  tickets={filteredTickets}
                  onStatusChange={handleStatusChange}
                />
              )
            )}
          </main>
          <footer className='flex items-center justify-between gap-3 px-4 pb-6 max-lg:flex-col sm:px-6 lg:gap-6'>
            <p className='text-muted-foreground text-sm text-balance max-lg:text-center'>
              {`©${new Date().getFullYear()}`}{' '}
              <a href='/' className='text-primary'>esysync</a>
              , Display-Support für Immobilienprofis
            </p>
            <div className='text-muted-foreground *:hover:text-primary flex items-center gap-3 text-sm whitespace-nowrap max-[450px]:flex-col min-[450px]:gap-4'>
              <a href='/impressum'>Impressum</a>
              <a href='/datenschutz'>Datenschutz</a>
              <a href='/#kontakt'>Kontakt</a>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default function AnfragenPage() {
  return <AnfragenContent />
}
