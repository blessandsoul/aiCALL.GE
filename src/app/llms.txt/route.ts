import { getPosts } from "@/features/blog/lib/api";
import { AICALL_BASE_URL, AICALL_FACTS, buildAiCallCatalog } from "@/lib/aicall-public-facts";

function articleUrl(locale: string, slug: string): string {
  return locale === "ka" ? `${AICALL_BASE_URL}/blog/${slug}` : `${AICALL_BASE_URL}/${locale}/blog/${slug}`;
}

export async function GET(): Promise<Response> {
  const entries = await Promise.all(["ka", "en", "ru"].map(async (locale) => ({ locale, posts: await getPosts(locale) })));
  const catalog = buildAiCallCatalog();
  const plans = AICALL_FACTS.pricing.plans.map((plan) => `- ${plan.name}: ${plan.amount} GEL/month; ${plan.scope}`);
  const lines = [
    `# ${AICALL_FACTS.product} by ${AICALL_FACTS.provider}`,
    "",
    `> ${AICALL_FACTS.purpose}`,
    "",
    "## Product facts",
    "",
    `- Provider: ${AICALL_FACTS.provider} (${AICALL_FACTS.providerUrl})`,
    `- Location: ${AICALL_FACTS.location}`,
    `- Languages: ${AICALL_FACTS.languages.join(", ")}`,
    `- Website: ${AICALL_BASE_URL}`,
    `- Pricing: ${AICALL_BASE_URL}/pricing`,
    `- Contact: ${AICALL_BASE_URL}/contact`,
    "",
    "## Input, work and outcome",
    "",
    ...AICALL_FACTS.input.map((item) => `- Input: ${item}`),
    ...AICALL_FACTS.output.map((item) => `- Outcome: ${item}`),
    "",
    "## Pricing boundaries",
    "",
    `- One-time phone setup: ${AICALL_FACTS.pricing.setup.amount} GEL.`,
    `- One included parallel inbound channel in every plan; each additional channel is ${AICALL_FACTS.pricing.extraInboundChannelMonthly} GEL/month subject to confirmation.`,
    "- Inbound minutes have no separate per-minute telecom fee.",
    `- Approved connected outbound usage: ${AICALL_FACTS.pricing.connectedOutboundMinute.toFixed(2)} GEL per connected minute after answer.`,
    "- Public prices are indicative; final price and availability are confirmed before purchase.",
    ...plans,
    "",
    "## Limits",
    "",
    ...AICALL_FACTS.boundaries.map((item) => `- ${item}`),
    "",
    "## Public routes",
    "",
    ...["/", "/pricing", "/contact", "/integrations", "/security", "/privacy", "/terms", "/blog", "/llms.txt", "/llms-full.txt", "/ai/summary.json", "/ai/service.json", "/ai/faq.json", "/ai/integrations.json"].map((path) => `- ${AICALL_BASE_URL}${path}`),
    "",
    "## Blog",
    "",
    ...entries.flatMap(({ locale, posts }) => [`### ${locale.toUpperCase()} authored articles (${posts.length})`, ...posts.map((post) => `- [${post.title}](${articleUrl(locale, post.slug)})`), ""]),
    "",
    `Machine-readable catalog: ${AICALL_BASE_URL}/ai/catalog.json`,
    `Machine-readable facts: ${AICALL_BASE_URL}/ai/summary.json`,
    `Catalog snapshot: ${JSON.stringify(catalog)}`,
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600" },
  });
}
