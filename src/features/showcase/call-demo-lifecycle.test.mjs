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
  const repeat = harness.timers.pending()[0];
  assert.ok(repeat.delay >= 6000 + 2000 && repeat.delay <= 10000 + 2000);
  assert.equal(repeat.delay, 9000);

  harness.timers.fire(repeat.id);
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
  'HeroProof.tsx',
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

test('barge-in autoplays speaking through interruption, recovery, and result while keeping manual interrupt', async () => {
  const source = await showcaseSource('CallBargeIn.tsx');

  assert.match(
    source,
    /type Phase = 'idle' \| 'speaking' \| 'interrupted' \| 'recovery' \| 'result';/u,
  );
  assert.match(source, /setPhase\('interrupted'\)[\s\S]*setPhase\('recovery'\)[\s\S]*setPhase\('result'\)/u);
  assert.match(source, /speaking \? interrupt : replay/u);
});

test('hero proof uses managed visibility, semantic icons, and replay', async () => {
  const source = await showcaseSource('HeroProof.tsx');

  assert.match(source, /useReducedMotion/u);
  assert.match(source, /ref=\{rootRef\}/u);
  assert.match(source, /onClick=\{replay\}/u);
  assert.match(source, /solar:phone-bold-duotone/u);
  assert.doesNotMatch(source, /<svg|\{done \? 'ok' : '\?'\}/u);
});

test('cost sample yields permanently to the first slider input', async () => {
  const source = await showcaseSource('CallCostSlider.tsx');

  assert.match(source, /createDemoLoop\(\{/u);
  assert.match(source, /userOwnedRef\.current = true;[\s\S]*takeControl\(\)/u);
  assert.match(source, /onChange=\{\(value\) => claimValue\(/u);
  assert.doesNotMatch(source, /setInterval/u);
});
