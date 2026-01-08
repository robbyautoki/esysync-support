import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Guide {
  title: string
  slug: string
  excerpt: string
  content: string
  categorySlug: string
}

const guides: Guide[] = [
  // ========== HÄUFIG GESTELLTE FRAGEN ==========
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Welche OpenImmo-Schnittstellen gibt es?',
    slug: 'welche-openimmo-schnittstellen-gibt-es',
    excerpt: 'Übersicht der unterstützten Immobilienverwaltungssysteme',
    content: `<p>Mit unserer OpenImmo-Schnittstelle können Sie Immobilienobjekte aus verschiedenen Immobilienverwaltungssystemen direkt in Ihr ESYSYNC-Konto importieren. Aktuell unterstützen wir:</p>
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
<p>Ist Ihr System nicht dabei? Melden Sie sich gern bei uns - wir prüfen eine passende Lösung.</p>
<p>Als Beispiel erklären wir den Export anhand von onOffice. In anderen Portalen ist die Vorgehensweise in der Regel ähnlich.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'OpenImmo-Schnittstelle in onOffice einrichten',
    slug: 'openimmo-schnittstelle-in-onoffice-einrichten',
    excerpt: 'Schritt-für-Schritt Anleitung zur Einrichtung in onOffice',
    content: `<h2>Schritt 1: Portalbereich öffnen</h2>
<p>Melden Sie sich in onOffice an und gehen Sie zu:</p>
<p>Extras → Einstellungen → Grundeinstellungen</p>
<p>Wählen Sie anschließend in der Navigation den Punkt "Portale" aus. Hier richten Sie das Portal für die Verbindung mit Ihrem ESYSYNC-Konto ein.</p>

<h2>Schritt 2: Neues Portal anlegen</h2>
<p>Klicken Sie oben links auf das "+"-Symbol, wählen Sie ein freies Portal aus und klicken Sie auf "Portal hinzufügen".</p>

<h2>Schritt 3: Portal konfigurieren</h2>
<p>Klicken Sie auf das neu angelegte Portal, um die Einstellungen zu öffnen, und konfigurieren Sie es wie folgt:</p>
<ul>
<li><strong>Portalname:</strong> z. B. "ESYSYNC Übertragung"</li>
<li><strong>FTP-Zugangsdaten:</strong> Den FTP-Server, FTP-Benutzer und das FTP-Passwort finden Sie in ESYSYNC unter: Einstellungen → Datenquellen → OpenImmo. Achten Sie darauf, dass im Feld "Software" das korrekte System ausgewählt ist (hier: onOffice).</li>
<li><strong>Format:</strong> Stellen Sie das Export-Format auf OpenImmo 1.27 (XML).</li>
</ul>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie importiere ich meine Immobilien-Objekte in ESYSYNC?',
    slug: 'wie-importiere-ich-immobilien-objekte',
    excerpt: 'Prüfen Sie den automatischen Import Ihrer Objektdaten',
    content: `<p>Sobald der OpenImmo-Export in Ihrem Immobilienportal erfolgreich eingerichtet ist, werden die Daten automatisch in ESYSYNC importiert.</p>

<h2>So prüfen Sie den Import:</h2>
<ol>
<li>Öffnen Sie die Mediathek.</li>
<li>Wechseln Sie zur Unterseite "OpenImmo".</li>
<li>Klicken Sie auf den Button "OpenImmo".</li>
<li>Dort sehen Sie alle automatisch importierten Objekte.</li>
</ol>

<h2>Import-Status:</h2>
<p>Wenn aktuell ein Import läuft, erkennen Sie das am Symbol rechts unten im Browser.</p>
<p>Per Klick auf das Symbol öffnen Sie die Import-Details. Mehrere Importe können parallel ausgeführt werden.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie generiere ich Inhalte aus importierten OpenImmo-Objekten?',
    slug: 'wie-generiere-ich-inhalte-aus-openimmo',
    excerpt: 'Aus Objektdaten Anzeigen für Displays erstellen',
    content: `<ol>
<li>Öffnen Sie die Mediathek und wählen Sie "OpenImmo".
<ul>
<li>Bereits generierte Inhalte werden hier angezeigt.</li>
<li>Die importierten Objektdaten finden Sie über den Button "OpenImmo".</li>
</ul>
</li>
<li>Wählen Sie in der Objektliste das gewünschte Objekt über das Augen-Symbol (letzte Spalte).<br>→ Es öffnet sich eine Vorschau mit der aktuell gesetzten Standardvorlage.</li>
</ol>

<h2>Andere Vorlage verwenden (optional)</h2>
<p>Wenn mindestens zwei Vorlagen aktiv sind, können Sie eine andere Vorlage zuordnen:</p>
<ol>
<li>Klicken Sie auf "Vorlage zuordnen" (1).</li>
<li>Wählen Sie in der Übersicht die gewünschte Vorlage erneut über "Vorlage zuordnen" aus.</li>
<li>Prüfen Sie die aktualisierte Vorschau.</li>
</ol>

<h2>Inhalt erstellen (Anzeige importieren)</h2>
<p>Wenn die Vorschau passt, klicken Sie auf "Inhalt (Anzeige) importieren" (2).</p>
<p>Danach gelangen Sie zurück zur Objektliste.</p>
<p>Die erstellten Inhalte finden Sie anschließend unter Mediathek → OpenImmo.</p>
<p>Eine größere Vorschau öffnen Sie, indem Sie den jeweiligen Inhalt in der Liste anklicken.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Kann ich auch andere Inhalte verwenden?',
    slug: 'kann-ich-auch-andere-inhalte-verwenden',
    excerpt: 'Eigene Inhalte und ESYSYNC-Vorlagen nutzen',
    content: `<p>Ja. Neben importierten Immobilienobjekten können Sie auch weitere Inhalte in der Mediathek ablegen und auf Ihren Displays nutzen. Zusätzlich stellt ESYSYNC vorgefertigte Inhalte, z. B. für besondere Feiertage, zur Verfügung.</p>

<p>Um eigene oder bereitgestellte Inhalte zu verwalten, öffnen Sie die Mediathek und wechseln Sie in den Bereich "Cloud".</p>

<p>Dort finden Sie:</p>
<ul>
<li>Inhalte, die ESYSYNC bereitstellt</li>
<li>Inhalte, die Sie selbst hochgeladen haben</li>
</ul>

<p>Weitere Inhalte können Sie jederzeit über die Cloud hinzufügen.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie lade ich eigene Inhalte in die Mediathek?',
    slug: 'wie-lade-ich-eigene-inhalte-in-mediathek',
    excerpt: 'Dateien über die Cloud hochladen',
    content: `<p>Eigene Inhalte laden Sie über die Mediathek → Cloud hoch.</p>
<ol>
<li>Wählen Sie links in der Ordneransicht den Ordner aus, in den die Datei hochgeladen werden soll.</li>
<li>Klicken Sie oben rechts auf "Inhalt hochladen".</li>
<li>Im geöffneten Dialog können Sie den Zielordner bei Bedarf noch ändern.</li>
<li>Klicken Sie auf "Inhalt auswählen" und wählen Sie die gewünschte Datei auf Ihrem PC aus.
<ul><li>Der Dateiname wird automatisch übernommen und kann bei Bedarf angepasst werden.</li></ul>
</li>
<li>Klicken Sie auf "Hochladen". Danach wird der Inhalt in die Cloud importiert und in der Liste angezeigt.</li>
</ol>
<p><strong>Hinweis:</strong> Unterstützte Dateiformate und Anforderungen (z. B. Bildmaße) finden Sie direkt als Hinweis am Upload-Feld. Wenn ein Format oder eine Größe nicht passt, wird eine entsprechende Fehlermeldung angezeigt.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie verwalte ich die Inhalte auf meinem Display?',
    slug: 'wie-verwalte-ich-inhalte-auf-display',
    excerpt: 'Den Slide-Builder für Ihre Displays nutzen',
    content: `<p>Sobald Sie Inhalte aus importierten Objektdaten (OpenImmo) erstellt und/oder eigene Inhalte in die Mediathek hochgeladen haben, können Sie diese Ihren Displays zuordnen, vorausgesetzt mindestens ein Display ist bereits registriert und aktiv.</p>

<p>Wechseln Sie dazu auf die Seite "Meine Displays".</p>

<p>Klicken Sie anschließend auf das gewünschte Display. Es öffnet sich ein Dialog mit dem Slide-Builder. Dort können Sie die Inhalte des Displays anzeigen, hinzufügen und verwalten.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wo kann ich Verzeichnisse für die Cloud verwalten?',
    slug: 'wo-kann-ich-verzeichnisse-fuer-cloud-verwalten',
    excerpt: 'Ordnerstruktur in der ESYSYNC-Cloud anpassen',
    content: `<p>Die Ordner (Verzeichnisse) Ihrer ESYSYNC-Cloud verwalten Sie in den Account-Einstellungen unter "Datenquellen". Dort sind alle Datenquellen aufgeführt, die in Ihrem Konto verfügbar bzw. aktiviert sind.</p>

<h2>Datenquelle "Cloud" finden</h2>
<ol>
<li>Öffnen Sie in ESYSYNC die Einstellungen.</li>
<li>Wechseln Sie zum Menüpunkt "Datenquellen".
<ul>
<li>In dieser Übersicht sehen Sie alle Datenquellen, die Sie nutzen können (z. B. OpenImmo, Cloud usw.).</li>
<li>Datenquellen lassen sich hier bei Bedarf einblenden/ausblenden, hinzufügen/entfernen, bearbeiten und in der Reihenfolge anpassen.</li>
</ul>
</li>
</ol>

<h2>Cloud-Verzeichnisse bearbeiten, löschen oder neu anlegen</h2>
<ol>
<li>Klicken Sie in der Liste auf die Datenquelle "Cloud".</li>
<li>Im oberen Bereich der Seite erscheinen verschiedene Aktionen/Buttons.</li>
<li>Klicken Sie auf "Bearbeiten".</li>
<li>Im Bearbeitungsbereich können Sie die Cloud-Ordnerstruktur verwalten, z. B.:
<ul>
<li>neue Verzeichnisse erstellen</li>
<li>bestehende Verzeichnisse bearbeiten/umbenennen</li>
<li>Verzeichnisse löschen</li>
</ul>
</li>
</ol>

<p><strong>Hinweis:</strong> Die Verwaltung der Cloud-Verzeichnisse ist auch dann möglich, wenn die Datenquelle "Cloud" aktuell ausgeblendet wurde. Sie können sie jederzeit in den Datenquellen wieder auswählen und bearbeiten.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wo verwalte ich meine Inhalte für die Displays?',
    slug: 'wo-verwalte-ich-inhalte-fuer-displays',
    excerpt: 'Die Mediathek als zentrale Inhaltsverwaltung',
    content: `<p>Alle Inhalte, die Ihnen für die Anzeige auf Ihren Displays zur Verfügung stehen, verwalten Sie in der Mediathek. Dort finden Sie je nach verwendeter Datenquelle unterschiedliche Inhaltstypen:</p>
<ul>
<li>Generierte Inhalte aus importierten Objektdaten (Datenquelle: OpenImmo)</li>
<li>Eigene, hochgeladene Inhalte (Datenquelle: Cloud)</li>
<li>Von AVANTO bereitgestellte Inhalte, z. B. für Feiertage (Datenquelle: Cloud)</li>
</ul>

<h2>Datenquellen auswählen und verwalten</h2>
<p>Welche Datenquellen in Ihrem Konto genutzt werden sollen, legen Sie in den Einstellungen unter "Datenquellen" fest.</p>
<p>Weitere Details finden Sie im Abschnitt "Verwendung von Datenquellen".</p>

<h2>Inhalte als Favoriten markieren</h2>
<p>Wenn Sie Inhalte häufig nutzen, können Sie diese als Favoriten markieren:</p>
<ol>
<li>Öffnen Sie in der Mediathek den gewünschten Inhalt.</li>
<li>Klicken Sie auf das Herz-Symbol unter dem Inhalt, um ihn zu favorisieren.</li>
<li>Um die Favorisierung zu entfernen, klicken Sie erneut auf das Herz, bis es wieder weiß ist.</li>
</ol>
<p>Sobald das Herz schwarz angezeigt wird, erscheint der Inhalt zusätzlich im Slide-Builder unter dem Punkt "Favoriten" (Meine Displays).</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Was sind Vorlagen?',
    slug: 'was-sind-vorlagen-faq',
    excerpt: 'Design-Schablonen für Ihre Immobilienobjekte',
    content: `<p>Vorlagen (Templates) sind Design-Schablonen für Ihre Immobilienobjekte. Die Objektdaten (z. B. Preis, Adresse, Bilder, Eckdaten) werden automatisch in die Vorlage eingesetzt. Daraus erstellt ESYSYNC einen fertigen Inhalt (Bild) für Ihre Displays, der anschließend in der Mediathek abgelegt wird.</p>

<p>Unsere bereitgestellten Vorlagen werden in Verbindung mit der Datenquelle OpenImmo genutzt.</p>

<p>In der Vorschau sehen Sie unsere Standardvorlage, die in jedem Account verfügbar ist. Auf Wunsch können wir Vorlagen auch individuell an Ihr Corporate Design und Ihre Anforderungen anpassen.</p>

<h2>Individuelle Vorlagen</h2>
<p>Beispiele für mögliche Anpassungen finden Sie in den gezeigten Referenzen/Beispielen, die wir für Kunden umgesetzt haben.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Welche Voraussetzungen braucht es, um eine Vorlage zu verwenden?',
    slug: 'voraussetzungen-fuer-vorlage',
    excerpt: 'Aktivierte Vorlage und Marketing-Einstellungen',
    content: `<p>Damit importierte Inhalte mit einer Vorlage (Template) generiert werden können, müssen zwei Voraussetzungen erfüllt sein:</p>
<ol>
<li>Mindestens eine Vorlage ist aktiv.</li>
<li>Die Marketing-Einstellungen sind gepflegt, dazu gehören Farben (Primär- und Sekundärfarbe) und ein Logo.</li>
</ol>
<p>Wenn bereits Objekte importiert wurden, können Sie die Einstellungen anschließend direkt testen, indem Sie eine Vorschau eines Objekts öffnen.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Welche Einstellungen werden für die Nutzung einer Vorlage benötigt?',
    slug: 'einstellungen-fuer-vorlage',
    excerpt: 'Markendetails für Ihre Vorlagen hinterlegen',
    content: `<p>Für die Verwendung von Vorlagen benötigen Sie die Marketing- bzw. Markendetails Ihres Accounts. Diese finden Sie in den Einstellungen unter "Profil".</p>

<p>Dort hinterlegen Sie:</p>
<ul>
<li>Primärfarbe</li>
<li>Sekundärfarbe</li>
<li>Logo</li>
</ul>

<p>Diese Angaben werden in der Vorlage verwendet, damit die generierten Inhalte optisch zu Ihrem Auftritt passen.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie aktiviere ich eine Vorlage?',
    slug: 'wie-aktiviere-ich-vorlage',
    excerpt: 'Vorlagen in den Einstellungen aktivieren',
    content: `<ol>
<li>Öffnen Sie in Ihrem ESYSYNC-Konto die Einstellungen und wechseln Sie zum Menüpunkt "Vorlagen".</li>
<li>Unter "Aktive Vorlagen" sehen Sie alle Vorlagen, die bereits aktiviert sind.</li>
</ol>

<p>Wenn dort noch keine Vorlage angezeigt wird:</p>
<ol start="3">
<li>Öffnen Sie den Bereich "ESYSYNC-Vorlagen" (verfügbare Vorlagen) und importieren/aktivieren Sie die gewünschte Vorlage.</li>
</ol>

<h2>Standardvorlage festlegen (optional)</h2>
<p>Sie können, sofern verfügbar, auch mehrere Vorlagen aktivieren. Zusätzlich können Sie eine davon als Standardvorlage festlegen:</p>
<ul>
<li>Klicken Sie bei der gewünschten Vorlage auf den Button rechts unten.</li>
<li>Ist der Button grün, ist diese Vorlage als Standard gesetzt.</li>
</ul>

<p>Wenn Sie eine Vorlage wünschen, die individuell auf Ihr Design und Ihre Anforderungen abgestimmt ist, kontaktieren Sie uns gerne.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie teste ich, ob meine Vorlage funktioniert?',
    slug: 'wie-teste-ich-vorlage',
    excerpt: 'Vorschau für Ihre Vorlagen-Einstellungen',
    content: `<p>Sobald Ihre Vorlagen- und Marketing-Einstellungen (Farben/Logo) gesetzt sind und bereits mindestens ein Objekt importiert wurde, können Sie die Vorlage direkt über eine Vorschau testen.</p>
<ol>
<li>Öffnen Sie in der Hauptnavigation die Mediathek.</li>
<li>Wählen Sie den Bereich "OpenImmo" aus.</li>
<li>Klicken Sie auf den Button "OpenImmo", um die Liste der importierten Objekte zu öffnen.</li>
<li>Wählen Sie ein Objekt über das Augen-Symbol aus.</li>
</ol>
<p>Daraufhin wird automatisch eine Vorschau mit der aktuell gesetzten Standardvorlage sowie Ihren gespeicherten Farben und dem Logo angezeigt.</p>
<p>Wenn das Layout nicht wie gewünscht ist, können Sie Farben und Logo in den Einstellungen anpassen und die Vorschau erneut prüfen.</p>
<p>Sollte die Vorlage grundsätzlich nicht Ihren Vorstellungen entsprechen, kontaktieren Sie uns gerne - gemeinsam finden wir eine passende Lösung.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie weise ich einem Display Inhalte zu?',
    slug: 'wie-weise-ich-display-inhalte-zu',
    excerpt: 'Inhalte per Drag & Drop zuordnen',
    content: `<p>Inhalte ordnen Sie einem Display im Slide-Builder per Drag & Drop zu.</p>
<ol>
<li>Öffnen Sie Meine Displays und wählen Sie das gewünschte Display aus.</li>
<li>Ziehen Sie die gewünschten Inhalte (z. B. Cloud-Bilder oder OpenImmo-Inhalte) per Drag & Drop in das graue Feld.</li>
<li>Passen Sie die Reihenfolge an, indem Sie die eingefügten Elemente per Drag & Drop verschieben.</li>
</ol>
<p>Auch Inhalte aus "Favoriten" oder "Kürzlich hinzugefügt" können Sie auf die gleiche Weise hinzufügen.</p>
<p>Klicken Sie anschließend auf "Display updaten", um Ihre Änderungen zu übernehmen.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie entferne ich Inhalte von meinem Display?',
    slug: 'wie-entferne-ich-inhalte-von-display',
    excerpt: 'Inhalte aus dem Slide-Builder entfernen',
    content: `<p>Inhalte entfernen Sie im Slide-Builder ebenfalls per Drag & Drop.</p>
<ol>
<li>Öffnen Sie Meine Displays und wählen Sie das gewünschte Display aus.</li>
<li>Markieren Sie im grauen Bereich den Inhalt, den Sie entfernen möchten.</li>
<li>Ziehen Sie den Inhalt per Drag & Drop in den unteren Bereich des Dialogs (Entfernen-Bereich).</li>
<li>Klicken Sie anschließend auf "Display updaten", um die Änderung zu übernehmen.</li>
</ol>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie ändere ich die Reihenfolge der Inhalte auf dem Display?',
    slug: 'wie-aendere-ich-reihenfolge-inhalte',
    excerpt: 'Inhalte im Slide-Builder sortieren',
    content: `<p>Die Reihenfolge ändern Sie im Slide-Builder direkt per Drag & Drop.</p>
<ol>
<li>Öffnen Sie Meine Displays und wählen Sie das gewünschte Display aus.</li>
<li>Im grauen Bereich sehen Sie alle Inhalte, die dem Display zugeordnet sind.</li>
<li>Ziehen Sie die Inhalte per Drag & Drop an die gewünschte Position, um die Reihenfolge anzupassen.</li>
<li>Klicken Sie anschließend auf "Display updaten", um die Änderung zu übernehmen.</li>
</ol>
<p><strong>Hinweis:</strong> Inhalte aus Cloud, OpenImmo, Favoriten oder Kürzlich hinzugefügt können ebenfalls per Drag & Drop hinzugefügt und anschließend genauso sortiert werden.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie lange dauert es, bis der Inhalt auf dem Display wechselt?',
    slug: 'wie-lange-dauert-inhaltswechsel',
    excerpt: 'Wechselzeit im Slide-Builder einstellen',
    content: `<p>Die Wechselzeit zwischen Ihren Inhalten stellen Sie direkt im Slide-Builder ein.</p>
<ol>
<li>Öffnen Sie den Menüpunkt "Displays" (bzw. "Meine Displays") und wählen Sie das gewünschte Display aus.</li>
<li>Im geöffneten Slide-Builder finden Sie rechts oben eine Zeitangabe in Sekunden.</li>
</ol>
<p>Diese Angabe bestimmt, nach wie vielen Sekunden das Display zum nächsten Inhalt wechselt.</p>
<p>Wenn Sie den Wert bisher nicht angepasst haben, wird die Standardeinstellung verwendet.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie kann ich die Anzeigendauer des Displays ändern?',
    slug: 'wie-aendere-ich-anzeigendauer',
    excerpt: 'Anzeigedauer pro Display anpassen',
    content: `<p>Die Anzeigendauer (Wechselzeit) stellen Sie pro Display in den Einstellungen ein.</p>
<ol>
<li>Öffnen Sie die Einstellungen und wechseln Sie zum Menüpunkt "Displays".</li>
<li>In der Liste sehen Sie alle registrierten Geräte. Wählen Sie das gewünschte Display aus.</li>
<li>Passen Sie die Anzeigendauer (in Sekunden) an und speichern Sie die Änderung.</li>
</ol>

<h2>Wichtig: Änderung ans Display übertragen</h2>
<p>Damit die neue Anzeigendauer wirklich übernommen wird, müssen Sie das Display anschließend noch einmal aktualisieren:</p>
<ol>
<li>Wechseln Sie zu "Meine Displays".</li>
<li>Öffnen Sie das betroffene Display (Slide-Builder).</li>
<li>Klicken Sie auf "Display updaten".</li>
</ol>
<p>Erst danach wird die neue Anzeigendauer an das Display übertragen und wirksam.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie ordne ich einem Standort ein Display zu?',
    slug: 'wie-ordne-ich-standort-display-zu',
    excerpt: 'Displays einem Standort zuweisen',
    content: `<p>Sie ordnen ein Display in den Einstellungen einem Standort zu. Voraussetzung ist, dass der Standort bereits in Ihrem Konto angelegt wurde.</p>
<ol>
<li>Öffnen Sie die Einstellungen und wechseln Sie zum Menüpunkt "Displays".</li>
<li>In der Display-Liste werden alle registrierten Geräte angezeigt. Wählen Sie das gewünschte Display aus.</li>
<li>Es öffnet sich ein Dialog mit den Display-Einstellungen.</li>
<li>Wählen Sie dort den passenden Standort aus und speichern Sie die Änderung.</li>
</ol>
<p>Nach der Zuordnung werden Ihre Displays unter "Meine Displays" automatisch nach Standorten gruppiert angezeigt. Displays ohne Standortzuordnung befinden sich am Ende der Liste.</p>
<p>Zusätzlich können Sie die Display-Liste über den Filter "Standort" gezielt eingrenzen.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie aktiviere ich ein Display?',
    slug: 'wie-aktiviere-ich-display',
    excerpt: 'Displays manuell aktivieren und deaktivieren',
    content: `<p>In der Regel übernehmen wir die Aktivierung Ihrer Displays für Sie. Sobald die Geräte vor Ort montiert und mit Strom versorgt sind, sind sie normalerweise direkt aktiv und einsatzbereit. Falls das einmal nicht der Fall ist, kontaktieren Sie bitte unseren Support.</p>

<h2>Display manuell (erneut) aktivieren</h2>
<p>Falls ein Display deaktiviert wurde (auch versehentlich), können Sie es selbst wieder aktivieren.</p>
<ol>
<li>Stellen Sie sicher, dass das Display eingeschaltet ist und Strom hat. Auf dem Display werden zwei Codes angezeigt.</li>
<li>Öffnen Sie in ESYSYNC die Einstellungen und wechseln Sie zu Displays → Displays.</li>
<li>Klicken Sie auf "+ Neues Display", um ein Gerät hinzuzufügen.</li>
<li>Es öffnet sich ein Dialog, in dem Sie die Display-Daten eintragen:
<ul>
<li>Geräte-ID (steht auf dem Display)</li>
<li>Aktivierungsschlüssel (steht auf dem Display)</li>
<li>Seriennummer (steht auf dem Gerät am Rahmen/auf dem Aufkleber; beginnt mit "D" und danach folgen 5 Ziffern)</li>
</ul>
</li>
<li>Klicken Sie auf "Hinzufügen + Aktivieren".</li>
</ol>
<p>Danach sollte das Display in der Übersicht erscheinen.</p>

<h2>Wo sehe ich aktivierte Displays?</h2>
<p>Aktivierte Displays finden Sie unter "Meine Displays".</p>
<p>Ein frisch aktiviertes Display zeigt dort häufig zunächst "NO CONTENT ASSIGNED", solange noch keine Inhalte zugeordnet wurden.</p>

<h2>Display deaktivieren</h2>
<p>Ein Display können Sie ebenfalls in den Einstellungen unter Displays → Displays deaktivieren.</p>
<p>Wenn Sie es später wieder aktivieren möchten, gehen Sie wie oben beschrieben vor.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wo kann ich meine Standorte verwalten?',
    slug: 'wo-kann-ich-standorte-verwalten',
    excerpt: 'Standorte hinzufügen, bearbeiten und löschen',
    content: `<p>Ihre Standorte verwalten Sie in den Einstellungen Ihres ESYSYNC-Accounts.</p>
<ol>
<li>Öffnen Sie die Einstellungen.</li>
<li>Wechseln Sie in den Bereich "Displays".</li>
<li>Öffnen Sie dort die Standort-Liste.</li>
</ol>
<p>In der Standort-Übersicht können Sie Standorte:</p>
<ul>
<li>hinzufügen</li>
<li>bearbeiten</li>
<li>löschen</li>
</ul>
<p>Einen neuen Standort legen Sie über den Button "+ Neuer Standort" an.</p>
<p>Erst danach können Sie diesen Standort einem Display zuordnen.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wo kann ich meine Datenquellen verwalten?',
    slug: 'wo-kann-ich-datenquellen-verwalten',
    excerpt: 'Datenquellen in den Einstellungen konfigurieren',
    content: `<p>Ihre Datenquellen verwalten Sie in den Account-Einstellungen unter dem Menüpunkt "Datenquellen". Dort sind alle verfügbaren bzw. aktivierten Datenquellen Ihres Kontos aufgelistet.</p>
<p>In diesem Bereich können Sie Datenquellen:</p>
<ul>
<li>hinzufügen bzw. einblenden</li>
<li>bearbeiten</li>
<li>löschen</li>
<li>ausblenden/entfernen</li>
<li>sowie die Reihenfolge der Darstellung ändern</li>
</ul>
<p>Klicken Sie in der Liste auf die gewünschte Datenquelle. Im oberen Bereich der Seite erscheinen anschließend die passenden Aktionen/Buttons für die weitere Verwaltung.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie füge ich eine Datenquelle hinzu?',
    slug: 'wie-fuege-ich-datenquelle-hinzu',
    excerpt: 'Neue Datenquellen aktivieren',
    content: `<ol>
<li>Öffnen Sie die Einstellungen und wechseln Sie zum Menüpunkt "Datenquellen".</li>
<li>Klicken Sie auf "+ Datenquelle hinzufügen".
<ul><li>Ist der Button deaktiviert, sind bereits alle verfügbaren Datenquellen hinzugefügt.</li></ul>
</li>
<li>Es öffnet sich ein Dialog. Wählen Sie die gewünschte Datenquelle aus und tragen Sie die erforderlichen Angaben ein.</li>
<li>Speichern Sie die Datenquelle.</li>
</ol>
<p>Nach dem Speichern erscheint die neue Datenquelle in der Übersichtsliste.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie kann ich Datenquellen bearbeiten?',
    slug: 'wie-kann-ich-datenquellen-bearbeiten',
    excerpt: 'Einstellungen von Datenquellen ändern',
    content: `<ol>
<li>Öffnen Sie die Einstellungen und wechseln Sie zu "Datenquellen".</li>
<li>Wählen Sie in der Liste die Datenquelle aus, die Sie bearbeiten möchten.</li>
<li>Im oberen Bereich der Seite erscheint der Button "Bearbeiten". Klicken Sie darauf.</li>
<li>Nehmen Sie die gewünschten Änderungen vor und speichern Sie diese.</li>
</ol>
<p><strong>Hinweis (Cloud):</strong> Über "Bearbeiten" können Sie bei der Datenquelle "Cloud" auch die Verzeichnisse verwalten - also Ordner anlegen, bearbeiten oder löschen. Das ist auch möglich, wenn die Datenquelle "Cloud" aktuell ausgeblendet ist.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie kann ich Datenquellen löschen bzw. ausblenden?',
    slug: 'wie-kann-ich-datenquellen-loeschen-ausblenden',
    excerpt: 'Datenquellen entfernen oder temporär ausblenden',
    content: `<ol>
<li>Öffnen Sie die Einstellungen und wechseln Sie zu "Datenquellen".</li>
<li>Wählen Sie in der Liste die gewünschte Datenquelle aus.</li>
<li>Im oberen Bereich der Seite erscheinen die Aktionen "Löschen" und/oder "Ausblenden".</li>
</ol>

<h2>Datenquelle löschen</h2>
<p>Wenn Sie auf "Löschen" klicken, erscheint eine Sicherheitsabfrage, um ein versehentliches Entfernen zu vermeiden. Folgen Sie den Hinweisen und bestätigen Sie den Vorgang.</p>
<p>Eine gelöschte Datenquelle kann später wieder hinzugefügt werden. Je nach Datenquelle müssen dabei die zuvor hinterlegten Angaben ggf. erneut eingetragen werden.</p>

<h2>Datenquelle ausblenden</h2>
<p>Wenn Sie eine Datenquelle ausblenden, bleibt sie weiterhin im Konto vorhanden, wird aber in ESYSYNC an den entsprechenden Stellen nicht mehr angezeigt.</p>
<p><strong>Wichtig:</strong> Beim Ausblenden bleiben alle enthaltenen Daten erhalten.</p>`
  },
  {
    categorySlug: 'haeufig-gestellte-fragen',
    title: 'Wie kann ich die Anzeige der Datenquellen in der Reihenfolge ändern?',
    slug: 'wie-aendere-ich-reihenfolge-datenquellen',
    excerpt: 'Datenquellen sortieren',
    content: `<ol>
<li>Öffnen Sie die Einstellungen und wechseln Sie zu "Datenquellen".</li>
<li>Klicken Sie oben auf das Drei-Punkte-Menü.</li>
<li>Wählen Sie den Punkt "Datenquellen sortieren".</li>
</ol>
<p>Danach wechselt die Ansicht der Liste: Am Anfang jeder Zeile erscheint ein Drag-&-Drop-Bereich, mit dem Sie die Datenquellen per Maus nach oben oder unten verschieben können.</p>
<p>Klicken Sie anschließend auf "Speichern", um die neue Reihenfolge zu übernehmen.</p>
<p>Die Sortierung ist danach in der Mediathek und im Slide-Builder sichtbar.</p>`
  },

  // ========== DIE OPENIMMO-SCHNITTSTELLE ==========
  {
    categorySlug: 'die-openimmo-schnittstelle',
    title: 'Schnittstelle einrichten und Daten exportieren',
    slug: 'schnittstelle-einrichten-daten-exportieren',
    excerpt: 'OpenImmo-Export aus Ihrem Immobilienportal konfigurieren',
    content: `<p>OpenImmo beschreibt ein standardisiertes Datenformat auf Basis von XML / XML-Schema. Wenn Sie mehr über OpenImmo erfahren möchten, finden Sie weitere Informationen hier.</p>

<h2>Unterstützte Immobiliensysteme</h2>
<p>Mit der OpenImmo-Schnittstelle können Sie Immobilienobjekte aus verschiedenen Immobilienverwaltungssystemen direkt in Ihr ESYSYNC-Konto importieren. Aktuell unterstützen wir:</p>
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
<p>Ist Ihr System nicht dabei? Melden Sie sich gern bei uns, wir prüfen eine passende Lösung.</p>
<p>Als Beispiel erklären wir den Export anhand von onOffice. In anderen Portalen ist die Vorgehensweise in der Regel ähnlich.</p>

<h2>Konfiguration für Immobilienportale</h2>
<p>Im folgenden Abschnitt finden Sie Anleitungen zur Einrichtung je Portal. Je nach Software-Version kann die Darstellung und Benennung einzelner Punkte leicht abweichen.</p>
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
<p>Sobald der Export in Ihrem Immobilienportal erfolgreich eingerichtet ist, werden die Daten automatisch in ESYSYNC importiert.</p>
<p>So prüfen Sie den Import:</p>
<ol>
<li>Öffnen Sie die Mediathek.</li>
<li>Wechseln Sie zur Unterseite "OpenImmo".</li>
<li>Klicken Sie auf den Button "OpenImmo".</li>
<li>Dort sehen Sie alle automatisch importierten Objekte.</li>
</ol>

<h3>Import-Status</h3>
<p>Wenn aktuell ein Import läuft, erkennen Sie das am Symbol rechts unten im Browser.</p>
<p>Per Klick auf das Symbol öffnen Sie die Import-Details. Mehrere Importe können parallel ausgeführt werden.</p>`
  },
  {
    categorySlug: 'die-openimmo-schnittstelle',
    title: 'Immobilieninhalte generieren',
    slug: 'immobilieninhalte-generieren-openimmo',
    excerpt: 'Anzeigen aus importierten Objektdaten erstellen',
    content: `<p>Wenn die OpenImmo-Schnittstelle korrekt eingerichtet ist und ein Export aus Ihrem Immobilienportal erfolgt, werden Ihre Objekte automatisch in ESYSYNC importiert. Damit die Objekte auf Ihren Displays angezeigt werden können, müssen daraus anschließend Inhalte (Anzeigen) generiert werden.</p>

<h2>Inhalte aus OpenImmo-Objekten generieren</h2>
<ol>
<li>Öffnen Sie die Mediathek und wählen Sie "OpenImmo".
<ul>
<li>Bereits generierte Inhalte werden hier angezeigt.</li>
<li>Die importierten Objektdaten finden Sie über den Button "OpenImmo".</li>
</ul>
</li>
<li>Wählen Sie in der Objektliste das gewünschte Objekt über das Augen-Symbol (letzte Spalte) aus.<br>→ Es öffnet sich eine Vorschau mit der aktuell gesetzten Standardvorlage.</li>
</ol>

<h2>Andere Vorlage zuordnen (optional)</h2>
<p>Wenn Sie mindestens zwei Vorlagen aktiviert haben, können Sie eine andere Vorlage verwenden:</p>
<ol>
<li>Klicken Sie in der Vorschau auf "Vorlage zuordnen" (1).</li>
<li>Wählen Sie in der Übersicht die gewünschte Vorlage erneut über "Vorlage zuordnen" aus.</li>
<li>Prüfen Sie anschließend die aktualisierte Vorschau.</li>
</ol>

<h2>Inhalt importieren (Anzeige erstellen)</h2>
<p>Wenn die Vorschau wie gewünscht aussieht, klicken Sie abschließend auf "Inhalt (Anzeige) importieren" (2). Danach gelangen Sie zurück zur Objektübersicht.</p>
<p>Die erstellten Inhalte finden Sie anschließend unter Mediathek → OpenImmo.</p>
<p>Eine vergrößerte Ansicht öffnen Sie, indem Sie in der Inhaltsliste auf den jeweiligen Inhalt klicken.</p>`
  },
  {
    categorySlug: 'die-openimmo-schnittstelle',
    title: 'Konfiguration für onOffice',
    slug: 'konfiguration-fuer-onoffice',
    excerpt: 'OpenImmo-Export in onOffice einrichten',
    content: `<p>Mit den folgenden Schritten richten Sie in onOffice den OpenImmo-Export für ESYSYNC ein.</p>

<h2>Schritt 1: Portal-Einstellungen öffnen</h2>
<p>Melden Sie sich in onOffice an und navigieren Sie zu:</p>
<p>Extras → Einstellungen → Grundeinstellungen</p>
<p>Wählen Sie anschließend in der Navigation den Punkt "Portale" aus. Hier können Sie ein Portal für die Verbindung mit Ihrem ESYSYNC-Konto einrichten.</p>

<h2>Schritt 2: Neues Portal anlegen</h2>
<p>Klicken Sie oben links auf das "+"-Symbol.</p>
<p>Wählen Sie ein freies Portal aus und klicken Sie auf "Portal hinzufügen".</p>

<h2>Schritt 3: Portal konfigurieren</h2>
<p>Klicken Sie auf das neu angelegte Portal, um die Einstellungen zu öffnen, und nehmen Sie die Konfiguration vor:</p>
<ul>
<li><strong>Portalname:</strong> Vergeben Sie einen passenden Namen, z. B. "ESYSYNC Übertragung".</li>
<li><strong>FTP-Zugangsdaten:</strong> Tragen Sie FTP-Server, FTP-Benutzer und FTP-Passwort ein. Diese Angaben finden Sie in ESYSYNC unter Einstellungen → Datenquellen → OpenImmo. Achten Sie außerdem darauf, dass im Feld "Software" das richtige System ausgewählt ist (hier: onOffice).</li>
<li><strong>Format:</strong> Stellen Sie das Export-Format auf OpenImmo 1.27 (XML).</li>
</ul>`
  },
  {
    categorySlug: 'die-openimmo-schnittstelle',
    title: 'Objekte importieren am Beispiel "onOffice"',
    slug: 'objekte-importieren-beispiel-onoffice',
    excerpt: 'Immobilienobjekte aus onOffice nach ESYSYNC exportieren',
    content: `<p>In diesem Abschnitt erfahren Sie, wie Sie Ihre Immobilienobjekte in onOffice exportieren, damit sie anschließend automatisch in ESYSYNC importiert werden. Die Schritte werden am Beispiel onOffice beschrieben.</p>

<h2>Export Ihrer Objekte in onOffice</h2>
<ol>
<li>Öffnen Sie in Ihrem onOffice-Account den Bereich Immobilien und wählen Sie mindestens ein Objekt aus, das Sie nach ESYSYNC übertragen möchten.</li>
<li>Wechseln Sie zum Tab "Vermarktung" und wählen Sie das Portal aus, in das exportiert werden soll.
<ul><li>Starten Sie den Export über "Hochladen" oder über "Aktualisieren" (für alle Portale).</li></ul>
</li>
<li>Öffnen Sie anschließend Aktionen → Immobilien-Aktionen → Portalvollabgleich.</li>
<li>Wählen Sie im Dropdown "Vollabgleich", markieren Sie das gewünschte Portal und klicken Sie auf "Weiter".</li>
<li>Aktivieren Sie "umgehend" für den sofortigen Export und bestätigen Sie mit "OK".</li>
</ol>

<h2>Import in ESYSYNC</h2>
<p>Sobald der Export abgeschlossen ist, werden die Daten automatisch in ESYSYNC importiert. Je nach Umfang der Daten passiert das in der Regel innerhalb von Sekunden bis wenigen Minuten.</p>
<p><strong>Hinweis:</strong> Nicht jedes Portal unterstützt einen sofortigen Datenabgleich. Je nach Anbieter kann der Export auch mehrere Stunden dauern. Sobald der Export jedoch erfolgt ist, startet der Import in ESYSYNC umgehend und automatisch.</p>`
  },

  // ========== DISPLAYS VERWALTEN UND KONFIGURIEREN ==========
  {
    categorySlug: 'displays-verwalten-und-konfigurieren',
    title: 'Inhalte auf das Display laden',
    slug: 'inhalte-auf-display-laden',
    excerpt: 'Inhalte aus der Mediathek Ihren Displays zuweisen',
    content: `<p>Sobald Sie Inhalte aus importierten Objektdaten (OpenImmo) erstellt und/oder eigene Inhalte (Cloud) in die Mediathek hochgeladen haben, können Sie diese einem Display zuordnen, vorausgesetzt mindestens ein Display ist bereits registriert und aktiv.</p>
<p>Wechseln Sie dazu auf "Meine Displays".</p>

<h2>Slide-Builder öffnen</h2>
<p>Klicken Sie auf das gewünschte Display. Es öffnet sich ein Dialog mit dem Slide-Builder. Dort verwalten Sie die Inhalte, die auf dem Display angezeigt werden.</p>

<h2>Inhalte hinzufügen und sortieren</h2>
<ol>
<li>Ziehen Sie die gewünschten Inhalte per Drag & Drop in das graue Feld.
<ul><li>Sie können sowohl Cloud-Inhalte (z. B. hochgeladene Bilder) als auch OpenImmo-Inhalte hinzufügen.</li></ul>
</li>
<li>Passen Sie die Reihenfolge an, indem Sie die eingefügten Elemente im grauen Bereich per Drag & Drop verschieben.</li>
<li>Inhalte aus "Favoriten" oder "Kürzlich hinzugefügt" können Sie auf die gleiche Weise hinzufügen.</li>
</ol>
<p>Klicken Sie anschließend auf "Display updaten", um Ihre Änderungen zu übernehmen.</p>

<h2>Inhalte entfernen</h2>
<ol>
<li>Wählen Sie im grauen Bereich den Inhalt aus, den Sie entfernen möchten.</li>
<li>Ziehen Sie ihn per Drag & Drop in den unteren Bereich des Dialogs (Entfernen-Bereich).</li>
<li>Klicken Sie anschließend auf "Display updaten", um die Änderung zu übernehmen.</li>
</ol>`
  },
  {
    categorySlug: 'displays-verwalten-und-konfigurieren',
    title: 'Anzeigedauer im Slide-Builder',
    slug: 'anzeigedauer-im-slide-builder',
    excerpt: 'Wechselzeit zwischen Inhalten einstellen',
    content: `<p>Öffnen Sie den Menüpunkt "Meine Displays" (bzw. "Displays") und wählen Sie das gewünschte Gerät aus. Daraufhin öffnet sich der Slide-Builder, über den Sie Inhalte per Drag & Drop zuordnen können.</p>
<p>Rechts oben im Slide-Builder sehen Sie eine Zeitangabe in Sekunden. Diese bestimmt, nach wie vielen Sekunden das Display zum nächsten Inhalt wechselt. Wenn Sie den Wert bisher nicht angepasst haben, wird die Standardeinstellung verwendet.</p>

<h2>Anzeigedauer pro Display anpassen</h2>
<p>Die Anzeigedauer ändern Sie in den Einstellungen:</p>
<ol>
<li>Öffnen Sie die Einstellungen und wechseln Sie zu "Displays".</li>
<li>Wählen Sie in der Geräteliste das gewünschte Display aus.</li>
<li>Passen Sie die Anzeigedauer an und speichern Sie die Änderung.</li>
</ol>

<h2>Wichtig: Änderungen ans Display übertragen</h2>
<p>Damit der neue Wert tatsächlich am Display ankommt, müssen Sie das Display anschließend noch einmal aktualisieren:</p>
<ol>
<li>Wechseln Sie zu "Meine Displays".</li>
<li>Öffnen Sie das betroffene Display (Slide-Builder).</li>
<li>Klicken Sie auf "Display updaten".</li>
</ol>
<p>Erst danach wird die geänderte Anzeigedauer auf das Display übertragen und wirksam.</p>`
  },
  {
    categorySlug: 'displays-verwalten-und-konfigurieren',
    title: 'Aktivierung und Deaktivierung von Displays',
    slug: 'aktivierung-deaktivierung-displays',
    excerpt: 'Displays aktivieren, deaktivieren und verwalten',
    content: `<p>In der Regel übernehmen wir die Aktivierung Ihrer Displays für Sie. Sobald die Geräte vor Ort montiert und mit Strom versorgt sind, sind sie normalerweise direkt aktiv und einsatzbereit. Falls das einmal nicht der Fall ist, kontaktieren Sie bitte unseren Support.</p>

<h2>Display aktivieren (manuell / erneut aktivieren)</h2>
<p>Wenn ein Display deaktiviert wurde (auch versehentlich), können Sie es selbst wieder aktivieren.</p>
<ol>
<li>Stellen Sie sicher, dass das Display eingeschaltet ist und Strom hat. Auf dem Display werden zwei Codes angezeigt.</li>
<li>Öffnen Sie in ESYSYNC die Einstellungen und wechseln Sie zu Displays → Displays.</li>
<li>Klicken Sie auf "+ Neues Display", um ein Gerät hinzuzufügen.</li>
<li>Im geöffneten Dialog tragen Sie die erforderlichen Angaben ein:
<ul>
<li>Geräte-ID (wird auf dem Display angezeigt)</li>
<li>Aktivierungsschlüssel (wird auf dem Display angezeigt)</li>
<li>Seriennummer (steht am Gerät auf dem Aufkleber am Rahmen; beginnt mit "D" und es folgen 5 Ziffern)</li>
</ul>
</li>
<li>Klicken Sie auf "Hinzufügen + Aktivieren". Danach erscheint das Display in der Übersicht.</li>
</ol>

<h2>Wo sehe ich aktivierte Displays?</h2>
<p>Aktivierte Displays finden Sie unter "Meine Displays".</p>
<p>Ein frisch aktiviertes Display zeigt häufig zunächst "NO CONTENT ASSIGNED", solange noch keine Inhalte zugeordnet wurden.</p>

<h2>Display deaktivieren</h2>
<p>Ein Display können Sie ebenfalls in den Einstellungen unter Displays → Displays deaktivieren.</p>
<p>Wenn Sie es später wieder aktivieren möchten, gehen Sie wie oben beschrieben vor.</p>`
  },

  // ========== INHALTE ERSTELLEN UND BEREITSTELLEN ==========
  {
    categorySlug: 'inhalte-erstellen-und-bereitstellen',
    title: 'Übersicht der Mediathek',
    slug: 'uebersicht-der-mediathek',
    excerpt: 'Die zentrale Inhaltsverwaltung in ESYSYNC',
    content: `<p>Alle Inhalte, die Ihnen für die Anzeige auf Ihren Displays zur Verfügung stehen, verwalten Sie in der Mediathek. Dort finden Sie je nach verwendeter Datenquelle unterschiedliche Inhaltstypen:</p>
<ul>
<li>Generierte Inhalte aus importierten Objektdaten (Datenquelle: OpenImmo)</li>
<li>Eigene, hochgeladene Inhalte (Datenquelle: Cloud)</li>
<li>Von AVANTO bereitgestellte Inhalte, z. B. für Feiertage (Datenquelle: Cloud)</li>
</ul>

<h2>Datenquellen auswählen und verwalten</h2>
<p>Welche Datenquellen in Ihrem Konto genutzt werden sollen, legen Sie in den Einstellungen unter "Datenquellen" fest.</p>
<p>Weitere Details finden Sie im Abschnitt "Verwendung von Datenquellen".</p>

<h2>Inhalte als Favoriten markieren</h2>
<p>Wenn Sie Inhalte häufig nutzen, können Sie diese als Favoriten markieren:</p>
<ol>
<li>Öffnen Sie in der Mediathek den gewünschten Inhalt.</li>
<li>Klicken Sie auf das Herz-Symbol unter dem Inhalt, um ihn zu favorisieren.</li>
<li>Um die Favorisierung zu entfernen, klicken Sie erneut auf das Herz, bis es wieder weiß ist.</li>
</ol>
<p>Sobald das Herz schwarz angezeigt wird, erscheint der Inhalt zusätzlich im Slide-Builder unter dem Punkt "Favoriten" (Meine Displays).</p>`
  },
  {
    categorySlug: 'inhalte-erstellen-und-bereitstellen',
    title: 'Eigene Inhalte hochladen',
    slug: 'eigene-inhalte-hochladen',
    excerpt: 'Bilder und Dateien in die Cloud laden',
    content: `<p>Neben importierten Immobilienobjekten können Sie auch eigene Inhalte in der Mediathek ablegen und auf Ihren Displays nutzen. Zusätzlich stellt ESYSYNC vorgefertigte Inhalte, z. B. für Feiertage, zur Verfügung.</p>
<p>Öffnen Sie dazu die Mediathek und wählen Sie den Bereich "Cloud".</p>

<h2>Inhalte in der Cloud</h2>
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
<li>Im geöffneten Dialog können Sie den Zielordner bei Bedarf noch ändern.</li>
<li>Klicken Sie auf "Inhalt auswählen" und wählen Sie die Datei auf Ihrem PC aus.
<ul><li>Der Dateiname wird automatisch übernommen und kann bei Bedarf angepasst werden.</li></ul>
</li>
<li>Klicken Sie auf "Hochladen". Danach erscheint der Inhalt in der Cloud-Liste.</li>
</ol>
<p><strong>Hinweis:</strong> Unterstützte Dateiformate und Anforderungen (z. B. Maße) finden Sie direkt als Hinweis am Upload-Feld. Bei nicht passenden Dateien zeigt ESYSYNC eine Fehlermeldung an.</p>

<h2>Unterordner erstellen</h2>
<p>Wenn Sie neue Unterordner anlegen möchten, wechseln Sie zu den Einstellungen und öffnen dort "Datenquellen". Details finden Sie im Abschnitt "Verwendung von Datenquellen".</p>

<h2>Inhalte von ESYSYNC (z. B. Feiertage)</h2>
<p>In der Cloud finden Sie zusätzlich frei nutzbare Inhalte, z. B. für Feiertage. Diese können Sie bei Bedarf direkt für Ihre Displays verwenden.</p>`
  },
  {
    categorySlug: 'inhalte-erstellen-und-bereitstellen',
    title: 'Verwendung von Datenquellen',
    slug: 'verwendung-von-datenquellen',
    excerpt: 'Datenquellen einrichten und verwalten',
    content: `<p>Ihre Datenquellen verwalten Sie in den Account-Einstellungen unter dem Menüpunkt "Datenquellen". Dort sind alle verfügbaren bzw. aktivierten Datenquellen Ihres Kontos aufgelistet.</p>

<h2>Datenquellen verwalten</h2>
<p>In diesem Bereich können Sie Datenquellen:</p>
<ul>
<li>hinzufügen bzw. einblenden</li>
<li>bearbeiten</li>
<li>löschen</li>
<li>ausblenden/entfernen</li>
<li>sowie die Reihenfolge der Darstellung ändern</li>
</ul>
<p>Klicken Sie in der Liste auf die gewünschte Datenquelle. Im oberen Bereich der Seite erscheinen anschließend die passenden Aktionen/Buttons für die weitere Verwaltung.</p>

<h2>Datenquelle hinzufügen</h2>
<ol>
<li>Klicken Sie auf "+ Datenquelle hinzufügen".
<ul><li>Ist der Button deaktiviert, sind bereits alle verfügbaren Datenquellen hinzugefügt.</li></ul>
</li>
<li>Es öffnet sich ein Dialog. Wählen Sie die gewünschte Datenquelle aus und tragen Sie die erforderlichen Angaben ein.</li>
<li>Speichern Sie die Datenquelle.</li>
</ol>

<h2>Datenquelle bearbeiten</h2>
<ol>
<li>Wählen Sie in der Liste die Datenquelle aus, die Sie bearbeiten möchten.</li>
<li>Im oberen Bereich der Seite erscheint der Button "Bearbeiten". Klicken Sie darauf.</li>
<li>Nehmen Sie die gewünschten Änderungen vor und speichern Sie diese.</li>
</ol>
<p><strong>Hinweis (Cloud):</strong> Über "Bearbeiten" können Sie bei der Datenquelle "Cloud" auch die Verzeichnisse verwalten.</p>`
  },
  {
    categorySlug: 'inhalte-erstellen-und-bereitstellen',
    title: 'Inhalte als Favoriten markieren',
    slug: 'inhalte-als-favoriten-markieren',
    excerpt: 'Häufig genutzte Inhalte schneller finden',
    content: `<p>Wenn Sie Inhalte häufig nutzen, können Sie diese als Favoriten markieren. So finden Sie sie schneller im Slide-Builder.</p>

<h2>Inhalt favorisieren</h2>
<ol>
<li>Öffnen Sie in der Mediathek den gewünschten Inhalt.</li>
<li>Klicken Sie auf das Herz-Symbol unter dem Inhalt, um ihn zu favorisieren.</li>
</ol>
<p>Sobald das Herz schwarz angezeigt wird, erscheint der Inhalt zusätzlich im Slide-Builder unter dem Punkt "Favoriten".</p>

<h2>Favorit entfernen</h2>
<p>Um die Favorisierung zu entfernen, klicken Sie erneut auf das Herz, bis es wieder weiß ist.</p>`
  },
  {
    categorySlug: 'inhalte-erstellen-und-bereitstellen',
    title: 'Cloud-Verzeichnisse verwalten',
    slug: 'cloud-verzeichnisse-verwalten',
    excerpt: 'Ordnerstruktur in der ESYSYNC-Cloud anpassen',
    content: `<p>Die Ordner (Verzeichnisse) Ihrer ESYSYNC-Cloud verwalten Sie in den Account-Einstellungen unter "Datenquellen".</p>

<h2>Datenquelle "Cloud" finden</h2>
<ol>
<li>Öffnen Sie in ESYSYNC die Einstellungen.</li>
<li>Wechseln Sie zum Menüpunkt "Datenquellen".
<ul><li>In dieser Übersicht sehen Sie alle Datenquellen, die Sie nutzen können.</li></ul>
</li>
</ol>

<h2>Cloud-Verzeichnisse bearbeiten, löschen oder neu anlegen</h2>
<ol>
<li>Klicken Sie in der Liste auf die Datenquelle "Cloud".</li>
<li>Im oberen Bereich der Seite erscheinen verschiedene Aktionen/Buttons.</li>
<li>Klicken Sie auf "Bearbeiten".</li>
<li>Im Bearbeitungsbereich können Sie die Cloud-Ordnerstruktur verwalten:
<ul>
<li>neue Verzeichnisse erstellen</li>
<li>bestehende Verzeichnisse bearbeiten/umbenennen</li>
<li>Verzeichnisse löschen</li>
</ul>
</li>
</ol>
<p><strong>Hinweis:</strong> Die Verwaltung der Cloud-Verzeichnisse ist auch dann möglich, wenn die Datenquelle "Cloud" aktuell ausgeblendet wurde.</p>`
  },

  // ========== VORLAGEN ==========
  {
    categorySlug: 'vorlagen',
    title: 'Was sind Vorlagen?',
    slug: 'was-sind-vorlagen',
    excerpt: 'Design-Schablonen für Ihre Immobilienobjekte',
    content: `<p>Vorlagen (Templates) sind Design-Schablonen für Ihre Immobilienobjekte. Die Objektdaten (z. B. Preis, Adresse, Bilder, Eckdaten) werden automatisch in die Vorlage eingesetzt. Daraus erstellt ESYSYNC einen fertigen Inhalt (Bild) für Ihre Displays, der anschließend in der Mediathek abgelegt wird.</p>

<p>Unsere bereitgestellten Vorlagen werden in Verbindung mit der Datenquelle OpenImmo genutzt.</p>

<p>In der Vorschau sehen Sie unsere Standardvorlage, die in jedem Account verfügbar ist. Auf Wunsch können wir Vorlagen auch individuell an Ihr Corporate Design und Ihre Anforderungen anpassen.</p>

<h2>Individuelle Vorlagen</h2>
<p>Beispiele für mögliche Anpassungen finden Sie in den gezeigten Referenzen/Beispielen, die wir für Kunden umgesetzt haben.</p>`
  },
  {
    categorySlug: 'vorlagen',
    title: 'Vorlage aktivieren',
    slug: 'vorlage-aktivieren-vorlagen',
    excerpt: 'Vorlagen für Ihre Immobilienanzeigen einrichten',
    content: `<p>Damit Sie für importierte Inhalte eine Vorlage (Template) verwenden können, sind zwei Voraussetzungen nötig:</p>
<ol>
<li>Mindestens eine Vorlage ist aktiv.</li>
<li>Die Marketing-Einstellungen sind gepflegt (Farben + Logo).</li>
</ol>
<p>Wenn bereits Objekte importiert wurden, können Sie die Einstellungen anschließend direkt testen.</p>

<h2>1) Vorlage aktivieren</h2>
<ol>
<li>Öffnen Sie in Ihrem Account die Einstellungen und wechseln Sie zu "Vorlagen".</li>
<li>Unter "Aktive Vorlagen" sehen Sie alle Vorlagen, die aktuell aktiviert sind.</li>
<li>Wenn dort noch keine Vorlage erscheint, wählen Sie unter "ESYSYNC-Vorlagen" eine Vorlage aus und importieren/aktivieren Sie diese.</li>
</ol>

