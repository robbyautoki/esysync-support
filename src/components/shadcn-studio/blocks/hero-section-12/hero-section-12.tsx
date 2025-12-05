import { BookOpenIcon, HeadphonesIcon } from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { TextFlip } from '@/components/ui/text-flip'
import { BorderBeam } from '@/components/ui/border-beam'

const HeroSection = () => {
  return (
    <section className='flex-1 py-4 sm:py-6 lg:py-8'>
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-12 px-4 sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'>
        <div className='relative grid gap-12 xl:grid-cols-5'>
          <div className='flex flex-col justify-center gap-6 xl:col-span-3'>
            <MotionPreset
              fade
              zoom={{ initialScale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              delay={0.1}
            >
              <Badge variant='outline' className='bg-background relative px-3 py-1 font-normal'>
                Display-Support für Immobilienprofis
                <BorderBeam colorFrom='var(--primary)' colorTo='var(--primary)' size={35} duration={8} />
              </Badge>
            </MotionPreset>
            <MotionPreset
              fade
              slide={{ direction: 'up', offset: 80 }}
              blur='8px'
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              delay={0.2}
            >
              <h1 className='max-w-3xl text-3xl leading-[1.29167] font-bold sm:text-4xl lg:text-5xl'>
                Ihr Display zeigt Probleme? Wir helfen{' '}
                <MotionPreset
                  component='div'
                  zoom={{ initialScale: 0.5 }}
                  fade
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  delay={0.5}
                  className='bg-primary/10 relative inline-block border-2 px-3'
                >
                  <TextFlip words={['Schnell', 'Zuverlässig', 'Kompetent']} />
                  <MotionPreset
                    component='span'
                    zoom={{ initialScale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    delay={0.6}
                    className='bg-primary absolute -top-1.5 -left-1.5 size-2.5 rounded-xs'
                  />
                  <MotionPreset
                    component='span'
                    zoom={{ initialScale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    delay={0.65}
                    className='bg-primary absolute -top-1.5 -right-1.5 size-2.5 rounded-xs'
                  />
                  <MotionPreset
                    component='span'
                    zoom={{ initialScale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    delay={0.7}
                    className='bg-primary absolute -bottom-1.5 -left-1.5 size-2.5 rounded-xs'
                  />
                  <MotionPreset
                    component='span'
                    zoom={{ initialScale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    delay={0.75}
                    className='bg-primary absolute -right-1.5 -bottom-1.5 size-2.5 rounded-xs'
                  />
                </MotionPreset>{' '}
              </h1>
            </MotionPreset>
            <MotionPreset
              fade
              slide={{ direction: 'up', offset: 60 }}
              blur='6px'
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              delay={0.4}
            >
              <p className='text-muted-foreground text-lg'>
                Ob schwarzer Bildschirm, falsche Anzeige oder technische Störungen bei Ihren digitalen Exposés im
                Schaufenster oder in der Bankfiliale - unser Support-Team ist für Sie da. Per Fernwartung oder
                telefonisch lösen wir Ihre Display-Probleme schnell und unkompliziert.
              </p>
            </MotionPreset>
            <MotionPreset
              component='div'
              fade
              slide={{ direction: 'up', offset: 40 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              delay={0.6}
              className='flex flex-wrap items-center gap-4'
            >
              <Button
                asChild
                size='lg'
                className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
              >
                <a href='/multi-step-form-02'>
                  Support anfragen
                  <HeadphonesIcon className='transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-105' />
                </a>
              </Button>

              <MotionPreset fade zoom blur slide delay={0.8}>
                <Button asChild variant='outline' className='rounded-full text-base has-[>svg]:px-6' size='lg'>
                  <a href='/anleitungen'>
                    Anleitungen
                    <BookOpenIcon />
                  </a>
                </Button>
              </MotionPreset>
            </MotionPreset>
          </div>
          <MotionPreset
            component='div'
            fade
            zoom={{ initialScale: 0.7 }}
            blur
            transition={{ duration: 0.4 }}
            delay={0.3}
            className='relative flex w-full items-center justify-center xl:col-span-2'
          >
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-44.png'
              alt='Display Support'
              className='size-127 object-cover transition-all duration-300 hover:scale-105 hover:-rotate-2 max-sm:size-100 dark:hidden'
            />
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-44-dark.png'
              alt='Display Support'
              className='hidden size-127 object-cover transition-all duration-300 hover:scale-105 hover:-rotate-2 max-sm:size-100 dark:block'
            />
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
