export interface ClosingLeadPlan {
  id: string;
  name: string;
  price?: string | number;
  cadence?: string;
}

export interface ClosingLeadAttribution {
  source?: string;
  sourcePath?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export interface ClosingLeadInput {
  phone: string;
  company: string;
  task: string;
  product: string;
  contactPreference: string;
  turnstileToken: string;
  plan?: ClosingLeadPlan | null;
  attribution?: ClosingLeadAttribution;
}

export interface ClosingLeadRequest {
  url: "/api/contact";
  init: RequestInit & { body: string };
  message: string;
}

export const CLOSING_LEAD_PRODUCT = "aicall";
export const CLOSING_LEAD_MAX_MESSAGE = 5000;
const ACCEPTS_UTM = true;
const ACCEPTS_SOURCE_PATH = true;
const UTM_VALUE_PATTERN = /^[A-Za-z0-9_-]+$/;

/** Keep client-side attribution aligned with the original contact schema. */
export function sanitizeUtmValue(value: string | undefined, maxLength = 180): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed || trimmed.length > maxLength || !UTM_VALUE_PATTERN.test(trimmed)) return undefined;
  return trimmed;
}
const ACCEPTS_PLAN = true;

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function appendUnsupportedAttribution(lines: string[], attribution: ClosingLeadAttribution | undefined): void {
  if (!attribution) return;
  const values: Array<[string, string | undefined]> = [
    ["source", attribution.source],
    ["utm_term", sanitizeUtmValue(attribution.utmTerm)],
    ...(!ACCEPTS_SOURCE_PATH ? [["source_path", attribution.sourcePath] as [string, string | undefined]] : []),
    ...(!ACCEPTS_UTM ? [
      ["utm_source", attribution.utmSource],
      ["utm_medium", attribution.utmMedium],
      ["utm_campaign", attribution.utmCampaign],
      ["utm_content", attribution.utmContent],
      ["utm_term", sanitizeUtmValue(attribution.utmTerm)],
    ] as Array<[string, string | undefined]> : []),
  ];
  const extras = values.filter(([, value]) => clean(value)).map(([key, value]) => `${key}: ${clean(value)}`);
  if (extras.length) lines.push("", ...extras);
}

export function buildClosingLeadMessage(input: ClosingLeadInput): string {
  const lines = [
    `Company / industry: ${input.company.trim()}`,
    `Product: ${input.product.trim()}`,
    `Preferred contact: ${input.contactPreference.trim()}`,
    input.plan ? `Plan: ${input.plan.name}${input.plan.id ? ` (${input.plan.id})` : ""}` : null,
    "",
    input.task.trim(),
  ].filter((value): value is string => Boolean(value));
  appendUnsupportedAttribution(lines, input.attribution);
  const message = lines.join("\n").trim();
  if (message.length > CLOSING_LEAD_MAX_MESSAGE) {
    throw new Error(`Closing lead message exceeds ${CLOSING_LEAD_MAX_MESSAGE} characters`);
  }
  return message;
}

export function buildClosingLeadRequest(input: ClosingLeadInput): ClosingLeadRequest {
  const message = buildClosingLeadMessage(input);
  const attribution = input.attribution;
  const body: Record<string, unknown> = {
    phone: input.phone.trim(),
    name: input.company.trim(),
    message,
    turnstileToken: input.turnstileToken,
  };
  if (ACCEPTS_PLAN && input.plan?.id) body.plan = input.plan.id;
  if (ACCEPTS_UTM) {
    const utmSource = sanitizeUtmValue(attribution?.utmSource, 80);
    const utmMedium = sanitizeUtmValue(attribution?.utmMedium, 80);
    const utmCampaign = sanitizeUtmValue(attribution?.utmCampaign, 120);
    const utmContent = sanitizeUtmValue(attribution?.utmContent, 180);
    if (utmSource) body.utm_source = utmSource;
    if (utmMedium) body.utm_medium = utmMedium;
    if (utmCampaign) body.utm_campaign = utmCampaign;
    if (utmContent) body.utm_content = utmContent;
  }
  if (ACCEPTS_SOURCE_PATH && attribution?.sourcePath) body.source_path = attribution.sourcePath;
  return {
    url: "/api/contact",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
    message,
    };
}

export async function readClosingLeadReceipt(response: Response): Promise<{ accepted: true } | { accepted: false; reason: string }> {
  if (!response.ok) return { accepted: false, reason: "http_error" };
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { accepted: false, reason: "invalid_receipt" };
  }
  if (!body || typeof body !== "object" || (body as { success?: unknown }).success !== true) {
    return { accepted: false, reason: "not_acknowledged" };
  }
  return { accepted: true };
}

export function createClosingLeadSubmitter(fetcher: typeof fetch): (input: ClosingLeadInput) => Promise<{ accepted: true } | { accepted: false; reason: string }> {
  let inFlight = false;
  return async (input) => {
    if (inFlight) return { accepted: false, reason: "in_flight" };
    inFlight = true;
    try {
      const request = buildClosingLeadRequest(input);
      const response = await fetcher(request.url, request.init);
      return readClosingLeadReceipt(response);
    } catch {
      return { accepted: false, reason: "network_error" };
    } finally {
      inFlight = false;
    }
  };
}






