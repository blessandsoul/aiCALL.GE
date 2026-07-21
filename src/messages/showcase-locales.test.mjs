import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const namespaces = [
  'seo',
  'hero',
  'work',
  'faq',
  'cta',
  'capabilities',
  'heroStory',
  'hear',
  'consent',
  'board',
  'barge',
  'cost',
  'proof',
];

async function readJson(relativePath) {
  return JSON.parse(await readFile(new URL(relativePath, import.meta.url), 'utf8'));
}

function flattenKeys(value, prefix = '') {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return [prefix];
  return Object.keys(value).flatMap((key) => flattenKeys(value[key], prefix ? `${prefix}.${key}` : key));
}

function flattenStrings(value) {
  if (typeof value === 'string') return [value];
  if (value === null || typeof value !== 'object') return [];
  return Object.values(value).flatMap(flattenStrings);
}

function landingCopy(messages) {
  return Object.fromEntries(namespaces.map((namespace) => [namespace, messages.product[namespace]]));
}

const [en, ka, ru, pkg, siteSource] = await Promise.all([
  readJson('./en.json'),
  readJson('./ka.json'),
  readJson('./ru.json'),
  readJson('../../package.json'),
  readFile(new URL('../config/site.ts', import.meta.url), 'utf8'),
]);

test('KA, EN, and RU showcase copy has exact key parity', () => {
  const enKeys = flattenKeys(landingCopy(en)).sort();
  assert.deepEqual(flattenKeys(landingCopy(ka)).sort(), enKeys);
  assert.deepEqual(flattenKeys(landingCopy(ru)).sort(), enKeys);
});

test('every loop has plain replay, result, and status labels', () => {
  const required = {
    hear: ['replay', 'result', 'silentStatus', 'audioStatus'],
    board: ['replay', 'result', 'running'],
    barge: ['replay', 'result', 'recoveryStatus'],
    cost: ['result'],
    proof: ['replay', 'ringing', 'speaking', 'done'],
  };

  for (const messages of [en, ka, ru]) {
    for (const [namespace, keys] of Object.entries(required)) {
      for (const key of keys) {
        assert.equal(
          typeof messages.product[namespace][key],
          'string',
          `${namespace}.${key} must exist`,
        );
        assert.ok(messages.product[namespace][key].trim(), `${namespace}.${key} must not be empty`);
      }
    }
  }
});

test('consent copy keeps a cautious boundary and says it is not legal advice', () => {
  assert.match(en.product.consent.notice, /not legal advice/iu);
  assert.match(ka.product.consent.notice, /არა იურიდიული რჩევა/u);
  assert.match(ru.product.consent.notice, /не юридическая консультация/iu);

  for (const messages of [en, ka, ru]) {
    assert.ok(messages.product.consent.greenBody.trim());
    assert.ok(messages.product.consent.amberBody.trim());
    assert.ok(messages.product.consent.redBody.trim());
    assert.ok(messages.product.consent.law.trim());
  }
});

test('Article 12 copy separates consent, additional-data writing, and aiNOW launch policy', () => {
  const checks = {
    en: {
      messages: en,
      blanketSeo: /marketing calls? (?:need|require)s? written consent/iu,
      blanketFaq: /direct marketing requires written consent under Georgian law|marketing and needs written consent/iu,
      blanketLaw: /including written consent/iu,
      generalConsent: /direct marketing needs consent regardless of how the data were obtained or whether they are publicly accessible/iu,
      additionalData: /written consent is required when the data go beyond name, surname, address, phone number and email/iu,
      withdrawal: /within seven working days/iu,
      policy: /under aiNOW's launch policy[^.]*written or electronic consent record/iu,
      questionPolicy: /under aiNOW's launch policy/iu,
    },
    ka: {
      messages: ka,
      blanketSeo: /მარკეტინგული ზარისთვის წერილობითი თანხმობაა საჭირო/u,
      blanketFaq: /პირდაპირი მარკეტინგისთვის[^.]*წერილობით თანხმობას მოითხოვს|მარკეტინგია და წერილობით თანხმობას მოითხოვს/u,
      blanketLaw: /მათ შორის წერილობით თანხმობას/u,
      generalConsent: /პირდაპირი მარკეტინგისთვის თანხმობა საჭიროა მონაცემების მოპოვების გზისა და მათი საჯარო ხელმისაწვდომობის მიუხედავად/u,
      additionalData: /სახელის, გვარის, მისამართის, ტელეფონის ნომრისა და ელფოსტის გარდა სხვა მონაცემებიც მუშავდება, საჭიროა წერილობითი თანხმობა/u,
      withdrawal: /შვიდ სამუშაო დღეში/u,
      policy: /aiNOW-ის კამპანიის დაწყების პოლიტიკის მიხედვით[^.]*თანხმობის წერილობითი ან ელექტრონული ჩანაწერი/u,
      questionPolicy: /aiNOW-ის კამპანიის დაწყების პოლიტიკის მიხედვით/u,
    },
    ru: {
      messages: ru,
      blanketSeo: /для маркетинговых звонков нужно письменное согласие/iu,
      blanketFaq: /прямого маркетинга[^.]*требует письменного согласия|маркетинг[^.]*требует письменного согласия/iu,
      blanketLaw: /включая письменное согласие/iu,
      generalConsent: /согласие на прямой маркетинг нужно независимо от способа получения данных и их общедоступности/iu,
      additionalData: /письменное согласие требуется, если обрабатываются данные помимо имени, фамилии, адреса, телефона и электронной почты/iu,
      withdrawal: /не позднее семи рабочих дней/iu,
      policy: /по политике запуска aiNOW[^.]*письменное или электронное подтверждение согласия/iu,
      questionPolicy: /по политике запуска aiNOW/iu,
    },
  };

  for (const [locale, check] of Object.entries(checks)) {
    const { seo, faq, consent } = check.messages.product;

    assert.doesNotMatch(seo.description, check.blanketSeo, `${locale} SEO overstates written consent`);
    assert.doesNotMatch(
      `${faq.a3} ${faq.a4}`,
      check.blanketFaq,
      `${locale} FAQ overstates written consent`,
    );
    assert.doesNotMatch(consent.law, check.blanketLaw, `${locale} law note is too broad`);
    assert.match(consent.law, check.generalConsent, `${locale} keeps the general-consent rule`);
    assert.match(consent.law, check.additionalData, `${locale} limits writing to additional data`);
    assert.match(consent.law, check.withdrawal, `${locale} keeps the withdrawal deadline`);
    assert.match(consent.q3, check.questionPolicy, `${locale} labels policy before the answer`);
    assert.match(
      `${faq.a3} ${consent.amberBody}`,
      check.policy,
      `${locale} labels the stricter aiNOW launch policy`,
    );
  }
});

