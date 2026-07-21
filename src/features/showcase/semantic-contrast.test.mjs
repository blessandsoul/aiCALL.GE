import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';

const showcaseUrl = new URL('.', import.meta.url);
const files = readdirSync(showcaseUrl)
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => new URL(file, showcaseUrl));
files.push(new URL('../home/components/LandingHero.tsx', import.meta.url));

const banned = [
  /(?:placeholder:)?text-neutral-900\/(?:[0-5]\d?|\[(?:0?\.)?[0-5]\d*\])/gu,
  /text-(?:white|black)\/(?:[0-4]\d?|\[(?:0?\.)?[0-4]\d*\])/gu,
];

test('semantic showcase and hero labels never use failing text opacity utilities', () => {
  for (const url of files) {
    const source = readFileSync(url, 'utf8').replace(/<Ico\b[\s\S]*?\/>/gu, '');
    const failures = banned.flatMap((pattern) => source.match(pattern) ?? []);
    assert.deepEqual(failures, [], `${url.pathname}: ${failures.join(', ')}`);
  }
});

test('the unspoken transcript remains readable while its highlight advances', () => {
  const source = readFileSync(new URL('./CallHearGeorgian.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /opacity:\s*spoken\s*\?\s*1\s*:\s*0\.[0-5]/u);
});

test('mobile replay keeps an accessible name and barge-in exposes its first word change', () => {
  const transcript = readFileSync(new URL('./CallHearGeorgian.tsx', import.meta.url), 'utf8');
  const barge = readFileSync(new URL('./CallBargeIn.tsx', import.meta.url), 'utf8');

  assert.match(transcript, /data-demo-replay="true"[\s\S]{0,160}aria-label=\{t\('replay'\)\}/u);
  assert.match(barge, /data-demo-detail=\{`\$\{phase\}-\$\{i\}`\}/u);
  assert.match(barge, /const WORD_MS = 260;/u);
});
