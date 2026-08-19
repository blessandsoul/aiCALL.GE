import type { PricingMode } from '../types';
import type {
  VoicePlanId,
  VoiceMinuteBundleId,
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
  defaultMinuteBundleId?: VoiceMinuteBundleId;
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

export interface PricingMinuteBundle {
  id: VoiceMinuteBundleId;
  name: string;
  description: string;
  minutes: number;
  price: PricingAmount;
  contactOnly: boolean;
  icon: string;
}

export interface PricingCallRates {
  inbound: {
    pricePerConnectedMinute: PricingAmount;
    referenceMinutes: number;
    referencePrice: PricingAmount;
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

export interface LegacyPricingPageCopy {
  includedLabel: string;
  excludedLabel: string;
  eligibilityLabel: string;
  driversLabel: string;
  allowanceLabel: string;
  overageLabel: string;
  setupLabel: string;
  minutesLabel: string;
  minuteUnit: string;
  recommendedLabel: string;
  cardModelLabel: string;
  cardOperatorsLabel: string;
  cardScenariosLabel: string;
  cardConcurrentCallsLabel: string;
  cardIntegrationsLabel: string;
  selectPlanLabel: string;
  selectedPlanLabel: string;
  minuteStepEyebrow: string;
  minuteStepTitle: string;
  minuteStepIntro: string;
  selectMinutesLabel: string;
  selectedMinutesLabel: string;
  connectedMinutesLabel: string;
  platformPriceLabel: string;
  minutesPriceLabel: string;
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
  includedStatusLabel: string;
  notIncludedStatusLabel: string;
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
  comparisonEyebrow: string;
  comparisonTitle: string;
  offerLabel: string;
  billingLabel: string;
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
  timeline: readonly PricingTimelineStep[];
  faq: readonly PricingFaqItem[];
}
