import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('./CallOutcomeBoard.tsx', import.meta.url), 'utf8');

test('outcome board never rewinds to four zeroes', () => {
  assert.match(source, /const STARTER_COUNT = 16;/);
  assert.match(source, /useState\(STARTER_COUNT\)/);
  assert.equal((source.match(/setN\(STARTER_COUNT\)/gu) ?? []).length, 2);
  assert.doesNotMatch(source, /setN\(0\)/);
});

test('outcome counters slide inside fixed geometry without low-opacity text', () => {
  assert.match(source, /<AnimatePresence initial=\{false\}>/);
  assert.match(source, /className="relative mt-3 h-9 min-w-\[3ch\] overflow-hidden/);
  assert.match(source, /className="absolute inset-0 block min-w-\[3ch\]"/);
  assert.match(source, /initial=\{reducedMotion \? false : \{ y: '100%' \}\}/);
  assert.doesNotMatch(source, /opacity: 0/);
});