<h2>Standardvorlage festlegen</h2>
<p>Sie können mehrere Vorlagen aktivieren. Zusätzlich können Sie eine aktive Vorlage als Standardvorlage festlegen:</p>
<p>Klicken Sie dazu auf den Button der jeweiligen Vorlage (rechts unten). Ist der Button grün, ist diese Vorlage als Standard gesetzt.</p>

<h2>2) Marketing-Einstellungen für die Vorlage</h2>
<p>Unter Einstellungen → Konto → Markendetails hinterlegen Sie:</p>
<ul>
<li>Primärfarbe</li>
<li>Sekundärfarbe</li>
<li>Logo</li>
</ul>`
  },
  {
    categorySlug: 'vorlagen',
    title: 'Vorlage testen (Vorschau)',
    slug: 'vorlage-testen-vorschau',
    excerpt: 'Vorschau für Ihre Vorlagen-Einstellungen',
    content: `<p>Sobald Ihre Vorlagen- und Marketing-Einstellungen (Farben/Logo) gesetzt sind und bereits mindestens ein Objekt importiert wurde, können Sie die Vorlage direkt über eine Vorschau testen.</p>
<ol>
<li>Öffnen Sie in der Hauptnavigation die Mediathek.</li>
<li>Wählen Sie den Bereich "OpenImmo" aus.</li>
<li>Klicken Sie auf den Button "OpenImmo", um die Liste der importierten Objekte zu öffnen.</li>
<li>Wählen Sie ein Objekt über das Augen-Symbol aus.</li>
</ol>
<p>Daraufhin wird automatisch eine Vorschau mit der aktuell gesetzten Standardvorlage sowie Ihren gespeicherten Farben und dem Logo angezeigt.</p>
<p>Wenn das Layout nicht wie gewünscht ist, können Sie Farben und Logo in den Einstellungen anpassen und die Vorschau erneut prüfen.</p>
<p>Sollte die Vorlage grundsätzlich nicht Ihren Vorstellungen entsprechen, kontaktieren Sie uns gerne - gemeinsam finden wir eine passende Lösung.</p>`
  },

  // ========== WIEDERGABELISTEN ==========
  {
    categorySlug: 'wiedergabelisten',
    title: 'Was sind Wiedergabelisten?',
    slug: 'was-sind-wiedergabelisten',
    excerpt: 'Inhalte für mehrere Displays organisieren',
    content: `<p>Wiedergabelisten (Playlists) ermöglichen es Ihnen, Inhalte zentral zu organisieren und mehreren Displays gleichzeitig zuzuweisen.</p>

