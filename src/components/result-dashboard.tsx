"use client"

import Link from "next/link"
import { useMemo, useSyncExternalStore } from "react"
import {
  IconAlertTriangle,
  IconArrowLeft,
  IconArrowRight,
  IconBook2,
  IconCalendarEvent,
  IconCheck,
  IconClock,
  IconCpu,
  IconExternalLink,
  IconFileCheck,
  IconFileDescription,
  IconFlag,
  IconLanguage,
  IconMapPin,
  IconPlaneDeparture,
  IconRefresh,
  IconSchool,
  IconShieldCheck,
} from "@tabler/icons-react"

import { buildMockChecklist } from "@/data/source-cases"
import { SourceChat } from "@/components/source-chat"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  CHECKLIST_PROGRESS_STORAGE_KEY,
  defaultDemoProfile,
  GENERATED_CHECKLIST_STORAGE_KEY,
  type GeneratedChecklist,
} from "@/lib/mock-data"

const STORAGE_EVENT = "relo-mate-storage"

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(STORAGE_EVENT, callback)

  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(STORAGE_EVENT, callback)
  }
}

function getChecklistSnapshot() {
  try {
    return window.localStorage.getItem(GENERATED_CHECKLIST_STORAGE_KEY)
  } catch {
    return null
  }
}

