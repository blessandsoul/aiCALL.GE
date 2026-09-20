import messages from '@/messages/en.json';
import { PRODUCT_PAGES } from '@/config/product-pages';
import { SITE } from '@/config/site';
import { VOICE_PRICING } from '@/config/voice-pricing';
import { PUBLIC_ROUTES } from '@/features/product-pages/routes';
import { CONTACT_EMAIL } from '@/lib/constants/app.constants';
import { localeUrl } from '@/i18n/seo-locales';

import type { ProductPageLocale, PublicRoute } from './types';

export const PRODUCT_BRAND = SITE.wordmark.prefix + SITE.wordmark.mark;
export const MACHINE_REVIEWED_ON = '2026-08-16';
export const MACHINE_CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
} as const;

const FAQ_LIMIT = 5;
const faqMessages = messages.product.faq as Record<string, string>;

export interface MachineFaqItem {
  question: string;
  answer: string;
}

export interface MachinePublicPage {
  key: PublicRoute['key'];
  path: PublicRoute['path'];
  url: string;
  localizedUrls: Readonly<Record<ProductPageLocale, string>>;
}

export interface MachineIntegration {
  id: string;
  platform: string;
  status: 'available' | 'customSetup' | 'planned';
  availableNow: boolean;
  launchDate?: string | null;
  connection: string;
  dataFlow: string;
  description?: string;
  requirements: readonly string[];
  officialSources: readonly string[];
}

function replaceBrandMarkup(value: string): string {
  return value.replace(/<brand>.*?<\/brand>/gu, PRODUCT_BRAND);
}

export const MACHINE_FAQ: readonly MachineFaqItem[] = Array.from(
  { length: FAQ_LIMIT },
  (_, index) => {
    const number = index + 1;
    return {
      question: replaceBrandMarkup(faqMessages[`q${number}`] ?? ''),
      answer: faqMessages[`a${number}`] ?? '',
    };
  },
).filter(({ question, answer }) => question.length > 0 && answer.length > 0);

export const MACHINE_PUBLIC_PAGES: readonly MachinePublicPage[] =
  PUBLIC_ROUTES.map((route) => {
    const path = route.path === '/' ? '' : route.path;
    return {
      key: route.key,
      path: route.path,
      url: localeUrl(SITE.defaultLocale, path),
      localizedUrls: Object.fromEntries(
        Object.keys(route.localePaths).map((locale) => [
          locale,
          localeUrl(locale, path),
        ]),
      ) as Record<ProductPageLocale, string>,
    };
  });

export const PRODUCT_MACHINE_INTEGRATIONS: readonly MachineIntegration[] =
  PRODUCT_PAGES.integrations.records.map((record) => ({
    id: record.id,
    platform: record.name,
    status: record.status,
    availableNow: record.status !== 'planned',
    ...(record.status === 'planned' ? { launchDate: null } : {}),
    connection: record.connection,
    dataFlow: record.dataFlow,
    description:
      'machineDescription' in record ? record.machineDescription : undefined,
    requirements:
      'requirements' in record ? [...record.requirements] : [],
    officialSources:
      'officialSources' in record ? [...record.officialSources] : [],
  }));

const MACHINE_PLATFORM_PLANS = VOICE_PRICING.plans.map((plan) => ({
  id: plan.id,
  model: plan.model,
  monthlyPlatformPriceGel: plan.monthlyPlatformPriceGel,
  priceType: plan.contactOnly ? 'from' : 'fixed',
  recommended: plan.recommended,
  contactOnly: plan.contactOnly,
  includedInboundChannels: plan.includedInboundChannels,
  limits: plan.limits,
  support: plan.support,
  capabilities: plan.capabilities,
}));

const MACHINE_INBOUND_CHANNEL_OPTIONS = VOICE_PRICING.inboundChannelOptions.map((channels) => ({
  channels,
  additionalMonthlyPriceGel:
    Math.max(0, channels - VOICE_PRICING.billing.includedInboundChannels) *
    VOICE_PRICING.billing.additionalInboundChannelMonthlyPriceGel,
  currency: VOICE_PRICING.platformCurrency,
}));

const MACHINE_DEFAULT_CONFIGURATIONS = VOICE_PRICING.plans.map((plan) => {
  return {
    platformPlanId: plan.id,
    inboundChannels: plan.includedInboundChannels,
    monthlyPlatformPriceGel: plan.monthlyPlatformPriceGel,
    monthlyInboundChannelsPriceGel: 0,
    outboundPricePerConnectedMinuteGel:
      VOICE_PRICING.billing.outboundPricePerConnectedMinuteGel,
    priceType: plan.contactOnly ? 'from' : 'fixed',
  };
});

