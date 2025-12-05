import { ArrowLeftIcon, ArrowRightIcon, InfoIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'

const ContactStep = ({ stepper }: { stepper: StepperType }) => {
  const { formData, updateFormData } = useFormData()

  const canProceed = formData.salutation && formData.contactPerson

  return (
    <CardContent className='col-span-5 flex flex-col gap-6 p-6 md:col-span-3'>
      <div className='rounded-lg border bg-muted/30 p-6 text-center'>
        <h3 className='text-lg font-semibold mb-2'>Versand / Ansprechpartner</h3>
        <p className='text-muted-foreground text-sm'>
          Wer soll das Display entgegennehmen?
        </p>
      </div>

      <div className='grid gap-5'>
        {/* Abweichende Versandadresse Checkbox */}
        <div className='rounded-lg border p-4'>
          <div className='flex items-start gap-3'>
            <Checkbox
              id='different-shipping'
              checked={formData.differentShippingAddress}
              onCheckedChange={(checked) => updateFormData({ differentShippingAddress: checked as boolean })}
              className='mt-0.5'
            />
            <Label htmlFor='different-shipping' className='font-medium cursor-pointer'>
              Abweichende Versandadresse
            </Label>
          </div>
        </div>

        {/* Versandadresse (falls abweichend) */}
        {formData.differentShippingAddress && (
          <div className='grid gap-2'>
            <Label htmlFor='shipping-address'>
              Versandadresse
            </Label>
            <Textarea
              id='shipping-address'
              placeholder='Vollständige Versandadresse eingeben...'
              rows={3}
              value={formData.shippingAddress}
              onChange={(e) => updateFormData({ shippingAddress: e.target.value })}
            />
          </div>
        )}

        {/* Anrede */}
        <div className='grid gap-2'>
          <Label htmlFor='salutation'>
            Anrede <span className='text-destructive'>*</span>
          </Label>
          <Select
            value={formData.salutation || ''}
            onValueChange={(value) => updateFormData({ salutation: value as 'herr' | 'frau' | 'divers' })}
          >
            <SelectTrigger id='salutation'>
              <SelectValue placeholder='Anrede wählen' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='herr'>Herr</SelectItem>
              <SelectItem value='frau'>Frau</SelectItem>
              <SelectItem value='divers'>Divers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ansprechpartner */}
        <div className='grid gap-2'>
          <Label htmlFor='contact-person'>
            Ansprechpartner <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='contact-person'
            placeholder='Name des Ansprechpartners'
            value={formData.contactPerson}
            onChange={(e) => updateFormData({ contactPerson: e.target.value })}
          />
        </div>

        {/* Hinweis */}
        <div className='rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-4'>
          <div className='flex items-start gap-3'>
            <InfoIcon className='size-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0' />
            <p className='text-sm text-blue-700 dark:text-blue-300'>
              <span className='font-medium'>Wichtig:</span> Bitte sicherstellen, dass der Ansprechpartner vor Ort ist und das Display entgegengenommen werden kann.
            </p>
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

export default ContactStep
