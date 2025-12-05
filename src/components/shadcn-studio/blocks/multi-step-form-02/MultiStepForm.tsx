'use client'

import * as Stepperize from '@stepperize/react'
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  FileTextIcon,
  PackageIcon,
  DatabaseIcon,
  UserIcon,
  ClipboardCheckIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

import { FormProvider } from '@/components/shadcn-studio/blocks/multi-step-form-02/FormContext'
import CategoryStep from '@/components/shadcn-studio/blocks/multi-step-form-02/CategoryStep'
import ProblemDetailStep from '@/components/shadcn-studio/blocks/multi-step-form-02/ProblemDetailStep'
import ShippingStep from '@/components/shadcn-studio/blocks/multi-step-form-02/ShippingStep'
import AccountStep from '@/components/shadcn-studio/blocks/multi-step-form-02/AccountStep'
import ContactStep from '@/components/shadcn-studio/blocks/multi-step-form-02/ContactStep'
import SummaryStep from '@/components/shadcn-studio/blocks/multi-step-form-02/SummaryStep'
import ConfirmationStep from '@/components/shadcn-studio/blocks/multi-step-form-02/ConfirmationStep'

const { useStepper, utils } = Stepperize.defineStepper(
  { id: 'step-category', title: 'Kategorie', description: 'Problemart wählen', icon: AlertTriangleIcon },
  { id: 'step-problem', title: 'Problem', description: 'Details zum Problem', icon: FileTextIcon },
  { id: 'step-shipping', title: 'Versand', description: 'Versandoption wählen', icon: PackageIcon },
  { id: 'step-account', title: 'Account', description: 'Ihre Daten', icon: DatabaseIcon },
  { id: 'step-contact', title: 'Kontakt', description: 'Ansprechpartner', icon: UserIcon },
  { id: 'step-summary', title: 'Prüfen', description: 'Zusammenfassung', icon: ClipboardCheckIcon },
  { id: 'step-confirmation', title: 'Fertig', description: 'Anfrage gesendet', icon: CheckCircleIcon }
)

export type StepperType = ReturnType<typeof useStepper>

const MultiStepFormContent = () => {
  const stepper = useStepper()
  const currentStep = utils.getIndex(stepper.current.id)

  return (
    <Card className='gap-0 p-0 md:grid md:max-lg:grid-cols-5 lg:grid-cols-4'>
      <CardContent className='col-span-5 p-6 max-md:border-b md:border-r md:max-lg:col-span-2 lg:col-span-1'>
        <nav aria-label='Multi Steps'>
          <ol className='flex flex-col justify-between gap-x-2 gap-y-4'>
            {stepper.all
              .filter(step => step.id !== 'step-confirmation')
              .map((step, index) => (
                <li key={step.id}>
                  <Button
                    variant='ghost'
                    className='h-auto w-full shrink-0 cursor-pointer justify-start gap-2 rounded !bg-transparent p-0'
                    onClick={() => stepper.goTo(step.id)}
                  >
                    <Avatar className='size-9.5'>
                      <AvatarFallback
                        className={cn({ 'bg-primary text-primary-foreground shadow-sm': index <= currentStep })}
                      >
                        <step.icon className='size-4' />
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start'>
                      <span>{step.title}</span>
                      <span className='text-muted-foreground text-sm'>{step.description}</span>
                    </div>
                  </Button>
                </li>
              ))}
          </ol>
        </nav>
      </CardContent>
      {stepper.switch({
        'step-category': () => <CategoryStep stepper={stepper} />,
        'step-problem': () => <ProblemDetailStep stepper={stepper} />,
        'step-shipping': () => <ShippingStep stepper={stepper} />,
        'step-account': () => <AccountStep stepper={stepper} />,
        'step-contact': () => <ContactStep stepper={stepper} />,
        'step-summary': () => <SummaryStep stepper={stepper} />,
        'step-confirmation': () => <ConfirmationStep stepper={stepper} />
      })}
    </Card>
  )
}

const MultiStepForm = () => {
  return (
    <FormProvider>
      <MultiStepFormContent />
    </FormProvider>
  )
}

export default MultiStepForm