<p>Anstatt jedem Display einzeln Inhalte zuzuordnen, erstellen Sie eine Wiedergabeliste mit den gewünschten Inhalten und weisen diese Liste dann einem oder mehreren Displays zu.</p>

<h2>Vorteile von Wiedergabelisten</h2>
<ul>
<li>Zentrale Verwaltung von Inhalten für mehrere Displays</li>
<li>Änderungen wirken sich automatisch auf alle zugeordneten Displays aus</li>
<li>Zeitersparnis bei der Verwaltung mehrerer Geräte</li>
</ul>`
  },
  {
    categorySlug: 'wiedergabelisten',
    title: 'Wiedergabeliste erstellen',
    slug: 'wiedergabeliste-erstellen',
    excerpt: 'Neue Playlist für Ihre Displays anlegen',
    content: `<p>Um eine neue Wiedergabeliste zu erstellen, gehen Sie wie folgt vor:</p>
<ol>
<li>Öffnen Sie die Einstellungen.</li>
<li>Wechseln Sie zum Bereich "Wiedergabelisten".</li>
<li>Klicken Sie auf "+ Neue Wiedergabeliste".</li>
<li>Vergeben Sie einen Namen für die Liste.</li>
<li>Fügen Sie die gewünschten Inhalte per Drag & Drop hinzu.</li>
<li>Speichern Sie die Wiedergabeliste.</li>
</ol>

