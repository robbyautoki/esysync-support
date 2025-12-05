import { MailIcon, PhoneIcon } from 'lucide-react'

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
          <Separator className='!w-35' />
          <div className='flex flex-col gap-2'>
            <a href='tel:+4912345678' className='flex items-center gap-2 text-muted-foreground hover:text-primary'>
              <PhoneIcon className='size-4' />
              +49 123 456 78
            </a>
            <a href='mailto:support@esysync.de' className='flex items-center gap-2 text-muted-foreground hover:text-primary'>
              <MailIcon className='size-4' />
              support@esysync.de
            </a>
          </div>
        </div>
        <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-4 lg:gap-8'>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Support</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='/anleitungen'>Anleitungen</a>
              </li>
              <li>
                <a href='/faq'>FAQ</a>
              </li>
              <li>
                <a href='/fernwartung'>Fernwartung</a>
              </li>
              <li>
                <a href='#kontakt'>Kontakt</a>
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
                Bei dringenden Problemen erreichen Sie unseren Support telefonisch oder per E-Mail.
                Für eine schnelle Fernwartung halten Sie bitte Ihre Kundennummer bereit.
              </p>
            </div>
            <Separator />
            <div className='text-muted-foreground text-sm'>
              <p className='font-medium'>Support-Zeiten:</p>
              <p>Mo - Fr: 8:00 - 18:00 Uhr</p>
              <p>Sa: 9:00 - 14:00 Uhr</p>
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
