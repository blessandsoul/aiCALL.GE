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
      {
        id: 'tiktok-leads',
        name: 'TikTok leads',
        icon: 'solar:videocamera-record-bold-duotone',
        category: 'contentAndAdvertising',
        connection: 'planned',
        status: 'planned',
        dataFlow: 'customerRecords',
        machineDescription:
          'Calling consented leads received from TikTok Ads is planned through aiADS. aiCALL does not place calls inside TikTok, and this workflow is not currently available.',
        requirements: [
          'TikTok Marketing API approval',
          'Advertiser authorization and approved scopes',
          'A lawful basis and consent for each outbound call',
        ],
        officialSources: ['https://business-api.tiktok.com/portal'],
      },
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
