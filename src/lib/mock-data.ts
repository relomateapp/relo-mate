export const FORM_STORAGE_KEY = "relo-mate-demo-profile"
export const GENERATED_CHECKLIST_STORAGE_KEY = "relo-mate-generated-checklist"
export const CHECKLIST_PROGRESS_STORAGE_KEY = "relo-mate-checklist-progress"

export type DemoProfile = {
  nationality: string
  currentCountry: string
  destinationCountry: string
  purpose: string
  preferredLanguage: string
  plannedArrivalDate?: string
}

export type GeneratedChecklist = {
  generatedBy: "nvidia" | "mock" | "mock-fallback"
  profile: DemoProfile
  visaType: string
  requiredDocuments: string[]
  checklist: string[]
  estimatedTimeline: string
  commonMistakes: string[]
  sourceNotes: {
    title: string
    url: string
    note: string
    lastVerified: string
  }[]
  disclaimer: string
}

export const defaultDemoProfile: DemoProfile = {
  nationality: "Indonesia",
  currentCountry: "Indonesia",
  destinationCountry: "Taiwan",
  purpose: "Study",
  preferredLanguage: "Bahasa Indonesia",
  plannedArrivalDate: "2026-09-01",
}

export const languageOptions = [
  "English",
  "Bahasa Indonesia",
  "Traditional Chinese",
  "Polish",
  "Vietnamese",
]
