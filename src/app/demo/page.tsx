import {
  IconChecklist,
  IconClock,
  IconLockOpen,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react"

import { AppFooter, AppHeader } from "@/components/app-shell"
import { DemoForm } from "@/components/demo-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    icon: IconChecklist,
    title: "A clear action plan",
    description: "Know what to prepare and what to do next.",
  },
  {
    icon: IconClock,
    title: "Realistic timing",
    description: "See when each step should happen.",
  },
  {
    icon: IconShieldCheck,
    title: "Source-based notes",
    description: "Understand which official guidance matters.",
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#f3f8f6]">
      <AppHeader dark={false} />
      <main className="relative overflow-hidden">
        <div className="absolute -left-32 top-20 size-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-teal-100/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-10 lg:py-16">
          <section className="pt-2 lg:pt-8">
            <Badge className="mb-6 bg-[#e1f3ed] text-[#126b59]">
              <IconSparkles />
              Demo profile builder
            </Badge>
            <h1 className="max-w-lg font-heading text-4xl font-semibold tracking-[-0.045em] text-[#103d37] sm:text-5xl">
              Tell us about your move.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[#66817b]">
              We’ll turn a few basic details into a focused relocation
              checklist for one of two verified demo journeys, translated into
              your preferred language.
            </p>

            <div className="mt-10 space-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 rounded-2xl border border-[#dfeae7] bg-white/70 p-4 backdrop-blur"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e5f4ef] text-[#147462]">
                    <benefit.icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-heading font-semibold text-[#244b45]">
                      {benefit.title}
                    </h2>
                    <p className="mt-1 text-sm text-[#718984]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-[#78908b]">
              <IconLockOpen className="size-4" />
              No sign-up. NVIDIA credentials always remain server-side.
            </div>
          </section>

          <Card className="self-start rounded-[2rem] border border-[#dfeae7] bg-white py-7 shadow-xl shadow-[#315c52]/8 ring-0 sm:py-8">
            <CardHeader className="border-b border-[#e6efec] px-6 pb-6 sm:px-8">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6a8881]">
                Step 1 of 1
              </div>
              <CardTitle className="text-2xl font-semibold tracking-[-0.025em] text-[#153f39]">
                Your relocation details
              </CardTitle>
              <p className="text-sm text-[#758c87]">
                All fields are required for this demo.
              </p>
            </CardHeader>
            <CardContent className="px-6 pt-2 sm:px-8">
              <DemoForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
