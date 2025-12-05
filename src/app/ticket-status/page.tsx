'use client'

import { useState } from 'react'

import {
  SearchIcon,
  Loader2Icon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  InfoIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import Header from '@/components/shadcn-studio/blocks/hero-section-12/header'
import Footer from '@/components/shadcn-studio/blocks/footer-component-02/footer-component-02'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'

// Navigation-Daten (gleich wie Startseite)
const navigationData: NavigationSection[] = [
  { title: 'Startseite', href: '/' },
  { title: 'Ticket-Status', href: '/ticket-status' },
  {
    title: 'Support',
    items: [
      { title: 'Anleitungen', href: '/anleitungen' },
      { title: 'FAQ', href: '/faq' },
      { title: 'Fernwartung', href: '/fernwartung' },
    ],
  },
  { title: 'Kontakt', href: '#kontakt' },
]

interface StatusHistoryItem {
  toStatus: string
  comment: string | null
  createdAt: string
}

interface TrackedTicket {
  ticketNumber: string
  category: string
  problemDetail: string
  status: string
  displayNumber: string
  shippingOption: string
  createdAt: string
  updatedAt: string
  statusHistory: StatusHistoryItem[]
}

// Status-Konfiguration
const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof ClockIcon; color: string; description: string }> = {
  open: { label: 'Offen', variant: 'destructive', icon: AlertCircleIcon, color: 'bg-red-500', description: 'Ihre Anfrage wurde erfasst und wartet auf Bearbeitung.' },
  in_progress: { label: 'In Bearbeitung', variant: 'default', icon: ClockIcon, color: 'bg-blue-500', description: 'Unser Support-Team bearbeitet Ihre Anfrage.' },
  waiting_for_device: { label: 'Warten auf Gerät', variant: 'outline', icon: PackageIcon, color: 'bg-yellow-500', description: 'Wir warten auf den Eingang Ihres Displays.' },
  repair_in_progress: { label: 'Reparatur läuft', variant: 'default', icon: WrenchIcon, color: 'bg-purple-500', description: 'Ihr Display wird repariert.' },
  shipping_back: { label: 'Rückversand', variant: 'secondary', icon: TruckIcon, color: 'bg-orange-500', description: 'Ihr Display ist auf dem Weg zurück zu Ihnen.' },
  completed: { label: 'Abgeschlossen', variant: 'secondary', icon: CheckCircleIcon, color: 'bg-green-500', description: 'Die Reparatur wurde erfolgreich abgeschlossen.' }
}

// Status-Reihenfolge
const statusOrder = ['open', 'in_progress', 'waiting_for_device', 'repair_in_progress', 'shipping_back', 'completed']

// Kategorie-Labels
const categoryLabels: Record<string, string> = { hardware: 'Hardware', software: 'Software', network: 'Netzwerk' }

// Versand-Labels
const shippingLabels: Record<string, string> = {
  'own-packaging': 'Eigene Verpackung',
  'avantor-box': 'AVANTOR-Box',
  'technician': 'Techniker-Abholung',
  'complete-swap': 'Kompletttausch'
}

