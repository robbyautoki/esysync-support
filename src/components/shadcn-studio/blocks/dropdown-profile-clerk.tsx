'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import {
  UserIcon,
  SettingsIcon,
  LogOutIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const ClerkProfileDropdown = () => {
  const { user, isLoaded } = useUser()
  const { signOut, openUserProfile } = useClerk()

  if (!isLoaded || !user) {
    return (
      <Button variant='ghost' size='icon' className='size-9.5'>
        <Avatar className='size-9.5 rounded-md'>
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  const initials = user.firstName && user.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user.emailAddresses[0]?.emailAddress?.substring(0, 2).toUpperCase() || 'U'

  const displayName = user.fullName || user.firstName || user.emailAddresses[0]?.emailAddress || 'Benutzer'
  const email = user.primaryEmailAddress?.emailAddress || ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='size-9.5'>
          <Avatar className='size-9.5 rounded-md'>
            <AvatarImage src={user.imageUrl} alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-80' align='end'>
        <DropdownMenuLabel className='flex items-center gap-4 px-4 py-2.5 font-normal'>
          <div className='relative'>
            <Avatar className='size-10'>
              <AvatarImage src={user.imageUrl} alt={displayName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <span className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
          </div>
          <div className='flex flex-1 flex-col items-start overflow-hidden'>
            <span className='text-foreground text-lg font-semibold truncate w-full'>{displayName}</span>
            <span className='text-muted-foreground text-sm truncate w-full'>{email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' onClick={() => openUserProfile()}>
            <UserIcon className='text-foreground size-5' />
            <span>Mein Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='px-4 py-2.5 text-base cursor-pointer' onClick={() => openUserProfile()}>
            <SettingsIcon className='text-foreground size-5' />
            <span>Einstellungen</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant='destructive'
          className='px-4 py-2.5 text-base cursor-pointer'
          onClick={() => signOut({ redirectUrl: '/' })}
        >
          <LogOutIcon className='size-5' />
          <span>Abmelden</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ClerkProfileDropdown
