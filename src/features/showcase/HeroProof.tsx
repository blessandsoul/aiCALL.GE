'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { Ico } from '@/components/common/Ico';
import { createDemoLoop } from '@/features/home/components/lib/demo-loop.mjs';
import './call-hero-proof.css';

const AI_AVATAR_IMG = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80";
const DAVIT_AVATAR_IMG = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";
const GIORGI_AVATAR_IMG = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80";

type ScriptItem = {
  id: number;
  speaker: string;
  text: string;
  isAgent: boolean;
  avatarImg: string;
  audioSrc: string;
};

type DemoLocale = 'ka' | 'en' | 'ru';

type DemoCopy = {
  tabs: { outbound: string; inbound: string };
  liveExample: string;
  listen: string;
  stop: string;
  restart: string;
  outbound: Array<Pick<ScriptItem, 'speaker' | 'text'>>;
  outboundNext: Array<Pick<ScriptItem, 'speaker' | 'text'>>;
  inbound: Array<Pick<ScriptItem, 'speaker' | 'text'>>;
  campaign: {
    fileName: string;
    checking: string;
    ready: string;
    progress: string;
    called: string;
    answered: string;
    booked: string;
    waiting: string;
    calling: string;
    saved: string;
    queued: string;
    illustrative: string;
    currentResult: string;
    savedResult: string;
    nextResult: string;
    footerSummary: string;
    inboundNote: string;
    rows: Array<{
      initials: string;
      name: string;
      phone: string;
      intent: string;
      result: string;
    }>;
  };
};

