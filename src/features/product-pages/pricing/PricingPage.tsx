import { Ico } from '@/components/common/Ico';

import { InlineLeadCta } from '../components/InlineLeadCta';
import { ProductPageShell } from '../components/ProductPageShell';
import { PricingComparison } from './PricingComparison';
import { PricingConfigurator } from './PricingConfigurator';
import { PricingInfo } from './PricingInfo';
import type { PricingPageCopy, PricingPageData } from './types';

import './pricing.css';

export function assertPricingPageData(data: PricingPageData): void {
  if (data.offers.length === 0) {
    throw new Error('A public pricing page requires at least one offer.');
  }
  if (data.minuteBundles.length === 0) {
    throw new Error('A public aiCALL pricing page requires a minute bundle.');
  }

  for (const offer of data.offers) {
    if (offer.mode !== data.mode) {
      throw new Error(`Offer "${offer.id}" does not match pricing mode "${data.mode}".`);
    }
    if (data.mode === 'pilot' && 'price' in offer && offer.price !== undefined) {
      throw new Error('Pilot offers cannot publish a price.');
    }
    if (offer.included.length === 0) {
      throw new Error(`Offer "${offer.id}" needs at least one included outcome.`);
    }
  }
}

interface PricingPageProps {
  copy: PricingPageCopy;
  data: PricingPageData;
}

const PILL_ICONS = {
  inbound: 'solar:incoming-call-rounded-bold-duotone',
  outbound: 'solar:phone-calling-rounded-bold-duotone',
  languages: 'solar:global-bold-duotone',
  recording: 'solar:record-circle-bold-duotone',
  'transcript-history': 'solar:document-text-bold-duotone',
} as const;

const CAPABILITY_ICONS = [
  'solar:incoming-call-rounded-bold-duotone',
  'solar:phone-calling-rounded-bold-duotone',
  'solar:global-bold-duotone',
  'solar:book-2-bold-duotone',
  'solar:microphone-3-bold-duotone',
  'solar:user-check-rounded-bold-duotone',
  'solar:record-circle-bold-duotone',
  'solar:document-text-bold-duotone',
] as const;

const READY_ROW_BY_FEATURE = {
  inbound: 'inbound',
  outbound: 'outbound',
  languages: 'languages',
  businessContext: 'business-context',
  interruption: 'interruption',
  leadCapture: 'lead-capture',
  recording: 'recording',
  transcriptHistory: 'transcript-history',
} as const;

