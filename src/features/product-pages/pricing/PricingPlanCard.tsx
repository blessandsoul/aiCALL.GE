import { Ico } from '@/components/common/Ico';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { PricingInfo } from './PricingInfo';
import type {
  PricingComparisonRow,
  LegacyPricingPageCopy,
  PricingOffer,
} from './types';

type PlanId = NonNullable<PricingOffer['planId']>;

const FUNCTIONAL_METRICS = [
  { id: 'model', labelKey: 'cardModelLabel', icon: 'solar:cpu-bold-duotone' },
  { id: 'operators', labelKey: 'cardOperatorsLabel', icon: 'solar:users-group-rounded-bold-duotone' },
  { id: 'scenarios', labelKey: 'cardScenariosLabel', icon: 'solar:document-text-bold-duotone' },
  { id: 'concurrent-calls', labelKey: 'cardConcurrentCallsLabel', icon: 'solar:phone-calling-rounded-bold-duotone' },
  { id: 'integrations', labelKey: 'cardIntegrationsLabel', icon: 'solar:link-round-angle-bold-duotone' },
] as const satisfies readonly {
  id: string;
  labelKey: keyof Pick<
    LegacyPricingPageCopy,
    | 'cardModelLabel'
    | 'cardOperatorsLabel'
    | 'cardScenariosLabel'
    | 'cardConcurrentCallsLabel'
    | 'cardIntegrationsLabel'
  >;
  icon: string;
}[];

const PLAN_TONES: Record<
  PlanId,
  {
    border: string;
    text: string;
    soft: string;
    panel: string;
    info: string;
    selectedButton: string;
    outlineButton: string;
    badge: string;
    shape: string;
  }
> = {
  starter: {
    border: 'border-[#0e7490]/35 hover:border-[#0e7490]/60',
    text: 'text-[#0e7490]',
    soft: 'bg-[#ecfeff] text-[#0e7490]',
    panel: 'border-[#0e7490]/20 bg-[#ecfeff]/70',
    info: 'hover:text-[#0e7490] focus-visible:ring-[#0e7490]/45',
    selectedButton: 'border-[#0e7490] bg-[#0e7490] text-white hover:bg-[#155e75]',
    outlineButton: 'border-[#0e7490]/25 bg-white text-[#0e7490] hover:border-[#0e7490]/55 hover:bg-[#ecfeff]',
    badge: 'border-[#0e7490]/25 text-[#0e7490]',
    shape: 'rounded-full',
  },
  business: {
    border: 'border-[#7c3aed]/35 hover:border-[#7c3aed]/60',
    text: 'text-[#7c3aed]',
    soft: 'bg-[#f3edff] text-[#7c3aed]',
    panel: 'border-[#7c3aed]/20 bg-[#f3edff]/75',
    info: 'hover:text-[#7c3aed] focus-visible:ring-[#7c3aed]/45',
    selectedButton: 'border-[#7c3aed] bg-[#7c3aed] text-white hover:bg-[#6d28d9]',
    outlineButton: 'border-[#7c3aed]/25 bg-white text-[#7c3aed] hover:border-[#7c3aed]/55 hover:bg-[#f3edff]',
    badge: 'border-[#7c3aed]/25 text-[#7c3aed]',
    shape: 'rotate-12 rounded-xl',
  },
  premium: {
    border: 'border-[#2563eb]/35 hover:border-[#2563eb]/60',
    text: 'text-[#2563eb]',
    soft: 'bg-[#edf4ff] text-[#2563eb]',
    panel: 'border-[#2563eb]/20 bg-[#edf4ff]/75',
    info: 'hover:text-[#2563eb] focus-visible:ring-[#2563eb]/45',
    selectedButton: 'border-[#2563eb] bg-[#2563eb] text-white hover:bg-[#1d4ed8]',
    outlineButton: 'border-[#2563eb]/25 bg-white text-[#2563eb] hover:border-[#2563eb]/55 hover:bg-[#edf4ff]',
    badge: 'border-[#2563eb]/25 text-[#2563eb]',
    shape: 'rotate-45 rounded-lg',
  },
  enterprise: {
    border: 'border-[#c2410c]/50 hover:border-[#c2410c]/75',
    text: 'text-[#c2410c]',
    soft: 'bg-[#fff2e9] text-[#c2410c]',
    panel: 'border-[#c2410c]/20 bg-[#fff2e9]/75',
    info: 'hover:text-[#c2410c] focus-visible:ring-[#c2410c]/45',
    selectedButton: 'border-[#c2410c] bg-[#c2410c] text-white hover:bg-[#9a3412]',
    outlineButton: 'border-[#c2410c]/25 bg-white text-[#c2410c] hover:border-[#c2410c]/55 hover:bg-[#fff2e9]',
    badge: 'border-[#c2410c]/25 text-[#c2410c]',
    shape: 'rounded-[45%_55%_58%_42%]',
  },
  custom: {
    border: 'border-[#334155]/35 hover:border-[#334155]/60',
    text: 'text-[#334155]',
    soft: 'bg-[#f1f5f9] text-[#334155]',
    panel: 'border-[#334155]/20 bg-[#f8fafc]',
    info: 'hover:text-[#334155] focus-visible:ring-[#334155]/45',
    selectedButton: 'border-[#334155] bg-[#334155] text-white hover:bg-[#1e293b]',
    outlineButton: 'border-[#334155]/25 bg-white text-[#334155] hover:border-[#334155]/55 hover:bg-[#f8fafc]',
    badge: 'border-[#334155]/25 text-[#334155]',
    shape: 'rounded-[35%_65%_48%_52%]',
  },
};