const DEMO_COPY: Record<DemoLocale, DemoCopy> = {
  ka: {
    tabs: { outbound: 'aiCALL რეკავს', inbound: 'aiCALL პასუხობს' },
    liveExample: 'მოსმენა',
    listen: 'ხმის ჩასართავად დააჭირეთ',
    stop: 'დემოს შეჩერება',
    restart: 'დემოს თავიდან გაშვება',
    outbound: [
      { speaker: 'aiCALL, ოპერატორი', text: 'გამარჯობა, ბატონო დავით. კლინიკა „მედექსიდან“ გირეკავთ. ხვალ 14:00 საათზე ექიმთან ვიზიტი გაქვთ. ადასტურებთ?' },
      { speaker: 'დავით მ., პაციენტი', text: 'დიახ, მოვალ. ეზოში პარკინგი თუ გაქვთ?' },
      { speaker: 'aiCALL, ოპერატორი', text: 'დიახ, პაციენტებისთვის პარკინგი უფასოა. გელოდებით ხვალ 14:00 საათზე.' },
    ],
    outboundNext: [
      { speaker: 'aiCALL, ოპერატორი', text: 'გამარჯობა, ქალბატონო ნინო. ხვალინდელი მიწოდების დროის დასადასტურებლად გირეკავთ. 12:00 საათი გაწყობთ?' },
      { speaker: 'ნინო კ., კლიენტი', text: '12:00-ზე ვერ ვიქნები. შეგიძლიათ 15:00 საათზე მოიტანოთ?' },
      { speaker: 'aiCALL, ოპერატორი', text: 'დიახ, მიწოდება 15:00 საათზე გადავიტანეთ. დადასტურება უკვე შენახულია.' },
    ],
    inbound: [
      { speaker: 'გიორგი ლ., კლიენტი', text: 'გამარჯობა, დღეს საღამოს თერაპევტთან თავისუფალი დრო გაქვთ?' },
      { speaker: 'aiCALL, ოპერატორი', text: 'დიახ, 18:30 საათზე თავისუფალი დროა. ჩაგწეროთ?' },
    ],
    campaign: {
      fileName: 'clients.xlsx',
      checking: 'ნომრები მოწმდება',
      ready: '1 211 ნომერი მზადაა',
      progress: 'მიმდინარე',
      called: 'დარეკილი',
      answered: 'პასუხი',
      booked: 'შედეგი',
      waiting: 'რიგშია',
      calling: 'მიმდინარეობს',
      saved: 'შენახულია',
      queued: 'შემდეგია',
      illustrative: 'საილუსტრაციო კამპანია',
      currentResult: 'aiCALL ხსნის ერთ ნომერს, რეკავს და პასუხს იმავე ჩანაწერში ინახავს.',
      savedResult: 'ზარის შედეგი შენახულია. შემდეგი ნომერი უკვე მზადაა.',
      nextResult: 'შემდეგი კლიენტი რიგშია და ზარი ავტომატურად დაიწყება.',
      footerSummary: 'სია, ზარი და პასუხი ერთ ეკრანზე რჩება.',
      inboundNote: 'შემომავალ ზარზე aiCALL პირდაპირ პასუხობს. ფაილი მხოლოდ მასობრივი დარეკვისთვის არის საჭირო.',
      rows: [
        { initials: 'დმ', name: 'დავით მ.', phone: '+995 555 12 34 56', intent: 'ვიზიტის დადასტურება', result: 'ვიზიტი დადასტურდა' },
        { initials: 'ნკ', name: 'ნინო კ.', phone: '+995 555 23 45 67', intent: 'მიწოდების დრო', result: 'დრო შეიცვალა' },
        { initials: 'მგ', name: 'მარიამ გ.', phone: '+995 555 34 56 78', intent: 'გადარეკვის მოთხოვნა', result: 'რიგშია' },
      ],
    },
  },
  en: {
    tabs: { outbound: 'aiCALL calls', inbound: 'aiCALL answers' },
    liveExample: 'Hear a Georgian call',
    listen: 'Select to turn on sound',
    stop: 'Stop demo',
    restart: 'Restart demo',
    outbound: [
      { speaker: 'aiCALL, operator', text: 'Hello, Mr Davit. This is Medex Clinic. You have an appointment tomorrow at 14:00. Would you like to confirm it?' },
      { speaker: 'Davit M., patient', text: 'Yes, I will come. Is parking available in the courtyard?' },
      { speaker: 'aiCALL, operator', text: 'Yes, parking is free for patients. We will see you tomorrow at 14:00.' },
    ],
    outboundNext: [
      { speaker: 'aiCALL, operator', text: 'Hello, Ms Nino. I am calling to confirm tomorrow’s delivery time. Does 12:00 work for you?' },
      { speaker: 'Nino K., customer', text: 'I will not be there at 12:00. Can you deliver at 15:00?' },
      { speaker: 'aiCALL, operator', text: 'Yes, the delivery is now scheduled for 15:00. The confirmation has been saved.' },
    ],
    inbound: [
      { speaker: 'Giorgi L., customer', text: 'Hello, do you have an available appointment with a therapist this evening?' },
      { speaker: 'aiCALL, operator', text: 'Yes, 18:30 is available. Shall I book it for you?' },
    ],
    campaign: {
      fileName: 'clients.xlsx',
      checking: 'Checking phone numbers',
      ready: '1,211 numbers are ready',
      progress: 'Current',
      called: 'Called',
      answered: 'Answered',
      booked: 'Results',
      waiting: 'Waiting',
      calling: 'Calling',
      saved: 'Saved',
      queued: 'Up next',
      illustrative: 'Illustrative campaign',
      currentResult: 'aiCALL opens one number, calls it and saves the answer in the same row.',
      savedResult: 'The call result is saved. The next number is ready.',
      nextResult: 'The next customer is queued and the call will start automatically.',
      footerSummary: 'The list, call and answer stay on one screen.',
      inboundNote: 'aiCALL answers inbound calls directly. A file is only needed for a bulk outbound campaign.',
      rows: [
        { initials: 'DM', name: 'Davit M.', phone: '+995 555 12 34 56', intent: 'Confirm appointment', result: 'Appointment confirmed' },
        { initials: 'NK', name: 'Nino K.', phone: '+995 555 23 45 67', intent: 'Delivery time', result: 'Time changed' },
        { initials: 'MG', name: 'Mariam G.', phone: '+995 555 34 56 78', intent: 'Callback request', result: 'Waiting' },
      ],
    },
  },
  ru: {
    tabs: { outbound: 'aiCALL звонит', inbound: 'aiCALL отвечает' },
    liveExample: 'Послушать звонок на грузинском',
    listen: 'Нажмите, чтобы включить звук',
    stop: 'Остановить демо',
    restart: 'Запустить демо заново',
    outbound: [
      { speaker: 'aiCALL, оператор', text: 'Здравствуйте, господин Давид. Звоним из клиники «Медекс». Вы записаны к врачу завтра на 14:00. Подтверждаете визит?' },
      { speaker: 'Давид М., пациент', text: 'Да, буду. У вас есть парковка во дворе?' },
      { speaker: 'aiCALL, оператор', text: 'Да, парковка для пациентов бесплатная. Ждём вас завтра в 14:00.' },
    ],
    outboundNext: [
      { speaker: 'aiCALL, оператор', text: 'Здравствуйте, Нино. Звоним подтвердить время завтрашней доставки. Вам удобно в 12:00?' },
      { speaker: 'Нино К., клиент', text: 'В 12:00 меня не будет. Можете привезти в 15:00?' },
      { speaker: 'aiCALL, оператор', text: 'Да, доставка перенесена на 15:00. Подтверждение уже сохранено.' },
    ],
    inbound: [
      { speaker: 'Гиорги Л., клиент', text: 'Здравствуйте, сегодня вечером есть свободное время у терапевта?' },
      { speaker: 'aiCALL, оператор', text: 'Да, свободно в 18:30. Записать вас?' },
    ],
    campaign: {
      fileName: 'clients.xlsx',
      checking: 'Проверяем номера',
      ready: '1 211 номеров готовы',
      progress: 'Текущий',
      called: 'Звонки',
      answered: 'Ответы',
      booked: 'Результаты',
      waiting: 'В очереди',
      calling: 'Идёт звонок',
      saved: 'Сохранено',
      queued: 'Следующий',
      illustrative: 'Демонстрационная кампания',
      currentResult: 'aiCALL открывает один номер, звонит и сохраняет ответ в той же строке.',
      savedResult: 'Результат звонка сохранён. Следующий номер готов.',
      nextResult: 'Следующий клиент уже в очереди, звонок начнётся автоматически.',
      footerSummary: 'Список, звонок и ответ остаются на одном экране.',
      inboundNote: 'На входящий звонок aiCALL отвечает сразу. Файл нужен только для массового обзвона.',
      rows: [
        { initials: 'ДМ', name: 'Давид М.', phone: '+995 555 12 34 56', intent: 'Подтвердить визит', result: 'Визит подтверждён' },
        { initials: 'НК', name: 'Нино К.', phone: '+995 555 23 45 67', intent: 'Время доставки', result: 'Время изменено' },
        { initials: 'МГ', name: 'Мариам Г.', phone: '+995 555 34 56 78', intent: 'Просьба перезвонить', result: 'В очереди' },
      ],
    },
  },
};

