'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// Types für API-Daten
export interface SupportProblem {
  id: string
  key: string
  label: string
  description: string
}

export interface SupportCategory {
  key: string
  label: string
  description: string
  icon: string
  problems: SupportProblem[]
}

// Fallback-Kategorien (falls API nicht erreichbar)
const fallbackCategories: Record<string, { label: string; description: string; icon: string; problems: { id: string; label: string; description: string }[] }> = {
  hardware: {
    label: 'Hardware-Probleme',
    description: 'Physische Defekte am Display oder Hardwarekomponenten',
    icon: 'monitor',
    problems: [
      { id: 'led-defect', label: 'Displaypanel hat defekte LED-Beleuchtung', description: 'LED-Hintergrundbeleuchtung funktioniert nicht ordnungsgemäß' },
      { id: 'bootloop', label: 'Display bleibt im Bootloop hängen (ESYSYNC Logo)', description: 'Display startet immer wieder neu und zeigt nur das ESYSYNC Logo' },
      { id: 'panel-damage', label: 'Displaypanel hat einen Schaden', description: 'Physische Schäden am Display-Panel' },
    ],
  },
  software: {
    label: 'Software-Probleme',
    description: 'Bootloop, Apps, Android-Fehler und Systemprobleme',
    icon: 'code',
    problems: [
      { id: 'not-responding', label: 'Display reagiert nicht mehr', description: 'System friert ein oder reagiert nicht auf Eingaben' },
    ],
  },
  network: {
    label: 'Netzwerk-Probleme',
    description: 'Verbindungs-, Update- und Konnektivitätsprobleme',
    icon: 'wifi',
    problems: [
      { id: 'no-connection', label: 'Keine Verbindung', description: 'Signal wird nicht erkannt' },
    ],
  },
}

// Dynamische Kategorien (werden aus API geladen)
export let problemCategories: Record<string, { label: string; description: string; icon: string; problems: { id: string; label: string; description: string }[] }> = fallbackCategories

export type CategoryType = string

// Versandoptionen
export const shippingOptions = [
  { id: 'own-packaging', label: 'Eigene Verpackung', price: '18,00 €', description: 'Sie verpacken das Display selbst und versenden es', recommended: false },
  { id: 'avantor-box', label: 'AVANTOR-Box mit Rückschein', price: '99,00 €', description: 'Wir senden Ihnen eine sichere Verpackung zu', recommended: false },
  { id: 'technician', label: 'Techniker-Abholung', price: 'Auf Anfrage', description: 'Ein Techniker holt das Display bei Ihnen ab', recommended: false },
  { id: 'complete-swap', label: 'Kompletttausch', price: '229,00 €', description: 'Sofortiger Austausch gegen ein neues Display', recommended: true },
] as const

export type ShippingOptionType = typeof shippingOptions[number]['id']

// Formular-Daten Interface
export interface FormData {
  // Schritt 1: Kategorie
  category: CategoryType | null

  // Schritt 2: Problem-Details
  problemDetail: string | null
  hasRestarted: boolean

  // Schritt 3: Versandoption
  shippingOption: ShippingOptionType | null

  // Schritt 4: Account- & Gerätedaten
  accountNumber: string
  displayNumber: string
  street: string
  postalCode: string
  city: string
  country: string
  email: string
  additionalDeviceAffected: boolean
  additionalDisplayNumbers: string[]

  // Schritt 5: Ansprechpartner
  salutation: 'herr' | 'frau' | 'divers' | null
  contactPerson: string
  contactEmail: string

  // Nach erfolgreicher Erstellung
  ticketNumber?: string
}

interface FormContextType {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  resetForm: () => void
  categories: Record<string, { label: string; description: string; icon: string; problems: { id: string; label: string; description: string }[] }>
  categoriesLoading: boolean
}

const initialFormData: FormData = {
  category: null,
  problemDetail: null,
  hasRestarted: false,
  shippingOption: null,
  accountNumber: '',
  displayNumber: '',
  street: '',
  postalCode: '',
  city: '',
  country: 'Deutschland',
  email: '',
  additionalDeviceAffected: false,
  additionalDisplayNumbers: [],
  salutation: null,
  contactPerson: '',
  contactEmail: '',
}

const FormContext = createContext<FormContextType | null>(null)

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [categories, setCategories] = useState(fallbackCategories)
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/support-categories')
        const data = await res.json()
        
        if (data.success && data.categories.length > 0) {
          // Konvertiere API-Daten ins benötigte Format
          const cats: Record<string, { label: string; description: string; icon: string; problems: { id: string; label: string; description: string }[] }> = {}
          
          for (const cat of data.categories) {
            cats[cat.key] = {
              label: cat.label,
              description: cat.description,
              icon: cat.icon,
              problems: cat.problems.map((p: { key: string; label: string; description: string }) => ({
                id: p.key,
                label: p.label,
                description: p.description
              }))
            }
          }
          
          setCategories(cats)
          problemCategories = cats
        }
      } catch (error) {
        console.error('Error loading support categories:', error)
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm, categories, categoriesLoading }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormData = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormData must be used within a FormProvider')
  }
  return context
}

export default FormContext
