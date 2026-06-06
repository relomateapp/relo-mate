import Link from "next/link"
import {
  IconArrowRight,
  IconChecklist,
  IconCircleCheckFilled,
  IconClock,
  IconFileDescription,
  IconMap2,
  IconProgressCheck,
  IconRoute,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react"

import { AppFooter, AppHeader } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const features = [
  {
    icon: IconShieldCheck,
    title: "Verified source-based guidance",
    description:
      "Every recommendation is connected to official source notes, so you know where the guidance came from.",
  },
  {
    icon: IconChecklist,
    title: "Personalized checklist",
    description:
      "Turn your nationality, destination, and purpose into a clear sequence of practical next steps.",
  },
  {
    icon: IconProgressCheck,
    title: "Progress tracking",
    description:
      "Stay on top of documents, deadlines, and tasks with a relocation plan that moves with you.",
  },
]

const previewSteps = [
  { label: "Confirm university admission", done: true },
  { label: "Prepare authenticated documents", done: true },
  { label: "Submit resident visa application", done: false },
  { label: "Apply for ARC after arrival", done: false },
]

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <AppHeader />

      <main>
        <section className="relative border-b border-white/10 bg-[#062f2b] text-white">
          <div className="hero-grid absolute inset-0 opacity-30" />
          <div className="absolute -left-32 top-20 size-80 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 size-96 rounded-full bg-teal-200/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:px-10 lg:py-28">
            <div className="max-w-2xl">
              <Badge className="mb-7 h-7 border border-emerald-200/20 bg-white/10 px-3 text-emerald-100 backdrop-blur">
                <IconSparkles />
                Built for confident moves
              </Badge>
              <h1 className="font-heading text-5xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Your move, mapped with clarity.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50/75 sm:text-xl">
                Turn confusing relocation and visa requirements into a simple,
                source-based checklist.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-[#b8f36b] px-6 text-base font-semibold text-[#073b34] shadow-lg shadow-black/15 hover:bg-[#c8ff80]"
                >
                  <Link href="/demo">
                    Start Demo
                    <IconArrowRight />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 px-2 text-sm text-emerald-50/60">
                  <IconCircleCheckFilled className="size-4 text-[#b8f36b]" />
                  No account required
                </div>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-emerald-50/60">
                <span className="flex items-center gap-2">
                  <IconMap2 className="size-4 text-[#b8f36b]" />
                  Cross-border ready
                </span>
                <span className="flex items-center gap-2">
                  <IconShieldCheck className="size-4 text-[#b8f36b]" />
                  Source notes included
                </span>
                <span className="flex items-center gap-2">
                  <IconClock className="size-4 text-[#b8f36b]" />
                  Timeline at a glance
                </span>
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="absolute -inset-5 rounded-[2.5rem] border border-white/10 bg-white/5 blur-sm" />
              <Card className="relative gap-0 rounded-[2rem] border border-white/60 bg-white py-0 text-[#123d38] shadow-2xl shadow-black/25 ring-0">
                <CardHeader className="border-b border-[#dbe9e5] px-6 py-5 sm:px-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#568079]">
                        <IconRoute className="size-4 text-[#16866f]" />
                        Your relocation plan
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        Indonesia → Taiwan
                      </CardTitle>
                    </div>
                    <Badge className="bg-[#e5f7ef] text-[#126c59]">Study</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 px-6 py-6 sm:px-7">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">Application progress</span>
                      <span className="font-semibold text-[#16866f]">50%</span>
                    </div>
                    <Progress value={50} className="h-2.5 bg-[#e3eeeb]" />
                  </div>
                  <div className="space-y-2.5">
                    {previewSteps.map((step) => (
                      <div
                        key={step.label}
                        className="flex items-center gap-3 rounded-2xl border border-[#e2ece9] bg-[#f8fbfa] px-4 py-3"
                      >
                        <div
                          className={`grid size-6 shrink-0 place-items-center rounded-full ${
                            step.done
                              ? "bg-[#16866f] text-white"
                              : "border border-[#bdd0cb] text-transparent"
                          }`}
                        >
                          <IconCircleCheckFilled className="size-4" />
                        </div>
                        <span
                          className={
                            step.done
                              ? "text-[#55736e] line-through"
                              : "font-medium text-[#214b45]"
                          }
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-[#eef8f5] p-4">
                      <IconFileDescription className="mb-4 size-5 text-[#16866f]" />
                      <div className="text-2xl font-semibold">8</div>
                      <div className="mt-1 text-xs text-[#6b8984]">
                        Required documents
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[#f4f7ea] p-4">
                      <IconClock className="mb-4 size-5 text-[#66833e]" />
                      <div className="text-2xl font-semibold">6–10</div>
                      <div className="mt-1 text-xs text-[#75855e]">
                        Weeks estimated
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f8f6] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="mb-5 border-[#c9ddd7] bg-white text-[#317468]"
              >
                Relocation, simplified
              </Badge>
              <h2 className="font-heading text-3xl font-semibold tracking-[-0.035em] text-[#103d37] sm:text-4xl">
                Less searching. More moving forward.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#67817c]">
                RELO-MATE organizes scattered requirements into one focused
                plan you can understand and act on.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="group rounded-[1.5rem] border border-[#dfeae7] bg-white py-7 shadow-sm ring-0 transition-transform duration-300 hover:-translate-y-1"
                >
                  <CardContent className="px-7">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="grid size-12 place-items-center rounded-2xl bg-[#e6f5f0] text-[#137864] transition-colors group-hover:bg-[#137864] group-hover:text-white">
                        <feature.icon className="size-6" />
                      </div>
                      <span className="font-mono text-xs text-[#9aafa9]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[#153f39]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 leading-6 text-[#6b827e]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-[2rem] bg-[#0d5148] px-7 py-9 text-white sm:px-10 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-medium text-[#b8f36b]">
                See your path in minutes
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to make your relocation feel manageable?
              </h2>
            </div>
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-white px-5 text-[#0d5148] hover:bg-[#eaf4f1]"
            >
              <Link href="/demo">
                Build my checklist
                <IconArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
