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
    title: 'aiCALL-ის კონტროლი და უსაფრთხოება', body: 'aiCALL-ის სცენარი იწყება დამტკიცებული ინფორმაციის, ზარის მიზნისა და ადამიანური შემოწმების წესებით. ჩაწერა, ტრანსკრიპტი და ისტორია მხოლოდ არჩეული პარამეტრებით ირთვება.', heroEyebrow: 'კონტროლის მიმოხილვა', heroTitle: 'aiCALL', heroTitleAccent: 'კონტროლი', showcaseLabel: 'წესი',
    showcaseItems: ['გამოიყენება მხოლოდ თქვენ მიერ დამტკიცებული ბიზნესკონტექსტი', 'გაურკვეველი ან რთული შემთხვევა ადამიანურ შემოწმებაზე გადადის', 'ჩაწერა და ტრანსკრიპტი წინასწარ უნდა იყოს გამჟღავნებული და შეთანხმებული', 'შეუზღუდავი სიმძლავრე, ცოცხალი გადაცემა და ინტეგრაციები ავტომატურად არ იგულისხმება'],
    stepItems: [{ title: 'კონტექსტის დამტკიცება', description: 'ვწერთ, რომელი ბიზნესინფორმაცია შეიძლება გამოიყენოს სცენარმა.' }, { title: 'ადამიანური საზღვარი', description: 'ვადგენთ, როდის უნდა შეჩერდეს პასუხი და ჩაერთოს ადამიანი.' }, { title: 'გამჟღავნება', description: 'ჩაწერისა და ტრანსკრიპტის პირობები წინასწარ ცხადდება და თანხმდება.' }, { title: 'პარამეტრების გადამოწმება', description: 'ვტესტავთ მხოლოდ არჩეულ ფუნქციებს და შეთანხმებულ მოცულობას.' }], howTitle: 'როგორ განისაზღვრება კონტროლი', faqTitle: 'კითხვები კონტროლზე',
    faq: [{ q: 'რა ინფორმაციას იყენებს სცენარი?', a: 'მხოლოდ ბიზნესკონტექსტს, რომელიც თქვენ დაამტკიცეთ კონკრეტული ამოცანისთვის.' }, { q: 'რა ხდება გაურკვეველ ზარზე?', a: 'სცენარი მიჰყვება წინასწარ შეთანხმებულ ადამიანურ შემოწმების გზას და არ უნდა გამოიცნოს პასუხი.' }, { q: 'ჩაწერა ავტომატურად ირთვება?', a: 'არა. ჩაწერა და ტრანსკრიპტი წინასწარ უნდა იყოს არჩეული, გამჟღავნებული და შეთანხმებული.' }, { q: 'რას არ ვპირდებით ავტომატურად?', a: 'შეუზღუდავ სიმძლავრეს, ცოცხალ გადაცემას და ინტეგრაციებს — თითოეული ცალკე მოწმდება.' }], cta: { cta: 'კონტროლის განხილვა' },
  }),
  en: createServiceTemplateCopy({
    title: 'aiCALL control and security', body: 'An aiCALL scenario starts with approved information, a call objective and a human-review boundary. Recording, transcripts and history are enabled only as selected and confirmed.', heroEyebrow: 'Control overview', heroTitle: 'aiCALL', heroTitleAccent: 'control', showcaseLabel: 'Rule',
    showcaseItems: ['Only business context approved by you is used', 'Uncertain or complex cases follow a human-review path', 'Recording and transcripts require disclosure and confirmation', 'Unlimited capacity, live transfer and integrations are not assumed automatically'],
    stepItems: [{ title: 'Approve the context', description: 'Define which business information the scenario may use.' }, { title: 'Set the human boundary', description: 'Specify when the scenario must stop and involve a person.' }, { title: 'Disclose the settings', description: 'Recording and transcript conditions are stated and agreed in advance.' }, { title: 'Verify the scope', description: 'Test only the selected functions and agreed operating scope.' }], howTitle: 'How control is defined', faqTitle: 'Control questions',
    faq: [{ q: 'What information does a scenario use?', a: 'Only business context you approved for the specific task.' }, { q: 'What happens on an uncertain call?', a: 'The scenario follows the agreed human-review path and should not guess.' }, { q: 'Is recording enabled automatically?', a: 'No. Recording and transcripts must be selected, disclosed and confirmed.' }, { q: 'What is not promised automatically?', a: 'Unlimited capacity, live transfer and integrations; each is checked separately.' }], cta: { cta: 'Discuss control rules' },
  }),
  ru: createServiceTemplateCopy({
    title: 'Контроль и безопасность aiCALL', body: 'Сценарий aiCALL начинается с одобренной информации, цели звонка и границы проверки человеком. Запись, транскрипт и история включаются только после выбора и подтверждения.', heroEyebrow: 'Обзор контроля', heroTitle: 'aiCALL', heroTitleAccent: 'контроль', showcaseLabel: 'Правило',
    showcaseItems: ['Используется только одобренный вами бизнес-контекст', 'Неясные и сложные случаи следуют пути проверки человеком', 'О записи и транскриптах нужно сообщить и получить подтверждение', 'Неограниченная ёмкость, живой перевод и интеграции не предполагаются автоматически'],
    stepItems: [{ title: 'Одобрить контекст', description: 'Фиксируем, какую бизнес-информацию может использовать сценарий.' }, { title: 'Задать границу человека', description: 'Определяем, когда сценарий должен остановиться и подключить человека.' }, { title: 'Раскрыть настройки', description: 'Условия записи и транскрипта заранее сообщаются и согласуются.' }, { title: 'Проверить объём', description: 'Тестируем только выбранные функции и согласованный объём работы.' }], howTitle: 'Как определяется контроль', faqTitle: 'Вопросы о контроле',
    faq: [{ q: 'Какую информацию использует сценарий?', a: 'Только бизнес-контекст, который вы одобрили для конкретной задачи.' }, { q: 'Что происходит при неясном звонке?', a: 'Сценарий следует согласованному пути проверки человеком и не должен угадывать.' }, { q: 'Запись включается автоматически?', a: 'Нет. Запись и транскрипты нужно выбрать, раскрыть и подтвердить.' }, { q: 'Что не обещается автоматически?', a: 'Неограниченная ёмкость, живой перевод и интеграции — каждое проверяется отдельно.' }], cta: { cta: 'Обсудить правила контроля' },
  }),
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  return { title: `${copy.title} | aiCALL`, description: copy.body, alternates: buildAlternates('/security', locale, ['ka', 'en', 'ru']) };
}

export default async function SecurityPage() {
  const locale = await getLocale();
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  return <><ServiceSchemaForPage locale={locale} copy={copy.schema} siteName="aiCALL" siteUrl="https://aicall.ge" path="/security" serviceType="AI call controls" /><ServiceHero copy={copy.hero} /><AutomationNodes copy={copy.nodes} /><AutomationShowcase cards={copy.showcase.cards} steps={copy.showcase.steps} howTitle={copy.showcase.howTitle} /><SeoArticle data={copy.article} /><ServiceFaq title={copy.faqTitle} items={copy.faq} /><RelatedCases serviceSlug="security" locale={locale} /><ServiceCTA copy={copy.cta} /></>;
}

