import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

// Default System Prompt
const DEFAULT_SYSTEM_PROMPT = `Du bist der freundliche Support-Assistent von esysync/AVANTO. Du hilfst Kunden bei Fragen zu ihren Digital Signage Displays.

Wichtige Informationen über esysync/AVANTO:
- esysync bietet digitale Displays für Immobilienmakler und Unternehmen
- AVANTO ist die Marke für die Display-Hardware
- Kunden können Support-Tickets über das Portal erstellen
- Bei Hardware-Problemen können Displays eingeschickt werden

Versandoptionen für Reparaturen:
- Eigene Verpackung: 18€
- AVANTOR-Box mit Rückschein: 99€
- Techniker-Abholung: Auf Anfrage
- Kompletttausch: 229€

Häufige Probleme und Lösungen:
- Display bleibt schwarz: Stromversorgung prüfen, Neustart durchführen
- Display zeigt "No Content": Internetverbindung prüfen, im Portal Inhalt zuweisen
- Display im Bootloop: Support-Ticket erstellen für Reparatur
- Rotes Ausrufezeichen: Display hat keine Verbindung zum Server

WICHTIG - Ticket-Status Abfrage:
- Frage den Kunden IMMER zu Beginn: "Haben Sie bereits eine Ticketnummer? Dann kann ich den aktuellen Status für Sie prüfen."
- Ticketnummern haben das Format SUP-YYYYMMDD-XXXX (z.B. SUP-20251205-1234)
- Wenn der Kunde eine Ticketnummer nennt, wird der Status automatisch abgefragt und du erhältst die Info als [TICKET-STATUS: ...]
- Gib dem Kunden dann den Status freundlich wieder

WISSENSDATENBANK:
- Dir werden möglicherweise relevante Informationen aus der Wissensdatenbank als [WISSENSDATENBANK-KONTEXT] übergeben
- Nutze diese Informationen, um präzise und hilfreiche Antworten zu geben
- Verweise bei Bedarf auf die Quelle (Dateiname)

Verhalte dich freundlich und hilfsbereit. Wenn du eine Frage nicht beantworten kannst oder der Kunde mit einem Mitarbeiter sprechen möchte, weise ihn darauf hin, dass er auf "Mit Mitarbeiter sprechen" klicken kann.

Antworte immer auf Deutsch und halte deine Antworten kurz und präzise.`

export async function GET() {
  try {
    const settings = await prisma.settings.findMany()
    
    // Convert to key-value object
    const settingsObj: Record<string, string> = {}
    for (const setting of settings) {
      settingsObj[setting.key] = setting.value
    }
    
    // Add default system prompt if not set
    if (!settingsObj.systemPrompt) {
      settingsObj.systemPrompt = DEFAULT_SYSTEM_PROMPT
    }

    return NextResponse.json({ success: true, settings: settingsObj })
  } catch (error) {
    console.error('Fetch settings error:', error)
    return NextResponse.json(
      { success: false, error: 'Einstellungen konnten nicht geladen werden' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      )
    }

    const { key, value } = await request.json()

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Key und Value sind erforderlich' },
        { status: 400 }
      )
    }

    // Upsert setting
    const setting = await prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })

    return NextResponse.json({ success: true, setting })
  } catch (error) {
    console.error('Save setting error:', error)
    return NextResponse.json(
      { success: false, error: 'Einstellung konnte nicht gespeichert werden' },
      { status: 500 }
    )
  }
}
