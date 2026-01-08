import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    key: 'hardware',
    label: 'Hardware-Probleme',
    description: 'Physische Defekte am Display oder Hardwarekomponenten',
    icon: 'monitor',
    order: 0,
    problems: [
      { key: 'led-defect', label: 'Displaypanel hat defekte LED-Beleuchtung', description: 'LED-Hintergrundbeleuchtung funktioniert nicht ordnungsgemäß' },
      { key: 'bootloop', label: 'Display bleibt im Bootloop hängen (ESYSYNC Logo)', description: 'Display startet immer wieder neu und zeigt nur das ESYSYNC Logo' },
      { key: 'flicker', label: 'Displaypanel flackert', description: 'Display zeigt Flackern oder unstabile Bilddarstellung' },
      { key: '24v-conversion', label: 'Display soll auf 24 Volt umgerüstet werden', description: 'Umbau des Displays für 24V Betriebsspannung' },
      { key: 'sim-error', label: 'Display zeigt Fehler: "Simkarte entfernen"', description: 'Fehlermeldung bezüglich der SIM-Karte' },
      { key: 'auth-error', label: 'Display zeigt Fehler: "Android UI Authentication Error"', description: 'Android Authentifizierungsfehler wird angezeigt' },
      { key: 'no-power-all', label: 'Alle Displays bekommen keinen Strom', description: 'Stromversorgungsproblem für mehrere Displays' },
      { key: 'lines', label: 'Linien im Bild', description: 'Störende Linien oder Streifen' },
      { key: 'black-screen', label: 'Bleibt schwarz', description: 'Display zeigt kein Bild an' },
      { key: 'blonde-woman', label: 'Display startet die APP nicht, Blonde Frau', description: 'App startet nicht und zeigt stattdessen eine blonde Frau' },
      { key: 'no-content', label: 'No Content Assigned', description: 'Display zeigt "No Content Assigned" Meldung' },
      { key: 'homeapp-select', label: 'Display schwarz und Homeapp muss ausgewählt werden', description: 'Display ist schwarz und die Home-App muss manuell ausgewählt werden' },
      { key: 'no-update', label: 'Display updatet nicht, hat keine Verbindung (rotes Ausrufezeichen)', description: 'Inhalt wird angezeigt, aber rotes Ausrufezeichen in der ESYSYNC APP' },
      { key: 'panel-damage', label: 'Displaypanel hat einen Schaden (Sprung, Bruch, Anzeigeschaden)', description: 'Physische Schäden am Display-Panel wie Risse oder Brüche' },
      { key: 'case-damage', label: 'Displaygehäuse beschädigt (Sturz, Bruch, sonstige Acrylbeschädigung)', description: 'Gehäuse ist beschädigt durch Sturz oder andere Einwirkungen' },
    ]
  },
  {
    key: 'software',
    label: 'Software-Probleme',
    description: 'Bootloop, Apps, Android-Fehler und Systemprobleme',
    icon: 'code',
    order: 1,
    problems: [
      { key: 'hang-restart', label: 'Hängt nach Neustart', description: 'Display reagiert nicht mehr' },
      { key: 'not-responding', label: 'Display reagiert nicht mehr', description: 'System friert ein oder reagiert nicht auf Eingaben' },
    ]
  },
  {
    key: 'network',
    label: 'Netzwerk-Probleme',
    description: 'Verbindungs-, Update- und Konnektivitätsprobleme',
    icon: 'wifi',
    order: 2,
    problems: [
      { key: 'router-defect', label: 'Router ist defekt', description: 'Netzwerk-Router funktioniert nicht mehr' },
      { key: 'no-connection', label: 'Keine Verbindung', description: 'Signal wird nicht erkannt' },
    ]
  }
]

async function main() {
  console.log('Starte Support-Kategorien Import...\n')

  for (const cat of categories) {
    // Prüfen ob Kategorie existiert
    const existingCat = await prisma.supportCategory.findUnique({
      where: { key: cat.key }
    })

    let categoryId: string

    if (existingCat) {
      console.log(`⏭️  Kategorie "${cat.label}" existiert bereits`)
      categoryId = existingCat.id
    } else {
      const newCat = await prisma.supportCategory.create({
        data: {
          key: cat.key,
          label: cat.label,
          description: cat.description,
          icon: cat.icon,
          order: cat.order
        }
      })
      console.log(`✅ Kategorie "${cat.label}" angelegt`)
      categoryId = newCat.id
    }

    // Probleme importieren
    for (let i = 0; i < cat.problems.length; i++) {
      const problem = cat.problems[i]
      const existingProblem = await prisma.supportProblem.findUnique({
        where: { key: problem.key }
      })

      if (existingProblem) {
        console.log(`   ⏭️  Problem "${problem.label}" existiert bereits`)
      } else {
        await prisma.supportProblem.create({
          data: {
            key: problem.key,
            label: problem.label,
            description: problem.description,
            categoryId,
            order: i
          }
        })
        console.log(`   ✅ Problem "${problem.label}" angelegt`)
      }
    }
  }

  console.log('\n✨ Fertig!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
