import 'server-only';

import { getTranslations } from 'next-intl/server';

import { SITE } from '@/config/site';
import { PRODUCT_PAGES } from '@/config/product-pages';
import {
  VOICE_PRICING,
  type VoiceCapabilityStatus,
  type VoicePlanId,
} from '@/config/voice-pricing';
import { CONTACT_EMAIL } from '@/lib/constants/app.constants';

import type {
  IntegrationCategory,
  IntegrationConnection,
  IntegrationDataFlow,
  ProductPageLocale,
  PricingMode,
} from './types';
import type {
  IntegrationsPageCopy,
  IntegrationRecord,
} from './integrations/IntegrationsPage';
import type {
  PricingFaqItem,
  PricingMinuteBundle,
  PricingOffer,
  PricingPageCopy,
  PricingPageData,
} from './pricing/types';
import type {
  SecurityControl,
  SecurityFlowStage,
  SecurityPageCopy,
} from './security/SecurityPage';
import type { LegalDocumentSection } from './components/LegalDocument';

export const PRODUCT_NAME = `${SITE.wordmark.prefix}${SITE.wordmark.mark}`;

function productName(): string {
  return PRODUCT_NAME;
}

function configuredPricingMode(): PricingMode {
  return PRODUCT_PAGES.pricing.mode;
}

