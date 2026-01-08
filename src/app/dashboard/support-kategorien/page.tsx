'use client'

import { useState, useEffect } from 'react'
import {
  PlusIcon,
  Trash2Icon,
  Loader2Icon,
  MonitorIcon,
  CodeIcon,
  WifiIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  AlertCircleIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

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

  // Kategorie Dialog
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ key: '', label: '', description: '', icon: 'monitor' })

  // Problem Dialog
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
        // Alle Kategorien initial expandieren
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
      if (data.success) {
        fetchCategories()
      }
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
      if (data.success) {
        fetchCategories()
      }
    } catch (error) {
      console.error('Error deleting problem:', error)
    }
  }

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-96'>
        <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Support-Kategorien</h1>
          <p className='text-muted-foreground'>
            Verwalten Sie die Kategorien und Probleme für das Support-Formular
          </p>
        </div>

        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className='size-4 mr-2' />
              Kategorie hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neue Kategorie</DialogTitle>
            </DialogHeader>
            <div className='space-y-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='cat-key'>Schlüssel (key)</Label>
                <Input
                  id='cat-key'
                  placeholder='z.B. hardware'
                  value={newCategory.key}
                  onChange={e => setNewCategory(prev => ({ ...prev, key: e.target.value.toLowerCase().replace(/\s/g, '-') }))}
                />
                <p className='text-xs text-muted-foreground'>Eindeutiger Schlüssel (keine Leerzeichen)</p>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cat-label'>Name</Label>
                <Input
                  id='cat-label'
                  placeholder='z.B. Hardware-Probleme'
                  value={newCategory.label}
                  onChange={e => setNewCategory(prev => ({ ...prev, label: e.target.value }))}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cat-desc'>Beschreibung</Label>
                <Textarea
                  id='cat-desc'
                  placeholder='Kurze Beschreibung der Kategorie'
                  value={newCategory.description}
                  onChange={e => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cat-icon'>Icon</Label>
                <Select
                  value={newCategory.icon}
                  onValueChange={value => setNewCategory(prev => ({ ...prev, icon: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Icon auswählen' />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className='flex items-center gap-2'>
                          <option.Icon className='size-4' />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Abbrechen</Button>
              </DialogClose>
              <Button onClick={handleAddCategory}>Hinzufügen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {categories.length === 0 ? (
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
                        {isExpanded ? (
                          <ChevronDownIcon className='size-5 text-muted-foreground' />
                        ) : (
                          <ChevronRightIcon className='size-5 text-muted-foreground' />
                        )}
                        <div className='rounded-full bg-primary/10 p-2'>
                          <Icon className='size-5 text-primary' />
                        </div>
                        <div className='text-left'>
                          <CardTitle className='text-lg'>{category.label}</CardTitle>
                          <p className='text-sm text-muted-foreground'>{category.description}</p>
                        </div>
                      </CollapsibleTrigger>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-muted-foreground'>
                          {category.problems.length} Probleme
                        </span>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant='ghost' size='icon' className='text-destructive hover:text-destructive'>
                              <Trash2Icon className='size-4' />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Kategorie löschen?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Diese Aktion kann nicht rückgängig gemacht werden. Alle zugehörigen Probleme werden ebenfalls gelöscht.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCategory(category.id)}
                                className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                              >
                                Löschen
                              </AlertDialogAction>
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
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => {
                              setSelectedCategoryId(category.id)
                              setProblemDialogOpen(true)
                            }}
                          >
                            <PlusIcon className='size-3 mr-1' />
                            Problem hinzufügen
                          </Button>
                        </div>

                        {category.problems.length === 0 ? (
                          <p className='text-sm text-muted-foreground py-4 text-center'>
                            Noch keine Probleme in dieser Kategorie
                          </p>
                        ) : (
                          <div className='space-y-2'>
                            {category.problems.map(problem => (
                              <div
                                key={problem.id}
                                className='flex items-center justify-between p-3 rounded-lg border bg-muted/30'
                              >
                                <div>
                                  <p className='font-medium text-sm'>{problem.label}</p>
                                  <p className='text-xs text-muted-foreground'>{problem.description}</p>
                                </div>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant='ghost' size='icon' className='text-destructive hover:text-destructive shrink-0'>
                                      <Trash2Icon className='size-4' />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Problem löschen?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Möchten Sie dieses Problem wirklich löschen?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteProblem(problem.id)}
                                        className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                      >
                                        Löschen
                                      </AlertDialogAction>
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

      {/* Problem hinzufügen Dialog */}
      <Dialog open={problemDialogOpen} onOpenChange={setProblemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neues Problem</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='prob-key'>Schlüssel (key)</Label>
              <Input
                id='prob-key'
                placeholder='z.B. led-defect'
                value={newProblem.key}
                onChange={e => setNewProblem(prev => ({ ...prev, key: e.target.value.toLowerCase().replace(/\s/g, '-') }))}
              />
              <p className='text-xs text-muted-foreground'>Eindeutiger Schlüssel (keine Leerzeichen)</p>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='prob-label'>Name</Label>
              <Input
                id='prob-label'
                placeholder='z.B. Displaypanel hat defekte LED-Beleuchtung'
                value={newProblem.label}
                onChange={e => setNewProblem(prev => ({ ...prev, label: e.target.value }))}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='prob-desc'>Beschreibung</Label>
              <Textarea
                id='prob-desc'
                placeholder='Kurze Beschreibung des Problems'
                value={newProblem.description}
                onChange={e => setNewProblem(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Abbrechen</Button>
            </DialogClose>
            <Button onClick={handleAddProblem}>Hinzufügen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
