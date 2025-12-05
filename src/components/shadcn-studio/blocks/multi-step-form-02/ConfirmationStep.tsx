import { CheckCircleIcon, HomeIcon, PlusIcon, PhoneIcon, CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'
import { useState } from 'react'

const ConfirmationStep = ({ stepper }: { stepper: StepperType }) => {
  const { formData, resetForm } = useFormData()
  const [copied, setCopied] = useState(false)

  const handleNewRequest = () => {
    resetForm()
    stepper.reset()
  }

  const copyTicketNumber = async () => {
    if (formData.ticketNumber) {
      await navigator.clipboard.writeText(formData.ticketNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <CardContent className='col-span-5 flex flex-col gap-6 p-6 md:col-span-3'>
      <div className='flex flex-col items-center text-center gap-4 py-8'>
        <div className='rounded-full bg-green-100 dark:bg-green-900/30 p-4'>
          <CheckCircleIcon className='size-12 text-green-600 dark:text-green-400' />
        </div>
        <div>
          <h2 className='text-2xl font-semibold'>Anfrage erfolgreich gesendet!</h2>
          <p className='text-muted-foreground mt-2'>
            Vielen Dank für Ihre Support-Anfrage. Wir haben Ihre Nachricht erhalten.
          </p>
        </div>
      </div>

      {/* Ticket-Nummer */}
      {formData.ticketNumber && (
        <div className='rounded-lg border-2 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-6 text-center'>
          <p className='text-sm text-muted-foreground mb-2'>Ihre Ticket-Nummer:</p>
          <div className='flex items-center justify-center gap-2'>
            <p className='text-2xl font-bold text-green-600 dark:text-green-400 font-mono'>
              {formData.ticketNumber}
            </p>
            <Button variant='ghost' size='sm' onClick={copyTicketNumber} className='h-8 w-8 p-0'>
              <CopyIcon className='size-4' />
              <span className='sr-only'>Kopieren</span>
            </Button>
          </div>
          {copied && (
            <p className='text-xs text-green-600 mt-2'>Kopiert!</p>
          )}
          <p className='text-xs text-muted-foreground mt-3'>
            Bitte bewahren Sie diese Nummer für Rückfragen auf.
          </p>
        </div>
      )}

      <div className='rounded-lg border bg-muted/30 p-4 space-y-3'>
        <h3 className='font-semibold'>Wie geht es weiter?</h3>
        <ul className='text-sm text-muted-foreground space-y-2'>
          <li className='flex items-start gap-2'>
            <span className='text-primary font-bold'>1.</span>
            Sie erhalten in Kürze eine Bestätigungs-E-Mail mit Ihrer Ticket-Nummer.
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-primary font-bold'>2.</span>
            Unser Support-Team prüft Ihre Anfrage und meldet sich bei Ihnen.
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-primary font-bold'>3.</span>
            Je nach gewählter Versandoption erhalten Sie weitere Informationen zum Versand.
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-primary font-bold'>4.</span>
            Nach Eingang des Displays wird die Reparatur durchgeführt und Sie werden über den Status informiert.
          </li>
        </ul>
      </div>

      <div className='rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-4'>
        <div className='flex items-center gap-2 text-blue-800 dark:text-blue-200'>
          <PhoneIcon className='size-4' />
          <p className='text-sm font-medium'>
            Dringende Fälle? Rufen Sie uns direkt an: +49 123 456 78
          </p>
        </div>
      </div>

      <div className='flex justify-center gap-4 pt-4'>
        <Button variant='outline' size='lg' onClick={handleNewRequest}>
          <PlusIcon className='size-4 mr-2' />
          Neue Anfrage
        </Button>
        <Button size='lg' asChild>
          <a href='/'>
            <HomeIcon className='size-4 mr-2' />
            Zur Startseite
          </a>
        </Button>
      </div>
    </CardContent>
  )
}

export default ConfirmationStep
