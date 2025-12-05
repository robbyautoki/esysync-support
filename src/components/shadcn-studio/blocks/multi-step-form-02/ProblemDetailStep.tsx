import { ArrowLeftIcon, ArrowRightIcon, AlertCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import type { StepperType } from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import { useFormData, problemCategories } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'

const ProblemDetailStep = ({ stepper }: { stepper: StepperType }) => {
  const { formData, updateFormData } = useFormData()

  const selectedCategory = formData.category ? problemCategories[formData.category] : null
  const problems = selectedCategory?.problems || []

  const handleProblemChange = (value: string) => {
    updateFormData({ problemDetail: value })
  }

  const handleRestartChange = (checked: boolean) => {
    updateFormData({ hasRestarted: checked })
  }

  const canProceed = formData.problemDetail && formData.hasRestarted

  return (
    <CardContent className='col-span-5 flex flex-col gap-6 p-6 md:col-span-3'>
      <div className='rounded-lg border bg-muted/30 p-6 text-center'>
        <h3 className='text-lg font-semibold mb-2'>
          {selectedCategory?.label}: Wählen Sie das genaue Problem
        </h3>
        <p className='text-muted-foreground text-sm'>
          Bitte wählen Sie die Beschreibung, die Ihrem Problem am nächsten kommt.
        </p>
      </div>

      <RadioGroup
        className='grid gap-3 max-h-[400px] overflow-y-auto pr-2'
        value={formData.problemDetail || ''}
        onValueChange={handleProblemChange}
      >
        {problems.map((problem) => (
          <div
            key={problem.id}
            className='border-input has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-xs outline-none transition-colors'
          >
            <RadioGroupItem
              value={problem.id}
              id={`problem-${problem.id}`}
              className='mt-0.5 size-5 shrink-0 [&_svg]:size-3'
              aria-describedby={`${problem.id}-description`}
            />
            <div className='flex flex-col gap-1'>
              <Label
                htmlFor={`problem-${problem.id}`}
                className='font-medium cursor-pointer'
              >
                {problem.label}
              </Label>
              <p
                id={`${problem.id}-description`}
                className='text-muted-foreground text-sm'
              >
                {problem.description}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>

      {/* Neustart-Bestätigung */}
      <div className='rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4'>
        <div className='flex items-start gap-3'>
          <AlertCircleIcon className='size-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0' />
          <div className='flex-1'>
            <p className='font-medium text-amber-800 dark:text-amber-200 mb-3'>
              Wichtiger Hinweis
            </p>
            <div className='flex items-start gap-3'>
              <Checkbox
                id='restart-confirm'
                checked={formData.hasRestarted}
                onCheckedChange={handleRestartChange}
                className='mt-0.5'
              />
              <Label
                htmlFor='restart-confirm'
                className='text-sm text-amber-700 dark:text-amber-300 cursor-pointer'
              >
                Ich bestätige, dass ich das Display bereits neugestartet habe.
                <span className='block text-xs text-amber-600 dark:text-amber-400 mt-1'>
                  Ein Neustart löst viele Probleme automatisch. Bitte versuchen Sie dies zuerst.
                </span>
              </Label>
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

export default ProblemDetailStep
