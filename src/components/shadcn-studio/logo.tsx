import Image from 'next/image'

// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src='/logo.png'
        alt='AVANTO Support-Center'
        width={180}
        height={40}
        className='h-10 w-auto'
        priority
      />
    </div>
  )
}

export default Logo