const AUDIO = {
  outbound: [
    { id: 1, isAgent: true, avatarImg: AI_AVATAR_IMG, audioSrc: '/audio/turn_1.mp3?v=6' },
    { id: 2, isAgent: false, avatarImg: DAVIT_AVATAR_IMG, audioSrc: '/audio/turn_2.mp3?v=6' },
    { id: 3, isAgent: true, avatarImg: AI_AVATAR_IMG, audioSrc: '/audio/turn_3.mp3?v=6' },
  ],
  inbound: [
    { id: 4, isAgent: false, avatarImg: GIORGI_AVATAR_IMG, audioSrc: '/audio/turn_4.mp3?v=6' },
    { id: 5, isAgent: true, avatarImg: AI_AVATAR_IMG, audioSrc: '/audio/turn_5.mp3?v=6' },
  ],
} satisfies Record<'outbound' | 'inbound', Array<Omit<ScriptItem, 'speaker' | 'text'>>>;

const CENTER_RATIOS = [0.15, 0.3, 0.55, 0.75, 0.95, 0.65, 0.45, 0.65, 0.95, 0.75, 0.55, 0.3, 0.15];
const CYCLE_MS = 8_400;
const FINAL_HOLD_MS = 2_200;
const SPEECH_SEQUENCE_MS = CYCLE_MS - FINAL_HOLD_MS;

type VoiceEnvelope = {
  durationSeconds: number;
  samples: readonly number[];
};

// RMS envelopes sampled from the five shipped Georgian recordings at 100ms.
// They keep the silent preview truthful to the real cadence and let the visible
// bars follow audio.currentTime exactly after the visitor enables sound.
const VOICE_ENVELOPES: Record<number, VoiceEnvelope> = {
  1: {
    durationSeconds: 7.15,
    samples: [
      0, 0, 68, 86, 93, 36, 79, 63, 52, 63, 62, 84, 67, 77, 55, 0, 0, 0,
      0, 24, 100, 98, 61, 83, 98, 43, 65, 30, 51, 75, 78, 55, 57, 30, 69, 13,
      0, 0, 0, 0, 29, 49, 95, 47, 19, 76, 37, 77, 28, 56, 72, 56, 71, 63, 69,
      13, 48, 78, 59, 34, 95, 69, 16, 71, 34, 67, 50, 0, 65, 64, 51, 0,
    ],
  },
  2: {
    durationSeconds: 4.25,
    samples: [
      70, 85, 74, 0, 13, 0, 28, 77, 100, 80, 80, 97, 88, 68, 26, 0, 0, 0, 0,
      0, 0, 0, 0, 73, 61, 93, 37, 81, 83, 47, 82, 84, 85, 86, 61, 23, 82, 46,
      40, 33, 25, 0, 0,
    ],
  },
  3: {
    durationSeconds: 6.1,
    samples: [
      0, 0, 27, 93, 17, 0, 0, 0, 51, 100, 84, 58, 79, 65, 66, 30, 91, 90, 60,
      72, 70, 62, 79, 18, 71, 49, 54, 81, 76, 45, 35, 86, 48, 69, 61, 0, 0, 0,
      94, 81, 90, 94, 88, 47, 23, 88, 86, 0, 65, 33, 95, 62, 32, 50, 36, 0,
      36, 44, 0, 0, 0,
    ],
  },
  4: {
    durationSeconds: 4.3,
    samples: [
      0, 0, 0, 0, 0, 70, 100, 95, 65, 96, 79, 66, 28, 95, 92, 52, 98, 75, 82,
      71, 38, 16, 100, 95, 85, 72, 19, 82, 61, 85, 95, 54, 55, 96, 80, 89, 65,
      82, 66, 95, 68, 21, 14,
    ],
  },
  5: {
    durationSeconds: 4.8,
    samples: [
      0, 0, 0, 66, 77, 79, 65, 34, 0, 0, 48, 50, 100, 76, 32, 85, 45, 60, 68,
      65, 31, 62, 42, 42, 21, 73, 64, 28, 38, 59, 62, 52, 57, 43, 0, 0, 0, 0,
      31, 75, 19, 28, 46, 88, 59, 13, 0, 0,
    ],
  },
};

