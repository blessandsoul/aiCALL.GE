'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';

/* =========================================================================
   CallCostSlider: his inputs, his number.

   Every US vendor in this category puts a "hours saved" calculator on the page and
   fills it with an American wage. A Georgian hour is worth a fraction of that, so a
   borrowed calculator produces a lie. This one asks the owner what an administrator
   actually costs him and does the arithmetic in front of him. Nothing is asserted,
   so nothing can be wrong.

   The agent figure is the only thing we supply, and it is described as our quote for
   a campaign of this size, not as a market average.
   ========================================================================= */

/* Our own quoted rate for a campaign, in GEL per minute of connected call. It is our
   price, not a claim about anyone else's, and the note under the widget says so. */
const AGENT_GEL_PER_MIN = 0.45;
const CYCLE_MS = 6_500;

export function CallCostSlider() {
  const t = useTranslations('product.cost');
  const reducedMotion = useReducedMotion();
  const [contacts, setContacts] = useState(400);
  const [minutes, setMinutes] = useState(2);
  const [wage, setWage] = useState(14);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const userOwnedRef = useRef(false);
  const sampleTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stop = useCallback(() => {
    sampleTimers.current.forEach(clearTimeout);
    sampleTimers.current = [];
  }, []);

  const reset = useCallback(() => {
    stop();
    if (userOwnedRef.current) return;
    setContacts(100);
    setMinutes(1);
    setWage(10);
  }, [stop]);

  const showFinal = useCallback(() => {
    stop();
    if (userOwnedRef.current) return;
    setContacts(400);
    setMinutes(2);
    setWage(14);
  }, [stop]);

  const play = useCallback(() => {
    stop();
    if (userOwnedRef.current) return;
    setContacts(100);
    setMinutes(1);
    setWage(10);
    sampleTimers.current = [
      setTimeout(() => {
        if (!userOwnedRef.current) setContacts(250);
      }, 900),
      setTimeout(() => {
        if (!userOwnedRef.current) setMinutes(2);
      }, 3400),
      setTimeout(() => {
        if (!userOwnedRef.current) setWage(14);
      }, 4800),
      setTimeout(() => {
        if (!userOwnedRef.current) setContacts(400);
      }, CYCLE_MS),
    ];
  }, [stop]);

  useEffect(() => {
    const target = rootRef.current;
    if (!target) return;

    const controller = createDemoLoop({
      target,
      reducedMotion: Boolean(reducedMotion),
      threshold: 0.35,
      cycleMs: CYCLE_MS,
      holdMs: 2000,
      play,
      showFinal,
      reset,
      stop,
    });
    controllerRef.current = controller;

    return () => {
      controller.cleanup();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [play, reducedMotion, reset, showFinal, stop]);

  const claimValue = (setValue: (value: number) => void, value: number) => {
    userOwnedRef.current = true;
    controllerRef.current?.takeControl();
    setValue(value);
  };

  const replay = () => {
    userOwnedRef.current = false;
    controllerRef.current?.replay();
  };

  const totalMinutes = contacts * minutes;
  const humanHours = totalMinutes / 60;
  const humanCost = humanHours * wage;
  const agentCost = totalMinutes * AGENT_GEL_PER_MIN;

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));

  return (
    <SectionContainer className="py-16 md:py-24 lg:py-28">
      <div
        ref={rootRef}
        data-landing-demo="showcase"
        data-demo-id="aicall-cost-slider"
        data-demo-detail={`${contacts}-${minutes}-${wage}`}
        aria-live="off"
        className="grid min-w-0 gap-10 lg:grid-cols-[minmax(280px,400px)_1fr] lg:gap-16"
      >
        <div>
          <span className="text-[12px] uppercase tracking-wide text-[#667085]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[33px] tracking-tight text-[#111827] md:text-[36px] md:leading-[40px]">
            {t('heading')}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#4B5563]">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-col gap-7">
            <Slider
              label={t('contacts')}
              value={contacts}
              min={50}
              max={4000}
              step={50}
              onChange={(value) => claimValue(setContacts, value)}
            />
            <Slider
              label={t('minutes')}
              value={minutes}
              min={1}
              max={6}
              step={1}
              onChange={(value) => claimValue(setMinutes, value)}
            />
            <Slider
              label={t('wage')}
              value={wage}
              min={6}
              max={40}
              step={1}
              onChange={(value) => claimValue(setWage, value)}
            />
          </div>
          <button
            type="button"
            onClick={replay}
            data-demo-replay="true"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 whitespace-normal rounded-full bg-[#fafafa] px-5 text-center text-[13px] font-semibold text-[#111827] transition-[background-color,transform] active:scale-[0.96] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] hover:bg-[#f0f0f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
          >
            <Ico name="solar:refresh-bold-duotone" className="size-4" />
            {t('replay')}
          </button>
        </div>

        {/* The two columns, deliberately unequal: the human side is the one that hurts. */}
        <div className="flex flex-col gap-4">
          <div className="min-w-0 rounded-2xl bg-[#fafafa] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-8">
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wide text-[#4B5563]">
              <Ico name="solar:clock-circle-bold-duotone" className="h-4 w-4" />
              {t('human')}
            </span>
            <p className="mt-3 font-display text-5xl font-extrabold tabular-nums leading-none text-neutral-900 md:text-6xl">
              {fmt(humanCost)}
              <span className="ml-2 text-2xl font-bold text-[#737373]">GEL</span>
            </p>
            <p className="mt-2 text-sm tabular-nums text-[#737373]">
              {fmt(humanHours)} {t('hours')}, {t('perMonth')}
            </p>
          </div>

          <div
            className="min-w-0 rounded-2xl p-6 md:p-8"
            style={{ background: 'color-mix(in srgb, var(--brand) 12%, white)' }}
          >
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wide text-[#4B5563]">
              <Ico name="solar:calculator-bold-duotone" className="h-4 w-4" />
              <span>{t('agent')}</span>
              <span className="border-l border-neutral-900/10 pl-2">{t('result')}</span>
            </span>
            <p className="mt-3 font-display text-5xl font-extrabold tabular-nums leading-none text-neutral-900 md:text-6xl">
              {fmt(agentCost)}
              <span className="ml-2 text-2xl font-bold text-[#4B5563]">GEL</span>
            </p>
            <p className="mt-2 text-sm tabular-nums text-[#4B5563]">
              {fmt(totalMinutes)} min, {t('perMonth')}
            </p>
          </div>

          <p data-demo-outcome className="text-[12px] leading-relaxed text-[#4B5563]">{t('note')}</p>
        </div>
      </div>
    </SectionContainer>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[14px] font-medium text-neutral-900">{label}</span>
        <span className="font-display text-lg font-extrabold tabular-nums text-[var(--brand-ink)]">
          {value}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-11 w-full cursor-pointer appearance-none rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#e5e5e5] [&::-webkit-slider-thumb]:mt-[-7px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--brand)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-out active:[&::-webkit-slider-thumb]:scale-[0.96] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--brand)] [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[#e5e5e5]"
      />
    </label>
  );
}
