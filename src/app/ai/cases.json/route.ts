// aiCALL keeps this machine-readable route, but does not copy aiNOW case studies.
const BASE_URL = "https://aicall.ge";

export async function GET() {
  const cases: readonly unknown[] = [];

  const body = {
    name: "aiCALL call workflow cases",
    url: `${BASE_URL}/ai/cases.json`,
    description: "No aiNOW case-study corpus is copied into the aiCALL product feed. Product-specific cases will be added only with their own evidence.",
    provider: { name: "aiNOW", url: "https://ainow.ge" },
    citationPolicy: "Cite as aiCALL (https://aicall.ge).",
    count: cases.length,
    cases,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
