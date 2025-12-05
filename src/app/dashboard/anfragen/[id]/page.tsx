'use client'

import { useEffect, useState, type ComponentType, type CSSProperties } from 'react'
import { useParams, useRouter } from 'next/navigation'

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
  ArrowLeftIcon,
  SaveIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

interface StatusHistoryItem {
  id: string
  fromStatus: string | null
  toStatus: string
  comment: string | null
  createdAt: string
}

interface SupportTicket {
  id: string
  ticketNumber: string
  category: string
  problemDetail: string
  hasRestarted: boolean
  shippingOption: string
  status: string
  accountNumber: string
  displayNumber: string
  displayLocation: string
  alternateReturnAddress: string | null
  email: string
  additionalDeviceAffected: boolean
  differentShippingAddress: boolean
  shippingAddress: string | null
  salutation: string
  contactPerson: string
  createdAt: string
  updatedAt: string
  statusHistory: StatusHistoryItem[]
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

// Labels
const categoryLabels: Record<string, string> = { hardware: 'Hardware', software: 'Software', network: 'Netzwerk' }
const salutationLabels: Record<string, string> = { herr: 'Herr', frau: 'Frau', divers: 'Divers' }
const shippingLabels: Record<string, string> = {
  'own-packaging': 'Eigene Verpackung',
  'avantor-box': 'AVANTOR-Box mit Rückschein',
  'technician': 'Techniker-Abholung',
  'complete-swap': 'Kompletttausch'
}

// Status-Konfiguration
const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof ClockIcon; color: string }> = {
  open: { label: 'Offen', variant: 'destructive', icon: AlertCircleIcon, color: 'bg-red-500' },
  in_progress: { label: 'In Bearbeitung', variant: 'default', icon: ClockIcon, color: 'bg-blue-500' },
  waiting_for_device: { label: 'Warten auf Gerät', variant: 'outline', icon: PackageIcon, color: 'bg-yellow-500' },
  repair_in_progress: { label: 'Reparatur läuft', variant: 'default', icon: WrenchIcon, color: 'bg-purple-500' },
  shipping_back: { label: 'Rückversand', variant: 'secondary', icon: TruckIcon, color: 'bg-orange-500' },
  completed: { label: 'Abgeschlossen', variant: 'secondary', icon: CheckCircleIcon, color: 'bg-green-500' }
}

// Status-Reihenfolge für Timeline
const statusOrder = ['open', 'in_progress', 'waiting_for_device', 'repair_in_progress', 'shipping_back', 'completed']