export function PricingPage({
  copy,
  data,
}: PricingPageProps): React.ReactElement {
  assertPricingPageData(data);

  const pills = [
    {
      id: 'inbound',
      label: copy.cardInboundLabel,
      icon: PILL_ICONS.inbound,
    },
    {
      id: 'outbound',
      label: copy.cardOutboundLabel,
      icon: PILL_ICONS.outbound,
    },
    {
      id: 'languages',
      label: 'KA · RU · EN',
      icon: PILL_ICONS.languages,
    },
    {
      id: 'recording',
      label: copy.cardRecordingLabel,
      icon: PILL_ICONS.recording,
    },
  ] as const;
  const readyRowIds = new Set(
    data.readyFeatureIds.map((featureId) => READY_ROW_BY_FEATURE[featureId]),
  );
  const capabilities = data.comparisonRows.filter((row) =>
    readyRowIds.has(row.id as (typeof READY_ROW_BY_FEATURE)[keyof typeof READY_ROW_BY_FEATURE]),
  );

  return (
    <ProductPageShell className="pricing-page" endcap={null}>
      <div data-pricing-mode={data.mode}>
        <section
          id="offers"
          className="pricing-tier-shell"
          aria-labelledby="pricing-title"
        >
          <header className="pricing-page__hero">
            <p className="pricing-page__eyebrow">{copy.offersEyebrow}</p>
            <h1 id="pricing-title" className="pricing-page__title">
              {copy.offersTitle}
            </h1>
            <p className="pricing-page__lead">{copy.offersIntro}</p>
            <div className="pricing-page__pill-rail">
              <span className="pricing-page__pill-label">
                {copy.includedLabel}:
              </span>
              {pills.map((row) => (
                <span
                  key={row.id}
                  className="pricing-page__pill"
                >
                  <Ico
                    name={row.icon}
                    aria-hidden="true"
                  />
                  <span>{row.label}</span>
                </span>
              ))}
            </div>
          </header>

          <PricingConfigurator
            offers={data.offers}
            minuteBundles={data.minuteBundles}
            setupPrice={data.setupPrice}
            callRates={data.callRates}
            rows={data.comparisonRows}
            copy={copy}
          />
        </section>

        <section
          className="mt-16 md:mt-20"
          aria-labelledby="pricing-capabilities-title"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1.15fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2410c]">
                {copy.includedLabel}
              </p>
              <h2
                id="pricing-capabilities-title"
                className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
              >
                {copy.readyNowLabel}
              </h2>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-[#525252]">
              {copy.offersIntro}
            </p>
          </div>

          <div className="mt-8 grid overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white md:grid-cols-2">
            {capabilities.map((row, index) => (
              <article
                key={row.id}
                className="relative grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-[#eeeeef] p-5 pe-14 last:border-b-0 md:[&:nth-child(odd)]:border-e md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff6f1] text-[#c2410c]">
                  <Ico
                    name={CAPABILITY_ICONS[index] ?? 'solar:check-circle-bold-duotone'}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-pretty text-sm font-semibold text-neutral-900">
                      {row.label}
                    </h3>
                    <span className="rounded-full bg-[#ff5a1f]/8 px-2 py-0.5 text-[10px] font-semibold text-[#c2410c]">
                      {copy.includedStatusLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-pretty text-xs leading-relaxed text-[#525252]">
                    {row.info}
                  </p>
                </div>
                <PricingInfo
                  className="absolute end-2 top-2"
                  label={row.label}
                  text={row.info}
                />
              </article>
            ))}
          </div>
        </section>

        {data.offers.length > 1 ? (
          <section
            id="comparison"
            className="mt-16 md:mt-20"
            aria-labelledby="comparison-title"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2410c]">
                {copy.comparisonEyebrow}
              </p>
              <h2
                id="comparison-title"
                className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
              >
                {copy.comparisonTitle}
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-[#525252]">
                {copy.comparisonIntro}
              </p>
            </div>
            <PricingComparison
              offers={data.offers}
              rows={data.comparisonRows}
              copy={copy}
            />
          </section>
        ) : null}

        <section
          id="roadmap"
          className="mt-16 md:mt-20"
          aria-labelledby="roadmap-title"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1.15fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2410c]">
                {copy.roadmapEyebrow}
              </p>
              <h2
                id="roadmap-title"
                className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
              >
                {copy.roadmapTitle}
              </h2>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-[#525252]">
              {copy.roadmapIntro}
            </p>
          </div>

          <div className="mt-8 grid overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white md:grid-cols-2">
            {data.roadmap.map((item) => (
              <article
                key={item.id}
                className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-[#eeeeef] p-5 md:[&:nth-child(odd)]:border-e md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fafafa] text-[#c2410c]">
                  <Ico name={item.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-pretty text-sm font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <span className="rounded-full bg-[#fff2e9] px-2 py-0.5 text-[10px] font-semibold text-[#c2410c]">
                      {copy.soonStatusLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-pretty text-xs leading-relaxed text-[#525252]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="setup"
          className="mt-16 overflow-hidden rounded-3xl border border-[#e5e5e5] bg-white p-5 md:mt-20 md:grid md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:p-8"
          aria-labelledby="setup-title"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2410c]">
              {copy.timelineEyebrow}
            </p>
            <h2
              id="setup-title"
              className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
            >
              {copy.timelineTitle}
            </h2>
          </div>
          <ol className="mt-8 divide-y divide-[#eeeeef] md:mt-0">
            {data.timeline.map((step, index) => (
              <li
                key={step.title}
                className="grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="stat-number inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff5a1f]/8 text-xs tabular-nums text-[#c2410c]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-pretty text-sm font-semibold text-neutral-900">
                      {step.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-[#737373]">
                      {step.timing}
                    </span>
                  </div>
                  <p className="mt-1 text-pretty text-xs leading-relaxed text-[#525252]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="pricing-faq"
          className="mt-16 md:mt-20"
          aria-labelledby="pricing-faq-title"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2410c]">
            {copy.faqEyebrow}
          </p>
          <h2
            id="pricing-faq-title"
            className="mt-3 text-balance font-display text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
          >
            {copy.faqTitle}
          </h2>
          <div className="mt-7 divide-y divide-[#eeeeef] rounded-2xl border border-[#e5e5e5] bg-white px-5">
            {data.faq.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f]/40">
                  <span className="min-w-0 text-pretty [overflow-wrap:anywhere]">
                    {item.question}
                  </span>
                  <Ico
                    name="solar:alt-arrow-down-bold-duotone"
                    className="h-4 w-4 shrink-0 text-[#c2410c] transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-3xl pb-5 text-pretty text-sm leading-relaxed text-[#525252]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <InlineLeadCta
          eyebrow={copy.ctaEyebrow}
          title={copy.ctaTitle}
          description={copy.ctaDescription}
          actionLabel={copy.ctaLabel}
        />
      </div>
    </ProductPageShell>
  );
}
