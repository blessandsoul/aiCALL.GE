import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { createDemoLoop } from '../home/components/lib/demo-loop.mjs';

function createObserverHarness() {
  const instances = [];

  class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.observed = [];
      this.disconnectCalls = 0;
      instances.push(this);
    }

    observe(target) {
      this.observed.push(target);
    }

    disconnect() {
      this.disconnectCalls += 1;
    }

    emit(target, intersectionRatio, isIntersecting = intersectionRatio > 0) {
      this.callback([{ target, intersectionRatio, isIntersecting }]);
    }
  }

  return { Observer, instances };
}

function createDocumentHarness() {
  const listeners = new Map();
  const removed = [];

  return {
    hidden: false,
    listeners,
    removed,
    addEventListener(type, callback) {
      listeners.set(type, callback);
    },
    removeEventListener(type, callback) {
      removed.push([type, callback]);
      if (listeners.get(type) === callback) listeners.delete(type);
    },
    setHidden(hidden) {
      this.hidden = hidden;
      listeners.get('visibilitychange')?.();
    },
  };
}

function createTimerHarness() {
  let nextId = 1;
  const tasks = new Map();
  const scheduled = [];

  return {
    scheduled,
    schedule(callback, delay) {
      const id = nextId++;
      const task = { id, callback, delay, cancelled: false, fired: false };
      tasks.set(id, task);
      scheduled.push(task);
      return id;
    },
    cancel(id) {
      const task = tasks.get(id);
      if (task) task.cancelled = true;
    },
    fire(id, { retained = false } = {}) {
      const task = tasks.get(id);
      assert.ok(task, `unknown timer ${id}`);
      if (task.cancelled && !retained) return;
      task.fired = true;
      task.callback();
    },
    pending() {
      return [...tasks.values()].filter((task) => !task.cancelled && !task.fired);
    },
  };
}

function createHarness(overrides = {}) {
  const target = { id: 'aicall-demo' };
  const observer = createObserverHarness();
  const pageDocument = createDocumentHarness();
  const timers = createTimerHarness();
  const calls = [];

  const controller = createDemoLoop({
    target,
    cycleMs: 7000,
    holdMs: 2000,
    play: () => calls.push('play'),
    showFinal: () => calls.push('showFinal'),
    reset: () => calls.push('reset'),
    stop: () => calls.push('stop'),
    Observer: observer.Observer,
    pageDocument,
    schedule: timers.schedule,
    cancelScheduled: timers.cancel,
    ...overrides,
  });

  return { target, observer, pageDocument, timers, calls, controller };
}

test('canonical loop observes at 0.35 and repeats a 6-10 second story after a 2000 ms hold', () => {
  const harness = createHarness();
  const observed = harness.observer.instances[0];

  assert.deepEqual(observed.options, { threshold: 0.35 });
  observed.emit(harness.target, 0.34, true);
  assert.deepEqual(harness.calls, []);

  observed.emit(harness.target, 0.35, true);
  assert.deepEqual(harness.calls, ['play']);
  const story = harness.timers.pending()[0];
  assert.ok(story.delay >= 6000 && story.delay <= 10000);
  assert.equal(story.delay, 7000);

  harness.timers.fire(story.id);
  assert.deepEqual(harness.calls, ['play']);
  const finalHold = harness.timers.pending()[0];
  assert.equal(finalHold.delay, 2000);
  harness.timers.fire(finalHold.id);
  assert.deepEqual(harness.calls, ['play', 'stop', 'reset', 'play']);
});

test('canonical loop stops and resets off-screen or hidden, then re-enters cleanly', () => {
  const harness = createHarness();
  const observed = harness.observer.instances[0];

  observed.emit(harness.target, 0.8);
  const offScreenStale = harness.timers.pending()[0];
  observed.emit(harness.target, 0, false);
  assert.deepEqual(harness.calls, ['play', 'stop', 'reset']);
  harness.timers.fire(offScreenStale.id, { retained: true });
  assert.deepEqual(harness.calls, ['play', 'stop', 'reset']);

  observed.emit(harness.target, 0.8);
  harness.pageDocument.setHidden(true);
  assert.deepEqual(harness.calls.slice(-2), ['stop', 'reset']);
  harness.pageDocument.setHidden(false);
  assert.equal(harness.calls.at(-1), 'play');
});

