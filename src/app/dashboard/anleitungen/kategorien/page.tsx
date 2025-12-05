'use client'

import { useEffect, useState, type ComponentType, type CSSProperties } from 'react'

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
  GripVerticalIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

interface GuideCategory {
  id: string
  name: string
  slug: string
  description: string | null
  order: number
  _count: {
    guides: number
  }
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

const KategorienContent = () => {
  const [categories, setCategories] = useState<GuideCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<GuideCategory | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [saving, setSaving] = useState(false)

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/guides/categories')
      const data = await res.json()
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Fehler beim Laden der Kategorien:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = async () => {
    if (!formData.name.trim()) return

    setSaving(true)
    try {
      const url = editingCategory
        ? `/api/guides/categories/${editingCategory.id}`
        : '/api/guides/categories'

      const res = await fetch(url, {
        method: editingCategory ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        setDialogOpen(false)
        setEditingCategory(null)
        setFormData({ name: '', description: '' })
        fetchCategories()
      } else {
        alert(data.error || 'Fehler beim Speichern')
      }
    } catch {
      alert('Netzwerkfehler')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/guides/categories/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.success) {
        fetchCategories()
      } else {
        alert(data.error || 'Fehler beim Löschen')
      }
    } catch {
      alert('Netzwerkfehler')
    }
  }

  const openEditDialog = (category: GuideCategory) => {
    setEditingCategory(category)
    setFormData({ name: category.name, description: category.description || '' })
    setDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingCategory(null)
    setFormData({ name: '', description: '' })
    setDialogOpen(true)
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
                <h1 className='text-2xl font-bold'>Kategorien</h1>
                <p className='text-muted-foreground'>Verwalten Sie die Kategorien für Ihre Anleitungen</p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openNewDialog}>
                    <PlusIcon className='size-4 mr-2' />
                    Neue Kategorie
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'}</DialogTitle>
                    <DialogDescription>
                      {editingCategory
                        ? 'Bearbeiten Sie die Details dieser Kategorie.'
                        : 'Erstellen Sie eine neue Kategorie für Ihre Anleitungen.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Name</Label>
                      <Input
                        id='name'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder='z.B. Hardware-Anleitungen'
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='description'>Beschreibung (optional)</Label>
                      <Textarea
                        id='description'
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder='Eine kurze Beschreibung der Kategorie...'
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant='outline' onClick={() => setDialogOpen(false)}>
                      Abbrechen
                    </Button>
                    <Button onClick={handleSubmit} disabled={saving || !formData.name.trim()}>
                      {saving ? (
                        <>
                          <Loader2Icon className='size-4 mr-2 animate-spin' />
                          Speichern...
                        </>
                      ) : (
                        'Speichern'
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Kategorien-Liste */}
            <Card>
              <CardHeader>
                <CardTitle>{categories.length} {categories.length === 1 ? 'Kategorie' : 'Kategorien'}</CardTitle>
                <CardDescription>
                  Ordnen Sie die Kategorien per Drag-and-Drop an
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className='flex items-center justify-center py-12'>
                    <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
                  </div>
                ) : categories.length === 0 ? (
                  <div className='text-muted-foreground text-center py-12'>
                    <FolderIcon className='mx-auto size-12 mb-4 opacity-50' />
                    <p>Noch keine Kategorien vorhanden.</p>
                    <p className='text-sm mt-2'>Erstellen Sie Ihre erste Kategorie, um Anleitungen zu organisieren.</p>
                  </div>
                ) : (
                  <div className='space-y-2'>
                    {categories.map(category => (
                      <div
                        key={category.id}
                        className='flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors'
                      >
                        <div className='flex items-center gap-4'>
                          <GripVerticalIcon className='size-5 text-muted-foreground cursor-grab' />
                          <div>
                            <div className='flex items-center gap-2'>
                              <span className='font-medium'>{category.name}</span>
                              <Badge variant='secondary' className='text-xs'>
                                {category._count.guides} {category._count.guides === 1 ? 'Anleitung' : 'Anleitungen'}
                              </Badge>
                            </div>
                            {category.description && (
                              <p className='text-sm text-muted-foreground mt-1'>{category.description}</p>
                            )}
                            <p className='text-xs text-muted-foreground mt-1 font-mono'>/{category.slug}</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => openEditDialog(category)}
                          >
                            <PencilIcon className='size-4' />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                className='text-destructive hover:text-destructive'
                                disabled={category._count.guides > 0}
                              >
                                <Trash2Icon className='size-4' />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Kategorie löschen?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Möchten Sie die Kategorie &quot;{category.name}&quot; wirklich löschen?
                                  Diese Aktion kann nicht rückgängig gemacht werden.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(category.id)}
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

export default function KategorienPage() {
  return <KategorienContent />
}
