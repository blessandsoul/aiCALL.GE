'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Ico } from '@/components/common/Ico';
import { SITE } from '@/config/site';
import './product-landing-sections.css';

type Locale = 'ka' | 'en' | 'ru';

const UI = {
  ka: {
    compareEyebrow: 'რა იცვლება', compareHeading: 'იგივე საქმე. ნაკლები ხელით სამუშაო.', before: 'დღეს, სისტემის გარეშე', after: 'პროდუქტთან ერთად',
    beforeRows: [['საქმე ხელით იწყება','გუნდი დროს რუტინულ ნაბიჯებზე ხარჯავს'],['ინფორმაცია სხვადასხვა ადგილასაა','საჭირო დეტალების მოძებნა თავიდან გიწევთ'],['შეცდომა გვიან ჩანს','შემოწმება მხოლოდ შედეგის ბოლოს ხდება'],['შემდეგი ნაბიჯი გაურკვეველია','მფლობელს პროცესის გადამოწმება თავად უწევს']],
    dashboardEyebrow: 'ზარის შედეგი', dashboardHeading: 'ერთ წამში ხედავთ, როგორ დასრულდა ზარი.', dashboardNote: 'ქვემოთ ნაჩვენებია საილუსტრაციო ზარი. თქვენს ანგარიშში თითოეული ზარის შედეგი ასეთივე მარტივი ფორმით გამოჩნდება.', dashboardGroup: 'ბოლო ზარი', dashboardPeriod: 'დასრულდა 14:08', dashboardPerson: 'დავით მ.', dashboardPhone: '+995 5XX XX XX XX', dashboardStatus: 'ვიზიტი დადასტურდა', dashboardSummary: 'რა მოხდა ზარში', dashboardSummaryRows: ['aiCALL-მა კლიენტს ხვალინდელი ვიზიტი შეახსენა','კლიენტმა 14:00 საათი დაადასტურა','კლიენტმა პარკინგის შესახებ იკითხა','aiCALL-მა დამტკიცებული პასუხი გასცა'], dashboardFacts: [['ხანგრძლივობა','00:46'],['მიმართულება','გამავალი'],['ენა','ქართული']], dashboardNext: 'შემდეგი ნაბიჯი', dashboardFoot: 'არაფერია გასაკეთებელი. ვიზიტი დადასტურებულია და თანამშრომლის ჩარევა საჭირო არ არის.',
    reviewsHeading: 'რეალური შეფასებები aiNOW-ის გუნდის შესახებ.', reviewsLink: '25 შეფასება Google-ზე',
    casesEyebrow: 'პრაქტიკაში', casesHeading: 'სამი მარტივი სცენარი.', casesNote: 'პროცესი ნაჩვენებია მარტივად, ზედმეტი ტექნიკური დეტალების გარეშე.',
    integrationsEyebrow: 'რას ვაერთებთ', integrationsHeading: 'მუშაობს იმ სისტემებთან, რომლებსაც ბიზნესი უკვე იყენებს.', integrationsNote: 'ახალი რთული პროგრამის სწავლა არ გჭირდებათ.',
    resourcesEyebrow: 'სასარგებლო მასალები', resourcesHeading: 'ჯერ გაეცანით. შემდეგ მიიღეთ გადაწყვეტილება.', resourceAction: 'წაკითხვა', resourceTitles: ['როგორ მუშაობს ეს ბიზნესში','რა უნდა იცოდეთ დაწყებამდე','როგორ აწყობს aiNOW სამუშაო სისტემას'], illustrative: 'საილუსტრაციო მონაცემები',
  },
  en: {
    compareEyebrow: 'What changes', compareHeading: 'The same work. Less manual effort.', before: 'Today, without the system', after: 'With the product',
    beforeRows: [['Work starts by hand','The team spends time on routine steps'],['Information lives in different places','People search for the same details again'],['Errors appear late','Checks happen only after the work is done'],['The next step is unclear','The owner has to inspect the process personally']],
    dashboardEyebrow: 'Call result', dashboardHeading: 'See how the call ended in one glance.', dashboardNote: 'This is an illustrative call. Your account presents every completed call in the same clear format.', dashboardGroup: 'Latest call', dashboardPeriod: 'Finished at 14:08', dashboardPerson: 'David M.', dashboardPhone: '+995 5XX XX XX XX', dashboardStatus: 'Appointment confirmed', dashboardSummary: 'What happened on the call', dashboardSummaryRows: ['aiCALL reminded the client about tomorrow’s visit','The client confirmed the 14:00 appointment','The client asked about parking','aiCALL gave the approved answer'], dashboardFacts: [['Duration','00:46'],['Direction','Outbound'],['Language','Georgian']], dashboardNext: 'Next step', dashboardFoot: 'Nothing to do. The appointment is confirmed and no staff intervention is required.',
    reviewsHeading: 'Real reviews about the aiNOW team.', reviewsLink: '25 reviews on Google',
    casesEyebrow: 'In practice', casesHeading: 'Three simple scenarios.', casesNote: 'The process is shown in plain business language without unnecessary technical detail.',
    integrationsEyebrow: 'Connections', integrationsHeading: 'Works with the systems the business already uses.', integrationsNote: 'Your team does not need to learn another complicated tool.',
    resourcesEyebrow: 'Useful guides', resourcesHeading: 'Understand it first. Decide after.', resourceAction: 'Read guide', resourceTitles: ['How this works in a business','What to know before you start','How aiNOW builds the working system'], illustrative: 'Illustrative data',
  },
  ru: {
    compareEyebrow: 'Что меняется', compareHeading: 'Та же работа. Меньше ручных действий.', before: 'Сейчас, без системы', after: 'Вместе с продуктом',
    beforeRows: [['Работа начинается вручную','Команда тратит время на повторяющиеся действия'],['Информация хранится в разных местах','Одни и те же данные приходится искать заново'],['Ошибки становятся заметны поздно','Проверка начинается после завершения работы'],['Следующий шаг непонятен','Владельцу приходится лично проверять процесс']],
    dashboardEyebrow: 'Результат звонка', dashboardHeading: 'Сразу видно, чем закончился звонок.', dashboardNote: 'Ниже показан демонстрационный звонок. В кабинете результат каждого звонка отображается так же понятно.', dashboardGroup: 'Последний звонок', dashboardPeriod: 'Завершён в 14:08', dashboardPerson: 'Давид М.', dashboardPhone: '+995 5XX XX XX XX', dashboardStatus: 'Визит подтверждён', dashboardSummary: 'Что произошло во время звонка', dashboardSummaryRows: ['aiCALL напомнил клиенту о завтрашнем визите','Клиент подтвердил запись на 14:00','Клиент спросил о парковке','aiCALL дал утверждённый ответ'], dashboardFacts: [['Длительность','00:46'],['Направление','Исходящий'],['Язык','Грузинский']], dashboardNext: 'Следующий шаг', dashboardFoot: 'Ничего делать не нужно. Визит подтверждён, вмешательство сотрудника не требуется.',
    reviewsHeading: 'Реальные отзывы о команде aiNOW.', reviewsLink: '25 отзывов в Google',
    casesEyebrow: 'На практике', casesHeading: 'Три простых сценария.', casesNote: 'Процесс объяснён на языке бизнеса без лишних технических подробностей.',
    integrationsEyebrow: 'Подключения', integrationsHeading: 'Работает с системами, которые бизнес уже использует.', integrationsNote: 'Команде не нужно осваивать ещё одну сложную программу.',
    resourcesEyebrow: 'Полезные материалы', resourcesHeading: 'Сначала разберитесь. Потом принимайте решение.', resourceAction: 'Читать', resourceTitles: ['Как это работает в бизнесе','Что нужно знать перед запуском','Как aiNOW собирает рабочую систему'], illustrative: 'Демонстрационные данные',
  },
} as const;

