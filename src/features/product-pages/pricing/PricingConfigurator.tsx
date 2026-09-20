'use client';

import { useState } from 'react';

import { Ico } from '@/components/common/Ico';
import { Link } from '@/i18n/navigation';

import { PricingOfferExplorer } from './PricingOfferExplorer';
import type {
  PricingCallRates,
  PricingComparisonRow,
  PricingInboundChannelOption,
  PricingOffer,
  PricingPageCopy,
  PricingAmount,
} from './types';

interface PricingConfiguratorProps {
  offers: readonly PricingOffer[];
  inboundChannelOptions: readonly PricingInboundChannelOption[];
  setupPrice: PricingAmount;
  callRates: PricingCallRates;
  rows: readonly PricingComparisonRow[];
  copy: PricingPageCopy;
}

function formatNumber(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/gu, '\u00a0');
}

function formatAmount(amount: number, currency: string): string {
  const value = amount > 0 && amount < 1 ? amount.toFixed(2) : formatNumber(amount);
  if (currency === 'USD') return `$${value}`;
  return `${value} ${currency === 'GEL' ? '₾' : currency}`;
}

function offerPrice(offer: PricingOffer): number {
  return 'price' in offer && offer.price ? offer.price.amount : 0;
}

export function PricingConfigurator({
  offers,
  inboundChannelOptions,
  setupPrice,
  callRates,
  rows,
  copy,
}: PricingConfiguratorProps): React.ReactElement {
  const initialOffer = offers.find((offer) => offer.recommended) ?? offers[0];
  const [selectedPlanId, setSelectedPlanId] = useState(initialOffer?.id ?? '');
  const [selectedChannels, setSelectedChannels] = useState<number>(
    initialOffer?.includedInboundChannels ?? callRates.inbound.includedChannels,
  );

  const selectedOffer =
    offers.find((offer) => offer.id === selectedPlanId) ?? initialOffer;
  const selectedChannelOption =
    inboundChannelOptions.find((option) => option.channels === selectedChannels) ??
    inboundChannelOptions[0];

  const handlePlanSelect = (offerId: string): void => {
    const nextOffer = offers.find((offer) => offer.id === offerId);
    if (!nextOffer) return;
    setSelectedPlanId(offerId);
    setSelectedChannels(nextOffer.includedInboundChannels);
  };

  if (!selectedOffer || !selectedChannelOption) {
    return (
      <div
        className="pricing-configurator__empty"
        role="status"
        aria-label={copy.configurationLabel}
      />
    );
  }

  const platformAmount = offerPrice(selectedOffer);
  const channelAmount = selectedChannelOption.additionalMonthlyPrice.amount;
  const totalMonthlyAmount = platformAmount + channelAmount;
  const platformCurrency =
    ('price' in selectedOffer && selectedOffer.price?.currency) || 'GEL';
  const channelCurrency = selectedChannelOption.additionalMonthlyPrice.currency;
  const planQueryValue = selectedOffer.planId ?? selectedOffer.id;
  const contactHref = `/contact?plan=${encodeURIComponent(planQueryValue)}&inboundChannels=${encodeURIComponent(String(selectedChannelOption.channels))}`;
  const liveSummary = `${copy.configurationLabel}: ${selectedOffer.name}, ${formatNumber(selectedChannelOption.channels)} ${copy.inboundChannelUnit}. ${copy.platformPriceLabel}: ${formatAmount(platformAmount, platformCurrency)}. ${copy.channelsPriceLabel}: ${formatAmount(channelAmount, channelCurrency)} ${copy.totalPerMonthLabel}. ${copy.outboundRateTitle}: ${formatAmount(callRates.outbound.pricePerConnectedMinute.amount, callRates.outbound.pricePerConnectedMinute.currency)} ${copy.outboundRateUnit}.`;

  return (
    <div className="pricing-configurator">
      <section className="pricing-configurator__step pricing-configurator__step--plans" aria-labelledby="pricing-title">
        <PricingOfferExplorer
          offers={offers}
          rows={rows}
          selectedPlanId={selectedOffer.id}
          onSelectPlan={handlePlanSelect}
          copy={copy}
        />
      </section>

      <section className="pricing-configurator__step pricing-configurator__step--minutes" aria-labelledby="pricing-channel-step-title">
        <div className="pricing-step-heading">
          <span className="pricing-step-heading__number" aria-hidden="true">02</span>
          <div>
            <p>{copy.channelStepEyebrow}</p>
            <h2 id="pricing-channel-step-title" className="text-balance">{copy.channelStepTitle}</h2>
            <span>{copy.channelStepIntro}</span>
          </div>
        </div>

        <div className="pricing-call-rates" aria-label={copy.channelStepTitle}>
          <article className="pricing-call-rate pricing-call-rate--inbound">
            <span className="pricing-call-rate__icon" aria-hidden="true"><Ico name="solar:incoming-call-rounded-bold-duotone" /></span>
            <div className="pricing-call-rate__content">
              <span>{copy.inboundRateTitle}</span>
              <strong>{copy.inboundIncludedLabel}<small>{copy.inboundRateUnit}</small></strong>
              <small>{copy.inboundRateNote}</small>
            </div>
          </article>

          <article className="pricing-call-rate pricing-call-rate--outbound">
            <span className="pricing-call-rate__icon" aria-hidden="true"><Ico name="solar:phone-calling-rounded-bold-duotone" /></span>
            <div className="pricing-call-rate__content">
              <span>{copy.outboundRateTitle}</span>
              <strong>
                {formatAmount(callRates.outbound.pricePerConnectedMinute.amount, callRates.outbound.pricePerConnectedMinute.currency)}
                <small>{copy.outboundRateUnit}</small>
              </strong>
              <p>{copy.outboundRateStatus}</p>
              <small>{copy.outboundRateNote}</small>
            </div>
          </article>
        </div>

        <div className="pricing-configurator__minute-layout">
          <div className="pricing-minute-options" role="group" aria-label={copy.selectChannelsLabel}>
            {inboundChannelOptions.map((option) => {
              const selected = option.channels === selectedChannelOption.channels;
              const optionId = `pricing-inbound-channels-${option.channels}`;
              return (
                <button key={option.channels} id={optionId} type="button" aria-pressed={selected} className="pricing-minute-option" onClick={() => setSelectedChannels(option.channels)}>
                  <span className="pricing-minute-option__icon" aria-hidden="true"><Ico name="solar:phone-calling-rounded-bold-duotone" /></span>
                  <span className="pricing-minute-option__content">
                    <small>{copy.inboundIncludedLabel}</small>
                    <strong>{formatNumber(option.channels)}<span>{copy.inboundChannelUnit}</span></strong>
                    <span>{copy.additionalChannelLabel}</span>
                  </span>
                  <span className="pricing-minute-option__price">
                    {formatAmount(option.additionalMonthlyPrice.amount, option.additionalMonthlyPrice.currency)}
                    <small>{copy.totalPerMonthLabel}</small>
                  </span>
                  <span className="pricing-minute-option__state">
                    <Ico name="solar:check-circle-bold-duotone" aria-hidden="true" />
                    {selected ? copy.selectedChannelsLabel : copy.selectChannelsLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <aside className="pricing-configuration-summary" aria-labelledby="pricing-summary-title">
            <div className="pricing-configuration-summary__head">
              <span>{copy.configurationLabel}</span>
              <h3 id="pricing-summary-title" className="text-balance">
                <span>{selectedOffer.name}</span>
                <span>{formatNumber(selectedChannelOption.channels)} {copy.inboundChannelUnit}</span>
              </h3>
            </div>

            <dl className="pricing-configuration-summary__equation">
              <div><span aria-hidden="true" /><dt>{copy.platformPriceLabel}</dt><dd>{formatAmount(platformAmount, platformCurrency)}</dd></div>
              <div><span aria-hidden="true" /><dt>{copy.channelsPriceLabel}</dt><dd>{formatAmount(channelAmount, channelCurrency)}</dd></div>
              <div className="pricing-configuration-summary__setup">
                <span aria-hidden="true"><Ico name="solar:phone-bold-duotone" aria-hidden="true" /></span>
                <dt>{copy.setupFeeLabel}</dt>
                <dd>{formatAmount(setupPrice.amount, setupPrice.currency)}<small>{copy.setupFeeNote}</small></dd>
              </div>
              <div className="pricing-configuration-summary__total">
                <span aria-hidden="true" /><dt>{copy.totalPriceLabel}</dt>
                <dd>{selectedOffer.contactOnly ? <small>{copy.customPricePrefix}</small> : null}<strong>{formatAmount(totalMonthlyAmount, platformCurrency)}</strong><small>{copy.totalPerMonthLabel}</small></dd>
              </div>
            </dl>

            <p className="pricing-configuration-summary__note"><Ico name="solar:shield-check-bold-duotone" aria-hidden="true" /><span>{copy.noAutomaticChargeLabel}</span></p>
            <p className="pricing-configuration-summary__currency-note"><Ico name="solar:info-circle-bold-duotone" aria-hidden="true" /><span>{copy.pricingUpdateNote}</span></p>
            <Link href={contactHref} className="pricing-configuration-summary__action"><span>{copy.configureActionLabel}</span><Ico name="solar:arrow-right-bold-duotone" aria-hidden="true" /></Link>
            <p className="sr-only" aria-live="polite" aria-atomic="true">{liveSummary}</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
