export const VOICE_PLAN_IDS = [
  'starter',
  'business',
  'premium',
  'enterprise',
  'custom',
] as const;

export const VOICE_MINUTE_BUNDLE_IDS = [
  'minutes100',
  'minutes500',
  'minutes2000',
  'minutes5000',
  'minutes10000',
] as const;

export type VoicePlanId = (typeof VOICE_PLAN_IDS)[number];
export type VoiceMinuteBundleId = (typeof VOICE_MINUTE_BUNDLE_IDS)[number];

export const VOICE_READY_FEATURE_IDS = [
  'inbound',
  'outbound',
  'languages',
  'businessContext',
  'interruption',
  'leadCapture',
  'recording',
  'transcriptHistory',
] as const;

export const VOICE_UPCOMING_FEATURE_IDS = [
  'batchCampaigns',
  'schedulingQueue',
  'automaticRetries',
  'voicemail',
  'humanHandoff',
  'calendarCrm',
  'multipleNumbers',
  'analytics',
] as const;

export type VoiceReadyFeatureId = (typeof VOICE_READY_FEATURE_IDS)[number];
export type VoiceUpcomingFeatureId = (typeof VOICE_UPCOMING_FEATURE_IDS)[number];
export type VoicePlanLimit = number | 'custom';
export type VoiceCapabilityStatus = 'included' | 'planned' | 'notIncluded';
export type VoiceSupportLevel =
  | 'onboarding'
  | 'launch'
  | 'ongoing'
  | 'priority'
  | 'custom';

export interface VoicePricingPlan {
  id: VoicePlanId;
  model: 'Nemo Lite' | 'Nemo Smart' | 'Nemo Pro' | 'Nemo Ultra' | 'custom';
  monthlyPlatformPriceGel: number;
  recommended: boolean;
  contactOnly: boolean;
  defaultMinuteBundleId: VoiceMinuteBundleId;
  icon: string;
  highlightIcon: string;
  limits: {
    operators: VoicePlanLimit;
    scenarios: VoicePlanLimit;
    phoneNumbers: VoicePlanLimit;
    concurrentCalls: VoicePlanLimit;
    integrations: VoicePlanLimit;
    historyDays: VoicePlanLimit;
  };
  capabilities: {
    knowledgeBase: VoiceCapabilityStatus;
    batchCampaigns: VoiceCapabilityStatus;
    schedulingRetries: VoiceCapabilityStatus;
    calendarCrm: VoiceCapabilityStatus;
    humanHandoff: VoiceCapabilityStatus;
    apiWebhooks: VoiceCapabilityStatus;
  };
  support: VoiceSupportLevel;
}

export interface VoiceMinuteBundle {
  id: VoiceMinuteBundleId;
  minutes: number;
  monthlyPriceGel: number;
  contactOnly: boolean;
  icon: string;
}

/**
 * Canonical public aiCALL pricing facts.
 *
 * A platform plan controls capabilities, scale and support. A minute bundle is
 * selected separately and controls only connected inbound conversation time.
 * Outbound calls are billed independently at the temporary connected-minute
 * rate. No automatic overage is charged.
 */
