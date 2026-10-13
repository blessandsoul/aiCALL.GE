"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { AiNowSectionFrame } from "./AiNowSectionFrame";
import { AiNowImage } from "./AiNowImage";
import { AiNowDisclosure } from "./AiNowDisclosure";
import { getAiNowModelProofCopy, MODEL_PROOF_SOURCE_TONES, modelProofTrustItemClassName, type ModelProofProviderKey } from "./AiNowModelProofCopy";

type Provider = {
  readonly lab: string;
  readonly mark: string | null;
  readonly wordmark: string;
  readonly tone: string;
};

const providers: readonly Provider[] = [
  { lab: "Inbound", mark: null, wordmark: "Inbound", tone: MODEL_PROOF_SOURCE_TONES.Inbound },
  { lab: "Outbound", mark: null, wordmark: "Outbound", tone: MODEL_PROOF_SOURCE_TONES.Outbound },
  { lab: "Rules", mark: null, wordmark: "Rules", tone: MODEL_PROOF_SOURCE_TONES.Rules },
  { lab: "Outcome", mark: null, wordmark: "Outcome", tone: MODEL_PROOF_SOURCE_TONES.Outcome },
  { lab: "Language", mark: null, wordmark: "Language", tone: MODEL_PROOF_SOURCE_TONES.Language },
  { lab: "Consent", mark: null, wordmark: "Consent", tone: MODEL_PROOF_SOURCE_TONES.Consent },
  { lab: "History", mark: null, wordmark: "History", tone: MODEL_PROOF_SOURCE_TONES.History },
  { lab: "Review", mark: null, wordmark: "Review", tone: MODEL_PROOF_SOURCE_TONES.Review },
  { lab: "Phone", mark: null, wordmark: "Phone", tone: MODEL_PROOF_SOURCE_TONES.Phone },
  { lab: "Context", mark: null, wordmark: "Context", tone: MODEL_PROOF_SOURCE_TONES.Context },
  { lab: "Limits", mark: null, wordmark: "Limits", tone: MODEL_PROOF_SOURCE_TONES.Limits },
];

export function AiNowModelProof() {
  const locale = useLocale();
  const copy = getAiNowModelProofCopy(locale);
  const modelNames = useMemo(() => (provider: Provider) => copy.providerLabels[provider.lab as ModelProofProviderKey] ?? provider.wordmark, [copy]);

  const renderProvider = (provider: Provider) => {
    const providerLabel = copy.providerLabels[provider.lab as ModelProofProviderKey] ?? provider.wordmark;
    return (
    <div className={`ainow-model-stage__provider ainow-model-stage__provider--${provider.tone}`} key={provider.lab} title={`${providerLabel}: ${modelNames(provider)}`}>
      <span className="ainow-model-stage__provider-mark" aria-hidden="true">
        {provider.mark ? (
          <AiNowImage
            src={provider.mark}
            alt=""
            width={18}
            height={18}
            frameClassName="inline-flex size-[18px]"
            className="size-full object-contain"
            unoptimized
          />
        ) : (
          <span className="ainow-model-stage__wordmark">{provider.wordmark.slice(0, 1)}</span>
        )}
      </span>
      <span className="ainow-model-stage__provider-copy">
         <span className="ainow-model-stage__provider-lab">{providerLabel}</span>
        <span className="ainow-model-stage__provider-model">{modelNames(provider)}</span>
      </span>
    </div>
    );
  };

  return (
    <AiNowSectionFrame
      id="model-architecture"
      hasLaser={false}
      showTicks={false}
      containerClassName="px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
    >
      <section className="ainow-model-stage" aria-labelledby="ainow-model-stage-title">
        <div className="ainow-model-stage__intro">
          <div className="ainow-model-stage__eyebrow">
            <span className="ainow-model-stage__status" aria-hidden="true" />
            <span>{copy.eyebrow}</span>
          </div>
          <h2 id="ainow-model-stage-title">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>

        <div
          className="ainow-model-stage__decision ainow-model-stage__visual-card"
        >
          <AiNowImage
            className="ainow-model-stage__decision-image"
            src="/images/model-trust/aicall-decision-path-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 40vw"
          />
          <div className="ainow-model-stage__decision-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__decision-content">
            <div className="ainow-model-stage__decision-copy">
              <span>{copy.jevKicker}</span>
              <strong>{copy.jevTitle}</strong>
              <p>{copy.jevDescription}</p>
            </div>
          </div>
        </div>

        <div
          className="ainow-model-stage__catalog ainow-model-stage__visual-card"
          aria-label={copy.radar}
        >
          <AiNowImage
            className="ainow-model-stage__catalog-image"
            src="/graphics-3d/products/aicall-rules-workflow-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 58vw"
          />
          <div className="ainow-model-stage__catalog-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__catalog-content">
            <div className="ainow-model-stage__catalog-heading">
              <span>{copy.radar}</span>
            </div>
            <div className="ainow-model-stage__providers" data-model-provider-group="primary">
              {providers.slice(0, 4).map(renderProvider)}
            </div>
            <AiNowDisclosure
              title={copy.moreTechnologies}
              className="mt-2 border-t border-slate-200/60 [&>button]:min-h-10 [&>button]:py-2 [&>button]:text-xs dark:border-white/10"
            >
              <div className="ainow-model-stage__providers pb-1" data-model-provider-group="additional">
                {providers.slice(4).map(renderProvider)}
              </div>
            </AiNowDisclosure>
          </div>
        </div>

        <dl className="ainow-model-stage__trust" aria-label={copy.trustLabel} tabIndex={0}>
          {copy.trust.map((item, index) => (
            <div className={modelProofTrustItemClassName(index)} key={item.value}>
              <AiNowImage
                className="ainow-model-stage__trust-image"
                src={item.image}
                alt=""
                fill
                frameClassName="absolute inset-0"
                sizes="(max-width: 767px) 82vw, (max-width: 1040px) 25vw, 30vw"
              />
              <div className="ainow-model-stage__trust-copy">
                <dt>{item.value}</dt>
                <dd>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <section className="ainow-model-stage__brand ainow-model-stage__visual-card" aria-label={copy.brand.title}>
          <AiNowImage
            className="ainow-model-stage__brand-image"
            src="/images/model-trust/aicall-brand-workflow-v1.png"
            alt=""
            fill
            frameClassName="absolute inset-0"
            sizes="(max-width: 767px) 100vw, 100vw"
          />
          <div className="ainow-model-stage__brand-scrim" aria-hidden="true" />
          <div className="ainow-model-stage__brand-copy">
            <span>{copy.brand.established}</span>
            <h3>{copy.brand.title}</h3>
            <p>{copy.brand.language}</p>
            <small>{copy.brand.location}</small>
          </div>
        </section>
      </section>
    </AiNowSectionFrame>
  );
}