<h2>Inhalte zur Wiedergabeliste hinzufügen</h2>
<p>Sie können Inhalte aus verschiedenen Quellen hinzufügen:</p>
<ul>
<li>OpenImmo (generierte Immobilienanzeigen)</li>
<li>Cloud (eigene Uploads und ESYSYNC-Inhalte)</li>
<li>Favoriten</li>
</ul>

<p>Die Reihenfolge der Inhalte können Sie per Drag & Drop anpassen.</p>`
  },
  {
    categorySlug: 'wiedergabelisten',
    title: 'Wiedergabeliste einem Display zuweisen',
    slug: 'wiedergabeliste-display-zuweisen',
    excerpt: 'Displays mit Wiedergabelisten verknüpfen',
    content: `<p>Nachdem Sie eine Wiedergabeliste erstellt haben, können Sie diese einem oder mehreren Displays zuweisen.</p>

<h2>Wiedergabeliste zuweisen</h2>
<ol>
<li>Öffnen Sie "Meine Displays".</li>
<li>Wählen Sie das gewünschte Display aus.</li>
<li>Im Slide-Builder wählen Sie die Option "Wiedergabeliste verwenden".</li>
<li>Wählen Sie die gewünschte Wiedergabeliste aus der Liste.</li>
<li>Klicken Sie auf "Display updaten".</li>
</ol>

