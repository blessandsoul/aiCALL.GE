'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

/* =========================================================================
   CallHearGeorgian: the single most important element on this page.

   Nobody believes Georgian voice AI until they hear it, so this sits first in the
   showcase. Four scenarios, each with a pre-rendered Georgian recording and a
   transcript that highlights word by word off a hardcoded timing array.

   THE RECORDINGS DO NOT EXIST YET. See public/audio/README.md for the four files
   that have to be dropped in. Until they are, the component detects the failed load
   and falls back to a silent, timed transcript replay driven by the same timings, so
   the section is honest and still demonstrates the script. It never pretends to play
   audio it does not have.
   ========================================================================= */

type Line = { who: 'agent' | 'customer'; words: { t: number; w: string }[] };
type Scenario = { id: string; audio: string; lines: Line[] };

/* Timings are in seconds from the start of the clip. When the real recordings land,
   re-time these against the actual audio; the shape does not change. */
const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    audio: '/audio/clinic.mp3',
    lines: [
      {
        who: 'agent',
        words: [
          { t: 0.0, w: 'გამარჯობა,' }, { t: 0.5, w: 'ეს' }, { t: 0.7, w: 'AI' },
          { t: 1.0, w: 'აგენტია' }, { t: 1.5, w: 'კლინიკიდან.' }, { t: 2.2, w: 'ხვალ' },
          { t: 2.5, w: 'ორ' }, { t: 2.7, w: 'საათზე' }, { t: 3.1, w: 'გელოდებით.' },
          { t: 3.8, w: 'დაადასტურებთ?' },
        ],
      },
      { who: 'customer', words: [{ t: 5.0, w: 'დიახ,' }, { t: 5.3, w: 'ვიქნები.' }] },
      {
        who: 'agent',
        words: [
          { t: 6.2, w: 'მადლობა.' }, { t: 6.8, w: 'ხვალ' }, { t: 7.0, w: 'გნახავთ.' },
        ],
      },
    ],
  },
  {
    id: 's2',
    audio: '/audio/delivery.mp3',
    lines: [
      {
        who: 'agent',
        words: [
          { t: 0.0, w: 'გამარჯობა,' }, { t: 0.5, w: 'AI' }, { t: 0.8, w: 'აგენტი' },
          { t: 1.2, w: 'გწერთ' }, { t: 1.5, w: 'მიწოდებაზე.' }, { t: 2.3, w: 'ამანათი' },
          { t: 2.7, w: 'ხვალ' }, { t: 3.0, w: 'მოგივათ.' }, { t: 3.6, w: 'სახლში' },
          { t: 4.0, w: 'იქნებით?' },
        ],
      },
      { who: 'customer', words: [{ t: 5.2, w: 'ხვალ' }, { t: 5.5, w: 'არა.' }, { t: 6.0, w: 'ორშაბათს.' }] },
      {
        who: 'agent',
        words: [
          { t: 7.0, w: 'გავიგე.' }, { t: 7.5, w: 'ორშაბათზე' }, { t: 8.1, w: 'გადავიტანე.' },
        ],
      },
    ],
  },
  {
    id: 's3',
    audio: '/audio/payment.mp3',
    lines: [
      {
        who: 'agent',
        words: [
          { t: 0.0, w: 'გამარჯობა,' }, { t: 0.5, w: 'AI' }, { t: 0.8, w: 'აგენტი' },
          { t: 1.2, w: 'ვარ.' }, { t: 1.6, w: 'შენატანი' }, { t: 2.1, w: 'პარასკევს' },
          { t: 2.6, w: 'იწურება.' }, { t: 3.3, w: 'გახსოვთ?' },
        ],
      },
      { who: 'customer', words: [{ t: 4.5, w: 'კი,' }, { t: 4.8, w: 'გადავიხდი.' }] },
      {
        who: 'agent',
        words: [
          { t: 5.8, w: 'მადლობა.' }, { t: 6.4, w: 'კარგ' }, { t: 6.7, w: 'დღეს' },
          { t: 7.0, w: 'გისურვებთ.' },
        ],
      },
    ],
  },
  {
    id: 's4',
    audio: '/audio/missed.mp3',
    lines: [
      {
        who: 'agent',
        words: [
          { t: 0.0, w: 'გამარჯობა,' }, { t: 0.6, w: 'AI' }, { t: 0.9, w: 'აგენტი' },
          { t: 1.3, w: 'ვარ.' }, { t: 1.7, w: 'თქვენ' }, { t: 2.0, w: 'დაგვირეკეთ,' },
          { t: 2.8, w: 'ვერ' }, { t: 3.0, w: 'ვუპასუხეთ.' }, { t: 3.8, w: 'რით' },
          { t: 4.1, w: 'დაგეხმაროთ?' },
        ],
      },
      { who: 'customer', words: [{ t: 5.4, w: 'ჩაწერა' }, { t: 5.9, w: 'მინდა.' }] },
      {
        who: 'agent',
        words: [
          { t: 6.9, w: 'ვაკავშირებ' }, { t: 7.5, w: 'ადმინისტრატორთან.' },
        ],
      },
    ],
  },
];

