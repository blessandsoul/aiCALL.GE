import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { buildAlternates } from '@/i18n/seo-locales';
import { ServiceHero } from '@/features/services/components/ServiceHero';
import { AutomationNodes } from '@/features/services/components/AutomationNodes';
import { AutomationShowcase } from '@/features/services/components/AutomationShowcase';
import { SeoArticle } from '@/features/services/components/SeoArticle';
import { ServiceFaq } from '@/features/services/components/ServiceFaq';
import { ServiceCTA } from '@/features/services/components/ServiceCTA';
import { createServiceTemplateCopy } from '@/features/services/components/service-template-copy';
import { RelatedCases } from '@/features/projects/components/RelatedCases';
import { ServiceSchemaForPage } from '@/components/seo/ServiceSchemaForPage';

const COPY = {
  ka: createServiceTemplateCopy({
    title: 'aiCALL-ის კავშირები', body: 'ტელეფონი aiCALL-ის ძირითადი არხია. კალენდარი, CRM, Telegram და სხვა კავშირები კონკრეტული სცენარის, გეგმისა და დამტკიცებული მოქმედებების მიხედვით მოწმდება.', heroEyebrow: 'კავშირების მიმოხილვა', heroTitle: 'aiCALL', heroTitleAccent: 'კავშირები', showcaseLabel: 'კავშირი',
    showcaseItems: ['ტელეფონი — ხელმისაწვდომი ძირითადი არხი', 'კალენდარი და CRM — მხოლოდ შეთანხმებული გამართვის ან გეგმის ფარგლებში', 'Telegram — custom setup; tenant-ის კონფიგურაცია ცალკე დასტურდება', 'TikTok leads — დაგეგმილი, ამ ეტაპზე ხელმისაწვდომი არაა'],
    stepItems: [{ title: 'სცენარის განსაზღვრა', description: 'ვწერთ, რომელი არხი და მოქმედება სჭირდება კონკრეტულ პროცესს.' }, { title: 'წვდომის შემოწმება', description: 'ვამოწმებთ ანგარიშის, გეგმისა და tenant-ის რეალურ პირობებს.' }, { title: 'კავშირის გამართვა', description: 'ვაერთებთ მხოლოდ იმ ნაწილს, რომელიც შეთანხმებულ მოცულობაში შედის.' }, { title: 'შედეგის გადამოწმება', description: 'ვტესტავთ მონაცემის მიმართულებას და ადამიანის დამტკიცების საზღვრებს.' }], howTitle: 'როგორ მოწმდება კავშირი', faqTitle: 'კითხვები კავშირებზე',
    faq: [{ q: 'ყველა კავშირი ხელმისაწვდომია?', a: 'არა. ხელმისაწვდომობა დამოკიდებულია კონკრეტულ სცენარზე, გეგმაზე, ანგარიშსა და დამტკიცებულ მოქმედებებზე.' }, { q: 'Telegram ავტომატურად ერთვება?', a: 'არა. Telegram-ის custom setup და tenant-ის კონფიგურაცია ცალკე უნდა დადასტურდეს.' }, { q: 'შეიძლება კავშირის გამოცდა რეალურ პროცესზე?', a: 'დიახ, მაგრამ მხოლოდ შეთანხმებული წვდომებით, სატესტო სცენარითა და მკაფიო პასუხისმგებლობით.' }, { q: 'რას ვაკეთებთ, თუ კავშირი არ არის ხელმისაწვდომი?', a: 'ვტოვებთ მას დაგეგმილად ან ვარჩევთ იმ არხს, რომლის გამოყენებაც მიმდინარე პირობებში დასტურდება.' }], cta: { cta: 'სცენარის განხილვა' },
  }),
  en: createServiceTemplateCopy({
    title: 'aiCALL integrations', body: 'Phone is the core aiCALL channel. Calendar, CRM, Telegram and other connections are checked for the specific scenario, plan and approved actions.', heroEyebrow: 'Integration overview', heroTitle: 'aiCALL', heroTitleAccent: 'integrations', showcaseLabel: 'Connection',
    showcaseItems: ['Phone — core available channel', 'Calendar and CRM — only within confirmed setup or plan scope', 'Telegram — custom setup; tenant configuration is confirmed separately', 'TikTok leads — planned, not available now'],
    stepItems: [{ title: 'Define the scenario', description: 'Specify which channel and action the business process actually needs.' }, { title: 'Check access', description: 'Confirm the account, plan and tenant conditions before connecting anything.' }, { title: 'Configure the connection', description: 'Connect only the part included in the agreed scope.' }, { title: 'Verify the result', description: 'Test data direction and the boundary for human approval.' }], howTitle: 'How a connection is checked', faqTitle: 'Integration questions',
    faq: [{ q: 'Are all connections available?', a: 'No. Availability depends on the scenario, plan, account and approved actions.' }, { q: 'Is Telegram enabled automatically?', a: 'No. Telegram custom setup and tenant configuration must be confirmed separately.' }, { q: 'Can a connection be tested on a real process?', a: 'Yes, with agreed access, a test scenario and a clear owner for the result.' }, { q: 'What happens when a connection is unavailable?', a: 'It remains planned or the process uses a channel whose current conditions are confirmed.' }], cta: { cta: 'Discuss a scenario' },
  }),
  ru: createServiceTemplateCopy({
    title: 'Интеграции aiCALL', body: 'Телефон — основной канал aiCALL. Календарь, CRM, Telegram и другие подключения проверяются для конкретного сценария, плана и одобренных действий.', heroEyebrow: 'Обзор интеграций', heroTitle: 'aiCALL', heroTitleAccent: 'интеграции', showcaseLabel: 'Подключение',
    showcaseItems: ['Телефон — основной доступный канал', 'Календарь и CRM — только в подтверждённом объёме настройки или плана', 'Telegram — custom setup; конфигурация tenant подтверждается отдельно', 'TikTok leads — в планах, сейчас недоступно'],
    stepItems: [{ title: 'Определить сценарий', description: 'Фиксируем, какой канал и действие действительно нужны процессу.' }, { title: 'Проверить доступ', description: 'Подтверждаем аккаунт, план и условия tenant до подключения.' }, { title: 'Настроить подключение', description: 'Подключаем только согласованный объём.' }, { title: 'Проверить результат', description: 'Тестируем направление данных и границу проверки человеком.' }], howTitle: 'Как проверяется подключение', faqTitle: 'Вопросы об интеграциях',
    faq: [{ q: 'Все подключения доступны?', a: 'Нет. Доступность зависит от сценария, плана, аккаунта и одобренных действий.' }, { q: 'Telegram включается автоматически?', a: 'Нет. Custom setup и конфигурацию tenant нужно подтвердить отдельно.' }, { q: 'Можно проверить подключение на реальном процессе?', a: 'Да, с согласованным доступом, тестовым сценарием и понятным ответственным.' }, { q: 'Что происходит, если подключение недоступно?', a: 'Оно остаётся в планах или процесс использует канал с подтверждёнными условиями.' }], cta: { cta: 'Обсудить сценарий' },
  }),
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  return { title: `${copy.title} | aiCALL`, description: copy.body, alternates: buildAlternates('/integrations', locale, ['ka', 'en', 'ru']) };
}

export default async function IntegrationsPage() {
  const locale = await getLocale();
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  return <><ServiceSchemaForPage locale={locale} copy={copy.schema} siteName="aiCALL" siteUrl="https://aicall.ge" path="/integrations" serviceType="AI call integrations" /><ServiceHero copy={copy.hero} /><AutomationNodes copy={copy.nodes} /><AutomationShowcase cards={copy.showcase.cards} steps={copy.showcase.steps} howTitle={copy.showcase.howTitle} /><SeoArticle data={copy.article} /><ServiceFaq title={copy.faqTitle} items={copy.faq} /><RelatedCases serviceSlug="integrations" locale={locale} /><ServiceCTA copy={copy.cta} /></>;
}

