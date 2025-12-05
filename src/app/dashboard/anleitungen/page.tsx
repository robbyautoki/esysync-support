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
  BellIcon,
  BookOpenIcon,
  FolderIcon,
  PencilIcon,
  Trash2Icon,
  EyeIcon,
  EyeOffIcon,
  FilterIcon,
  ImageIcon
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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

interface Guide {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  published: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  category: {
    id: string
    name: string
    slug: string
  }
}

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

const AnleitungenContent = () => {
  const [guides, setGuides] = useState<Guide[]>([])
  const [categories, setCategories] = useState<GuideCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [publishedFilter, setPublishedFilter] = useState<string>('all')

  const fetchData = async () => {
    try {
      const [guidesRes, categoriesRes] = await Promise.all([
        fetch('/api/guides'),
        fetch('/api/guides/categories')
      ])

      const guidesData = await guidesRes.json()
      const categoriesData = await categoriesRes.json()

      if (guidesData.success) {
        setGuides(guidesData.guides)
      }
      if (categoriesData.success) {
        setCategories(categoriesData.categories)
      }
    } catch (error) {
      console.error('Fehler beim Laden:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/guides/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        fetchData()
      } else {
        alert(data.error || 'Fehler beim Löschen')
      }
    } catch {
      alert('Netzwerkfehler')
    }
  }

  const togglePublished = async (guide: Guide) => {
    try {
      const res = await fetch(`/api/guides/${guide.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !guide.published }),
      })
      const data = await res.json()
      if (data.success) {
        fetchData()
      } else {
        alert(data.error || 'Fehler beim Aktualisieren')
      }
    } catch {
      alert('Netzwerkfehler')
    }
  }

  // Gefilterte Guides
  const filteredGuides = guides.filter(guide => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || guide.category.id === categoryFilter
    const matchesPublished =
      publishedFilter === 'all' ||
      (publishedFilter === 'published' && guide.published) ||
      (publishedFilter === 'draft' && !guide.published)

    return matchesSearch && matchesCategory && matchesPublished
  })

  const stats = {
    total: guides.length,
    published: guides.filter(g => g.published).length,
    draft: guides.filter(g => !g.published).length,
  }

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
              <div>
                <h1 className='text-2xl font-bold'>Anleitungen</h1>
                <p className='text-muted-foreground'>
                  {stats.total} Anleitungen ({stats.published} veröffentlicht, {stats.draft} Entwürfe)
                </p>
              </div>
              <Button asChild>
                <Link href='/dashboard/anleitungen/neu'>
                  <PlusIcon className='size-4 mr-2' />
                  Neue Anleitung
                </Link>
              </Button>
            </div>

            {/* Filter */}
            <Card className='mb-6'>
              <CardContent className='pt-6'>
                <div className='flex flex-col gap-4 sm:flex-row'>
                  <div className='relative flex-1'>
                    <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                    <Input
                      placeholder='Titel oder Beschreibung suchen...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='pl-9'
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className='w-full sm:w-[180px]'>
                      <FolderIcon className='size-4 mr-2' />
                      <SelectValue placeholder='Kategorie' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Alle Kategorien</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={publishedFilter} onValueChange={setPublishedFilter}>
                    <SelectTrigger className='w-full sm:w-[160px]'>
                      <FilterIcon className='size-4 mr-2' />
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>Alle</SelectItem>
                      <SelectItem value='published'>Veröffentlicht</SelectItem>
                      <SelectItem value='draft'>Entwürfe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Anleitungen-Liste */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {filteredGuides.length} {filteredGuides.length === 1 ? 'Anleitung' : 'Anleitungen'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className='flex items-center justify-center py-12'>
                    <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
                  </div>
                ) : filteredGuides.length === 0 ? (
                  <div className='text-muted-foreground text-center py-12'>
                    <BookOpenIcon className='mx-auto size-12 mb-4 opacity-50' />
                    <p>Keine Anleitungen gefunden.</p>
                    {guides.length === 0 && (
                      <p className='text-sm mt-2'>Erstellen Sie Ihre erste Anleitung.</p>
                    )}
                  </div>
                ) : (
                  <div className='space-y-3'>
                    {filteredGuides.map(guide => (
                      <div
                        key={guide.id}
                        className='flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors'
                      >
                        {/* Cover Image */}
                        <div className='hidden sm:block size-16 rounded-lg bg-muted overflow-hidden shrink-0'>
                          {guide.coverImage ? (
                            <img
                              src={guide.coverImage}
                              alt={guide.title}
                              className='size-full object-cover'
                            />
                          ) : (
                            <div className='size-full flex items-center justify-center'>
                              <ImageIcon className='size-6 text-muted-foreground' />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 flex-wrap'>
                            <Link
                              href={`/dashboard/anleitungen/${guide.id}/bearbeiten`}
                              className='font-medium hover:underline truncate'
                            >
                              {guide.title}
                            </Link>
                            <Badge variant={guide.published ? 'default' : 'secondary'}>
                              {guide.published ? (
                                <><EyeIcon className='size-3 mr-1' />Veröffentlicht</>
                              ) : (
                                <><EyeOffIcon className='size-3 mr-1' />Entwurf</>
                              )}
                            </Badge>
                            <Badge variant='outline'>{guide.category.name}</Badge>
                          </div>
                          <p className='text-sm text-muted-foreground mt-1 line-clamp-1'>
                            {guide.excerpt}
                          </p>
                          <p className='text-xs text-muted-foreground mt-1'>
                            Erstellt: {new Date(guide.createdAt).toLocaleDateString('de-DE')}
                            {guide.publishedAt && ` • Veröffentlicht: ${new Date(guide.publishedAt).toLocaleDateString('de-DE')}`}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center gap-1'>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => togglePublished(guide)}
                            title={guide.published ? 'Zurück zu Entwurf' : 'Veröffentlichen'}
                          >
                            {guide.published ? (
                              <EyeOffIcon className='size-4' />
                            ) : (
                              <EyeIcon className='size-4' />
                            )}
                          </Button>
                          <Button variant='ghost' size='icon' asChild>
                            <Link href={`/dashboard/anleitungen/${guide.id}/bearbeiten`}>
                              <PencilIcon className='size-4' />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='text-destructive hover:text-destructive'
                              >
                                <Trash2Icon className='size-4' />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Anleitung löschen?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Möchten Sie die Anleitung &quot;{guide.title}&quot; wirklich löschen?
                                  Diese Aktion kann nicht rückgängig gemacht werden.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(guide.id)}
                                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                >
                                  Löschen
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
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

export default function AnleitungenPage() {
  return <AnleitungenContent />
}
