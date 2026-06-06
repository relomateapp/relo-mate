import { languageOptions, type DemoProfile } from "@/lib/mock-data"

function isShortString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= 120
}

export function parseDemoProfile(value: unknown): DemoProfile | null {
  if (!value || typeof value !== "object") {
    return null
  }

  const profile = value as Record<string, unknown>

  if (
    !isShortString(profile.nationality) ||
    !isShortString(profile.currentCountry) ||
    !isShortString(profile.destinationCountry) ||
    !isShortString(profile.purpose) ||
    !isShortString(profile.preferredLanguage) ||
    !languageOptions.includes(profile.preferredLanguage.trim()) ||
    (profile.plannedArrivalDate !== undefined &&
      !isShortString(profile.plannedArrivalDate))
  ) {
    return null
  }

  return {
    nationality: profile.nationality.trim(),
    currentCountry: profile.currentCountry.trim(),
    destinationCountry: profile.destinationCountry.trim(),
    purpose: profile.purpose.trim(),
    preferredLanguage: profile.preferredLanguage.trim(),
    plannedArrivalDate: profile.plannedArrivalDate?.trim(),
  }
}