interface PricingPlanCardProps {
  offer: PricingOffer;
  rows: readonly PricingComparisonRow[];
  selected: boolean;
  onSelect: (offerId: string) => void;
  copy: Pick<
    LegacyPricingPageCopy,
    | 'cardModelLabel'
    | 'cardOperatorsLabel'
    | 'cardScenariosLabel'
    | 'cardConcurrentCallsLabel'
    | 'cardIntegrationsLabel'
    | 'includedStatusLabel'
    | 'notIncludedStatusLabel'
    | 'platformPriceLabel'
    | 'recommendedLabel'
    | 'selectPlanLabel'
    | 'selectedPlanLabel'
    | 'customValueLabel'
  >;
}

function formatNumber(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/gu, '\u00a0');
}

function formatPrice(price: NonNullable<PricingOffer['price']>): string {
  const currency = price.currency === 'GEL' ? '₾' : price.currency;
  return `${formatNumber(price.amount)} ${currency}`;
}

function metricValue(
  row: PricingComparisonRow | undefined,
  planId: PlanId,
  copy: Pick<LegacyPricingPageCopy, 'includedStatusLabel' | 'notIncludedStatusLabel' | 'customValueLabel'>,
): string {
  const value = row?.values[planId];
  if (typeof value === 'string') return value;
  if (value === true) return copy.includedStatusLabel;
  if (value === false) return copy.notIncludedStatusLabel;
  return copy.customValueLabel;
}

