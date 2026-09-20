import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pricingSource = new URL('../../config/voice-pricing.ts', import.meta.url);
const machineSource = new URL('../product-pages/machine.ts', import.meta.url);
const calculatorSource = new URL('./CallCostSlider.tsx', import.meta.url);

test('pricing separates functional plans from optional inbound channels', async () => {
  const source = await readFile(pricingSource, 'utf8');

  assert.match(source, /model: 'monthly-platform-plus-inbound-channels'/u);
  assert.match(source, /monthlyPlatformPriceGel: 220/u);
  assert.match(source, /monthlyPlatformPriceGel: 450/u);
  assert.match(source, /monthlyPlatformPriceGel: 900/u);
  assert.match(source, /monthlyPlatformPriceGel: 2_500/u);
  assert.match(source, /monthlyPlatformPriceGel: 5_000/u);
  assert.match(source, /includedInboundChannels: 1/u);
  assert.match(source, /additionalInboundChannelMonthlyPriceGel: 60/u);
  assert.match(source, /outboundPricePerConnectedMinuteGel: 1\.5/u);
  assert.match(source, /inboundChannelOptions: VOICE_INBOUND_CHANNEL_OPTIONS/u);
  assert.doesNotMatch(source, /minuteBundles|defaultMinuteBundleId|inboundPricePerConnectedMinuteGel/u);
});

test('premium is the single recommended functional plan', async () => {
  const source = await readFile(pricingSource, 'utf8');
  const recommended = source.match(/recommended: true/gu) ?? [];

  assert.equal(recommended.length, 1);
  assert.match(
    source,
    /id: 'premium',[\s\S]*?recommended: true,[\s\S]*?inboundChannels: 1/u,
  );
  assert.match(
    source,
    /id: 'enterprise',[\s\S]*?operators: 10,[\s\S]*?scenarios: 25,[\s\S]*?inboundChannels: 1/u,
  );
});

test('machine facts expose both pricing dimensions and planned capabilities', async () => {
  const source = await readFile(machineSource, 'utf8');

  assert.match(source, /platformPlans: MACHINE_PLATFORM_PLANS/u);
  assert.match(source, /inboundChannelOptions: MACHINE_INBOUND_CHANNEL_OPTIONS/u);
  assert.match(source, /defaultConfigurations: MACHINE_DEFAULT_CONFIGURATIONS/u);
  assert.match(source, /monthlyPlatformPriceGel/u);
  assert.match(source, /monthlyInboundChannelsPriceGel/u);
  assert.match(source, /outboundPricePerConnectedMinuteGel/u);
  assert.doesNotMatch(source, /monthlyTotalGel/u);
  assert.match(source, /capabilities: plan\.capabilities/u);
  assert.match(source, /marked planned are not currently available/u);
});

test('homepage calculator prices outbound usage separately', async () => {
  const source = await readFile(calculatorSource, 'utf8');

  assert.match(source, /outboundPricePerConnectedMinuteGel/u);
  assert.match(source, /totalMinutes \* outboundRate/u);
  assert.doesNotMatch(source, /VOICE_PRICING\.minuteBundles\.find/u);
  assert.doesNotMatch(source, /includedMinutes|monthlyPriceFromGel/u);
});
