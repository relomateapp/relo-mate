import "server-only"

import {
  ragSourceChunks,
  type RagSourceChunk,
} from "@/data/rag-documents"
import type { RagChatResponse, RagCitation } from "@/lib/chat-types"
import type { DemoProfile } from "@/lib/mock-data"

const QUESTION_STOP_WORDS = new Set([
  "and",
  "are",
  "can",
  "could",
  "does",
  "for",
  "from",
  "how",
  "into",
  "may",
  "should",
  "the",
  "this",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "with",
  "czy",
  "gdzie",
  "ile",
  "jak",
  "jest",
  "kiedy",
  "mogę",
  "oraz",
  "apa",
  "bagaimana",
  "bisa",
  "dan",
  "dimana",
  "kapan",
  "saya",
  "untuk",
  "yang",
  "có",
  "đâu",
  "khi",
  "nào",
  "như",
  "thể",
  "tôi",
  "và",
])

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
}

function getQuestionTerms(question: string) {
  return (
    normalize(question)
      .match(/[\p{L}\p{N}]+/gu)
      ?.filter(
        (term) => term.length >= 2 && !QUESTION_STOP_WORDS.has(term)
      ) ?? []
  )
}

function scoreChunk(question: string, questionTerms: string[], chunk: RagSourceChunk) {
  const normalizedQuestion = normalize(question)
  const corpus = normalize(`${chunk.title} ${chunk.text} ${chunk.keywords.join(" ")}`)
  const corpusTerms = new Set(getQuestionTerms(corpus))
  let score = 0

  for (const keyword of chunk.keywords) {
    if (normalizedQuestion.includes(normalize(keyword))) {
      score += 8
    }
  }

  for (const term of questionTerms) {
    if (corpusTerms.has(term)) {
      score += term.length >= 5 ? 3 : 1
    }
  }

  return score
}

export function retrieveSourceChunks(caseId: string, question: string, limit = 4) {
  const caseChunks = ragSourceChunks.filter((chunk) => chunk.caseId === caseId)
  const terms = getQuestionTerms(question)
  const ranked = caseChunks
    .map((chunk, index) => ({
      chunk,
      index,
      score: scoreChunk(question, terms, chunk),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)

  const matched = ranked
    .filter((item) => item.score > 0)
    .slice(0, limit)

  if (matched.length > 0) {
    return {
      chunks: matched.map((item) => item.chunk),
      hasMatches: true,
    }
  }

  return {
    chunks: caseChunks.slice(0, Math.min(3, limit)),
    hasMatches: false,
  }
}

export function chunksToCitations(chunks: RagSourceChunk[]): RagCitation[] {
  return chunks.map((chunk) => ({
    id: chunk.id,
    title: chunk.title,
    url: chunk.url,
    excerpt: chunk.text,
    lastVerified: chunk.lastVerified,
  }))
}

export function buildRagFallbackResponse(
  profile: DemoProfile,
  chunks: RagSourceChunk[],
  generatedBy: RagChatResponse["generatedBy"],
  hasMatches = true
): RagChatResponse {
  if (!hasMatches) {
    return {
      generatedBy,
      profile,
      answer: "Not found in provided sources.",
      citations: [],
      disclaimer:
        "Source-grounded demo answer only. Confirm current requirements directly with the cited official authorities before applying.",
    }
  }

  return {
    generatedBy,
    profile,
    answer: [
      "AI answer generation is unavailable, so here are the most relevant verified source notes:",
      ...chunks.map((chunk) => `- ${chunk.text}`),
    ].join("\n"),
    citations: chunksToCitations(chunks),
    disclaimer:
      "Source-grounded demo answer only. Confirm current requirements directly with the cited official authorities before applying.",
  }
}
