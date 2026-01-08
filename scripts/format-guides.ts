import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function formatGuideContent(content: string, excerpt: string): string {
  let formatted = content

  // 1. Lead-Paragraph am Anfang hinzufügen (wenn noch nicht vorhanden)
  if (!formatted.includes('class="lead"')) {
    // Prüfen ob Content mit <p> oder <h2> beginnt
    if (formatted.startsWith('<p>')) {
      // Ersten Paragraph als Lead markieren oder neuen Lead hinzufügen
      formatted = `<p class="lead">${excerpt}</p>\n\n${formatted}`
    } else if (formatted.startsWith('<h2>')) {
      formatted = `<p class="lead">${excerpt}</p>\n\n${formatted}`
    } else if (formatted.startsWith('<ol>') || formatted.startsWith('<ul>')) {
      formatted = `<p class="lead">${excerpt}</p>\n\n${formatted}`
    }
  }

  // 2. Hinweise in Info-Boxen umwandeln
  // Pattern: <p><strong>Hinweis:</strong> ... </p>
  formatted = formatted.replace(
    /<p><strong>Hinweis:?<\/strong>\s*(.*?)<\/p>/gi,
    '<div class="info-box"><strong>Hinweis:</strong> $1</div>'
  )
  
  // Pattern: <p>Hinweis: ... </p>
  formatted = formatted.replace(
    /<p>Hinweis:\s*(.*?)<\/p>/gi,
    '<div class="info-box"><strong>Hinweis:</strong> $1</div>'
  )

  // 3. Tipps in Tipp-Boxen umwandeln
  formatted = formatted.replace(
    /<p><strong>Tipp:?<\/strong>\s*(.*?)<\/p>/gi,
    '<div class="tip-box"><strong>Tipp:</strong> $1</div>'
  )
  
  formatted = formatted.replace(
    /<p>Tipp:\s*(.*?)<\/p>/gi,
    '<div class="tip-box"><strong>Tipp:</strong> $1</div>'
  )

  // 4. Wichtig in Warning-Boxen umwandeln
  formatted = formatted.replace(
    /<p><strong>Wichtig:?<\/strong>\s*(.*?)<\/p>/gi,
    '<div class="warning-box"><strong>Wichtig:</strong> $1</div>'
  )
  
  formatted = formatted.replace(
    /<p>Wichtig:\s*(.*?)<\/p>/gi,
    '<div class="warning-box"><strong>Wichtig:</strong> $1</div>'
  )

  // 5. Wichtige UI-Elemente fett machen (wenn noch nicht fett)
  const uiElements = [
    'Mediathek', 'OpenImmo', 'Cloud', 'Meine Displays', 'Einstellungen',
    'Datenquellen', 'Vorlagen', 'Displays', 'Slide-Builder', 'Dashboard',
    'Display updaten', 'Speichern', 'Hinzufügen', 'Bearbeiten', 'Löschen',
    'Hochladen', 'Inhalt hochladen', 'Inhalt auswählen'
  ]
  
  for (const element of uiElements) {
    // Nur ersetzen wenn nicht bereits in <strong> oder als Teil eines längeren Wortes
    const regex = new RegExp(`(?<!<strong>)(?<!")\\b(${element})\\b(?!")(?!<\\/strong>)`, 'g')
    formatted = formatted.replace(regex, '<strong>$1</strong>')
  }

  // 6. Doppelte <strong> Tags bereinigen
  formatted = formatted.replace(/<strong><strong>/g, '<strong>')
  formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>')

  // 7. Menüpfade formatieren (→ Symbol)
  formatted = formatted.replace(/(\s)→(\s)/g, ' → ')

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
