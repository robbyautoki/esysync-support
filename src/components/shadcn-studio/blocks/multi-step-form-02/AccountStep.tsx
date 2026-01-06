import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'

const countries = [
  'Deutschland',
  'Österreich',
  'Schweiz',
  'Niederlande',
  'Belgien',
  'Luxemburg',
  'Frankreich',
  'Italien',
  'Spanien',
  'Polen',
  'Tschechien',
]

const AccountStep = ({ stepper }: { stepper: StepperType }) => {
  const { formData, updateFormData } = useFormData()

  const canProceed = formData.accountNumber && formData.displayNumber && formData.street && formData.postalCode && formData.city && formData.country && formData.email

  const addDisplayNumber = () => {
    updateFormData({ additionalDisplayNumbers: [...formData.additionalDisplayNumbers, ''] })
  }

  const removeDisplayNumber = (index: number) => {
    const updated = formData.additionalDisplayNumbers.filter((_, i) => i !== index)
    updateFormData({ additionalDisplayNumbers: updated })
  }

  const updateDisplayNumber = (index: number, value: string) => {
    const updated = [...formData.additionalDisplayNumbers]
    updated[index] = value
    updateFormData({ additionalDisplayNumbers: updated })
  }

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

        {/* Standort / Rücksendeadresse - Einzelfelder */}
        <div className='space-y-4'>
          <Label>
            Standort des Displays / Rücksendeadresse <span className='text-destructive'>*</span>
          </Label>
          
          {/* Straße */}
          <div className='grid gap-2'>
            <Label htmlFor='street' className='text-sm text-muted-foreground'>
              Straße und Hausnummer
            </Label>
            <Input
              id='street'
              placeholder='Musterstraße 123'
              value={formData.street}
              onChange={(e) => updateFormData({ street: e.target.value })}
            />
          </div>

          {/* PLZ und Ort */}
          <div className='grid grid-cols-3 gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='postal-code' className='text-sm text-muted-foreground'>
                PLZ
              </Label>
              <Input
                id='postal-code'
                placeholder='12345'
                value={formData.postalCode}
                onChange={(e) => updateFormData({ postalCode: e.target.value })}
              />
            </div>
            <div className='col-span-2 grid gap-2'>
              <Label htmlFor='city' className='text-sm text-muted-foreground'>
                Ort
              </Label>
              <Input
                id='city'
                placeholder='Musterstadt'
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
              />
            </div>
          </div>

          {/* Land */}
          <div className='grid gap-2'>
            <Label htmlFor='country' className='text-sm text-muted-foreground'>
              Land
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) => updateFormData({ country: value })}
            >
              <SelectTrigger id='country'>
                <SelectValue placeholder='Land wählen' />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
              onCheckedChange={(checked) => {
                updateFormData({ 
                  additionalDeviceAffected: checked as boolean,
                  additionalDisplayNumbers: checked ? [''] : []
                })
              }}
              className='mt-0.5'
            />
            <div className='flex-1'>
              <Label htmlFor='additional-device' className='font-medium cursor-pointer'>
                Sind weitere Geräte betroffen?
              </Label>
              <p className='text-muted-foreground text-sm mt-1'>
                Bitte markieren, falls weitere Displays ebenfalls defekt sind.
              </p>
            </div>
          </div>

          {/* Dynamische Liste für zusätzliche Displaynummern */}
          {formData.additionalDeviceAffected && (
            <div className='mt-4 space-y-3 border-t pt-4'>
              <Label className='text-sm'>Weitere Displaynummern</Label>
              {formData.additionalDisplayNumbers.map((num, index) => (
                <div key={index} className='flex gap-2'>
                  <Input
                    placeholder={`Displaynummer ${index + 2}`}
                    value={num}
                    onChange={(e) => updateDisplayNumber(index, e.target.value)}
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='icon'
                    onClick={() => removeDisplayNumber(index)}
                  >
                    <XIcon className='size-4' />
                  </Button>
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addDisplayNumber}
                className='w-full'
              >
                <PlusIcon className='size-4 mr-2' />
                Weitere Displaynummer hinzufügen
              </Button>
            </div>
          )}
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
