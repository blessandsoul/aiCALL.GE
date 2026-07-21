import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

async function loadPlaybackModule() {
  try {
    return await import('./call-audio-playback.mjs');
  } catch {
    return null;
  }
}

test('missing or rejected audio stays silent and never announces playback', async () => {
  const playback = await loadPlaybackModule();
  assert.equal(typeof playback?.attemptAudioPlayback, 'function');

  for (const audio of [null, { play: () => Promise.reject(new Error('missing audio')) }]) {
    const states = [];
    const played = await playback.attemptAudioPlayback({
      audio,
      onPlaying: () => states.push('audio'),
      onFallback: () => states.push('silent-transcript'),
    });

    assert.equal(played, false);
    assert.deepEqual(states, ['silent-transcript']);
  }
});

test('fulfilled audio announces playback only after play resolves', async () => {
  const playback = await loadPlaybackModule();
  assert.equal(typeof playback?.attemptAudioPlayback, 'function');

  const states = [];
  const played = await playback.attemptAudioPlayback({
    audio: { play: () => Promise.resolve() },
    onPlaying: () => states.push('audio'),
    onFallback: () => states.push('silent-transcript'),
  });

  assert.equal(played, true);
  assert.deepEqual(states, ['audio']);
});

test('CallHearGeorgian wires fallback to playing=false before the silent transcript', async () => {
  const source = await readFile(new URL('./CallHearGeorgian.tsx', import.meta.url), 'utf8');

  assert.match(source, /attemptAudioPlayback\(\{/u);
  assert.match(
    source,
    /onFallback:\s*\(\)\s*=>\s*\{[\s\S]*?setPlaying\(false\);[\s\S]*?startSilentTimeline\(\);/u,
  );
  assert.doesNotMatch(source, /setPlaying\(true\);[\s\S]{0,180}?\.play\(\)/u);
});
