import { getAiNowHomeCopy } from "@/features/home/components/ainow/AiNowHomeCopy";

export const AICALL_BASE_URL = "https://aicall.ge";

export const AICALL_FACTS = {
  product: "aiCALL",
  provider: "aiNOW",
  providerUrl: "https://ainow.ge",
  legalName: "შპს ეი აი ნაუ",
  location: "Tbilisi, Georgia",
  languages: ["Georgian", "Russian", "English"],
  purpose: "AI voice agent for inbound calls and approved outbound calls for bookings, orders, reminders, deliveries, payments and surveys.",
  input: [
    "Inbound customer calls",
    "Existing-customer list for approved outbound work",
    "Approved greeting, answer rules and business information",
    "Call objective and optional connected systems",
  ],
  output: [
    "Answered call and captured confirmed outcome",
    "Booking, order, reminder or delivery result",
    "Confirmed, postponed or unanswered status",
    "Transcript and call history when enabled",
  ],
  boundaries: [
    "Human handoff is plan- and setup-dependent; it is not a universal live-transfer promise.",
    "Bulk campaigns, scheduling, automatic retries, direct calendar/CRM actions and capacity beyond the agreed scope are not assumed.",
    "Public prices are indicative; final price and availability are confirmed before purchase.",
  ],
  pricing: {
    currency: "GEL",
    cadence: "monthly",
    setup: { amount: 150, description: "One-time phone-number purchase and initial configuration" },
    includedInboundChannels: 1,
    extraInboundChannelMonthly: 60,
    inboundMinuteFee: false,
    connectedOutboundMinute: 1.5,
    plans: [
      { id: "starter", name: "Starter", amount: 220, scope: "1 AI role, 1 call task, 1 included inbound channel" },
      { id: "business", name: "Business", amount: 450, scope: "1 AI role, 3 call tasks, 1 included inbound channel, 1 connected tool" },
      { id: "premium", name: "Premium", amount: 900, scope: "3 AI roles, 10 call tasks, 1 included inbound channel, 3 connected tools" },
      { id: "enterprise", name: "Enterprise", amount: 2500, scope: "10 AI roles, 25 call tasks, 1 included inbound channel, 10 connected tools" },
      { id: "custom", name: "Custom", amount: 5000, scope: "Capacity, roles, tasks and tools by agreement; contact-only starting point" },
    ],
  },
} as const;

export function buildAiCallCatalog(): Record<string, unknown> {
  return {
    schemaVersion: "aicall.public-product.v1",
    name: AICALL_FACTS.product,
    provider: { name: AICALL_FACTS.provider, url: AICALL_FACTS.providerUrl, legalName: AICALL_FACTS.legalName },
    url: AICALL_BASE_URL,
    languages: AICALL_FACTS.languages,
    purpose: AICALL_FACTS.purpose,
    pricing: AICALL_FACTS.pricing,
    boundaries: AICALL_FACTS.boundaries,
    routes: ["/", "/pricing", "/contact", "/integrations", "/security", "/privacy", "/terms", "/blog"],
    lastUpdated: "2026-10-07",
  };
}

export function buildAiCallSummary(): Record<string, unknown> {
  return {
    name: AICALL_FACTS.product,
    provider: { name: AICALL_FACTS.provider, url: AICALL_FACTS.providerUrl },
    providerUrl: AICALL_FACTS.providerUrl,
    url: AICALL_BASE_URL,
    location: AICALL_FACTS.location,
    languages: AICALL_FACTS.languages,
    purpose: AICALL_FACTS.purpose,
    input: AICALL_FACTS.input,
    output: AICALL_FACTS.output,
    boundaries: AICALL_FACTS.boundaries,
    pricing: AICALL_FACTS.pricing,
    links: {
      pricing: `${AICALL_BASE_URL}/pricing`,
      contact: `${AICALL_BASE_URL}/contact`,
      blog: `${AICALL_BASE_URL}/blog`,
      llms: `${AICALL_BASE_URL}/llms.txt`,
      service: `${AICALL_BASE_URL}/ai/service.json`,
      faq: `${AICALL_BASE_URL}/ai/faq.json`,
    },
    lastUpdated: "2026-10-07",
  };
}

export function buildAiCallService(): Record<string, unknown> {
  return {
    name: AICALL_FACTS.product,
    description: AICALL_FACTS.purpose,
    url: AICALL_BASE_URL,
    provider: { name: AICALL_FACTS.provider, url: AICALL_FACTS.providerUrl, location: AICALL_FACTS.location },
    serviceLanguages: AICALL_FACTS.languages,
    input: AICALL_FACTS.input,
    output: AICALL_FACTS.output,
    boundaries: AICALL_FACTS.boundaries,
    pricing: AICALL_FACTS.pricing,
    integrations: {
      phone: "available",
      calendar: "custom setup or plan-dependent; direct action is not assumed",
      crm: "custom setup or plan-dependent; direct action is not assumed",
      telegram: "custom setup; tenant configuration is not implied",
      tiktokLeads: "planned, not available now",
    },
    lastUpdated: "2026-10-07",
  };
}

export function buildAiCallFaq(): Record<string, unknown> {
  const copy = getAiNowHomeCopy("en");
  return {
    name: AICALL_FACTS.product,
    url: AICALL_BASE_URL,
    lastUpdated: "2026-10-07",
    faqs: Object.entries(copy.faq.items).map(([id, item]) => ({ id, question: item.question, answer: item.answer })),
  };
}

export function buildAiCallIntegrations(): Record<string, unknown> {
  return {
    name: AICALL_FACTS.product,
    url: AICALL_BASE_URL,
    lastUpdated: "2026-10-07",
    integrations: {
      phone: { status: "available" },
      calendar: { status: "custom_setup_or_plan_dependent", directActions: "not_assumed" },
      crm: { status: "custom_setup_or_plan_dependent", directActions: "not_assumed" },
      telegram: { status: "custom_setup", tenantReadback: "not_proven" },
      tiktokLeads: { status: "planned", availableNow: false },
    },
  };
}

export function serializeAiCall(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}
