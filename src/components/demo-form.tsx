"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import {
  IconArrowRight,
  IconCalendarEvent,
  IconCheck,
  IconLoader2,
  IconLock,
} from "@tabler/icons-react"

import {
  buildMockChecklist,
  supportedSourceCases,
} from "@/data/source-cases"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CHECKLIST_PROGRESS_STORAGE_KEY,
  defaultDemoProfile,
  FORM_STORAGE_KEY,
  GENERATED_CHECKLIST_STORAGE_KEY,
  languageOptions,
  type DemoProfile,
  type GeneratedChecklist,
} from "@/lib/mock-data"

const loadingSteps = [
  "Reading verified source notes...",
  "Creating personalized checklist...",
  "Preparing progress tracker...",
]

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function ReadonlyField({
  id,
  label,
  value,
}: {
  id: string
  label: string
  value: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        <IconLock className="size-3.5 text-[#829891]" />
      </Label>
      <Input
        id={id}
        value={value}
        readOnly
        className="h-11 cursor-not-allowed rounded-xl border-[#d8e5e1] bg-[#f5f9f7] px-3.5 text-[#52736c]"
      />
    </div>
  )
}

export function DemoForm() {
  const router = useRouter()
  const [profile, setProfile] = useState(defaultDemoProfile)
  const [selectedCaseId, setSelectedCaseId] = useState(
    supportedSourceCases[0].id
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const selectedCase =
    supportedSourceCases.find((sourceCase) => sourceCase.id === selectedCaseId) ??
    supportedSourceCases[0]

  function updateField(field: keyof DemoProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  function selectCase(sourceCaseId: string) {
    const sourceCase = supportedSourceCases.find(
      (candidate) => candidate.id === sourceCaseId
    )

    if (!sourceCase) {
      return
    }

    setSelectedCaseId(sourceCase.id)
    setProfile({
      nationality: sourceCase.nationality,
      currentCountry: sourceCase.currentCountry,
      destinationCountry: sourceCase.destinationCountry,
      purpose: sourceCase.purpose,
      preferredLanguage: sourceCase.defaultPreferredLanguage,
      plannedArrivalDate: sourceCase.defaultArrivalDate,
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setLoadingStep(0)

    const checklistRequest = fetch("/api/generate-checklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile }),
      // Stay slightly above the server's default NVIDIA timeout so the route
      // can return its complete fallback instead of the browser aborting first.
      signal: AbortSignal.timeout(100000),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Checklist generation request failed")
        }
        return (await response.json()) as GeneratedChecklist
      })
      .catch(() => buildMockChecklist(profile, "mock-fallback"))

    await sleep(500)
    setLoadingStep(1)
    await sleep(500)
    setLoadingStep(2)
    await sleep(500)

    const checklist = await checklistRequest

    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(profile))
      localStorage.setItem(
        GENERATED_CHECKLIST_STORAGE_KEY,
        JSON.stringify(checklist)
      )
      localStorage.removeItem(CHECKLIST_PROGRESS_STORAGE_KEY)
    } catch {
      // The result route still has a complete built-in fallback plan.
    }

    router.push("/result")
  }

  if (isSubmitting) {
    return (
      <div
        className="rounded-3xl border border-[#d8e9e3] bg-[#f4faf7] px-5 py-8 sm:px-7"
        aria-live="polite"
      >
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#0f6f60] text-white shadow-lg shadow-[#0f6f60]/20">
          <IconLoader2 className="size-6 animate-spin" />
        </div>
        <h2 className="mt-5 text-center font-heading text-xl font-semibold text-[#214d45]">
          Building your source-grounded plan
        </h2>
        <p className="mt-2 text-center text-sm text-[#718b84]">
          RELO-MATE is organizing the supported {profile.destinationCountry}{" "}
          study source pack in {profile.preferredLanguage}.
        </p>
        <p className="mt-1 text-center text-xs text-[#91a49f]">
          NVIDIA mode can take around 10–90 seconds. A complete fallback plan
          is always ready.
        </p>

        <Progress
          value={((loadingStep + 1) / loadingSteps.length) * 100}
          className="mt-7 h-2.5 bg-[#dfece8]"
        />

        <div className="mt-6 space-y-3">
          {loadingSteps.map((step, index) => {
            const isComplete = index < loadingStep
            const isActive = index === loadingStep

            return (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "border-[#b9d8cf] bg-white text-[#315f56]"
                    : "border-transparent text-[#829891]"
                }`}
              >
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full ${
                    isComplete
                      ? "bg-[#16806a] text-white"
                      : isActive
                        ? "bg-[#def1ea] text-[#16806a]"
                        : "bg-[#e8f0ed] text-[#9aaba6]"
                  }`}
                >
                  {isComplete ? (
                    <IconCheck className="size-3.5" />
                  ) : isActive ? (
                    <IconLoader2 className="size-3.5 animate-spin" />
                  ) : (
                    index + 1
                  )}
                </span>
                {step}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-[#cce2da] bg-[#edf8f4] px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2f675c]">
          <IconLock className="size-4" />
          Two source-grounded demo journeys
        </div>
        <p className="mt-1 text-sm leading-6 text-[#66827b]">
          Choose a supported journey, then let NVIDIA personalize the checklist
          in your preferred language.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportedJourney">Supported journey</Label>
        <Select value={selectedCaseId} onValueChange={selectCase}>
          <SelectTrigger
            id="supportedJourney"
            className="h-12 w-full rounded-xl border-[#bcd9d0] bg-[#f5fbf8] px-3.5 font-medium text-[#315f56] focus-visible:border-[#2a8c78] focus-visible:ring-[#2a8c78]/20"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {supportedSourceCases.map((sourceCase) => (
              <SelectItem key={sourceCase.id} value={sourceCase.id}>
                {sourceCase.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs leading-5 text-[#829891]">
          Verified source pack: {selectedCase.sourceNotes.length} official
          references
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <ReadonlyField
          id="nationality"
          label="Nationality"
          value={profile.nationality}
        />
        <ReadonlyField
          id="currentCountry"
          label="Current country"
          value={profile.currentCountry}
        />
        <ReadonlyField
          id="destinationCountry"
          label="Destination country"
          value={profile.destinationCountry}
        />
        <ReadonlyField id="purpose" label="Purpose" value={profile.purpose} />

        <div className="space-y-2">
          <Label htmlFor="preferredLanguage">Preferred language</Label>
          <Select
            value={profile.preferredLanguage}
            onValueChange={(value) => updateField("preferredLanguage", value)}
          >
            <SelectTrigger
              id="preferredLanguage"
              className="h-11 w-full rounded-xl border-[#d8e5e1] bg-white px-3.5 focus-visible:border-[#2a8c78] focus-visible:ring-[#2a8c78]/20"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="plannedArrivalDate">Planned arrival date</Label>
          <div className="relative">
            <Input
              id="plannedArrivalDate"
              type="date"
              required
              value={profile.plannedArrivalDate ?? ""}
              onChange={(event) =>
                updateField("plannedArrivalDate", event.target.value)
              }
              className="h-11 rounded-xl border-[#d8e5e1] bg-white px-3.5 pr-10 focus-visible:border-[#2a8c78] focus-visible:ring-[#2a8c78]/20"
            />
            <IconCalendarEvent className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6e8b85]" />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-xl bg-[#0f6f60] text-base font-semibold text-white shadow-md shadow-[#0f6f60]/15 hover:bg-[#0b5b4e]"
      >
        Generate source-grounded checklist
        <IconArrowRight />
      </Button>
    </form>
  )
}
