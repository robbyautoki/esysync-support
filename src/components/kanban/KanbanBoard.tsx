'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core'

import {
  AlertCircleIcon,
  ClockIcon,
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  CheckCircleIcon
} from 'lucide-react'

import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'

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

// Status-Reihenfolge
const statusOrder = [
  'open',
  'in_progress',
  'waiting_for_device',
  'repair_in_progress',
  'shipping_back',
  'completed'
]

// Status-Konfiguration
const statusConfig: Record<string, { label: string; icon: typeof ClockIcon; color: string }> = {
  open: { label: 'Offen', icon: AlertCircleIcon, color: 'bg-red-500' },
  in_progress: { label: 'In Bearbeitung', icon: ClockIcon, color: 'bg-blue-500' },
  waiting_for_device: { label: 'Warten auf Gerät', icon: PackageIcon, color: 'bg-yellow-500' },
  repair_in_progress: { label: 'Reparatur läuft', icon: WrenchIcon, color: 'bg-purple-500' },
  shipping_back: { label: 'Rückversand', icon: TruckIcon, color: 'bg-orange-500' },
  completed: { label: 'Abgeschlossen', icon: CheckCircleIcon, color: 'bg-green-500' }
}

interface KanbanBoardProps {
  tickets: SupportTicket[]
  onStatusChange: (ticketId: string, newStatus: string) => Promise<void>
}

export function KanbanBoard({ tickets, onStatusChange }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 }
    })
  )

  // Tickets nach Status gruppieren
  const ticketsByStatus = statusOrder.reduce((acc, status) => {
    acc[status] = tickets.filter(t => t.status === status)
    return acc
  }, {} as Record<string, SupportTicket[]>)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (over && active.id !== over.id) {
      const ticketId = active.id as string
      const newStatus = over.id as string

      // Nur wenn auf eine Spalte gedroppt wurde
      if (statusOrder.includes(newStatus)) {
        await onStatusChange(ticketId, newStatus)
      }
    }
  }

  const activeTicket = activeId ? tickets.find(t => t.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className='overflow-x-auto p-1 -m-1'>
        <div className='flex gap-4 snap-x min-w-max pb-4'>
          {statusOrder.map(status => (
            <KanbanColumn
              key={status}
              status={status}
              config={statusConfig[status]}
              tickets={ticketsByStatus[status] || []}
            />
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTicket && <KanbanCard ticket={activeTicket} isDragging />}
      </DragOverlay>
    </DndContext>
  )
}
