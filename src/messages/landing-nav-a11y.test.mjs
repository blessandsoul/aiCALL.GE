import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const navSource = readFileSync(
  new URL('../features/home/components/LandingNav.tsx', import.meta.url),
  'utf8',
);

test('navigation disclosures use localized state-aware accessible names', () => {
  assert.match(navSource, /aria-label=\{menuOpen \? a11y\.close : a11y\.open\}/u);
  assert.match(navSource, /aria-label=\{a11y\.language\}/u);
  assert.match(navSource, /aria-label=\{`\$\{SITE\.wordmark\.prefix\}\$\{SITE\.wordmark\.mark\}/u);
  assert.match(navSource, /ka: \{ open: '[^']+', close: '[^']+', language: '[^']+'/u);
  assert.match(navSource, /ru: \{ open: '[^']+', close: '[^']+', language: '[^']+'/u);
});

test('KA, EN, and RU are selected from the active locale', () => {
  assert.match(navSource, /const a11y = NAV_A11Y\[locale as keyof typeof NAV_A11Y\] \?\? NAV_A11Y\.en/u);
});
