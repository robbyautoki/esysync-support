import { CheckCircleIcon, HomeIcon, PlusIcon, PhoneIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'

const ConfirmationStep = ({ stepper }: { stepper: StepperType }) => {
  const { resetForm } = useFormData()

  const handleNewRequest = () => {
    resetForm()
    stepper.reset()
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
