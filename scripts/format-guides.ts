import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function formatGuideContent(content: string, excerpt: string): string {
  let formatted = content

  // 0. Alten Lead entfernen falls vorhanden (für Re-Formatierung)
  formatted = formatted.replace(/<p class="lead">[\s\S]*?<\/p>\s*/g, '')

  // 1. Lead-Paragraph am Anfang hinzufügen
  formatted = `<p class="lead">${excerpt}</p>\n\n${formatted}`

  // 2. Menüpfade in <code> Tags wrappen
  // Pattern: Text → Text → Text (Menünavigation)
  formatted = formatted.replace(
    /(?<!<code>)(\b[A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ]?[a-zäöüß]+)*)\s*→\s*([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ]?[a-zäöüß]+)*(?:\s*→\s*[A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ]?[a-zäöüß]+)*)*)(?!<\/code>)/g,
    '<code>$1 → $2</code>'
  )

  // 3. Hinweise in Info-Boxen umwandeln
  formatted = formatted.replace(
    /<p><strong>Hinweis:?<\/strong>\s*(.*?)<\/p>/gi,
    '<div class="info-box"><strong>Hinweis:</strong> $1</div>'
  )
  formatted = formatted.replace(
    /<p>Hinweis:\s*(.*?)<\/p>/gi,
    '<div class="info-box"><strong>Hinweis:</strong> $1</div>'
  )

  // 4. Tipps in Tipp-Boxen umwandeln
  formatted = formatted.replace(
    /<p><strong>Tipp:?<\/strong>\s*(.*?)<\/p>/gi,
    '<div class="tip-box"><strong>Tipp:</strong> $1</div>'
  )
  formatted = formatted.replace(
    /<p>Tipp:\s*(.*?)<\/p>/gi,
    '<div class="tip-box"><strong>Tipp:</strong> $1</div>'
  )

  // 5. Wichtig in Warning-Boxen umwandeln
  formatted = formatted.replace(
    /<p><strong>Wichtig:?<\/strong>\s*(.*?)<\/p>/gi,
    '<div class="warning-box"><strong>Wichtig:</strong> $1</div>'
  )
  formatted = formatted.replace(
    /<p>Wichtig:\s*(.*?)<\/p>/gi,
    '<div class="warning-box"><strong>Wichtig:</strong> $1</div>'
  )

  // 6. Wichtige UI-Elemente fett machen
  const uiElements = [
    'Mediathek', 'OpenImmo', 'Cloud', 'Meine Displays', 'Einstellungen',
    'Datenquellen', 'Vorlagen', 'Displays', 'Slide-Builder', 'Dashboard',
    'Display updaten', 'Speichern', 'Hinzufügen', 'Bearbeiten', 'Löschen',
    'Hochladen', 'Inhalt hochladen', 'Inhalt auswählen', 'Standorte',
    'Wiedergabelisten', 'Favoriten', 'Markendetails', 'Profil', 'Konto'
  ]
  
  for (const element of uiElements) {
    // Nicht innerhalb von code-Tags oder bereits in strong
    const regex = new RegExp(`(?<!<code>.*?)(?<!<strong>)(?<!")(\\b${element}\\b)(?!")(?!<\\/strong>)(?!.*?<\\/code>)`, 'g')
    formatted = formatted.replace(regex, '<strong>$1</strong>')
  }

  // 7. Doppelte Tags bereinigen
  formatted = formatted.replace(/<strong><strong>/g, '<strong>')
  formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>')
  formatted = formatted.replace(/<code><code>/g, '<code>')
  formatted = formatted.replace(/<\/code><\/code>/g, '</code>')

  // 8. Mehrfache Leerzeilen reduzieren
  formatted = formatted.replace(/\n{3,}/g, '\n\n')

  return formatted
}

async function main() {
  console.log('Formatiere alle Anleitungen...\n')

  const guides = await prisma.guide.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true
    }
  })

  console.log(`${guides.length} Anleitungen gefunden.\n`)

  let updated = 0

  for (const guide of guides) {
    const newContent = formatGuideContent(guide.content, guide.excerpt)
    
    if (newContent !== guide.content) {
      await prisma.guide.update({
        where: { id: guide.id },
        data: { content: newContent }
      })
      console.log(`✅ "${guide.title}" formatiert`)
      updated++
    } else {
      console.log(`⏭️  "${guide.title}" - keine Änderungen`)
    }
  }

  console.log(`\n✨ Fertig! ${updated} Anleitungen aktualisiert.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
