'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { cn } from '@/lib/utils';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';

/* =========================================================================
   HeroProof, aiCALL: a call happening, and a row turning green.

   Five seconds, no reading. The phone rings, the waveform moves, the customer says one word in
   Georgian, and a line in a spreadsheet flips from waiting to confirmed. That is the entire
   product: he is not buying a robot, he is buying tomorrow's list with the answers already in it.

   Everything here is a scripted replay driven by a timer. No audio, no model, no network. The
   full demo with the real Georgian recording lives further down the page; this is the frame that
   makes him scroll to it.
   ========================================================================= */

const ROWS = [
  { name: 'ნინო ბერიძე', at: '10:30' },
  { name: 'გიორგი ხარაზი', at: '11:15' },
  { name: 'ანა ცქიტიშვილი', at: '14:00' },
  { name: 'დავით მამულაშვილი', at: '15:45' },
];

/* The row the call is about, and the beat at which it confirms. */
const ACTIVE = 2;
const CYCLE_MS = 6_800;

export function HeroProof() {
  const t = useTranslations('product.proof');
  const reducedMotion = useReducedMotion();
  const [beat, setBeat] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const storyTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stop = useCallback(() => {
    storyTimers.current.forEach(clearTimeout);
    storyTimers.current = [];
  }, []);

  const reset = useCallback(() => setBeat(0), []);

  const play = useCallback(() => {
    stop();
    setBeat(0);
    storyTimers.current = [
      setTimeout(() => setBeat(1), 1600),
      setTimeout(() => setBeat(2), 3800),
      setTimeout(() => setBeat(3), CYCLE_MS),
    ];
  }, [stop]);

  const showFinal = useCallback(() => {
    stop();
    setBeat(3);
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

  const replay = () => controllerRef.current?.replay();

  const ringing = beat === 0;
  const talking = beat === 1 || beat === 2;
  const confirmed = beat >= 2;

  return (
    <div ref={rootRef} className="min-w-0 rounded-3xl bg-white/70 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_28px_60px_-40px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-6">
      {/* the call */}
      <div className="rounded-2xl bg-[#0e0e11] p-4 md:p-5">
        <div className="flex items-center gap-3">
          <motion.span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ background: 'var(--brand)' }}
            animate={reducedMotion ? {} : { scale: ringing ? [1, 1.07, 1] : 1 }}
            transition={{ duration: 0.6, repeat: ringing ? Infinity : 0, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <Ico name="solar:phone-bold-duotone" className="h-[18px] w-[18px] text-white" />
          </motion.span>

          <div className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold text-white">
              {ROWS[ACTIVE].name}
            </span>
            <span className="block text-[11px] text-white/40">
              {ringing ? t('ringing') : confirmed ? t('done') : t('speaking')}
            </span>
          </div>

          {/* the waveform. transform only, so nothing here reflows. */}
          <span className="flex h-8 items-center gap-[2px]" aria-hidden="true">
            {[4, 8, 5, 10, 6, 9, 4, 7].map((h, i) => (
              <motion.span
                key={i}
                className="w-[2.5px] origin-center rounded-full"
                style={{ height: 26, background: talking ? 'var(--brand)' : 'rgba(255,255,255,0.16)' }}
                animate={
                  reducedMotion || !talking
                    ? { scaleY: 0.14 }
                    : { scaleY: [0.16, h / 10, 0.22, h / 12, 0.16] }
                }
                transition={{ duration: 0.9, repeat: talking ? Infinity : 0, delay: i * 0.06, ease: 'easeInOut' }}
              />
            ))}
          </span>
        </div>

        {/* one line of Georgian, so he hears it with his eyes */}
        <div className="mt-3.5 min-h-[42px]">
          <motion.p
            key={beat}
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
              'rounded-xl px-3 py-2 text-[13px] leading-snug',
              beat === 1
                ? 'bg-white/[0.07] text-white'
                : beat >= 2
                  ? 'ml-auto max-w-[70%] bg-white/[0.03] text-right text-white/75'
                  : 'bg-white/[0.03] text-white/40',
            )}
          >
            {beat === 0 && t('line0')}
            {beat === 1 && t('line1')}
            {beat >= 2 && t('line2')}
          </motion.p>
        </div>
      </div>

      {/* the sheet. THIS is the thing he is buying. */}
      <div className="mt-4">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-900/40">
            {t('sheet')}
          </span>
          <span className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start">
            <span className="font-mono text-[11px] tabular-nums text-neutral-900/35">
              {confirmed ? '3' : '2'}/4 {t('confirmedShort')}
            </span>
            <button
              type="button"
              onClick={replay}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 text-[12px] font-semibold text-neutral-900/55 transition-[transform,color] duration-150 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] md:hover:text-neutral-900"
            >
              <Ico name="solar:refresh-bold-duotone" className="h-4 w-4" />
              {t('replay')}
            </button>
          </span>
        </div>

        <ul className="flex flex-col gap-1.5">
          {ROWS.map((r, i) => {
            const done = i === 0 || i === 1 || (i === ACTIVE && confirmed);
            const live = i === ACTIVE && !confirmed;
            return (
              <li
                key={r.name}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-300 ease-out',
                  live ? 'bg-[color-mix(in_srgb,var(--brand)_13%,white)]' : 'bg-white/70',
                )}
              >
                <span className="font-mono text-[11px] tabular-nums text-neutral-900/35">{r.at}</span>
                <span className="min-w-0 flex-1 truncate text-[12.5px] text-neutral-900">{r.name}</span>
                <motion.span
                  initial={false}
                  animate={
                    done
                      ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
                      : { scale: 0.85, opacity: 0.4, filter: 'blur(0px)' }
                  }
                  transition={{ type: 'spring', duration: 0.34, bounce: 0 }}
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                    done ? 'bg-[#10b981] text-white' : 'bg-neutral-900/8 text-neutral-900/35',
                  )}
                  aria-hidden="true"
                >
                  <Ico
                    name={done ? 'solar:check-circle-bold-duotone' : 'solar:clock-circle-bold-duotone'}
                    className="h-4 w-4"
                  />
                </motion.span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