test('Georgian landing copy contains no Cyrillic letters', () => {
  const copy = flattenStrings(landingCopy(ka)).join('\n');
  assert.doesNotMatch(copy, /[\u0400-\u04FF]/u);
});

test('public copy contains no ecosystem slogan, personal signer, or invented proof claim', () => {
  const keys = flattenKeys({ en: landingCopy(en), ka: landingCopy(ka), ru: landingCopy(ru) });
  assert.equal(keys.some((key) => /slogan|ecosystem/iu.test(key)), false);

  const allCopy = flattenStrings({ en: landingCopy(en), ka: landingCopy(ka), ru: landingCopy(ru) }).join('\n');
  assert.doesNotMatch(
    allCopy,
    /Andrew|Андрей|ენდრიუ|\bAA\b|I promise|я обещаю|მე გპირდებით/iu,
  );
  assert.doesNotMatch(
    allCopy,
    /one word in nine|first 5 clinics|100-call pilot|August 2026|we have not run a Georgian campaign|within 24 hours|первые 5 клиник|пилот.*100|август.*2026|24 часов|პირველი 5 კლინიკა|100-ზარიანი|24 საათ/iu,
  );
});

test('public site config keeps accurate consent and evidence boundaries', () => {
  assert.doesNotMatch(
    siteSource,
    /written consent for direct marketing with no exceptions|one word in nine|89% accurate|first 5 clinics|100-call pilot/iu,
  );
  assert.match(siteSource, /short, fixed questions/iu);
  assert.match(siteSource, /open or uncertain questions go to a person/iu);
  assert.match(siteSource, /do not present another campaign's answer or confirmation rate as yours/iu);
  assert.match(
    siteSource,
    /written consent is specifically required when personal data beyond name, surname, address, phone and email are processed/iu,
  );
  assert.match(
    siteSource,
    /aiNOW's launch policy[^.]*written or electronic consent record/iu,
  );
});

test('FAQ answers stay short enough to scan', () => {
  for (const [locale, messages] of Object.entries({ en, ka, ru })) {
    for (let index = 1; index <= 14; index += 1) {
      const answer = messages.product.faq[`a${index}`];
      assert.ok(answer.split(/\s+/u).length <= 60, `${locale} faq.a${index} is too long`);
    }
  }
});

test('copy names the concrete business story and human boundary', () => {
  assert.match(`${en.product.hero.sub} ${en.product.work.s1Desc}`, /missed|confirm/iu);
  assert.match(`${en.product.seo.description} ${en.product.consent.q1}`, /own customers/iu);
  assert.match(en.product.hear.subtitle, /Georgian/iu);
  assert.match(`${en.product.board.heading} ${en.product.board.subtitle}`, /outcome|result/iu);
  assert.match(`${en.product.work.s4Desc} ${en.product.faq.a5}`, /human|person/iu);
  assert.match(en.product.proof.line1, /დაადასტურებთ/u);
});

test('hero typewriter phrases stay compact enough for a 342px viewport', () => {
  for (const [locale, messages] of Object.entries({ en, ka, ru })) {
    const phrases = messages.product.hero.typewriterWords.split(',');
    assert.ok(phrases.length >= 5, `${locale} keeps the rotating business examples`);
    for (const phrase of phrases) {
      assert.ok([...phrase.trim()].length <= 18, `${locale} typewriter phrase is too wide: ${phrase}`);
    }
  }
});

test('package exposes the complete showcase test command', () => {
  assert.equal(
    pkg.scripts['test:showcase'],
    'node --test src/features/showcase/*.test.mjs src/messages/*.test.mjs',
  );
});