export default function TicketStatusPage() {
  const [ticketNumber, setTicketNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ticket, setTicket] = useState<TrackedTicket | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketNumber.trim()) return

    setLoading(true)
    setError(null)
    setTicket(null)
    setSearched(true)

    try {
      const response = await fetch('/api/tickets/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketNumber: ticketNumber.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setTicket(data.ticket)
      } else {
        setError(data.error || 'Ticket nicht gefunden')
      }
    } catch {
      setError('Netzwerkfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const currentStatusIndex = ticket ? statusOrder.indexOf(ticket.status) : -1
  const currentStatusConfig = ticket ? (statusConfig[ticket.status] || statusConfig.open) : null

  return (
    <main className='min-h-dvh flex flex-col'>
      <Header navigationData={navigationData} />

      <div className='flex-1 bg-muted/30'>
        <div className='mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold sm:text-4xl'>Ticket-Status abfragen</h1>
            <p className='text-muted-foreground mt-3 text-lg'>
              Geben Sie Ihre Ticket-Nummer ein, um den aktuellen Status Ihrer Support-Anfrage zu sehen.
            </p>
          </div>

          {/* Suchformular */}
          <Card className='mb-8'>
            <CardContent className='pt-6'>
              <form onSubmit={handleSearch} className='flex gap-4'>
                <div className='relative flex-1'>
                  <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground' />
                  <Input
                    type='text'
                    placeholder='z.B. SUP-20251205-1234'
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
                    className='pl-10 text-lg h-12 font-mono'
                    disabled={loading}
                  />
                </div>
                <Button type='submit' size='lg' disabled={loading || !ticketNumber.trim()}>
                  {loading ? (
                    <><Loader2Icon className='size-5 mr-2 animate-spin' />Suche...</>
                  ) : (
                    <>Status prüfen</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Fehler */}
          {error && (
            <Card className='mb-8 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30'>
              <CardContent className='pt-6'>
                <div className='flex items-center gap-3 text-red-600 dark:text-red-400'>
                  <AlertCircleIcon className='size-5 shrink-0' />
                  <p>{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ticket gefunden */}
          {ticket && currentStatusConfig && (
            <div className='space-y-6'>
              {/* Ticket-Info */}
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between flex-wrap gap-4'>
                    <div>
                      <CardTitle className='font-mono text-2xl'>{ticket.ticketNumber}</CardTitle>
                      <CardDescription>
                        Erstellt am {new Date(ticket.createdAt).toLocaleDateString('de-DE', {
                          day: '2-digit', month: '2-digit', year: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                    <Badge variant={currentStatusConfig.variant} className='text-sm px-3 py-1'>
                      <currentStatusConfig.icon className='size-4 mr-2' />
                      {currentStatusConfig.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='rounded-lg bg-muted/50 p-4 mb-6'>
                    <div className='flex items-start gap-3'>
                      <InfoIcon className='size-5 text-primary mt-0.5 shrink-0' />
                      <p className='text-sm'>{currentStatusConfig.description}</p>
                    </div>
                  </div>

                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div>
                      <p className='text-sm text-muted-foreground'>Kategorie</p>
                      <p className='font-medium'>{categoryLabels[ticket.category] || ticket.category}</p>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Display-Nummer</p>
                      <p className='font-medium font-mono'>{ticket.displayNumber}</p>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Versandoption</p>
                      <p className='font-medium'>{shippingLabels[ticket.shippingOption] || ticket.shippingOption}</p>
                    </div>
                    <div>
                      <p className='text-sm text-muted-foreground'>Letzte Aktualisierung</p>
                      <p className='font-medium'>
                        {new Date(ticket.updatedAt).toLocaleDateString('de-DE', {
                          day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status-Timeline (Apple-Style) */}
              <Card>
                <CardHeader>
                  <CardTitle>Bearbeitungsfortschritt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-0'>
                    {statusOrder.map((status, index) => {
                      const config = statusConfig[status]
                      const Icon = config.icon
                      const isCompleted = index < currentStatusIndex
                      const isCurrent = index === currentStatusIndex
                      const isPending = index > currentStatusIndex

                      return (
                        <div key={status} className='flex gap-4'>
                          {/* Vertical line and dot */}
                          <div className='flex flex-col items-center'>
                            <div className={`
                              size-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-all
                              ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                              ${isCurrent ? `${config.color} border-current text-white scale-110` : ''}
                              ${isPending ? 'bg-muted border-muted-foreground/20' : ''}
                            `}>
                              {isCompleted ? (
                                <CheckCircleIcon className='size-5' />
                              ) : (
                                <Icon className={`size-5 ${isPending ? 'text-muted-foreground/40' : ''}`} />
                              )}
                            </div>
                            {index < statusOrder.length - 1 && (
                              <div className={`w-0.5 h-10 transition-colors ${isCompleted ? 'bg-green-500' : 'bg-muted-foreground/20'}`} />
                            )}
                          </div>
                          {/* Label and description */}
                          <div className='pt-2 pb-10'>
                            <p className={`font-semibold ${isPending ? 'text-muted-foreground/50' : ''} ${isCurrent ? 'text-lg' : ''}`}>
                              {config.label}
                            </p>
                            {isCurrent && (
                              <p className='text-sm text-muted-foreground mt-1'>{config.description}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Status-Verlauf */}
              {ticket.statusHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Verlauf</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {ticket.statusHistory.map((history, index) => {
                        const config = statusConfig[history.toStatus]
                        return (
                          <div key={index} className='flex gap-4 items-start'>
                            <div className='text-sm text-muted-foreground whitespace-nowrap pt-0.5'>
                              {new Date(history.createdAt).toLocaleDateString('de-DE', {
                                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                              })}
                            </div>
                            <div>
                              <Badge variant='outline' className='mb-1'>
                                {config?.label || history.toStatus}
                              </Badge>
                              {history.comment && (
                                <p className='text-sm text-muted-foreground'>{history.comment}</p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Keine Suche durchgeführt */}
          {!searched && !ticket && (
            <Card className='border-dashed'>
              <CardContent className='py-12'>
                <div className='text-center text-muted-foreground'>
                  <SearchIcon className='mx-auto size-12 mb-4 opacity-50' />
                  <p className='text-lg'>Geben Sie Ihre Ticket-Nummer ein</p>
                  <p className='text-sm mt-2'>
                    Die Ticket-Nummer finden Sie in der Bestätigungs-E-Mail, die Sie nach dem Absenden Ihrer Anfrage erhalten haben.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gesucht aber nicht gefunden */}
          {searched && !ticket && !error && !loading && (
            <Card className='border-dashed'>
              <CardContent className='py-12'>
                <div className='text-center text-muted-foreground'>
                  <AlertCircleIcon className='mx-auto size-12 mb-4 opacity-50' />
                  <p className='text-lg'>Kein Ticket gefunden</p>
                  <p className='text-sm mt-2'>
                    Bitte überprüfen Sie die eingegebene Ticket-Nummer.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hilfe-Box */}
          <Separator className='my-8' />

          <div className='text-center'>
            <p className='text-muted-foreground mb-4'>
              Haben Sie Fragen zu Ihrem Ticket oder benötigen Sie weitere Hilfe?
            </p>
            <div className='flex justify-center gap-4 flex-wrap'>
              <Button variant='outline' asChild>
                <a href='/#kontakt'>Kontakt aufnehmen</a>
              </Button>
              <Button asChild>
                <a href='/multi-step-form-02'>Neue Anfrage erstellen</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
