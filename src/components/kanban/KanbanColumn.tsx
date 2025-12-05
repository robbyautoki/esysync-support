'use client'

import { useDroppable } from '@dnd-kit/core'
import { Badge } from '@/components/ui/badge'
import { KanbanCard } from './KanbanCard'
import { cn } from '@/lib/utils'
import type { ComponentType } from 'react'

interface SupportTicket {
  id: string
  ticketNumber: string
  category: string
  problemDetail: string
  status: string
  displayNumber: string
  contactPerson: string
  createdAt: string
}

interface StatusConfig {
  label: string
  icon: ComponentType<{ className?: string }>
  color: string
}

interface KanbanColumnProps {
  status: string
  config: StatusConfig
  tickets: SupportTicket[]
}

export function KanbanColumn({ status, config, tickets }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const Icon = config.icon

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col min-w-[280px] w-[280px] bg-muted/30 rounded-xl p-3 transition-all duration-200',
        isOver && 'ring-2 ring-primary bg-primary/5 scale-[1.02]'
      )}
    >
      {/* Header */}
      <div className='flex items-center gap-2 mb-3 px-2'>
        <div className={cn('size-3 rounded-full', config.color)} />
        <Icon className='size-4 text-muted-foreground' />
        <span className='font-medium text-sm'>{config.label}</span>
        <Badge variant='secondary' className='ml-auto text-xs'>
          {tickets.length}
        </Badge>
      </div>

      {/* Tickets */}
      <div className='flex-1 space-y-2 overflow-y-auto max-h-[calc(100vh-350px)] pr-1'>
        {tickets.map(ticket => (
          <KanbanCard key={ticket.id} ticket={ticket} />
        ))}
        {tickets.length === 0 && (
          <div className='text-center text-muted-foreground text-sm py-8 border-2 border-dashed rounded-lg'>
            Keine Tickets
          </div>
        )}
      </div>
    </div>
  )
}
