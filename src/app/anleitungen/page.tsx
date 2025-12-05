'use client'

import { useState, useEffect } from 'react'

import {
  SearchIcon,
  Loader2Icon,
  BookOpenIcon,
  FolderIcon,
  ImageIcon,
  ChevronRightIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Header from '@/components/shadcn-studio/blocks/hero-section-12/header'
import Footer from '@/components/shadcn-studio/blocks/footer-component-02/footer-component-02'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'

// Navigation-Daten
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

interface Guide {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  publishedAt: string | null
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
  _count: {
    guides: number
  }
}

export default function AnleitungenPage() {
  const [guides, setGuides] = useState<Guide[]>([])
  const [categories, setCategories] = useState<GuideCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guidesRes, categoriesRes] = await Promise.all([
          fetch('/api/guides?published=true'),
          fetch('/api/guides/categories')
        ])

        const guidesData = await guidesRes.json()
        const categoriesData = await categoriesRes.json()

        if (guidesData.success) {
          setGuides(guidesData.guides)
        }
        if (categoriesData.success) {
          // Nur Kategorien mit veröffentlichten Guides anzeigen
          const categoriesWithGuides = categoriesData.categories.filter(
            (cat: GuideCategory) => cat._count.guides > 0
          )
          setCategories(categoriesWithGuides)
        }
      } catch (error) {
        console.error('Fehler beim Laden:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Gefilterte Guides
  const filteredGuides = guides.filter(guide => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || guide.category.id === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <main className='min-h-dvh flex flex-col'>
      <Header navigationData={navigationData} />

      <div className='flex-1 bg-muted/30'>
        <div className='mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16'>
          {/* Header */}
          <div className='text-center mb-10'>
            <h1 className='text-3xl font-bold sm:text-4xl'>Anleitungen</h1>
            <p className='text-muted-foreground mt-3 text-lg max-w-2xl mx-auto'>
              Finden Sie Schritt-für-Schritt-Anleitungen zur Bedienung und Wartung Ihrer Displays.
            </p>
          </div>

          {/* Suchfeld */}
          <Card className='mb-8'>
            <CardContent className='pt-6'>
              <div className='relative'>
                <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground' />
                <Input
                  type='text'
                  placeholder='Anleitung suchen...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10 text-lg h-12'
                />
              </div>
            </CardContent>
          </Card>

          {/* Kategorie-Filter */}
          {categories.length > 0 && (
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className='mb-8'>
              <TabsList className='flex flex-wrap h-auto gap-2 bg-transparent p-0'>
                <TabsTrigger
                  value='all'
                  className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                >
                  Alle
                </TabsTrigger>
                {categories.map(cat => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          {/* Anleitungen-Grid */}
          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
            </div>
          ) : filteredGuides.length === 0 ? (
            <Card className='border-dashed'>
              <CardContent className='py-12'>
                <div className='text-center text-muted-foreground'>
                  <BookOpenIcon className='mx-auto size-12 mb-4 opacity-50' />
                  <p className='text-lg'>
                    {searchTerm || selectedCategory !== 'all'
                      ? 'Keine Anleitungen gefunden'
                      : 'Noch keine Anleitungen verfügbar'}
                  </p>
                  {searchTerm && (
                    <p className='text-sm mt-2'>
                      Versuchen Sie einen anderen Suchbegriff.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredGuides.map(guide => (
                <a
                  key={guide.id}
                  href={`/anleitungen/${guide.slug}`}
                  className='group'
                >
                  <Card className='h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1'>
                    {/* Cover Image */}
                    <div className='aspect-video bg-muted overflow-hidden'>
                      {guide.coverImage ? (
                        <img
                          src={guide.coverImage}
                          alt={guide.title}
                          className='size-full object-cover transition-transform group-hover:scale-105'
                        />
                      ) : (
                        <div className='size-full flex items-center justify-center'>
                          <ImageIcon className='size-12 text-muted-foreground/50' />
                        </div>
                      )}
                    </div>

                    <CardContent className='p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Badge variant='secondary' className='text-xs'>
                          <FolderIcon className='size-3 mr-1' />
                          {guide.category.name}
                        </Badge>
                      </div>
                      <h2 className='font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors'>
                        {guide.title}
                      </h2>
                      <p className='text-sm text-muted-foreground line-clamp-2'>
                        {guide.excerpt}
                      </p>
                      <div className='flex items-center gap-1 mt-4 text-sm text-primary font-medium'>
                        Anleitung lesen
                        <ChevronRightIcon className='size-4 transition-transform group-hover:translate-x-1' />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}

          {/* Hilfe-Box */}
          <Card className='mt-12 bg-primary/5 border-primary/20'>
            <CardContent className='py-8'>
              <div className='text-center'>
                <h3 className='text-xl font-semibold mb-2'>Nicht gefunden, was Sie suchen?</h3>
                <p className='text-muted-foreground mb-4'>
                  Unser Support-Team hilft Ihnen gerne weiter.
                </p>
                <div className='flex justify-center gap-4 flex-wrap'>
                  <Button variant='outline' asChild>
                    <a href='/#kontakt'>Kontakt aufnehmen</a>
                  </Button>
                  <Button asChild>
                    <a href='/multi-step-form-02'>Support-Anfrage erstellen</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