const REVIEWS = [
  { name: 'giorgi bagratiani', text: 'ავტოსამრეცხაო გვაქვს და ბოტში დროის მიხედვით ჩაწერა მოიფიქრეს. რიგები შემცირდა და კლიენტიც კმაყოფილია.' },
  { name: 'Edi Tamoyani', text: 'ახლა ბოტი თავად სცემს პასუხს ფასებზე და ჩაწერასაც ნებისმიერ დროს აკეთებს. თავისუფალი საათები უკეთ ივსება.' },
  { name: 'Luka Karumidze', text: 'ბოტი კლიენტებს პირდაპირ Instagram-იდან იწერს. თავისუფალი საათები უფრო მჭიდროდ ივსება.' },
] as const;

type ProductLandingConfig = {
  integrations: Array<[string, string]>;
  resources: [string, string, string];
  resourceTitles: Record<Locale, [string, string, string]>;
};

const PRODUCT_LANDING_CONFIG = {
  aicall: {
    integrations: [['solar:phone-bold-duotone','Phone'],['solar:calendar-bold-duotone','Calendar'],['solar:users-group-rounded-bold-duotone','CRM'],['solar:chat-round-dots-bold-duotone','Telegram']],
    resources: ['/services/voice-agents','/ai-biznesistvis','/projects'],
    resourceTitles: { ka: ['ხმოვანი აგენტები ბიზნესისთვის','როგორ დავნერგოთ AI ბიზნესში','aiNOW-ის რეალური პროექტები'], en: ['Voice agents for business','How to introduce AI in a business','Real projects by aiNOW'], ru: ['Голосовые агенты для бизнеса','Как внедрить AI в бизнесе','Реальные проекты aiNOW'] },
  },
  aiweb: {
    integrations: [['solar:global-bold-duotone','Website'],['solar:chart-2-bold-duotone','Analytics'],['solar:letter-bold-duotone','Forms'],['solar:server-bold-duotone','Domain']],
    resources: ['/services/websites','/services/seo','/projects'],
    resourceTitles: { ka: ['როგორ ქმნის aiNOW ბიზნეს-საიტებს','როგორ პოულობენ საიტს Google-ში','aiNOW-ის რეალური პროექტები'], en: ['How aiNOW builds business websites','How customers find a site on Google','Real projects by aiNOW'], ru: ['Как aiNOW создаёт сайты для бизнеса','Как клиенты находят сайт в Google','Реальные проекты aiNOW'] },
  },
  aioffice: {
    integrations: [['solar:chat-round-dots-bold-duotone','Viber'],['solar:document-text-bold-duotone','RS.ge'],['solar:calculator-bold-duotone','1C'],['solar:database-bold-duotone','ORIS / Balance']],
    resources: ['/services/automation','/ai-biznesistvis','/projects'],
    resourceTitles: { ka: ['ბიზნეს-პროცესების ავტომატიზაცია','როგორ დავნერგოთ AI ბიზნესში','aiNOW-ის რეალური პროექტები'], en: ['Business process automation','How to introduce AI in a business','Real projects by aiNOW'], ru: ['Автоматизация бизнес-процессов','Как внедрить AI в бизнесе','Реальные проекты aiNOW'] },
  },
  aidocs: {
    integrations: [['solar:document-bold-duotone','PDF'],['solar:camera-bold-duotone','Camera'],['solar:document-text-bold-duotone','RS.ge'],['solar:calculator-bold-duotone','1C / Balance']],
    resources: ['/services/automation','/ai-biznesistvis','/projects'],
    resourceTitles: { ka: ['დოკუმენტების ავტომატიზაცია','როგორ დავნერგოთ AI უსაფრთხოდ','aiNOW-ის რეალური პროექტები'], en: ['Document workflow automation','How to introduce AI safely','Real projects by aiNOW'], ru: ['Автоматизация работы с документами','Как безопасно внедрить AI','Реальные проекты aiNOW'] },
  },
  aiapp: {
    integrations: [['solar:global-bold-duotone','Web'],['solar:smartphone-bold-duotone','Mobile'],['solar:code-square-bold-duotone','API'],['solar:chart-2-bold-duotone','Analytics']],
    resources: ['/services/websites','/ai-biznesistvis','/projects'],
    resourceTitles: { ka: ['ციფრული პროდუქტი ბიზნესისთვის','როგორ დავიწყოთ AI-პროდუქტი','aiNOW-ის რეალური პროექტები'], en: ['A digital product for a business','How to start an AI product','Real projects by aiNOW'], ru: ['Цифровой продукт для бизнеса','Как запустить AI-продукт','Реальные проекты aiNOW'] },
  },
  vibecoding: {
    integrations: [['solar:global-bold-duotone','Public app'],['solar:code-square-bold-duotone','Source'],['solar:server-square-cloud-bold-duotone','API'],['solar:database-bold-duotone','Database']],
    resources: ['/services/websites','/services/seo','/projects'],
    resourceTitles: { ka: ['უსაფრთხო ვებ-პროდუქტის საფუძვლები','რა უნდა ნახოს Google-მა საიტზე','aiNOW-ის რეალური პროექტები'], en: ['Foundations of a safer web product','What Google should see on a website','Real projects by aiNOW'], ru: ['Основы безопасного веб-продукта','Что Google должен видеть на сайте','Реальные проекты aiNOW'] },
  },
  aicontent: {
    integrations: [['solar:camera-bold-duotone','Instagram'],['solar:users-group-rounded-bold-duotone','Facebook'],['solar:videocamera-record-bold-duotone','TikTok'],['solar:play-circle-bold-duotone','YouTube']],
    resources: ['/blog','/ai-biznesistvis','/projects'],
    resourceTitles: { ka: ['კონტენტის პრაქტიკული გზამკვლევები','როგორ გამოიყენოს ბიზნესმა AI','aiNOW-ის რეალური პროექტები'], en: ['Practical content guides','How a business can use AI','Real projects by aiNOW'], ru: ['Практические материалы о контенте','Как бизнесу использовать AI','Реальные проекты aiNOW'] },
  },
  aiads: {
    integrations: [['solar:users-group-rounded-bold-duotone','Meta'],['solar:global-bold-duotone','Google'],['solar:camera-bold-duotone','Instagram'],['solar:chart-2-bold-duotone','Analytics']],
    resources: ['/services/seo','/blog','/projects'],
    resourceTitles: { ka: ['როგორ იზომება ონლაინ შედეგი','მარკეტინგის პრაქტიკული გზამკვლევები','aiNOW-ის რეალური პროექტები'], en: ['How online outcomes are measured','Practical marketing guides','Real projects by aiNOW'], ru: ['Как измеряется результат онлайн','Практические материалы о маркетинге','Реальные проекты aiNOW'] },
  },
  aitaxi: {
    integrations: [['solar:map-point-bold-duotone','Maps'],['solar:wheel-bold-duotone','Fleet'],['solar:battery-charge-bold-duotone','Charging'],['solar:radar-2-bold-duotone','Telemetry']],
    resources: ['/blog','/about','/projects'],
    resourceTitles: { ka: ['ავტონომიური ტაქსის გზამკვლევები','ვინ ქმნის aiTAXI-ს','aiNOW-ის რეალური პროექტები'], en: ['Autonomous taxi guides','Who is building aiTAXI','Real projects by aiNOW'], ru: ['Материалы об автономном такси','Кто создаёт aiTAXI','Реальные проекты aiNOW'] },
  },
} satisfies Record<string, ProductLandingConfig>;

