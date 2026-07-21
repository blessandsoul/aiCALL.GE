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

  const illustrativeAutoplay = source.match(
    /const playDemo = useCallback\([\s\S]*?\}, \[resetDemo\]\);/u,
  )?.[0] ?? '';
  assert.match(illustrativeAutoplay, /setDemoStep/u);
  assert.doesNotMatch(illustrativeAutoplay, /setOwn|setExisting|setWritten/u);
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

test('hero workflow keeps stable mobile geometry and a 44px Replay target', async () => {
  const [adapter, workflow, styles] = await Promise.all([
    source('HeroProof.tsx'),
    readFile(new URL('../home/components/HeroWorkflowStory.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../home/components/hero-workflow-story.css', import.meta.url), 'utf8'),
  ]);

  assert.match(adapter, /HeroWorkflowStory/u);
  assert.match(workflow, /data-demo-replay="true"/u);
  assert.match(styles, /\.hero-workflow\s*\{[\s\S]*?min-width:\s*0;[\s\S]*?contain:\s*inline-size;/u);
  assert.match(styles, /\.hero-workflow__row\s*\{[\s\S]*?min-height:\s*82px;/u);
  assert.match(styles, /\.hero-workflow__replay\s*\{[\s\S]*?min-width:\s*44px;[\s\S]*?min-height:\s*44px;/u);
  assert.match(styles, /@media \(max-width: 479px\)[\s\S]*?\.hero-workflow__details\s*\{[\s\S]*?grid-template-columns:\s*1fr;/u);
});

test('landing renders one hero demo followed by five static capabilities', async () => {
  const [showcase, capabilities, workflow] = await Promise.all([
    readFile(new URL('../home/components/LandingShowcase.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../home/components/ProductCapabilities.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../home/components/HeroWorkflowStory.tsx', import.meta.url), 'utf8'),
  ]);

  assert.match(showcase, /useTranslations\('product\.capabilities'\)/u);
  assert.match(showcase, /<ProductCapabilities/u);
  assert.equal(showcase.match(/solar:[a-z0-9-]+/gu)?.length, 5);
  assert.doesNotMatch(showcase, /CallHearGeorgian|CallConsentGate|CallOutcomeBoard|CallBargeIn|CallCostSlider/u);
  assert.doesNotMatch(showcase, /data-landing-demo/u);
  assert.match(capabilities, /items\.map\(\(item, index\)/u);
  assert.match(capabilities, /data-feature-section="true"/u);
  assert.equal(workflow.match(/data-landing-demo=/gu)?.length, 1);
});

test('barge-in keeps every story state in one stable overlay stack', async () => {
  const barge = await source('CallBargeIn.tsx');

  assert.match(barge, /data-barge-state-stack/u);
  assert.match(barge, /grid-cols-\[minmax\(0,1fr\)\][\s\S]*grid-rows-\[1fr\]/u);
  assert.doesNotMatch(barge, /\{interrupted && \(/u);
  assert.doesNotMatch(barge, /\{recovering && \(/u);
  assert.doesNotMatch(barge, /\{phase === 'result' && \(/u);
});

test('calculator range controls expose a 44px mobile target', async () => {
  const cost = await source('CallCostSlider.tsx');

  assert.match(cost, /type="range"[\s\S]*className="[^"]*h-11/u);
  assert.doesNotMatch(cost, /type="range"[\s\S]*className="[^"]*\bh-10\b/u);
});

test('mobile autoplay copy reserves its final geometry before the story starts', async () => {
  const [hearing, consent, outcome] = await Promise.all([
    source('CallHearGeorgian.tsx'),
    source('CallConsentGate.tsx'),
    source('CallOutcomeBoard.tsx'),
  ]);

  assert.match(hearing, /min-h-\[76px\][^'"`]*sm:min-h-0/u);
  assert.match(consent, /min-h-\[68px\][^'"`]*sm:min-h-0/u);
  assert.match(
    consent,
    /min-h-\[168px\][^'"`]*sm:min-h-\[120px\][^'"`]*lg:min-h-\[72px\]/u,
  );
  assert.match(outcome, /flex-col items-start gap-3[^'"`]*sm:flex-row/u);
  assert.match(outcome, /min-h-\[44px\][^'"`]*w-full[^'"`]*sm:w-auto[^'"`]*sm:flex-1/u);
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
