import { buildAiCallSummary, serializeAiCall } from "@/lib/aicall-public-facts";

export const revalidate = 86400;

export function GET(): Response {
  return new Response(serializeAiCall(buildAiCallSummary()), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
