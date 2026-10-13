export const MODEL_PROOF_PROVIDER_KEYS = [
  "Inbound",
  "Outbound",
  "Rules",
  "Outcome",
  "Language",
  "Consent",
  "History",
  "Review",
  "Phone",
  "Context",
  "Limits",
] as const;

export type ModelProofProviderKey = (typeof MODEL_PROOF_PROVIDER_KEYS)[number];
export type ModelProofSourceTone = "openai" | "anthropic" | "google" | "xai" | "mistral" | "deepseek" | "meta" | "qwen" | "cohere" | "zai" | "kimi";

// These suffixes are the frozen source slot roles from aiNOW's original
// ModelProof CSS. They are intentionally independent of translated labels.
export const MODEL_PROOF_SOURCE_TONES: Record<ModelProofProviderKey, ModelProofSourceTone> = {
  Inbound: "openai",
  Outbound: "anthropic",
  Rules: "google",
  Outcome: "xai",
  Language: "mistral",
  Consent: "deepseek",
  History: "meta",
  Review: "qwen",
  Phone: "cohere",
  Context: "zai",
  Limits: "kimi",
};

export type AiNowModelProofCopy = {
  eyebrow: string;
  title: string;
  description: string;
  radar: string;
  moreTechnologies: string;
  jevKicker: string;
  jevTitle: string;
  jevDescription: string;
  trustLabel: string;
  providerLabels: Record<ModelProofProviderKey, string>;
  initialModels: Record<"Inbound" | "Outbound" | "Rules" | "Outcome", string>;
  brand: {
    established: string;
    title: string;
    location: string;
    language: string;
  };
  trust: readonly {
    value: string;
    label: string;
    detail: string;
    image: string;
  }[];
};

const sharedImages = {
  inbound: "/graphics-3d/products/02-aicall.png",
  context: "/graphics-3d/products/aicall-rules-workflow-v1.png",
  outcome: "/graphics-3d/products/aicall-outcome-workflow-v1.png",
  review: "/images/model-trust/aicall-decision-path-v1.png",
} as const;

export function modelProofTrustItemClassName(index: number): string {
  return `ainow-model-stage__trust-item${index === 3 ? " ainow-model-stage__trust-item--always-on" : ""}`;
}

