import type {
  DemoProfile,
  GeneratedChecklist,
} from "@/lib/mock-data"

export type SourceCase = {
  id: string
  label: string
  nationality: string
  currentCountry: string
  destinationCountry: string
  purpose: string
  defaultPreferredLanguage: string
  defaultArrivalDate: string
  visaType: string
  sourceText: string
  sourceNotes: GeneratedChecklist["sourceNotes"]
  requiredDocuments: string[]
  baseChecklist: string[]
  commonMistakes: string[]
  estimatedTimeline: string
  disclaimer: string
}

const taiwanStudyCase: SourceCase = {
  id: "indonesia-taiwan-study",
  label: "Indonesia → Taiwan · Study",
  nationality: "Indonesia",
  currentCountry: "Indonesia",
  destinationCountry: "Taiwan",
  purpose: "Study",
  defaultPreferredLanguage: "Bahasa Indonesia",
  defaultArrivalDate: "2026-09-01",
  visaType: "Resident Visa for Foreign Students",
  sourceText: [
    "This source pack supports a full-time student applying for a Taiwan Resident Visa from outside Taiwan.",
    "The Bureau of Consular Affairs source lists an online application form, two recent passport-size photos, a passport valid for at least six months with a photocopy, a health certificate, an admission permit or enrollment record, the highest education diploma and transcripts, and proof of financial support.",
    "Documents produced outside Taiwan may need authentication by an R.O.C. overseas mission. Documents not in Chinese or English require a Chinese or English translation and authentication.",
    "Applicants outside Taiwan who meet the student Resident Visa requirements are advised to apply through an R.O.C. overseas mission.",
    "After arrival with a Resident Visa, the student must apply for an Alien Resident Certificate through the National Immigration Agency student system within 30 days starting from the day after arrival.",
    "A TETO Jakarta notice effective July 25, 2024 states that general visa issuance normally takes six working days excluding the submission day, while individual review or additional documents may take longer.",
    "BOCA's standard fee schedule lists US$66 for a single-entry Resident Visa application made overseas. Confirm the current payable amount and payment method with TETO Jakarta.",
  ].join("\n"),
  sourceNotes: [
    {
      title: "Bureau of Consular Affairs: Resident Visas for Foreign Students",
      url: "https://www.boca.gov.tw/fp-166-283-c4da3-2.html",
      note: "Official student Resident Visa requirements, application procedure, and notices.",
      lastVerified: "2026-06-04",
    },
    {
      title: "National Immigration Agency: ARC document instructions",
      url: "https://www.immigration.gov.tw/5475/5478/141465/141469/367180/cp_news",
      note: "Official student ARC online application, document, fee, and post-arrival deadline guidance.",
      lastVerified: "2026-06-04",
    },
    {
      title: "Taipei Economic and Trade Office in Indonesia",
      url: "https://www.roc-taiwan.org/id_en/index.html",
      note: "Official local mission website for submission and contact guidance.",
      lastVerified: "2026-06-04",
    },
    {
      title: "TETO Jakarta: General Visa Processing Notice",
      url: "https://roc-taiwan.org/id/post/8737.html",
      note: "Local visa counter hours and general processing periods. Confirm current arrangements before relying on them.",
      lastVerified: "2026-06-04",
    },
    {
      title: "BOCA: Standard Fees for R.O.C. Visas in Foreign Passports",
      url: "https://www.boca.gov.tw/fp-161-264-cdb6a-2.html",
      note: "Standard overseas Resident Visa fees; local charges and payment arrangements may differ.",
      lastVerified: "2026-06-04",
    },
  ],
  requiredDocuments: [
    "Completed online Resident Visa application form",
    "Two recent color passport-size photos",
    "Passport valid for at least 6 months and one photocopy",
    "Original health certificate and one photocopy",
    "Original admission permit or enrollment record and one photocopy",
    "Original highest education diploma and transcripts with photocopies",
    "Proof of financial support",
    "Applicable translations and any authentication confirmed as required",
  ],
  baseChecklist: [
    "Confirm admission and obtain the official admission permit.",
    "Complete the online Resident Visa application form and print the barcoded form.",
    "Prepare passport photos, passport, and the required photocopy.",
    "Complete the required health examination and confirm whether a foreign-issued certificate needs authentication.",
    "Prepare the highest education diploma, transcripts, required translations, and any authentication confirmed as required.",
    "Prepare proof of financial support.",
    "Submit the complete Resident Visa application through the appropriate R.O.C. overseas mission.",
    "After arrival, apply for the ARC through the National Immigration Agency student system within 30 days starting from the day after arrival.",
  ],
  commonMistakes: [
    "Failing to confirm whether documents produced outside Taiwan need authentication.",
    "Omitting a Chinese or English translation for documents in another language.",
    "Assuming an admission permit guarantees visa issuance.",
    "Missing the 30-day student ARC deadline after arrival.",
  ],
  estimatedTimeline:
    "Start document preparation 8–10 weeks before departure. A TETO Jakarta notice states 6 working days for general visa issuance, excluding the submission day; confirm current timing because individual review or additional documents may take longer.",
  disclaimer:
    "Demo guidance only. This source-grounded checklist is not legal advice. Confirm current requirements and deadlines directly with the relevant official authorities before applying.",
}

