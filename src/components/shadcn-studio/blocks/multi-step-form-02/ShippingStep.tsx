import { ArrowLeftIcon, ArrowRightIcon, PackageIcon, BoxIcon, TruckIcon, RefreshCwIcon, StarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData, shippingOptions, type ShippingOptionType } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'

const shippingIcons = {
  'own-packaging': PackageIcon,
  'avantor-box': BoxIcon,
  'technician': TruckIcon,
  'complete-swap': RefreshCwIcon,
}

const ShippingStep = ({ stepper }: { stepper: StepperType }) => {
  const { formData, updateFormData } = useFormData()

  const handleShippingChange = (value: string) => {
    updateFormData({ shippingOption: value as ShippingOptionType })
  }

  return (
    <CardContent className='col-span-5 flex flex-col gap-6 p-6 md:col-span-3'>
      <div className='rounded-lg border bg-muted/30 p-6 text-center'>
        <h3 className='text-lg font-semibold mb-2'>Versandoption wählen</h3>
        <p className='text-muted-foreground text-sm'>
          Wie möchten Sie das Display zu uns senden?
        </p>
      </div>

      <RadioGroup
        className='grid gap-4 sm:grid-cols-2'
        value={formData.shippingOption || ''}
        onValueChange={handleShippingChange}
      >
        {shippingOptions.map((option) => {
          const Icon = shippingIcons[option.id]
          return (
            <div
              key={option.id}
              className={`border-input has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 relative flex w-full flex-col gap-3 rounded-lg border-2 p-5 shadow-xs outline-none transition-colors ${option.recommended ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              {option.recommended && (
                <Badge className='absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary'>
                  <StarIcon className='size-3 mr-1' />
                  Empfohlen
                </Badge>
              )}
              <div className='flex items-start gap-3'>
                <RadioGroupItem
                  value={option.id}
                  id={`shipping-${option.id}`}
                  className='mt-1 size-5 shrink-0 [&_svg]:size-3'
                  aria-describedby={`${option.id}-description`}
                />
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-1'>
                    <Icon className='size-5 text-primary' />
                    <span className='font-semibold'>{option.label}</span>
                  </div>
                  <p
                    id={`${option.id}-description`}
                    className='text-muted-foreground text-sm mb-2'
                  >
                    {option.description}
                  </p>
                  <p className='text-lg font-bold text-primary'>
                    {option.price}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </RadioGroup>

      <div className='flex justify-between gap-4 pt-4'>
        <Button variant='secondary' size='lg' onClick={stepper.prev}>
          <ArrowLeftIcon className='mr-2 size-4' />
          Zurück
        </Button>
        <Button
          size='lg'
          onClick={stepper.next}
          disabled={!formData.shippingOption}
        >
          Weiter
          <ArrowRightIcon className='ml-2 size-4' />
        </Button>
      </div>
    </CardContent>
  )
}

export default ShippingStep
