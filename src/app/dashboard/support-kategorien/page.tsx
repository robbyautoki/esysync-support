'use client'

import { useState, useEffect, type ComponentType, type CSSProperties } from 'react'
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
  Trash2Icon,
  MonitorIcon,
  CodeIcon,
  WifiIcon,
  ChevronDownIcon,
  AlertCircleIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
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

import LogoSvg from '@/assets/svg/logo'
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ClerkProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile-clerk'

interface SupportProblem {
  id: string
  key: string
  label: string
  description: string
  categoryId: string
  order: number
}

interface SupportCategory {
  id: string
  key: string
  label: string
  description: string
  icon: string
  order: number
  problems: SupportProblem[]
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

const iconOptions = [
  { value: 'monitor', label: 'Monitor', Icon: MonitorIcon },
  { value: 'code', label: 'Code', Icon: CodeIcon },
  { value: 'wifi', label: 'WiFi', Icon: WifiIcon },
]

const getIconComponent = (iconName: string) => {
  const option = iconOptions.find(o => o.value === iconName)
  return option?.Icon || MonitorIcon
}

export default function SupportKategorienPage() {
  const [categories, setCategories] = useState<SupportCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ key: '', label: '', description: '', icon: 'monitor' })

  const [problemDialogOpen, setProblemDialogOpen] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [newProblem, setNewProblem] = useState({ key: '', label: '', description: '' })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/support-categories')
      const data = await res.json()
      if (data.success) {
        setCategories(data.categories)
        setExpandedCategories(new Set(data.categories.map((c: SupportCategory) => c.id)))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.key || !newCategory.label || !newCategory.description) return
    try {
      const res = await fetch('/api/support-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      })
      const data = await res.json()
      if (data.success) {
        fetchCategories()
        setCategoryDialogOpen(false)
        setNewCategory({ key: '', label: '', description: '', icon: 'monitor' })
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/support-categories/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const handleAddProblem = async () => {
    if (!selectedCategoryId || !newProblem.key || !newProblem.label || !newProblem.description) return
    try {
      const res = await fetch('/api/support-problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProblem, categoryId: selectedCategoryId })
      })
      const data = await res.json()
      if (data.success) {
        fetchCategories()
        setProblemDialogOpen(false)
        setNewProblem({ key: '', label: '', description: '' })
        setSelectedCategoryId(null)
      }
    } catch (error) {
      console.error('Error adding problem:', error)
    }
  }

  const handleDeleteProblem = async (id: string) => {
    try {
      const res = await fetch(`/api/support-problems/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) fetchCategories()
    } catch (error) {
      console.error('Error deleting problem:', error)
    }
  }

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
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
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h1 className='text-2xl font-bold'>Support-Kategorien</h1>
                <p className='text-muted-foreground'>Verwalten Sie die Kategorien und Probleme für das Support-Formular</p>
              </div>
              <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button><PlusIcon className='size-4 mr-2' />Kategorie hinzufügen</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Neue Kategorie</DialogTitle></DialogHeader>
                  <div className='space-y-4 py-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='cat-key'>Schlüssel (key)</Label>
                      <Input id='cat-key' placeholder='z.B. hardware' value={newCategory.key} onChange={e => setNewCategory(prev => ({ ...prev, key: e.target.value.toLowerCase().replace(/\s/g, '-') }))} />
                      <p className='text-xs text-muted-foreground'>Eindeutiger Schlüssel (keine Leerzeichen)</p>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='cat-label'>Name</Label>
                      <Input id='cat-label' placeholder='z.B. Hardware-Probleme' value={newCategory.label} onChange={e => setNewCategory(prev => ({ ...prev, label: e.target.value }))} />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='cat-desc'>Beschreibung</Label>
                      <Textarea id='cat-desc' placeholder='Kurze Beschreibung' value={newCategory.description} onChange={e => setNewCategory(prev => ({ ...prev, description: e.target.value }))} />
                    </div>
                    <div className='space-y-2'>
                      <Label>Icon</Label>
                      <Select value={newCategory.icon} onValueChange={value => setNewCategory(prev => ({ ...prev, icon: value }))}>
                        <SelectTrigger><SelectValue placeholder='Icon auswählen' /></SelectTrigger>
                        <SelectContent>
                          {iconOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className='flex items-center gap-2'><option.Icon className='size-4' />{option.label}</div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild><Button variant='outline'>Abbrechen</Button></DialogClose>
                    <Button onClick={handleAddCategory}>Hinzufügen</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className='flex items-center justify-center h-96'>
                <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
              </div>
            ) : categories.length === 0 ? (
              <Card className='border-dashed'>
                <CardContent className='py-12'>
                  <div className='text-center text-muted-foreground'>
                    <AlertCircleIcon className='mx-auto size-12 mb-4 opacity-50' />
                    <p className='text-lg mb-2'>Keine Kategorien vorhanden</p>
                    <p className='text-sm'>Fügen Sie Ihre erste Support-Kategorie hinzu.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className='space-y-4'>
                {categories.map(category => {
                  const Icon = getIconComponent(category.icon)
                  const isExpanded = expandedCategories.has(category.id)
                  return (
                    <Card key={category.id}>
                      <Collapsible open={isExpanded} onOpenChange={() => toggleCategory(category.id)}>
                        <CardHeader className='pb-3'>
                          <div className='flex items-center justify-between'>
                            <CollapsibleTrigger className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
                              {isExpanded ? <ChevronDownIcon className='size-5 text-muted-foreground' /> : <ChevronRightIcon className='size-5 text-muted-foreground' />}
                              <div className='rounded-full bg-primary/10 p-2'><Icon className='size-5 text-primary' /></div>
                              <div className='text-left'>
                                <CardTitle className='text-lg'>{category.label}</CardTitle>
                                <p className='text-sm text-muted-foreground'>{category.description}</p>
                              </div>
                            </CollapsibleTrigger>
                            <div className='flex items-center gap-2'>
                              <span className='text-sm text-muted-foreground'>{category.problems.length} Probleme</span>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant='ghost' size='icon' className='text-destructive hover:text-destructive'><Trash2Icon className='size-4' /></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Kategorie löschen?</AlertDialogTitle>
                                    <AlertDialogDescription>Diese Aktion kann nicht rückgängig gemacht werden. Alle zugehörigen Probleme werden ebenfalls gelöscht.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteCategory(category.id)} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>Löschen</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent className='pt-0'>
                            <div className='border-t pt-4'>
                              <div className='flex items-center justify-between mb-4'>
                                <h4 className='font-medium'>Probleme</h4>
                                <Button size='sm' variant='outline' onClick={() => { setSelectedCategoryId(category.id); setProblemDialogOpen(true) }}>
                                  <PlusIcon className='size-3 mr-1' />Problem hinzufügen
                                </Button>
                              </div>
                              {category.problems.length === 0 ? (
                                <p className='text-sm text-muted-foreground py-4 text-center'>Noch keine Probleme in dieser Kategorie</p>
                              ) : (
                                <div className='space-y-2'>
                                  {category.problems.map(problem => (
                                    <div key={problem.id} className='flex items-center justify-between p-3 rounded-lg border bg-muted/30'>
                                      <div>
                                        <p className='font-medium text-sm'>{problem.label}</p>
                                        <p className='text-xs text-muted-foreground'>{problem.description}</p>
                                      </div>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant='ghost' size='icon' className='text-destructive hover:text-destructive shrink-0'><Trash2Icon className='size-4' /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Problem löschen?</AlertDialogTitle>
                                            <AlertDialogDescription>Möchten Sie dieses Problem wirklich löschen?</AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteProblem(problem.id)} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>Löschen</AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  )
                })}
              </div>
            )}

            <Dialog open={problemDialogOpen} onOpenChange={setProblemDialogOpen}>
              <DialogContent>
                <DialogHeader><DialogTitle>Neues Problem</DialogTitle></DialogHeader>
                <div className='space-y-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='prob-key'>Schlüssel (key)</Label>
                    <Input id='prob-key' placeholder='z.B. led-defect' value={newProblem.key} onChange={e => setNewProblem(prev => ({ ...prev, key: e.target.value.toLowerCase().replace(/\s/g, '-') }))} />
                    <p className='text-xs text-muted-foreground'>Eindeutiger Schlüssel (keine Leerzeichen)</p>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='prob-label'>Name</Label>
                    <Input id='prob-label' placeholder='z.B. Displaypanel hat defekte LED-Beleuchtung' value={newProblem.label} onChange={e => setNewProblem(prev => ({ ...prev, label: e.target.value }))} />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='prob-desc'>Beschreibung</Label>
                    <Textarea id='prob-desc' placeholder='Kurze Beschreibung' value={newProblem.description} onChange={e => setNewProblem(prev => ({ ...prev, description: e.target.value }))} />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant='outline'>Abbrechen</Button></DialogClose>
                  <Button onClick={handleAddProblem}>Hinzufügen</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
          <footer className='flex items-center justify-between gap-3 px-4 pb-6 max-lg:flex-col sm:px-6 lg:gap-6'>
            <p className='text-muted-foreground text-sm text-balance max-lg:text-center'>
              {`©${new Date().getFullYear()}`}{' '}<a href='/' className='text-primary'>esysync</a>, Display-Support für Immobilienprofis
            </p>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}
