'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

import {
  Loader2Icon,
  BookOpenIcon,
  ChevronRightIcon,
  CalendarIcon,
  FolderIcon,
  ArrowLeftIcon,
  ImageIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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
  content: string
  coverImage: string | null
  publishedAt: string | null
  createdAt: string
  category: {
    id: string
    name: string
    slug: string
  }
}

interface RelatedGuide {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
}

export default function AnleitungDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [guide, setGuide] = useState<Guide | null>(null)
  const [relatedGuides, setRelatedGuides] = useState<RelatedGuide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await fetch(`/api/guides/slug/${slug}`)
        const data = await res.json()

        if (data.success) {
          setGuide(data.guide)

          // Verwandte Anleitungen aus derselben Kategorie laden
          const relatedRes = await fetch(`/api/guides?published=true&categoryId=${data.guide.categoryId}`)
          const relatedData = await relatedRes.json()

          if (relatedData.success) {
            // Aktuelle Anleitung ausfiltern und auf 3 begrenzen
            const related = relatedData.guides
              .filter((g: RelatedGuide) => g.id !== data.guide.id)
              .slice(0, 3)
            setRelatedGuides(related)
          }
        } else {
          setError('Anleitung nicht gefunden')
        }
      } catch {
        setError('Fehler beim Laden der Anleitung')
      } finally {
        setLoading(false)
      }
    }

    fetchGuide()
  }, [slug])

  if (loading) {
    return (
      <main className='min-h-dvh flex flex-col'>
        <Header navigationData={navigationData} />
        <div className='flex-1 flex items-center justify-center'>
          <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !guide) {
    return (
      <main className='min-h-dvh flex flex-col'>
        <Header navigationData={navigationData} />
        <div className='flex-1 bg-muted/30'>
          <div className='mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16'>
            <Card className='border-dashed'>
              <CardContent className='py-12'>
                <div className='text-center text-muted-foreground'>
                  <BookOpenIcon className='mx-auto size-12 mb-4 opacity-50' />
                  <p className='text-lg'>{error || 'Anleitung nicht gefunden'}</p>
                  <Button className='mt-4' asChild>
                    <a href='/anleitungen'>Zurück zur Übersicht</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className='min-h-dvh flex flex-col'>
      <Header navigationData={navigationData} />

      <div className='flex-1 bg-muted/30'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16'>
          {/* Breadcrumb */}
          <nav className='flex items-center gap-2 text-sm text-muted-foreground mb-8'>
            <a href='/' className='hover:text-primary transition-colors'>Startseite</a>
            <ChevronRightIcon className='size-4' />
            <a href='/anleitungen' className='hover:text-primary transition-colors'>Anleitungen</a>
            <ChevronRightIcon className='size-4' />
            <a
              href={`/anleitungen?category=${guide.category.id}`}
              className='hover:text-primary transition-colors'
            >
              {guide.category.name}
            </a>
            <ChevronRightIcon className='size-4' />
            <span className='text-foreground truncate max-w-[200px]'>{guide.title}</span>
          </nav>

          {/* Zurück-Button */}
          <Button variant='ghost' size='sm' className='mb-6' asChild>
            <a href='/anleitungen'>
              <ArrowLeftIcon className='size-4 mr-2' />
              Zurück zur Übersicht
            </a>
          </Button>

          {/* Artikel */}
          <article>
            {/* Header */}
            <header className='mb-8'>
              <div className='flex items-center gap-2 mb-4'>
                <Badge variant='secondary'>
                  <FolderIcon className='size-3 mr-1' />
                  {guide.category.name}
                </Badge>
                {guide.publishedAt && (
                  <span className='flex items-center gap-1 text-sm text-muted-foreground'>
                    <CalendarIcon className='size-3' />
                    {new Date(guide.publishedAt).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                )}
              </div>
              <h1 className='text-3xl sm:text-4xl font-bold mb-4'>{guide.title}</h1>
              <p className='text-lg text-muted-foreground'>{guide.excerpt}</p>
            </header>

            {/* Cover Image */}
            {guide.coverImage && (
              <div className='mb-8 rounded-xl overflow-hidden'>
                <img
                  src={guide.coverImage}
                  alt={guide.title}
                  className='w-full aspect-video object-cover'
                />
              </div>
            )}

            {/* Content */}
            <Card>
              <CardContent className='p-6 sm:p-8'>
                <div
                  className='prose prose-sm sm:prose-base max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-primary prose-img:rounded-lg'
                  dangerouslySetInnerHTML={{ __html: guide.content }}
                />
              </CardContent>
            </Card>
          </article>

          {/* Verwandte Anleitungen */}
          {relatedGuides.length > 0 && (
            <section className='mt-12'>
              <Separator className='mb-8' />
              <h2 className='text-xl font-bold mb-6'>Weitere Anleitungen in dieser Kategorie</h2>
              <div className='grid gap-4 sm:grid-cols-3'>
                {relatedGuides.map(related => (
                  <a
                    key={related.id}
                    href={`/anleitungen/${related.slug}`}
                    className='group'
                  >
                    <Card className='h-full overflow-hidden transition-all hover:shadow-md'>
                      <div className='aspect-video bg-muted overflow-hidden'>
                        {related.coverImage ? (
                          <img
                            src={related.coverImage}
                            alt={related.title}
                            className='size-full object-cover transition-transform group-hover:scale-105'
                          />
                        ) : (
                          <div className='size-full flex items-center justify-center'>
                            <ImageIcon className='size-8 text-muted-foreground/50' />
                          </div>
                        )}
                      </div>
                      <CardContent className='p-3'>
                        <h3 className='font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors'>
                          {related.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Hilfe-Box */}
          <Card className='mt-12 bg-primary/5 border-primary/20'>
            <CardContent className='py-8'>
              <div className='text-center'>
                <h3 className='text-xl font-semibold mb-2'>Brauchen Sie weitere Hilfe?</h3>
                <p className='text-muted-foreground mb-4'>
                  Wenn diese Anleitung Ihr Problem nicht löst, kontaktieren Sie uns.
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
