import type { ProductPagesConfig } from '@/features/product-pages/types';

export const PRODUCT_PAGES = {
  pricing: { status: 'public', mode: 'project' },
  contact: { status: 'public' },
  blog: { status: 'public' },
  integrations: {
    status: 'public',
    records: [
      { id: 'phone', name: 'Phone', icon: 'solar:phone-bold-duotone', category: 'communication', connection: 'direct', status: 'available', dataFlow: 'calls' },
      { id: 'calendar', name: 'Calendar', icon: 'solar:calendar-bold-duotone', category: 'businessSystems', connection: 'custom', status: 'customSetup', dataFlow: 'appointments' },
      { id: 'crm', name: 'CRM', icon: 'solar:users-group-rounded-bold-duotone', category: 'businessSystems', connection: 'custom', status: 'customSetup', dataFlow: 'customerRecords' },
      { id: 'telegram', name: 'Telegram', icon: 'solar:chat-round-dots-bold-duotone', category: 'communication', connection: 'custom', status: 'customSetup', dataFlow: 'callResults' },
    ],
  },
  security: { status: 'public' },
  privacy: { status: 'public' },
  terms: { status: 'public' },
  cookies: { status: 'off' },
  solutions: { status: 'off', slugs: [] },
  localeNamespaces: {
    ka: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.blog', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
    en: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.blog', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
    ru: ['productPages.common', 'productPages.pricing', 'productPages.contact', 'productPages.blog', 'productPages.integrations', 'productPages.security', 'productPages.privacy', 'productPages.terms'],
  },
} as const satisfies ProductPagesConfig;
