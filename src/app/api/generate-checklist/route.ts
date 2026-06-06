import {
  buildMockChecklist,
  getSourceCaseForProfile,
  supportedSourceCases,
} from "@/data/source-cases"
import {
  describeNvidiaError,
  generateChecklistWithNvidia,
} from "@/lib/nvidia"
import { parseDemoProfile } from "@/lib/profile-validation"

export const maxDuration = 110

function jsonResponse(
  body: unknown,
  status = 200,
  generatedBy?: "nvidia" | "mock" | "mock-fallback",
  durationMs?: number
) {
  const headers = new Headers({ "Cache-Control": "no-store" })

  if (generatedBy) {
    headers.set("X-Relo-Mate-Generator", generatedBy)
  }

  if (durationMs !== undefined) {
    headers.set("X-Relo-Mate-Duration-Ms", String(durationMs))
  }

  return Response.json(body, { status, headers })
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return jsonResponse(
      { error: "Request body must be valid JSON." },
      400
    )
  }

  const bodyRecord =
    body && typeof body === "object" ? (body as Record<string, unknown>) : null
  const profile = parseDemoProfile(bodyRecord?.profile ?? bodyRecord)

  if (!profile) {
    return jsonResponse(
      { error: "A complete relocation profile is required." },
      400
    )
  }

  const sourceCase = getSourceCaseForProfile(profile)

  if (!sourceCase) {
    return jsonResponse(
      {
        error:
          "Only Indonesia → Taiwan → Study and Poland → Vietnam → Study are supported in this demo.",
        supportedCases: supportedSourceCases.map((supportedCase) => ({
          nationality: supportedCase.nationality,
          currentCountry: supportedCase.currentCountry,
          destinationCountry: supportedCase.destinationCountry,
          purpose: supportedCase.purpose,
        })),
      },
      422
    )
  }

  const aiMode = process.env.AI_MODE?.trim().toLowerCase() ?? "mock"

  if (aiMode !== "nvidia" || !process.env.NVIDIA_API_KEY) {
    return jsonResponse(buildMockChecklist(profile, "mock"), 200, "mock")
  }

  const startedAt = Date.now()

  try {
    const checklist = await generateChecklistWithNvidia(
      profile,
      sourceCase
    )
    const durationMs = Date.now() - startedAt
    console.info(`NVIDIA checklist generated in ${durationMs}ms.`)
    return jsonResponse(checklist, 200, "nvidia", durationMs)
  } catch (error) {
    const durationMs = Date.now() - startedAt
    console.error(
      `NVIDIA checklist generation failed after ${durationMs}ms; using mock fallback. ${describeNvidiaError(error)}`
    )
    return jsonResponse(
      buildMockChecklist(profile, "mock-fallback"),
      200,
      "mock-fallback",
      durationMs
    )
  }
}