test('canonical replay, control, retained callbacks, and cleanup preserve caller ownership', () => {
  const harness = createHarness();
  const observed = harness.observer.instances[0];

  observed.emit(harness.target, 0.8);
  const controlledStale = harness.timers.pending()[0];
  harness.controller.takeControl();
  harness.timers.fire(controlledStale.id, { retained: true });
  assert.deepEqual(harness.calls, ['play', 'stop']);

  harness.controller.replay();
  assert.deepEqual(harness.calls, ['play', 'stop', 'stop', 'reset', 'play']);
  const cleanupStale = harness.timers.pending()[0];
  harness.controller.cleanup();
  harness.controller.cleanup();
  const afterCleanup = [...harness.calls];

  assert.equal(observed.disconnectCalls, 1);
  assert.equal(harness.pageDocument.removed.length, 1);
  harness.timers.fire(cleanupStale.id, { retained: true });
  observed.emit(harness.target, 0.9);
  assert.deepEqual(harness.calls, afterCleanup);
});

test('controlled manual audio and timer owners stop hidden or off-screen until explicit replay', () => {
  const ownerTimers = createTimerHarness();
  const owner = {
    events: [],
    running: null,
    timer: null,
  };

  const startOwner = (label) => {
    owner.running = label;
    owner.events.push(`start:${label}`);
    owner.timer = ownerTimers.schedule(() => {
      owner.events.push(`finish:${label}`);
      owner.running = null;
      owner.timer = null;
    }, 1800);
  };

  const stopOwner = () => {
    owner.events.push(`stop:${owner.running ?? 'idle'}`);
    if (owner.timer !== null) ownerTimers.cancel(owner.timer);
    owner.running = null;
    owner.timer = null;
  };

  const harness = createHarness({
    play: () => startOwner('automatic'),
    reset: () => owner.events.push('reset'),
    stop: stopOwner,
  });
  const observed = harness.observer.instances[0];

  observed.emit(harness.target, 0.8);
  harness.controller.takeControl();
  startOwner('real-audio');
  assert.equal(owner.running, 'real-audio');

  harness.pageDocument.setHidden(true);
  assert.equal(owner.running, null);
  assert.equal(ownerTimers.pending().length, 0);
  assert.deepEqual(owner.events.slice(-2), ['start:real-audio', 'stop:real-audio']);

  const eventsAfterHidden = [...owner.events];
  harness.pageDocument.setHidden(false);
  assert.deepEqual(owner.events, eventsAfterHidden);

  startOwner('manual-recovery-timers');
  observed.emit(harness.target, 0, false);
  assert.equal(owner.running, null);
  assert.equal(ownerTimers.pending().length, 0);
  assert.deepEqual(
    owner.events.slice(-2),
    ['start:manual-recovery-timers', 'stop:manual-recovery-timers'],
  );

  const eventsAfterOffScreen = [...owner.events];
  observed.emit(harness.target, 0.8);
  assert.deepEqual(owner.events, eventsAfterOffScreen);
  assert.equal(harness.timers.pending().length, 0);

  harness.controller.replay();
  assert.deepEqual(owner.events.slice(-3), ['stop:idle', 'reset', 'start:automatic']);
  assert.equal(owner.running, 'automatic');
  assert.equal(ownerTimers.pending().length, 1);
  assert.equal(harness.timers.pending().length, 1);
});

