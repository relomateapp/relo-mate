"use client"

import { FormEvent, useState } from "react"
import {
  IconBook2,
  IconCpu,
  IconExternalLink,
  IconLoader2,
  IconRefresh,
  IconSend,
  IconShieldCheck,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { RagChatResponse } from "@/lib/chat-types"
import type { DemoProfile } from "@/lib/mock-data"

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  content: string
  response?: RagChatResponse
}

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Ask a question about this journey. I will retrieve the most relevant official source notes and answer only from them.",
}

function getSuggestedQuestions(destinationCountry: string) {
  if (destinationCountry === "Vietnam") {
    return [
      "Can I use the tourism visa exemption to study?",
      "What do I upload for an e-Visa?",
      "How long can an e-Visa be valid?",
      "Where can I get help with an e-Visa mistake?",
      "How do I contact the Vietnam Embassy in Warsaw?",
    ]
  }

  return [
    "Which documents may need authentication?",
    "What should I do about the ARC after arrival?",
    "How long does the visa process take?",
    "What are TETO Jakarta's visa counter hours?",
    "How much is the standard Resident Visa fee?",
  ]
}

function messageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function SourceChat({ profile }: { profile: DemoProfile }) {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const suggestedQuestions = getSuggestedQuestions(profile.destinationCountry)

  async function sendQuestion(nextQuestion: string) {
    const trimmedQuestion = nextQuestion.trim()

    if (!trimmedQuestion || isLoading) {
      return
    }

    setMessages((current) => [
      ...current,
      { id: messageId(), role: "user", content: trimmedQuestion },
    ])
    setQuestion("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, question: trimmedQuestion }),
        signal: AbortSignal.timeout(100000),
      })

      if (!response.ok) {
        throw new Error("Chat request failed")
      }

      const answer = (await response.json()) as RagChatResponse
      setMessages((current) => [
        ...current,
        {
          id: messageId(),
          role: "assistant",
          content: answer.answer,
          response: answer,
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: messageId(),
          role: "assistant",
          content:
            "I could not retrieve a source-grounded answer right now. Please use the official source links shown on this page.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendQuestion(question)
  }

  function resetChat() {
    setMessages([welcomeMessage])
    setQuestion("")
  }

  return (
    <Card className="mt-6 overflow-hidden rounded-3xl border border-[#cfe2dc] bg-white py-0 shadow-lg shadow-[#315c52]/8 ring-0">
      <CardHeader className="border-b border-[#164f47] bg-[#073b34] px-6 py-6 text-white sm:px-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#d5ff9f]">
              <IconCpu className="size-6" />
            </div>
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge className="border border-[#b8f36b]/20 bg-[#b8f36b]/15 text-[#d5ff9f]">
                  RAG document chat
                </Badge>
                <Badge className="border border-white/10 bg-white/10 text-emerald-50">
                  <IconShieldCheck />
                  Case-scoped retrieval
                </Badge>
              </div>
              <CardTitle className="text-2xl font-semibold">
                Ask the official source pack
              </CardTitle>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/65">
                Answers use only retrieved notes for {profile.nationality} to{" "}
                {profile.destinationCountry} study and include clickable
                citations.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetChat}
            disabled={messages.length === 1 || isLoading}
            className="self-start rounded-full text-emerald-50/70 hover:bg-white/10 hover:text-white"
          >
            <IconRefresh />
            Reset chat
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-6 sm:px-7">
        <div className="mb-5 flex flex-wrap gap-2">
          {suggestedQuestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void sendQuestion(suggestion)}
              disabled={isLoading}
              className="rounded-full border border-[#d4e5e0] bg-[#f4f9f7] px-3.5 py-2 text-left text-xs font-medium text-[#426a62] transition-colors hover:border-[#9ec9bc] hover:bg-[#eaf6f1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div
          className="max-h-[620px] space-y-4 overflow-y-auto rounded-2xl border border-[#e0ebe7] bg-[#f6faf8] p-4 sm:p-5"
          aria-live="polite"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl rounded-2xl px-4 py-3.5 ${
                  message.role === "user"
                    ? "bg-[#0f6f60] text-white"
                    : "border border-[#dce8e4] bg-white text-[#456860]"
                }`}
              >
                {message.response && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="border-[#c5dcd5] bg-[#f3f9f6] text-[#47736a]"
                    >
                      {message.response.generatedBy === "nvidia"
                        ? "NVIDIA RAG answer"
                        : "Source-note fallback"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-[#c5dcd5] bg-[#f3f9f6] text-[#47736a]"
                    >
                      <IconBook2 />
                      {message.response.citations.length} cited sources
                    </Badge>
                  </div>
                )}
                <p className="whitespace-pre-line text-sm leading-6">
                  {message.content}
                </p>

                {message.response && message.response.citations.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-[#e3ece9] pt-3">
                    {message.response.citations.map((citation) => (
                      <a
                        key={citation.id}
                        href={citation.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-xl border border-[#e0ebe7] bg-[#f8fbfa] p-3 transition-colors hover:border-[#b9d7ce] hover:bg-[#eff8f4]"
                      >
                        <div className="flex items-start justify-between gap-3 text-xs font-semibold leading-5 text-[#315a53]">
                          {citation.title}
                          <IconExternalLink className="mt-0.5 size-3.5 shrink-0 text-[#8da49e]" />
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#738b85]">
                          {citation.excerpt}
                        </p>
                        <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#9aaca7]">
                          Verified {citation.lastVerified}
                        </p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl border border-[#dce8e4] bg-white px-4 py-3 text-sm text-[#66827b]">
                <IconLoader2 className="size-4 animate-spin text-[#16806a]" />
                Retrieving official notes and preparing an answer...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={600}
            disabled={isLoading}
            placeholder={`Ask in ${profile.preferredLanguage} about documents, timing, or the supported route...`}
            className="min-h-12 flex-1 rounded-2xl border-[#cfdfda] bg-white px-4 py-3 text-[#315a53] focus-visible:border-[#2a8c78] focus-visible:ring-[#2a8c78]/20"
          />
          <Button
            type="submit"
            disabled={isLoading || question.trim().length === 0}
            className="h-12 rounded-2xl bg-[#0f6f60] px-5 text-white hover:bg-[#0b5b4e]"
          >
            {isLoading ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <IconSend />
            )}
            Ask sources
          </Button>
        </form>
        <p className="mt-3 text-xs leading-5 text-[#8a9e99]">
          This demo retrieves curated excerpts from the selected official
          source pack. It does not search the open web or provide legal advice.
        </p>
      </CardContent>
    </Card>
  )
}
