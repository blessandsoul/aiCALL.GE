'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

/* =========================================================================
   CallConsentGate: three questions that decide whether we are allowed to call
   this list at all.

   Georgian personal data law requires written consent for direct marketing with
   no exceptions, and opt-outs inside seven working days. So a bought list is not
   a product we can sell, and the honest thing is to say so before the prospect
   pays us.

   No competitor will build this, because it disqualifies business. That is
   precisely why it converts the serious buyer: a clinic that has thought about
   the regulator recognizes the only vendor who has too.
   ========================================================================= */

type Verdict = 'green' | 'amber' | 'red';

export function CallConsentGate() {
  const t = useTranslations('product.consent');
  const [own, setOwn] = useState<boolean | null>(null);
  const [existing, setExisting] = useState<boolean | null>(null);
  const [written, setWritten] = useState<boolean | null>(null);

  const answered = own !== null && existing !== null && written !== null;

  const verdict: Verdict | null = useMemo(() => {
    if (!answered) return null;
    // A list we do not own is a bought list. Written consent is the only door, and a
    // bought list does not have it.
    if (!own) return written ? 'amber' : 'red';
    // Our own customers, about something they already have with us: performance of an
    // existing relationship, and clean.
    if (existing) return 'green';
    // Our own customers, but we want to sell them something new. That is direct
    // marketing, and it needs written consent.
    return written ? 'green' : 'amber';
  }, [answered, own, existing, written]);

  const tone: Record<Verdict, { ring: string; dot: string; text: string }> = {
    green: { ring: 'shadow-[0_0_0_1px_#10b981]', dot: 'bg-[#10b981]', text: 'text-[#065f46]' },
    amber: { ring: 'shadow-[0_0_0_1px_#f59e0b]', dot: 'bg-[#f59e0b]', text: 'text-[#78350f]' },
    red: { ring: 'shadow-[0_0_0_1px_#ef4444]', dot: 'bg-[#ef4444]', text: 'text-[#7f1d1d]' },
  };

  const reset = () => {
    setOwn(null);
    setExisting(null);
    setWritten(null);
  };

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl lg:ml-0 lg:mr-auto">
        <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
          {t('eyebrow')}
        </span>
        <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
          {t('heading')}
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#525252]">
          {t('subtitle')}
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <Question
            label={t('q1')}
            yes={t('q1yes')}
            no={t('q1no')}
            value={own}
            onChange={setOwn}
          />
          <Question
            label={t('q2')}
            yes={t('q2yes')}
            no={t('q2no')}
            value={existing}
            onChange={setExisting}
          />
          <Question
            label={t('q3')}
            yes={t('q3yes')}
            no={t('q3no')}
            value={written}
            onChange={setWritten}
          />
        </div>

        {verdict && (
          <div
            className={cn(
              'mt-8 rounded-2xl bg-white p-6',
              tone[verdict].ring,
              'transition-[transform,opacity] duration-200 ease-out',
            )}
            style={{ transform: 'scale(1)', opacity: 1 }}
            role="status"
          >
            <div className="flex items-start gap-3">
              <span
                className={cn('mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full', tone[verdict].dot)}
                aria-hidden="true"
              />
              <div>
                <p className={cn('font-display text-lg font-extrabold', tone[verdict].text)}>
                  {t(verdict)}
                </p>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-[#404040]">
                  {t(`${verdict}Body`)}
                </p>
              </div>
            </div>

            <p className="mt-5 border-t border-[#e5e5e5] pt-4 text-[12px] leading-relaxed text-[#737373]">
              {t('law')}
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-medium text-neutral-900/70 transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] md:hover:text-neutral-900"
            >
              {t('reset')}
            </button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

function Question({
  label,
  yes,
  no,
  value,
  onChange,
}: {
  label: string;
  yes: string;
  no: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <fieldset className="rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
      <legend className="px-1 text-[15px] font-semibold text-neutral-900">{label}</legend>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
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
        'min-h-[44px] rounded-xl px-4 py-2.5 text-left text-[14px] leading-snug',
        'transition-[transform,background-color,box-shadow] duration-150 ease-out',
        'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
        on
          ? 'bg-[color-mix(in_srgb,var(--brand)_14%,white)] font-semibold text-neutral-900 shadow-[0_0_0_1px_var(--brand)]'
          : 'bg-white text-[#525252] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:hover:bg-[#f4f4f4]',
      )}
    >
      {children}
    </button>
  );
}
