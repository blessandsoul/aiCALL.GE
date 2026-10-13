import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildClosingLeadRequest } from '../src/features/home/lib/closing-lead-message.ts';

const base = {phone:'+995555123456',company:'Test business',task:'Synthetic request only',product:'aiCALL',contactPreference:'Phone',turnstileToken:'synthetic'};
const body = attribution => JSON.parse(buildClosingLeadRequest({...base,attribution}).init.body);
test('invalid campaign attribution cannot reject a valid lead', () => {
  const result=body({utmSource:'google.ads',utmMedium:'x'.repeat(81),utmCampaign:'x'.repeat(121),utmContent:'x'.repeat(181)});
  for(const key of ['utm_source','utm_medium','utm_campaign','utm_content']) assert.equal(result[key],undefined);
  assert.equal(result.phone,base.phone);
});
test('exact per-field API limits are preserved', () => {
  const result=body({utmSource:'x'.repeat(80),utmMedium:'x'.repeat(80),utmCampaign:'x'.repeat(120),utmContent:'x'.repeat(180)});
  assert.equal(result.utm_source.length,80);
  assert.equal(result.utm_medium.length,80);
  assert.equal(result.utm_campaign.length,120);
  assert.equal(result.utm_content.length,180);
});
