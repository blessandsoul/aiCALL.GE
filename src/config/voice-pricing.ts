export const VOICE_PLAN_IDS = [
  'starter',
  'business',
  'premium',
  'enterprise',
  'custom',
] as const;

/**
 * Public channel choices are request sizes, not a promise of technical
 * capacity. Final availability is confirmed during setup.
 */
export const VOICE_INBOUND_CHANNEL_OPTIONS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
] as const;

export type VoicePlanId = (typeof VOICE_PLAN_IDS)[number];
export type VoiceInboundChannelCount = (typeof VOICE_INBOUND_CHANNEL_OPTIONS)[number];

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
  includedInboundChannels: 1;
  icon: string;
  highlightIcon: string;
  limits: {
    operators: VoicePlanLimit;
    scenarios: VoicePlanLimit;
    phoneNumbers: VoicePlanLimit;
    inboundChannels: 1;
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

/**
 * Canonical public aiCALL pricing facts.
 *
 * A platform plan controls capabilities, scale and support. Every plan includes
 * one parallel inbound channel. Additional concurrent inbound channels are
 * selected separately at a flat monthly price. Inbound conversation minutes do
 * not carry a separate per-minute telecom charge. Outbound calls are billed
 * independently at the connected-minute rate. No automatic overage is charged.
 */
export const VOICE_PRICING = {
  platformCurrency: 'GEL',
  cadence: 'monthly',
  model: 'monthly-platform-plus-inbound-channels',
  billing: {
    oneTimeSetupFeeGel: 150,
    oneTimeSetupIncludes: 'phone-number-purchase-and-initial-configuration',
    includedInboundChannels: 1,
    additionalInboundChannelMonthlyPriceGel: 60,
    inboundMinutesIncluded: true,
    outboundPricePerConnectedMinuteGel: 1.5,
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
      includedInboundChannels: 1,
      icon: 'solar:battery-charge-bold-duotone',
      highlightIcon: 'solar:phone-bold-duotone',
      limits: {
        operators: 1,
        scenarios: 1,
        phoneNumbers: 1,
        inboundChannels: 1,
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
      includedInboundChannels: 1,
      icon: 'solar:star-bold',
      highlightIcon: 'solar:user-check-rounded-bold-duotone',
      limits: {
        operators: 1,
        scenarios: 3,
        phoneNumbers: 1,
        inboundChannels: 1,
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
      includedInboundChannels: 1,
      icon: 'solar:shield-check-bold-duotone',
      highlightIcon: 'solar:refresh-bold-duotone',
      limits: {
        operators: 3,
        scenarios: 10,
        phoneNumbers: 3,
        inboundChannels: 1,
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
      includedInboundChannels: 1,
      icon: 'solar:user-check-rounded-bold-duotone',
      highlightIcon: 'solar:shield-check-bold-duotone',
      limits: {
        operators: 10,
        scenarios: 25,
        phoneNumbers: 10,
        inboundChannels: 1,
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
      includedInboundChannels: 1,
      icon: 'solar:cpu-bold-duotone',
      highlightIcon: 'solar:server-bold-duotone',
      limits: {
        operators: 'custom',
        scenarios: 'custom',
        phoneNumbers: 'custom',
        inboundChannels: 1,
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
  inboundChannelOptions: VOICE_INBOUND_CHANNEL_OPTIONS,
  readyFeatures: VOICE_READY_FEATURE_IDS,
  upcomingFeatures: VOICE_UPCOMING_FEATURE_IDS,
} as const;

export function getVoicePlan(planId: VoicePlanId): VoicePricingPlan {
  return VOICE_PRICING.plans.find((plan) => plan.id === planId) as VoicePricingPlan;
}
