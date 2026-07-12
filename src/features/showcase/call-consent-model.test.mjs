import assert from 'node:assert/strict';
import test from 'node:test';

test('consentVerdict stays empty until every answer is manual', async () => {
  let model = null;

  try {
    model = await import('./call-consent-model.mjs');
  } catch {
    // RED: the pure model is introduced only after this expectation fails.
  }

  assert.equal(
    typeof model?.consentVerdict,
    'function',
    'expected a pure consentVerdict function',
  );
  assert.equal(model.consentVerdict({ own: null, existing: null, written: null }), null);
  assert.equal(model.consentVerdict({ own: true, existing: null, written: true }), null);
});

test('consentVerdict preserves the safe legal boundary', async () => {
  let model = null;

  try {
    model = await import('./call-consent-model.mjs');
  } catch {
    // RED: the pure model is introduced only after this expectation fails.
  }

  assert.equal(
    typeof model?.consentVerdict,
    'function',
    'expected a pure consentVerdict function',
  );
  assert.equal(model.consentVerdict({ own: false, existing: false, written: false }), 'red');
  assert.equal(model.consentVerdict({ own: false, existing: false, written: true }), 'amber');
  assert.equal(model.consentVerdict({ own: true, existing: true, written: false }), 'green');
  assert.equal(model.consentVerdict({ own: true, existing: false, written: true }), 'green');
  assert.equal(model.consentVerdict({ own: true, existing: false, written: false }), 'amber');
  assert.notEqual(model.consentVerdict({ own: true, existing: false, written: false }), 'green');
});