export const AI_NOW_MODEL_PROOF_COPY: Record<"ka" | "en" | "ru", AiNowModelProofCopy> = {
  ka: {
    eyebrow: "როგორ იგეგმება ზარის პროცესი",
    title: "ხმოვანი აგენტი კონკრეტულ ამოცანაზე იგეგმება.",
    description: "გაშვებამდე ვაზუსტებთ მიზანს, ინფორმაციას, ენას, ნომრის გამართვასა და შემოწმების გზას.",
    radar: "რა სჭირდება ზარის პროცესს",
    moreTechnologies: "დამატებითი დეტალები",
    jevKicker: "გადაწყვეტილების ფენა",
    jevTitle: "განსაზღვრული ზარის ამოცანა",
    jevDescription: "სისტემა მიჰყვება შეთანხმებულ წესებს; რთული ან გაურკვეველი საუბარი დადასტურებულ შემოწმების გზას მიჰყვება.",
    trustLabel: "ზარის ფარგლები, კონტროლი და შედეგი",
    providerLabels: {
      Inbound: "შემომავალი",
      Outbound: "გამავალი",
      Rules: "წესები",
      Outcome: "შედეგი",
      Language: "ენა",
      Consent: "თანხმობა",
      History: "ისტორია",
      Review: "შემოწმება",
      Phone: "ტელეფონი",
      Context: "კონტექსტი",
      Limits: "ფარგლები",
    },
    initialModels: {
      Inbound: "შემომავალი ზარის ამოცანა",
      Outbound: "გამავალი ზარის ამოცანა",
      Rules: "ბიზნესის წესები",
      Outcome: "დაფიქსირებული შედეგი",
    },
    brand: {
      established: "aiCALL · თბილისი",
      title: "რეალური ზარებისთვის შექმნილი",
      location: "თბილისი / aiNOW",
      language: "ქართული ენა. მკაფიო წესები.",
    },
    trust: [
      { value: "შემომავალი", label: "შემომავალი ზარის მიზანი", detail: "სცენარი გამართვამდე განისაზღვრება", image: sharedImages.inbound },
      { value: "კონტექსტი", label: "ბიზნესის გამოყენებული ინფორმაცია", detail: "წესები და ტერმინები თქვენი მასალიდან მოდის", image: sharedImages.context },
      { value: "შედეგი", label: "დაფიქსირებული ზარის შედეგი", detail: "დადასტურებული, გადადებული ან უპასუხო სტატუსი", image: sharedImages.outcome },
      { value: "შემოწმება", label: "ადამიანის ჩართულობის ზღვარი", detail: "გაურკვეველი ან რთული შემთხვევა თვალსაჩინო რჩება", image: sharedImages.review },
    ],
  },
  en: {
    eyebrow: "How the call workflow is chosen",
    title: "The voice agent is scoped to the call task.",
    description: "Before activation, we define the objective, information, language, phone setup and review path.",
    radar: "What the call workflow needs",
    moreTechnologies: "More detail",
    jevKicker: "Decision layer",
    jevTitle: "Bounded call task",
    jevDescription: "The system follows the agreed rules; complex or uncertain calls follow the confirmed review path.",
    trustLabel: "Call scope, controls and outcome",
    providerLabels: {
      Inbound: "Inbound",
      Outbound: "Outbound",
      Rules: "Rules",
      Outcome: "Outcome",
      Language: "Language",
      Consent: "Consent",
      History: "History",
      Review: "Review",
      Phone: "Phone",
      Context: "Context",
      Limits: "Limits",
    },
    initialModels: {
      Inbound: "incoming call task",
      Outbound: "outgoing call task",
      Rules: "business rules",
      Outcome: "recorded outcome",
    },
    brand: {
      established: "aiCALL · aiNOW",
      title: "Voice work with clear boundaries.",
      location: "Tbilisi / aiNOW team",
      language: "Incoming and agreed outgoing calls, with visible outcomes.",
    },
    trust: [
      { value: "Inbound", label: "INCOMING CALL OBJECTIVE", detail: "Scenario defined before setup", image: sharedImages.inbound },
      { value: "Context", label: "BUSINESS INFORMATION", detail: "Rules and terminology come from your material", image: sharedImages.context },
      { value: "Outcome", label: "RECORDED CALL RESULT", detail: "Confirmed, postponed or unanswered status", image: sharedImages.outcome },
      { value: "Review", label: "HUMAN REVIEW BOUNDARY", detail: "Uncertain or complex cases stay visible", image: sharedImages.review },
    ],
  },
  ru: {
    eyebrow: "Как выбирается процесс звонка",
    title: "Голосовой агент работает в рамках задачи звонка.",
    description: "До запуска мы определяем цель, информацию, язык, настройку телефона и путь проверки.",
    radar: "Что нужно процессу звонка",
    moreTechnologies: "Подробнее",
    jevKicker: "Правила сценария",
    jevTitle: "Определённая задача звонка",
    jevDescription: "Система следует согласованным правилам; сложные или неясные разговоры идут по подтверждённому пути проверки.",
    trustLabel: "Сценарий, контроль и результат",
    providerLabels: {
      Inbound: "Входящие",
      Outbound: "Исходящие",
      Rules: "Правила",
      Outcome: "Результат",
      Language: "Язык",
      Consent: "Согласие",
      History: "История",
      Review: "Проверка",
      Phone: "Телефон",
      Context: "Контекст",
      Limits: "Границы",
    },
    initialModels: {
      Inbound: "задача входящего звонка",
      Outbound: "задача исходящего звонка",
      Rules: "правила бизнеса",
      Outcome: "зафиксированный результат",
    },
    brand: {
      established: "aiCALL · Тбилиси",
      title: "Для реальной работы со звонками",
      location: "Тбилиси / aiNOW",
      language: "Грузинский язык. Понятные правила.",
    },
    trust: [
      { value: "Входящие", label: "ЦЕЛЬ ВХОДЯЩЕГО ЗВОНКА", detail: "Сценарий определяется до настройки", image: sharedImages.inbound },
      { value: "Контекст", label: "ИНФОРМАЦИЯ О БИЗНЕСЕ", detail: "Правила и термины берутся из ваших материалов", image: sharedImages.context },
      { value: "Результат", label: "ЗАФИКСИРОВАННЫЙ ИТОГ ЗВОНКА", detail: "Подтверждено, отложено или без ответа", image: sharedImages.outcome },
      { value: "Проверка", label: "ГРАНИЦА УЧАСТИЯ ЧЕЛОВЕКА", detail: "Неясные и сложные случаи остаются видимыми", image: sharedImages.review },
    ],
  },
};

export function getAiNowModelProofCopy(locale: string): AiNowModelProofCopy {
  return AI_NOW_MODEL_PROOF_COPY[locale === "ka" || locale === "ru" ? locale : "en"];
}

