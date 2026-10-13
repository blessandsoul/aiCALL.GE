import { getPostBySlug, getPosts } from "@/features/blog/lib/api";
import { AICALL_BASE_URL, AICALL_FACTS, buildAiCallCatalog } from "@/lib/aicall-public-facts";

function articleUrl(locale: string, slug: string): string {
  return locale === "ka" ? `${AICALL_BASE_URL}/blog/${slug}` : `${AICALL_BASE_URL}/${locale}/blog/${slug}`;
}

function toPlainMarkdown(content: string): string {
  return content.replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
}

export async function GET(): Promise<Response> {
  const lines = [
    `# ${AICALL_FACTS.product} by ${AICALL_FACTS.provider} — full content`,
    "",
    `> ${AICALL_FACTS.purpose}`,
    "",
    "## Current facts",
    "",
    `Provider: ${AICALL_FACTS.provider} (${AICALL_FACTS.providerUrl})`,
    `Website: ${AICALL_BASE_URL}`,
    `Languages: ${AICALL_FACTS.languages.join(", ")}`,
    `Input: ${AICALL_FACTS.input.join("; ")}`,
    `Outcome: ${AICALL_FACTS.output.join("; ")}`,
    "",
    "## Pricing",
    "",
    `Phone setup: ${AICALL_FACTS.pricing.setup.amount} GEL once.`,
    `Inbound channel: ${AICALL_FACTS.pricing.includedInboundChannels} included; additional channel ${AICALL_FACTS.pricing.extraInboundChannelMonthly} GEL/month subject to confirmation.`,
    "Inbound minutes: no separate per-minute telecom fee.",
    `Connected outbound minute: ${AICALL_FACTS.pricing.connectedOutboundMinute.toFixed(2)} GEL after answer.`,
    ...AICALL_FACTS.pricing.plans.map((plan) => `${plan.name}: ${plan.amount} GEL/month; ${plan.scope}`),
    "",
    "## Boundaries",
    ...AICALL_FACTS.boundaries,
    "",
    "## Authored articles",
    "",
  ];

  for (const locale of ["ka", "en", "ru"]) {
    const posts = await getPosts(locale);
    lines.push(`### ${locale.toUpperCase()} (${posts.length})`, "");
    for (const post of posts) {
      const full = await getPostBySlug(post.slug, locale);
      if (!full?.content) continue;
      lines.push(`#### ${full.title}`, "", `Language: ${locale}`, `URL: ${articleUrl(locale, full.slug)}`, `Published: ${full.date}`, "", toPlainMarkdown(full.content), "", "---", "");
    }
  }

  lines.push(`Catalog JSON: ${AICALL_BASE_URL}/ai/catalog.json`, `Facts JSON: ${AICALL_BASE_URL}/ai/summary.json`, `Catalog snapshot: ${JSON.stringify(buildAiCallCatalog())}`);

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600" },
  });
}
