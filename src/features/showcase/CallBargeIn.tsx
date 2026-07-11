'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

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

export function CallBargeIn() {
  const t = useTranslations('product.barge');
  const [i, setI] = useState(0);
  const [state, setState] = useState<'idle' | 'speaking' | 'cut'>('idle');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const speak = useCallback(() => {
    clear();
    setI(0);
    setState('speaking');
    timer.current = setInterval(() => {
      setI((prev) => {
        if (prev + 1 >= WORDS.length) {
          clear();
          setState('idle');
          return WORDS.length;
        }
        return prev + 1;
      });
    }, WORD_MS);
  }, [clear]);

  const interrupt = useCallback(() => {
    clear();
    setState('cut');
  }, [clear]);

  useEffect(() => clear, [clear]);
  useEffect(() => {
    const id = setTimeout(speak, 400);
    return () => clearTimeout(id);
  }, [speak]);

  const speaking = state === 'speaking';

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="rounded-3xl bg-[#0e0e11] p-6 md:p-12">
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
                {t('speaking')}
              </span>
              <p className="text-[15px] leading-relaxed text-white">
                {WORDS.slice(0, i).join(' ')}
                {state === 'cut' && (
                  <span className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-[var(--brand)]" />
                )}
              </p>
            </div>

            {state === 'cut' && (
              <div className="mt-4 flex flex-col gap-3">
                <p className="text-[15px] font-semibold text-[var(--brand)]">{t('interrupted')}</p>
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl bg-white/[0.03] px-4 py-3 text-[15px] text-white/80">
                    {t('busy')}
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-[80%] rounded-2xl bg-white/8 px-4 py-3 text-[15px] text-white">
                    {t('recovery')}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-center">
            <button
              type="button"
              onClick={speaking ? interrupt : speak}
              className={cn(
                'flex h-32 w-32 items-center justify-center rounded-full text-center text-sm font-bold uppercase tracking-wide text-white',
                'transition-[transform,filter] duration-150 ease-out active:scale-[0.96] md:hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0e0e11]',
              )}
              style={{ background: speaking ? '#ef4444' : 'rgba(255,255,255,0.12)' }}
            >
              {speaking ? t('interrupt') : t('speaking')}
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
