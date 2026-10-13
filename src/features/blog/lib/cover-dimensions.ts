export type CoverDimensions = { width: number; height: number }

const COVER_DIMENSIONS: Record<string, CoverDimensions> = {
    "/images/aicall/blog/apply-do-not-call-suppression-across-lists-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/clarify-ambiguous-georgian-dates-in-a-voice-call-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/compare-voice-ai-agents-georgia-checklist-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/confirm-georgian-name-spelling-during-call-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/do-not-confirm-a-booking-when-calendar-is-offline-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/handle-a-call-answered-by-the-wrong-person-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/handle-failed-transfer-to-human-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/handle-outbound-call-reaching-ivr-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/implement-voice-ai-agent-georgia-pilot-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/measure-voice-ai-agent-roi-pilot-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/normalize-georgian-phone-numbers-before-ai-calls-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/offer-keypad-input-when-speech-is-not-understood-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/prevent-duplicate-bookings-from-repeated-ai-calls-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/recover-from-silence-in-an-ai-phone-call-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/remove-duplicate-numbers-from-an-ai-call-list-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/safe-human-handoff-voice-ai-calls-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/separate-failed-busy-and-no-answer-ai-calls-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/separate-voicemail-from-completed-conversation-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/set-retry-rules-for-busy-and-no-answer-calls-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/test-georgian-language-voice-ai-agent-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/test-interruption-handling-in-ai-phone-calls-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/voice-ai-agent-cost-georgia-total-cost-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/voice-ai-agent-integrations-phone-crm-calendar-telegram-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/voice-ai-agent-pilot-checklist-before-scale-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/voice-ai-vs-ivr-vs-human-operator-glass-v1.png": { width: 1536, height: 1024 },
    "/images/aicall/blog/voice-call-recordings-personal-data-georgia-glass-v1.png": { width: 1536, height: 1024 },
}

export function getCoverDimensions(coverPath: string): CoverDimensions | undefined {
    return Object.hasOwn(COVER_DIMENSIONS, coverPath) ? COVER_DIMENSIONS[coverPath] : undefined
}