function getProgressSnapshot() {
  try {
    return window.localStorage.getItem(CHECKLIST_PROGRESS_STORAGE_KEY)
  } catch {
    return null
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
}

function hasValidProfile(value: unknown) {
  if (!value || typeof value !== "object") {
    return false
  }

  const profile = value as Record<string, unknown>
  return (
    typeof profile.nationality === "string" &&
    typeof profile.currentCountry === "string" &&
    typeof profile.destinationCountry === "string" &&
    typeof profile.purpose === "string" &&
    typeof profile.preferredLanguage === "string" &&
    (profile.plannedArrivalDate === undefined ||
      typeof profile.plannedArrivalDate === "string")
  )
}

function hasValidSourceNotes(value: unknown) {
  return (
    Array.isArray(value) &&
    value.every(
      (source) =>
        source &&
        typeof source === "object" &&
        typeof source.title === "string" &&
        typeof source.url === "string" &&
        typeof source.note === "string" &&
        typeof source.lastVerified === "string"
    )
  )
}

function parseChecklist(value: string | null): GeneratedChecklist {
  const fallback = buildMockChecklist(defaultDemoProfile, "mock")

  if (!value) {
    return fallback
  }

  try {
    const parsed = JSON.parse(value) as Partial<GeneratedChecklist>

    if (
      !hasValidProfile(parsed.profile) ||
      typeof parsed.visaType !== "string" ||
      !isStringArray(parsed.requiredDocuments) ||
      !isStringArray(parsed.checklist) ||
      typeof parsed.estimatedTimeline !== "string" ||
      !isStringArray(parsed.commonMistakes) ||
      !hasValidSourceNotes(parsed.sourceNotes) ||
      typeof parsed.disclaimer !== "string" ||
      !["nvidia", "mock", "mock-fallback"].includes(parsed.generatedBy ?? "")
    ) {
      return fallback
    }

    return parsed as GeneratedChecklist
  } catch {
    return fallback
  }
}

function parseProgress(value: string | null) {
  if (!value) {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    return isStringArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function formatDate(value?: string) {
  if (!value) {
    return "Not provided"
  }

  const date = new Date(`${value}T00:00:00Z`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

function updateStoredProgress(completed: string[]) {
  try {
    localStorage.setItem(
      CHECKLIST_PROGRESS_STORAGE_KEY,
      JSON.stringify(completed)
    )
  } catch {
    return
  }

  window.dispatchEvent(new Event(STORAGE_EVENT))
}

export function ResultDashboard() {
  const storedChecklist = useSyncExternalStore(
    subscribeToStorage,
    getChecklistSnapshot,
    () => null
  )
  const storedProgress = useSyncExternalStore(
    subscribeToStorage,
    getProgressSnapshot,
    () => null
  )
  const plan = useMemo(() => parseChecklist(storedChecklist), [storedChecklist])
  const completed = useMemo(() => {
    const availableSteps = new Set(plan.checklist.map((_, index) => `step-${index}`))
    return parseProgress(storedProgress).filter((step) => availableSteps.has(step))
  }, [plan.checklist, storedProgress])
  const progress =
    plan.checklist.length > 0
      ? Math.round((completed.length / plan.checklist.length) * 100)
      : 0
  const generatedByNvidia = plan.generatedBy === "nvidia"

  function toggleStep(stepId: string, checked: boolean) {
    const next = checked
      ? Array.from(new Set([...completed, stepId]))
      : completed.filter((item) => item !== stepId)
    updateStoredProgress(next)
  }

  function resetProgress() {
    try {
      localStorage.removeItem(CHECKLIST_PROGRESS_STORAGE_KEY)
    } catch {
      return
    }

    window.dispatchEvent(new Event(STORAGE_EVENT))
  }

  return (
    <main className="bg-[#f3f8f6]">
      <section className="border-b border-[#154f47] bg-[#073b34] text-white">
        <div className="hero-grid absolute inset-x-0 top-16 h-[420px] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Button
                asChild
                variant="ghost"
                className="-ml-3 mb-6 rounded-full text-emerald-50/70 hover:bg-white/10 hover:text-white"
              >
                <Link href="/demo">
                  <IconArrowLeft />
                  Edit relocation details
                </Link>
              </Button>
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge className="border border-[#b8f36b]/20 bg-[#b8f36b]/15 text-[#d5ff9f]">
                  <IconCpu />
                  {generatedByNvidia
                    ? "Generated by NVIDIA AI"
                    : "Demo fallback plan"}
                </Badge>
                <Badge className="border border-white/10 bg-white/10 text-emerald-50">
                  <IconShieldCheck />
                  Source-grounded
                </Badge>
              </div>
              <h1 className="font-heading text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Your relocation roadmap
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/70">
                A practical, source-based starting point for your move from{" "}
                {plan.profile.nationality} to {plan.profile.destinationCountry}{" "}
                for {plan.profile.purpose.toLowerCase()}.
              </p>
            </div>

            <Card className="w-full max-w-md gap-3 rounded-2xl border border-white/10 bg-white/10 py-5 text-white shadow-none ring-0 backdrop-blur">
              <CardContent className="px-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-emerald-50/80">
                    Checklist progress
                  </span>
                  <span className="font-semibold text-[#d5ff9f]">
                    {progress}%
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-2.5 bg-white/15 [&_[data-slot=progress-indicator]]:bg-[#b8f36b]"
                />
                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="text-xs text-emerald-50/55">
                    {completed.length} of {plan.checklist.length} steps completed
                  </p>
                  <button
                    type="button"
                    onClick={resetProgress}
                    disabled={completed.length === 0}
                    className="flex items-center gap-1.5 text-xs font-medium text-emerald-50/70 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <IconRefresh className="size-3.5" />
                    Reset
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {plan.generatedBy !== "nvidia" && (
          <section className="mb-6 flex gap-3 rounded-2xl border border-[#eadfc4] bg-[#fffbf2] px-4 py-3.5 text-sm leading-6 text-[#806d49]">
            <IconAlertTriangle className="mt-1 size-4 shrink-0 text-[#b47a16]" />
            <p>
              {plan.generatedBy === "mock-fallback"
                ? "NVIDIA was unavailable, so RELO-MATE kept the demo moving with the complete source-grounded fallback plan."
                : "AI mode is currently set to mock, so this result uses the complete source-grounded demo plan."}
            </p>
          </section>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryItem
            icon={IconFlag}
            label="Nationality"
            value={plan.profile.nationality}
          />
          <SummaryItem
            icon={IconMapPin}
            label="Destination"
            value={plan.profile.destinationCountry}
          />
          <SummaryItem
            icon={IconSchool}
            label="Purpose"
            value={plan.profile.purpose}
          />
          <SummaryItem
            icon={IconCalendarEvent}
            label="Planned arrival"
            value={formatDate(plan.profile.plannedArrivalDate)}
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
          <div className="space-y-6">
            <Card className="rounded-3xl border border-[#dce9e5] py-6 shadow-sm ring-0">
              <CardHeader className="border-b border-[#e5eeeb] px-6 pb-5 sm:px-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b8882]">
                      Suggested visa type
                    </div>
                    <CardTitle className="text-xl font-semibold text-[#153f39] sm:text-2xl">
                      {plan.visaType}
                    </CardTitle>
                  </div>
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#e4f4ef] text-[#147461]">
                    <IconFileCheck className="size-6" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 px-6 pt-1 sm:grid-cols-2 sm:px-7">
                <div className="rounded-2xl bg-[#f3f8f6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#77918b]">
                    Suggested path
                  </p>
                  <p className="mt-2 font-medium text-[#284f48]">
                    {plan.visaType}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f3f8f6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#77918b]">
                    Grounding status
                  </p>
                  <p className="mt-2 font-medium text-[#284f48]">
                    Uses only the supported source case
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#dce9e5] py-6 shadow-sm ring-0">
              <CardHeader className="px-6 sm:px-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#153f39]">
                      Step-by-step checklist
                    </CardTitle>
                    <p className="mt-1 text-sm text-[#728b85]">
                      Progress is saved on this device.
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-[#ccddd8] text-[#52766f]"
                  >
                    {plan.checklist.length} steps
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 px-6 sm:px-7">
                {plan.checklist.map((step, index) => {
                  const stepId = `step-${index}`
                  const isDone = completed.includes(stepId)

                  return (
                    <label
                      key={`${stepId}-${step}`}
                      htmlFor={stepId}
                      className={`group flex cursor-pointer gap-4 rounded-2xl border p-4 transition-colors ${
                        isDone
                          ? "border-[#c9e3da] bg-[#eff8f4]"
                          : "border-[#e1ebe8] bg-white hover:border-[#bcd8d0] hover:bg-[#f8fbfa]"
                      }`}
                    >
                      <div className="pt-0.5">
                        <Checkbox
                          id={stepId}
                          checked={isDone}
                          onCheckedChange={(checked) =>
                            toggleStep(stepId, checked === true)
                          }
                          className="size-5 rounded-md border-[#b8ccc7] bg-white data-checked:border-[#14806a] data-checked:bg-[#14806a]"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 gap-3">
                        <span
                          className={`mt-0.5 font-mono text-xs ${
                            isDone ? "text-[#16806a]" : "text-[#98aaa6]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p
                          className={`text-sm leading-6 ${
                            isDone
                              ? "text-[#6c8881] line-through"
                              : "font-medium text-[#385f58]"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    </label>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#dce9e5] py-6 shadow-sm ring-0">
              <CardHeader className="px-6 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#e5f4ef] text-[#147461]">
                    <IconFileDescription className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#153f39]">
                      Required documents
                    </CardTitle>
                    <p className="mt-1 text-sm text-[#728b85]">
                      Taken directly from the supported source case.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 px-6 sm:grid-cols-2 sm:px-7">
                {plan.requiredDocuments.map((document) => (
                  <div
                    key={document}
                    className="flex gap-3 rounded-2xl bg-[#f5f9f8] p-3.5 text-sm leading-6 text-[#496d66]"
                  >
                    <IconCheck className="mt-1 size-4 shrink-0 text-[#16806a]" />
                    {document}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-[#dce9e5] bg-[#0f6f60] py-6 text-white shadow-lg shadow-[#0f6f60]/10 ring-0">
              <CardContent className="px-6">
                <div className="grid size-11 place-items-center rounded-2xl bg-white/15">
                  <IconClock className="size-5 text-[#d5ff9f]" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-50/60">
                  Estimated timeline
                </p>
                <p className="mt-2 font-heading text-xl font-semibold leading-7">
                  {plan.estimatedTimeline}
                </p>
                <div className="mt-6 border-t border-white/15 pt-5">
                  <div className="flex items-center gap-2 text-sm text-emerald-50/75">
                    <IconPlaneDeparture className="size-4 shrink-0 text-[#d5ff9f]" />
                    Arrival: {formatDate(plan.profile.plannedArrivalDate)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#eadfc4] bg-[#fffbf2] py-6 shadow-sm ring-0">
              <CardHeader className="px-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#fff0c9] text-[#9a6913]">
                    <IconAlertTriangle className="size-5" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-[#604c27]">
                    Common mistakes
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 px-6">
                {plan.commonMistakes.map((mistake) => (
                  <div
                    key={mistake}
                    className="flex gap-3 text-sm leading-6 text-[#806d49]"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#c48a21]" />
                    {mistake}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#dce9e5] py-6 shadow-sm ring-0">
              <CardHeader className="px-6">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-[#e6f1ee] text-[#386e63]">
                    <IconBook2 className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-[#153f39]">
                      Official source notes
                    </CardTitle>
                    <p className="mt-1 text-xs text-[#80958f]">
                      Open links to verify current guidance
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-6">
                {plan.sourceNotes.map((source) => (
                  <div
                    key={source.url}
                    className="border-b border-[#e7eeec] pb-4 last:border-0 last:pb-0"
                  >
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start justify-between gap-3 text-sm font-semibold leading-5 text-[#315a53] transition-colors hover:text-[#16806a]"
                    >
                      {source.title}
                      <IconExternalLink className="size-4 shrink-0 text-[#95a9a4]" />
                    </a>
                    <p className="mt-1.5 text-xs leading-5 text-[#7b918c]">
                      {source.note}
                    </p>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9aaca7]">
                      Last verified: {source.lastVerified}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#dce9e5] bg-[#eaf5f1] py-6 shadow-none ring-0">
              <CardContent className="px-6">
                <IconLanguage className="size-5 text-[#147461]" />
                <p className="mt-4 text-sm leading-6 text-[#58766f]">
                  {generatedByNvidia
                    ? "The AI checklist is personalized in "
                    : "Your preferred language is "}
                  <strong className="font-semibold text-[#315a53]">
                    {plan.profile.preferredLanguage}
                  </strong>
                  {generatedByNvidia
                    ? ". Verified legal-sensitive fields stay anchored to the source pack."
                    : ". The safe fallback checklist stays in the source pack language because AI translation was unavailable."}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-5 w-full rounded-xl border-[#bfd6cf] bg-white text-[#2d675c] hover:bg-[#f7fbfa]"
                >
                  <Link href="/demo">
                    Generate another plan
                    <IconArrowRight />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </section>

        <SourceChat
          key={`${plan.profile.nationality}-${plan.profile.destinationCountry}-${plan.profile.preferredLanguage}`}
          profile={plan.profile}
        />

        <section className="mt-6 rounded-2xl border border-[#d8e6e2] bg-white px-5 py-4 text-xs leading-5 text-[#78908a]">
          <span className="font-semibold text-[#55766e]">Demo disclaimer:</span>{" "}
          {plan.disclaimer}
        </section>
      </div>
    </main>
  )
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof IconFlag
  label: string
  value: string
}) {
  return (
    <Card className="gap-3 rounded-2xl border border-[#dce9e5] py-4 shadow-sm ring-0">
      <CardContent className="flex items-center gap-3 px-4">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e6f4ef] text-[#147461]">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#78908a]">{label}</p>
          <p className="mt-0.5 truncate font-heading font-semibold text-[#315a53]">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