const CLIP_END = 9.5;

export function CallHearGeorgian() {
  const t = useTranslations('product.hear');
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(0);
  const [audioMissing, setAudioMissing] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startedAt = useRef(0);

  const scenario = SCENARIOS[active];

  const stop = useCallback(() => {
    setPlaying(false);
    setNow(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
  }, []);

  // Silent fallback: when the recording is not on disk yet, the transcript still runs
  // on the same timeline. It is a script preview, and the caption says exactly that.
  const tickSilently = useCallback(() => {
    const elapsed = (performance.now() - startedAt.current) / 1000;
    if (elapsed >= CLIP_END) {
      stop();
      return;
    }
    setNow(elapsed);
    rafRef.current = requestAnimationFrame(tickSilently);
  }, [stop]);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      return;
    }
    setPlaying(true);
    const a = audioRef.current;
    if (a && !audioMissing) {
      void a.play().catch(() => {
        setAudioMissing(true);
        startedAt.current = performance.now();
        rafRef.current = requestAnimationFrame(tickSilently);
      });
      return;
    }
    startedAt.current = performance.now();
    rafRef.current = requestAnimationFrame(tickSilently);
  }, [playing, stop, audioMissing, tickSilently]);

  useEffect(() => stop, [stop]);
  useEffect(() => {
    stop();
    setAudioMissing(false);
  }, [active, stop]);

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(260px,340px)_1fr] lg:gap-16">
        {/* LEFT: the picker. Deliberately a vertical rail, not a row of equal cards. */}
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

          <ul className="mt-8 flex flex-col gap-2">
            {SCENARIOS.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={cn(
                      'flex min-h-[56px] w-full items-center gap-3 rounded-xl px-4 py-3 text-left',
                      'transition-[transform,background-color,box-shadow] duration-150 ease-out',
                      'active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                      on
                        ? 'bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] shadow-[0_0_0_1px_var(--brand)]'
                        : 'bg-[#fafafa] shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:hover:bg-[#f4f4f4]',
                    )}
                  >
                    <span
                      className={cn(
                        'h-2 w-2 shrink-0 rounded-full transition-[transform,opacity] duration-150 ease-out',
                        on ? 'scale-100 opacity-100' : 'scale-95 opacity-30',
                      )}
                      style={{ background: 'var(--brand)' }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-neutral-900">
                        {t(`${s.id}Title`)}
                      </span>
                      <span className="block truncate text-[13px] text-[#525252]">
                        {t(`${s.id}Sub`)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT: the player + the transcript */}
        <div className="rounded-2xl bg-[#0e0e11] p-5 md:p-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? t('pause') : t('play')}
              className={cn(
                'flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[#0e0e11]',
                'transition-transform duration-150 ease-out active:scale-[0.96]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e11]',
              )}
              style={{ background: 'var(--brand)' }}
            >
              {playing ? (
                <span className="flex gap-[3px]" aria-hidden="true">
                  <span className="block h-4 w-[3px] rounded-sm bg-current" />
                  <span className="block h-4 w-[3px] rounded-sm bg-current" />
                </span>
              ) : (
                <span
                  className="ml-[2px] block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current"
                  aria-hidden="true"
                />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full origin-left rounded-full"
                  style={{
                    background: 'var(--brand)',
                    transform: `scaleX(${Math.min(now / CLIP_END, 1)})`,
                    transition: 'transform 90ms linear',
                  }}
                />
              </div>
              <p className="mt-2 text-[12px] tabular-nums text-white/40">
                {now.toFixed(1)}s
              </p>
            </div>
          </div>

          {audioMissing && (
            <p className="mt-5 rounded-lg bg-white/5 px-4 py-3 text-[13px] leading-relaxed text-white/60">
              {t('pending')}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-5">
            {scenario.lines.map((line, li) => (
              <div
                key={li}
                className={cn('flex', line.who === 'agent' ? 'justify-start' : 'justify-end')}
              >
                <div className="max-w-[85%]">
                  <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/30">
                    {line.who === 'agent' ? t('agent') : t('customer')}
                  </span>
                  <p
                    className={cn(
                      'rounded-2xl px-4 py-3 text-[15px] leading-relaxed',
                      line.who === 'agent' ? 'bg-white/8 text-white' : 'bg-white/[0.03] text-white/80',
                    )}
                  >
                    {line.words.map((w, wi) => {
                      const spoken = now >= w.t;
                      return (
                        <span
                          key={wi}
                          className="transition-[opacity,filter] duration-150 ease-out"
                          style={{
                            opacity: spoken ? 1 : 0.28,
                            filter: spoken ? 'blur(0px)' : 'blur(1px)',
                          }}
                        >
                          {w.w}{' '}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            ref={audioRef}
            src={scenario.audio}
            preload="none"
            onError={() => setAudioMissing(true)}
            onTimeUpdate={(e) => setNow(e.currentTarget.currentTime)}
            onEnded={stop}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
