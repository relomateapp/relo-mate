import {
  getSourceCaseForProfile,
  supportedSourceCases,
} from "@/data/source-cases"
import type { RagChatResponse } from "@/lib/chat-types"
import {
  answerQuestionWithNvidia,
  describeNvidiaError,
} from "@/lib/nvidia"
import { parseDemoProfile } from "@/lib/profile-validation"
import {
  buildRagFallbackResponse,
  chunksToCitations,
  retrieveSourceChunks,
} from "@/lib/rag"

export const maxDuration = 110

function jsonResponse(
  body: unknown,
  status = 200,
  generatedBy?: RagChatResponse["generatedBy"],
  durationMs?: number
) {
  const headers = new Headers({ "Cache-Control": "no-store" })

  if (generatedBy) {
    headers.set("X-Relo-Mate-Chat-Generator", generatedBy)
  }

  if (durationMs !== undefined) {
    headers.set("X-Relo-Mate-Duration-Ms", String(durationMs))
  }

  return Response.json(body, { status, headers })
}

function parseQuestion(value: unknown) {
  if (typeof value !== "string") {
    return null
  }

  const question = value.trim()
  return question.length > 0 && question.length <= 600 ? question : null
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: "Request body must be valid JSON." }, 400)
  }

  const bodyRecord =
    body && typeof body === "object" ? (body as Record<string, unknown>) : null
  const profile = parseDemoProfile(bodyRecord?.profile)
  const question = parseQuestion(bodyRecord?.question)

  if (!profile || !question) {
    return jsonResponse(
      { error: "A supported relocation profile and question are required." },
      400
    )
  }

  const sourceCase = getSourceCaseForProfile(profile)

  if (!sourceCase) {
    return jsonResponse(
      {
        error:
          "Chat is available only for the two supported demo source packs.",
        supportedCases: supportedSourceCases.map((supportedCase) => ({
          nationality: supportedCase.nationality,
          destinationCountry: supportedCase.destinationCountry,
          purpose: supportedCase.purpose,
        })),
      },
      422
    )
  }

  const retrieval = retrieveSourceChunks(sourceCase.id, question)
  const chunks = retrieval.chunks
  const aiMode = process.env.AI_MODE?.trim().toLowerCase() ?? "mock"

  if (aiMode !== "nvidia" || !process.env.NVIDIA_API_KEY) {
    return jsonResponse(
      buildRagFallbackResponse(profile, chunks, "mock", retrieval.hasMatches),
      200,
      "mock"
    )
  }

  const startedAt = Date.now()

  try {
    const generated = await answerQuestionWithNvidia(profile, question, chunks)
    const durationMs = Date.now() - startedAt

    if (
      retrieval.hasMatches &&
      generated.answer === "Not found in provided sources."
    ) {
      console.warn(
        `NVIDIA RAG answer ignored matched sources after ${durationMs}ms; using source-note fallback.`
      )
      return jsonResponse(
        buildRagFallbackResponse(profile, chunks, "mock-fallback"),
        200,
        "mock-fallback",
        durationMs
      )
    }

    const citedIds = new Set(generated.citedChunkIds)
    const citedChunks = chunks.filter((chunk) => citedIds.has(chunk.id))
    const response: RagChatResponse = {
      generatedBy: "nvidia",
      profile,
      answer: generated.answer,
      citations: chunksToCitations(citedChunks),
      disclaimer:
        "Source-grounded demo answer only. Confirm current requirements directly with the cited official authorities before applying.",
    }

    console.info(`NVIDIA RAG answer generated in ${durationMs}ms.`)
    return jsonResponse(response, 200, "nvidia", durationMs)
  } catch (error) {
    const durationMs = Date.now() - startedAt

    console.error(
      `NVIDIA RAG answer failed after ${durationMs}ms; using source-note fallback. ${describeNvidiaError(error)}`
    )
    return jsonResponse(
      buildRagFallbackResponse(
        profile,
        chunks,
        "mock-fallback",
        retrieval.hasMatches
      ),
      200,
      "mock-fallback",
      durationMs
    )
  }
}
