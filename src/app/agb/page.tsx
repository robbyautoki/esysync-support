import Header from '@/components/shadcn-studio/blocks/hero-section-12/header'
import Footer from '@/components/shadcn-studio/blocks/footer-component-02/footer-component-02'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'
import { Separator } from '@/components/ui/separator'

const navigationData: NavigationSection[] = [
  { title: 'Startseite', href: '/' },
  { title: 'Anleitungen', href: '/anleitungen' },
  { title: 'Status', href: '/ticket-status' },
]

export default function AGBPage() {
  return (
    <main className='min-h-dvh flex flex-col'>
      <Header navigationData={navigationData} />

      <div className='flex-1 bg-muted/30'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16'>
          <h1 className='text-3xl font-bold mb-2'>Allgemeine Geschäftsbedingungen (AGB)</h1>
          <p className='text-muted-foreground mb-8'>Stand 30.11.2019</p>

          <div className='prose prose-neutral dark:prose-invert max-w-none space-y-8'>
            {/* Inhaltsverzeichnis */}
            <section>
              <ol className='list-decimal list-inside text-muted-foreground space-y-1'>
                <li>Gegenstand der Geschäftsbedingungen</li>
                <li>Gegenstand des Vertrages</li>
                <li>Leistungen von AVANTO</li>
                <li>Pflichten des Kunden</li>
                <li>Vergütung</li>
                <li>Nutzungsrechte</li>
                <li>Gewährleistung</li>
                <li>Haftung</li>
                <li>Laufzeit des Vertrages</li>
                <li>Wettbewerb und Werbung</li>
                <li>Datenschutz</li>
                <li>Information über weitere Angebote von AVANTO</li>
                <li>Schlussbestimmungen</li>
              </ol>
            </section>

            <Separator />

            {/* 1. Gegenstand der Geschäftsbedingungen */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>1. Gegenstand der Geschäftsbedingungen</h2>
              <p className='text-muted-foreground'>
                (1) Die Allgemeinen Geschäftsbedingungen der AVANTO VR Solutions GmbH, Otto-Lilienthal-Straße 16a, 28199 Bremen (nachfolgend „AVANTO" genannt) regeln die Nutzung der AVANTO-Produkte Feelestate und Pano-Live auf der Basis des mit dem Kunden zu schließenden Vertrages nebst aller Anlagen. Entgegenstehende Bedingungen des Kunden werden auch dann nicht Vertragsbestandteil, wenn AVANTO diesen Bedingungen nicht ausdrücklich widersprochen hat.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) AVANTO erbringt ihre Leistungen nur für Unternehmen. Unternehmer sind natürliche oder juristische Personen oder rechtsfähige Personengesellschaften, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handeln.
              </p>
            </section>

            <Separator />

            {/* 2. Gegenstand des Vertrages */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>2. Gegenstand des Vertrages</h2>
              <p className='text-muted-foreground'>
                (1) Mit den AVANTO-Produkten wird dem Kunden zunächst die notwendige Infrastruktur für die im Rahmenvertrag beauftragten Leistungen z.B. zur Speicherung, Verarbeitung oder Darstellung von Panoramaaufnahmen oder Nutzung von Schulungssoftware zur Verfügung gestellt.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Ebenfalls Gegenstand dieses Vertrages ist die serverseitige Nutzung einer Software, die das Verwalten und Steuern von Panoramaaufnahmen zum Zweck hat. Die Software läuft ausschließlich servergestützt. Die Programmierungen und die Software bleiben ausschließlich im Eigentum von AVANTO. Der Kunde darf diese entgeltlich und ausschließlich nach Maßgabe der im Rahmenvertrag bestellten Leistungen auf den von AVANTO betriebenen Internetseiten und Servern nutzen.
              </p>
            </section>

            <Separator />

            {/* 3. Leistungen von AVANTO */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>3. Leistungen von AVANTO</h2>
              <p className='text-muted-foreground'>
                (1) AVANTO stellt dem Kunden digitale Daten und/oder Speicherplatz für digitale Daten auf seinen Servern in einem vertraglich definierten Umfang zur Verfügung. Die Kapazitäten können in Abstimmung mit AVANTO erweitert werden (freibleibend nach Verfügbarkeit). Auf diesen Servern ist die AVANTO Software installiert. In diesem Zusammenhang erhält der Kunde dann das Recht zur Nutzung der AVANTO Software. AVANTO stellt dabei dem Kunden die technische Möglichkeit zur Verfügung, den unter §2 Abs. 2 beschriebenen Service über das WorldWideWeb zu erreichen. Für den ordnungsgemäßen Betrieb des Dienstes – also nicht des WorldWideWeb – ist AVANTO verantwortlich.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Um dem Kunden die Verwaltung seiner Accounts zu ermöglichen, erhält er Zugriff auf eine sogenannte AVANTO Software Frontend, auf dem der Kunden Daten hochladen und verwalten, bzw. abrufen kann. Ferner werden dem Kunden Benutzername und Passwort für den Login auf der Webseite von AVANTO bereitgestellt.
              </p>
              <p className='text-muted-foreground mt-4'>
                (3) AVANTO ist berechtigt, den Betrieb der Plattform wegen Wartungs- und Aktualisierungsarbeiten oder zur Behebung von Störungen zu unterbrechen. Soweit technisch möglich, wird AVANTO solche Arbeiten außerhalb der normalen Nutzungszeiten, vorzugsweise in den Nacht- oder in den frühen Morgenstunden (Mitteleuropäische Zeit), durchführen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (4) Die Erreichbarkeit der Website beträgt im Jahresmittel 99,8 %. Hiervon ausgenommen sind jedoch Zeiten, in denen die Erreichbarkeit aufgrund von technischen oder sonstigen Problemen, die nicht im Einflussbereich von AVANTO liegen (wie z.B. höhere Gewalt, Verschulden Dritter, serverseitige Manipulationen Dritter durch Störangriffe, Ausfall der API Schnittstellen zu den Märkten, vorher dem Kunden rechtzeitig mitgeteilte Wartungsleistungen etc.) unterbrochen wird. Ebenfalls ausgenommen sind Unterbrechungen die innerhalb der ersten 4 Wochen nach Beginn des Vertragsverhältnisses entstehen und damit unter die Erstinbetriebnahme fallen.
              </p>
            </section>

            <Separator />

            {/* 4. Pflichten des Kunden */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>4. Pflichten des Kunden</h2>
              <p className='text-muted-foreground'>
                (1) Sofern es bei der Nutzung der Plattform gemäß § 3 Abs. 1 dieses Vertrages zu Störungen kommt, wird der Kunde AVANTO unverzüglich hierüber per E-Mail (info@avanto-vr.com) oder Fax in Kenntnis setzen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Der Kunde ist verpflichtet, mit den Zugangsdaten gemäß § 3 Abs. 2 dieses Vertrages sorgfältig umzugehen, diese nicht weiterzugeben, und eine missbräuchliche Benutzung der Zugangsdaten durch Dritte zu verhindern. Als unbefugte Dritte gelten nicht die Personen, die den Zugang mit Wissen und Willen des Kunden nutzen. Im Falle der unbefugten Nutzung von Zugangsdaten ist der Kunde verpflichtet, AVANTO hierüber unverzüglich zu informieren und den Zugang sperren zu lassen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (3) Der Kunde sichert AVANTO zu, dass er AVANTO stets rechtzeitig alle für die erfolgreiche Erbringung seiner Dienstleistung erforderlichen Informationen in Textform übermittelt und keine Kampagnen oder Inhalte gespeichert bzw. in das Internet eingestellt werden, deren Bereitstellung, Veröffentlichung oder Nutzung gegen geltendes Recht oder Rechte Dritter (insbesondere gegen das Namens- und Markenrecht, das Datenschutzrecht oder andere rechtliche Bestimmungen etc.) verstoßen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (4) Der Kunde verpflichtet sich, AVANTO von Ansprüchen Dritter gleich welcher Art freizustellen, die aus der Rechtswidrigkeit von Inhalten resultieren, die der Kunde auf den vertragsgegenständlichen Kampagnen gespeichert hat. Die Freistellungsverpflichtung umfasst auch die Verpflichtung, AVANTO von angemessenen Rechtsverteidigungskosten (z.B. Gerichts- und Anwaltskosten) vollständig freizustellen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (5) Der Kunde verpflichtet sich, sämtliche Dienste ausschließlich bestimmungsgemäß zu nutzen. Dem Kunden ist es untersagt, die Software zu manipulieren, insbesondere Mechanismen oder sonstige Scripts in Verbindung mit der Software zu verwenden, welche die Funktion der Dienste von AVANTO stören könnten. Der Kunde darf keine Maßnahmen ergreifen, die eine unzumutbare oder übermäßige Belastung des Systems von AVANTO zur Folge haben können. Eine Verwendung der Dienste zusammen mit der Software Dritter ist untersagt. Voraussetzung für derartige Maßnahmen ist stets, dass AVANTO dieser zuvor schriftlich zugestimmt hat.
              </p>
              <p className='text-muted-foreground mt-4'>
                (6) Daten sind vom Kunden in dem Format einzustellen, welches auf der Plattform definiert wird. Der Kunde ist daher insbesondere selbst zur entsprechenden Datensicherung verpflichtet. AVANTO ist berechtigt, vom Kunden eingestellte Informationen und Daten nicht zu verarbeiten, sofern diese Daten Fehler in der Datenverarbeitung verursachen bzw. verursachen können oder sie nicht im nötigen Format eingestellt wurden. Der Kunde ist dafür verantwortlich, derartige Vorgänge zu kontrollieren und die nötigen Maßnahmen hieraus abzuleiten.
              </p>
              <p className='text-muted-foreground mt-4'>(7) Der Kunde wird AVANTO unverzüglich davon in Kenntnis setzen, wenn:</p>
              <ul className='list-disc list-inside text-muted-foreground mt-2 space-y-1'>
                <li>die Eröffnung des Insolvenzverfahrens vom Kunde beantragt worden ist oder in den nächsten 14 Tagen beantragt werden muss,</li>
                <li>die Eröffnung des Insolvenzverfahrens von Dritten beantragt worden ist,</li>
                <li>der Kunde aufgrund von Zahlungsschwierigkeiten die Zahlungen (ganz oder teilweise) eingestellt hat oder einstellen muss,</li>
                <li>gegen den Kunden im zeitlichen Zusammenhang mit Zahlungsschwierigkeiten Maßnahmen zur Befriedigung von Drittgläubigeransprüchen getroffen wurden, oder</li>
                <li>der Kunde im zeitlichen Zusammenhang mit Zahlungsschwierigkeiten Vereinbarungen zur Befriedigung von Drittgläubigeransprüchen zugestimmt hat.</li>
              </ul>
              <p className='text-muted-foreground mt-4'>
                (8) Sofern der Kunde seine Pflichten nach diesem Vertrag verletzt, ist AVANTO nach vorheriger Abmahnung berechtigt, den Zugang des Kunden zu sperren und Leistungen unter diesem Vertrag zurückzuhalten. Bei schwerwiegenden Pflichtverletzungen wie z.B. Zahlungsverzug, Manipulation von Diensten, Einstellung von rechtswidrigen Inhalten etc., ist AVANTO zur sofortigen Sperrung des Zugangs berechtigt.
              </p>
            </section>

            <Separator />

            {/* 5. Vergütung */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>5. Vergütung</h2>
              <p className='text-muted-foreground'>
                (1) Der Kunde verpflichtet sich, die im Vertrag festgelegte Vergütung zu zahlen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) AVANTO wird dem Kunden die vertraglich geschuldete Vergütung in Rechnung stellen. Der Betrag, der sich aus dem tatsächlichen Umsatzvolumen ergibt, wird jeweils 7 Tage nach Rechnungsstellung fällig. Im Falle des Zahlungsverzuges gelten die gesetzlichen Bestimmungen. Anderslautende Absprachen sind nur nach Zustimmung möglich.
              </p>
            </section>

            <Separator />

            {/* 6. Nutzungsrechte */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>6. Nutzungsrechte</h2>
              <p className='text-muted-foreground'>
                (1) AVANTO überträgt dem Kunden ein einfaches, auf die Laufzeit des Vertrages beschränktes und nicht übertragbares Nutzungsrecht für die in § 2 Abs. 2 beschriebenen Zwecke. Dies berechtigt den Kunden – für eigene Zwecke – zur Nutzung des Dienstes auf den AVANTO betriebenen Internetseiten. Jegliche Veränderungen im Rahmen der einfachen Nutzung sind untersagt.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Der Kunde ist berechtigt, die vertragsgegenständlichen Leistungen einem Dritten (z.B. einem Werbekunden) teilweise oder vollständig, entgeltlich oder unentgeltlich, unter Berücksichtigung des § 4 und im Rahmen des in § 6 Abs. 1 gewährten Nutzungsrechtes zur Nutzung weiter zu überlassen oder aber für diesen Dritten entsprechende Accounts bei AVANTO anzulegen. Vertragspartner und Schuldner der Vergütungsansprüche von AVANTO bleibt in solchen Fällen stets der Kunde. Es kommt zu keinem direkten Vertragsverhältnis dem Dritten.
              </p>
              <p className='text-muted-foreground mt-4'>
                (3) Der Kunde bleibt Inhaber aller Rechte, insbesondere aller Urheberrechte, an den von ihm für die Dienste erfassten Informationen und Daten. Er gestattet AVANTO im Rahmen seiner Dienste die Nutzung der Informationen und Daten, einschließlich des Rechts, Informationen und Daten im Rahmen der Dienste zu vervielfältigen und an Dritte zu übermitteln.
              </p>
            </section>

            <Separator />

            {/* 7. Gewährleistung */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>7. Gewährleistung</h2>
              <p className='text-muted-foreground'>
                (1) AVANTO gewährleistet ausschließlich die Nutzbarkeit der Plattform wie in § 3 beschrieben. Dem Kunden ist bekannt, dass Software nicht vollständig fehlerfrei erstellt werden kann. Fehlerfreiheit der Software wird daher nur im markt- und branchenüblichen Umfang gewährleistet.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) AVANTO gewährleistet nicht, dass die Software einen bestimmten Leistungserfolg, insbesondere in Bezug auf die Anzahl der Conversions, Umfang des Traffics, Reichweite oder Ziele erreicht.
              </p>
              <p className='text-muted-foreground mt-4'>
                (3) AVANTO hat keinen Einfluss auf Verfälschungen, die durch Werbeblocker, zwischenzeitlich gelöschte Cookies oder den Fehler/Missbrauch Dritter entstehen. Eine fehlerfreie Funktion der Software in Verbindung mit Netzwerken, welche nicht vom Provider schriftlich freigegeben wurden, kann nicht gewährleistet werden.
              </p>
              <p className='text-muted-foreground mt-4'>
                (4) Die von AVANTO bereitgestellte Software unterstützt den Kunden lediglich im vereinbarten Umfang automatisiert und softwaregestützt bei der Erreichung seiner Ziele.
              </p>
            </section>

            <Separator />

            {/* 8. Haftung */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>8. Haftung</h2>
              <p className='text-muted-foreground'>
                (1) AVANTO haftet bei Vorsatz oder grober Fahrlässigkeit für alle von AVANTO sowie ihren gesetzlichen Vertretern oder Erfüllungsgehilfen im Zusammenhang mit der Erbringung der vertragsgemäßen Leistungen verursachten Schäden, sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die AVANTO, ihre gesetzlichen Vertreter oder Erfüllungsgehilfen zu vertreten haben.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Im Übrigen haftet AVANTO, insbesondere bei leichter Fahrlässigkeit nicht, außer soweit eine wesentliche Vertragspflicht verletzt ist. Als wesentliche Vertragspflichten werden dabei abstrakt solche Pflichten bezeichnet, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf deren Einhaltung der Nutzer regelmäßig vertraut und vertrauen darf. In diesen Fällen ist die Haftung auf den Ersatz des vorhersehbaren, typischerweise eintretenden Schadens beschränkt.
              </p>
              <p className='text-muted-foreground mt-4'>
                (3) Soweit die Haftung von AVANTO nach den vorgenannten Vorschriften ausgeschlossen oder beschränkt wird, gilt dies auch für Erfüllungsgehilfen von AVANTO.
              </p>
              <p className='text-muted-foreground mt-4'>
                (4) AVANTO haftet keinesfalls für Schäden infolge von Leistungsausfällen und Leistungsverzögerungen aufgrund unvorhersehbarer, von AVANTO, seinen gesetzlichen Vertretern oder seinen Erfüllungsgehilfen nicht zu vertretender Ereignisse (höhere Gewalt). Als Ereignisse höherer Gewalt gelten insbesondere Krieg, Unruhen, Naturgewalten, Feuer, Sabotageangriffe durch Dritte (wie z. B. durch Computerviren), Stromausfälle, behördliche Anordnungen, rechtmäßige unternehmensinterne Arbeitskampfmaßnahmen und der Ausfall oder eine Leistungsbeschränkung von Kommunikationsnetzen und Gateways anderer Betreiber.
              </p>
              <p className='text-muted-foreground mt-4'>
                (5) Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.
              </p>
            </section>

            <Separator />

            {/* 9. Laufzeit des Vertrages */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>9. Laufzeit des Vertrages</h2>
              <p className='text-muted-foreground'>
                (1) Die Laufzeit und Kündigungsmöglichkeit ergibt sich aus dem Rahmenvertrag.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Jede Kündigung bedarf der Schriftform.
              </p>
              <p className='text-muted-foreground mt-4'>(3) Beide Parteien sind berechtigt, den Rahmenvertrag jederzeit ohne Einhaltung einer Frist aus wichtigem Grund zu kündigen. Ein wichtiger Grund liegt insbesondere vor, wenn</p>
              <ul className='list-disc list-inside text-muted-foreground mt-2 space-y-1'>
                <li>der Kunde mit fälligen Zahlungen nach Erhalt der Zahlungserinnerung oder Mahnung länger als 10 Werktage in Verzug ist;</li>
                <li>der Kunde gegen wesentliche Bestimmungen dieser AGB (§ 4) oder sonstiger Rechtsvorschriften verstoßen und trotz Abmahnung innerhalb einer angemessenen Frist keine Abhilfe geschaffen hat. Einer Abmahnung bedarf es dann nicht, wenn diese keinen Erfolg verspricht oder der Verstoß so schwerwiegend ist, dass dem Anbieter ein Festhalten am Vertrag nicht zumutbar ist.</li>
              </ul>
              <p className='text-muted-foreground mt-4'>
                (4) Im Falle einer ordentlichen Kündigung verpflichtet sich AVANTO, dem Kunden sämtliche bei ihm gespeicherten Vertrags- und Kundendaten (auch betreffend Accounts des Kunden) sowie sämtliche Zugänge bis zum Ende der Laufzeit zur Verfügung zu stellen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (5) Nach Kündigung und ggf. Ablauf der Kündigungsfrist sperrt AVANTO die gekündigte Leistung für den Kunden und löscht die im jeweiligen Dienst gespeicherten Kundendaten. Mit Beendigung des Vertrages verliert der Kunde seine Nutzungsberechtigung des betreffenden Dienstes und stellt dessen Nutzung ein. Der Kunde ist für eine rechtzeitige Sicherung seiner Daten verantwortlich und hat keinen Anspruch auf Herausgabe der von ihm erfassten Daten nach Beendigung des Vertrages.
              </p>
            </section>

            <Separator />

            {/* 10. Wettbewerb und Werbung */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>10. Wettbewerb und Werbung</h2>
              <p className='text-muted-foreground'>
                (1) Beide Parteien vereinbaren die technischen und wirtschaftlichen Details ihrer Zusammenarbeit grundsätzlich vertraulich zu behandeln.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Beiden Parteien ist bis auf Widerruf durch eine Partei gestattet, in allgemeinen Kundeninformationen, Broschüren, Präsentationen etc. in allgemeiner Art darüber zu berichten, dass ein Dienstleistungsverhältnis zwischen den Parteien bzw. bei Agenturen mit deren End-Kunden besteht. Die Parteien werden hierzu auf Anfrage Firmen-Logos für Referenzzwecke zur Verfügung stellen.
              </p>
            </section>

            <Separator />

            {/* 11. Datenschutz */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>11. Datenschutz</h2>
              <p className='text-muted-foreground'>
                (1) Die Einhaltung von Datenschutzbestimmungen ist für AVANTO von besonderer Bedeutung. Ergänzend zu den Datenschutzbestimmungen gelten die nachfolgenden Regelungen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Einige Produkte und Services erfassen und analysieren das Verhalten der User des Kunden medienkanalübergreifend. Diese Daten werden von AVANTO ausschließlich anonymisiert erhoben und genutzt.
              </p>
              <p className='text-muted-foreground mt-4'>
                (3) AVANTO wird keine personenbezogenen Daten aus dem Bestand des Kunden, gleich welcher Art, an Dritte weitergeben oder für eigene Zwecke verwerten. Ferner werden auf dem Server nur für den reibungslosen technischen Betrieb relevante Kundendaten gespeichert und nach marktüblichen Sicherheitsstandards – soweit möglich verschlüsselt – abgelegt. Im Hinblick auf die Verpflichtungen beider Parteien wird auf das Bundesdatenschutzgesetz verwiesen. AVANTO ist berechtigt, Daten, die bei der Nutzung der Dienste durch den User entstehen, wie z.B. gesammelte Tracking / Tag Informationen und Statistiken, in anonymisierter Weise zu verwenden.
              </p>
              <p className='text-muted-foreground mt-4'>
                (4) Außerhalb der Login- und Accountverwaltung ist eine Erhebung, Verarbeitung oder Nutzung von personenbezogenen Daten mittels der Dienste durch den Kunden untersagt. Soweit dennoch personenbezogene Daten vom Kunde im Rahmen der Dienste erhoben, verarbeitet oder genutzt werden, liegt eine Auftragsdatenverarbeitung durch AVANTO nach § 11 BDSG vor und der Kunde wird die Einhaltung der hierfür notwendigen gesetzlichen Pflichten selbständig beachten bzw. AVANTO entsprechend (kostenpflichtig) beauftragen. Die Prüfung der rechtlichen, insbesondere der datenschutzrechtlichen Zulässigkeit der Verwendung von Zählpixeln, Trackingcodes und des Setzens von Cookies sowie eine rechtskonforme Verwendung der AVANTO Software im konkreten Einzelfall (insbesondere im Hinblick auf Kundendaten, das Herkunftsland von Kunden und das Land, in welchem die Dienste des Anbieters gemäß den Vorgaben des Kunden wirksam oder verwendet werden sollen) obliegt allein dem Kunden.
              </p>
              <p className='text-muted-foreground mt-4'>
                (5) Sollte AVANTO wegen der Verletzungen datenschutzrechtlicher Bestimmungen oder des Persönlichkeitsrechts Dritter durch den Kunden in Anspruch genommen werden oder ihm sonstige Schäden hierdurch entstehen, wird der Kunde AVANTO von allen denkbaren Ansprüchen, einschließlich der angemessenen Kosten für eine Rechtsverteidigung, freistellen und schadlos halten, sofern der Kunde die Verletzung/Schäden zu vertreten hat.
              </p>
            </section>

            <Separator />

            {/* 12. Information über weitere Angebote */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>12. Information über weitere Angebote von AVANTO</h2>
              <p className='text-muted-foreground'>
                (1) AVANTO wird die für die Vertragsdurchführung zwingend erforderliche E-Mail-Adresse des Kunden auch dazu nutzen, den Kunden gelegentlich über aktuelle Entwicklungen und neue Dienstleistungen oder Produkte bei AVANTO zu informieren.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Dieser Nutzung der E-Mail-Adresse kann der Kunde jederzeit gegenüber AVANTO per E-Mail an info@avanto-vr.com widersprechen. Der Kunde wird in jeder werblichen E-Mail von AVANTO nochmals auf diese Widerspruchsmöglichkeit hingewiesen.
              </p>
            </section>

            <Separator />

            {/* 13. Schlussbestimmungen */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>13. Schlussbestimmungen</h2>
              <p className='text-muted-foreground'>
                (1) Auf den vorliegenden Vertrag ist ausschließlich deutsches Recht, unter Ausschluss des einheitlichen UN-Kaufrechts, anwendbar. Ausschließlicher Gerichtsstand ist Bremen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (2) Gegen Forderungen von AVANTO kann nur mit unbestrittenen oder rechtskräftig festgestellten Gegenforderungen die Aufrechnung erklärt oder ein Zurückbehaltungsrecht geltend gemacht werden.
              </p>
              <p className='text-muted-foreground mt-4'>
                (3) Beabsichtigt AVANTO die Allgemeinen Geschäftsbedingungen zu ändern, wird AVANTO dies dem Kunden mitteilen. Widerspricht der Kunde nicht form- oder fristgemäß, treten die geänderten Geschäftsbedingungen zwei (2) Kalenderwochen nach Zugang der Mitteilung mit Beginn einer neuen Kalenderwoche in Kraft. Der Widerspruch ist nur dann form- und fristgemäß, wenn der Widerspruch in Textform erfolgt und innerhalb von zwei Wochen nach Zugang der Mitteilung bei AVANTO eingeht. AVANTO wird den Kunden auf die Möglichkeit des Widerspruchs, dessen Form und Frist und die Rechtsfolgen eines nicht form- oder fristgemäß erfolgten Widerspruchs hinweisen.
              </p>
              <p className='text-muted-foreground mt-4'>
                (4) Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein oder die Wirksamkeit durch einen später eintretenden Umstand verlieren, bleibt die Wirksamkeit des Vertrages im Übrigen unberührt. Anstelle der unwirksamen Vertragsbestimmungen tritt eine Regelung, die dem am nächsten kommt, was die Vertragsparteien gewollt hätten, sofern sie den betreffenden Punkt bedacht hätten. Entsprechendes gilt für Lücken dieses Vertrages.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
