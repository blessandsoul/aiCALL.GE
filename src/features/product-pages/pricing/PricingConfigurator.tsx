'use client';

import { useState } from 'react';

import { Ico } from '@/components/common/Ico';
import { Link } from '@/i18n/navigation';

import { PricingOfferExplorer } from './PricingOfferExplorer';
import type {
  PricingCallRates,
  PricingComparisonRow,
  PricingMinuteBundle,
  PricingOffer,
  PricingPageCopy,
  PricingAmount,
} from './types';

interface PricingConfiguratorProps {
  offers: readonly PricingOffer[];
  minuteBundles: readonly PricingMinuteBundle[];
  setupPrice: PricingAmount;
  callRates: PricingCallRates;
  rows: readonly PricingComparisonRow[];
  copy: PricingPageCopy;
}

const INBOUND_EXAMPLE_MINUTES = [1, 3, 5, 10] as const;

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

function defaultMinuteBundleId(
  offer: PricingOffer,
  minuteBundles: readonly PricingMinuteBundle[],
): string {
  const configured = offer.defaultMinuteBundleId;
  if (configured && minuteBundles.some((bundle) => bundle.id === configured)) {
    return configured;
  }
  return minuteBundles[0]?.id ?? '';
}

export function PricingConfigurator({
  offers,
  minuteBundles,
  setupPrice,
  callRates,
  rows,
  copy,
}: PricingConfiguratorProps): React.ReactElement {
  const initialOffer = offers.find((offer) => offer.recommended) ?? offers[0];
  const [selectedPlanId, setSelectedPlanId] = useState(initialOffer?.id ?? '');
  const [selectedMinuteId, setSelectedMinuteId] = useState(() =>
    initialOffer ? defaultMinuteBundleId(initialOffer, minuteBundles) : '',
  );
  const [minutesChosenManually, setMinutesChosenManually] = useState(false);

  const selectedOffer =
    offers.find((offer) => offer.id === selectedPlanId) ?? initialOffer;
  const selectedMinuteBundle =
    minuteBundles.find((bundle) => bundle.id === selectedMinuteId) ??
    minuteBundles[0];

  const handlePlanSelect = (offerId: string): void => {
    const nextOffer = offers.find((offer) => offer.id === offerId);
    if (!nextOffer) return;

    setSelectedPlanId(offerId);
    if (!minutesChosenManually) {
      setSelectedMinuteId(defaultMinuteBundleId(nextOffer, minuteBundles));
    }
  };

  const handleMinuteSelect = (bundleId: string): void => {
    setSelectedMinuteId(bundleId);
    setMinutesChosenManually(true);
  };

  if (!selectedOffer || !selectedMinuteBundle) {
    return (
      <div
        className="pricing-configurator__empty"
        role="status"
        aria-label={copy.configurationLabel}
      />
    );
  }

  const platformAmount = offerPrice(selectedOffer);
  const minutesAmount = selectedMinuteBundle.price.amount;
  const platformCurrency =
    ('price' in selectedOffer && selectedOffer.price?.currency) || 'GEL';
  const minutesCurrency = selectedMinuteBundle.price.currency;
  const planQueryValue = selectedOffer.planId ?? selectedOffer.id;
  const contactHref = `/contact?plan=${encodeURIComponent(planQueryValue)}&minutes=${encodeURIComponent(String(selectedMinuteBundle.minutes))}&inboundMinutes=${encodeURIComponent(String(selectedMinuteBundle.minutes))}`;
  const liveSummary = `${copy.configurationLabel}: ${selectedOffer.name}, ${formatNumber(selectedMinuteBundle.minutes)} ${copy.minuteUnit}. ${copy.platformPriceLabel}: ${formatAmount(platformAmount, platformCurrency)}. ${copy.minutesPriceLabel}: ${formatAmount(minutesAmount, minutesCurrency)} ${copy.totalPerMonthLabel}. ${copy.outboundRateTitle}: ${formatAmount(callRates.outbound.pricePerConnectedMinute.amount, callRates.outbound.pricePerConnectedMinute.currency)} ${copy.outboundRateUnit}.`;

  return (
    <div className="pricing-configurator">
      <section
        className="pricing-configurator__step pricing-configurator__step--plans"
        aria-labelledby="pricing-title"
      >
        <PricingOfferExplorer
          offers={offers}
          rows={rows}
          selectedPlanId={selectedOffer.id}
          onSelectPlan={handlePlanSelect}
          copy={copy}
        />
      </section>

      <section
        className="pricing-configurator__step pricing-configurator__step--minutes"
        aria-labelledby="pricing-minute-step-title"
      >
        <div className="pricing-step-heading">
          <span className="pricing-step-heading__number" aria-hidden="true">
            02
          </span>
          <div>
            <p>{copy.minuteStepEyebrow}</p>
            <h2 id="pricing-minute-step-title" className="text-balance">
              {copy.minuteStepTitle}
            </h2>
            <span>{copy.minuteStepIntro}</span>
          </div>
        </div>

        <div className="pricing-call-rates" aria-label={copy.minuteStepTitle}>
          <article className="pricing-call-rate pricing-call-rate--inbound">
            <span className="pricing-call-rate__icon" aria-hidden="true">
              <Ico name="solar:incoming-call-rounded-bold-duotone" />
            </span>
            <div className="pricing-call-rate__content">
              <span>{copy.inboundRateTitle}</span>
              <strong>
                {formatAmount(
                  callRates.inbound.pricePerConnectedMinute.amount,
                  callRates.inbound.pricePerConnectedMinute.currency,
                )}
                <small>{copy.inboundRateUnit}</small>
              </strong>
              <div
                className="pricing-call-rate__examples"
                aria-label={copy.inboundRateExample}
              >
                {INBOUND_EXAMPLE_MINUTES.map((minutes) => (
                  <span key={minutes}>
                    <small>
                      {minutes} {copy.minuteUnit}
                    </small>
                    <b>
                      {formatAmount(
                        minutes *
                          callRates.inbound.pricePerConnectedMinute.amount,
                        callRates.inbound.pricePerConnectedMinute.currency,
                      )}
                    </b>
                  </span>
                ))}
              </div>
              <small>{copy.inboundRateNote}</small>
            </div>
          </article>

          <article className="pricing-call-rate pricing-call-rate--outbound">
            <span className="pricing-call-rate__icon" aria-hidden="true">
              <Ico name="solar:phone-calling-rounded-bold-duotone" />
            </span>
            <div className="pricing-call-rate__content">
              <span>{copy.outboundRateTitle}</span>
              <strong>
                {formatAmount(
                  callRates.outbound.pricePerConnectedMinute.amount,
                  callRates.outbound.pricePerConnectedMinute.currency,
                )}
                <small>{copy.outboundRateUnit}</small>
              </strong>
              <p>{copy.outboundRateStatus}</p>
              <small>{copy.outboundRateNote}</small>
            </div>
          </article>
        </div>

        <div className="pricing-configurator__minute-layout">
          <div
            className="pricing-minute-options"
            role="group"
            aria-label={copy.selectMinutesLabel}
          >
            {minuteBundles.map((bundle) => {
              const selected = bundle.id === selectedMinuteBundle.id;
              const bundleId = `pricing-minutes-${bundle.id}`;
              return (
                <button
                  key={bundle.id}
                  id={bundleId}
                  type="button"
                  aria-pressed={selected}
                  className="pricing-minute-option"
                  onClick={() => handleMinuteSelect(bundle.id)}
                >
                  <span className="pricing-minute-option__icon" aria-hidden="true">
                    <Ico name={bundle.icon} />
                  </span>
                  <span className="pricing-minute-option__content">
                    <small>{copy.connectedMinutesLabel}</small>
                    <strong>
                      {formatNumber(bundle.minutes)}
                      <span>{copy.minuteUnit}</span>
                    </strong>
                    <span>{bundle.description}</span>
                  </span>
                  <span className="pricing-minute-option__price">
                    {formatAmount(bundle.price.amount, bundle.price.currency)}
                    {bundle.price.unit ? <small>{bundle.price.unit}</small> : null}
                  </span>
                  <span className="pricing-minute-option__state">
                    <Ico name="solar:check-circle-bold-duotone" aria-hidden="true" />
                    {selected
                      ? copy.selectedMinutesLabel
                      : copy.selectMinutesLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <aside
            className="pricing-configuration-summary"
            aria-labelledby="pricing-summary-title"
          >
            <div className="pricing-configuration-summary__head">
              <span>{copy.configurationLabel}</span>
              <h3 id="pricing-summary-title" className="text-balance">
                <span>{selectedOffer.name}</span>
                <span>{selectedMinuteBundle.name}</span>
              </h3>
            </div>

            <dl className="pricing-configuration-summary__equation">
              <div>
                <span aria-hidden="true" />
                <dt>{copy.platformPriceLabel}</dt>
                <dd>{formatAmount(platformAmount, platformCurrency)}</dd>
              </div>
              <div>
                <span aria-hidden="true" />
                <dt>{copy.minutesPriceLabel}</dt>
                <dd>{formatAmount(minutesAmount, minutesCurrency)}</dd>
              </div>
              <div className="pricing-configuration-summary__setup">
                <span aria-hidden="true">
                  <Ico name="solar:phone-bold-duotone" aria-hidden="true" />
                </span>
                <dt>{copy.setupFeeLabel}</dt>
                <dd>
                  {formatAmount(setupPrice.amount, setupPrice.currency)}
                  <small>{copy.setupFeeNote}</small>
                </dd>
              </div>
              <div className="pricing-configuration-summary__total">
                <span aria-hidden="true" />
                <dt>{copy.totalPriceLabel}</dt>
                <dd>
                  {selectedOffer.contactOnly ? (
                    <small>{copy.customPricePrefix}</small>
                  ) : null}
                  <strong>
                    <span>{formatAmount(platformAmount, platformCurrency)}</span>
                    <span>{formatAmount(minutesAmount, minutesCurrency)}</span>
                  </strong>
                  <small>{copy.totalPerMonthLabel}</small>
                </dd>
              </div>
            </dl>

            <p className="pricing-configuration-summary__note">
              <Ico name="solar:shield-check-bold-duotone" aria-hidden="true" />
              <span>{copy.noAutomaticChargeLabel}</span>
            </p>

            <p className="pricing-configuration-summary__currency-note">
              <Ico name="solar:info-circle-bold-duotone" aria-hidden="true" />
              <span>{copy.pricingUpdateNote}</span>
            </p>

            <Link
              href={contactHref}
              className="pricing-configuration-summary__action"
            >
              <span>{copy.configureActionLabel}</span>
              <Ico name="solar:arrow-right-bold-duotone" aria-hidden="true" />
            </Link>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {liveSummary}
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
