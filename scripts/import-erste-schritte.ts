import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const guides = [
  {
    title: 'Ihr ESYSYNC Account',
    slug: 'ihr-esysync-account',
    excerpt: 'Anmeldung und erste Schritte mit Ihrem ESYSYNC-Konto',
    content: `<p>Sobald wir Ihr ESYSYNC-Konto für Sie erstellt und aktiviert haben, können Sie sich mit Ihrem Benutzernamen und Passwort anmelden.</p>
<p>Ihre Zugangsdaten sowie die Login-URL app.esysync.com erhalten Sie in Kürze per E-Mail.</p>

<h2>ESYSYNC Login</h2>
<ol>
<li>Öffnen Sie app.esysync.com</li>
<li>Melden Sie sich mit Ihrem Benutzernamen und Passwort an.</li>
<li>Nach dem Login landen Sie direkt auf der Willkommensseite Ihres ESYSYNC-Kontos.</li>
</ol>

<h2>Passwort vergessen?</h2>
<p>Falls die Anmeldung nicht klappt, klicken Sie auf "Passwort vergessen", geben Sie Ihre E-Mail-Adresse ein und folgen Sie den Anweisungen in der zugesendeten E-Mail, um ein neues Passwort zu vergeben.</p>`
  },
  {
    title: 'Account-Übersicht',
    slug: 'account-uebersicht',
    excerpt: 'Die Hauptbereiche Ihres ESYSYNC-Kontos im Überblick',
    content: `<p>In Ihrem ESYSYNC-Konto finden Sie diese Hauptbereiche:</p>
<ul>
<li>Dashboard (Willkommensseite)</li>
<li>Meine Displays</li>
<li>Mediathek</li>
<li>Einstellungen</li>
</ul>

<h2>Dashboard (Willkommensseite)</h2>
<p>Nach dem Login gelangen Sie automatisch auf das Dashboard. Dort sehen Sie aktuelle Hinweise zu Änderungen in ESYSYNC sowie die letzten Aktivitäten Ihrer Displays.</p>

<h2>Meine Displays</h2>
<p>Unter "Meine Displays" finden Sie alle aktivierten Displays übersichtlich nach Standorten sortiert.</p>
<p>Displays ohne Standortzuordnung werden am Ende der Liste angezeigt.</p>

<h2>Mediathek</h2>
<p>In der Mediathek finden Sie die Inhalte aller aktivierten Datenquellen, in der von Ihnen festgelegten Reihenfolge.</p>
<p>Beispiel: Wenn Sie die Datenquelle "OpenImmo" aktiviert haben, sehen Sie hier alle automatisch generierten Bilder zu Ihren importierten Objekten.</p>
<p>Wenn Sie die Datenquelle "Cloud" nutzen, können Sie zusätzlich manuell Inhalte hochladen. Außerdem stellen wir Ihnen passende Vorlagen und Inhalte für verschiedene Feiertage zur Verfügung.</p>
<p>Im Ordner "ESYSYNC-Cloud" können Sie Inhalte auch in eigenen Unterordnern organisieren. Unterordner erstellen Sie in den Einstellungen.</p>

<h2>Einstellungen</h2>
<p>Über das Benutzermenü (oben rechts) gelangen Sie zu den Einstellungen. Dort können Sie z. B.:</p>
<ul>
<li>persönliche und firmenspezifische Daten aktualisieren</li>
<li>Sprache ändern</li>
<li>Passwort ändern</li>
<li>Datenquellen konfigurieren</li>
<li>Vorlagen aktivieren</li>
<li>Displays und Standorte verwalten</li>
</ul>`
  },
  {
    title: 'OpenImmo-Schnittstelle einrichten & Daten exportieren',
    slug: 'openimmo-schnittstelle-einrichten',
    excerpt: 'Immobiliendaten aus Ihrem Verwaltungssystem in ESYSYNC importieren',
    content: `<p>OpenImmo beschreibt ein standardisiertes Datenformat auf Basis von XML / XML-Schema. Wenn Sie mehr über OpenImmo erfahren möchten, finden Sie weitere Informationen hier.</p>

<h2>Unterstützte Immobiliensysteme</h2>
<p>Mit unserer OpenImmo-Schnittstelle können Sie Immobilienobjekte aus verschiedenen Immobilienverwaltungssystemen direkt in Ihr ESYSYNC-Konto importieren. Aktuell unterstützen wir:</p>
<ul>
<li>CasaSoft</li>
<li>EDI Real</li>
<li>estatePro</li>
<li>FIO</li>
<li>FLOWFACT</li>
<li>OMAKLER</li>
<li>onOffice</li>
<li>Propstack</li>
</ul>
<p>Ist Ihr System nicht dabei? Melden Sie sich gern bei uns - wir finden gemeinsam eine passende Lösung.</p>

<h3>Beispiel: Export aus onOffice</h3>
<p>Den Export erklären wir beispielhaft anhand von onOffice. In anderen Portalen ist die Vorgehensweise in der Regel ähnlich.</p>

<h2>Konfiguration für Immobilienportale</h2>
<p>Im folgenden Abschnitt finden Sie Anleitungen zur Einrichtung je Portal. Je nach Software-Version kann die Oberfläche leicht abweichen.</p>
<ul>
<li>CasaSoft</li>
<li>EDI Real</li>
<li>estatePro</li>
<li>FIO</li>
<li>FLOWFACT</li>
<li>OMAKLER</li>
<li>onOffice</li>
<li>Propstack</li>
</ul>

<h2>Import in ESYSYNC</h2>
<p>Sobald der Export in Ihrem Portal erfolgreich eingerichtet ist, werden die Daten automatisch in ESYSYNC importiert.</p>
<p>So prüfen Sie die importierten Objekte:</p>
<ol>
<li>Wechseln Sie zur Mediathek</li>
<li>Öffnen Sie die Unterseite OpenImmo</li>
<li>Klicken Sie auf "OpenImmo"</li>
<li>Dort finden Sie alle automatisch importierten Objekte</li>
</ol>

<h3>Import-Status</h3>
<p>Wenn ein Import aktiv ist, sehen Sie rechts unten im Browser ein Symbol. Ein Klick darauf öffnet die Import-Details. Mehrere Importe können gleichzeitig laufen.</p>`
  },
  {
    title: 'Vorlage aktivieren',
    slug: 'vorlage-aktivieren',
    excerpt: 'Vorlagen für Ihre Immobilienanzeigen einrichten und testen',
    content: `<p>Damit Sie für importierte Inhalte eine Vorlage (Template) verwenden können, sind zwei Voraussetzungen nötig:</p>
<ol>
<li>Mindestens eine Vorlage ist aktiv.</li>
<li>Die Marketing-Einstellungen sind gepflegt (Farben + Logo).</li>
</ol>
<p>Wenn bereits Objekte importiert wurden, können Sie die Einstellungen anschließend direkt testen.</p>

<h2>1) Vorlage aktivieren</h2>
<p>Öffnen Sie in Ihrem Account die Einstellungen und wechseln Sie zu "Vorlagen".</p>
<p>Unter "Aktive Vorlagen" sehen Sie alle Vorlagen, die aktuell aktiviert sind.</p>
<p>Wenn dort noch keine Vorlage erscheint, wählen Sie unter "ESYSYNC-Vorlagen" eine Vorlage aus und importieren/aktivieren Sie diese.</p>
<p>Sie können, sofern verfügbar, mehrere Vorlagen aktivieren. Zusätzlich können Sie eine aktive Vorlage als Standardvorlage festlegen:</p>
<p>Klicken Sie dazu auf den Button der jeweiligen Vorlage (rechts unten). Ist der Button grün, ist diese Vorlage als Standard gesetzt.</p>
<p>Benötigen Sie eine Vorlage, die exakt zu Ihrem Branding passt? Kontaktieren Sie uns gern.</p>

<h2>2) Marketing-Einstellungen für die Vorlage</h2>
<p>Unter Einstellungen → Konto → Markendetails hinterlegen Sie die Angaben, die für die Vorlage benötigt werden.</p>
<ul>
<li>Primärfarbe</li>
<li>Sekundärfarbe</li>
<li>Logo</li>
</ul>

<h2>Vorlage testen (Vorschau)</h2>
<p>Wenn bereits importierte Objekte vorhanden sind, können Sie die Vorlage direkt prüfen:</p>
<ol>
<li>Öffnen Sie Mediathek</li>
<li>Wählen Sie OpenImmo</li>
<li>Klicken Sie auf "OpenImmo" (Liste der importierten Objekte)</li>
<li>Wählen Sie ein Objekt über das Augen-Symbol aus</li>
</ol>
<p>Sie erhalten eine Vorschau mit der gespeicherten Standardvorlage, den Farben und dem Logo.</p>
<p>Wenn das Layout nicht passt, können Sie Farben und Logo jederzeit anpassen. Wenn die Ausgabe grundsätzlich nicht Ihren Anforderungen entspricht, melden Sie sich gern, wir finden gemeinsam eine passende Lösung.</p>`
  },
  {
    title: 'Immobilieninhalte generieren',
    slug: 'immobilieninhalte-generieren-erste-schritte',
    excerpt: 'Aus importierten Objektdaten Anzeigen für Ihre Displays erstellen',
    content: `<p>Wenn die OpenImmo-Schnittstelle korrekt eingerichtet ist und ein Export aus Ihrem Portal erfolgt, werden Ihre Objekte automatisch in ESYSYNC importiert.</p>
<p>Damit die Objekte auf Ihren Displays angezeigt werden können, müssen daraus anschließend Inhalte (Anzeigen) generiert werden.</p>

<h2>Inhalte aus OpenImmo-Objekten generieren</h2>
<ol>
<li>Wechseln Sie zur Mediathek und öffnen Sie "OpenImmo".
<ul>
<li>Bereits generierte Inhalte werden hier angezeigt.</li>
<li>Die zugrunde liegenden Objektdaten sehen Sie über den Button "OpenImmo".</li>
</ul>
</li>
<li>Um Inhalte aus einem Objekt zu generieren, klicken Sie in der Objektliste in der letzten Spalte auf das Augen-Symbol.</li>
<li>Es öffnet sich eine Vorschau mit der aktuell gesetzten Standardvorlage.</li>
</ol>

<h2>Vorlage auswählen (optional)</h2>
<p>Wenn Sie mehrere Vorlagen aktiviert haben, können Sie eine andere Vorlage zuordnen:</p>
<ol>
<li>Klicken Sie in der Vorschau auf "Vorlage zuordnen" (1).</li>
<li>Wählen Sie in der Übersicht die gewünschte Vorlage über "Vorlage zuordnen" aus.</li>
<li>Prüfen Sie die Vorschau.</li>
</ol>

<h2>Inhalt importieren (Anzeige erstellen)</h2>
<p>Wenn die Vorschau passt, klicken Sie abschließend auf "Inhalt (Anzeige) importieren" (2). Danach gelangen Sie zurück zur Objektübersicht.</p>
<p>Die erstellten Inhalte finden Sie anschließend unter Mediathek → OpenImmo.</p>
<p>Eine größere Vorschau öffnen Sie, indem Sie in der Liste auf den jeweiligen Inhalt klicken.</p>`
  },
  {
    title: 'Eigene Inhalte hochladen',
    slug: 'eigene-inhalte-hochladen-erste-schritte',
    excerpt: 'Eigene Bilder und Dateien in die Mediathek laden',
    content: `<p>Neben Immobilienobjekten können Sie auch eigene Inhalte in der Mediathek ablegen und auf Ihren Displays nutzen. Zusätzlich stellen wir Ihnen vorgefertigte Inhalte, z. B. für Feiertage, zur Verfügung.</p>
<p>Öffnen Sie dazu die Mediathek und wählen Sie den Bereich "Cloud".</p>

<h2>Inhalte in der Cloud verwalten</h2>
<p>In der Cloud finden Sie:</p>
<ul>
<li>Inhalte, die Sie selbst hochgeladen haben</li>
<li>Inhalte, die ESYSYNC bereitstellt (z. B. Feiertage)</li>
</ul>
<p>Weitere Inhalte können Sie jederzeit hinzufügen.</p>

<h2>Eigene Dateien hochladen</h2>
<ol>
<li>Wählen Sie links in der Ordneransicht den Ordner aus, in den die Datei hochgeladen werden soll.</li>
<li>Klicken Sie oben rechts auf "Inhalt hochladen".</li>
<li>Im Dialog können Sie den Zielordner bei Bedarf noch ändern.</li>
<li>Klicken Sie auf "Inhalt auswählen" und wählen Sie die Datei auf Ihrem PC aus.
<ul><li>Der Dateiname wird automatisch übernommen und kann bei Bedarf angepasst werden.</li></ul>
</li>
<li>Klicken Sie auf "Hochladen". Danach erscheint der Inhalt in der Cloud-Liste.</li>
</ol>
<p><strong>Hinweis:</strong> Unterstützte Dateiformate und Anforderungen (z. B. Maße) finden Sie direkt als Hinweis am Upload-Feld. Bei nicht passenden Dateien zeigt ESYSYNC eine Fehlermeldung an.</p>

<h2>Unterordner erstellen</h2>
<p>Wenn Sie neue Unterordner anlegen möchten, wechseln Sie zu den Eigenschaften und öffnen dort "Datenquellen". Details finden Sie im Abschnitt "Verwendung von Datenquellen".</p>

<h2>Inhalte von ESYSYNC (z. B. Feiertage)</h2>
<p>In der Cloud finden Sie zusätzlich frei nutzbare Inhalte, z. B. für Feiertage. Diese können Sie bei Bedarf direkt für Ihre Displays verwenden.</p>`
  },
  {
    title: 'Inhalte auf ein Display laden',
    slug: 'inhalte-auf-display-laden-erste-schritte',
    excerpt: 'Inhalte aus der Mediathek Ihren Displays zuweisen',
    content: `<p>Sobald Sie Inhalte aus importierten Objektdaten (OpenImmo) erstellt und/oder eigene Inhalte (Cloud) in die Mediathek hochgeladen haben, können Sie diese Ihren Displays zuordnen - vorausgesetzt, mindestens ein Display ist registriert und aktiv.</p>
<p>Wechseln Sie dazu auf "Meine Displays".</p>

<h2>Slide-Builder öffnen</h2>
<p>Klicken Sie auf ein Display. Es öffnet sich ein Layer mit dem Slide-Builder. Dort verwalten Sie die Inhalte, die auf dem Display angezeigt werden.</p>

<h2>Inhalte hinzufügen & sortieren</h2>
<ul>
<li>Ziehen Sie Inhalte per Drag & Drop aus der Mediathek (z. B. Cloud oder OpenImmo) in das graue Feld.</li>
<li>Die Reihenfolge können Sie ebenfalls per Drag & Drop anpassen.</li>
</ul>
<p>Auch Favoriten oder kürzlich hinzugefügte Inhalte lassen sich auf die gleiche Weise hinzufügen.</p>
<p>Klicken Sie anschließend auf "Display updaten", um Ihre Änderungen zu übernehmen.</p>

<h2>Inhalte entfernen</h2>
<p>Um Inhalte zu entfernen, wählen Sie im grauen Bereich das Element aus und ziehen es per Drag & Drop in den unteren Bereich des Layers.</p>
<p>Zum Speichern klicken Sie erneut auf "Display updaten".</p>`
  }
]

async function main() {
  const category = await prisma.guideCategory.findUnique({ where: { slug: 'erste-schritte' } })
  if (!category) { console.log('Kategorie nicht gefunden'); return }

  console.log('Importiere Anleitungen für "Erste Schritte"...\\n')

  for (const guide of guides) {
    const existing = await prisma.guide.findUnique({ where: { slug: guide.slug } })
    
    if (existing) {
      console.log(`⏭️  "${guide.title}" existiert bereits`)
    } else {
      await prisma.guide.create({
        data: {
          title: guide.title,
          slug: guide.slug,
          excerpt: guide.excerpt,
          content: guide.content,
          categoryId: category.id,
          published: true,
          publishedAt: new Date()
        }
      })
      console.log(`✅ "${guide.title}" angelegt`)
    }
  }

  console.log('\n✨ Fertig!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
