'use client'

import { useEffect, useState, type ComponentType } from 'react'

import {
  BellIcon,
  ChartColumnBigIcon,
  ChevronRightIcon,
  ClipboardListIcon,
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
  SaveIcon,
  RotateCcwIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ClerkProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile-clerk'

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

const DEFAULT_SYSTEM_PROMPT = `Du bist der freundliche Support-Assistent von esysync/AVANTO. Du hilfst Kunden bei Fragen zu ihren Digital Signage Displays.

Wichtige Informationen über esysync/AVANTO:
- esysync bietet digitale Displays für Immobilienmakler und Unternehmen
- AVANTO ist die Marke für die Display-Hardware
- Kunden können Support-Tickets über das Portal erstellen
- Bei Hardware-Problemen können Displays eingeschickt werden

Versandoptionen für Reparaturen:
- Eigene Verpackung: 18€
- AVANTOR-Box mit Rückschein: 99€
- Techniker-Abholung: Auf Anfrage
- Kompletttausch: 229€

Häufige Probleme und Lösungen:
- Display bleibt schwarz: Stromversorgung prüfen, Neustart durchführen
- Display zeigt "No Content": Internetverbindung prüfen, im Portal Inhalt zuweisen
- Display im Bootloop: Support-Ticket erstellen für Reparatur
- Rotes Ausrufezeichen: Display hat keine Verbindung zum Server

WICHTIG - Ticket-Status Abfrage:
- Frage den Kunden IMMER zu Beginn: "Haben Sie bereits eine Ticketnummer? Dann kann ich den aktuellen Status für Sie prüfen."
- Ticketnummern haben das Format SUP-YYYYMMDD-XXXX (z.B. SUP-20251205-1234)
- Wenn der Kunde eine Ticketnummer nennt, wird der Status automatisch abgefragt und du erhältst die Info als [TICKET-STATUS: ...]
- Gib dem Kunden dann den Status freundlich wieder

WISSENSDATENBANK:
- Dir werden möglicherweise relevante Informationen aus der Wissensdatenbank als [WISSENSDATENBANK-KONTEXT] übergeben
- Nutze diese Informationen, um präzise und hilfreiche Antworten zu geben
- Verweise bei Bedarf auf die Quelle (Dateiname)

Verhalte dich freundlich und hilfsbereit. Wenn du eine Frage nicht beantworten kannst oder der Kunde mit einem Mitarbeiter sprechen möchte, weise ihn darauf hin, dass er auf "Mit Mitarbeiter sprechen" klicken kann.

Antworte immer auf Deutsch und halte deine Antworten kurz und präzise.`

export default function EinstellungenPage() {
  const [systemPrompt, setSystemPrompt] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [savedPrompt, setSavedPrompt] = useState('')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data.success && data.settings) {
        const prompt = data.settings.systemPrompt || DEFAULT_SYSTEM_PROMPT
        setSystemPrompt(prompt)
        setSavedPrompt(prompt)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      setSystemPrompt(DEFAULT_SYSTEM_PROMPT)
      setSavedPrompt(DEFAULT_SYSTEM_PROMPT)
    } finally {
      setLoading(false)
    }
  }

  const handlePromptChange = (value: string) => {
    setSystemPrompt(value)
    setHasChanges(value !== savedPrompt)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'systemPrompt', value: systemPrompt }),
      })
      const data = await res.json()
      if (data.success) {
        setSavedPrompt(systemPrompt)
        setHasChanges(false)
        alert('Einstellungen gespeichert!')
      } else {
        alert('Fehler beim Speichern: ' + data.error)
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT)
    setHasChanges(DEFAULT_SYSTEM_PROMPT !== savedPrompt)
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/" className="flex items-center gap-2">
                  <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <LogoSvg />
                  </div>
                  <span className="truncate font-semibold">esysync Support</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Übersicht</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {supportItems.map((item) =>
                  item.items ? (
                    <Collapsible key={item.label} defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon />
                            <span>{item.label}</span>
                            <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.label}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.href}>{subItem.label}</a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Anleitungen</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {guidesItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={item.href === '/dashboard/einstellungen'}>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <ClerkProfileDropdown />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex h-16 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Einstellungen</h1>
          </div>
          <div className="flex items-center gap-2">
            <SearchDialog trigger={
              <Button variant="ghost" size="icon">
                <SearchIcon className="h-4 w-4" />
              </Button>
            } />
            <NotificationDropdown trigger={
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-4 w-4" />
              </Button>
            } />
            <ClerkProfileDropdown />
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-4xl">
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    KI System-Prompt
                  </CardTitle>
                  <CardDescription>
                    Dieser Prompt wird der KI bei jeder Chat-Anfrage übergeben und bestimmt ihr Verhalten.
                    Änderungen werden sofort wirksam.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt">System-Prompt</Label>
                    <Textarea
                      id="systemPrompt"
                      value={systemPrompt}
                      onChange={(e) => handlePromptChange(e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                      placeholder="System-Prompt eingeben..."
                    />
                    <p className="text-xs text-muted-foreground">
                      {systemPrompt.length} Zeichen
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-4">
                    <Button 
                      onClick={handleSave} 
                      disabled={saving || !hasChanges}
                    >
                      {saving ? (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <SaveIcon className="mr-2 h-4 w-4" />
                      )}
                      Speichern
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                    >
                      <RotateCcwIcon className="mr-2 h-4 w-4" />
                      Standard wiederherstellen
                    </Button>
                    {hasChanges && (
                      <span className="text-sm text-amber-600">
                        Ungespeicherte Änderungen
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
