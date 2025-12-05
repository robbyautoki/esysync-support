'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

// Problem-Kategorien und Unterkategorien
export const problemCategories = {
  hardware: {
    label: 'Hardware-Probleme',
    description: 'Physische Defekte am Display oder Hardwarekomponenten',
    problems: [
      { id: 'led-defect', label: 'Displaypanel hat defekte LED-Beleuchtung', description: 'LED-Hintergrundbeleuchtung funktioniert nicht ordnungsgemäß' },
      { id: 'bootloop', label: 'Display bleibt im Bootloop hängen (ESYSYNC Logo)', description: 'Display startet immer wieder neu und zeigt nur das ESYSYNC Logo' },
      { id: 'flicker', label: 'Displaypanel flackert', description: 'Display zeigt Flackern oder unstabile Bilddarstellung' },
      { id: '24v-conversion', label: 'Display soll auf 24 Volt umgerüstet werden', description: 'Umbau des Displays für 24V Betriebsspannung' },
      { id: 'sim-error', label: 'Display zeigt Fehler: "Simkarte entfernen"', description: 'Fehlermeldung bezüglich der SIM-Karte' },
      { id: 'auth-error', label: 'Display zeigt Fehler: "Android UI Authentication Error"', description: 'Android Authentifizierungsfehler wird angezeigt' },
      { id: 'no-power-all', label: 'Alle Displays bekommen keinen Strom', description: 'Stromversorgungsproblem für mehrere Displays' },
      { id: 'lines', label: 'Linien im Bild', description: 'Störende Linien oder Streifen' },
      { id: 'black-screen', label: 'Bleibt schwarz', description: 'Display zeigt kein Bild an' },
      { id: 'blonde-woman', label: 'Display startet die APP nicht, Blonde Frau', description: 'App startet nicht und zeigt stattdessen eine blonde Frau' },
      { id: 'no-content', label: 'No Content Assigned', description: 'Display zeigt "No Content Assigned" Meldung' },
      { id: 'homeapp-select', label: 'Display schwarz und Homeapp muss ausgewählt werden', description: 'Display ist schwarz und die Home-App muss manuell ausgewählt werden' },
      { id: 'no-update', label: 'Display updatet nicht, hat keine Verbindung (rotes Ausrufezeichen)', description: 'Inhalt wird angezeigt, aber rotes Ausrufezeichen in der ESYSYNC APP' },
      { id: 'panel-damage', label: 'Displaypanel hat einen Schaden (Sprung, Bruch, Anzeigeschaden)', description: 'Physische Schäden am Display-Panel wie Risse oder Brüche' },
      { id: 'case-damage', label: 'Displaygehäuse beschädigt (Sturz, Bruch, sonstige Acrylbeschädigung)', description: 'Gehäuse ist beschädigt durch Sturz oder andere Einwirkungen' },
    ],
  },
  software: {
    label: 'Software-Probleme',
    description: 'Bootloop, Apps, Android-Fehler und Systemprobleme',
    problems: [
      { id: 'hang-restart', label: 'Hängt nach Neustart', description: 'Display reagiert nicht mehr' },
      { id: 'not-responding', label: 'Display reagiert nicht mehr', description: 'System friert ein oder reagiert nicht auf Eingaben' },
    ],
  },
  network: {
    label: 'Netzwerk-Probleme',
    description: 'Verbindungs-, Update- und Konnektivitätsprobleme',
    problems: [
      { id: 'router-defect', label: 'Router ist defekt', description: 'Netzwerk-Router funktioniert nicht mehr' },
      { id: 'no-connection', label: 'Keine Verbindung', description: 'Signal wird nicht erkannt' },
    ],
  },
} as const

export type CategoryType = keyof typeof problemCategories

// Versandoptionen
export const shippingOptions = [
  { id: 'own-packaging', label: 'Eigene Verpackung', price: '18,00 €', description: 'Sie verpacken das Display selbst und versenden es', recommended: false },
  { id: 'avantor-box', label: 'AVANTOR-Box mit Rückschein', price: '18,00 €', description: 'Wir senden Ihnen eine sichere Verpackung zu', recommended: false },
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
  displayLocation: string
  alternateReturnAddress: string
  email: string
  additionalDeviceAffected: boolean

  // Schritt 5: Ansprechpartner
  differentShippingAddress: boolean
  shippingAddress: string
  salutation: 'herr' | 'frau' | 'divers' | null
  contactPerson: string
}

interface FormContextType {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
  resetForm: () => void
}

const initialFormData: FormData = {
  category: null,
  problemDetail: null,
  hasRestarted: false,
  shippingOption: null,
  accountNumber: '',
  displayNumber: '',
  displayLocation: '',
  alternateReturnAddress: '',
  email: '',
  additionalDeviceAffected: false,
  differentShippingAddress: false,
  shippingAddress: '',
  salutation: null,
  contactPerson: '',
}

const FormContext = createContext<FormContextType | null>(null)

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
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
