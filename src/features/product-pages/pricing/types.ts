import type { PricingMode } from '../types';
import type {
  VoicePlanId,
  VoiceInboundChannelCount,
  VoiceReadyFeatureId,
  VoiceUpcomingFeatureId,
} from '@/config/voice-pricing';

export interface PricingAmount {
  amount: number;
  currency: 'GEL' | 'USD' | 'EUR';
  cadence?: 'oneTime' | 'monthly' | 'annual' | 'usage';
  unit?: string;
}

interface PricingOfferBase {
  id: string;
  planId?: VoicePlanId;
  name: string;
  summary: string;
  billingLabel: string;
  recommended?: boolean;
  contactOnly?: boolean;
  icon?: string;
  highlightIcon?: string;
  highlightLabel?: string;
  highlightValue?: string;
  highlightCaption?: string;
  includedInboundChannels: 1;
  included: readonly string[];
  excluded: readonly string[];
  actionLabel: string;
  actionHref?: string;
}

export type PricingOffer =
  | (PricingOfferBase & {
      mode: 'pilot';
      price?: never;
      eligibility: readonly string[];
    })
  | (PricingOfferBase & {
      mode: 'project';
      price?: PricingAmount;
      estimateDrivers: readonly string[];
    })
  | (PricingOfferBase & {
      mode: 'fixed' | 'retainer' | 'usage' | 'hybrid' | 'liveSubscription';
      price: PricingAmount;
      allowance?: string;
      overageRule?: string;
      setupPrice?: PricingAmount;
    });

export interface PricingContextFact {
  label: string;
  value: string;
}

export interface PricingTimelineStep {
  title: string;
  description: string;
  timing: string;
}

export interface PricingFaqItem {
  question: string;
  answer: string;
}

export interface PricingComparisonRow {
  id: string;
  label: string;
  info: string;
  values: Readonly<Record<VoicePlanId, boolean | string>>;
}

export interface PricingInboundChannelOption {
  channels: VoiceInboundChannelCount;
  additionalMonthlyPrice: PricingAmount;
}

export interface PricingCallRates {
  inbound: {
    includedChannels: 1;
    additionalChannelPrice: PricingAmount;
  };
  outbound: {
    pricePerConnectedMinute: PricingAmount;
    temporary: boolean;
  };
}

export interface PricingRoadmapItem {
  id: VoiceUpcomingFeatureId;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPageCopy {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  offersEyebrow: string;
  offersTitle: string;
  offersIntro: string;
  includedLabel: string;
  excludedLabel: string;
  eligibilityLabel: string;
  driversLabel: string;
  allowanceLabel: string;
  overageLabel: string;
  setupLabel: string;
  packageLabel: string;
  readyNowLabel: string;
  recommendedLabel: string;
  customLabel: string;
  backToStarterLabel: string;
  previousLabel: string;
  nextLabel: string;
  swipeHint: string;
  cardInboundLabel: string;
  cardOutboundLabel: string;
  cardLanguagesLabel: string;
  cardRecordingLabel: string;
  cardOperatorsLabel: string;
  cardScenariosLabel: string;
  cardPhoneNumbersLabel: string;
  cardIntegrationsLabel: string;
  cardSupportLabel: string;
  cardModelLabel: string;
  cardInboundChannelsLabel: string;
  selectPlanLabel: string;
  selectedPlanLabel: string;
  channelStepEyebrow: string;
  channelStepTitle: string;
  channelStepIntro: string;
  selectChannelsLabel: string;
  selectedChannelsLabel: string;
  inboundChannelUnit: string;
  inboundIncludedLabel: string;
  additionalChannelLabel: string;
  platformPriceLabel: string;
  channelsPriceLabel: string;
  totalPriceLabel: string;
  totalPerMonthLabel: string;
  configurationLabel: string;
  noAutomaticChargeLabel: string;
  configureActionLabel: string;
  customPricePrefix: string;
  inboundRateTitle: string;
  inboundRateUnit: string;
  inboundRateExample: string;
  inboundRateNote: string;
  outboundRateTitle: string;
  outboundRateUnit: string;
  outboundRateStatus: string;
  outboundRateNote: string;
  pricingUpdateNote: string;
  setupFeeLabel: string;
  setupFeeNote: string;
  customValueLabel: string;
  plannedStatusLabel: string;
  notIncludedStatusLabel: string;
  comparisonEyebrow: string;
  comparisonTitle: string;
  comparisonIntro: string;
  offerLabel: string;
  billingLabel: string;
  includedStatusLabel: string;
  soonStatusLabel: string;
  roadmapEyebrow: string;
  roadmapTitle: string;
  roadmapIntro: string;
  timelineEyebrow: string;
  timelineTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
}

export interface PricingPageData {
  mode: PricingMode;
  context: readonly PricingContextFact[];
  offers: readonly PricingOffer[];
  inboundChannelOptions: readonly PricingInboundChannelOption[];
  setupPrice: PricingAmount;
  callRates: PricingCallRates;
  comparisonRows: readonly PricingComparisonRow[];
  roadmap: readonly PricingRoadmapItem[];
  readyFeatureIds: readonly VoiceReadyFeatureId[];
  timeline: readonly PricingTimelineStep[];
  faq: readonly PricingFaqItem[];
}