export const PRODUCT_MACHINE_PRICING = {
  model: 'monthly functional platform plan with one included parallel inbound channel; outbound usage is billed separately',
  platformCurrency: VOICE_PRICING.platformCurrency,
  billingPeriod: VOICE_PRICING.cadence,
  inboundPricing: {
    includedChannels: VOICE_PRICING.billing.includedInboundChannels,
    additionalChannelMonthlyPriceGel:
      VOICE_PRICING.billing.additionalInboundChannelMonthlyPriceGel,
    minutesHaveNoSeparateTelecomCharge: VOICE_PRICING.billing.inboundMinutesIncluded,
    billingMethod:
      'Every plan includes one parallel inbound channel. Each additional concurrent inbound channel costs 60 GEL per month. Inbound minutes have no separate per-minute telecom charge.',
  },
  outboundPricing: {
    pricePerConnectedMinuteGel:
      VOICE_PRICING.billing.outboundPricePerConnectedMinuteGel,
    temporary: false,
    billingMethod:
      'Outbound usage is billed at 1.50 GEL per connected conversation minute after the customer answers.',
  },
  oneTimeSetup: {
    priceGel: VOICE_PRICING.billing.oneTimeSetupFeeGel,
    includes: 'phone number purchase and initial configuration',
    billingMethod:
      'Charged once when aiCALL is first installed; it is separate from the monthly platform plan and channel add-ons.',
  },
  inboundChannels:
    'Every published plan starts with one parallel inbound channel. Additional channels are optional monthly add-ons; final availability is confirmed during setup.',
  selectionOrder: [
    'Choose the functional platform plan.',
    'Choose how many parallel inbound channels you need.',
    'Review the monthly platform price, channel add-on and one-time setup fee before submitting the request.',
    'If outbound calls are needed, add 1.50 GEL per connected conversation minute separately.',
  ],
  includedInEveryPlan:
    'The published launch scope keeps voice quality, Georgian, English and Russian, interruption handling, disclosed recording, transcription and private call history consistent across plans.',
  fees: {
    oneTimeSetupFeeGel: VOICE_PRICING.billing.oneTimeSetupFeeGel,
    additionalFlatFeePerCall:
      VOICE_PRICING.billing.additionalFlatFeePerCall,
    campaign: VOICE_PRICING.billing.campaignFee,
    unexpectedPlatform: VOICE_PRICING.billing.unexpectedPlatformFee,
    automaticOverage: VOICE_PRICING.billing.automaticOverage,
  },
  extraUsage:
    'Additional inbound channels are activated only after customer approval. Inbound minutes have no separate per-minute telecom charge; outbound usage remains separate.',
  platformPlans: MACHINE_PLATFORM_PLANS,
  inboundChannelOptions: MACHINE_INBOUND_CHANNEL_OPTIONS,
  defaultConfigurations: MACHINE_DEFAULT_CONFIGURATIONS,
  plans: MACHINE_PLATFORM_PLANS,
  availabilityNote:
    'The matrix describes the commercial launch scope. Capabilities marked planned are not currently available and activate only after the required telephony integration is complete.',
  purchaseFlow:
    'Plans are selected through aiNOW contact and setup. The customer approves the functional plan and inbound channel count separately. Outbound usage is quoted at 1.50 GEL per connected minute. There is no automatic self-service overage charge.',
} as const;

export function machineJsonResponse(payload: unknown): Response {
  return Response.json(payload, {
    headers: MACHINE_CACHE_HEADERS,
  });
}

export function machineTextResponse(body: string): Response {
  return new Response(body, {
    headers: {
      ...MACHINE_CACHE_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export const PRODUCT_MACHINE_FACTS = {
  name: PRODUCT_BRAND,
  url: SITE.baseUrl,
  provider: {
    name: 'aiNOW',
    url: 'https://ainow.ge',
    location: 'Tbilisi, Georgia',
  },
  serviceType: SITE.seo.serviceType,
  summary: SITE.seo.summary,
  audience: SITE.seo.audienceName,
  areaServed: SITE.seo.areaServed,
  languages: [...SITE.locales],
  capabilities: [...SITE.seo.features],
  boundary: SITE.seo.boundary,
  limits: [...SITE.seo.limits],
  commitment: SITE.seo.commitment,
  contact: {
    email: CONTACT_EMAIL.toLowerCase(),
  },
  integrations: PRODUCT_MACHINE_INTEGRATIONS,
  pricing: PRODUCT_MACHINE_PRICING,
  publicPages: MACHINE_PUBLIC_PAGES,
  reviewedOn: MACHINE_REVIEWED_ON,
} as const;
