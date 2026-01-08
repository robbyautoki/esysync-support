import Header from '@/components/shadcn-studio/blocks/hero-section-12/header'
import Footer from '@/components/shadcn-studio/blocks/footer-component-02/footer-component-02'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'
import { Separator } from '@/components/ui/separator'

const navigationData: NavigationSection[] = [
  { title: 'Startseite', href: '/' },
  { title: 'Anleitungen', href: '/anleitungen' },
  { title: 'Status', href: '/ticket-status' },
]

export default function DatenschutzPage() {
  return (
    <main className='min-h-dvh flex flex-col'>
      <Header navigationData={navigationData} />

      <div className='flex-1 bg-muted/30'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16'>
          <h1 className='text-3xl font-bold mb-2'>Datenschutz</h1>
          <p className='text-muted-foreground mb-8'>Stand 03.2020</p>

          <div className='prose prose-neutral dark:prose-invert max-w-none space-y-8'>
            {/* Inhaltsverzeichnis */}
            <section>
              <ol className='list-decimal list-inside text-muted-foreground space-y-1'>
                <li>Datenschutz auf einen Blick</li>
                <li>Allgemeine Hinweise und Pflichtinformationen</li>
                <li>Datenerfassung auf unserer Website</li>
                <li>Soziale Medien</li>
                <li>Analyse Tools und Werbung</li>
                <li>Newsletter</li>
                <li>Plugins und Tools</li>
                <li>Zahlungsanbieter</li>
              </ol>
            </section>

            <Separator />

            {/* 1. Datenschutz auf einen Blick */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>1. Datenschutz auf einen Blick</h2>
              
              <h3 className='text-lg font-medium mt-6 mb-3'>Allgemeine Hinweise</h3>
              <p className='text-muted-foreground'>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Datenerfassung auf unserer Website</h3>
              <p className='text-muted-foreground font-medium'>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
              <p className='text-muted-foreground mt-2'>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>

              <p className='text-muted-foreground font-medium mt-4'>Wie erfassen wir Ihre Daten?</p>
              <p className='text-muted-foreground mt-2'>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className='text-muted-foreground mt-2'>
                Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.
              </p>

              <p className='text-muted-foreground font-medium mt-4'>Wofür nutzen wir Ihre Daten?</p>
              <p className='text-muted-foreground mt-2'>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <p className='text-muted-foreground font-medium mt-4'>Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
              <p className='text-muted-foreground mt-2'>
                Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Analyse-Tools und Tools von Drittanbietern</h3>
              <p className='text-muted-foreground'>
                Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden. Sie können dieser Analyse widersprechen oder sie durch die Nichtbenutzung bestimmter Tools verhindern. Detaillierte Informationen dazu finden Sie in der folgenden Datenschutzerklärung.
              </p>
              <p className='text-muted-foreground mt-2'>
                Sie können dieser Analyse widersprechen. Über die Widerspruchsmöglichkeiten werden wir Sie in dieser Datenschutzerklärung informieren.
              </p>
            </section>

            <Separator />

            {/* 2. Allgemeine Hinweise und Pflichtinformationen */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>2. Allgemeine Hinweise und Pflichtinformationen</h2>

              <h3 className='text-lg font-medium mt-6 mb-3'>Datenschutz</h3>
              <p className='text-muted-foreground'>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Hinweis zur verantwortlichen Stelle</h3>
              <p className='text-muted-foreground'>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <address className='not-italic text-muted-foreground mt-2'>
                AVANTO VR Solutions GmbH<br />
                Otto-Lilienthal-Str. 20<br />
                28199 Bremen
              </address>
              <div className='mt-4 text-muted-foreground space-y-1'>
                <p><strong>Gegenstand des Unternehmens:</strong> Entwicklung, Vertrieb und Verkauf von 360° Lösungen.</p>
                <p><strong>Handelsregister Bremen:</strong> HRB 32233</p>
                <p><strong>Geschäftsführender Gesellschafter:</strong> Claudio Schröder</p>
                <p><strong>Telefon:</strong> 0421-40892380</p>
                <p><strong>E-Mail:</strong> info@avanto-vr.com</p>
                <p><strong>Web:</strong> www.feelestate.com</p>
                <p><strong>USt-IdNr.:</strong> DE280062948</p>
              </div>
              <p className='text-muted-foreground mt-4'>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className='text-muted-foreground'>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
              <p className='text-muted-foreground'>
                Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen Sitz hat. Eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten können folgendem Link entnommen werden: <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html" className='underline' target="_blank" rel="noopener noreferrer">https://www.bfdi.bund.de</a>.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Recht auf Datenübertragbarkeit</h3>
              <p className='text-muted-foreground'>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>SSL- bzw. TLS-Verschlüsselung</h3>
              <p className='text-muted-foreground'>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Verschlüsselter Zahlungsverkehr auf dieser Website</h3>
              <p className='text-muted-foreground'>
                Besteht nach dem Abschluss eines kostenpflichtigen Vertrags eine Verpflichtung, uns Ihre Zahlungsdaten (z.B. Kontonummer bei Einzugsermächtigung) zu übermitteln, werden diese Daten zur Zahlungsabwicklung benötigt.
              </p>
              <p className='text-muted-foreground mt-2'>
                Der Zahlungsverkehr über die gängigen Zahlungsmittel (Visa/MasterCard, Lastschriftverfahren) erfolgt ausschließlich über eine verschlüsselte SSL- bzw. TLS-Verbindung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
              <p className='text-muted-foreground mt-2'>
                Bei verschlüsselter Kommunikation können Ihre Zahlungsdaten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Auskunft, Sperrung, Löschung</h3>
              <p className='text-muted-foreground'>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Widerspruch gegen Werbe-Mails</h3>
              <p className='text-muted-foreground'>
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
              </p>
            </section>

            <Separator />

            {/* 3. Datenerfassung auf unserer Website */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>3. Datenerfassung auf unserer Website</h2>

              <h3 className='text-lg font-medium mt-6 mb-3'>Server-Log-Dateien</h3>
              <p className='text-muted-foreground'>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className='list-disc list-inside text-muted-foreground mt-2 space-y-1'>
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className='text-muted-foreground mt-4'>
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              </p>
              <p className='text-muted-foreground mt-2'>
                Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Kontaktformular</h3>
              <p className='text-muted-foreground'>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Registrierung auf dieser Website</h3>
              <p className='text-muted-foreground'>
                Sie können sich auf unserer Website registrieren, um zusätzliche Funktionen auf der Seite zu nutzen. Die dazu eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes, für den Sie sich registriert haben. Die bei der Registrierung abgefragten Pflichtangaben müssen vollständig angegeben werden. Anderenfalls werden wir die Registrierung ablehnen.
              </p>
              <p className='text-muted-foreground mt-2'>
                Für wichtige Änderungen etwa beim Angebotsumfang oder bei technisch notwendigen Änderungen nutzen wir die bei der Registrierung angegebene E-Mail-Adresse, um Sie auf diesem Wege zu informieren.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können eine von Ihnen erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die bei der Registrierung erfassten Daten werden von uns gespeichert, solange Sie auf unserer Website registriert sind und werden anschließend gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Verarbeiten von Daten (Kunden- und Vertragsdaten)</h3>
              <p className='text-muted-foreground'>
                Wir erheben, verarbeiten und nutzen personenbezogene Daten nur, soweit sie für die Begründung, inhaltliche Ausgestaltung oder Änderung des Rechtsverhältnisses erforderlich sind (Bestandsdaten). Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet. Personenbezogene Daten über die Inanspruchnahme unserer Internetseiten (Nutzungsdaten) erheben, verarbeiten und nutzen wir nur, soweit dies erforderlich ist, um dem Nutzer die Inanspruchnahme des Dienstes zu ermöglichen oder abzurechnen.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die erhobenen Kundendaten werden nach Abschluss des Auftrags oder Beendigung der Geschäftsbeziehung gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Datenübermittlung bei Vertragsschluss für Online-Shops, Händler und Warenversand</h3>
              <p className='text-muted-foreground'>
                Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung notwendig ist, etwa an die mit der Lieferung der Ware betrauten Unternehmen oder das mit der Zahlungsabwicklung beauftragte Kreditinstitut. Eine weitergehende Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich zugestimmt haben. Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken der Werbung, erfolgt nicht.
              </p>
              <p className='text-muted-foreground mt-2'>
                Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Datenübermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte</h3>
              <p className='text-muted-foreground'>
                Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung notwendig ist, etwa an das mit der Zahlungsabwicklung beauftragte Kreditinstitut.
              </p>
              <p className='text-muted-foreground mt-2'>
                Eine weitergehende Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich zugestimmt haben. Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken der Werbung, erfolgt nicht.
              </p>
              <p className='text-muted-foreground mt-2'>
                Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
              </p>
            </section>

            <Separator />

            {/* 4. Soziale Medien */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>4. Soziale Medien</h2>

              <h3 className='text-lg font-medium mt-6 mb-3'>Facebook-Plugins (Like &amp; Share-Button)</h3>
              <p className='text-muted-foreground'>
                Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook, Anbieter Facebook Inc., 1 Hacker Way, Menlo Park, California 94025, USA, integriert. Die Facebook-Plugins erkennen Sie an dem Facebook-Logo oder dem „Like-Button" („Gefällt mir") auf unserer Seite. Eine Übersicht über die Facebook-Plugins finden Sie hier: <a href="https://developers.facebook.com/docs/plugins/" className='underline' target="_blank" rel="noopener noreferrer">https://developers.facebook.com/docs/plugins/</a>.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn Sie unsere Seiten besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Wenn Sie den Facebook „Like-Button" anklicken während Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken. Dadurch kann Facebook den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Facebook unter: <a href="https://de-de.facebook.com/policy.php" className='underline' target="_blank" rel="noopener noreferrer">https://de-de.facebook.com/policy.php</a>.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem Facebook-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Twitter Plugin</h3>
              <p className='text-muted-foreground'>
                Auf unseren Seiten sind Funktionen des Dienstes Twitter eingebunden. Diese Funktionen werden angeboten durch die Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103, USA. Durch das Benutzen von Twitter und der Funktion „Re-Tweet" werden die von Ihnen besuchten Websites mit Ihrem Twitter-Account verknüpft und anderen Nutzern bekannt gegeben. Dabei werden auch Daten an Twitter übertragen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Twitter erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Twitter unter: <a href="https://twitter.com/privacy" className='underline' target="_blank" rel="noopener noreferrer">https://twitter.com/privacy</a>.
              </p>
              <p className='text-muted-foreground mt-2'>
                Ihre Datenschutzeinstellungen bei Twitter können Sie in den Konto-Einstellungen unter <a href="https://twitter.com/account/settings" className='underline' target="_blank" rel="noopener noreferrer">https://twitter.com/account/settings</a> ändern.
              </p>
            </section>

            <Separator />

            {/* 5. Analyse Tools und Werbung */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>5. Analyse Tools und Werbung</h2>

              <h3 className='text-lg font-medium mt-6 mb-3'>Google Analytics</h3>
              <p className='text-muted-foreground'>
                Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
              </p>
              <p className='text-muted-foreground mt-2'>
                Google Analytics verwendet so genannte „Cookies". Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Speicherung von Google-Analytics-Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
              </p>

              <h4 className='font-medium mt-4 mb-2 text-muted-foreground'>Browser Plugin</h4>
              <p className='text-muted-foreground'>
                Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch den Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" className='underline' target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout?hl=de</a>.
              </p>

              <h4 className='font-medium mt-4 mb-2 text-muted-foreground'>Widerspruch gegen Datenerfassung</h4>
              <p className='text-muted-foreground'>
                Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie auf folgenden Link klicken. Es wird ein Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei zukünftigen Besuchen dieser Website verhindert: Google Analytics deaktivieren.
              </p>
              <p className='text-muted-foreground mt-2'>
                Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google: <a href="https://support.google.com/analytics/answer/6004245?hl=de" className='underline' target="_blank" rel="noopener noreferrer">https://support.google.com/analytics/answer/6004245?hl=de</a>.
              </p>

              <h4 className='font-medium mt-4 mb-2 text-muted-foreground'>Demografische Merkmale bei Google Analytics</h4>
              <p className='text-muted-foreground'>
                Diese Website nutzt die Funktion &quot;demografische Merkmale&quot; von Google Analytics. Dadurch können Berichte erstellt werden, die Aussagen zu Alter, Geschlecht und Interessen der Seitenbesucher enthalten. Diese Daten stammen aus interessenbezogener Werbung von Google sowie aus Besucherdaten von Drittanbietern. Diese Daten können keiner bestimmten Person zugeordnet werden. Sie können diese Funktion jederzeit über die Anzeigeneinstellungen in Ihrem Google-Konto deaktivieren oder die Erfassung Ihrer Daten durch Google Analytics wie im Punkt &quot;Widerspruch gegen Datenerfassung&quot; dargestellt generell untersagen.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Google AdWords und Google Conversion-Tracking</h3>
              <p className='text-muted-foreground'>
                Diese Website verwendet Google AdWords. AdWords ist ein Online-Werbeprogramm der Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States (&quot;Google&quot;).
              </p>
              <p className='text-muted-foreground mt-2'>
                Im Rahmen von Google AdWords nutzen wir das so genannte Conversion-Tracking. Wenn Sie auf eine von Google geschaltete Anzeige klicken wird ein Cookie für das Conversion-Tracking gesetzt. Bei Cookies handelt es sich um kleine Textdateien, die der Internet-Browser auf dem Computer des Nutzers ablegt. Diese Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen nicht der persönlichen Identifizierung der Nutzer. Besucht der Nutzer bestimmte Seiten dieser Website und das Cookie ist noch nicht abgelaufen, können Google und wir erkennen, dass der Nutzer auf die Anzeige geklickt hat und zu dieser Seite weitergeleitet wurde.
              </p>
              <p className='text-muted-foreground mt-2'>
                Jeder Google AdWords-Kunde erhält ein anderes Cookie. Die Cookies können nicht über die Websites von AdWords-Kunden nachverfolgt werden. Die mithilfe des Conversion-Cookies eingeholten Informationen dienen dazu, Conversion-Statistiken für AdWords-Kunden zu erstellen, die sich für Conversion-Tracking entschieden haben. Die Kunden erfahren die Gesamtanzahl der Nutzer, die auf ihre Anzeige geklickt haben und zu einer mit einem Conversion-Tracking-Tag versehenen Seite weitergeleitet wurden. Sie erhalten jedoch keine Informationen, mit denen sich Nutzer persönlich identifizieren lassen. Wenn Sie nicht am Tracking teilnehmen möchten, können Sie dieser Nutzung widersprechen, indem Sie das Cookie des Google Conversion-Trackings über ihren Internet-Browser unter Nutzereinstellungen leicht deaktivieren. Sie werden sodann nicht in die Conversion-Tracking Statistiken aufgenommen.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Speicherung von &quot;Conversion-Cookies&quot; erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
              </p>
              <p className='text-muted-foreground mt-2'>
                Mehr Informationen zu Google AdWords und Google Conversion-Tracking finden Sie in den Datenschutzbestimmungen von Google: <a href="https://www.google.de/policies/privacy/" className='underline' target="_blank" rel="noopener noreferrer">https://www.google.de/policies/privacy/</a>.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Google reCAPTCHA</h3>
              <p className='text-muted-foreground'>
                Wir nutzen &quot;Google reCAPTCHA&quot; (im Folgenden &quot;reCAPTCHA&quot;) auf unseren Websites. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA (&quot;Google&quot;).
              </p>
              <p className='text-muted-foreground mt-2'>
                Mit reCAPTCHA soll überprüft werden, ob die Dateneingabe auf unseren Websites (z.B. in einem Kontaktformular) durch einen Menschen oder durch ein automatisiertes Programm erfolgt. Hierzu analysiert reCAPTCHA das Verhalten des Websitebesuchers anhand verschiedener Merkmale. Diese Analyse beginnt automatisch, sobald der Websitebesucher die Website betritt. Zur Analyse wertet reCAPTCHA verschiedene Informationen aus (z.B. IP-Adresse, Verweildauer des Websitebesuchers auf der Website oder vom Nutzer getätigte Mausbewegungen). Die bei der Analyse erfassten Daten werden an Google weitergeleitet.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die reCAPTCHA-Analysen laufen vollständig im Hintergrund. Websitebesucher werden nicht darauf hingewiesen, dass eine Analyse stattfindet.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse daran, seine Webangebote vor missbräuchlicher automatisierter Ausspähung und vor SPAM zu schützen.
              </p>
              <p className='text-muted-foreground mt-2'>
                Weitere Informationen zu Google reCAPTCHA sowie die Datenschutzerklärung von Google entnehmen Sie folgenden Links: <a href="https://www.google.com/intl/de/policies/privacy/" className='underline' target="_blank" rel="noopener noreferrer">https://www.google.com/intl/de/policies/privacy/</a> und <a href="https://www.google.com/recaptcha/intro/android.html" className='underline' target="_blank" rel="noopener noreferrer">https://www.google.com/recaptcha/intro/android.html</a>.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Facebook Pixel</h3>
              <p className='text-muted-foreground'>
                Unsere Website nutzt zur Konversionsmessung das Besucheraktions-Pixel von Facebook, Facebook Inc., 1601 S. California Ave, Palo Alto, CA 94304, USA (&quot;Facebook&quot;).
              </p>
              <p className='text-muted-foreground mt-2'>
                So kann das Verhalten der Seitenbesucher nachverfolgt werden, nachdem diese durch Klick auf eine Facebook-Werbeanzeige auf die Website des Anbieters weitergeleitet wurden. Dadurch können die Wirksamkeit der Facebook-Werbeanzeigen für statistische und Marktforschungszwecke ausgewertet werden und zukünftige Werbemaßnahmen optimiert werden.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die erhobenen Daten sind für uns als Betreiber dieser Website anonym, wir können keine Rückschlüsse auf die Identität der Nutzer ziehen. Die Daten werden aber von Facebook gespeichert und verarbeitet, sodass eine Verbindung zum jeweiligen Nutzerprofil möglich ist und Facebook die Daten für eigene Werbezwecke, entsprechend der Facebook-Datenverwendungsrichtlinie verwenden kann. Dadurch kann Facebook das Schalten von Werbeanzeigen auf Seiten von Facebook sowie außerhalb von Facebook ermöglichen. Diese Verwendung der Daten kann von uns als Seitenbetreiber nicht beeinflusst werden.
              </p>
              <p className='text-muted-foreground mt-2'>
                In den Datenschutzhinweisen von Facebook finden Sie weitere Hinweise zum Schutz Ihrer Privatsphäre: <a href="https://www.facebook.com/about/privacy/" className='underline' target="_blank" rel="noopener noreferrer">https://www.facebook.com/about/privacy/</a>.
              </p>
              <p className='text-muted-foreground mt-2'>
                Sie können außerdem die Remarketing-Funktion &quot;Custom Audiences&quot; im Bereich Einstellungen für Werbeanzeigen unter <a href="https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen" className='underline' target="_blank" rel="noopener noreferrer">https://www.facebook.com/ads/preferences/</a> deaktivieren. Dazu müssen Sie bei Facebook angemeldet sein.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn Sie kein Facebook Konto besitzen, können Sie nutzungsbasierte Werbung von Facebook auf der Website der European Interactive Digital Advertising Alliance deaktivieren: <a href="http://www.youronlinechoices.com/de/praferenzmanagement/" className='underline' target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com/de/praferenzmanagement/</a>.
              </p>
            </section>

            <Separator />

            {/* 6. Newsletter */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>6. Newsletter</h2>

              <h3 className='text-lg font-medium mt-6 mb-3'>Newsletterdaten</h3>
              <p className='text-muted-foreground'>
                Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den „Austragen"-Link im Newsletter. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter gespeichert und nach der Abbestellung des Newsletters gelöscht. Daten, die zu anderen Zwecken bei uns gespeichert wurden (z.B. E-Mail-Adressen für den Mitgliederbereich) bleiben hiervon unberührt.
              </p>
            </section>

            <Separator />

            {/* 7. Plugins und Tools */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>7. Plugins und Tools</h2>

              <h3 className='text-lg font-medium mt-6 mb-3'>YouTube</h3>
              <p className='text-muted-foreground'>
                Unsere Website nutzt Plugins der von Google betriebenen Seite YouTube. Betreiber der Seiten ist die YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn Sie eine unserer mit einem YouTube-Plugin ausgestatteten Seiten besuchen, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht haben.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn Sie in Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem YouTube-Account ausloggen.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
              </p>
              <p className='text-muted-foreground mt-2'>
                Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von YouTube unter: <a href="https://www.google.de/intl/de/policies/privacy" className='underline' target="_blank" rel="noopener noreferrer">https://www.google.de/intl/de/policies/privacy</a>.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Google Web Fonts</h3>
              <p className='text-muted-foreground'>
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
              </p>
              <p className='text-muted-foreground mt-2'>
                Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von Google Web Fonts erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt.
              </p>
              <p className='text-muted-foreground mt-2'>
                Weitere Informationen zu Google Web Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" className='underline' target="_blank" rel="noopener noreferrer">https://developers.google.com/fonts/faq</a> und in der Datenschutzerklärung von Google: <a href="https://www.google.com/policies/privacy/" className='underline' target="_blank" rel="noopener noreferrer">https://www.google.com/policies/privacy/</a>.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-3'>Google Maps</h3>
              <p className='text-muted-foreground'>
                Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
              </p>
              <p className='text-muted-foreground mt-2'>
                Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
              </p>
              <p className='text-muted-foreground mt-2'>
                Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: <a href="https://www.google.de/intl/de/policies/privacy/" className='underline' target="_blank" rel="noopener noreferrer">https://www.google.de/intl/de/policies/privacy/</a>.
              </p>
            </section>

            <Separator />

            {/* 8. Zahlungsanbieter */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>8. Zahlungsanbieter</h2>

              <h3 className='text-lg font-medium mt-6 mb-3'>PayPal</h3>
              <p className='text-muted-foreground'>
                Auf unserer Website bieten wir u.a. die Bezahlung via PayPal an. Anbieter dieses Zahlungsdienstes ist die PayPal (Europe) S.à.r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg (im Folgenden &quot;PayPal&quot;).
              </p>
              <p className='text-muted-foreground mt-2'>
                Wenn Sie die Bezahlung via PayPal auswählen, werden die von Ihnen eingegebenen Zahlungsdaten an PayPal übermittelt.
              </p>
              <p className='text-muted-foreground mt-2'>
                Die Übermittlung Ihrer Daten an PayPal erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und Art. 6 Abs. 1 lit. b DSGVO (Verarbeitung zur Erfüllung eines Vertrags). Sie haben die Möglichkeit, Ihre Einwilligung zur Datenverarbeitung jederzeit zu widerrufen. Ein Widerruf wirkt sich auf die Wirksamkeit von in der Vergangenheit liegenden Datenverarbeitungsvorgängen nicht aus.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
