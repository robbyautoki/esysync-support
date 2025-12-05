'use client'

import { useEffect, useState, useRef, type ComponentType, type CSSProperties } from 'react'
import { useRouter } from 'next/navigation'

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
  BookOpenIcon,
  FolderIcon,
  ArrowLeftIcon,
  ImageIcon,
  SaveIcon,
  SendIcon,
  XIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { RichTextEditor } from '@/components/editor/RichTextEditor'

interface GuideCategory {
  id: string
  name: string
  slug: string
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

const supportItems: MenuItem[] = [
  { icon: InboxIcon, label: 'Support-Anfragen', href: '/dashboard/anfragen' },
  { icon: PlusIcon, label: 'Neue Anfrage', href: '/multi-step-form-02' },
  {
    icon: ClipboardListIcon,
    label: 'Berichte',
    items: [
      { label: 'Offene Tickets', href: '#' },
      { label: 'Abgeschlossen', href: '#' },
      { label: 'In Bearbeitung', href: '#' }
    ]
  }
]

const anleitungenItems: MenuItem[] = [
  { icon: BookOpenIcon, label: 'Alle Anleitungen', href: '/dashboard/anleitungen' },
  { icon: PlusIcon, label: 'Neue Anleitung', href: '/dashboard/anleitungen/neu' },
  { icon: FolderIcon, label: 'Kategorien', href: '/dashboard/anleitungen/kategorien' }
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

// Slug generieren
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const NeueAnleitungContent = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [categories, setCategories] = useState<GuideCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    coverImage: '',
  })

  useEffect(() => {
    fetch('/api/guides/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.categories)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingCover(true)
    try {
      const uploadData = new FormData()
      uploadData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      })

      const data = await res.json()
      if (data.success) {
        setFormData(prev => ({ ...prev, coverImage: data.url }))
      } else {
        alert(data.error || 'Bild-Upload fehlgeschlagen')
      }
    } catch {
      alert('Netzwerkfehler beim Upload')
    } finally {
      setUploadingCover(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSave = async (publish: boolean) => {
    if (!formData.title.trim() || !formData.categoryId || !formData.excerpt.trim()) {
      alert('Bitte füllen Sie Titel, Kategorie und Kurzbeschreibung aus.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          published: publish,
        }),
      })

      const data = await res.json()
      if (data.success) {
        router.push('/dashboard/anleitungen')
      } else {
        alert(data.error || 'Fehler beim Speichern')
      }
    } catch {
      alert('Netzwerkfehler')
    } finally {
      setSaving(false)
    }
  }

  const isValid = formData.title.trim() && formData.categoryId && formData.excerpt.trim()

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
                    </Button>
                  }
                />
                <ClerkProfileDropdown />
              </div>
            </div>
          </header>
          <main className='size-full flex-1 px-4 py-6 sm:px-6'>
            {/* Header */}
            <div className='flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-4'>
                <Button variant='ghost' size='icon' asChild>
                  <a href='/dashboard/anleitungen'>
                    <ArrowLeftIcon className='size-5' />
                  </a>
                </Button>
                <div>
                  <h1 className='text-2xl font-bold'>Neue Anleitung</h1>
                  <p className='text-muted-foreground'>Erstellen Sie eine neue Anleitung</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline' onClick={() => handleSave(false)} disabled={saving || !isValid}>
                  {saving ? (
                    <Loader2Icon className='size-4 mr-2 animate-spin' />
                  ) : (
                    <SaveIcon className='size-4 mr-2' />
                  )}
                  Als Entwurf speichern
                </Button>
                <Button onClick={() => handleSave(true)} disabled={saving || !isValid}>
                  {saving ? (
                    <Loader2Icon className='size-4 mr-2 animate-spin' />
                  ) : (
                    <SendIcon className='size-4 mr-2' />
                  )}
                  Veröffentlichen
                </Button>
              </div>
            </div>

            {loading ? (
              <div className='flex items-center justify-center py-12'>
                <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
              </div>
            ) : (
              <div className='grid gap-6 lg:grid-cols-3'>
                {/* Hauptinhalt */}
                <div className='lg:col-span-2 space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Inhalt</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='grid gap-2'>
                        <Label htmlFor='title'>Titel *</Label>
                        <Input
                          id='title'
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder='z.B. Display einrichten'
                        />
                      </div>
                      <div className='grid gap-2'>
                        <Label htmlFor='slug'>URL-Slug</Label>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-muted-foreground'>/anleitungen/</span>
                          <Input
                            id='slug'
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            placeholder='display-einrichten'
                            className='font-mono'
                          />
                        </div>
                      </div>
                      <div className='grid gap-2'>
                        <Label htmlFor='excerpt'>Kurzbeschreibung *</Label>
                        <Textarea
                          id='excerpt'
                          value={formData.excerpt}
                          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                          placeholder='Eine kurze Beschreibung der Anleitung für die Übersicht...'
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Anleitung</CardTitle>
                      <CardDescription>
                        Schreiben Sie hier den Inhalt Ihrer Anleitung
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RichTextEditor
                        content={formData.content}
                        onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                        placeholder='Beginnen Sie hier mit dem Schreiben...'
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Kategorie *</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Kategorie auswählen...' />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {categories.length === 0 && (
                        <p className='text-sm text-muted-foreground mt-2'>
                          Noch keine Kategorien vorhanden.{' '}
                          <a href='/dashboard/anleitungen/kategorien' className='text-primary hover:underline'>
                            Kategorie erstellen
                          </a>
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Titelbild</CardTitle>
                      <CardDescription>
                        Wird in der Übersicht angezeigt
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {formData.coverImage ? (
                        <div className='relative'>
                          <img
                            src={formData.coverImage}
                            alt='Titelbild'
                            className='w-full aspect-video object-cover rounded-lg'
                          />
                          <Button
                            variant='destructive'
                            size='icon'
                            className='absolute top-2 right-2'
                            onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                          >
                            <XIcon className='size-4' />
                          </Button>
                        </div>
                      ) : (
                        <div
                          className='border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {uploadingCover ? (
                            <Loader2Icon className='mx-auto size-8 animate-spin text-muted-foreground' />
                          ) : (
                            <>
                              <ImageIcon className='mx-auto size-8 text-muted-foreground mb-2' />
                              <p className='text-sm text-muted-foreground'>
                                Klicken Sie hier, um ein Bild hochzuladen
                              </p>
                            </>
                          )}
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        onChange={handleCoverUpload}
                        className='hidden'
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
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

export default function NeueAnleitungPage() {
  return <NeueAnleitungContent />
}