export function PricingPlanCard({
  offer,
  rows,
  selected,
  onSelect,
  copy,
}: PricingPlanCardProps): React.ReactElement {
  const planId = offer.planId ?? 'starter';
  const tone = PLAN_TONES[planId];
  const price = 'price' in offer && offer.price ? offer.price : undefined;
  const idBase = `pricing-plan-${offer.id.replace(/[^a-zA-Z0-9_-]/gu, '-')}`;
  const rowMap = new Map(rows.map((row) => [row.id, row]));
  const metrics = FUNCTIONAL_METRICS.map((metric) => {
    const row = rowMap.get(metric.id);
    return {
      ...metric,
      label: copy[metric.labelKey],
      value: metricValue(row, planId, copy),
      info: row?.info ?? offer.summary,
    };
  });
  const metricClass = 'grid min-h-[4.75rem] min-w-0 grid-cols-[2.5rem_minmax(0,1fr)_2.75rem] items-center gap-2.5 rounded-xl border p-3';
  const metricLabelClass = 'block text-pretty text-[10px] font-semibold leading-[1.25] text-[#525252] [overflow-wrap:anywhere]';
  const metricValueClass = 'mt-1 block whitespace-nowrap font-display text-sm font-bold leading-none tabular-nums text-neutral-900';
  const highlightLabel = offer.highlightLabel ?? copy.platformPriceLabel;
  const highlightValue = offer.highlightValue ?? offer.name;
  const highlightCaption = offer.highlightCaption ?? offer.summary;

  return (
    <article
      data-plan={planId}
      data-recommended={offer.recommended ? 'true' : 'false'}
      data-selected={selected ? 'true' : 'false'}
      aria-labelledby={`${idBase}-name`}
      aria-describedby={`${idBase}-summary`}
      className={cn(
        'pricing-plan-card relative flex h-full min-h-[40rem] min-w-0 flex-col rounded-2xl border bg-white p-5 shadow-sm',
        'transition-[border-color,box-shadow] duration-300 ease-out',
        'hover:shadow-[0_18px_42px_-24px_rgba(68,36,120,0.45)]',
        tone.border,
        selected && 'shadow-[0_18px_46px_-26px_rgba(68,36,120,0.5)] ring-1 ring-current/15',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute end-4 top-4 h-11 w-11 border',
          tone.panel,
          tone.shape,
        )}
      />

      {offer.recommended ? (
        <span
          className={cn(
            'pricing-plan-card__recommended absolute -top-3 start-5 z-10 rounded-full border bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm',
            tone.badge,
          )}
        >
          {copy.recommendedLabel}
        </span>
      ) : null}

      <header className="min-w-0 pe-12">
        <p id={`${idBase}-name`} className={cn('pricing-plan-card__name font-display text-lg font-bold', tone.text)}>
          {offer.name}
        </p>
        <p id={`${idBase}-summary`} className="sr-only">{offer.summary}</p>
      </header>

      <div className="pricing-plan-card__price mt-5 flex min-w-0 items-baseline gap-2">
        <strong
          className={cn(
            'stat-number whitespace-nowrap tabular-nums text-neutral-900',
            offer.contactOnly ? 'text-xl' : 'text-4xl',
          )}
        >
          {price ? formatPrice(price) : offer.billingLabel}
        </strong>
        {price?.unit ? <span className="whitespace-nowrap text-xs text-[#525252]">{price.unit}</span> : null}
      </div>

      <div className="mt-5 grid gap-3">
        {metrics.map((metric, index) => (
          <div
            key={metric.id}
            data-pricing-metric={metric.id}
            className={cn(metricClass, index === 0 ? tone.panel : 'border-[#e5e5e5]')}
          >
            <span
              className={cn(
                'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                index === 0 ? 'bg-white shadow-sm ring-1 ring-black/5' : tone.soft,
                tone.text,
              )}
            >
              <Ico name={index === 0 ? offer.icon ?? metric.icon : metric.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <span className={metricLabelClass}>{metric.label}</span>
              <strong className={metricValueClass}>{metric.value}</strong>
            </div>
            <PricingInfo
              className={cn('justify-self-end', tone.info)}
              label={`${metric.label}: ${metric.value}`}
              text={metric.info}
            />
          </div>
        ))}
      </div>

      <div
        className={cn(
          'relative isolate mt-3 grid min-h-24 min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-3 overflow-hidden rounded-xl border p-3 pe-8 text-neutral-900',
          tone.panel,
          'shadow-[0_12px_28px_-26px_rgba(15,23,42,0.45)]',
        )}
      >
        <span className={cn('relative inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/8', tone.text)}>
          <span aria-hidden="true" className="absolute inset-1.5 rounded-lg border border-current opacity-20" />
          <Ico name={offer.highlightIcon ?? 'solar:stars-minimalistic-bold-duotone'} className="relative size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-extrabold leading-[1.2] text-[#525252]">{highlightLabel}</span>
          <strong className="mt-1 block text-pretty font-display text-sm font-bold leading-tight text-neutral-900">{highlightValue}</strong>
          <span className="mt-1 inline-flex max-w-full rounded-full bg-white/80 px-2 py-1 text-pretty text-[10px] font-bold leading-[1.2] text-[#525252] ring-1 ring-black/5">{highlightCaption}</span>
        </span>
        <Ico name="solar:check-circle-bold-duotone" className={cn('absolute end-2.5 top-2.5 size-4 opacity-70', tone.text)} aria-hidden="true" />
      </div>

      <div className="mt-auto pt-4">
        <Button
          id={`${idBase}-status`}
          type="button"
          aria-pressed={selected}
          data-plan={planId}
          className={cn(
            'pricing-plan-card__action min-h-11 w-full rounded-full border text-xs font-semibold',
            'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out active:scale-[0.96]',
            offer.recommended ? tone.selectedButton : tone.outlineButton,
          )}
          onClick={() => onSelect(offer.id)}
        >
          {selected ? copy.selectedPlanLabel : copy.selectPlanLabel}
        </Button>
      </div>
    </article>
  );
}
