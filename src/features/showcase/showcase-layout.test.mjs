import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const consentPath = new URL('./CallConsentGate.tsx', import.meta.url);

async function source(file) {
  return readFile(new URL(`./${file}`, import.meta.url), 'utf8');
}

test('consent gate uses the shared width and three readable desktop panels', async () => {
  const source = await readFile(consentPath, 'utf8');

  assert.doesNotMatch(source, /max-w-3xl|max-w-xl/u);
  assert.match(source, /lg:grid-cols-3/u);
  assert.match(source, /min-w-0/u);
  assert.match(source, /min-h-\[44px\]/u);
});

test('consent gate uses semantic Ico visuals for all decisions and controls', async () => {
  const source = await readFile(consentPath, 'utf8');

  assert.match(source, /<Ico[\s\S]*users-group-rounded-bold-duotone/u);
  assert.match(source, /<Ico[\s\S]*user-check-rounded-bold-duotone/u);
  assert.match(source, /<Ico[\s\S]*pen-new-square-bold-duotone/u);
  assert.match(source, /<Ico[\s\S]*shield-check-bold-duotone/u);
  assert.match(source, /<Ico[\s\S]*refresh-bold-duotone/u);
});

test('consent answers remain manual and the result sits below the questions', async () => {
  const source = await readFile(consentPath, 'utf8');

  assert.doesNotMatch(source, /useEffect|setTimeout|setInterval/u);
  assert.doesNotMatch(
    source,
    /setOwn\(true\)[\s\S]*setExisting\(true\)[\s\S]*setWritten\(true\)/u,
  );
  assert.match(source, /data-consent-questions/u);
  assert.match(source, /data-consent-verdict/u);
  assert.ok(
    source.indexOf('data-consent-verdict') > source.indexOf('data-consent-questions'),
    'the verdict should be rendered after the three-question grid',
  );
});

test('hero result controls stack before tablet width', async () => {
  const hero = await source('HeroProof.tsx');

  assert.match(hero, /mb-2 flex flex-col gap-2 sm:flex-row/u);
  assert.match(hero, /min-h-\[44px\]/u);
});

test('calculator range controls expose a 44px mobile target', async () => {
  const cost = await source('CallCostSlider.tsx');

  assert.match(cost, /type="range"[\s\S]*className="[^"]*h-11/u);
  assert.doesNotMatch(cost, /type="range"[\s\S]*className="[^"]*\bh-10\b/u);
});

test('showcase layouts avoid fixed minimum-width utilities on narrow screens', async () => {
  const files = [
    'CallConsentGate.tsx',
    'CallHearGeorgian.tsx',
    'CallOutcomeBoard.tsx',
    'CallBargeIn.tsx',
    'CallCostSlider.tsx',
    'HeroProof.tsx',
  ];
  const combined = (await Promise.all(files.map(source))).join('\n');

  assert.doesNotMatch(combined, /min-w-\[[1-9]\d*(?:px|rem)\]/u);
});

test('changed visitor UI contains no raw decorative glyph separators', async () => {
  const files = [
    'CallConsentGate.tsx',
    'CallHearGeorgian.tsx',
    'CallOutcomeBoard.tsx',
    'CallBargeIn.tsx',
    'CallCostSlider.tsx',
    'HeroProof.tsx',
  ];
  const combined = (await Promise.all(files.map(source))).join('\n');

  assert.doesNotMatch(combined, /[·→←✓✔⚠❌]/u);
  assert.doesNotMatch(combined, /[\u{1F300}-\u{1FAFF}]/u);
});
