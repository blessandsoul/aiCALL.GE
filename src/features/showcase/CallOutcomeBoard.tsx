'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { cn } from '@/lib/utils';

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
/* A plausible split, not a claim. Deliberately not round: real campaigns are messy. */
const SPLIT = { confirmed: 47, moved: 16, noanswer: 31, human: 6 };
const TICK_MS = 55;

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

export function CallOutcomeBoard() {
  const t = useTranslations('product.board');
  const [n, setN] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const run = useCallback(() => {
    clear();
    setN(0);
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

  useEffect(() => clear, [clear]);

  const counts = ORDER.reduce<Record<Bucket, number>>(
    (acc, b) => {
      acc[b] = SEQUENCE.slice(0, n).filter((x) => x === b).length;
      return acc;
    },
    { confirmed: 0, moved: 0, noanswer: 0, human: 0 },
  );

  const done = n >= TOTAL;

  return (
    <SectionContainer className="py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(300px,420px)] lg:gap-16">
        {/* LEFT: the board */}
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ORDER.map((b) => (
              <div
                key={b}
                className="rounded-2xl bg-[#fafafa] p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: TONE[b] }}
                    aria-hidden="true"
                  />
                  <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
                    {t(b)}
                  </span>
                </span>
                <p className="mt-3 font-display text-4xl font-extrabold tabular-nums leading-none text-neutral-900">
                  {counts[b]}
                </p>
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

          <p className="mt-5 text-[12px] leading-relaxed text-[#737373]">{t('note')}</p>
        </div>

        {/* RIGHT: the copy + the trigger */}
        <div className="order-1 lg:order-2">
          <span className="text-[12px] uppercase tracking-wide text-neutral-900/40">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 md:text-4xl">
            {t('heading')}
          </h2>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#525252]">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={run}
              disabled={running}
              className={cn(
                'inline-flex min-h-[48px] items-center rounded-full px-6 text-sm font-semibold text-white',
                'transition-[transform,filter] duration-150 ease-out',
                'active:scale-[0.96] md:hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                running && 'opacity-70',
              )}
              style={{ background: 'var(--brand)' }}
            >
              {running ? t('running') : done ? t('again') : t('run')}
            </button>

            <span className="text-sm tabular-nums text-[#737373]">
              {n} / {TOTAL} {t('called')}
            </span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
