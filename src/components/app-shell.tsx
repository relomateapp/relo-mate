import Link from "next/link"
import { IconArrowUpRight, IconRoute } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-heading text-sm font-bold tracking-[0.12em] ${
        light ? "text-white" : "text-[#0d4b43]"
      }`}
    >
      <span
        className={`grid size-8 place-items-center rounded-xl ${
          light
            ? "bg-[#b8f36b] text-[#073b34]"
            : "bg-[#0f6f60] text-white"
        }`}
      >
        <IconRoute className="size-[18px]" stroke={2.2} />
      </span>
      RELO-MATE
    </Link>
  )
}

export function AppHeader({ dark = true }: { dark?: boolean }) {
  return (
    <header
      className={
        dark
          ? "absolute inset-x-0 top-0 z-20 border-b border-white/10"
          : "border-b border-[#dce9e5] bg-white/90 backdrop-blur"
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <BrandMark light={dark} />
        <nav className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            className={
              dark
                ? "hidden rounded-full text-emerald-50/70 hover:bg-white/10 hover:text-white sm:inline-flex"
                : "hidden rounded-full text-[#426d66] hover:bg-[#edf5f2] sm:inline-flex"
            }
          >
            <Link href="/result">View sample result</Link>
          </Button>
          <Button
            asChild
            className={
              dark
                ? "rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
                : "rounded-full bg-[#0f6f60] text-white hover:bg-[#0b5b4e]"
            }
          >
            <Link href="/demo">
              Start demo
              <IconArrowUpRight />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export function AppFooter() {
  return (
    <footer className="border-t border-[#dce9e5] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-[#738b87] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <BrandMark />
        <p>Demo guidance only. Always verify with official authorities.</p>
      </div>
    </footer>
  )
}