function sampleVoiceEnvelope(envelope: VoiceEnvelope, progress: number): number {
  if (progress <= 0 || progress >= 1 || envelope.samples.length < 2) return 0;

  const position = progress * (envelope.samples.length - 1);
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.min(envelope.samples.length - 1, lowerIndex + 1);
  const blend = position - lowerIndex;
  const lower = envelope.samples[lowerIndex] ?? 0;
  const upper = envelope.samples[upperIndex] ?? lower;

  return (lower + (upper - lower) * blend) / 100;
}

function getVisualTurnDuration(scriptLength: number, index: number): number {
  if (scriptLength <= 1) return SPEECH_SEQUENCE_MS;
  if (index < scriptLength - 1) return SPEECH_SEQUENCE_MS / (scriptLength - 1);
  return FINAL_HOLD_MS;
}

type LiveCallSurfaceProps = {
  activeTab: 'outbound' | 'inbound';
  compact?: boolean;
  currentItem: ScriptItem;
  formattedTimer: string;
  isVisible: boolean;
  audioEnabled: boolean;
  stopLabel: string;
  onStop: () => void;
  setWaveBarRef: (index: number, element: HTMLSpanElement | null) => void;
};

function LiveCallSurface({
  activeTab,
  compact = false,
  currentItem,
  formattedTimer,
  isVisible,
  audioEnabled,
  stopLabel,
  onStop,
  setWaveBarRef,
}: LiveCallSurfaceProps): React.ReactElement {
  return (
    <div
      className={`call-live-surface ${compact ? 'call-live-surface--compact' : 'call-live-surface--direct'}`}
      data-speaker={currentItem.isAgent ? 'agent' : 'human'}
    >
      <div className="call-live-surface__controls">
        <span className="call-live-surface__number">
          {activeTab === 'outbound' ? '+995 555 12 34 56' : '+995 555 98 76 54'}
        </span>
        <span className="call-live-surface__actions">
          <span className="call-live-surface__timer">{formattedTimer}</span>
          <span className="call-live-surface__control" aria-hidden="true">
            <Ico name="solar:microphone-3-bold-duotone" className="size-3" />
          </span>
          <span className="call-live-surface__control" aria-hidden="true">
            <Ico name="solar:volume-loud-bold-duotone" className="size-3" />
          </span>
          <button
            type="button"
            onClick={onStop}
            className="call-live-surface__hangup"
            aria-label={stopLabel}
          >
            <span>
              <Ico name="solar:phone-calling-rounded-bold-duotone" className="size-3" />
            </span>
          </button>
        </span>
      </div>

      <div
        className="call-live-surface__wave"
        aria-hidden="true"
        data-wave-source={audioEnabled ? 'audio-current-time' : 'recorded-envelope'}
        data-wave-turn={currentItem.id}
      >
        {CENTER_RATIOS.map((_, index) => (
          <span
            key={index}
            ref={(element) => setWaveBarRef(index, element)}
            className="hero-wave-bar"
          />
        ))}
      </div>

      <div
        className="call-live-surface__transcript"
        data-visible={isVisible ? 'true' : 'false'}
      >
        <span className="call-live-surface__avatar">
          {/* The remote portrait is a fixed illustrative fixture. Explicit
              dimensions reserve the space before it loads. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentItem.avatarImg}
            alt=""
            width={150}
            height={150}
          />
        </span>
        <span className="call-live-surface__copy">
          <strong>{currentItem.speaker}</strong>
          <span>{currentItem.text}</span>
        </span>
      </div>
    </div>
  );
}

export function HeroProof(): React.ReactElement {
  const locale = useLocale() as DemoLocale;
  const t = useTranslations('product.heroCall');
  const copy = DEMO_COPY[locale] ?? DEMO_COPY.en;
  const [activeTab, setActiveTab] = useState<'outbound' | 'inbound'>('outbound');
  const [stepIndex, setStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [seconds, setSeconds] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [runId, setRunId] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [demoState, setDemoState] = useState<'idle' | 'playing' | 'final' | 'manual' | 'paused'>('idle');
  const [campaignStage, setCampaignStage] = useState<'checking' | 'calling' | 'saved'>('checking');
  const [activeCampaignRow, setActiveCampaignRow] = useState(0);
  const [completedCampaignRows, setCompletedCampaignRows] = useState<number[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ReturnType<typeof createDemoLoop> | null>(null);
  const storyTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const secondsTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveBarsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const animFrameRef = useRef<number | null>(null);
  const stepStartedAtRef = useRef(0);
  const barLevelsRef = useRef(CENTER_RATIOS.map((ratio) => Math.max(0.08, ratio * 0.2)));
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(true);
  const nextCampaignRowRef = useRef(0);
  const completedCampaignRowsRef = useRef<number[]>([]);

  const scripts = useMemo(() => {
    const merge = (
      audio: typeof AUDIO.outbound | typeof AUDIO.inbound,
      dialogue: Array<Pick<ScriptItem, 'speaker' | 'text'>>,
    ): ScriptItem[] => audio.map((item, index) => ({ ...item, ...dialogue[index] }));
    return {
      outbound: [
        merge(AUDIO.outbound, copy.outbound),
        merge(AUDIO.outbound, copy.outboundNext),
      ],
      inbound: merge(AUDIO.inbound, copy.inbound),
    };
  }, [copy]);

  const currentScript = activeTab === 'outbound'
    ? scripts.outbound[activeCampaignRow]
    : scripts.inbound;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = (): void => setPrefersReducedMotion(media.matches);
    syncMotion();
    media.addEventListener?.('change', syncMotion);
    return () => media.removeEventListener?.('change', syncMotion);
  }, []);

  const stopPlayback = useCallback((): void => {
    storyTimersRef.current.forEach(clearTimeout);
    storyTimersRef.current = [];
    if (secondsTimerRef.current) {
      clearInterval(secondsTimerRef.current);
      secondsTimerRef.current = null;
    }
    isPlayingRef.current = false;
    setIsAnimating(false);
    if (currentAudioRef.current) {
      const audio = currentAudioRef.current;
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      currentAudioRef.current = null;
    }
  }, []);

  const setCampaignRowsComplete = useCallback((rows: number[]): void => {
    const uniqueRows = [...new Set(rows)].sort((left, right) => left - right);
    completedCampaignRowsRef.current = uniqueRows;
    setCompletedCampaignRows(uniqueRows);
  }, []);

  const resetDemo = useCallback((): void => {
    stopPlayback();
    setSeconds(1);
    setStepIndex(0);
    setIsVisible(true);
    setIsStopped(false);
    setCampaignStage('checking');
    setDemoState('paused');
  }, [stopPlayback]);

  const playDemo = useCallback((): void => {
    stopPlayback();
    const campaignRow = activeTab === 'outbound' ? nextCampaignRowRef.current : 0;
    if (
      activeTab === 'outbound'
      && campaignRow === 0
      && completedCampaignRowsRef.current.length >= 2
    ) {
      setCampaignRowsComplete([]);
    }
    if (activeTab === 'outbound') {
      setActiveCampaignRow(campaignRow);
      nextCampaignRowRef.current = campaignRow === 0 ? 1 : 0;
    }
    const scriptForRun = activeTab === 'outbound'
      ? scripts.outbound[campaignRow]
      : scripts.inbound;

    setRunId((previous) => previous + 1);
    setSeconds(1);
    setStepIndex(0);
    setIsVisible(true);
    setIsStopped(false);
    setIsAnimating(true);
    setDemoState('playing');
    setCampaignStage(activeTab === 'outbound' ? 'checking' : 'calling');
    isPlayingRef.current = true;
    stepStartedAtRef.current = performance.now();

    if (activeTab === 'outbound') {
      storyTimersRef.current.push(
        setTimeout(() => setCampaignStage('calling'), 620),
        setTimeout(() => {
          setCampaignRowsComplete([
            ...completedCampaignRowsRef.current,
            campaignRow,
          ]);
          setCampaignStage('saved');
        }, 6_900),
      );
    }

    const stepGap = scriptForRun.length > 1
      ? SPEECH_SEQUENCE_MS / (scriptForRun.length - 1)
      : SPEECH_SEQUENCE_MS;
    for (let index = 1; index < scriptForRun.length; index += 1) {
      const changeAt = Math.round(stepGap * index);
      storyTimersRef.current.push(
        setTimeout(() => setIsVisible(false), Math.max(0, changeAt - 180)),
        setTimeout(() => {
          setStepIndex(index);
          setIsVisible(true);
        }, changeAt),
      );
    }

    secondsTimerRef.current = setInterval(() => {
      setSeconds((previous) => Math.min(8, previous + 1));
    }, 1_000);
    storyTimersRef.current.push(
      setTimeout(() => {
        if (secondsTimerRef.current) {
          clearInterval(secondsTimerRef.current);
          secondsTimerRef.current = null;
        }
        isPlayingRef.current = false;
        setIsAnimating(false);
        setDemoState('final');
      }, CYCLE_MS),
    );
  }, [activeTab, scripts, setCampaignRowsComplete, stopPlayback]);

  const showFinal = useCallback((): void => {
    stopPlayback();
    setStepIndex(Math.max(0, currentScript.length - 1));
    setSeconds(8);
    setIsVisible(true);
    setIsStopped(false);
    setDemoState('final');
    setCampaignStage(activeTab === 'outbound' ? 'saved' : 'calling');
    if (activeTab === 'outbound') setCampaignRowsComplete([0, 1]);
  }, [activeTab, currentScript.length, setCampaignRowsComplete, stopPlayback]);

  useEffect(() => {
    const target = rootRef.current;
    if (!target) return undefined;

    const controller = createDemoLoop({
      target,
      reducedMotion: prefersReducedMotion,
      threshold: 0.35,
      cycleMs: CYCLE_MS,
      holdMs: 2_000,
      play: playDemo,
      showFinal,
      reset: resetDemo,
      stop: stopPlayback,
    });
    controllerRef.current = controller;

    return () => {
      controller.cleanup();
      controllerRef.current = null;
      stopPlayback();
    };
  }, [playDemo, prefersReducedMotion, resetDemo, showFinal, stopPlayback]);

  const playAudioSequence = useCallback((): void => {
    controllerRef.current?.takeControl();
    stopPlayback();
    const audioScript = activeTab === 'outbound' ? scripts.outbound[0] : scripts.inbound;
    if (activeTab === 'outbound') {
      setActiveCampaignRow(0);
      nextCampaignRowRef.current = 1;
      setCampaignRowsComplete([]);
      setCampaignStage('calling');
    }
    setAudioEnabled(true);
    setIsStopped(false);
    setIsVisible(true);
    setSeconds(1);
    setStepIndex(0);
    setRunId((previous) => previous + 1);
    setIsAnimating(true);
    setDemoState('manual');
    isPlayingRef.current = true;

    secondsTimerRef.current = setInterval(() => {
      setSeconds((previous) => Math.min(99, previous + 1));
    }, 1_000);

    const playTurn = (index: number): void => {
      const item = audioScript[index];
      if (!item) {
        if (secondsTimerRef.current) {
          clearInterval(secondsTimerRef.current);
          secondsTimerRef.current = null;
        }
        isPlayingRef.current = false;
        setIsAnimating(false);
        if (activeTab === 'outbound') {
          setCampaignRowsComplete([0]);
          setCampaignStage('saved');
        }
        return;
      }

      setStepIndex(index);
      setIsVisible(true);
      stepStartedAtRef.current = performance.now();
      const audio = new Audio(item.audioSrc);
      audio.preload = 'none';
      currentAudioRef.current = audio;
      let advanced = false;
      const advance = (): void => {
        if (
          advanced
          || currentAudioRef.current !== audio
          || !isPlayingRef.current
        ) return;
        advanced = true;
        if (currentAudioRef.current === audio) currentAudioRef.current = null;
        setIsVisible(false);
        const nextTimer = setTimeout(() => {
          setIsVisible(true);
          playTurn(index + 1);
        }, 220);
        storyTimersRef.current.push(nextTimer);
      };

      audio.onended = advance;
      audio.onerror = advance;
      void audio.play().catch(() => {
        const fallbackTimer = setTimeout(advance, item.text.length > 50 ? 5_500 : 3_800);
        storyTimersRef.current.push(fallbackTimer);
      });
    };

    playTurn(0);
  }, [activeTab, scripts, setCampaignRowsComplete, stopPlayback]);

  useEffect(() => {
    stepStartedAtRef.current = performance.now();
  }, [activeTab, runId, stepIndex]);

  const stopDemo = useCallback((): void => {
    controllerRef.current?.takeControl();
    stopPlayback();
    setIsStopped(true);
    setIsVisible(true);
    setDemoState('manual');
  }, [stopPlayback]);

  const resumeDemo = useCallback((): void => {
    setAudioEnabled(false);
    setIsStopped(false);
    controllerRef.current?.replay();
  }, []);

  // The bars read the RMS envelope of the actual Georgian recording. During
  // manual playback, audio.currentTime becomes the clock, so sound and motion
  // stay locked even if loading or playback speed changes.
  useEffect(() => {
    const currentItem = currentScript[stepIndex] ?? currentScript[0];
    const currentSpeakerIsAgent = currentItem?.isAgent ?? true;
    const barColor = currentSpeakerIsAgent ? 'rgb(34, 197, 94)' : 'rgb(234, 179, 8)';
    const barShadow = currentSpeakerIsAgent
      ? '0 4px 14px rgba(34, 197, 94, 0.24)'
      : '0 4px 14px rgba(234, 179, 8, 0.24)';

    if (prefersReducedMotion || !isAnimating || isStopped) {
      waveBarsRef.current.forEach((bar, index) => {
        if (!bar) return;
        const restingLevel = Math.max(0.08, (CENTER_RATIOS[index] ?? 0.4) * 0.2);
        barLevelsRef.current[index] = restingLevel;
        bar.style.transform = `scaleY(${restingLevel})`;
        bar.style.backgroundColor = barColor;
        bar.style.boxShadow = 'none';
      });
      return undefined;
    }

    waveBarsRef.current.forEach((bar) => {
      if (!bar) return;
      bar.style.backgroundColor = barColor;
      bar.style.boxShadow = barShadow;
    });

    const animate = (now: number) => {
      const envelope = VOICE_ENVELOPES[currentItem?.id ?? 1] ?? VOICE_ENVELOPES[1];
      const audio = currentAudioRef.current;
      const hasLiveAudio = Boolean(
        audioEnabled
        && audio
        && !audio.paused
        && !audio.ended,
      );

      let progress = 1;
      if (hasLiveAudio && audio) {
        const duration = Number.isFinite(audio.duration) && audio.duration > 0
          ? audio.duration
          : envelope.durationSeconds;
        progress = audio.currentTime / duration;
      } else if (!audioEnabled) {
        const turnDuration = getVisualTurnDuration(currentScript.length, stepIndex);
        const speechDuration = turnDuration * 0.86;
        progress = (now - stepStartedAtRef.current) / speechDuration;
      }

      const voiceIsActive = isPlayingRef.current && isVisible;

      waveBarsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const ratio = CENTER_RATIOS[i] ?? 0.4;
        const timeOffset = ((i % 5) - 2) * 0.008;
        const sampledEnergy = voiceIsActive
          ? sampleVoiceEnvelope(envelope, progress + timeOffset)
          : 0;
        const barCharacter = 0.82 + (((i * 7) + (currentItem?.id ?? 1) * 3) % 11) * 0.025;
        const targetLevel = Math.min(
          0.98,
          Math.max(0.08, ratio * (0.16 + sampledEnergy * 0.96) * barCharacter),
        );
        const previousLevel = barLevelsRef.current[i] ?? targetLevel;
        const response = targetLevel > previousLevel ? 0.32 : 0.16;
        const nextLevel = previousLevel + (targetLevel - previousLevel) * response;

        barLevelsRef.current[i] = nextLevel;
        bar.style.transform = `scaleY(${nextLevel})`;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    audioEnabled,
    currentScript,
    isAnimating,
    isStopped,
    isVisible,
    prefersReducedMotion,
    stepIndex,
  ]);

  const effectiveStepIndex = prefersReducedMotion ? Math.max(0, currentScript.length - 1) : stepIndex;
  const currentItem = currentScript[effectiveStepIndex] || currentScript[0];
  const displayedSeconds = prefersReducedMotion ? 8 : seconds;
  const formattedTimer = `00:${displayedSeconds < 10 ? '0' : ''}${displayedSeconds}`;
  const setWaveBarRef = useCallback((index: number, element: HTMLSpanElement | null): void => {
    waveBarsRef.current[index] = element;
  }, []);

  const handleTabChange = (tab: 'outbound' | 'inbound') => {
    if (tab === activeTab) return;
    controllerRef.current?.takeControl();
    stopPlayback();
    setAudioEnabled(false);
    setActiveTab(tab);
    setActiveCampaignRow(0);
    nextCampaignRowRef.current = 0;
    setCampaignRowsComplete([]);
    setCampaignStage(tab === 'outbound' ? 'checking' : 'calling');
    setStepIndex(0);
    setSeconds(1);
    setIsStopped(true);
    setDemoState('manual');
    setRunId((previous) => previous + 1);
  };

  const campaignIsCalling = campaignStage === 'calling';
  const completedCount = completedCampaignRows.length;
  const campaignMetrics = {
    current: 37 + completedCount,
    called: 36 + completedCount + (campaignIsCalling ? 1 : 0),
    answered: 18 + completedCount + (campaignIsCalling && effectiveStepIndex > 0 ? 1 : 0),
    booked: 7 + completedCount,
  };
  const campaignResult = campaignStage === 'saved'
    ? copy.campaign.savedResult
    : campaignStage === 'calling'
      ? copy.campaign.currentResult
      : copy.campaign.nextResult;
  return (
    <div
      ref={rootRef}
      className="call-proof relative mx-auto my-2 flex w-full max-w-[660px] select-none flex-col gap-3"
      data-hero-demo="true"
      data-landing-demo="true"
      data-demo-id="aicall-hero-story"
      data-demo-state={demoState}
      data-demo-stage={`run-${runId}-step-${effectiveStepIndex}`}
      data-demo-detail={`${activeTab}-${campaignStage}-${effectiveStepIndex}-${displayedSeconds}-${isStopped ? 'stopped' : 'running'}`}
      role="region"
      aria-label={t('callLabel')}
      aria-live="off"
    >
      <div className="flex items-center justify-start px-1">
        <div className="inline-flex w-full items-center rounded-2xl bg-slate-200/70 p-1 border border-slate-300/60 shadow-inner backdrop-blur-md sm:w-auto">
          <button
            type="button"
            onClick={() => handleTabChange('outbound')}
            aria-pressed={activeTab === 'outbound'}
            className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-2.5 py-2 text-[0.75rem] font-bold transition-[transform,background-color,color,box-shadow] duration-200 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
              activeTab === 'outbound'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Ico name="solar:phone-calling-rounded-bold-duotone" className="size-3.5" />
            <span>{copy.tabs.outbound}</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('inbound')}
            aria-pressed={activeTab === 'inbound'}
            className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-2.5 py-2 text-[0.75rem] font-bold transition-[transform,background-color,color,box-shadow] duration-200 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
              activeTab === 'inbound'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Ico name="solar:incoming-call-rounded-bold-duotone" className="size-3.5" />
            <span>{copy.tabs.inbound}</span>
          </button>
        </div>
      </div>

      <div className="call-proof__viewport">
        <div
          className="call-campaign"
          data-visible={activeTab === 'outbound' ? 'true' : 'false'}
          aria-hidden={activeTab !== 'outbound'}
          inert={activeTab !== 'outbound' ? true : undefined}
        >
          <div
            className="call-campaign__head"
            data-processing={campaignStage === 'checking' ? 'true' : 'false'}
          >
            <div className="call-campaign__file">
              <span className="call-campaign__file-icon" aria-hidden="true">
                <Ico name="solar:document-text-bold-duotone" className="size-5" />
              </span>
              <span className="call-campaign__file-copy">
                <strong>{copy.campaign.fileName}</strong>
                <span>
                  {campaignStage === 'checking' ? copy.campaign.checking : copy.campaign.ready}
                </span>
              </span>
              <span className="call-campaign__file-status" aria-hidden="true">
                <Ico
                  name={
                    campaignStage === 'checking'
                      ? 'solar:refresh-bold-duotone'
                      : 'solar:check-circle-bold-duotone'
                  }
                  className="size-4"
                />
              </span>
            </div>

            <div className="call-campaign__metrics">
              {[
                [copy.campaign.progress, campaignMetrics.current],
                [copy.campaign.called, campaignMetrics.called],
                [copy.campaign.answered, campaignMetrics.answered],
                [copy.campaign.booked, campaignMetrics.booked],
              ].map(([label, value]) => (
                <span className="call-campaign__metric" key={String(label)}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </span>
              ))}
            </div>
          </div>

          <div
            className="call-campaign__queue"
            data-stage={campaignStage}
            data-active-row={campaignIsCalling ? String(activeCampaignRow) : 'none'}
          >
            {copy.campaign.rows.map((row, index) => {
              const isActive = index === activeCampaignRow && campaignStage === 'calling';
              const isComplete = completedCampaignRows.includes(index);
              const rowState = isActive ? 'active' : isComplete ? 'done' : 'waiting';
              const status = isActive
                ? copy.campaign.calling
                : isComplete
                  ? row.result
                  : index === activeCampaignRow
                    ? copy.campaign.queued
                    : copy.campaign.waiting;

              return (
                <article
                  className="call-campaign__row"
                  data-state={rowState}
                  data-row-index={index}
                  key={`${row.name}-${row.phone}`}
                >
                  <div className="call-campaign__row-head">
                    <span className="call-campaign__avatar" aria-hidden="true">{row.initials}</span>
                    <span className="call-campaign__contact">
                      <strong>{row.name}</strong>
                      <span>{row.phone}</span>
                    </span>
                    <span className="call-campaign__intent">{row.intent}</span>
                    <span className="call-campaign__status">
                      <span aria-hidden="true" />
                      <strong>{status}</strong>
                    </span>
                  </div>

                  <div className="call-campaign__detail" aria-hidden={!isActive}>
                    {isActive ? (
                      <LiveCallSurface
                        activeTab={activeTab}
                        compact
                        currentItem={currentItem}
                        formattedTimer={formattedTimer}
                        isVisible={isVisible}
                        audioEnabled={audioEnabled}
                        stopLabel={copy.stop}
                        onStop={stopDemo}
                        setWaveBarRef={setWaveBarRef}
                      />
                    ) : null}
                  </div>
                </article>
              );
            })}

            <div className="call-campaign__queue-note">
              <Ico name="solar:check-circle-bold-duotone" className="size-4" />
              <span>{campaignResult}</span>
            </div>
          </div>

          <div className="call-campaign__result">
            <span>
              <Ico name="solar:shield-check-bold-duotone" className="size-4" />
              {copy.campaign.illustrative}
            </span>
            <strong>{copy.campaign.footerSummary}</strong>
          </div>
        </div>

        <div
          className="call-inbound"
          data-visible={activeTab === 'inbound' ? 'true' : 'false'}
          aria-hidden={activeTab !== 'inbound'}
          inert={activeTab !== 'inbound' ? true : undefined}
        >
          <p className="call-inbound__note">
            <Ico name="solar:incoming-call-rounded-bold-duotone" className="size-5" />
            <span>{copy.campaign.inboundNote}</span>
          </p>
          <LiveCallSurface
            activeTab={activeTab}
            currentItem={currentItem}
            formattedTimer={formattedTimer}
            isVisible={isVisible}
            audioEnabled={audioEnabled}
            stopLabel={copy.stop}
            onStop={stopDemo}
            setWaveBarRef={setWaveBarRef}
          />
        </div>
      </div>
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 px-1">
        <button
          type="button"
          onClick={playAudioSequence}
          disabled={audioEnabled || prefersReducedMotion}
          aria-hidden={audioEnabled || prefersReducedMotion}
          tabIndex={audioEnabled || prefersReducedMotion ? -1 : 0}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-[0.75rem] font-semibold text-slate-700 shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-[transform,background-color,color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 active:translate-y-0 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
            audioEnabled || prefersReducedMotion ? 'invisible pointer-events-none' : ''
          }`}
          aria-label={`${copy.liveExample}. ${copy.listen}`}
        >
          <Ico name="solar:volume-loud-bold-duotone" className="size-4 text-emerald-600" />
          <span>{copy.liveExample}</span>
        </button>
        <button
          type="button"
          onClick={isStopped ? resumeDemo : stopDemo}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border bg-white px-3 text-[0.75rem] font-semibold shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-[transform,background-color,color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(15,23,42,0.1)] active:translate-y-0 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
            isStopped
              ? 'border-emerald-200 text-emerald-700'
              : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
          }`}
          data-demo-replay={isStopped ? 'true' : undefined}
          data-demo-toggle="true"
          aria-label={isStopped ? copy.restart : copy.stop}
          aria-pressed={isStopped}
        >
          {isStopped ? (
            <Ico name="solar:refresh-bold-duotone" className="size-3.5" />
          ) : (
            <Ico name="solar:pause-bold-duotone" className="size-[13px]" />
          )}
          <span>{isStopped ? copy.restart : copy.stop}</span>
        </button>
      </div>
    </div>
  );
}
