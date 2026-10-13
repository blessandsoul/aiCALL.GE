import { buildAiCallIntegrations } from "@/lib/aicall-public-facts";

export const revalidate = 86400;

export function GET(): Response {
  return Response.json(
    buildAiCallIntegrations(),
    {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    },
  );
}
