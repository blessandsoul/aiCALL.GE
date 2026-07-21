'use client';

import { useTranslations } from 'next-intl';

import { HeroWorkflowStory } from '@/features/home/components/HeroWorkflowStory';

export function HeroProof(): React.ReactElement {
  const t = useTranslations('product.heroStory');

  return (
    <HeroWorkflowStory
      demoId="aicall-hero-story"
      mode="orchestrated"
      productName="aiCALL"
      productIcon="solar:phone-bold-duotone"
      copy={{
        badge: t('badge'),
        inputLabel: t('inputLabel'),
        input: t('input'),
        bridgeLabel: t('bridgeLabel'),
        bridge: t('bridge'),
        productLabel: t('productLabel'),
        productAction: t('productAction'),
        detailOne: t('detailOne'),
        detailTwo: t('detailTwo'),
        resultLabel: t('resultLabel'),
        result: t('result'),
        businessLabel: t('businessLabel'),
        businessValue: t('businessValue'),
        replay: t('replay'),
      }}
    />
  );
}
