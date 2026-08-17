import { Ico } from '@/components/common/Ico';
import { cn } from '@/lib/utils';

import { PricingInfo } from './PricingInfo';
import type {
  PricingComparisonRow,
  PricingOffer,
  PricingPageCopy,
} from './types';

const PLAN_TEXT: Record<string, string> = {
  starter: 'text-[#0e7490]',
  business: 'text-[#7c3aed]',
  premium: 'text-[#2563eb]',
  enterprise: 'text-[#c2410c]',
  custom: 'text-[#334155]',
};

interface PricingComparisonProps {
  offers: readonly PricingOffer[];
  rows: readonly PricingComparisonRow[];
  copy: Pick<
    PricingPageCopy,
    | 'offerLabel'
    | 'includedStatusLabel'
    | 'notIncludedStatusLabel'
    | 'plannedStatusLabel'
    | 'platformPriceLabel'
  >;
}

function formatNumber(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/gu, '\u00a0');
}

function priceLabel(offer: PricingOffer): string {
  if (!('price' in offer) || !offer.price) return offer.billingLabel;
  const currency = offer.price.currency === 'GEL' ? '₾' : offer.price.currency;
  return `${formatNumber(offer.price.amount)} ${currency}${offer.price.unit ?? ''}`;
}

function Availability({
  value,
  includedLabel,
  excludedLabel,
}: {
  value: boolean;
  includedLabel: string;
  excludedLabel: string;
}): React.ReactElement {
  return (
    <span
      className={cn(
        'inline-flex size-7 items-center justify-center rounded-full ring-1 ring-inset',
        value
          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
          : 'bg-rose-50 text-rose-700 ring-rose-200',
      )}
    >
      <Ico
        name={
          value
            ? 'solar:check-circle-bold-duotone'
            : 'solar:close-circle-bold-duotone'
        }
        className="size-5"
        aria-hidden="true"
      />
      <span className="sr-only">
        {value ? includedLabel : excludedLabel}
      </span>
    </span>
  );
}

function CellValue({
  value,
  copy,
}: {
  value: boolean | string;
  copy: Pick<
    PricingPageCopy,
    'includedStatusLabel' | 'notIncludedStatusLabel' | 'plannedStatusLabel'
  >;
}): React.ReactElement {
  if (typeof value === 'boolean') {
    return (
      <Availability
        value={value}
        includedLabel={copy.includedStatusLabel}
        excludedLabel={copy.notIncludedStatusLabel}
      />
    );
  }
  if (value === copy.plannedStatusLabel) {
    return (
      <span className="inline-flex min-h-7 items-center rounded-full bg-amber-50 px-2.5 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">
        {copy.plannedStatusLabel}
      </span>
    );
  }
  return (
    <strong className="whitespace-nowrap text-xs font-semibold tabular-nums text-neutral-900">
      {value}
    </strong>
  );
}

export function PricingComparison({
  offers,
  rows,
  copy,
}: PricingComparisonProps): React.ReactElement | null {
  if (offers.length < 2 || rows.length === 0) return null;

  return (
    <>
      <div
        className="mt-8 hidden overflow-x-auto rounded-2xl border border-[#e5e5e5] bg-white md:block"
        role="region"
        tabIndex={0}
        aria-label={copy.offerLabel}
      >
        <table className="w-full min-w-[880px] border-collapse text-sm">
          <caption className="sr-only">{copy.offerLabel}</caption>
          <thead>
            <tr className="bg-[#fafafa]">
              <th
                scope="col"
                className="w-[250px] px-4 py-4 text-start text-xs font-semibold text-[#525252]"
              >
                {copy.offerLabel}
              </th>
              {offers.map((offer) => {
                const planId = offer.planId ?? 'starter';
                return (
                  <th key={offer.id} scope="col" className="px-4 py-4 text-center">
                    <span className={cn('block font-display text-sm font-bold', PLAN_TEXT[planId])}>
                      {offer.name}
                    </span>
                    <span className={cn('mt-1 block whitespace-nowrap text-xs font-semibold tabular-nums', PLAN_TEXT[planId])}>
                      {priceLabel(offer)}
                    </span>
                    <span className="mt-1 block text-[10px] font-medium leading-tight text-[#525252]">
                      {copy.platformPriceLabel}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className={index % 2 === 1 ? 'bg-[#fafafa]/70' : undefined}>
                <th
                  scope="row"
                  className="border-t border-[#eeeeef] px-4 py-3 text-start text-xs font-semibold text-neutral-900"
                >
                  <span className="flex min-w-0 items-center gap-1">
                    <span className="min-w-0 [overflow-wrap:anywhere]">{row.label}</span>
                    <PricingInfo label={row.label} text={row.info} />
                  </span>
                </th>
                {offers.map((offer) => {
                  const planId = offer.planId ?? 'starter';
                  return (
                    <td
                      key={offer.id}
                      className="border-t border-[#eeeeef] px-4 py-3 text-center"
                    >
                      <CellValue
                        value={row.values[planId]}
                        copy={copy}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 md:hidden">
        {offers.map((offer) => {
          const planId = offer.planId ?? 'starter';
          return (
            <details
              key={offer.id}
              open={offer.recommended || undefined}
              className="group overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff5a1f]/45">
                <span className={cn('font-display text-sm font-bold', PLAN_TEXT[planId])}>
                  {offer.name}
                </span>
                <span className={cn('whitespace-nowrap text-xs font-semibold tabular-nums', PLAN_TEXT[planId])}>
                  {priceLabel(offer)}
                </span>
              </summary>
              <p className="border-t border-[#eeeeef] bg-[#fafafa] px-4 py-2 text-[10px] font-medium text-[#525252]">
                {copy.platformPriceLabel}
              </p>
              <dl className="divide-y divide-[#eeeeef] border-t border-[#eeeeef] px-4">
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(5rem,auto)] items-center gap-4 py-3"
                  >
                    <dt className="flex min-w-0 items-center gap-1 text-xs font-medium text-[#525252]">
                      <span className="min-w-0 [overflow-wrap:anywhere]">{row.label}</span>
                      <PricingInfo label={row.label} text={row.info} />
                    </dt>
                    <dd className="max-w-[48vw] text-end">
                      <CellValue
                        value={row.values[planId]}
                        copy={copy}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
          );
        })}
      </div>
    </>
  );
}
