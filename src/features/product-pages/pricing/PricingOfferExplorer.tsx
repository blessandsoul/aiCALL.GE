'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Ico } from '@/components/common/Ico';
import { cn } from '@/lib/utils';

import { PricingPlanCard } from './PricingPlanCard';
import type {
  PricingComparisonRow,
  PricingOffer,
  PricingPageCopy,
} from './types';

interface PricingOfferExplorerProps {
  offers: readonly PricingOffer[];
  rows: readonly PricingComparisonRow[];
  selectedPlanId: string;
  onSelectPlan: (offerId: string) => void;
  copy: Pick<
    PricingPageCopy,
    | 'cardModelLabel'
    | 'cardOperatorsLabel'
    | 'cardScenariosLabel'
    | 'cardConcurrentCallsLabel'
    | 'cardIntegrationsLabel'
    | 'includedStatusLabel'
    | 'notIncludedStatusLabel'
    | 'platformPriceLabel'
    | 'recommendedLabel'
    | 'selectPlanLabel'
    | 'selectedPlanLabel'
    | 'customValueLabel'
    | 'swipeHint'
    | 'previousLabel'
    | 'nextLabel'
  >;
}

function getVisiblePlanCount(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 640) return 2;
  return 1;
}

export function PricingOfferExplorer({
  offers,
  rows,
  selectedPlanId,
  onSelectPlan,
  copy,
}: PricingOfferExplorerProps): React.ReactElement {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visiblePlanCount, setVisiblePlanCount] = useState(4);
  const customOffer = offers.find((offer) => offer.planId === 'custom');

  const scrollToPlan = useCallback(
    (index: number, behavior?: ScrollBehavior) => {
      const track = trackRef.current;
      const card = track?.children.item(index) as HTMLElement | null;
      if (!track || !card) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const alignedLeft = track.scrollLeft + cardRect.left - trackRect.left;
      const target = visiblePlanCount === 1
        ? alignedLeft - (track.clientWidth - card.clientWidth) / 2
        : alignedLeft;

      track.scrollTo({
        left: target,
        behavior: behavior ?? (reducedMotion ? 'auto' : 'smooth'),
      });
      setActiveIndex(index);
    },
    [visiblePlanCount],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateVisibleCount = (): void => {
      const nextCount = getVisiblePlanCount(track.clientWidth);
      setVisiblePlanCount(nextCount);
      setActiveIndex((current) => Math.min(current, Math.max(0, offers.length - nextCount)));
    };

    updateVisibleCount();
    const observer = new ResizeObserver(updateVisibleCount);
    observer.observe(track);
    return () => observer.disconnect();
  }, [offers.length]);

  useEffect(() => {
    if (visiblePlanCount !== 1) return;
    const index = offers.findIndex((offer) => offer.id === selectedPlanId);
    if (index < 0) return;
    const frame = window.requestAnimationFrame(() => scrollToPlan(index, 'auto'));
    return () => window.cancelAnimationFrame(frame);
  }, [offers, scrollToPlan, selectedPlanId, visiblePlanCount]);

  const updateActivePlan = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((node, index) => {
      const card = node as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const distance = visiblePlanCount === 1
        ? Math.abs(cardRect.left + cardRect.width / 2 - (trackRect.left + trackRect.width / 2))
        : Math.abs(cardRect.left - trackRect.left);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });

    setActiveIndex(Math.min(nearest, Math.max(0, offers.length - visiblePlanCount)));
    frameRef.current = null;
  }, [offers.length, visiblePlanCount]);

  const handleScroll = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(updateActivePlan);
  }, [updateActivePlan]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  if (offers.length === 0) {
    return <div className="pricing-configurator__empty" role="status" aria-label={copy.selectPlanLabel} />;
  }

  const maxStartIndex = Math.max(0, offers.length - visiblePlanCount);

  return (
    <div className="pricing-offer-explorer">
      <div className="mb-4 flex min-h-11 items-center justify-between gap-4">
        <span className="text-xs font-medium text-[#525252] sm:hidden">{copy.swipeHint}</span>
        <div className="ms-auto flex items-center gap-1.5">
          <button
            type="button"
            aria-label={copy.previousLabel}
            disabled={activeIndex === 0}
            onClick={() => scrollToPlan(Math.max(0, activeIndex - 1))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-neutral-900 transition-[border-color,color,transform,opacity,box-shadow] duration-200 ease-out active:scale-[0.96] disabled:opacity-[0.35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/45"
          >
            <Ico name="solar:alt-arrow-left-linear" className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={copy.nextLabel}
            disabled={activeIndex >= maxStartIndex}
            onClick={() => scrollToPlan(Math.min(maxStartIndex, activeIndex + 1))}
            className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-neutral-900 px-3.5 text-white shadow-lg shadow-neutral-900/15 transition-[background-color,color,transform,opacity,box-shadow] duration-200 ease-out hover:bg-[#7c3aed] hover:shadow-[#7c3aed]/20 active:scale-[0.96] disabled:bg-neutral-200 disabled:text-neutral-500 disabled:opacity-100 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/45 focus-visible:ring-offset-2"
          >
            <span className="hidden whitespace-nowrap text-xs font-bold sm:inline">{customOffer?.name ?? copy.nextLabel}</span>
            <Ico name="solar:alt-arrow-right-linear" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className={cn(
          'pricing-offer-explorer__grid -mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 pb-5 pt-3',
          'overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'sm:mx-auto sm:max-w-6xl sm:gap-4 sm:px-0 sm:pb-0 sm:pt-3',
        )}
        role="group"
        aria-label={copy.selectPlanLabel}
        tabIndex={0}
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={cn(
              'w-[calc(100vw-3rem)] max-w-[22rem] shrink-0 snap-center',
              'sm:w-[calc((100%_-_1rem)/2)] sm:max-w-none sm:snap-start',
              'lg:w-[calc((100%_-_3rem)/4)]',
            )}
          >
            <PricingPlanCard
              offer={offer}
              rows={rows}
              selected={selectedPlanId === offer.id}
              onSelect={onSelectPlan}
              copy={copy}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
