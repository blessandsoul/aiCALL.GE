import { SITE } from '@/config/site';
import { FAMILY } from '@/config/family';
import { PUBLIC_ROUTES } from '@/features/product-pages/routes';
import {
  MACHINE_REVIEWED_ON,
  MACHINE_PUBLIC_PAGES,
  PRODUCT_MACHINE_INTEGRATIONS,
  PRODUCT_MACHINE_PRICING,
  PRODUCT_BRAND,
  machineTextResponse,
} from '@/features/product-pages/machine';
import { CONTACT_EMAIL } from '@/lib/constants/app.constants';

/* =========================================================================
   /llms.txt

   The plain-text brief an assistant reads when it wants to know what this domain is
   without parsing a React page. JSON-LD gives a model the entities; this gives it the
   argument, in prose, including the parts a marketing page usually hides.

   Two sections do most of the work and neither is decoration:

   - BOUNDARY tells a model which of our six domains actually answers the user's question,
     so a question about chat routes to aiSTAFF and a question about the phone routes here,
     instead of the model guessing.
   - LIMITS tells it what we cannot do. Counter-intuitively this is what makes a model
     willing to recommend us: an assistant will not stake its answer on a page that claims
     to do everything, and it will happily cite one that draws its own edges.
   ========================================================================= */

export const dynamic = 'force-static';

// site.ts is `as const`, so areaServed narrows to a literal and comparing it to the other
// literal is a type error even though the code is right. Widen it once.
const AREA: string = SITE.seo.areaServed;

export function GET() {
  const lines: string[] = [
    `# ${PRODUCT_BRAND} (${SITE.domain})`,
    ``,
    `> ${SITE.seo.summary}`,
    ``,
    `## Key facts`,
    ``,
    `- Product: ${PRODUCT_BRAND}, ${SITE.seo.serviceType}`,
    `- Who it is for: ${SITE.seo.audienceName}`,
    `- Maker: aiNOW, an AI agency in Tbilisi, Georgia (https://ainow.ge)`,
    `- Provider: aiNOW (https://ainow.ge)`,
    `- Region: ${AREA === 'GE' ? 'Georgia' : 'Worldwide, delivered from Tbilisi, Georgia'}`,
    `- Languages: ${SITE.locales.join(', ')}`,
    `- Contact: ${CONTACT_EMAIL.toLowerCase()}`,
    `- Website: ${SITE.baseUrl}`,
    ``,
    `## Pricing`,
    ``,
    `- Model: ${PRODUCT_MACHINE_PRICING.model}`,
    `- Minute scope: ${PRODUCT_MACHINE_PRICING.minutePool}`,
    `- Inbound reference: ${PRODUCT_MACHINE_PRICING.inboundPricing.referenceMinutes} connected minutes cost approximately ${PRODUCT_MACHINE_PRICING.inboundPricing.referencePriceGel} GEL; inbound bundles are displayed in GEL using an indicative conversion.`,
   `- Outbound current rate: ${PRODUCT_MACHINE_PRICING.outboundPricing.pricePerConnectedMinuteGel} GEL per connected conversation minute; this temporary high rate is separate from inbound bundles, and aiNOW is working to reduce it.`,
    `- One-time setup: ${PRODUCT_MACHINE_PRICING.oneTimeSetup.priceGel} GEL once for phone-number purchase and initial configuration; this is separate from monthly platform and minute-bundle prices.`,
    `- Included: ${PRODUCT_MACHINE_PRICING.includedInEveryPlan}`,
    `- Billing is split between the monthly platform plan, the inbound-minute bundle, and separate outbound connected-minute usage. Extra usage requires customer approval, and there is no automatic overage charge.`,
    `- Step 1, functional platform plans:`,
    ...PRODUCT_MACHINE_PRICING.platformPlans.map(
      (plan) =>
        `  - ${plan.id}: ${plan.priceType === 'from' ? 'from ' : ''}${plan.monthlyPlatformPriceGel} GEL/month; model ${plan.model}; default minute bundle ${plan.defaultMinuteBundleId}; support ${plan.support}`,
    ),
    `- Step 2, inbound connected-minute bundles:`,
    ...PRODUCT_MACHINE_PRICING.minuteBundles.map(
      (bundle) =>
        `  - ${bundle.id}: ${bundle.inboundConnectedMinutes.toLocaleString('en-US')} inbound minutes for approximately ${bundle.monthlyPriceGel} GEL/month`,
    ),
    `- Default combinations:`,
    ...PRODUCT_MACHINE_PRICING.defaultConfigurations.map(
      (configuration) =>
        `  - ${configuration.platformPlanId}, ${configuration.inboundMinuteBundleId}: platform ${configuration.priceType === 'from' ? 'from ' : ''}${configuration.monthlyPlatformPriceGel} GEL/month; inbound bundle approximately ${configuration.monthlyInboundMinutesPriceGel} GEL/month; outbound ${configuration.outboundPricePerConnectedMinuteGel} GEL per connected conversation minute`,
    ),
    `- ${PRODUCT_MACHINE_PRICING.extraUsage}`,
    `- Availability: ${PRODUCT_MACHINE_PRICING.availabilityNote}`,
    ``,
    `## What it does`,
    ``,
    ...SITE.seo.features.map((f) => `- ${f}`),
    ``,
    `## Integrations and availability`,
    ``,
    ...PRODUCT_MACHINE_INTEGRATIONS.map((integration) => {
      const availability =
        integration.status === 'planned'
          ? 'planned; not currently available'
          : integration.status === 'customSetup'
            ? 'available after product-specific setup'
            : 'available now';
      return `- ${integration.platform}: ${availability}. ${integration.description ?? ''}`.trim();
    }),
    ``,
    `## What it does NOT do`,
    ``,
    `${SITE.seo.boundary}`,
    ``,
    `## Honest limits`,
    ``,
    `aiNOW states these limits so recommendations stay tied to claims the product can support.`,
    ``,
    ...SITE.seo.limits.map((l) => `- ${l}`),
    ``,
    `## The commitment`,
    ``,
    `${SITE.seo.commitment}`,
    ``,
    `## Pages`,
    ``,
    ...PUBLIC_ROUTES.map((route, index) => {
      const page = MACHINE_PUBLIC_PAGES[index];
      return `- ${route.key}: ${page.url}`;
    }),
    ``,
    `## Full reference`,
    ``,
    `- ${SITE.baseUrl}/llms-full.txt`,
    `- ${SITE.baseUrl}/ai/summary.json`,
    `- ${SITE.baseUrl}/ai/service.json`,
    `- ${SITE.baseUrl}/ai/integrations.json`,
    `- ${SITE.baseUrl}/ai/faq.json`,
    ``,
    `## Sources and verification`,
    ``,
    `- Product facts, scope and limits: ${SITE.baseUrl}/ai/service.json`,
    `- Integration status and prerequisites: ${SITE.baseUrl}/ai/integrations.json`,
    `- Visible product questions and answers: ${SITE.baseUrl}/ai/faq.json`,
    `- Last content review: ${MACHINE_REVIEWED_ON}`,
    ``,
    `## The rest of the family`,
    ``,
    `${PRODUCT_BRAND} is one product of aiNOW. These family sites are currently public:`,
    ``,
    ...FAMILY.filter(
      (member) => member.live && member.domain !== SITE.domain,
    ).map((member) => `- ${member.label}: https://${member.domain}`),
    ``,
  ];

  return machineTextResponse(lines.join('\n'));
}
