import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: 'Erste Schritte', slug: 'erste-schritte', description: 'Grundlagen für den Einstieg in ESYSYNC', order: 0 },
  { name: 'Häufig gestellte Fragen', slug: 'haeufig-gestellte-fragen', description: 'Antworten auf die häufigsten Fragen', order: 1 },
  { name: 'Die OpenImmo-Schnittstelle', slug: 'openimmo-schnittstelle', description: 'Immobiliendaten importieren und verwalten', order: 2 },
  { name: 'Displays verwalten und konfigurieren', slug: 'displays-verwalten', description: 'Ihre Displays einrichten und steuern', order: 3 },
  { name: 'Inhalte erstellen und bereitstellen', slug: 'inhalte-erstellen', description: 'Mediathek und Content-Management', order: 4 },
  { name: 'Vorlagen', slug: 'vorlagen', description: 'Templates für Ihre Immobilienanzeigen', order: 5 },
  { name: 'Wiedergabelisten', slug: 'wiedergabelisten', description: 'Playlists für mehrere Displays', order: 6 },
]

async function main() {
  console.log('Starte Kategorien-Import...\n')

  for (const cat of categories) {
    const existing = await prisma.guideCategory.findUnique({ where: { slug: cat.slug } })
    
    if (existing) {
      console.log(`⏭️  Kategorie "${cat.name}" existiert bereits`)
    } else {
      await prisma.guideCategory.create({ data: cat })
      console.log(`✅ Kategorie "${cat.name}" angelegt`)
    }
  }

  console.log('\n✨ Fertig!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
