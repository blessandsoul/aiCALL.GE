'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import { consentVerdict } from './call-consent-model.mjs';

type Verdict = 'green' | 'amber' | 'red';

const TONE: Record<
  Verdict,
  { ring: string; surface: string; iconSurface: string; text: string }
> = {
  green: {
    ring: 'shadow-[0_0_0_1px_#10b981]',
    surface: 'bg-[#f0fdf8]',
    iconSurface: 'bg-[#d1fae5] text-[#047857]',
    text: 'text-[#065f46]',
  },
  amber: {
    ring: 'shadow-[0_0_0_1px_#f59e0b]',
    surface: 'bg-[#fffbeb]',
    iconSurface: 'bg-[#fef3c7] text-[#b45309]',
    text: 'text-[#78350f]',
  },
  red: {
    ring: 'shadow-[0_0_0_1px_#ef4444]',
    surface: 'bg-[#fef2f2]',
    iconSurface: 'bg-[#fee2e2] text-[#b91c1c]',
    text: 'text-[#7f1d1d]',
  },
};

export function CallConsentGate() {
  const t = useTranslations('product.consent');
  const [own, setOwn] = useState<boolean | null>(null);
  const [existing, setExisting] = useState<boolean | null>(null);
  const [written, setWritten] = useState<boolean | null>(null);
  const verdict = consentVerdict({ own, existing, written }) as Verdict | null;

  const reset = () => {
    setOwn(null);
    setExisting(null);
    setWritten(null);
  };

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="min-w-0">
        <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
          {t('eyebrow')}
        </span>
        <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
          {t('heading')}
        </h2>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">
          {t('subtitle')}
        </p>

        <div
          data-consent-questions
          className="mt-10 grid min-w-0 gap-4 lg:grid-cols-3"
        >
          <Question
            number="01"
            icon={<Ico name="solar:users-group-rounded-bold-duotone" className="h-6 w-6" />}
            label={t('q1')}
            yes={t('q1yes')}
            no={t('q1no')}
            value={own}
            onChange={setOwn}
          />
          <Question
            number="02"
            icon={<Ico name="solar:user-check-rounded-bold-duotone" className="h-6 w-6" />}
            label={t('q2')}
            yes={t('q2yes')}
            no={t('q2no')}
            value={existing}
            onChange={setExisting}
          />
          <Question
            number="03"
            icon={<Ico name="solar:pen-new-square-bold-duotone" className="h-6 w-6" />}
            label={t('q3')}
            yes={t('q3yes')}
            no={t('q3no')}
            value={written}
            onChange={setWritten}
          />
        </div>

        {verdict && (
          <div
            data-consent-verdict
            className={cn(
              'mt-5 min-w-0 rounded-3xl p-5 transition-[transform,opacity] duration-200 ease-out md:p-7',
              TONE[verdict].ring,
              TONE[verdict].surface,
            )}
            role="status"
            aria-live="polite"
          >
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
              <span
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                  TONE[verdict].iconSurface,
                )}
              >
                <Ico
                  name={
                    verdict === 'red'
                      ? 'solar:close-circle-bold-duotone'
                      : 'solar:shield-check-bold-duotone'
                  }
                  className="h-6 w-6"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn('font-display text-xl font-extrabold', TONE[verdict].text)}>
                  {t(verdict)}
                </p>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-[#404040]">
                  {t(`${verdict}Body`)}
                </p>
                <p className="mt-5 border-t border-neutral-900/10 pt-4 text-[12px] leading-relaxed text-[#737373]">
                  {t('law')}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#737373]">
                  {t('notice')}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-neutral-900/70 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-[transform,color] duration-150 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 md:hover:text-neutral-900"
              >
                <Ico name="solar:refresh-bold-duotone" className="h-5 w-5" />
                {t('reset')}
              </button>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

function Question({
  number,
  icon,
  label,
  yes,
  no,
  value,
  onChange,
}: {
  number: string;
  icon: React.ReactNode;
  label: string;
  yes: string;
  no: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <fieldset className="flex min-w-0 flex-col rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-6">
      <legend className="sr-only">{label}</legend>
      <div className="flex min-w-0 items-start justify-between gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
          {icon}
        </span>
        <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-neutral-900/35">
          {number}
        </span>
      </div>
      <p className="mt-5 min-w-0 text-pretty text-[16px] font-semibold leading-snug text-neutral-900">
        {label}
      </p>
      <div className="mt-5 grid min-w-0 gap-2">
        <Choice on={value === true} onClick={() => onChange(true)}>
          {yes}
        </Choice>
        <Choice on={value === false} onClick={() => onChange(false)}>
          {no}
        </Choice>
      </div>
    </fieldset>
  );
}

function Choice({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        'min-h-[44px] min-w-0 rounded-xl px-4 py-2.5 text-left text-[14px] leading-snug',
        'transition-[transform,background-color,box-shadow] duration-150 ease-out',
        'active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
        on
          ? 'bg-[color-mix(in_srgb,var(--brand)_14%,white)] font-semibold text-neutral-900 shadow-[0_0_0_1px_var(--brand)]'
          : 'bg-white text-[#525252] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:hover:bg-[#f4f4f4]',
      )}
    >
      {children}
    </button>
  );
}
