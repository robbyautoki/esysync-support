import { ArrowRightIcon, MonitorIcon, CodeIcon, WifiIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData, problemCategories, type CategoryType } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'

const categoryIcons = {
  hardware: MonitorIcon,
  software: CodeIcon,
  network: WifiIcon,
}

const CategoryStep = ({ stepper }: { stepper: StepperType }) => {
  const { formData, updateFormData } = useFormData()

  const handleCategoryChange = (value: string) => {
    updateFormData({
      category: value as CategoryType,
      problemDetail: null // Reset problem detail when category changes
    })
  }

  return (
    <CardContent className='col-span-5 flex flex-col gap-6 p-6 md:col-span-3'>
      <div className='rounded-lg border bg-muted/30 p-6 text-center'>
        <h3 className='text-lg font-semibold mb-2'>Welche Art von Problem haben Sie?</h3>
        <p className='text-muted-foreground text-sm'>Wählen Sie die Kategorie, die Ihr Problem am besten beschreibt.</p>
      </div>

      <RadioGroup
        className='grid gap-4 sm:grid-cols-3 md:max-lg:grid-cols-1'
        value={formData.category || ''}
        onValueChange={handleCategoryChange}
      >
        {(Object.entries(problemCategories) as [CategoryType, typeof problemCategories[CategoryType]][]).map(([key, category]) => {
          const Icon = categoryIcons[key]
          return (
            <div
              key={key}
              className='border-input has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 relative flex w-full flex-col items-center gap-3 rounded-lg border-2 p-6 shadow-xs outline-none transition-colors'
            >
              <RadioGroupItem
                value={key}
                id={`category-${key}`}
                className='order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3'
                aria-describedby={`${key}-description`}
                aria-label={`category-radio-${key}`}
              />
              <div className='grid grow justify-items-center gap-3'>
                <div className='rounded-full bg-primary/10 p-4'>
                  <Icon className='size-8 text-primary' />
                </div>
                <div className='flex flex-col items-center text-center'>
                  <p className='font-semibold text-lg'>{category.label}</p>
                  <p id={`${key}-description`} className='text-muted-foreground text-sm mt-1'>
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </RadioGroup>

      <div className='flex justify-end gap-4 pt-4'>
        <Button
          size='lg'
          onClick={stepper.next}
          disabled={!formData.category}
        >
          Weiter
          <ArrowRightIcon className='ml-2 size-4' />
        </Button>
      </div>
    </CardContent>
  )
}

export default CategoryStep
