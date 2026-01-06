import Header from '@/components/shadcn-studio/blocks/hero-section-12/header'
import Footer from '@/components/shadcn-studio/blocks/footer-component-02/footer-component-02'
import MultiStepForm from '@/components/shadcn-studio/blocks/multi-step-form-02/MultiStepForm'
import type { NavigationSection } from '@/components/shadcn-studio/blocks/menu-navigation'

const navigationData: NavigationSection[] = [
  { title: 'Startseite', href: '/' },
  { title: 'Status', href: '/ticket-status' },
  { title: 'FAQ', href: '/faq' },
]

const MultiStepFormPage = () => {
  return (
    <main>
      <Header navigationData={navigationData} />
      <div className='py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 text-center'>
            <h1 className='text-3xl font-bold sm:text-4xl'>Support-Anfrage</h1>
            <p className='text-muted-foreground mt-2'>
              Beschreiben Sie Ihr Problem und wir melden uns schnellstmöglich bei Ihnen.
            </p>
          </div>
          <MultiStepForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default MultiStepFormPage
