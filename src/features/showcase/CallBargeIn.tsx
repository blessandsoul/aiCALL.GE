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

type Phase = 'idle' | 'speaking' | 'interrupted' | 'recovery' | 'result';

export function CallBargeIn() {
  const t = useTranslations('product.barge');
  const reducedMotion = useReducedMotion();
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

  return (
    <SectionContainer className="py-20 md:py-28">
      <div ref={rootRef} className="min-w-0 rounded-3xl bg-[#0e0e11] p-6 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center lg:gap-16">
          <div>
            <span className="text-[12px] uppercase tracking-wide text-white/40">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white md:text-4xl">
              {t('heading')}
            </h2>
            <p className="mt-3 max-w-lg text-pretty text-[15px] leading-relaxed text-white/60">
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

            <div className="mt-6 min-h-[92px] rounded-2xl bg-white/[0.06] px-5 py-4">
              <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/30">
                {t(phase === 'result' ? 'result' : phase === 'recovery' ? 'recoveryStatus' : phase === 'interrupted' ? 'interrupted' : 'speaking')}
              </span>
              <p className="text-[15px] leading-relaxed text-white">
                {WORDS.slice(0, i).join(' ')}
                {phase === 'interrupted' && (
                  <span className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-[var(--brand)]" />
                )}
              </p>
            </div>

            {interrupted && (
              <div className="mt-4 flex flex-col gap-3">
                <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--brand)]">
                  <Ico name="solar:record-circle-bold-duotone" className="h-5 w-5" />
                  {t('interrupted')}
                </p>
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl bg-white/[0.03] px-4 py-3 text-[15px] text-white/80">
                    {t('busy')}
                  </p>
                </div>
                {recovering && (
                  <div className="flex justify-start">
                    <p className="max-w-[80%] rounded-2xl bg-white/8 px-4 py-3 text-[15px] text-white">
                      {t('recovery')}
                    </p>
                  </div>
                )}
                {phase === 'result' && (
                  <p className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#10b981]/12 px-4 text-sm font-semibold text-[#6ee7b7]">
                    <Ico name="solar:check-circle-bold-duotone" className="h-5 w-5" />
                    {t('result')}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-center">
            <button
              type="button"
              onClick={speaking ? interrupt : replay}
              className={cn(
                'flex h-32 w-32 items-center justify-center rounded-full text-center text-sm font-bold uppercase tracking-wide text-white',
                'transition-[transform,filter] duration-150 ease-out active:scale-[0.96] md:hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0e0e11]',
              )}
              style={{ background: speaking ? '#ef4444' : 'rgba(255,255,255,0.12)' }}
            >
              <span className="flex flex-col items-center gap-2">
                <Ico
                  name={speaking ? 'solar:record-circle-bold-duotone' : 'solar:refresh-bold-duotone'}
                  className="h-6 w-6"
                />
                {speaking ? t('interrupt') : t('replay')}
              </span>
            </button>
            <p className="max-w-[240px] text-pretty text-[12px] leading-relaxed text-white/40 lg:text-center">
              {t('note')}
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
