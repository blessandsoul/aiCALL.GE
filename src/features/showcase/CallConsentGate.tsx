'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import { consentVerdict } from './call-consent-model.mjs';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';

type Verdict = 'green' | 'amber' | 'red';
const DEMO_CYCLE_MS = 7_000;

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
  const reducedMotion = useReducedMotion();
  const [own, setOwn] = useState<boolean | null>(null);
  const [existing, setExisting] = useState<boolean | null>(null);
  const [written, setWritten] = useState<boolean | null>(null);
  const [demoStep, setDemoStep] = useState(0);
  const [manual, setManual] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const demoTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const verdict = consentVerdict({ own, existing, written }) as Verdict | null;

  const stopDemo = useCallback(() => {
    demoTimers.current.forEach(clearTimeout);
    demoTimers.current = [];
  }, []);

  const resetDemo = useCallback(() => {
    stopDemo();
    setDemoStep(0);
  }, [stopDemo]);

  const playDemo = useCallback(() => {
    resetDemo();
    demoTimers.current = [
      setTimeout(() => setDemoStep(1), 500),
      setTimeout(() => setDemoStep(2), 2_500),
      setTimeout(() => setDemoStep(3), 4_600),
      setTimeout(() => setDemoStep(4), DEMO_CYCLE_MS),
    ];
  }, [resetDemo]);

  const showFinal = useCallback(() => {
    stopDemo();
    setDemoStep(4);
  }, [stopDemo]);

  useEffect(() => {
    const target = rootRef.current;
    if (!target) return;

    const controller = createDemoLoop({
      target,
      reducedMotion: Boolean(reducedMotion),
      threshold: 0.35,
      cycleMs: DEMO_CYCLE_MS,
      holdMs: 2_000,
      play: playDemo,
      showFinal,
      reset: resetDemo,
      stop: stopDemo,
    });
    controllerRef.current = controller;

    return () => {
      controller.cleanup();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [playDemo, reducedMotion, resetDemo, showFinal, stopDemo]);

  const choose = (setter: (value: boolean) => void, value: boolean) => {
    controllerRef.current?.takeControl();
    setManual(true);
    setter(value);
  };

  const replay = () => {
    setManual(false);
    setOwn(null);
    setExisting(null);
    setWritten(null);
    controllerRef.current?.replay();
  };

  const demoCopyKey = demoStep >= 4 ? 'outcome' : `demoStep${demoStep}`;
  const displayedVerdict: Verdict | null = verdict ?? (!manual && demoStep >= 4 ? 'green' : null);

  return (
    <SectionContainer className="py-16 md:py-24 lg:py-28">
      <div
        ref={rootRef}
        data-landing-demo="showcase"
        data-demo-id="aicall-consent-gate"
        data-demo-detail={manual ? `manual-${verdict ?? 'incomplete'}` : `illustrative-${demoStep}`}
        aria-live="off"
        className="min-w-0"
      >
        <span className="text-[12px] uppercase tracking-wide text-[#667085]">
          {t('eyebrow')}
        </span>
        <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[33px] tracking-tight text-[#111827] md:text-[36px] md:leading-[40px]">
          {t('heading')}
        </h2>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#4B5563]">
          {t('subtitle')}
        </p>

        <div className="mt-6 flex min-w-0 flex-col gap-3 rounded-2xl bg-[#F9FAFB] p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0" aria-live="off">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#667085]">
              {t('demoLabel')}
            </span>
            <p className="mt-1 min-h-[68px] break-words text-[14px] font-semibold leading-relaxed text-[#111827] sm:min-h-0">
              {t(demoCopyKey)}
            </p>
          </div>
          <button
            type="button"
            onClick={replay}
            data-demo-replay="true"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-normal rounded-xl bg-white px-4 text-center text-[13px] font-semibold text-[#111827] shadow-[0_0_0_1px_rgba(0,0,0,0.1)] transition-transform active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
          >
            <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
            {t('replay')}
          </button>
        </div>

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
            illustrative={!manual && demoStep === 1}
            onChange={(value) => choose(setOwn, value)}
          />
          <Question
            number="02"
            icon={<Ico name="solar:user-check-rounded-bold-duotone" className="h-6 w-6" />}
            label={t('q2')}
            yes={t('q2yes')}
            no={t('q2no')}
            value={existing}
            illustrative={!manual && demoStep === 2}
            onChange={(value) => choose(setExisting, value)}
          />
          <Question
            number="03"
            icon={<Ico name="solar:pen-new-square-bold-duotone" className="h-6 w-6" />}
            label={t('q3')}
            yes={t('q3yes')}
            no={t('q3no')}
            value={written}
            illustrative={!manual && demoStep === 3}
            onChange={(value) => choose(setWritten, value)}
          />
        </div>

        <div
          data-consent-verdict
          data-demo-outcome
          className={cn(
            'mt-5 min-w-0 rounded-3xl p-5 transition-[background-color,box-shadow] duration-200 ease-out md:p-7',
            displayedVerdict ? [TONE[displayedVerdict].ring, TONE[displayedVerdict].surface] : 'bg-[#F7F8FA] shadow-[0_0_0_1px_rgba(17,24,39,0.08)]',
          )}
          role="status"
          aria-live={manual ? 'polite' : 'off'}
        >
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
            <span
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                displayedVerdict ? TONE[displayedVerdict].iconSurface : 'bg-white text-[var(--brand-ink)] shadow-[0_0_0_1px_rgba(17,24,39,0.08)]',
              )}
            >
              <Ico
                name={displayedVerdict === 'red' ? 'solar:close-circle-bold-duotone' : 'solar:shield-check-bold-duotone'}
                className="h-6 w-6"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className={cn('font-display text-xl font-extrabold', displayedVerdict ? TONE[displayedVerdict].text : 'text-[#111827]')}>
                {displayedVerdict ? t(displayedVerdict) : t('demoLabel')}
              </p>
              <p className="mt-2 min-h-[168px] text-pretty text-[15px] leading-relaxed text-[#404040] sm:min-h-[120px] lg:min-h-[72px]">
                {displayedVerdict ? t(`${displayedVerdict}Body`) : t(demoCopyKey)}
              </p>
              <p className="mt-5 border-t border-neutral-900/10 pt-4 text-[12px] leading-relaxed text-[#667085]">
                {t('law')}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-[#667085]">
                {t('notice')}
              </p>
            </div>
          </div>
        </div>
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
  illustrative,
  onChange,
}: {
  number: string;
  icon: React.ReactNode;
  label: string;
  yes: string;
  no: string;
  value: boolean | null;
  illustrative: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <fieldset
      className={cn(
        'flex min-w-0 flex-col rounded-2xl bg-[#fafafa] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] transition-[box-shadow,transform] md:p-6',
        illustrative && 'translate-y-[-2px] shadow-[0_0_0_2px_var(--brand),0_14px_34px_-24px_var(--brand)]',
      )}
    >
      <legend className="sr-only">{label}</legend>
      <div className="flex min-w-0 items-start justify-between gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--brand)] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
          {icon}
        </span>
        <span className="font-mono text-[12px] font-semibold tracking-[0.16em] text-[#737373]">
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
        'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
        on
          ? 'bg-[color-mix(in_srgb,var(--brand)_14%,white)] font-semibold text-neutral-900 shadow-[0_0_0_1px_var(--brand)]'
          : 'bg-white text-[#4B5563] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:hover:bg-[#f4f4f4]',
      )}
    >
      {children}
    </button>
  );
}
