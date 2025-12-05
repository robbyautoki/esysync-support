'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const categoryLabels: Record<string, string> = {
  hardware: 'Hardware',
  software: 'Software',
  network: 'Netzwerk'
}

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

interface KanbanCardProps {
  ticket: SupportTicket
  isDragging?: boolean
}

export function KanbanCard({ ticket, isDragging }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket.id,
  })

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'cursor-grab active:cursor-grabbing transition-all hover:shadow-md',
        isDragging && 'opacity-80 shadow-lg scale-105 rotate-1'
      )}
    >
      <CardContent className='p-3'>
        <a href={`/dashboard/anfragen/${ticket.id}`} className='block' onClick={(e) => e.stopPropagation()}>
          <div className='font-mono text-xs font-semibold text-primary'>
            {ticket.ticketNumber}
          </div>
          <div className='text-sm font-medium mt-1 truncate'>
            {categoryLabels[ticket.category] || ticket.category} - {ticket.displayNumber}
          </div>
          <div className='text-xs text-muted-foreground mt-1 truncate'>
            {ticket.contactPerson}
          </div>
          <div className='text-xs text-muted-foreground mt-2'>
            {new Date(ticket.createdAt).toLocaleDateString('de-DE')}
          </div>
        </a>
      </CardContent>
    </Card>
  )
}
