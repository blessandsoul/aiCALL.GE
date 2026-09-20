import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const configurator = readFileSync(
  new URL('../product-pages/pricing/PricingConfigurator.tsx', import.meta.url),
  'utf8',
);
const explorer = readFileSync(
  new URL('../product-pages/pricing/PricingOfferExplorer.tsx', import.meta.url),
  'utf8',
);
const styles = readFileSync(
  new URL('../product-pages/pricing/pricing.css', import.meta.url),
  'utf8',
);

test('pricing requires a functional plan and an inbound channel selection', () => {
  assert.match(configurator, /selectedPlanId/u);
  assert.match(configurator, /selectedChannels/u);
  assert.match(configurator, /inboundChannelOptions/u);
  assert.match(configurator, /callRates\.outbound\.pricePerConnectedMinute/u);
  assert.match(configurator, /plan=.*inboundChannels=/u);
  assert.match(configurator, /platformAmount \+ channelAmount/u);
  assert.match(configurator, /formatAmount\(platformAmount, platformCurrency\)/u);
  assert.match(configurator, /formatAmount\(channelAmount, channelCurrency\)/u);
  assert.match(configurator, /aria-live="polite"/u);
});

test('each functional plan resets to its included inbound channel count', () => {
  assert.match(configurator, /setSelectedChannels\(nextOffer\.includedInboundChannels\)/u);
  assert.match(configurator, /onClick=\{\(\) => setSelectedChannels\(option\.channels\)\}/u);
});

test('mobile opens on the selected plan without page-wide overflow', () => {
  assert.match(explorer, /selected=\{selectedPlanId === offer\.id\}/u);
  assert.match(explorer, /track\.scrollTo/u);
  assert.match(styles, /overflow-x: auto/u);
  assert.match(styles, /scroll-snap-type: inline mandatory/u);
  assert.doesNotMatch(styles, /transition\s*:\s*all/u);
});
