import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pricingSource = new URL('../../config/voice-pricing.ts', import.meta.url);
const machineSource = new URL('../product-pages/machine.ts', import.meta.url);
const calculatorSource = new URL('./CallCostSlider.tsx', import.meta.url);

test('pricing separates functional plans from minute bundles', async () => {
  const source = await readFile(pricingSource, 'utf8');

  assert.match(source, /model: 'platform-plus-inbound-minute-bundle'/u);
  assert.match(source, /monthlyPlatformPriceGel: 220/u);
  assert.match(source, /monthlyPlatformPriceGel: 450/u);
  assert.match(source, /monthlyPlatformPriceGel: 900/u);
  assert.match(source, /monthlyPlatformPriceGel: 2_500/u);
  assert.match(source, /monthlyPlatformPriceGel: 5_000/u);
  assert.match(source, /inboundPricePerConnectedMinuteGel: 0\.54/u);
  assert.match(source, /inboundReferenceMinutes: 10/u);
  assert.match(source, /inboundReferencePriceGel: 5\.4/u);
  assert.match(source, /outboundPricePerConnectedMinuteGel: 1\.4/u);
  assert.match(source, /minutes: 100,[\s\S]*monthlyPriceGel: 54/u);
  assert.match(source, /minutes: 500,[\s\S]*monthlyPriceGel: 270/u);
  assert.match(source, /minutes: 2_000,[\s\S]*monthlyPriceGel: 1_080/u);
  assert.match(source, /minutes: 5_000,[\s\S]*monthlyPriceGel: 2_700/u);
  assert.match(source, /minutes: 10_000,[\s\S]*monthlyPriceGel: 5_400/u);
  assert.doesNotMatch(source, /includedMinutes|monthlyPriceFromGel/u);
});

test('premium is the single recommended functional plan', async () => {
  const source = await readFile(pricingSource, 'utf8');
  const recommended = source.match(/recommended: true/gu) ?? [];

  assert.equal(recommended.length, 1);
  assert.match(
    source,
    /id: 'premium',[\s\S]*?recommended: true,[\s\S]*?concurrentCalls: 10/u,
  );
  assert.match(
    source,
    /id: 'enterprise',[\s\S]*?operators: 10,[\s\S]*?scenarios: 25,[\s\S]*?concurrentCalls: 25/u,
  );
});

test('machine facts expose both pricing dimensions and planned capabilities', async () => {
  const source = await readFile(machineSource, 'utf8');

  assert.match(source, /platformPlans: MACHINE_PLATFORM_PLANS/u);
  assert.match(source, /minuteBundles: MACHINE_MINUTE_BUNDLES/u);
  assert.match(source, /defaultConfigurations: MACHINE_DEFAULT_CONFIGURATIONS/u);
  assert.match(source, /monthlyPlatformPriceGel/u);
  assert.match(source, /monthlyInboundMinutesPriceGel/u);
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