export async function getPricingContent(locale: ProductPageLocale): Promise<{
  copy: PricingPageCopy;
  data: PricingPageData;
}> {
  const t = await getTranslations({ locale, namespace: 'productPages.pricing' });
  const product = productName();
  const pricingMode = configuredPricingMode();
  const actionHref = '/contact';
  if (pricingMode !== 'project') {
    throw new Error(
      `${product} uses pricing mode "${pricingMode}" but the aiCALL adapter expects project mode.`,
    );
  }

  const offers: PricingOffer[] = VOICE_PRICING.plans.map((plan) => ({
    id: plan.id,
    planId: plan.id,
    name: t(`plans.${plan.id}.name`),
    summary: t(`plans.${plan.id}.summary`),
    billingLabel: t(`plans.${plan.id}.billing`),
    recommended: plan.recommended,
    contactOnly: plan.contactOnly,
    icon: plan.icon,
    highlightIcon: plan.highlightIcon,
    highlightLabel: t(`plans.${plan.id}.highlightLabel`),
    highlightValue: t(`plans.${plan.id}.highlightValue`),
    highlightCaption: t(`plans.${plan.id}.highlightCaption`),
    defaultMinuteBundleId: plan.defaultMinuteBundleId,
    mode: 'project',
    price: {
      amount: plan.monthlyPlatformPriceGel,
      currency: 'GEL',
      cadence: 'monthly',
      unit: t('plans.month'),
    },
    included: [
      t(`plans.${plan.id}.included1`),
      t(`plans.${plan.id}.included2`),
      t(`plans.${plan.id}.included3`),
    ],
    excluded: [t(`plans.${plan.id}.excluded1`)],
    estimateDrivers: [
      t('offer.driver1'),
      t('offer.driver2'),
      t('offer.driver3'),
    ],
    actionLabel: plan.contactOnly ? t('offer.contactAction') : t('offer.action'),
    actionHref,
  }));

  const minuteBundles: PricingMinuteBundle[] = VOICE_PRICING.minuteBundles.map(
    (bundle) => ({
      id: bundle.id,
      name: t(`minutes.bundles.${bundle.id}.name`),
      description: t(`minutes.bundles.${bundle.id}.description`),
      minutes: bundle.minutes,
      price: {
        amount: bundle.monthlyPriceGel,
        currency: 'GEL',
        cadence: 'monthly',
        unit: t('plans.month'),
      },
      contactOnly: bundle.contactOnly,
      icon: bundle.icon,
    }),
  );

  const valuesByPlan = (
    value: (planId: VoicePlanId, index: number) => boolean | string,
  ): Readonly<Record<VoicePlanId, boolean | string>> => Object.fromEntries(
    VOICE_PRICING.plans.map((plan, index) => [plan.id, value(plan.id, index)]),
  ) as Record<VoicePlanId, boolean | string>;

  const capabilityValues = (
    capability: keyof (typeof VOICE_PRICING.plans)[number]['capabilities'],
  ): Readonly<Record<VoicePlanId, boolean | string>> => valuesByPlan(
    (planId) => {
      const plan = VOICE_PRICING.plans.find((item) => item.id === planId);
      const status = (
        plan?.capabilities[capability] ?? 'notIncluded'
      ) as VoiceCapabilityStatus;
      if (status === 'included') return true;
      if (status === 'planned') return t('comparison.plannedValue');
      return false;
    },
  );

  const comparisonRows = [
    {
      id: 'model',
      label: t('comparison.rows.model.label'),
      info: t('comparison.rows.model.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.model`)),
    },
    {
      id: 'operators',
      label: t('comparison.rows.operators.label'),
      info: t('comparison.rows.operators.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.operators`)),
    },
    {
      id: 'scenarios',
      label: t('comparison.rows.scenarios.label'),
      info: t('comparison.rows.scenarios.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.scenarios`)),
    },
    {
      id: 'phone-numbers',
      label: t('comparison.rows.phoneNumbers.label'),
      info: t('comparison.rows.phoneNumbers.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.phoneNumbers`)),
    },
    {
      id: 'integrations',
      label: t('comparison.rows.integrations.label'),
      info: t('comparison.rows.integrations.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.integrations`)),
    },
    {
      id: 'support',
      label: t('comparison.rows.support.label'),
      info: t('comparison.rows.support.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.support`)),
    },
    {
      id: 'inbound',
      label: t('comparison.rows.inbound.label'),
      info: t('comparison.rows.inbound.info'),
      values: valuesByPlan(() => true),
    },
    {
      id: 'outbound',
      label: t('comparison.rows.outbound.label'),
      info: t('comparison.rows.outbound.info'),
      values: valuesByPlan(() => true),
    },
    {
      id: 'languages',
      label: t('comparison.rows.languages.label'),
      info: t('comparison.rows.languages.info'),
      values: valuesByPlan(() => t('comparison.values.languages')),
    },
    {
      id: 'business-context',
      label: t('comparison.rows.businessContext.label'),
      info: t('comparison.rows.businessContext.info'),
      values: valuesByPlan(() => true),
    },
    {
      id: 'interruption',
      label: t('comparison.rows.interruption.label'),
      info: t('comparison.rows.interruption.info'),
      values: valuesByPlan(() => true),
    },
    {
      id: 'lead-capture',
      label: t('comparison.rows.leadCapture.label'),
      info: t('comparison.rows.leadCapture.info'),
      values: valuesByPlan(() => true),
    },
    {
      id: 'recording',
      label: t('comparison.rows.recording.label'),
      info: t('comparison.rows.recording.info'),
      values: valuesByPlan(() => true),
    },
    {
      id: 'transcript-history',
      label: t('comparison.rows.transcriptHistory.label'),
      info: t('comparison.rows.transcriptHistory.info'),
      values: valuesByPlan(() => true),
    },
    {
      id: 'knowledge-base',
      label: t('comparison.rows.knowledgeBase.label'),
      info: t('comparison.rows.knowledgeBase.info'),
      values: capabilityValues('knowledgeBase'),
    },
    {
      id: 'concurrent-calls',
      label: t('comparison.rows.concurrentCalls.label'),
      info: t('comparison.rows.concurrentCalls.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.concurrentCalls`)),
    },
    {
      id: 'history',
      label: t('comparison.rows.history.label'),
      info: t('comparison.rows.history.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.history`)),
    },
    {
      id: 'batch-campaigns',
      label: t('comparison.rows.batchCampaigns.label'),
      info: t('comparison.rows.batchCampaigns.info'),
      values: capabilityValues('batchCampaigns'),
    },
    {
      id: 'scheduling-retries',
      label: t('comparison.rows.schedulingRetries.label'),
      info: t('comparison.rows.schedulingRetries.info'),
      values: capabilityValues('schedulingRetries'),
    },
    {
      id: 'calendar-crm',
      label: t('comparison.rows.calendarCrm.label'),
      info: t('comparison.rows.calendarCrm.info'),
      values: capabilityValues('calendarCrm'),
    },
    {
      id: 'human-handoff',
      label: t('comparison.rows.humanHandoff.label'),
      info: t('comparison.rows.humanHandoff.info'),
      values: capabilityValues('humanHandoff'),
    },
    {
      id: 'analytics',
      label: t('comparison.rows.analytics.label'),
      info: t('comparison.rows.analytics.info'),
      values: valuesByPlan((planId) => t(`plans.${planId}.analytics`)),
    },
    {
      id: 'api-webhooks',
      label: t('comparison.rows.apiWebhooks.label'),
      info: t('comparison.rows.apiWebhooks.info'),
      values: capabilityValues('apiWebhooks'),
    },
    {
      id: 'automatic-overage',
      label: t('comparison.rows.overage.label'),
      info: t('comparison.rows.overage.info'),
      values: valuesByPlan(() => false),
    },
  ] as const;

  const roadmapIcons = {
    batchCampaigns: 'solar:document-bold-duotone',
    schedulingQueue: 'solar:calendar-bold-duotone',
    automaticRetries: 'solar:refresh-bold-duotone',
    voicemail: 'solar:record-circle-bold-duotone',
    humanHandoff: 'solar:users-group-rounded-bold-duotone',
    calendarCrm: 'solar:database-bold-duotone',
    multipleNumbers: 'solar:phone-calling-rounded-bold-duotone',
    analytics: 'solar:chart-2-bold-duotone',
  } as const;

  const roadmap = VOICE_PRICING.upcomingFeatures.map((id) => ({
    id,
    title: t(`roadmap.items.${id}.title`),
    description: t(`roadmap.items.${id}.description`),
    icon: roadmapIcons[id],
  }));

  const faq: PricingFaqItem[] = Array.from({ length: 5 }, (_, index) => ({
    question: t(`faq.q${index + 1}`, { product }),
    answer: t(`faq.a${index + 1}`, { product }),
  }));

  return {
    copy: {
      breadcrumb: t('breadcrumb'),
      eyebrow: t('eyebrow'),
      title: t('title', { product }),
      lead: t('lead', { product }),
      offersEyebrow: t('offers.eyebrow'),
      offersTitle: t('offers.title'),
      offersIntro: t('offers.intro'),
      includedLabel: t('labels.included'),
      excludedLabel: t('labels.excluded'),
      eligibilityLabel: t('labels.eligibility'),
      driversLabel: t('labels.drivers'),
      allowanceLabel: t('labels.allowance'),
      overageLabel: t('labels.overage'),
      setupLabel: t('labels.setup'),
      minutesLabel: t('labels.minutes'),
      minuteUnit: t('labels.minuteUnit'),
      packageLabel: t('labels.package'),
      readyNowLabel: t('labels.readyNow'),
      recommendedLabel: t('labels.recommended'),
      customLabel: t('labels.custom'),
      backToStarterLabel: t('labels.backToStarter'),
      previousLabel: t('labels.previous'),
      nextLabel: t('labels.next'),
      swipeHint: t('labels.swipeHint'),
      cardMinutesLabel: t('labels.cardMinutes'),
      cardInboundLabel: t('labels.cardInbound'),
      cardOutboundLabel: t('labels.cardOutbound'),
      cardLanguagesLabel: t('labels.cardLanguages'),
      cardRecordingLabel: t('labels.cardRecording'),
      cardOperatorsLabel: t('labels.cardOperators'),
      cardScenariosLabel: t('labels.cardScenarios'),
      cardPhoneNumbersLabel: t('labels.cardPhoneNumbers'),
      cardIntegrationsLabel: t('labels.cardIntegrations'),
      cardSupportLabel: t('labels.cardSupport'),
      cardModelLabel: t('labels.cardModel'),
      cardConcurrentCallsLabel: t('labels.cardConcurrentCalls'),
      selectPlanLabel: t('labels.selectPlan'),
      selectedPlanLabel: t('labels.selectedPlan'),
      minuteStepEyebrow: t('minutes.eyebrow'),
      minuteStepTitle: t('minutes.title'),
      minuteStepIntro: t('minutes.intro'),
      selectMinutesLabel: t('minutes.select'),
      selectedMinutesLabel: t('minutes.selected'),
      connectedMinutesLabel: t('minutes.connected'),
      platformPriceLabel: t('minutes.summary.platform'),
      minutesPriceLabel: t('minutes.summary.minutes'),
      totalPriceLabel: t('minutes.summary.total'),
      totalPerMonthLabel: t('minutes.summary.perMonth'),
      configurationLabel: t('minutes.summary.configuration'),
      noAutomaticChargeLabel: t('minutes.summary.noAutomaticCharge'),
      configureActionLabel: t('minutes.summary.action'),
      customPricePrefix: t('minutes.summary.from'),
      inboundRateTitle: t('minutes.rates.inboundTitle'),
      inboundRateUnit: t('minutes.rates.inboundUnit'),
      inboundRateExample: t('minutes.rates.inboundExample'),
      inboundRateNote: t('minutes.rates.inboundNote'),
      outboundRateTitle: t('minutes.rates.outboundTitle'),
      outboundRateUnit: t('minutes.rates.outboundUnit'),
      outboundRateStatus: t('minutes.rates.outboundStatus'),
      outboundRateNote: t('minutes.rates.outboundNote'),
      pricingUpdateNote: t('minutes.rates.pricingUpdateNote'),
      setupFeeLabel: t('minutes.summary.setupFee'),
      setupFeeNote: t('minutes.summary.setupFeeNote'),
      customValueLabel: t('labels.customValue'),
      plannedStatusLabel: t('comparison.plannedValue'),
      notIncludedStatusLabel: t('comparison.notIncluded'),
      comparisonEyebrow: t('comparison.eyebrow'),
      comparisonTitle: t('comparison.title'),
      comparisonIntro: t('comparison.intro'),
      offerLabel: t('comparison.offer'),
      billingLabel: t('comparison.billing'),
      includedStatusLabel: t('comparison.included'),
      soonStatusLabel: t('comparison.soon'),
      roadmapEyebrow: t('roadmap.eyebrow'),
      roadmapTitle: t('roadmap.title'),
      roadmapIntro: t('roadmap.intro'),
      timelineEyebrow: t('timeline.eyebrow'),
      timelineTitle: t('timeline.title'),
      faqEyebrow: t('faq.eyebrow'),
      faqTitle: t('faq.title'),
      ctaEyebrow: t('cta.eyebrow'),
      ctaTitle: t('cta.title', { product }),
      ctaDescription: t('cta.description'),
      ctaLabel: t('cta.label'),
    },
    data: {
      mode: pricingMode,
      context: [
        { label: t('context.model'), value: t(`context.${pricingMode}`) },
        { label: t('context.price'), value: t('context.priceValue') },
        { label: t('context.start'), value: t('context.startValue') },
        { label: t('context.support'), value: t('context.supportValue') },
      ],
      offers,
      minuteBundles,
      setupPrice: {
        amount: VOICE_PRICING.billing.oneTimeSetupFeeGel,
        currency: 'GEL',
        cadence: 'oneTime',
      },
      callRates: {
        inbound: {
          pricePerConnectedMinute: {
            amount: VOICE_PRICING.billing.inboundPricePerConnectedMinuteGel,
            currency: 'GEL',
            cadence: 'usage',
          },
          referenceMinutes: VOICE_PRICING.billing.inboundReferenceMinutes,
          referencePrice: {
            amount: VOICE_PRICING.billing.inboundReferencePriceGel,
            currency: 'GEL',
            cadence: 'usage',
          },
        },
        outbound: {
          pricePerConnectedMinute: {
            amount: VOICE_PRICING.billing.outboundPricePerConnectedMinuteGel,
            currency: 'GEL',
            cadence: 'usage',
          },
          temporary: VOICE_PRICING.billing.outboundRateTemporary,
        },
      },
      comparisonRows,
      roadmap,
      readyFeatureIds: VOICE_PRICING.readyFeatures,
      timeline: Array.from({ length: 4 }, (_, index) => ({
        title: t(`timeline.s${index + 1}Title`),
        description: t(`timeline.s${index + 1}Description`),
        timing: t(`timeline.s${index + 1}Timing`),
      })),
      faq,
    },
  };
}

const CATEGORY_KEYS: Readonly<Record<IntegrationCategory, string>> = {
  communication: 'communication',
  businessSystems: 'businessSystems',
  contentAndAdvertising: 'contentAndAdvertising',
  development: 'development',
  operations: 'operations',
};

const CONNECTION_KEYS: Readonly<Record<IntegrationConnection, string>> = {
  direct: 'direct',
  api: 'api',
  file: 'file',
  custom: 'custom',
  planned: 'planned',
};

const FLOW_KEYS: Readonly<Record<IntegrationDataFlow, string>> = {
  calls: 'calls',
  callResults: 'callResults',
  appointments: 'appointments',
  customerRecords: 'customerRecords',
  paymentEvents: 'paymentEvents',
  messages: 'messages',
  websiteEvents: 'websiteEvents',
  analyticsMetrics: 'analyticsMetrics',
  domainSettings: 'domainSettings',
  forms: 'forms',
  taskRecords: 'taskRecords',
  documents: 'documents',
  accountingDrafts: 'accountingDrafts',
  applicationRelease: 'applicationRelease',
  notifications: 'notifications',
  sourceReview: 'sourceReview',
  campaignSignals: 'campaignSignals',
  contentPublishing: 'contentPublishing',
  fleetCommands: 'fleetCommands',
  routingData: 'routingData',
  depotSchedule: 'depotSchedule',
  telemetry: 'telemetry',
};

export async function getIntegrationsContent(locale: ProductPageLocale): Promise<{
  copy: IntegrationsPageCopy;
  integrations: readonly IntegrationRecord[];
}> {
  const t = await getTranslations({ locale, namespace: 'productPages.integrations' });
  const product = productName();

  return {
    copy: {
      breadcrumb: t('breadcrumb'),
      eyebrow: t('eyebrow'),
      title: t('title', { product }),
      lead: t('lead', { product }),
      ledgerEyebrow: t('ledger.eyebrow'),
      ledgerTitle: t('ledger.title'),
      ledgerIntro: t('ledger.intro'),
      platformLabel: t('labels.platform'),
      categoryLabel: t('labels.categories'),
      connectionLabel: t('labels.connection'),
      statusLabel: t('labels.status'),
      dataLabel: t('labels.data'),
      status: {
        available: t('status.available'),
        customSetup: t('status.customSetup'),
        planned: t('status.planned'),
      },
      ctaEyebrow: t('cta.eyebrow'),
      ctaTitle: t('cta.title'),
      ctaDescription: t('cta.description'),
      ctaLabel: t('cta.label'),
    },
    integrations: PRODUCT_PAGES.integrations.records.map((record) => {
      const platformKey = `platforms.${record.id}`;
      const platform = t.has(platformKey) ? t(platformKey) : record.name;
      return {
        id: record.id,
        name: platform,
        icon: record.icon,
        category: t(`categories.${CATEGORY_KEYS[record.category]}`),
        connectionType: t(`connections.${CONNECTION_KEYS[record.connection]}`),
        status: record.status,
        dataFlow: t(`flows.${FLOW_KEYS[record.dataFlow]}`, { platform }),
      };
    }),
  };
}

export async function getSecurityContent(locale: ProductPageLocale): Promise<{
  copy: SecurityPageCopy;
  flow: readonly SecurityFlowStage[];
  controls: readonly SecurityControl[];
  limitations: readonly string[];
  incidentContact: string;
}> {
  const t = await getTranslations({ locale, namespace: 'productPages.security' });
  const product = productName();

  const flow: SecurityFlowStage[] = [
    {
      title: t('flow.s1Title'),
      description: t('flow.s1Description'),
      icon: 'solar:inbox-bold-duotone',
    },
    {
      title: t('flow.s2Title'),
      description: t('flow.s2Description'),
      icon: 'solar:shield-check-bold-duotone',
    },
    {
      title: t('flow.s3Title'),
      description: t('flow.s3Description'),
      icon: 'solar:user-circle-bold-duotone',
    },
    {
      title: t('flow.s4Title'),
      description: t('flow.s4Description'),
      icon: 'solar:checklist-minimalistic-bold-duotone',
    },
  ];

  const controlKeys = [
    'sourceAccess',
    'actions',
    'approval',
    'retention',
    'deletion',
    'escalation',
  ] as const;

  const controls: SecurityControl[] = controlKeys.map((key) => ({
    key,
    title: t(`controls.${key}.title`),
    description: t(`controls.${key}.description`, { product }),
    owner: t(`controls.${key}.owner`),
    evidence: t(`controls.${key}.evidence`),
  }));

  return {
    copy: {
      breadcrumb: t('breadcrumb'),
      eyebrow: t('eyebrow'),
      title: t('title', { product }),
      lead: t('lead', { product }),
      flowEyebrow: t('flow.eyebrow'),
      flowTitle: t('flow.title'),
      flowIntro: t('flow.intro'),
      controlsEyebrow: t('controls.eyebrow'),
      controlsTitle: t('controls.title'),
      controlsIntro: t('controls.intro'),
      controlLabel: t('labels.control'),
      ownerLabel: t('labels.owner'),
      evidenceLabel: t('labels.evidence'),
      limitationEyebrow: t('limitations.eyebrow'),
      limitationTitle: t('limitations.title'),
      incidentLabel: t('labels.incident'),
      ctaEyebrow: t('cta.eyebrow'),
      ctaTitle: t('cta.title'),
      ctaDescription: t('cta.description'),
      ctaLabel: t('cta.label'),
    },
    flow,
    controls,
    limitations: [
      t('limitations.item1'),
      t('limitations.item2'),
      t('limitations.item3'),
    ],
    incidentContact: CONTACT_EMAIL.toLowerCase(),
  };
}

export type ProductLegalKind = 'privacy' | 'terms';

const LEGAL_SECTION_KEYS = {
  privacy: [
    'controller',
    'publicSite',
    'purpose',
    'project',
    'sharing',
    'retention',
    'rights',
    'changes',
  ],
  terms: [
    'operator',
    'website',
    'inquiry',
    'scope',
    'demo',
    'thirdParty',
    'property',
    'liability',
    'changes',
  ],
} as const;

const INFRASTRUCTURE_NOTICE: Record<ProductPageLocale, LegalDocumentSection> = {
  ka: { id: 'privacy-infrastructure', title: 'ინფრასტრუქტურა და მონაცემთა დამუშავება', body: 'სერვისის ძირითადი ჰოსტინგი მდებარეობს EU/EEA-ში. კონკრეტული ფუნქციისთვის მონაცემების შეზღუდული ნაწილი შეიძლება დამუშავდეს დამტკიცებული გარე დამმუშავებლის მიერ. დამუშავების კატეგორიები და შესაბამისი პირობები აღწერილია ამ პოლიტიკასა და, საჭიროების შემთხვევაში, ხელშეკრულებაში.' },
  en: { id: 'privacy-infrastructure', title: 'Infrastructure and data processing', body: 'Primary service hosting is located in the EU/EEA. A limited part of data may be processed by an approved external processor where a specific function requires it. Processing categories and applicable conditions are described in this policy and, where relevant, in the agreement.' },
  ru: { id: 'privacy-infrastructure', title: 'Инфраструктура и обработка данных', body: 'Основной хостинг сервиса расположен в EU/EEA. Ограниченная часть данных может обрабатываться утверждённым внешним обработчиком, если это требуется для конкретной функции. Категории обработки и применимые условия описаны в этой политике и, при необходимости, в договоре.' },
};

export async function getLegalContent(
  locale: ProductPageLocale,
  kind: ProductLegalKind,
): Promise<{
  breadcrumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  operatorLabel: string;
  domainLabel: string;
  effectiveLabel: string;
  updatedLabel: string;
  contentsLabel: string;
  effectiveDate: string;
  updatedDate: string;
  sections: readonly LegalDocumentSection[];
}> {
  const t = await getTranslations({
    locale,
    namespace: kind === 'privacy' ? 'productPages.privacy' : 'productPages.terms',
  });

  return {
    breadcrumb: t('breadcrumb'),
    eyebrow: t('eyebrow'),
    title: t('title'),
    lead: t('lead', { product: productName(), domain: SITE.domain }),
    operatorLabel: t('operatorLabel'),
    domainLabel: t('domainLabel'),
    effectiveLabel: t('effectiveLabel'),
    updatedLabel: t('updatedLabel'),
    contentsLabel: t('contentsLabel'),
    effectiveDate: t('effectiveDate'),
    updatedDate: t('updatedDate'),
    sections: [
      ...(kind === 'privacy' ? [INFRASTRUCTURE_NOTICE[locale]] : []),
      ...LEGAL_SECTION_KEYS[kind].map((key) => ({
      id: `${kind}-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      title: t(`sections.${key}Title`),
      body: t(`sections.${key}Body`),
      })),
    ],
  };
}