export function ProductLandingSections(): React.ReactElement {
  const locale = useLocale() as Locale;
  const c = UI[locale] ?? UI.en;
  const t = useTranslations('product.work');
  const siteKey: string = SITE.key;
  const productName = `${SITE.wordmark.prefix}${SITE.wordmark.mark}`;
  const steps = [1,2,3,4,5,6].map((number) => ({ title: t(`s${number}Title`), tag: t(`s${number}Tag`), description: t(`s${number}Desc`) }));
  const config = PRODUCT_LANDING_CONFIG[siteKey as keyof typeof PRODUCT_LANDING_CONFIG] ?? PRODUCT_LANDING_CONFIG.aiweb;
  const integrations = config.integrations;
  const urls = config.resources;
  const resourceTitles = config.resourceTitles[locale];

  return <>
    <section id="compare" className="pl-section pl-compare" data-landing-section="compare"><div className="pl-shell" data-family-shell="true"><SectionHead eyebrow={c.compareEyebrow} heading={c.compareHeading}/><div className="pl-compare-table"><div className="pl-compare-head"><span>{c.before}</span><span>{productName}</span></div>{c.beforeRows.map((before,index)=><div className="pl-compare-row" key={before[0]}><div className="pl-compare-side is-before"><Ico name="solar:close-circle-bold-duotone"/><span><strong>{before[0]}</strong><small>{before[1]}</small></span></div><Ico name="solar:arrow-right-bold-duotone" className="pl-compare-arrow" aria-hidden="true"/><div className="pl-compare-side is-after"><Ico name="solar:check-circle-bold-duotone"/><span><strong>{steps[index].title}</strong><small>{steps[index].description}</small></span></div></div>)}</div></div></section>
    <section id="dashboard" className="pl-section pl-dashboard" data-landing-section="dashboard" data-demo-static="true"><div className="pl-shell" data-family-shell="true"><div className="pl-dashboard-intro"><SectionHead eyebrow={c.dashboardEyebrow} heading={c.dashboardHeading}/><p>{c.dashboardNote}</p></div><div className="pl-dashboard-panel"><div className="pl-dashboard-bar"><span><i/>{productName} · {c.dashboardGroup}</span><small>{c.dashboardPeriod}</small></div><div className="pl-call-result"><article className="pl-call-contact"><div className="pl-call-person"><span aria-hidden="true">{c.dashboardPerson.slice(0,1)}</span><div><strong>{c.dashboardPerson}</strong><small>{c.dashboardPhone}</small></div></div><div className="pl-call-status"><Ico name="solar:check-circle-bold-duotone"/><span>{c.dashboardStatus}</span></div><dl>{c.dashboardFacts.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article><article className="pl-call-summary"><h3>{c.dashboardSummary}</h3><ul>{c.dashboardSummaryRows.map((row)=><li key={row}><Ico name="solar:check-circle-bold-duotone"/><span>{row}</span></li>)}</ul><div className="pl-call-next"><Ico name="solar:calendar-mark-bold-duotone"/><span><small>{c.dashboardNext}</small><strong>{c.dashboardFoot}</strong></span></div></article></div><p className="pl-dashboard-disclaimer"><Ico name="solar:info-circle-bold-duotone"/>{c.illustrative}</p></div></div></section>
    <section id="reviews" className="pl-reviews" data-landing-section="reviews" aria-labelledby="reviews-title"><div className="pl-reviews-label"><h2 id="reviews-title">{c.reviewsHeading}</h2><a href="https://maps.google.com/?cid=15533558721751972154" target="_blank" rel="noreferrer"><GoogleMark/><strong>4.7</strong><span>{c.reviewsLink}</span></a></div><div className="pl-review-viewport" tabIndex={0} role="region" aria-labelledby="reviews-title"><div className="pl-review-track">{[...REVIEWS,...REVIEWS].map((review,index)=><article className="pl-review" key={`${review.name}-${index}`} aria-hidden={index>=REVIEWS.length||undefined}><div><span>{review.name.slice(0,1).toUpperCase()}</span><strong>{review.name}</strong></div><p>{review.text}</p><span className="pl-review-stars" role="img" aria-label="5 stars">{[0,1,2,3,4].map((star)=><Ico name="solar:star-bold" key={star}/>)}</span></article>)}</div></div></section>
    <section id="cases" className="pl-section pl-cases" data-landing-section="cases" data-demo-static="true"><div className="pl-shell" data-family-shell="true"><div className="pl-section-split"><SectionHead eyebrow={c.casesEyebrow} heading={c.casesHeading}/><p>{c.casesNote}</p></div><div className="pl-case-list">{[steps[0],steps[2],steps[4]].map((step,index)=><article className="pl-case" data-business-outcome="true" key={step.title}><span className="pl-case-index">0{index+1}</span><div><strong>{step.title}</strong><p>{step.description}</p></div><span className="pl-case-tag">{step.tag}</span><Ico name="solar:arrow-right-bold-duotone"/></article>)}</div></div></section>
    <section id="integrations" className="pl-section pl-integrations" data-landing-section="integrations"><div className="pl-shell" data-family-shell="true"><SectionHead eyebrow={c.integrationsEyebrow} heading={c.integrationsHeading} description={c.integrationsNote} centered/><div className="pl-integration-grid">{integrations.map(([icon,label])=><article className="pl-integration" key={label}><span><Ico name={icon}/></span><strong>{label}</strong></article>)}</div></div></section>
    <section id="resources" className="pl-section pl-resources" data-landing-section="resources"><div className="pl-shell" data-family-shell="true"><SectionHead eyebrow={c.resourcesEyebrow} heading={c.resourcesHeading}/><div className="pl-resource-grid">{urls.map((path,index)=>{const isLocal=siteKey==='aitaxi'&&index<2;return <a className="pl-resource" href={`${isLocal?'':'https://ainow.ge'}${path}`} target={isLocal?undefined:'_blank'} rel={isLocal?undefined:'noreferrer'} key={path}><span>0{index+1}</span><strong>{resourceTitles[index]}</strong><small>{c.resourceAction}<Ico name="solar:arrow-right-up-bold-duotone"/></small></a>;})}</div></div></section>
  </>;
}

function SectionHead({eyebrow,heading,description,centered=false}:{eyebrow:string;heading:string;description?:string;centered?:boolean}):React.ReactElement { return <header className={`pl-section-head${centered?' is-centered':''}`}><span>{eyebrow}</span><h2>{heading}</h2>{description?<p>{description}</p>:null}</header>; }
function GoogleMark():React.ReactElement { return <svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 4.48-4.78 6.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59A14.7 14.7 0 0 1 9.77 24c0-1.6.27-3.14.76-4.59l-7.98-6.19A24 24 0 0 0 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>; }