<h2>Änderungen an der Wiedergabeliste</h2>
<p>Wenn Sie Änderungen an einer Wiedergabeliste vornehmen (z. B. Inhalte hinzufügen oder entfernen), müssen Sie die zugeordneten Displays anschließend aktualisieren:</p>
<ol>
<li>Öffnen Sie "Meine Displays".</li>
<li>Wählen Sie jedes betroffene Display aus.</li>
<li>Klicken Sie auf "Display updaten".</li>
</ol>
<p>Erst dann werden die Änderungen auf die Displays übertragen.</p>`
  }
]

async function main() {
  console.log('Importiere alle Anleitungen...\n')

  const categories = await prisma.guideCategory.findMany()
  const catMap = new Map(categories.map(c => [c.slug, c.id]))

  let created = 0
  let skipped = 0

  for (const guide of guides) {
    const categoryId = catMap.get(guide.categorySlug)
    if (!categoryId) {
      console.log(`❌ Kategorie nicht gefunden: ${guide.categorySlug}`)
      continue
    }

    const existing = await prisma.guide.findUnique({ where: { slug: guide.slug } })
    
    if (existing) {
      console.log(`⏭️  "${guide.title}" existiert bereits`)
      skipped++
    } else {
      await prisma.guide.create({
        data: {
          title: guide.title,
          slug: guide.slug,
          excerpt: guide.excerpt,
          content: guide.content,
          categoryId,
          published: true,
          publishedAt: new Date()
        }
      })
      console.log(`✅ "${guide.title}" angelegt`)
      created++
    }
  }

  console.log(`\n✨ Fertig! ${created} angelegt, ${skipped} übersprungen.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
