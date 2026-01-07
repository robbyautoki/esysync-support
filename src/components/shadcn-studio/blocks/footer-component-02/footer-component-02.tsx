import { Separator } from '@/components/ui/separator'

import Logo from '@/components/shadcn-studio/logo'

const Footer = () => {
  return (
    <footer id='kontakt'>
      <div className='mx-auto grid max-w-7xl grid-cols-6 gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-16 md:py-24'>
        <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
          <a href='/'>
            <Logo className='gap-3' />
          </a>
          <p className='text-muted-foreground'>
            Ihr zuverlässiger Partner für Display-Support. Wir helfen Immobilienmaklern und Banken bei technischen
            Problemen mit digitalen Exposé-Displays im Schaufenster oder in der Filiale.
          </p>
        </div>
        <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-4 lg:gap-8'>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Support</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='/ticket-status'>Status</a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Rechtliches</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='/impressum'>Impressum</a>
              </li>
              <li>
                <a href='/datenschutz'>Datenschutz</a>
              </li>
              <li>
                <a href='/agb'>AGB</a>
              </li>
            </ul>
          </div>
          <div className='col-span-full flex flex-col gap-5 sm:col-span-2'>
            <div>
              <p className='mb-3 text-lg font-medium'>Schnelle Hilfe</p>
              <p className='text-muted-foreground text-sm'>
                Bei dringenden Problemen nutzen Sie bitte unser Support-Formular.
                Für eine schnelle Fernwartung halten Sie bitte Ihre Kundennummer bereit.
              </p>
            </div>
            <Separator />
            <div className='text-muted-foreground text-sm'>
              <p className='font-medium'>Support-Zeiten:</p>
              <p>Mo - Fr: 10:00 - 17:00 Uhr</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-6 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`© ${new Date().getFullYear()}`} <a href='/' className='hover:text-primary'>esysync</a> - Display-Support für Immobilienprofis
        </p>
      </div>
    </footer>
  )
}

export default Footer
