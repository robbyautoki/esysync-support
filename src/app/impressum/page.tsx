import Header from '@/components/shadcn-studio/blocks/hero-section-12/header'
import Footer from '@/components/shadcn-studio/blocks/footer-component-02/footer-component-02'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'
import { Separator } from '@/components/ui/separator'

const navigationData: NavigationSection[] = [
  { title: 'Startseite', href: '/' },
  { title: 'Status', href: '/ticket-status' },
]

export default function ImpressumPage() {
  return (
    <main className='min-h-dvh flex flex-col'>
      <Header navigationData={navigationData} />

      <div className='flex-1 bg-muted/30'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16'>
          <h1 className='text-3xl font-bold mb-8'>Impressum</h1>

          <div className='prose prose-neutral dark:prose-invert max-w-none space-y-8'>
            {/* Haftungsausschluss Header */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>Haftungsausschluss und inhaltliche Verantwortung</h2>
              <p className='text-muted-foreground'>
                Dies ist die geschäftliche Webseite der AVANTO VR Solutions GmbH
              </p>
              <p className='text-muted-foreground mt-2'>
                <strong>Gegenstand des Unternehmens:</strong><br />
                Entwicklung, Vertrieb und Verkauf von 360° Lösungen.
              </p>
            </section>

            <Separator />

            {/* Firmenadresse */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>AVANTO VR Solutions GmbH</h2>
              <address className='not-italic text-muted-foreground'>
                Otto-Lilienthal-Str. 20<br />
                28199 Bremen
              </address>
              <div className='mt-4 text-muted-foreground space-y-1'>
                <p><strong>Handelsregister Bremen:</strong> HRB 32233</p>
                <p><strong>Geschäftsführender Gesellschafter:</strong> Claudio Schröder</p>
                <p><strong>Telefon:</strong> +49 421 4089 2380</p>
                <p><strong>E-Mail:</strong> info@avanto-vr.com</p>
                <p><strong>Web:</strong> www.avanto-vr.com</p>
                <p><strong>USt-IdNr.:</strong> DE280062948</p>
              </div>
              <p className='mt-4 text-muted-foreground'>
                <strong>Verantwortlich für den Inhalt dieser Webseite:</strong> AVANTO VR Solutions GmbH
              </p>
            </section>

            <Separator />

            {/* Inhalt des Onlineangebotes */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>Inhalt des Onlineangebotes</h2>
              <p className='text-muted-foreground'>
                Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
              </p>
              <p className='text-muted-foreground mt-4'>
                Alle Angebote sind freibleibend und unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
              </p>
            </section>

            <Separator />

            {/* Urheberrecht */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>Urheberrecht</h2>
              <p className='text-muted-foreground'>
                Alle auf dieser Website veröffentlichten Inhalte (Texte, Grafiken, Bilder, Layout usw.) unterliegen dem Urheberrecht. Jede vom Urheberrechtsgesetz nicht zugelassene Verwertung bedarf vorheriger schriftlicher Zustimmung der jeweiligen Berechtigten. Dies gilt insbesondere für Bearbeitung, Übersetzung, Vervielfältigung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen.
              </p>
              <p className='text-muted-foreground mt-4'>
                Downloads und Fotokopien von Web-Seiten – nur für den persönlichen, privaten, nicht kommerziellen Gebrauch – dürfen grundsätzlich hergestellt werden.
              </p>
              <p className='text-muted-foreground mt-4'>
                Die unerlaubte Reproduktion oder Weitergabe einzelner Inhalte oder kompletter Seiten wird straf- und zivilrechtlich verfolgt.
              </p>
              <p className='text-muted-foreground mt-4'>
                Das Copyright der Texte bleibt auch nach der Veröffentlichung im Internet bei AVANTO VR Solutions GmbH
              </p>
            </section>

            <Separator />

            {/* Haftungsausschluss für Fremdinhalte */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>Haftungsausschluss für Fremdinhalte</h2>
              <p className='text-muted-foreground'>
                Bei direkten oder indirekten Verweisen auf fremde Internetseiten (&quot;Links&quot;), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Der Autor erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung die entsprechenden verlinkten Seiten frei von illegalen Inhalten waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der gelinkten / verknüpften Seiten hat der Autor keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller gelinkten / verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
              </p>
            </section>

            <Separator />

            {/* Keine Abmahnung */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>Keine Abmahnung ohne vorherigen nachweisbaren Kontakt</h2>
              <p className='text-muted-foreground'>
                Sollte der Inhalt oder die Aufmachung dieser Seiten fremde Rechte Dritter oder gesetzliche Bestimmungen verletzen, so bitten wir um eine entsprechende Nachricht ohne Kostennote. Die Beseitigung einer möglicherweise von diesen Seiten ausgehenden Schutzrecht-Verletzung durch Schutzrecht-Inhaber/Innen selbst darf nicht ohne unsere Zustimmung stattfinden. Wir garantieren, dass die zu Recht beanstandeten Passagen unverzüglich entfernt werden, ohne dass von Ihrer Seite die Einschaltung eines Rechtsbeistandes erforderlich ist. Dennoch von Ihnen ohne vorherige Kontaktaufnahme ausgelöste Kosten werden wir voll umfänglich zurückweisen und gegebenenfalls Gegenklage wegen Verletzung vorgenannter Bestimmungen einreichen.
              </p>
            </section>

            <Separator />

            {/* Bildnachweis */}
            <section>
              <h2 className='text-xl font-semibold mb-4'>Bildnachweis</h2>
              <ul className='text-muted-foreground list-disc list-inside space-y-1'>
                <li>iStock.com/Pinkypills</li>
                <li>iStock.com/gilaxia</li>
                <li>iStock.com/PeopleImages</li>
                <li>iStock.com/shapecharge</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
