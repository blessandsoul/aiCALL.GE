'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';
import { Ico } from '@/components/common/Ico';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';

/* =========================================================================
   CallBargeIn: the three second difference between a voice agent and a robocall.

   A robocall finishes its sentence over the top of you. This one stops mid word.
   That single behaviour is what makes an owner stop being embarrassed to call his
   own customers with a machine, so it gets its own section and a big red button.

   No audio: the bars are a CSS animation and the speech is text. Interrupting is
   real though. Press it mid sentence and the agent genuinely stops where it is.
   ========================================================================= */

const SCRIPT = 'გამარჯობა, AI აგენტი ვარ კლინიკიდან. ხვალ ორ საათზე გელოდებით და მინდოდა დამედასტურებინა, რომ მოხვალთ, თუ სხვა დროზე გადავიტანოთ.';
const WORDS = SCRIPT.split(' ');
const WORD_MS = 260;
const BARS = 28;
const CYCLE_MS = 7_000;
const STATUS_KEYS = ['speaking', 'interrupted', 'recoveryStatus', 'result'] as const;

type Phase = 'idle' | 'speaking' | 'interrupted' | 'recovery' | 'result';

export function CallBargeIn() {
  const t = useTranslations('product.barge');
  const reducedMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const wordTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const storyTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    if (wordTimer.current) clearInterval(wordTimer.current);
    wordTimer.current = null;
    storyTimers.current.forEach(clearTimeout);
    storyTimers.current = [];
  }, []);

  const playStory = useCallback(() => {
    clear();
    setRunId((previous) => previous + 1);
    setI(0);
    setPhase('speaking');
    wordTimer.current = setInterval(() => {
      setI((previous) => Math.min(previous + 1, WORDS.length));
    }, WORD_MS);

    storyTimers.current = [
      setTimeout(() => {
        if (wordTimer.current) clearInterval(wordTimer.current);
        wordTimer.current = null;
        setPhase('interrupted');
      }, 3000),
      setTimeout(() => setPhase('recovery'), 4600),
      setTimeout(() => setPhase('result'), 6800),
    ];
  }, [clear]);

  const stop = useCallback(() => clear(), [clear]);

  const reset = useCallback(() => {
    clear();
    setI(0);
    setPhase('idle');
  }, [clear]);

  const showFinal = useCallback(() => {
    clear();
    setI(Math.min(WORDS.length, 11));
    setPhase('result');
  }, [clear]);

  const interrupt = useCallback(() => {
    controllerRef.current?.takeControl();
    clear();
    setPhase('interrupted');
    storyTimers.current = [
      setTimeout(() => setPhase('recovery'), 800),
      setTimeout(() => setPhase('result'), 1800),
    ];
  }, [clear]);

  useEffect(() => {
    const target = rootRef.current;
    if (!target) return;

    const controller = createDemoLoop({
      target,
      reducedMotion: Boolean(reducedMotion),
      threshold: 0.35,
      cycleMs: CYCLE_MS,
      holdMs: 2000,
      play: playStory,
      showFinal,
      reset,
      stop,
    });
    controllerRef.current = controller;

    return () => {
      controller.cleanup();
      if (controllerRef.current === controller) controllerRef.current = null;
    };
  }, [playStory, reducedMotion, reset, showFinal, stop]);

  const replay = () => controllerRef.current?.replay();

  const speaking = phase === 'speaking';
  const interrupted = phase === 'interrupted' || phase === 'recovery' || phase === 'result';
  const recovering = phase === 'recovery' || phase === 'result';
  const statusKey = phase === 'result'
    ? 'result'
    : phase === 'recovery'
      ? 'recoveryStatus'
      : phase === 'interrupted'
        ? 'interrupted'
        : 'speaking';

  return (
    <SectionContainer className="py-16 md:py-24 lg:py-28">
      <div
        ref={rootRef}
        data-landing-demo="showcase"
        data-demo-id="aicall-barge-in"
        data-demo-detail={`${phase}-${i}`}
        data-demo-stage={`${runId}-${phase}-${i}`}
        aria-live="off"
        className="min-w-0 rounded-3xl bg-[#0e0e11] p-6 md:p-12"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center lg:gap-16">
          <div>
            <span className="text-[12px] uppercase tracking-wide text-[#A3A3A3]">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[33px] tracking-tight text-white md:text-[36px] md:leading-[40px]">
              {t('heading')}
            </h2>
            <p className="mt-3 max-w-lg text-pretty text-[15px] leading-relaxed text-[#D1D5DB]">
              {t('subtitle')}
            </p>

            {/* The waveform. Pure transform, so it never triggers layout. */}
            <div className="mt-8 flex h-16 items-center gap-[3px]" aria-hidden="true">
              {Array.from({ length: BARS }, (_, b) => (
                <span
                  key={b}
                  className="w-[3px] origin-center rounded-full transition-transform duration-150 ease-out"
                  style={{
                    height: '100%',
                    background: speaking ? 'var(--brand)' : 'rgba(255,255,255,0.15)',
                    transform: `scaleY(${
                      speaking
                        ? 0.18 + 0.8 * Math.abs(Math.sin((b + i * 3) * 0.7))
                        : 0.1
                    })`,
                  }}
                />
              ))}
            </div>

            <div className="mt-6 min-h-[156px] rounded-2xl bg-white/[0.06] px-5 py-4 sm:min-h-[128px]">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-[#A3A3A3]">
                {t(phase === 'result' ? 'result' : phase === 'recovery' ? 'recoveryStatus' : phase === 'interrupted' ? 'interrupted' : 'speaking')}
              </span>
              <p className="text-[15px] leading-relaxed text-white">
                {WORDS.slice(0, i).join(' ')}
                {phase === 'interrupted' && (
                  <span className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-[var(--brand)]" />
                )}
              </p>
            </div>

            <div
              data-barge-state-stack
              className="relative mt-4 grid grid-cols-[minmax(0,1fr)] grid-rows-[1fr]"
            >
              <div
                aria-hidden={interrupted}
                className={cn(
                  'col-start-1 row-start-1 flex min-h-[220px] items-center rounded-2xl bg-white/[0.035] px-5 py-6 transition-[opacity,transform] duration-300 ease-out',
                  interrupted
                    ? 'pointer-events-none invisible translate-y-1 opacity-0'
                    : 'visible translate-y-0 opacity-100',
                )}
              >
                <p className="flex items-start gap-3 text-[13px] leading-relaxed text-[#A3A3A3]">
                  <Ico name="solar:chat-round-dots-bold-duotone" className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" />
                  {t('note')}
                </p>
              </div>

              <div
                aria-hidden={!interrupted}
                className={cn(
                  'col-start-1 row-start-1 flex min-h-[220px] flex-col gap-3 transition-[opacity,transform] duration-300 ease-out',
                  interrupted
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible translate-y-1 opacity-0',
                )}
              >
                <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--brand)]">
                  <Ico name="solar:record-circle-bold-duotone" className="h-5 w-5" />
                  {t('interrupted')}
                </p>
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl bg-white/[0.03] px-4 py-3 text-[15px] text-white/80">
                    {t('busy')}
                  </p>
                </div>
                <div
                  aria-hidden={!recovering}
                  className={cn(
                    'flex justify-start transition-[opacity,transform] duration-300 ease-out',
                    recovering ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0',
                  )}
                >
                  <p className="max-w-[80%] rounded-2xl bg-white/8 px-4 py-3 text-[15px] text-white">
                    {t('recovery')}
                  </p>
                </div>
                <p
                  aria-hidden={phase !== 'result'}
                  className={cn(
                    'inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#10b981]/12 px-4 text-sm font-semibold text-[#6ee7b7] transition-[opacity,transform] duration-300 ease-out',
                    phase === 'result'
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible translate-y-1 opacity-0',
                  )}
                >
                  <Ico name="solar:check-circle-bold-duotone" className="h-5 w-5" />
                  {t('result')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-center">
            <button
              type="button"
              onClick={interrupt}
              disabled={!speaking}
              className={cn(
                'flex h-32 w-32 items-center justify-center rounded-full text-center text-sm font-bold uppercase tracking-wide text-white',
                'transition-[transform,filter] duration-150 ease-out active:scale-[0.96] md:hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0e0e11]',
                'disabled:cursor-not-allowed disabled:active:scale-100 disabled:md:hover:brightness-100',
              )}
              style={{ background: speaking ? '#b91c1c' : 'rgba(255,255,255,0.12)' }}
            >
              <span className="flex flex-col items-center gap-2">
                <Ico name="solar:record-circle-bold-duotone" className="h-6 w-6" />
                {t('interrupt')}
              </span>
            </button>
            <button
              type="button"
              onClick={replay}
              data-demo-replay="true"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white/12 px-5 text-[13px] font-semibold text-white transition-[transform,background-color] duration-150 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e11] md:hover:bg-white/16"
            >
              <Ico name="solar:refresh-bold-duotone" className="h-5 w-5" />
              {t('replay')}
            </button>
            <div
              data-barge-visible-progress
              aria-hidden="true"
              className="w-full max-w-[240px] rounded-xl bg-white/[0.06] px-3.5 py-3"
            >
              <div className="flex items-start justify-between gap-3 text-[11px] font-semibold text-white/70">
                <span data-barge-status-slot className="grid min-w-0 flex-1 text-pretty">
                  {STATUS_KEYS.map((key) => (
                    <span
                      key={key}
                      className={cn(
                        'col-start-1 row-start-1 transition-opacity duration-150 ease-out',
                        key === statusKey ? 'opacity-100' : 'opacity-0',
                      )}
                    >
                      {t(key)}
                    </span>
                  ))}
                </span>
                <span className="tabular-nums text-white">
                  {Math.min(i, WORDS.length).toString().padStart(2, '0')}
                </span>
              </div>
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/10">
                <span
                  className="block h-full origin-left rounded-full bg-[var(--brand)] transition-transform duration-150 ease-out"
                  style={{
                    transform: `scaleX(${Math.max(Math.min(i, WORDS.length) / WORDS.length, 0.04)})`,
                  }}
                />
              </span>
            </div>
            <p data-demo-outcome className="max-w-[240px] text-pretty text-[12px] leading-relaxed text-[#A3A3A3] lg:text-center">
              {t('note')}
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
