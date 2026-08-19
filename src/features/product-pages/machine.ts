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
  defaultMinuteBundleId: plan.defaultMinuteBundleId,
  limits: plan.limits,
  support: plan.support,
  capabilities: plan.capabilities,
}));

const MACHINE_MINUTE_BUNDLES = VOICE_PRICING.minuteBundles.map((bundle) => ({
  id: bundle.id,
  direction: 'inbound',
  inboundConnectedMinutes: bundle.minutes,
  monthlyPriceGel: bundle.monthlyPriceGel,
  currency: VOICE_PRICING.inboundBundleCurrency,
  priceType: bundle.contactOnly ? 'from' : 'fixed',
  contactOnly: bundle.contactOnly,
}));

const MACHINE_DEFAULT_CONFIGURATIONS = VOICE_PRICING.plans.map((plan) => {
  const bundle = VOICE_PRICING.minuteBundles.find(
    (item) => item.id === plan.defaultMinuteBundleId,
  );
  return {
    platformPlanId: plan.id,
    inboundMinuteBundleId: plan.defaultMinuteBundleId,
    inboundConnectedMinutes: bundle?.minutes ?? 0,
    monthlyPlatformPriceGel: plan.monthlyPlatformPriceGel,
    monthlyInboundMinutesPriceGel: bundle?.monthlyPriceGel ?? 0,
    outboundPricePerConnectedMinuteGel:
      VOICE_PRICING.billing.outboundPricePerConnectedMinuteGel,
    priceType: plan.contactOnly || bundle?.contactOnly ? 'from' : 'fixed',
  };
});

export const PRODUCT_MACHINE_PRICING = {
  model: 'monthly functional platform plan plus a separately selected inbound-minute bundle; outbound usage is billed separately',
  platformCurrency: VOICE_PRICING.platformCurrency,
  inboundBundleCurrency: VOICE_PRICING.inboundBundleCurrency,
  billingPeriod: VOICE_PRICING.cadence,
  inboundPricing: {
    pricePerConnectedMinuteGel:
      VOICE_PRICING.billing.inboundPricePerConnectedMinuteGel,
    referenceMinutes: VOICE_PRICING.billing.inboundReferenceMinutes,
    referencePriceGel: VOICE_PRICING.billing.inboundReferencePriceGel,
    billingMethod:
      'The customer selects a monthly inbound-minute bundle. The indicative reference is 5.40 GEL for 10 connected inbound minutes.',
  },
  outboundPricing: {
    pricePerConnectedMinuteGel:
      VOICE_PRICING.billing.outboundPricePerConnectedMinuteGel,
    temporary: VOICE_PRICING.billing.outboundRateTemporary,
    billingMethod:
      'Outbound usage is not included in inbound-minute bundles. It is currently billed at 1.40 GEL per connected conversation minute after the customer answers. aiNOW is working to reduce this rate.',
  },
  oneTimeSetup: {
    priceGel: VOICE_PRICING.billing.oneTimeSetupFeeGel,
    includes: 'phone number purchase and initial configuration',
    billingMethod:
      'Charged once when aiCALL is first installed; it is separate from the monthly platform plan and minute bundle.',
  },
  minutePool:
    'Published minute bundles cover connected inbound conversation time only. Outbound calls are billed separately.',
  selectionOrder: [
    'Choose the functional platform plan.',
    'Choose the inbound connected-minute bundle independently.',
    'Review the separate GEL platform price, GEL inbound-bundle price and one-time setup fee before submitting the request.',
    'If outbound calls are needed, add the temporary 1.40 GEL per connected-minute rate separately.',
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
    'Additional inbound minutes or a larger inbound package are activated only after customer approval. Outbound usage remains separate.',
  platformPlans: MACHINE_PLATFORM_PLANS,
  minuteBundles: MACHINE_MINUTE_BUNDLES,
  defaultConfigurations: MACHINE_DEFAULT_CONFIGURATIONS,
  plans: MACHINE_PLATFORM_PLANS,
  availabilityNote:
    'The matrix describes the commercial launch scope. Capabilities marked planned are not currently available and activate only after the required telephony integration is complete.',
  purchaseFlow:
    'Plans are selected through aiNOW contact and setup. The customer approves the functional plan and inbound-minute bundle separately. Outbound usage is quoted at the current connected-minute rate. There is no automatic self-service overage charge.',
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
