import type { DemoProfile } from "@/lib/mock-data"

export type RagCitation = {
  id: string
  title: string
  url: string
  excerpt: string
  lastVerified: string
}

export type RagChatResponse = {
  generatedBy: "nvidia" | "mock" | "mock-fallback"
  profile: DemoProfile
  answer: string
  citations: RagCitation[]
  disclaimer: string
}