export const VOICE_PRICING = {
  platformCurrency: 'GEL',
  inboundBundleCurrency: 'GEL',
  currencyConversion: {
    usdToGel: 2.7,
    label: '1 USD = 2.70 GEL',
    basis: 'indicative public display rate; final price is confirmed before purchase',
  },
  cadence: 'monthly',
  model: 'platform-plus-inbound-minute-bundle',
  billing: {
    oneTimeSetupFeeGel: 150,
    oneTimeSetupIncludes: 'phone-number-purchase-and-initial-configuration',
    inboundPricePerConnectedMinuteGel: 0.54,
    inboundReferenceMinutes: 10,
    inboundReferencePriceGel: 5.4,
    outboundPricePerConnectedMinuteGel: 1.4,
    outboundRateTemporary: true,
    sharedInboundOutboundPool: false,
    additionalFlatFeePerCall: false,
    campaignFee: false,
    unexpectedPlatformFee: false,
    automaticOverage: false,
    extraUsageRequiresApproval: true,
  },
  plans: [
    {
      id: 'starter',
      model: 'Nemo Lite',
      monthlyPlatformPriceGel: 220,
      recommended: false,
      contactOnly: false,
      defaultMinuteBundleId: 'minutes100',
      icon: 'solar:battery-charge-bold-duotone',
      highlightIcon: 'solar:phone-bold-duotone',
      limits: {
        operators: 1,
        scenarios: 1,
        phoneNumbers: 1,
        concurrentCalls: 1,
        integrations: 0,
        historyDays: 30,
      },
      capabilities: {
        knowledgeBase: 'notIncluded',
        batchCampaigns: 'notIncluded',
        schedulingRetries: 'notIncluded',
        calendarCrm: 'notIncluded',
        humanHandoff: 'notIncluded',
        apiWebhooks: 'notIncluded',
      },
      support: 'onboarding',
    },
    {
      id: 'business',
      model: 'Nemo Smart',
      monthlyPlatformPriceGel: 450,
      recommended: false,
      contactOnly: false,
      defaultMinuteBundleId: 'minutes500',
      icon: 'solar:star-bold',
      highlightIcon: 'solar:user-check-rounded-bold-duotone',
      limits: {
        operators: 1,
        scenarios: 3,
        phoneNumbers: 1,
        concurrentCalls: 3,
        integrations: 1,
        historyDays: 90,
      },
      capabilities: {
        knowledgeBase: 'planned',
        batchCampaigns: 'planned',
        schedulingRetries: 'notIncluded',
        calendarCrm: 'planned',
        humanHandoff: 'notIncluded',
        apiWebhooks: 'notIncluded',
      },
      support: 'launch',
    },
    {
      id: 'premium',
      model: 'Nemo Pro',
      monthlyPlatformPriceGel: 900,
      recommended: true,
      contactOnly: false,
      defaultMinuteBundleId: 'minutes2000',
      icon: 'solar:shield-check-bold-duotone',
      highlightIcon: 'solar:refresh-bold-duotone',
      limits: {
        operators: 3,
        scenarios: 10,
        phoneNumbers: 3,
        concurrentCalls: 10,
        integrations: 3,
        historyDays: 365,
      },
      capabilities: {
        knowledgeBase: 'planned',
        batchCampaigns: 'planned',
        schedulingRetries: 'planned',
        calendarCrm: 'planned',
        humanHandoff: 'planned',
        apiWebhooks: 'planned',
      },
      support: 'ongoing',
    },
    {
      id: 'enterprise',
      model: 'Nemo Ultra',
      monthlyPlatformPriceGel: 2_500,
      recommended: false,
      contactOnly: false,
      defaultMinuteBundleId: 'minutes5000',
      icon: 'solar:user-check-rounded-bold-duotone',
      highlightIcon: 'solar:shield-check-bold-duotone',
      limits: {
        operators: 10,
        scenarios: 25,
        phoneNumbers: 10,
        concurrentCalls: 25,
        integrations: 10,
        historyDays: 'custom',
      },
      capabilities: {
        knowledgeBase: 'planned',
        batchCampaigns: 'planned',
        schedulingRetries: 'planned',
        calendarCrm: 'planned',
        humanHandoff: 'planned',
        apiWebhooks: 'planned',
      },
      support: 'priority',
    },
    {
      id: 'custom',
      model: 'custom',
      monthlyPlatformPriceGel: 5_000,
      recommended: false,
      contactOnly: true,
      defaultMinuteBundleId: 'minutes10000',
      icon: 'solar:cpu-bold-duotone',
      highlightIcon: 'solar:server-bold-duotone',
      limits: {
        operators: 'custom',
        scenarios: 'custom',
        phoneNumbers: 'custom',
        concurrentCalls: 'custom',
        integrations: 'custom',
        historyDays: 'custom',
      },
      capabilities: {
        knowledgeBase: 'planned',
        batchCampaigns: 'planned',
        schedulingRetries: 'planned',
        calendarCrm: 'planned',
        humanHandoff: 'planned',
        apiWebhooks: 'planned',
      },
      support: 'custom',
    },
  ] as const satisfies readonly VoicePricingPlan[],
  minuteBundles: [
    {
      id: 'minutes100',
      minutes: 100,
      monthlyPriceGel: 54,
      contactOnly: false,
      icon: 'solar:clock-circle-bold-duotone',
    },
    {
      id: 'minutes500',
      minutes: 500,
      monthlyPriceGel: 270,
      contactOnly: false,
      icon: 'solar:clock-square-bold-duotone',
    },
    {
      id: 'minutes2000',
      minutes: 2_000,
      monthlyPriceGel: 1_080,
      contactOnly: false,
      icon: 'solar:stopwatch-bold-duotone',
    },
    {
      id: 'minutes5000',
      minutes: 5_000,
      monthlyPriceGel: 2_700,
      contactOnly: false,
      icon: 'solar:history-bold-duotone',
    },
    {
      id: 'minutes10000',
      minutes: 10_000,
      monthlyPriceGel: 5_400,
      contactOnly: false,
      icon: 'solar:infinity-bold-duotone',
    },
  ] as const satisfies readonly VoiceMinuteBundle[],
  readyFeatures: VOICE_READY_FEATURE_IDS,
  upcomingFeatures: VOICE_UPCOMING_FEATURE_IDS,
} as const;

export function getVoicePlan(planId: VoicePlanId): VoicePricingPlan {
  return VOICE_PRICING.plans.find((plan) => plan.id === planId) as VoicePricingPlan;
}

export function getVoiceMinuteBundle(
  bundleId: VoiceMinuteBundleId,
): VoiceMinuteBundle {
  return VOICE_PRICING.minuteBundles.find(
    (bundle) => bundle.id === bundleId,
  ) as VoiceMinuteBundle;
}
