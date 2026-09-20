import { SITE } from '@/config/site';
import { PUBLIC_ROUTES } from '@/features/product-pages/routes';
import {
  MACHINE_FAQ,
  MACHINE_PUBLIC_PAGES,
  MACHINE_REVIEWED_ON,
  PRODUCT_MACHINE_INTEGRATIONS,
  PRODUCT_MACHINE_PRICING,
  PRODUCT_BRAND,
  machineTextResponse,
} from '@/features/product-pages/machine';

export const dynamic = 'force-static';

export function GET() {
  const lines: string[] = [
    `# ${PRODUCT_BRAND}, full product reference`,
    '',
    `Last reviewed: ${MACHINE_REVIEWED_ON}`,
    `Canonical website: ${SITE.baseUrl}`,
    '',
    '## Definition',
    '',
    SITE.seo.summary,
    '',
    '## Intended customer',
    '',
    SITE.seo.audienceName,
    '',
    '## Pricing',
    '',
    `Model: ${PRODUCT_MACHINE_PRICING.model}.`,
    PRODUCT_MACHINE_PRICING.inboundChannels,
   `Inbound minutes have no separate per-minute telecom charge. Each additional concurrent inbound channel costs ${PRODUCT_MACHINE_PRICING.inboundPricing.additionalChannelMonthlyPriceGel} GEL/month.`,
    `One-time setup: ${PRODUCT_MACHINE_PRICING.oneTimeSetup.priceGel} GEL once for phone-number purchase and initial configuration; separate from monthly charges.`,
    `Outbound rate: ${PRODUCT_MACHINE_PRICING.outboundPricing.pricePerConnectedMinuteGel} GEL per connected conversation minute after the customer answers.`,
    PRODUCT_MACHINE_PRICING.includedInEveryPlan,
    '',
    '### Step 1, functional platform plan',
    '',
    ...PRODUCT_MACHINE_PRICING.platformPlans.flatMap((plan) => [
      `### ${plan.id}`,
      '',
      `Monthly platform price: ${plan.priceType === 'from' ? 'from ' : ''}${plan.monthlyPlatformPriceGel} GEL.`,
      `AI model: ${plan.model}.`,
      `Included inbound channels: ${plan.includedInboundChannels}.`,
      `Limits: ${JSON.stringify(plan.limits)}.`,
      `Support: ${plan.support}.`,
      `Capability status: ${JSON.stringify(plan.capabilities)}.`,
      '',
    ]),
    '### Step 2, inbound channel options',
    '',
    ...PRODUCT_MACHINE_PRICING.inboundChannelOptions.map(
      (option) =>
        `- ${option.channels} parallel inbound channels: ${option.additionalMonthlyPriceGel} GEL/month in channel add-ons.`,
    ),
    '',
    '### Default combinations',
    '',
    ...PRODUCT_MACHINE_PRICING.defaultConfigurations.map(
      (configuration) =>
        `- ${configuration.platformPlanId}, ${configuration.inboundChannels} inbound channels: platform ${configuration.priceType === 'from' ? 'from ' : ''}${configuration.monthlyPlatformPriceGel} GEL/month; channel add-on ${configuration.monthlyInboundChannelsPriceGel} GEL/month; outbound usage remains separate at ${configuration.outboundPricePerConnectedMinuteGel} GEL per connected conversation minute.`,
    ),
    '',
    PRODUCT_MACHINE_PRICING.extraUsage,
    PRODUCT_MACHINE_PRICING.availabilityNote,
    '',
    `## What ${PRODUCT_BRAND} does`,
    '',
    ...SITE.seo.features.map((feature) => `- ${feature}`),
    '',
    '## Integrations and availability',
    '',
    ...PRODUCT_MACHINE_INTEGRATIONS.flatMap((integration) => [
      `### ${integration.platform}`,
      '',
      `Status: ${integration.status}.`,
      `Available now: ${integration.availableNow ? 'yes' : 'no'}.`,
      ...(integration.description ? [integration.description] : []),
      ...(integration.requirements.length > 0
        ? [
            'Requirements:',
            ...integration.requirements.map((requirement) => `- ${requirement}`),
          ]
        : []),
      '',
    ]),
    '## Product boundary',
    '',
    SITE.seo.boundary,
    '',
    '## Known limits',
    '',
    ...SITE.seo.limits.map((limit) => `- ${limit}`),
    '',
    '## Commitment',
    '',
    SITE.seo.commitment,
    '',
    '## Public pages',
    '',
    ...PUBLIC_ROUTES.map((route, index) => {
      const page = MACHINE_PUBLIC_PAGES[index];
      return `- ${route.key}: ${page.url}`;
    }),
    '',
    '## Frequently asked questions',
    '',
    ...MACHINE_FAQ.flatMap(({ question, answer }) => [
      `### ${question}`,
      '',
      answer,
      '',
    ]),
    '## Verification',
    '',
    `- Provider: aiNOW, https://ainow.ge`,
    `- Structured summary: ${SITE.baseUrl}/ai/summary.json`,
    `- Structured service facts: ${SITE.baseUrl}/ai/service.json`,
    `- Structured integration status: ${SITE.baseUrl}/ai/integrations.json`,
    `- Structured FAQ: ${SITE.baseUrl}/ai/faq.json`,
    `- Concise index: ${SITE.baseUrl}/llms.txt`,
    '',
  ];

  return machineTextResponse(lines.join('\n'));
}