test('canonical reduced-motion mode renders a static final state with no timer or observer', () => {
  const observer = createObserverHarness();
  const pageDocument = createDocumentHarness();
  const timers = createTimerHarness();
  const calls = [];

  createDemoLoop({
    target: { id: 'reduced-aicall-demo' },
    reducedMotion: true,
    cycleMs: 7000,
    holdMs: 2000,
    play: () => calls.push('play'),
    showFinal: () => calls.push('showFinal'),
    reset: () => calls.push('reset'),
    stop: () => calls.push('stop'),
    Observer: observer.Observer,
    pageDocument,
    schedule: timers.schedule,
    cancelScheduled: timers.cancel,
  });

  assert.deepEqual(calls, ['showFinal']);
  assert.equal(observer.instances.length, 0);
  assert.equal(pageDocument.listeners.size, 0);
  assert.equal(timers.scheduled.length, 0);
});

const narrativeFiles = [
  'CallHearGeorgian.tsx',
  'CallOutcomeBoard.tsx',
  'CallBargeIn.tsx',
];

async function showcaseSource(file) {
  return readFile(new URL(`./${file}`, import.meta.url), 'utf8');
}

test('every narrative component consumes the canonical visibility-aware loop', async () => {
  for (const file of narrativeFiles) {
    const source = await showcaseSource(file);
    const cycle = source.match(/const CYCLE_MS = ([\d_]+);/u);

    assert.match(source, /home\/components\/lib\/demo-loop\.mjs/u, `${file} imports the canonical loop`);
    assert.match(source, /createDemoLoop\(\{/u, `${file} creates a managed loop`);
    assert.match(source, /threshold:\s*0\.35/u, `${file} uses the family visibility threshold`);
    assert.match(source, /holdMs:\s*2000/u, `${file} holds the final result`);
    assert.ok(cycle, `${file} declares CYCLE_MS`);
    const cycleMs = Number(cycle[1].replaceAll('_', ''));
    assert.ok(cycleMs >= 6000 && cycleMs <= 10000, `${file} has a 6-10 second story`);
  }

  const hero = await showcaseSource('HeroProof.tsx');
  const cycle = hero.match(/const CYCLE_MS = ([\d_]+);/u);

  assert.match(hero, /home\/components\/lib\/demo-loop\.mjs/u);
  assert.match(hero, /createDemoLoop\(\{/u);
  assert.match(hero, /threshold:\s*0\.35/u);
  assert.match(hero, /holdMs:\s*2_000/u);
  assert.match(hero, /data-demo-id="aicall-hero-story"/u);
  assert.ok(cycle, 'call hero declares CYCLE_MS');
  const cycleMs = Number(cycle[1].replaceAll('_', ''));
  assert.ok(cycleMs >= 6000 && cycleMs <= 10000, 'call hero has a 6-10 second story');
});

test('the silent transcript autoplays but real audio remains behind its button', async () => {
  const source = await showcaseSource('CallHearGeorgian.tsx');

  assert.match(source, /play:\s*playTranscript/u);
  assert.match(source, /onClick=\{toggleAudio\}/u);
  assert.doesNotMatch(source, /play:\s*toggleAudio/u);
  assert.match(source, /preload="none"/u);
});

test('the 100-call board autoplays and keeps an immediate replay button', async () => {
  const source = await showcaseSource('CallOutcomeBoard.tsx');

  assert.match(source, /play:\s*run/u);
  assert.match(source, /controllerRef\.current\?\.replay\(\)/u);
  assert.match(source, /onClick=\{replay\}/u);
  assert.match(source, /showFinal:\s*showFinal/u);
});

test('barge-in keeps separate interrupt and always-mounted Replay controls', async () => {
  const source = await showcaseSource('CallBargeIn.tsx');

  assert.match(
    source,
    /type Phase = 'idle' \| 'speaking' \| 'interrupted' \| 'recovery' \| 'result';/u,
  );
  assert.match(source, /setPhase\('interrupted'\)[\s\S]*setPhase\('recovery'\)[\s\S]*setPhase\('result'\)/u);
  assert.match(source, /onClick=\{interrupt\}/u);
  assert.match(source, /onClick=\{replay\}[\s\S]*data-demo-replay="true"/u);
  assert.doesNotMatch(source, /speaking \? interrupt : replay/u);
  assert.doesNotMatch(source, /data-demo-replay=\{speaking \?/u);
});

test('barge-in Replay exposes a fresh stage and visible nearby progress', async () => {
  const source = await showcaseSource('CallBargeIn.tsx');

  assert.match(source, /const \[runId, setRunId\] = useState\(0\);/u);
  assert.match(source, /setRunId\(\(previous\) => previous \+ 1\);/u);
  assert.match(source, /data-demo-detail=\{`\$\{phase\}-\$\{i\}`\}/u);
  assert.match(source, /data-demo-stage=\{`\$\{runId\}-\$\{phase\}-\$\{i\}`\}/u);
  assert.match(
    source,
    /data-barge-visible-progress[\s\S]*data-barge-status-slot[\s\S]*grid[\s\S]*tabular-nums[\s\S]*Math\.min\(i, WORDS\.length\)/u,
  );
});

test('hero proof uses managed visibility, semantic icons, and replay', async () => {
  const hero = await showcaseSource('HeroProof.tsx');

  assert.match(hero, /useTranslations\('product\.heroCall'\)/u);
  assert.match(hero, /data-demo-id="aicall-hero-story"/u);
  assert.match(hero, /prefers-reduced-motion: reduce/u);
  assert.match(hero, /ref=\{rootRef\}/u);
  assert.match(hero, /controllerRef\.current\?\.replay\(\)/u);
  assert.match(hero, /data-demo-toggle="true"/u);
  assert.match(hero, /data-demo-replay=\{isStopped \? 'true' : undefined\}/u);
  assert.match(hero, /solar:phone-calling-rounded-bold-duotone/u);
  assert.match(hero, /solar:incoming-call-rounded-bold-duotone/u);
  assert.match(hero, /solar:refresh-bold-duotone/u);
  assert.doesNotMatch(hero, /<svg|\{done \? 'ok' : '\?'\}/u);
});

test('hero waveform follows the shipped recordings instead of an independent sine loop', async () => {
  const hero = await showcaseSource('HeroProof.tsx');

  assert.match(hero, /const VOICE_ENVELOPES:/u);
  assert.match(hero, /sampleVoiceEnvelope\(envelope,\s*progress \+ timeOffset\)/u);
  assert.match(hero, /audio\.currentTime \/ duration/u);
  assert.match(hero, /data-wave-source=\{audioEnabled \? 'audio-current-time' : 'recorded-envelope'\}/u);
  assert.doesNotMatch(hero, /phaseRef|Math\.sin\(/u);
});

test('cost sample yields permanently to the first slider input', async () => {
  const source = await showcaseSource('CallCostSlider.tsx');

  assert.match(source, /createDemoLoop\(\{/u);
  assert.match(source, /userOwnedRef\.current = true;[\s\S]*takeControl\(\)/u);
  assert.match(source, /onChange=\{\(value\) => claimValue\(/u);
  assert.doesNotMatch(source, /setInterval/u);
});

test('cost sample keeps visitor values until an explicit localized Replay', async () => {
  const source = await showcaseSource('CallCostSlider.tsx');

  assert.match(
    source,
    /const replay = \(\) => \{[\s\S]*userOwnedRef\.current = false;[\s\S]*controllerRef\.current\?\.replay\(\);[\s\S]*\};/u,
  );
  assert.match(source, /onClick=\{replay\}/u);
  assert.match(source, /solar:refresh-bold-duotone/u);
  assert.match(source, /\{t\('replay'\)\}/u);

  for (const locale of ['ka', 'en', 'ru']) {
    const messages = JSON.parse(
      await readFile(new URL(`../../messages/${locale}.json`, import.meta.url), 'utf8'),
    );
    assert.equal(typeof messages.product.cost.replay, 'string', `${locale} replay label`);
    assert.ok(messages.product.cost.replay.trim(), `${locale} replay label is non-empty`);
  }
});
