'use client';

import { useTranslations } from 'next-intl';

import { ProductCapabilities } from './ProductCapabilities';

const CAPABILITY_ICONS = [
  'solar:chat-round-dots-bold-duotone',
  'solar:shield-check-bold-duotone',
  'solar:calendar-mark-bold-duotone',
  'solar:record-circle-bold-duotone',
  'solar:calculator-bold-duotone',
] as const;

export function LandingShowcase(): React.ReactElement {
  const t = useTranslations('product.capabilities');

  return (
    <ProductCapabilities
      eyebrow={t('eyebrow')}
      title={t('title')}
      intro={t('intro')}
      outcomeLabel={t('outcomeLabel')}
      items={CAPABILITY_ICONS.map((icon, index) => {
        const item = String(index + 1);
        return {
          icon,
          title: t(`items.${item}.title`),
          description: t(`items.${item}.description`),
          result: t(`items.${item}.result`),
        };
      })}
    />
  );
}
