import { ArrowLeftIcon, SendIcon, EditIcon, Loader2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData, problemCategories, shippingOptions } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'
import { useState } from 'react'

const SummaryStep = ({ stepper }: { stepper: StepperType }) => {
  const { formData, updateFormData } = useFormData()
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get readable values
  const category = formData.category ? problemCategories[formData.category] : null
  const problem = category?.problems.find(p => p.id === formData.problemDetail)
  const shipping = shippingOptions.find(o => o.id === formData.shippingOption)

  const salutationMap = { herr: 'Herr', frau: 'Frau', divers: 'Divers' }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        updateFormData({ ticketNumber: result.ticket.ticketNumber })
        stepper.next()
      } else {
        setError(result.error || 'Fehler beim Absenden der Anfrage')
      }
    } catch {
      setError('Netzwerkfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CardContent className='col-span-5 flex flex-col gap-6 p-6 md:col-span-3'>
      <div className='rounded-lg border bg-muted/30 p-6 text-center'>
        <h3 className='text-lg font-semibold mb-2'>Zusammenfassung</h3>
        <p className='text-muted-foreground text-sm'>
          Bitte überprüfen Sie Ihre Angaben vor dem Absenden.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Problem */}
        <div className='rounded-lg border p-4'>
          <div className='flex items-center justify-between mb-3'>
            <h4 className='font-semibold'>Problem</h4>
            <Button variant='ghost' size='sm' onClick={() => stepper.goTo('step-category')}>
              <EditIcon className='size-4 mr-1' />
              Bearbeiten
            </Button>
          </div>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Kategorie:</span>
              <span className='font-medium'>{category?.label}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Problem:</span>
              <span className='font-medium text-right max-w-[60%]'>{problem?.label}</span>
            </div>
          </div>
        </div>

        {/* Versand */}
        <div className='rounded-lg border p-4'>
          <div className='flex items-center justify-between mb-3'>
            <h4 className='font-semibold'>Versandoption</h4>
            <Button variant='ghost' size='sm' onClick={() => stepper.goTo('step-shipping')}>
              <EditIcon className='size-4 mr-1' />
              Bearbeiten
            </Button>
          </div>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Option:</span>
              <span className='font-medium'>{shipping?.label}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Preis:</span>
              <span className='font-medium text-primary'>{shipping?.price}</span>
            </div>
          </div>
        </div>

        {/* Account-Daten */}
        <div className='rounded-lg border p-4'>
          <div className='flex items-center justify-between mb-3'>
            <h4 className='font-semibold'>Account- & Gerätedaten</h4>
            <Button variant='ghost' size='sm' onClick={() => stepper.goTo('step-account')}>
              <EditIcon className='size-4 mr-1' />
              Bearbeiten
            </Button>
          </div>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Accountnummer:</span>
              <span className='font-medium'>{formData.accountNumber}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Displaynummer:</span>
              <span className='font-medium'>{formData.displayNumber}</span>
            </div>
            <Separator className='my-2' />
            <div>
              <span className='text-muted-foreground'>Standort / Rücksendeadresse:</span>
              <p className='font-medium mt-1 whitespace-pre-line'>{formData.displayLocation}</p>
            </div>
            {formData.alternateReturnAddress && (
              <div>
                <span className='text-muted-foreground'>Abweichende Rücksendeadresse:</span>
                <p className='font-medium mt-1 whitespace-pre-line'>{formData.alternateReturnAddress}</p>
              </div>
            )}
            <Separator className='my-2' />
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>E-Mail:</span>
              <span className='font-medium'>{formData.email}</span>
            </div>
            {formData.additionalDeviceAffected && (
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Weiteres Gerät betroffen:</span>
                <span className='font-medium text-amber-600'>Ja</span>
              </div>
            )}
          </div>
        </div>

        {/* Ansprechpartner */}
        <div className='rounded-lg border p-4'>
          <div className='flex items-center justify-between mb-3'>
            <h4 className='font-semibold'>Ansprechpartner</h4>
            <Button variant='ghost' size='sm' onClick={() => stepper.goTo('step-contact')}>
              <EditIcon className='size-4 mr-1' />
              Bearbeiten
            </Button>
          </div>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Ansprechpartner:</span>
              <span className='font-medium'>
                {formData.salutation && salutationMap[formData.salutation]} {formData.contactPerson}
              </span>
            </div>
            {formData.differentShippingAddress && formData.shippingAddress && (
              <div>
                <span className='text-muted-foreground'>Abweichende Versandadresse:</span>
                <p className='font-medium mt-1 whitespace-pre-line'>{formData.shippingAddress}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bestätigung */}
      <div className='rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4'>
        <div className='flex items-start gap-3'>
          <Checkbox
            id='confirm-details'
            checked={confirmed}
            onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            className='mt-0.5'
          />
          <Label htmlFor='confirm-details' className='text-sm cursor-pointer'>
            Ich bestätige, dass alle Angaben korrekt sind und akzeptiere die{' '}
            <a href='/datenschutz' className='text-primary underline'>Datenschutzrichtlinien</a>.
          </Label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-4'>
          <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
        </div>
      )}

      <div className='flex justify-between gap-4 pt-4'>
        <Button variant='secondary' size='lg' onClick={stepper.prev} disabled={loading}>
          <ArrowLeftIcon className='mr-2 size-4' />
          Zurück
        </Button>
        <Button
          size='lg'
          onClick={handleSubmit}
          disabled={!confirmed || loading}
          className='bg-green-600 hover:bg-green-700'
        >
          {loading ? (
            <>
              <Loader2Icon className='mr-2 size-4 animate-spin' />
              Wird gesendet...
            </>
          ) : (
            <>
              <SendIcon className='mr-2 size-4' />
              Anfrage absenden
            </>
          )}
        </Button>
      </div>
    </CardContent>
  )
}

export default SummaryStep