const vietnamStudyCase: SourceCase = {
  id: "poland-vietnam-study",
  label: "Poland → Vietnam · Study",
  nationality: "Poland",
  currentCountry: "Poland",
  destinationCountry: "Vietnam",
  purpose: "Study",
  defaultPreferredLanguage: "Polish",
  defaultArrivalDate: "2026-09-01",
  visaType:
    "Study entry route — confirm with host institution and Vietnam Immigration",
  sourceText: [
    "This source pack supports a Polish student preparing to study in Vietnam, but it does not name a student-specific visa category or complete student visa requirements.",
    "The host institution and Vietnam Immigration must confirm the correct entry and stay route for the specific program before the student applies.",
    "The official Vietnam e-Visa portal is operated by the Immigration Department under the Ministry of Public Security.",
    "The official portal states that an e-Visa is valid for a maximum of 90 days and may be single or multiple entry. Applicants must be outside Vietnam, hold a valid passport, and not fall within the statutory cases of suspension from entry.",
    "For an e-Visa application, the official instructions request a passport data-page image and a portrait photograph. The applicant receives a registration code, pays through the official process, checks the result online, and prints an approved e-Visa.",
    "The official e-Visa instructions state a three-working-day processing period for that route. A student-specific approval or sponsorship timeline is not found in the provided sources.",
    "An official Vietnamese embassy notice gives Polish citizens a tourism-purpose visa exemption for up to 45 days from August 15, 2025 through August 14, 2028. It is for tourism and must not be treated as permission to study.",
  ].join("\n"),
  sourceNotes: [
    {
      title: "Vietnam National Electronic Visa System",
      url: "https://evisa.immigration.gov.vn/web/guest/trang-chu-ttdt",
      note: "Official Immigration Department e-Visa definitions, eligibility conditions, validity, payment, and entry-port guidance.",
      lastVerified: "2026-06-04",
    },
    {
      title: "Vietnam Immigration: e-Visa application instructions",
      url: "https://immigration.gov.vn/en_US/khai-thi-thuc-dien-tu/cap-thi-thuc-dien-tu",
      note: "Official e-Visa application steps, requested uploads, result checking, and stated processing period.",
      lastVerified: "2026-06-04",
    },
    {
      title: "Embassy of Vietnam in Warsaw",
      url: "https://vnembassy-warsaw.mofa.gov.vn/en-us/embassy/Contact",
      note: "Official local mission contact details and warning about fake embassy websites.",
      lastVerified: "2026-06-04",
    },
    {
      title: "Vietnamese Embassy notice: tourism visa exemption",
      url: "https://vnembassy-bucharest.mofa.gov.vn/en-us/News/EmbassyNews/Pages/New-Visa-Exemption-Policies-effective-from-15-August-2025.aspx?p=2",
      note: "Official notice showing that the listed Polish visa exemption is for tourism purpose, not study.",
      lastVerified: "2026-06-04",
    },
    {
      title: "Vietnam National Electronic Visa System: Support",
      url: "https://evisa.gov.vn/support",
      note: "Official support channel for e-Visa application-information and technical issues.",
      lastVerified: "2026-06-04",
    },
  ],
  requiredDocuments: [
    "Valid passport",
    "Official admission or enrollment confirmation from the host institution",
    "Written visa and entry instructions from the host institution or relevant authority",
    "Passport data-page image if the official e-Visa route is confirmed",
    "Portrait photograph if the official e-Visa route is confirmed",
    "Registration code and application details if the official e-Visa route is used",
    "Printed approved e-Visa if the official e-Visa route is used",
    "Additional student-specific documents: Not found in provided sources.",
  ],
  baseChecklist: [
    "Obtain the official admission or enrollment confirmation from the host institution.",
    "Ask the host institution for written instructions confirming the correct study-entry route and any required sponsorship.",
    "Confirm the current study-entry requirements with Vietnam Immigration or the Embassy of Vietnam in Warsaw.",
    "Do not treat the tourism-purpose visa exemption for Polish citizens as permission to study.",
    "If the official e-Visa route is confirmed, apply only through the official portal and enter passport details accurately.",
    "If using the official e-Visa route, upload the requested passport data-page image and portrait photograph.",
    "Keep the registration code, check the result through the official portal, and print an approved e-Visa.",
    "Before departure, reconfirm the current route and carry the admission confirmation and approved entry documents.",
  ],
  commonMistakes: [
    "Assuming a tourism-purpose visa exemption permits study.",
    "Applying through an unofficial visa website.",
    "Entering inaccurate or incomplete information in an e-Visa application.",
    "Applying before the host institution confirms the correct study-entry route.",
  ],
  estimatedTimeline:
    "If the official e-Visa route is confirmed, the provided official instructions state 3 working days. Student-specific approval or sponsorship timeline: Not found in provided sources.",
  disclaimer:
    "Demo guidance only. The provided sources do not define the complete student visa route for this case. Confirm the correct visa, entry purpose, documents, and timing directly with the host institution and Vietnamese authorities before applying.",
}

export const supportedSourceCases: SourceCase[] = [
  taiwanStudyCase,
  vietnamStudyCase,
]

export function getSourceCaseForProfile(profile: DemoProfile) {
  return (
    supportedSourceCases.find(
      (sourceCase) =>
        profile.nationality === sourceCase.nationality &&
        profile.currentCountry === sourceCase.currentCountry &&
        profile.destinationCountry === sourceCase.destinationCountry &&
        profile.purpose === sourceCase.purpose
    ) ?? null
  )
}

export function buildMockChecklist(
  profile: DemoProfile,
  generatedBy: GeneratedChecklist["generatedBy"] = "mock"
): GeneratedChecklist {
  const sourceCase = getSourceCaseForProfile(profile) ?? supportedSourceCases[0]

  return {
    generatedBy,
    profile,
    visaType: sourceCase.visaType,
    requiredDocuments: sourceCase.requiredDocuments,
    checklist: sourceCase.baseChecklist,
    estimatedTimeline: sourceCase.estimatedTimeline,
    commonMistakes: sourceCase.commonMistakes,
    sourceNotes: sourceCase.sourceNotes,
    disclaimer: sourceCase.disclaimer,
  }
}
