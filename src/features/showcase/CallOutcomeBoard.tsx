'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';

/* =========================================================================
   CallOutcomeBoard: shows the buyer the artifact he is purchasing.

   He is not buying a robot, he is buying a four column sheet he can act on before
   he opens tomorrow. So the widget replays a campaign and sorts calls into those
   four columns in front of him.

   THE NUMBERS ARE ILLUSTRATIVE AND THE SECTION SAYS SO, twice: in the subtitle and
   again under the board. We have not run a Georgian campaign, so we have no real
   numbers, and inventing one here would be the exact lie this whole page is built
   to avoid.
   ========================================================================= */

const TOTAL = 100;
const STARTER_COUNT = 16;
/* A plausible split, not a claim. Deliberately not round: real campaigns are messy. */
const SPLIT = { confirmed: 47, moved: 16, noanswer: 31, human: 6 };
const TICK_MS = 60;
const CYCLE_MS = 6_000;

type Bucket = keyof typeof SPLIT;
const ORDER: Bucket[] = ['confirmed', 'moved', 'noanswer', 'human'];

/* The deterministic sequence of outcomes, shuffled once at module load so the replay
   does not look like four neat blocks. No Math.random at render: same every visit. */
const SEQUENCE: Bucket[] = (() => {
  const flat: Bucket[] = [];
  for (const b of ORDER) for (let i = 0; i < SPLIT[b]; i++) flat.push(b);
  // A fixed permutation: step through with a coprime stride.
  const out: Bucket[] = [];
  const stride = 37;
  for (let i = 0; i < flat.length; i++) out.push(flat[(i * stride) % flat.length]);
  return out;
})();

const TONE: Record<Bucket, string> = {
  confirmed: '#10b981',
  moved: '#f59e0b',
  noanswer: '#a3a3a3',
  human: '#3b82f6',
};

const ICON: Record<Bucket, string> = {
  confirmed: 'solar:check-circle-bold-duotone',
  moved: 'solar:calendar-mark-bold-duotone',
  noanswer: 'solar:phone-bold-duotone',
  human: 'solar:users-group-rounded-bold-duotone',
};

export function CallOutcomeBoard() {
  const t = useTranslations('product.board');
  const reducedMotion = useReducedMotion();
  // A decision board should already communicate a result before autoplay starts.
  // Sixteen deterministic illustrative calls seed every bucket, so rewind never
  // flashes four zeroes or an empty grid.
  const [n, setN] = useState(STARTER_COUNT);
  const [running, setRunning] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const run = useCallback(() => {
    clear();
    setN(STARTER_COUNT);
    setRunning(true);
    timer.current = setInterval(() => {
      setN((prev) => {
        const next = prev + 1;
        if (next >= TOTAL) {
          clear();
          setRunning(false);
          return TOTAL;
        }
        return next;
      });
    }, TICK_MS);
  }, [clear]);

  const stop = useCallback(() => {
    clear();
    setRunning(false);
  }, [clear]);

  const reset = useCallback(() => {
    stop();
    setN(STARTER_COUNT);
  }, [stop]);

  const showFinal = useCallback(() => {
    stop();
    setN(TOTAL);
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
      play: run,
      showFinal: showFinal,
      reset,
      stop,
    });
    controllerRef.current = controller;

    return () => {
      controller.cleanup();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [reducedMotion, reset, run, showFinal, stop]);

  const replay = () => controllerRef.current?.replay();

  const counts = ORDER.reduce<Record<Bucket, number>>(
    (acc, b) => {
      acc[b] = SEQUENCE.slice(0, n).filter((x) => x === b).length;
      return acc;
    },
    { confirmed: 0, moved: 0, noanswer: 0, human: 0 },
  );

  const done = n >= TOTAL;

  return (
    <SectionContainer className="py-16 md:py-24 lg:py-28">
      <div
        ref={rootRef}
        data-landing-demo="showcase"
        data-demo-id="aicall-outcome-board"
        data-demo-detail={done ? 'complete' : running ? `sorting-${n}` : 'ready'}
        aria-live="off"
        className="grid min-w-0 gap-10 lg:grid-cols-[1fr_minmax(300px,420px)] lg:gap-16"
      >
        {/* LEFT: the board */}
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ORDER.map((b) => (
              <div
                key={b}
                className="min-w-0 rounded-2xl bg-[#fafafa] p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
              >
                <span className="flex items-center gap-2">
                  <Ico name={ICON[b]} className="h-4 w-4" style={{ color: TONE[b] }} />
                  <span className="text-[12px] uppercase tracking-wide text-[#667085]">
                    {t(b)}
                  </span>
                </span>
                <div className="relative mt-3 h-9 min-w-[3ch] overflow-hidden font-display text-4xl font-extrabold tabular-nums leading-none text-neutral-900">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={counts[b]}
                      initial={reducedMotion ? false : { y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-100%' }}
                      transition={{ duration: reducedMotion ? 0 : 0.18, ease: 'easeOut' }}
                      className="absolute inset-0 block min-w-[3ch]"
                    >
                      {counts[b]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* The 100 calls, as dots. Only opacity and colour change, so nothing reflows. */}
          <div className="mt-6 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5">
            {SEQUENCE.map((b, i) => {
              const lit = i < n;
              return (
                <span
                  key={i}
                  className="aspect-square rounded-[3px] transition-[opacity,background-color] duration-200 ease-out"
                  style={{
                    background: lit ? TONE[b] : '#e5e5e5',
                    opacity: lit ? 1 : 0.5,
                  }}
                  aria-hidden="true"
                />
              );
            })}
          </div>

          <p data-demo-outcome className="mt-5 text-[12px] leading-relaxed text-[#667085]">{t('note')}</p>
        </div>

        {/* RIGHT: the copy + the trigger */}
        <div className="order-1 lg:order-2">
          <span className="text-[12px] uppercase tracking-wide text-[#667085]">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[33px] tracking-tight text-[#111827] md:text-[36px] md:leading-[40px]">
            {t('heading')}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#4B5563]">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={replay}
              data-demo-replay="true"
              className={cn(
                'inline-flex min-h-[48px] w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white sm:w-auto',
                'transition-[transform,filter] duration-150 ease-out',
                'active:scale-[0.96] md:hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
              )}
              style={{ background: 'var(--brand-cta, var(--brand))' }}
            >
              <Ico name="solar:refresh-bold-duotone" className="mr-2 h-5 w-5" />
              {t('replay')}
            </button>

            <span className="inline-flex min-h-[44px] w-full min-w-0 items-center gap-2 text-sm tabular-nums text-[#667085] sm:w-auto sm:flex-1">
              {done && <Ico name="solar:check-circle-bold-duotone" className="h-5 w-5 text-[#10b981]" />}
              {n} / {TOTAL} {done ? t('result') : running ? t('running') : t('called')}
            </span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
