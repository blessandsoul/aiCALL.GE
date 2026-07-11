'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/layout/SectionContainer';

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

export function CallCostSlider() {
  const t = useTranslations('product.cost');
  const [contacts, setContacts] = useState(400);
  const [minutes, setMinutes] = useState(2);
  const [wage, setWage] = useState(14);

  const totalMinutes = contacts * minutes;
  const humanHours = totalMinutes / 60;
  const humanCost = humanHours * wage;
  const agentCost = totalMinutes * AGENT_GEL_PER_MIN;

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(280px,400px)_1fr] lg:gap-16">
        <div>
          <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-col gap-7">
            <Slider
              label={t('contacts')}
              value={contacts}
              min={50}
              max={4000}
              step={50}
              onChange={setContacts}
            />
            <Slider
              label={t('minutes')}
              value={minutes}
              min={1}
              max={6}
              step={1}
              onChange={setMinutes}
            />
            <Slider
              label={t('wage')}
              value={wage}
              min={6}
              max={40}
              step={1}
              onChange={setWage}
            />
          </div>
        </div>

        {/* The two columns, deliberately unequal: the human side is the one that hurts. */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-[#fafafa] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-8">
            <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
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
            className="rounded-2xl p-6 md:p-8"
            style={{ background: 'color-mix(in srgb, var(--brand) 12%, white)' }}
          >
            <span className="text-[12px] uppercase tracking-wide text-neutral-900/50">
              {t('agent')}
            </span>
            <p className="mt-3 font-display text-5xl font-extrabold tabular-nums leading-none text-neutral-900 md:text-6xl">
              {fmt(agentCost)}
              <span className="ml-2 text-2xl font-bold text-neutral-900/50">GEL</span>
            </p>
            <p className="mt-2 text-sm tabular-nums text-neutral-900/50">
              {fmt(totalMinutes)} min, {t('perMonth')}
            </p>
          </div>

          <p className="text-[12px] leading-relaxed text-[#737373]">{t('note')}</p>
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
        <span className="font-display text-lg font-extrabold tabular-nums text-[var(--brand)]">
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
        className="mt-3 h-10 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#e5e5e5] [&::-webkit-slider-thumb]:mt-[-7px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--brand)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-out active:[&::-webkit-slider-thumb]:scale-[0.96] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--brand)] [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[#e5e5e5]"
      />
    </label>
  );
}