const TicketDetailContent = () => {
  const params = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState<SupportTicket | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newStatus, setNewStatus] = useState<string>('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tickets/${params.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.ticket) {
            setTicket(data.ticket)
            setNewStatus(data.ticket.status)
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [params.id])

  const handleStatusChange = async () => {
    if (!ticket || newStatus === ticket.status) return

    setSaving(true)
    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, comment: comment || undefined }),
      })
      const data = await response.json()
      if (data.success) {
        setTicket(data.ticket)
        setComment('')
      }
    } catch (error) {
      console.error('Status update error:', error)
    } finally {
      setSaving(false)
    }
  }

  const supportItems: MenuItem[] = [
    { icon: InboxIcon, label: 'Support-Anfragen', href: '/dashboard/anfragen' },
    { icon: PlusIcon, label: 'Neue Anfrage', href: '/multi-step-form-02' },
    { icon: ClipboardListIcon, label: 'Berichte', items: [
      { label: 'Offene Tickets', href: '#' },
      { label: 'Abgeschlossen', href: '#' },
      { label: 'In Bearbeitung', href: '#' }
    ]}
  ]

  if (loading) {
    return (
      <div className='flex min-h-dvh items-center justify-center'>
        <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className='flex min-h-dvh items-center justify-center flex-col gap-4'>
        <p className='text-muted-foreground'>Ticket nicht gefunden</p>
        <Button onClick={() => router.push('/dashboard/anfragen')}>
          <ArrowLeftIcon className='size-4 mr-2' />
          Zurück zur Übersicht
        </Button>
      </div>
    )
  }

  const currentStatusConfig = statusConfig[ticket.status] || statusConfig.open
  const CurrentStatusIcon = currentStatusConfig.icon
  const currentStatusIndex = statusOrder.indexOf(ticket.status)

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
                <Separator orientation='vertical' className='hidden !h-4 sm:block md:max-lg:hidden' />
                <SearchDialog trigger={<><Button variant='ghost' className='hidden !bg-transparent px-1 py-0 font-normal sm:block md:max-lg:hidden'><div className='text-muted-foreground hidden items-center gap-1.5 text-sm sm:flex md:max-lg:hidden'><SearchIcon /><span>Suchen...</span></div></Button><Button variant='ghost' size='icon' className='sm:hidden md:max-lg:inline-flex'><SearchIcon /><span className='sr-only'>Suchen</span></Button></>} />
              </div>
              <div className='flex items-center gap-1.5'>
                <LanguageDropdown trigger={<Button variant='ghost' size='icon'><LanguagesIcon /></Button>} />
                <NotificationDropdown trigger={<Button variant='ghost' size='icon' className='relative'><BellIcon /></Button>} />
                <ClerkProfileDropdown />
              </div>
            </div>
          </header>
          <main className='size-full flex-1 px-4 py-6 sm:px-6'>
            {/* Header */}
            <div className='mb-6 flex items-center gap-4'>
              <Button variant='ghost' size='icon' onClick={() => router.push('/dashboard/anfragen')}>
                <ArrowLeftIcon className='size-5' />
              </Button>
              <div>
                <div className='flex items-center gap-3'>
                  <h1 className='text-2xl font-bold font-mono'>{ticket.ticketNumber}</h1>
                  <Badge variant={currentStatusConfig.variant}>
                    <CurrentStatusIcon className='size-3 mr-1' />
                    {currentStatusConfig.label}
                  </Badge>
                </div>
                <p className='text-muted-foreground'>
                  Erstellt am {new Date(ticket.createdAt).toLocaleDateString('de-DE', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className='grid gap-6 lg:grid-cols-3'>
              {/* Linke Spalte: Details */}
              <div className='lg:col-span-2 space-y-6'>
                {/* Problem */}
                <Card>
                  <CardHeader>
                    <CardTitle>Problem</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                      <div>
                        <p className='text-sm text-muted-foreground'>Kategorie</p>
                        <p className='font-medium'>{categoryLabels[ticket.category] || ticket.category}</p>
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground'>Neustart durchgeführt</p>
                        <p className='font-medium'>{ticket.hasRestarted ? 'Ja' : 'Nein'}</p>
                      </div>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Problem-Details</p>
                      <p className='font-medium'>{ticket.problemDetail}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Account & Gerät */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account & Gerätedaten</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                      <div>
                        <p className='text-sm text-muted-foreground'>Accountnummer</p>
                        <p className='font-medium font-mono'>{ticket.accountNumber}</p>
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground'>Displaynummer</p>
                        <p className='font-medium font-mono'>{ticket.displayNumber}</p>
                      </div>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Standort / Rücksendeadresse</p>
                      <p className='font-medium whitespace-pre-line'>{ticket.displayLocation}</p>
                    </div>
                    {ticket.alternateReturnAddress && (
                      <div>
                        <p className='text-sm text-muted-foreground'>Abweichende Rücksendeadresse</p>
                        <p className='font-medium whitespace-pre-line'>{ticket.alternateReturnAddress}</p>
                      </div>
                    )}
                    {ticket.additionalDeviceAffected && (
                      <Badge variant='outline' className='text-amber-600 border-amber-600'>
                        Weiteres Gerät betroffen
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                {/* Kontakt */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ansprechpartner</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                      <div>
                        <p className='text-sm text-muted-foreground'>Name</p>
                        <p className='font-medium'>{salutationLabels[ticket.salutation]} {ticket.contactPerson}</p>
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground'>E-Mail</p>
                        <p className='font-medium'>{ticket.email}</p>
                      </div>
                    </div>
                    {ticket.differentShippingAddress && ticket.shippingAddress && (
                      <div>
                        <p className='text-sm text-muted-foreground'>Abweichende Versandadresse</p>
                        <p className='font-medium whitespace-pre-line'>{ticket.shippingAddress}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Versand */}
                <Card>
                  <CardHeader>
                    <CardTitle>Versandoption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='font-medium'>{shippingLabels[ticket.shippingOption] || ticket.shippingOption}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Rechte Spalte: Status & Timeline */}
              <div className='space-y-6'>
                {/* Status ändern */}
                <Card>
                  <CardHeader>
                    <CardTitle>Status ändern</CardTitle>
                    <CardDescription>Aktualisieren Sie den Bearbeitungsstatus</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <Label>Neuer Status</Label>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([key, config]) => {
                            const Icon = config.icon
                            return (
                              <SelectItem key={key} value={key}>
                                <div className='flex items-center gap-2'>
                                  <Icon className='size-4' />
                                  {config.label}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label>Kommentar (optional)</Label>
                      <Textarea
                        placeholder='Fügen Sie einen Kommentar hinzu...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleStatusChange}
                      disabled={saving || newStatus === ticket.status}
                      className='w-full'
                    >
                      {saving ? (
                        <><Loader2Icon className='size-4 mr-2 animate-spin' />Speichern...</>
                      ) : (
                        <><SaveIcon className='size-4 mr-2' />Status speichern</>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Status-Timeline (Apple-Style) */}
                <Card>
                  <CardHeader>
                    <CardTitle>Status-Verlauf</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Progress Steps */}
                    <div className='space-y-0'>
                      {statusOrder.map((status, index) => {
                        const config = statusConfig[status]
                        const Icon = config.icon
                        const isCompleted = index < currentStatusIndex
                        const isCurrent = index === currentStatusIndex
                        const isPending = index > currentStatusIndex

                        return (
                          <div key={status} className='flex gap-3'>
                            {/* Vertical line and dot */}
                            <div className='flex flex-col items-center'>
                              <div className={`
                                size-8 rounded-full flex items-center justify-center border-2 shrink-0
                                ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                                ${isCurrent ? `${config.color} border-current text-white` : ''}
                                ${isPending ? 'bg-muted border-muted-foreground/30' : ''}
                              `}>
                                {isCompleted ? (
                                  <CheckCircleIcon className='size-4' />
                                ) : (
                                  <Icon className={`size-4 ${isPending ? 'text-muted-foreground/50' : ''}`} />
                                )}
                              </div>
                              {index < statusOrder.length - 1 && (
                                <div className={`w-0.5 h-8 ${isCompleted ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                              )}
                            </div>
                            {/* Label */}
                            <div className='pt-1 pb-8'>
                              <p className={`font-medium ${isPending ? 'text-muted-foreground/50' : ''}`}>
                                {config.label}
                              </p>
                              {isCurrent && (
                                <p className='text-xs text-muted-foreground'>Aktueller Status</p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* History Details */}
                    {ticket.statusHistory.length > 0 && (
                      <>
                        <Separator className='my-4' />
                        <div className='space-y-3'>
                          <p className='text-sm font-medium text-muted-foreground'>Änderungsprotokoll</p>
                          {ticket.statusHistory.map((history) => {
                            const toConfig = statusConfig[history.toStatus]
                            return (
                              <div key={history.id} className='text-sm border-l-2 border-muted pl-3'>
                                <div className='flex items-center gap-2'>
                                  <Badge variant='outline' className='text-xs'>
                                    {toConfig?.label || history.toStatus}
                                  </Badge>
                                  <span className='text-muted-foreground'>
                                    {new Date(history.createdAt).toLocaleDateString('de-DE', {
                                      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                                {history.comment && (
                                  <p className='text-muted-foreground mt-1'>{history.comment}</p>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
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

export default function TicketDetailPage() {
  return <TicketDetailContent />
}
