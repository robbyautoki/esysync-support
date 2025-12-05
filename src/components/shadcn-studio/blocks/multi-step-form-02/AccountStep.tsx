import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'

const AccountStep = ({ stepper }: { stepper: StepperType }) => {
  const { formData, updateFormData } = useFormData()

  const canProceed = formData.accountNumber && formData.displayNumber && formData.displayLocation && formData.email

  return (
    <CardContent className='col-span-5 flex flex-col gap-6 p-6 md:col-span-3'>
      <div className='rounded-lg border bg-muted/30 p-6 text-center'>
        <h3 className='text-lg font-semibold mb-2'>Account- & Gerätedaten</h3>
        <p className='text-muted-foreground text-sm'>
          Bitte geben Sie Ihre Account- und Displayinformationen ein.
        </p>
      </div>

      <div className='grid gap-5'>
        {/* Accountnummer */}
        <div className='grid gap-2'>
          <Label htmlFor='account-number'>
            Accountnummer <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='account-number'
            placeholder='z.B. ACC-12345'
            value={formData.accountNumber}
            onChange={(e) => updateFormData({ accountNumber: e.target.value })}
          />
        </div>

        {/* Displaynummer */}
        <div className='grid gap-2'>
          <Label htmlFor='display-number'>
            Displaynummer <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='display-number'
            placeholder='z.B. DSP-67890'
            value={formData.displayNumber}
            onChange={(e) => updateFormData({ displayNumber: e.target.value })}
          />
        </div>

        {/* Standort / Rücksendeadresse */}
        <div className='grid gap-2'>
          <Label htmlFor='display-location'>
            Standort des Displays und gleichzeitig auch Rücksendeadresse <span className='text-destructive'>*</span>
          </Label>
          <Textarea
            id='display-location'
            placeholder='Vollständige Adresse eingeben:&#10;Straße, Hausnummer&#10;PLZ, Stadt&#10;Land'
            rows={4}
            value={formData.displayLocation}
            onChange={(e) => updateFormData({ displayLocation: e.target.value })}
          />
        </div>

        {/* Abweichende Rücksendeadresse */}
        <div className='grid gap-2'>
          <Label htmlFor='alternate-return-address'>
            Abweichende Rücksendeadresse (optional)
          </Label>
          <Textarea
            id='alternate-return-address'
            placeholder='Falls die Rücksendeadresse abweicht, hier eingeben...'
            rows={3}
            value={formData.alternateReturnAddress}
            onChange={(e) => updateFormData({ alternateReturnAddress: e.target.value })}
          />
        </div>

        {/* E-Mail */}
        <div className='grid gap-2'>
          <Label htmlFor='email'>
            E-Mail-Adresse zur Kommunikation <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='ihre@email.de'
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
          />
        </div>

        {/* Zusätzliche Geräte */}
        <div className='rounded-lg border p-4'>
          <div className='flex items-start gap-3'>
            <Checkbox
              id='additional-device'
              checked={formData.additionalDeviceAffected}
              onCheckedChange={(checked) => updateFormData({ additionalDeviceAffected: checked as boolean })}
              className='mt-0.5'
            />
            <div>
              <Label htmlFor='additional-device' className='font-medium cursor-pointer'>
                Ist ein weiteres Gerät betroffen?
              </Label>
              <p className='text-muted-foreground text-sm mt-1'>
                Bitte markieren, falls ein weiteres Display oder Gerät ebenfalls defekt ist und bearbeitet werden muss.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between gap-4 pt-4'>
        <Button variant='secondary' size='lg' onClick={stepper.prev}>
          <ArrowLeftIcon className='mr-2 size-4' />
          Zurück
        </Button>
        <Button
          size='lg'
          onClick={stepper.next}
          disabled={!canProceed}
        >
          Weiter
          <ArrowRightIcon className='ml-2 size-4' />
        </Button>
      </div>
    </CardContent>
  )
}

export default AccountStep
